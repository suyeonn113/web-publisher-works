import { useEffect, useRef, useState } from 'react';
import { formatKRW } from '../../../utils/price';
import { getRovingTabNextIndex } from '../../../utils/rovingTab';
import ChevronLeftIcon from '../../icons/ChevronLeftIcon';
import ChevronRightIcon from '../../icons/ChevronRightIcon';

const formatDateFareLabel = (dateText) => {
  const [, month, day] = dateText.split('-');
  return `${month}.${day}`;
};

const getVisibleCount = () => {
  if (window.matchMedia('(max-width: 375px)').matches) return 2;
  if (window.matchMedia('(max-width: 767px)').matches) return 3;
  if (window.matchMedia('(max-width: 1279px)').matches) return 5;
  return 7;
};

function DateFareBar({ items, onSelectDate }) {
  const [visibleCount, setVisibleCount] = useState(7);
  const dateButtonRefs = useRef({});
  const shouldFocusSelectedDateRef = useRef(false);
  const selectedIndex = items.findIndex((item) => item.isSelected);
  const fallbackSelectedIndex = selectedIndex >= 0 ? selectedIndex : 0;
  const canSelectPrevious = selectedIndex > 0;
  const canSelectNext = selectedIndex >= 0 && selectedIndex < items.length - 1;
  const visibleStart = Math.max(
    0,
    Math.min(
      visibleCount === 2
        ? fallbackSelectedIndex
        : fallbackSelectedIndex - Math.floor(visibleCount / 2),
      items.length - visibleCount,
    ),
  );

  const visibleItems = items.slice(visibleStart, visibleStart + visibleCount);
  const selectedDate = items[selectedIndex]?.date;

  useEffect(() => {
    const updateVisibleCount = () => setVisibleCount(getVisibleCount());
    updateVisibleCount();
    window.addEventListener('resize', updateVisibleCount);
    return () => window.removeEventListener('resize', updateVisibleCount);
  }, []);

  const handleMoveDate = (offset) => {
    const nextItem = items[selectedIndex + offset];
    if (nextItem) onSelectDate?.(nextItem.date);
  };

  const handleDateKeyDown = (event, currentVisibleIndex) => {
    const nextVisibleIndex = getRovingTabNextIndex(event, currentVisibleIndex, visibleItems.length);
    if (nextVisibleIndex === null) return;

    const nextItem = visibleItems[nextVisibleIndex];
    if (!nextItem) return;

    event.preventDefault();
    shouldFocusSelectedDateRef.current = true;
    onSelectDate?.(nextItem.date);
  };

  useEffect(() => {
    if (!shouldFocusSelectedDateRef.current || !selectedDate) return;

    dateButtonRefs.current[selectedDate]?.focus();
    shouldFocusSelectedDateRef.current = false;
  }, [selectedDate, visibleItems]);

  return (
    <div className="date-fare-bar" aria-label="날짜별 최저 운임">
      <button
        className="date-fare-bar__arrow"
        type="button"
        aria-label="이전 날짜"
        disabled={!canSelectPrevious}
        onClick={() => handleMoveDate(-1)}
      >
        <ChevronLeftIcon size={18} />
      </button>
      <div
        className="date-fare-bar__items"
        role="group"
        aria-label="날짜 선택"
        style={{ '--date-fare-count': visibleItems.length }}
      >
        {visibleItems.map((item, index) => (
          <button
            className={`date-fare-bar__item${item.isSelected ? ' is-selected' : ''}`}
            key={item.date}
            aria-pressed={item.isSelected}
            onClick={() => onSelectDate?.(item.date)}
            onKeyDown={(event) => handleDateKeyDown(event, index)}
            ref={(element) => {
              dateButtonRefs.current[item.date] = element;
            }}
            tabIndex={item.isSelected ? 0 : -1}
            type="button"
          >
            <span>{formatDateFareLabel(item.date)}</span>
            <strong>{item.price ? formatKRW(item.price) : '-'}</strong>
          </button>
        ))}
      </div>
      <button
        className="date-fare-bar__arrow"
        type="button"
        aria-label="다음 날짜"
        disabled={!canSelectNext}
        onClick={() => handleMoveDate(1)}
      >
        <ChevronRightIcon size={18} />
      </button>
    </div>
  );
}

export default DateFareBar;

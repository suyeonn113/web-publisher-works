import { useEffect, useState } from 'react';
import { formatKRW } from '../../../utils/price';
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
  const selectedIndex = items.findIndex((item) => item.isSelected);
  const canSelectPrevious = selectedIndex > 0;
  const canSelectNext = selectedIndex >= 0 && selectedIndex < items.length - 1;
  const visibleStart = Math.max(
    0,
    Math.min(
      visibleCount === 2
        ? selectedIndex
        : selectedIndex - Math.floor(visibleCount / 2),
      items.length - visibleCount,
    ),
  );

  const visibleItems = items.slice(visibleStart, visibleStart + visibleCount);

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
      <div className="date-fare-bar__items" style={{ '--date-fare-count': visibleItems.length }}>
        {visibleItems.map((item) => (
          <button
            className={`date-fare-bar__item${item.isSelected ? ' is-selected' : ''}`}
            key={item.date}
            onClick={() => onSelectDate?.(item.date)}
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

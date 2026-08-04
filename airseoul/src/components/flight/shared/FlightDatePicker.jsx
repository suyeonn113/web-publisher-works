import { useEffect, useId, useMemo, useRef, useState } from 'react';
import { TRIP_TYPES } from '../../../constants/tripType';
import { formatDate, getAppNow, toDate } from '../../../utils/date';
import { sortSelectedDates } from '../../../utils/searchParams';
import ChevronLeftIcon from '../../icons/ChevronLeftIcon';
import ChevronRightIcon from '../../icons/ChevronRightIcon';

const WEEKDAYS = ['일', '월', '화', '수', '목', '금', '토'];

const createMonthDate = (dateText) => {
  const date = toDate(dateText);
  return new Date(date.getFullYear(), date.getMonth(), 1);
};

const addMonths = (date, months) => new Date(date.getFullYear(), date.getMonth() + months, 1);

const getCalendarDays = (monthDate) => {
  const start = new Date(monthDate.getFullYear(), monthDate.getMonth(), 1);
  const end = new Date(monthDate.getFullYear(), monthDate.getMonth() + 1, 0);
  const days = Array.from({ length: start.getDay() }, () => null);

  for (let day = 1; day <= end.getDate(); day += 1) {
    days.push(new Date(monthDate.getFullYear(), monthDate.getMonth(), day));
  }

  return days;
};

const getMonthTitle = (date) => `${date.getFullYear()}년 ${date.getMonth() + 1}월`;

function FlightDatePicker({
  tripType,
  firstDate,
  maxDate,
  minDate,
  secondDate,
  showTripTypeOptions = true,
  isFullScreen = false,
  onClose,
  onDateChange,
  onTripTypeChange,
}) {
  const calendarId = `flight-calendar-${useId().replace(/:/g, '')}`;
  const calendarRef = useRef(null);
  const [visibleMonth, setVisibleMonth] = useState(createMonthDate(firstDate));
  const [focusedDate, setFocusedDate] = useState(firstDate || formatDate(getAppNow()));
  const selectedDates = useMemo(
    () => sortSelectedDates([firstDate, secondDate].filter(Boolean)),
    [firstDate, secondDate]
  );
  const departureDate = selectedDates[0];
  const returnDate = tripType === TRIP_TYPES.ROUND_TRIP ? selectedDates[1] : '';

  const today = getAppNow();
  today.setHours(0, 0, 0, 0);

  const currentMonth = new Date(today.getFullYear(), today.getMonth(), 1);
  const nextMonth = addMonths(visibleMonth, 1);
  const cannotGoPrevMonth = visibleMonth <= currentMonth;

  const visibleMonths = isFullScreen
    ? Array.from({ length: 12 }, (_, index) => addMonths(currentMonth, index))
    : [visibleMonth, nextMonth];

  useEffect(() => {
    calendarRef.current?.querySelector(`[data-date="${focusedDate}"]`)?.focus();
  }, [focusedDate, visibleMonth]);

  const handleSelectDate = (date) => {
    const dateText = formatDate(date);

    if ((minDate && dateText < minDate) || (maxDate && dateText > maxDate)) {
      return;
    }

    setFocusedDate(dateText);

    if (tripType === TRIP_TYPES.ONE_WAY) {
      onDateChange(dateText, '');
      onClose();
      return;
    }

    if (!firstDate || secondDate) {
      onDateChange(dateText, '');
      return;
    }

    const [nextDepartureDate, nextReturnDate] = sortSelectedDates([firstDate, dateText]);
    onDateChange(nextDepartureDate, nextReturnDate);
    onClose();
  };

  const handleDayKeyDown = (event, date) => {
    let nextDate;

    if (event.key === 'ArrowLeft') {
      nextDate = new Date(date.getFullYear(), date.getMonth(), date.getDate() - 1);
    }
    if (event.key === 'ArrowRight') {
      nextDate = new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1);
    }
    if (event.key === 'ArrowUp') {
      nextDate = new Date(date.getFullYear(), date.getMonth(), date.getDate() - 7);
    }
    if (event.key === 'ArrowDown') {
      nextDate = new Date(date.getFullYear(), date.getMonth(), date.getDate() + 7);
    }
    if (event.key === 'Home') {
      nextDate = new Date(date.getFullYear(), date.getMonth(), date.getDate() - date.getDay());
    }
    if (event.key === 'End') {
      nextDate = new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate() + (6 - date.getDay()),
      );
    }

    if (event.key === 'PageUp' || event.key === 'PageDown') {
      const monthOffset = event.key === 'PageUp' ? -1 : 1;
      const targetMonth = new Date(date.getFullYear(), date.getMonth() + monthOffset, 1);
      const lastDay = new Date(targetMonth.getFullYear(), targetMonth.getMonth() + 1, 0).getDate();
      nextDate = new Date(
        targetMonth.getFullYear(),
        targetMonth.getMonth(),
        Math.min(date.getDate(), lastDay),
      );
    }

    if (!nextDate) return;

    event.preventDefault();

    const nextDateText = formatDate(nextDate);
    const lastFullScreenMonth = addMonths(currentMonth, 12);
    const isOutsideMobileRange =
      isFullScreen && (nextDate < currentMonth || nextDate >= lastFullScreenMonth);
    const isDisabled =
      nextDate < today ||
      (minDate && nextDateText < minDate) ||
      (maxDate && nextDateText > maxDate);

    if (isOutsideMobileRange || isDisabled) return;

    const nextMonthDate = createMonthDate(nextDateText);
    if (!isFullScreen && (nextMonthDate < visibleMonth || nextMonthDate > nextMonth)) {
      setVisibleMonth(nextMonthDate);
    }

    setFocusedDate(nextDateText);
  };

  const renderMonth = (monthDate) => {
    const monthKey = formatDate(monthDate).slice(0, 7);
    const monthTitleId = `${calendarId}-${monthKey}`;

    return (
      <div className="flight-date-picker__month" key={getMonthTitle(monthDate)}>
        <h3 id={monthTitleId}>{getMonthTitle(monthDate)}</h3>

        <div className="flight-date-picker__weekdays" aria-hidden="true">
          {WEEKDAYS.map((weekday) => (
            <span key={weekday}>{weekday}</span>
          ))}
        </div>

        <div
          aria-labelledby={monthTitleId}
          className="flight-date-picker__days"
          role="group"
        >
          {getCalendarDays(monthDate).map((date, index) => {
            if (!date) {
              return <span aria-hidden="true" key={`blank-${index}`} />;
            }

            const dateText = formatDate(date);
            const isDeparture = dateText === departureDate;
            const isReturn = dateText === returnDate;
            const hasDateRange = Boolean(departureDate && returnDate);
            const isInRange =
              departureDate && returnDate && dateText > departureDate && dateText < returnDate;
            const isPastDate = date < today;
            const isDisabled =
              isPastDate || (minDate && dateText < minDate) || (maxDate && dateText > maxDate);
            const isToday = dateText === formatDate(today);
            const selectedState = isDeparture
              ? '출발일 선택됨'
              : isReturn
                ? '도착일 선택됨'
                : '';
            const accessibleName = [
              `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`,
              `${WEEKDAYS[date.getDay()]}요일`,
              selectedState,
              isToday ? '오늘' : '',
            ]
              .filter(Boolean)
              .join(', ');

            return (
              <button
                aria-current={isToday ? 'date' : undefined}
                aria-label={accessibleName}
                aria-pressed={isDeparture || isReturn}
                className={[
                  'flight-date-picker__day',
                  isDeparture ? 'is-start' : '',
                  isReturn ? 'is-end' : '',
                  isDeparture && hasDateRange ? 'is-connected-start' : '',
                  isReturn && hasDateRange ? 'is-connected-end' : '',
                  isInRange ? 'is-range' : '',
                  isDisabled ? 'is-disabled' : '',
                ]
                  .filter(Boolean)
                  .join(' ')}
                data-date={dateText}
                disabled={isDisabled}
                key={dateText}
                onClick={() => handleSelectDate(date)}
                onKeyDown={(event) => handleDayKeyDown(event, date)}
                tabIndex={!isDisabled && dateText === focusedDate ? 0 : -1}
                type="button"
              >
                {date.getDate()}
              </button>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="flight-date-picker" aria-label="출발일 선택" role="group">
      {showTripTypeOptions && (
      <div className="flight-date-picker__options">
        <div className="flight-date-picker__trip" role="group" aria-label="여정 유형">
          <button
            aria-pressed={tripType === TRIP_TYPES.ROUND_TRIP}
            className={tripType === TRIP_TYPES.ROUND_TRIP ? 'is-active' : ''}
            type="button"
            onClick={() => onTripTypeChange(TRIP_TYPES.ROUND_TRIP)}
          >
            왕복
          </button>
          <button
            aria-pressed={tripType === TRIP_TYPES.ONE_WAY}
            className={tripType === TRIP_TYPES.ONE_WAY ? 'is-active' : ''}
            type="button"
            onClick={() => onTripTypeChange(TRIP_TYPES.ONE_WAY)}
          >
            편도
          </button>
        </div>
      </div>
      )}

      <div className="flight-date-picker__calendar" ref={calendarRef}>
        {!isFullScreen && (
          <button
            className="flight-date-picker__nav flight-date-picker__nav--prev"
            type="button"
            aria-label="이전 달"
            disabled={cannotGoPrevMonth}
            onClick={() => {
              if (cannotGoPrevMonth) return;
              const previousMonth = addMonths(visibleMonth, -1);
              setVisibleMonth(previousMonth);
              setFocusedDate(formatDate(previousMonth));
            }}
          >
            <ChevronLeftIcon size={24} />
          </button>
        )}
        {visibleMonths.map((monthDate) => renderMonth(monthDate))}
        {!isFullScreen && (
          <button
            className="flight-date-picker__nav flight-date-picker__nav--next"
            type="button"
            aria-label="다음 달"
            onClick={() => {
              const followingMonth = addMonths(visibleMonth, 1);
              setVisibleMonth(followingMonth);
              setFocusedDate(formatDate(followingMonth));
            }}
          >
            <ChevronRightIcon size={24} />
          </button>
        )}
      </div>
    </div>
  );
}

export default FlightDatePicker;

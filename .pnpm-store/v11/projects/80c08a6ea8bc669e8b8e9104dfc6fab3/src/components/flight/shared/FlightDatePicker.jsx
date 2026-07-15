import { useMemo, useState } from 'react';
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
  const [visibleMonth, setVisibleMonth] = useState(createMonthDate(firstDate));
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

  const handleSelectDate = (date) => {
    const dateText = formatDate(date);

    if ((minDate && dateText < minDate) || (maxDate && dateText > maxDate)) {
      return;
    }

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

  const renderMonth = (monthDate) => (
    <div className="flight-date-picker__month" key={getMonthTitle(monthDate)}>
      <h3>{getMonthTitle(monthDate)}</h3>

      <div className="flight-date-picker__weekdays">
        {WEEKDAYS.map((weekday) => (
          <span key={weekday}>{weekday}</span>
        ))}
      </div>

      <div className="flight-date-picker__days">
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

          return (
            <button
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
              disabled={isDisabled}
              key={dateText}
              type="button"
              onClick={() => handleSelectDate(date)}
            >
              {date.getDate()}
            </button>
          );
        })}
      </div>
    </div>
  );

  return (
    <div className="flight-date-picker" aria-label="출발일 선택">
      {showTripTypeOptions && (
      <div className="flight-date-picker__options">
        <div className="flight-date-picker__trip" role="group" aria-label="여정 유형">
          <button
            className={tripType === TRIP_TYPES.ROUND_TRIP ? 'is-active' : ''}
            type="button"
            onClick={() => onTripTypeChange(TRIP_TYPES.ROUND_TRIP)}
          >
            왕복
          </button>
          <button
            className={tripType === TRIP_TYPES.ONE_WAY ? 'is-active' : ''}
            type="button"
            onClick={() => onTripTypeChange(TRIP_TYPES.ONE_WAY)}
          >
            편도
          </button>
        </div>
      </div>
      )}

      <div className="flight-date-picker__calendar">
        {!isFullScreen && (
          <button
            className="flight-date-picker__nav flight-date-picker__nav--prev"
            type="button"
            aria-label="이전 달"
            disabled={cannotGoPrevMonth}
            onClick={() => {
              if (cannotGoPrevMonth) return;
              setVisibleMonth(addMonths(visibleMonth, -1));
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
            onClick={() => setVisibleMonth(addMonths(visibleMonth, 1))}
          >
            <ChevronRightIcon size={24} />
          </button>
        )}
      </div>
    </div>
  );
}

export default FlightDatePicker;

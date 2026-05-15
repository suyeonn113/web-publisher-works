import { useMemo, useState } from 'react';
import { TRIP_TYPES } from '../../../constants/tripType';
import { formatDate, toDate } from '../../../utils/date';
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
  secondDate,
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
  const nextMonth = addMonths(visibleMonth, 1);

  const handleSelectDate = (date) => {
    const dateText = formatDate(date);

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
          const isInRange =
            departureDate && returnDate && dateText > departureDate && dateText < returnDate;

          return (
            <button
              className={[
                'flight-date-picker__day',
                isDeparture ? 'is-start' : '',
                isReturn ? 'is-end' : '',
                isInRange ? 'is-range' : '',
              ]
                .filter(Boolean)
                .join(' ')}
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

      <div className="flight-date-picker__calendar">
        <button
          className="flight-date-picker__nav flight-date-picker__nav--prev"
          type="button"
          aria-label="이전 달"
          onClick={() => setVisibleMonth(addMonths(visibleMonth, -1))}
        >
          <ChevronLeftIcon size={24} />
        </button>
        {renderMonth(visibleMonth)}
        {renderMonth(nextMonth)}
        <button
          className="flight-date-picker__nav flight-date-picker__nav--next"
          type="button"
          aria-label="다음 달"
          onClick={() => setVisibleMonth(addMonths(visibleMonth, 1))}
        >
          <ChevronRightIcon size={24} />
        </button>
      </div>
    </div>
  );
}

export default FlightDatePicker;

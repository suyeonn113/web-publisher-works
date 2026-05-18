import { useState } from 'react';
import { addDays, formatDate, formatKoreanMonthDay, getAppNow } from '../../../utils/date';
import CalendarIcon from '../../icons/CalendarIcon';
import ChevronDownIcon from '../../icons/ChevronDownIcon';
import FlightLookupField from '../shared/FlightLookupField';
import { passengerLookupFields } from '../../../data/lookupFields';

const CHECK_IN_DATE_OFFSETS = [-1, 0, 1, 2];

function FlightCheckInPanel() {
  const appToday = getAppNow();
  const dateOptions = CHECK_IN_DATE_OFFSETS.map((offset) => {
    const date = addDays(appToday, offset);
    const value = formatDate(date);

    return {
      value,
      label: formatKoreanMonthDay(value),
    };
  });
  const [departureDate, setDepartureDate] = useState(formatDate(appToday));
  const [isDateOptionsOpen, setIsDateOptionsOpen] = useState(false);
  const selectedDateLabel =
    dateOptions.find((option) => option.value === departureDate)?.label ?? '';

  return (
    <div className="flight-booking-service flight-booking-service--check-in">
      <div className="flight-lookup-form">
        {passengerLookupFields.map((field) => {
          if (field.type !== 'date') {
            return <FlightLookupField field={field} key={field.key} />;
          }

          return (
            <label className="flight-lookup-field" key={field.key}>
              <span>{field.label}</span>
              <span className="flight-lookup-field__control">
                <CalendarIcon size={18} />
                <span className="flight-check-in-date-select">
                  <button
                    className="flight-check-in-date-select__button"
                    type="button"
                    aria-expanded={isDateOptionsOpen}
                    onClick={() => setIsDateOptionsOpen((isOpen) => !isOpen)}
                  >
                    {selectedDateLabel}
                  </button>
                  {isDateOptionsOpen && (
                    <span className="flight-check-in-date-select__list" role="listbox">
                      {dateOptions.map((option) => (
                        <button
                          className={[
                            'flight-check-in-date-select__option',
                            option.value === departureDate ? 'is-active' : '',
                          ]
                            .filter(Boolean)
                            .join(' ')}
                          key={option.value}
                          type="button"
                          role="option"
                          aria-selected={option.value === departureDate}
                          onClick={() => {
                            setDepartureDate(option.value);
                            setIsDateOptionsOpen(false);
                          }}
                        >
                          {option.label}
                        </button>
                      ))}
                    </span>
                  )}
                </span>
                <ChevronDownIcon size={16} />
              </span>
            </label>
          );
        })}
        <button className="flight-service-submit" type="button">
          조회
        </button>
      </div>
    </div>
  );
}

export default FlightCheckInPanel;

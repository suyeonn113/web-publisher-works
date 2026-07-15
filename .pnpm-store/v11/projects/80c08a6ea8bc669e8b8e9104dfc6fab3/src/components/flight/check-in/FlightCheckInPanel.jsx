import { useState } from 'react';
import { addDays, formatDate, formatKoreanMonthDay, getAppNow } from '../../../utils/date';
import CalendarIcon from '../../icons/CalendarIcon';
import ChevronDownIcon from '../../icons/ChevronDownIcon';
import FlightLookupField from '../shared/FlightLookupField';
import FlightSelectMenu from '../shared/FlightSelectMenu';
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

  return (
    <div className="flight-service-panel flight-service-panel--check-in">
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
                <FlightSelectMenu
                  ariaLabel={field.label}
                  className="flight-select-menu--lookup"
                  onSelect={setDepartureDate}
                  options={dateOptions}
                  value={departureDate}
                />
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

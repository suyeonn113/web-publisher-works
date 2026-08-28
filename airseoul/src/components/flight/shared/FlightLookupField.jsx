import { useId } from 'react';

import CalendarIcon from '../../icons/CalendarIcon';
import ChevronDownIcon from '../../icons/ChevronDownIcon';

function FlightLookupField({ field, onClick, value }) {
  const isDateField = field.type === 'date';
  const fieldValue = value ?? field.placeholder;
  const fieldId = `flight-lookup-${useId().replace(/:/g, '')}`;
  const labelId = `${fieldId}-label`;
  const valueId = `${fieldId}-value`;

  if (isDateField) {
    return (
      <div className="flight-lookup-field">
        <span id={labelId}>{field.label}</span>
        <button
          aria-labelledby={`${labelId} ${valueId}`}
          className="flight-lookup-field__control"
          type="button"
          onClick={onClick}
        >
          <CalendarIcon size={18} />
          <span className="flight-lookup-field__value" id={valueId}>
            {fieldValue}
          </span>
          <ChevronDownIcon size={16} />
        </button>
      </div>
    );
  }

  return (
    <label className="flight-lookup-field" htmlFor={fieldId}>
      <span>{field.label}</span>
      <span className="flight-lookup-field__control">
        <input
          id={fieldId}
          type="text"
          placeholder={field.placeholder}
        />
      </span>
    </label>
  );
}

export default FlightLookupField;

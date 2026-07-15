import CalendarIcon from '../../icons/CalendarIcon';
import ChevronDownIcon from '../../icons/ChevronDownIcon';

function FlightLookupField({ field, onClick, value }) {
  const isDateField = field.type === 'date';
  const fieldValue = value ?? field.placeholder;

  return (
    <label className="flight-lookup-field">
      <span>{field.label}</span>
      <span
        className="flight-lookup-field__control"
        role={isDateField ? 'button' : undefined}
        tabIndex={isDateField ? 0 : undefined}
        onClick={isDateField ? onClick : undefined}
        onKeyDown={
          isDateField
            ? (event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                  event.preventDefault();
                  onClick?.(event);
                }
              }
            : undefined
        }
      >
        {isDateField && <CalendarIcon size={18} />}
        <input
          type="text"
          placeholder={field.placeholder}
          readOnly={isDateField}
          {...(isDateField ? { value: fieldValue, onChange: () => {} } : {})}
        />
        {isDateField && <ChevronDownIcon size={16} />}
      </span>
    </label>
  );
}

export default FlightLookupField;

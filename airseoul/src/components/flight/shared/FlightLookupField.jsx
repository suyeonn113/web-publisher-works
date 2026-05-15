import CalendarIcon from '../../icons/CalendarIcon';
import ChevronDownIcon from '../../icons/ChevronDownIcon';

function FlightLookupField({ field }) {
  const isDateField = field.type === 'date';

  return (
    <label className="flight-lookup-field">
      <span>{field.label}</span>
      <span className="flight-lookup-field__control">
        {isDateField && <CalendarIcon size={18} />}
        <input
          type="text"
          placeholder={field.placeholder}
          defaultValue={isDateField ? field.placeholder : ''}
        />
        {isDateField && <ChevronDownIcon size={16} />}
      </span>
    </label>
  );
}

export default FlightLookupField;

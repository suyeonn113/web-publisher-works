import CalendarIcon from '../../icons/CalendarIcon';

function FlightDateField({
  className = 'flight-service-field-button flight-date-field',
  departureDateLabel,
  iconSize = 18,
  label = '출발일',
  onClick,
  returnDateLabel = '',
}) {
  return (
    <button className={className} type="button" onClick={onClick}>
      <span>{label}</span>
      <strong className="flight-date-field__value">
        <CalendarIcon size={iconSize} />
        {returnDateLabel ? (
          <>
            <span className="flight-date-field__start">{departureDateLabel} ~</span>
            <span className="flight-date-field__end">{returnDateLabel}</span>
          </>
        ) : (
          departureDateLabel
        )}
      </strong>
    </button>
  );
}

export default FlightDateField;

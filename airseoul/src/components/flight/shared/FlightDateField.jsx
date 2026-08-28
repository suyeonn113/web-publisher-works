import CalendarIcon from '../../icons/CalendarIcon';

function FlightDateField({
  className = 'flight-service-field-button flight-date-field',
  departureDateLabel,
  iconSize = 18,
  isRoundTrip = false,
  label = '출발일',
  onClick,
  returnDateLabel = '',
}) {
  const hasDepartureDate = Boolean(departureDateLabel);
  const hasReturnDate = Boolean(returnDateLabel);

  return (
    <button className={className} type="button" onClick={onClick}>
      <span>{label}</span>
      <strong
        className={`flight-date-field__value${hasDepartureDate ? ' is-selected' : ''}`}
      >
        <CalendarIcon size={iconSize} />
        {isRoundTrip ? (
          <>
            <span
              className={`flight-date-field__start${
                hasDepartureDate ? '' : ' is-placeholder'
              }`}
            >
              {hasDepartureDate ? departureDateLabel : label} ~
            </span>
            <span
              className={`flight-date-field__end${
                hasReturnDate ? '' : ' is-placeholder'
              }`}
            >
              {hasReturnDate ? returnDateLabel : '도착일'}
            </span>
          </>
        ) : (
          <span className={hasDepartureDate ? '' : 'is-placeholder'}>
            {hasDepartureDate ? departureDateLabel : label}
          </span>
        )}
      </strong>
    </button>
  );
}

export default FlightDateField;

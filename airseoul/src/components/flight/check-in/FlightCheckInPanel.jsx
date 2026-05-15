import CalendarIcon from '../../icons/CalendarIcon';
import ChevronDownIcon from '../../icons/ChevronDownIcon';

const CHECK_IN_FIELDS = [
  {
    key: 'bookingNo',
    label: '예약번호 또는 항공권번호',
    placeholder: '예) A1B2C3 또는 18012345678...',
  },
  { key: 'departureDate', label: '출발일', placeholder: '2026년 05월 15일', type: 'date' },
  { key: 'lastName', label: '성', placeholder: '' },
  { key: 'firstName', label: '이름', placeholder: '' },
];

function FlightCheckInPanel() {
  return (
    <div className="flight-booking-service flight-booking-service--check-in">
      <div className="flight-booking-service__lookup">
        {CHECK_IN_FIELDS.map((field) => (
          <label className="flight-booking-service-field" key={field.key}>
            <span>{field.label}</span>
            <span className="flight-booking-service-field__control">
              {field.type === 'date' && <CalendarIcon size={18} />}
              <input
                type="text"
                placeholder={field.placeholder}
                defaultValue={field.type === 'date' ? field.placeholder : ''}
              />
              {field.type === 'date' && <ChevronDownIcon size={16} />}
            </span>
          </label>
        ))}
        <button className="flight-booking-service__submit" type="button">
          조회
        </button>
      </div>
    </div>
  );
}

export default FlightCheckInPanel;

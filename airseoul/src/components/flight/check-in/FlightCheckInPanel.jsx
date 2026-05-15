import FlightLookupField from '../shared/FlightLookupField';
import { passengerLookupFields } from '../shared/lookupFields';

function FlightCheckInPanel() {
  return (
    <div className="flight-booking-service flight-booking-service--check-in">
      <div className="flight-lookup-form">
        {passengerLookupFields.map((field) => (
          <FlightLookupField field={field} key={field.key} />
        ))}
        <button className="flight-service-submit" type="button">
          조회
        </button>
      </div>
    </div>
  );
}

export default FlightCheckInPanel;

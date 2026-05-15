import FlightLookupField from '../shared/FlightLookupField';
import { passengerLookupFields } from '../shared/lookupFields';

function FlightMyTripPanel() {
  return (
    <div className="flight-booking-service flight-booking-service--my-trip">
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

export default FlightMyTripPanel;

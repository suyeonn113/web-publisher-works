import FlightCheckInDetailContent from '../components/flight/check-in/FlightCheckInDetailContent';
import { FLIGHT_SERVICE_TAB_IDS } from '../components/flight/flight-service/flightServiceTabsData';
import FlightMyTripDetailContent from '../components/flight/my-trip/FlightMyTripDetailContent';
import FlightScheduleDetailContent from '../components/flight/schedule/FlightScheduleDetailContent';

const SERVICE_PANELS = {
  [FLIGHT_SERVICE_TAB_IDS.MY_TRIP]: FlightMyTripDetailContent,
  [FLIGHT_SERVICE_TAB_IDS.CHECK_IN]: FlightCheckInDetailContent,
  [FLIGHT_SERVICE_TAB_IDS.SCHEDULE]: FlightScheduleDetailContent,
};

function FlightServiceDetail({ serviceType, title }) {
  const ServicePanel = SERVICE_PANELS[serviceType];

  return (
    <main className="flight-service-detail" aria-labelledby="flight-service-detail-title">
      <div className="flight-service-detail__inner">
        <header className="flight-service-detail__header">
          <h1 id="flight-service-detail-title">{title}</h1>
        </header>

        <section
          className={`flight-service-detail__content flight-service-detail__content--${serviceType} flight-service-shell`}
          aria-label={`${title} 입력`}
        >
          <div className="flight-service-shell__body">
            <ServicePanel />
          </div>
        </section>
      </div>
    </main>
  );
}

export default FlightServiceDetail;

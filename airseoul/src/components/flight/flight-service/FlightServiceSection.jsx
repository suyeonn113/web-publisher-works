import { useState } from 'react';
import FlightBookingPanel from '../booking/FlightBookingPanel';
import FlightCheckInPanel from '../check-in/FlightCheckInPanel';
import FlightMyTripPanel from '../my-trip/FlightMyTripPanel';
import FlightSchedulePanel from '../schedule/FlightSchedulePanel';
import FlightServiceTabs, { FLIGHT_SERVICE_TAB_IDS } from './FlightServiceTabs';

function FlightServiceSection({ defaultValues, onSearch, variant = 'home' }) {
  const [activeTab, setActiveTab] = useState(FLIGHT_SERVICE_TAB_IDS.BOOKING);

  const renderActivePanel = () => {
    if (activeTab === FLIGHT_SERVICE_TAB_IDS.MY_TRIP) {
      return <FlightMyTripPanel />;
    }

    if (activeTab === FLIGHT_SERVICE_TAB_IDS.CHECK_IN) {
      return <FlightCheckInPanel />;
    }

    if (activeTab === FLIGHT_SERVICE_TAB_IDS.SCHEDULE) {
      return <FlightSchedulePanel />;
    }

    return <FlightBookingPanel defaultValues={defaultValues} onSearch={onSearch} />;
  };

  return (
    <section
      className={`flight-booking-section flight-booking-section--${variant}`}
      aria-labelledby="flight-service-title"
    >
      <div className="flight-booking-section__inner">
        <div className="flight-booking-panel">
          <FlightServiceTabs activeTab={activeTab} onTabChange={setActiveTab} />
          <div className="flight-booking-panel__body">{renderActivePanel()}</div>
        </div>
      </div>
    </section>
  );
}

export default FlightServiceSection;

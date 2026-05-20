import { useEffect, useState } from 'react';
import FlightBookingPanel from '../booking/FlightBookingPanel';
import FlightCheckInPanel from '../check-in/FlightCheckInPanel';
import FlightMyTripPanel from '../my-trip/FlightMyTripPanel';
import FlightSchedulePanel from '../schedule/FlightSchedulePanel';
import FlightServiceTabs from './FlightServiceTabs';
import { FLIGHT_SERVICE_TAB_IDS } from './flightServiceTabsData';

const ACTIVE_TAB_STORAGE_KEY = 'flightServiceActiveTab';

function FlightServiceSection({ defaultValues, onSearch, variant = 'home' }) {
  const isBookingPage = variant === 'booking';
  const [activeTab, setActiveTab] = useState(() => {
    return sessionStorage.getItem(ACTIVE_TAB_STORAGE_KEY) ?? FLIGHT_SERVICE_TAB_IDS.BOOKING;
  });

  const handleTabChange = (nextTabId) => {
    setActiveTab(nextTabId);
    sessionStorage.setItem(ACTIVE_TAB_STORAGE_KEY, nextTabId);
  };

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 480px)');

    const resetToBookingOnMobile = (event) => {
      if (!event.matches) return;

      setActiveTab(FLIGHT_SERVICE_TAB_IDS.BOOKING);
      sessionStorage.setItem(ACTIVE_TAB_STORAGE_KEY, FLIGHT_SERVICE_TAB_IDS.BOOKING);
    };

    resetToBookingOnMobile(mediaQuery);

    mediaQuery.addEventListener('change', resetToBookingOnMobile);

    return () => {
      mediaQuery.removeEventListener('change', resetToBookingOnMobile);
    };
  }, []);

  const renderActivePanel = () => {
    if (isBookingPage) {
      return (
        <FlightBookingPanel
          defaultValues={defaultValues}
          onSearch={onSearch}
          variant={variant}
        />
      );
    }

    if (activeTab === FLIGHT_SERVICE_TAB_IDS.MY_TRIP) {
      return <FlightMyTripPanel />;
    }

    if (activeTab === FLIGHT_SERVICE_TAB_IDS.CHECK_IN) {
      return <FlightCheckInPanel />;
    }

    if (activeTab === FLIGHT_SERVICE_TAB_IDS.SCHEDULE) {
      return <FlightSchedulePanel />;
    }

    return (
      <FlightBookingPanel
        defaultValues={defaultValues}
        onSearch={onSearch}
        variant={variant}
      />
    );
  };

  return (
    <section
      className={`flight-service-section flight-service-section--${variant}`}
      aria-labelledby="flight-service-title"
    >
      <div className="flight-service-section__inner">
        <div className="flight-service-shell">
          {!isBookingPage && (
            <FlightServiceTabs activeTab={activeTab} onTabChange={handleTabChange} />
          )}
          <div className="flight-service-shell__body">{renderActivePanel()}</div>
        </div>
      </div>
    </section>
  );
}

export default FlightServiceSection;

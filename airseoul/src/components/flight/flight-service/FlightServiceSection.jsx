import { useEffect, useId, useState } from 'react';
import FlightBookingPanel from '../booking/FlightBookingPanel';
import FlightCheckInPanel from '../check-in/FlightCheckInPanel';
import FlightMyTripPanel from '../my-trip/FlightMyTripPanel';
import FlightSchedulePanel from '../schedule/FlightSchedulePanel';
import FlightServiceTabs from './FlightServiceTabs';
import { FLIGHT_SERVICE_TAB_IDS, FLIGHT_SERVICE_TABS } from './flightServiceTabsData';

const ACTIVE_TAB_STORAGE_KEY = 'flightServiceActiveTab';

function FlightServiceSection({ defaultValues, onSearch, variant = 'home' }) {
  const isBookingPage = variant === 'booking';
  const tabIdPrefix = `flight-service-${useId().replace(/:/g, '')}`;
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
      <h2 className="sr-only" id="flight-service-title">항공 서비스</h2>
      <div className="flight-service-section__inner">
        <div className="flight-service-shell">
          {!isBookingPage && (
            <FlightServiceTabs
              activeTab={activeTab}
              idPrefix={tabIdPrefix}
              onTabChange={handleTabChange}
            />
          )}
          {isBookingPage ? (
            <div className="flight-service-shell__body">{renderActivePanel()}</div>
          ) : (
            FLIGHT_SERVICE_TABS.map((tab) => {
              const isActive = tab.id === activeTab;

              return (
                <div
                  aria-labelledby={`${tabIdPrefix}-tab-${tab.id}`}
                  className="flight-service-shell__body"
                  hidden={!isActive}
                  id={`${tabIdPrefix}-panel-${tab.id}`}
                  key={tab.id}
                  role="tabpanel"
                >
                  {isActive ? renderActivePanel() : null}
                </div>
              );
            })
          )}
        </div>
      </div>
    </section>
  );
}

export default FlightServiceSection;

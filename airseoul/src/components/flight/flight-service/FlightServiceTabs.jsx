import { FLIGHT_SERVICE_TABS } from './flightServiceTabsData';

function FlightServiceTabs({ activeTab, onTabChange }) {
  return (
    <nav className="flight-booking-panel__tabs" aria-label="항공 서비스">
      {FLIGHT_SERVICE_TABS.map((tab) => {
        const TabIcon = tab.icon;

        return (
          <button
            className={activeTab === tab.id ? 'is-active' : ''}
            key={tab.id}
            type="button"
            onClick={() => onTabChange(tab.id)}
          >
            <TabIcon size={22} />
            <span>{tab.label}</span>
          </button>
        );
      })}
    </nav>
  );
}

export default FlightServiceTabs;

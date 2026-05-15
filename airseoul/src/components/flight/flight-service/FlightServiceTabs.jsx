import ClockIcon from '../../icons/ClockIcon';
import PlaneIcon from '../../icons/PlaneIcon';
import TicketIcon from '../../icons/TicketIcon';
import UserIcon from '../../icons/UserIcon';

export const FLIGHT_SERVICE_TAB_IDS = {
  BOOKING: 'booking',
  MY_TRIP: 'my-trip',
  CHECK_IN: 'check-in',
  SCHEDULE: 'schedule',
};

export const FLIGHT_SERVICE_TABS = [
  { id: FLIGHT_SERVICE_TAB_IDS.BOOKING, label: '항공권 예매', icon: PlaneIcon },
  { id: FLIGHT_SERVICE_TAB_IDS.MY_TRIP, label: '나의 여행', icon: UserIcon },
  { id: FLIGHT_SERVICE_TAB_IDS.CHECK_IN, label: '체크인', icon: TicketIcon },
  { id: FLIGHT_SERVICE_TAB_IDS.SCHEDULE, label: '출도착/스케줄', icon: ClockIcon },
];

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

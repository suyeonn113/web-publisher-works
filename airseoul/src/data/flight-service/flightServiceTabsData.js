import ClockIcon from '../../components/icons/ClockIcon';
import PlaneIcon from '../../components/icons/PlaneIcon';
import TicketIcon from '../../components/icons/TicketIcon';
import UserIcon from '../../components/icons/UserIcon';

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

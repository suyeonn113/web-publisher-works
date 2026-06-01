import { ROUTES } from '../../constants/routes';
import { iconSize } from '../../tokens/size';
import AppLink from '../common/AppLink';
import ClockIcon from '../icons/ClockIcon';
import PlaneIcon from '../icons/PlaneIcon';
import TicketIcon from '../icons/TicketIcon';
import UserIcon from '../icons/UserIcon';

const quickMenus = [
  {
    id: 'booking-flight',
    label: '항공권 예매',
    to: ROUTES.booking.flight,
    Icon: PlaneIcon,
  },
  {
    id: 'my-trip',
    label: '나의 여행',
    to: ROUTES.booking.bookingCheck,
    Icon: UserIcon,
  },
  {
    id: 'check-in',
    label: '체크인',
    to: ROUTES.booking.checkin,
    Icon: TicketIcon,
  },
  {
    id: 'schedule',
    label: '출도착/스케줄',
    to: ROUTES.booking.flightStatus,
    Icon: ClockIcon,
  },
];

export default function HomeMobileQuickBar() {
  return (
    <nav className="home-mobile-quick" aria-label="모바일 빠른 메뉴">
      <ul className="home-mobile-quick__list">
        {quickMenus.map(({ to, Icon, id, label }) => (
          <li className="home-mobile-quick__item" key={id}>
            <AppLink className="home-mobile-quick__link" to={to}>
              <Icon className="home-mobile-quick__icon" size={iconSize.md} />
              <span>{label}</span>
            </AppLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}

import { mainNav } from '../../../data/mainNav';
import HeaderNavItem from './HeaderNavItem';

export default function HeaderNav() {
  return (
    <nav
      className="site-header__nav"
      id="primary-navigation"
      aria-label="주요 메뉴"
      tabIndex={-1}
    >
      <ul className="site-header__nav-list">
        {mainNav.map((item) => (
          <HeaderNavItem item={item} key={item.id} />
        ))}
      </ul>
    </nav>
  );
}

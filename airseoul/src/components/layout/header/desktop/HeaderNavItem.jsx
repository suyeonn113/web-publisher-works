import AppLink from '../../../common/AppLink';
import ChevronRightIcon from '../../../icons/ChevronRightIcon';

export default function HeaderNavItem({ isOpen, item, onOpen }) {
  const hasSubMenu = Boolean(item.children?.length);
  const submenuId = `header-nav-submenu-${item.id}`;

  return (
    <li
      className={`site-header__nav-item${isOpen ? ' site-header__nav-item--open' : ''}`}
      data-nav-id={item.id}
      onFocus={hasSubMenu ? onOpen : undefined}
      onMouseEnter={hasSubMenu ? onOpen : undefined}
    >
      <AppLink
        className="site-header__nav-link"
        to={item.href}
        aria-haspopup={hasSubMenu ? 'true' : undefined}
        aria-expanded={hasSubMenu ? isOpen : undefined}
        aria-controls={hasSubMenu ? submenuId : undefined}
      >
        <span>{item.label}</span>
      </AppLink>

      {hasSubMenu && isOpen && (
        <div className="site-header__nav-submenu" id={submenuId}>
          <div className="site-header__nav-submenu-inner">
            <ul className="site-header__nav-sublist">
              {item.children.map((child) => (
                <li className="site-header__nav-subitem" key={child.id}>
                  <AppLink
                    className="site-header__nav-sublink"
                    to={child.href}
                  >
                    <span className="site-header__nav-sublabel">{child.label}</span>
                    <ChevronRightIcon
                      className="site-header__nav-subchevron"
                      size={16}
                    />
                  </AppLink>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </li>
  );
}

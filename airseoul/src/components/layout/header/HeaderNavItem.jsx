import { useState } from 'react';
import { Link } from 'react-router-dom';

const mainNavSelector = '.site-header__nav-link';
const subNavSelector = '.site-header__nav-sublink';
const forwardKeys = ['ArrowRight', 'ArrowDown'];
const backwardKeys = ['ArrowLeft', 'ArrowUp'];

function focusSiblingLink(event, selector) {
  const links = Array.from(
    event.currentTarget
      .closest('.site-header__nav')
      ?.querySelectorAll(selector) ?? [],
  );
  const currentIndex = links.indexOf(event.target);

  if (currentIndex === -1) return false;

  const direction = forwardKeys.includes(event.key) ? 1 : -1;
  const nextIndex = (currentIndex + direction + links.length) % links.length;

  links[nextIndex]?.focus();

  return true;
}

export default function HeaderNavItem({ item }) {
  const [isOpen, setIsOpen] = useState(false);
  const hasSubMenu = Boolean(item.children?.length);
  const submenuId = `header-nav-submenu-${item.id}`;

  const openSubMenu = () => {
    if (!hasSubMenu) return;

    window.dispatchEvent(new CustomEvent('header-hover-menu-open'));
    setIsOpen(true);
  };

  const closeSubMenu = (event) => {
    if (!hasSubMenu) return;
    if (event.currentTarget.contains(event.relatedTarget)) return;

    setIsOpen(false);
  };

  const handleKeyDown = (event) => {
    const isMainNavKey =
      event.target.matches(mainNavSelector) &&
      [...forwardKeys, ...backwardKeys].includes(event.key);
    const isSubNavKey =
      event.target.matches(subNavSelector) &&
      [...forwardKeys, ...backwardKeys].includes(event.key);

    if (isMainNavKey) {
      event.preventDefault();
      focusSiblingLink(event, mainNavSelector);
      return;
    }

    if (isSubNavKey) {
      event.preventDefault();
      focusSiblingLink(event, subNavSelector);
      return;
    }

    if (event.key === 'Escape') {
      setIsOpen(false);
      event.currentTarget.querySelector(mainNavSelector)?.focus();
    }
  };

  return (
    <li
      className={`site-header__nav-item${isOpen ? ' site-header__nav-item--open' : ''}`}
      onMouseEnter={openSubMenu}
      onMouseLeave={closeSubMenu}
      onFocus={openSubMenu}
      onBlur={closeSubMenu}
      onKeyDown={handleKeyDown}
    >
      <Link
        className="site-header__nav-link"
        to={item.href}
        aria-haspopup={hasSubMenu ? 'true' : undefined}
        aria-expanded={hasSubMenu ? isOpen : undefined}
        aria-controls={hasSubMenu ? submenuId : undefined}
      >
        <span>{item.label}</span>
      </Link>

      {hasSubMenu && isOpen && (
        <ul
          className="site-header__nav-sublist"
          id={submenuId}
        >
          {item.children.map((child) => (
            <li className="site-header__nav-subitem" key={child.id}>
              <Link className="site-header__nav-sublink" to={child.href}>
                {child.label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </li>
  );
}

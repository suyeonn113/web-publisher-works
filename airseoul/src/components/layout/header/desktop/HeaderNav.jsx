import { useState } from 'react';
import { mainNav } from '../../../../data/mainNav';
import HeaderNavItem from './HeaderNavItem';

const mainNavSelector = '.site-header__nav-link';
const subNavSelector = '.site-header__nav-sublink';
const navigationKeys = ['ArrowRight', 'ArrowDown', 'ArrowLeft', 'ArrowUp'];

function focusSiblingLink(event, selector) {
  const links = Array.from(event.currentTarget.querySelectorAll(selector));
  const currentIndex = links.indexOf(event.target);

  if (currentIndex === -1) return;

  const direction = ['ArrowRight', 'ArrowDown'].includes(event.key) ? 1 : -1;
  const nextIndex = (currentIndex + direction + links.length) % links.length;

  links[nextIndex]?.focus();
}

export default function HeaderNav() {
  const [activeItemId, setActiveItemId] = useState(null);

  const openSubMenu = (itemId) => {
    window.dispatchEvent(new CustomEvent('header-hover-menu-open'));
    setActiveItemId(itemId);
  };

  const closeSubMenu = (event) => {
    if (
      event.relatedTarget instanceof Node &&
      event.currentTarget.contains(event.relatedTarget)
    ) {
      return;
    }

    setActiveItemId(null);
  };

  const handleKeyDown = (event) => {
    if (event.target.matches(mainNavSelector) && navigationKeys.includes(event.key)) {
      event.preventDefault();
      focusSiblingLink(event, mainNavSelector);
      return;
    }

    if (event.target.matches(subNavSelector) && navigationKeys.includes(event.key)) {
      event.preventDefault();
      focusSiblingLink(event, subNavSelector);
      return;
    }

    if (event.key === 'Escape') {
      event.currentTarget
        .querySelector(`[data-nav-id="${activeItemId}"] ${mainNavSelector}`)
        ?.focus();
      setActiveItemId(null);
    }
  };

  return (
    <nav
      className="site-header__nav"
      id="primary-navigation"
      aria-label="주요 메뉴"
      onBlur={closeSubMenu}
      onKeyDown={handleKeyDown}
      onMouseLeave={closeSubMenu}
      tabIndex={-1}
    >
      <ul className="site-header__nav-list">
        {mainNav.map((item) => (
          <HeaderNavItem
            isOpen={activeItemId === item.id}
            item={item}
            key={item.id}
            onOpen={() => openSubMenu(item.id)}
          />
        ))}
      </ul>
    </nav>
  );
}

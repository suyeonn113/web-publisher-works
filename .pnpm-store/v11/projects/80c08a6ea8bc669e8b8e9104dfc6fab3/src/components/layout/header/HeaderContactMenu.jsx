import { useState } from 'react';

import { utilityNav } from '../../../data/utilityNav';
import { iconSize } from '../../../tokens/size';
import AppLink from '../../common/AppLink';
import ChevronDownIcon from '../../icons/ChevronDownIcon';
import HeadphonesIcon from '../../icons/HeadphonesIcon';
import { moveDropdownFocus } from './headerDropdownKeyboard';

const contactMenu = utilityNav.find((item) => item.id === 'contact');

export default function HeaderContactMenu({
  labelMode = 'full',
  iconSizeValue = iconSize.xs,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const isIconOnly = labelMode === 'icon';

  if (!contactMenu) return null;

  const submenuId = 'header-contact-menu';
  const closeMenu = (event) => {
    if (event.currentTarget.contains(event.relatedTarget)) return;

    setIsOpen(false);
  };
  const openMenu = () => {
    window.dispatchEvent(new CustomEvent('header-hover-menu-open'));
    setIsOpen(true);
  };
  const handleKeyDown = (event) => {
    if (moveDropdownFocus(event)) return;

    if (event.key !== 'Escape') return;

    setIsOpen(false);
    event.currentTarget.querySelector('.site-header__dropdown-button')?.focus();
  };

  return (
    <div
      className="site-header__dropdown"
      onMouseEnter={openMenu}
      onMouseLeave={closeMenu}
      onFocus={openMenu}
      onBlur={closeMenu}
      onKeyDown={handleKeyDown}
    >
      <button
        className="site-header__dropdown-button"
        type="button"
        aria-label={contactMenu.label}
        aria-haspopup="true"
        aria-expanded={isOpen}
        aria-controls={submenuId}
        onClick={() => setIsOpen((current) => !current)}
      >
        <HeadphonesIcon
          className="site-header__action-symbol"
          size={iconSizeValue}
        />

        {!isIconOnly && <span>{contactMenu.label}</span>}

        {!isIconOnly && (
          <ChevronDownIcon
            className="site-header__dropdown-icon"
            size={iconSizeValue}
          />
        )}
      </button>

      {isOpen && (
        <>
          <span className="site-header__dropdown-bridge" aria-hidden="true" />

          <ul className="site-header__dropdown-list" id={submenuId}>
            {contactMenu.children.map((item) => (
              <li className="site-header__dropdown-item" key={item.id}>
                <AppLink
                  className="site-header__dropdown-link"
                  to={item.href}
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </AppLink>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}

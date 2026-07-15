import { useEffect, useRef, useState } from 'react';

import { utilityNav } from '../../../data/utilityNav';
import { iconSize } from '../../../tokens/size';
import ChevronDownIcon from '../../icons/ChevronDownIcon';
import GlobeIcon from '../../icons/GlobeIcon';
import { moveDropdownFocus } from './headerDropdownKeyboard';

const languageMenu = utilityNav.find((item) => item.id === 'language');

export default function HeaderLanguageMenu({
  labelMode = 'full',
  iconSizeValue = iconSize.xs,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  const isIconOnly = labelMode === 'icon';

  useEffect(() => {
    if (!isOpen) return undefined;

    const closeMenu = (event) => {
      if (menuRef.current?.contains(event.target)) return;

      setIsOpen(false);
    };

    document.addEventListener('pointerdown', closeMenu);

    return () => {
      document.removeEventListener('pointerdown', closeMenu);
    };
  }, [isOpen]);

  useEffect(() => {
    const closeMenu = () => {
      setIsOpen(false);
    };

    window.addEventListener('header-hover-menu-open', closeMenu);

    return () => {
      window.removeEventListener('header-hover-menu-open', closeMenu);
    };
  }, []);

  if (!languageMenu) return null;

  const submenuId = 'header-language-menu';
  const closeMenu = (event) => {
    if (event.currentTarget.contains(event.relatedTarget)) return;

    setIsOpen(false);
  };
  const handleKeyDown = (event) => {
    if (moveDropdownFocus(event)) return;

    if (event.key !== 'Escape') return;

    setIsOpen(false);
    event.currentTarget.querySelector('.site-header__dropdown-button')?.focus();
  };

  return (
    <div
      ref={menuRef}
      className="site-header__dropdown site-header__dropdown--language"
      onBlur={closeMenu}
      onKeyDown={handleKeyDown}
    >
      <button
        className="site-header__dropdown-button"
        type="button"
        aria-haspopup="true"
        aria-expanded={isOpen}
        aria-controls={submenuId}
        onClick={() => setIsOpen((current) => !current)}
      >
        <GlobeIcon
          className="site-header__action-symbol"
          size={iconSizeValue}
        />

        {!isIconOnly && <span>{languageMenu.label}</span>}

        {!isIconOnly && (
          <ChevronDownIcon
            className="site-header__dropdown-icon"
            size={iconSizeValue}
          />
        )}
      </button>

      {isOpen && (
        <ul className="site-header__dropdown-list" id={submenuId}>
          {languageMenu.children.map((item) => (
            <li className="site-header__dropdown-item" key={item.id}>
              <button
                className="site-header__dropdown-link"
                type="button"
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

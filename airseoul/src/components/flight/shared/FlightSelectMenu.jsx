import { useEffect, useId, useRef, useState } from 'react';

function FlightSelectMenu({ ariaLabel, className = '', onSelect, options, value }) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const buttonRef = useRef(null);
  const menuRef = useRef(null);
  const optionRefs = useRef([]);
  const menuId = `flight-select-${useId().replace(/:/g, '')}`;
  const selectedOption = options.find((option) => option.value === value) ?? options[0];
  const selectedIndex = Math.max(
    options.findIndex((option) => option.value === selectedOption?.value),
    0,
  );

  const openMenu = (index = selectedIndex) => {
    setActiveIndex(index);
    setIsOpen(true);
  };

  const closeMenu = (shouldRestoreFocus = false) => {
    setIsOpen(false);
    if (shouldRestoreFocus) {
      window.requestAnimationFrame(() => buttonRef.current?.focus());
    }
  };

  const selectOption = (option) => {
    onSelect?.(option.value);
    closeMenu(true);
  };

  const moveToOption = (nextIndex) => {
    const wrappedIndex = (nextIndex + options.length) % options.length;
    setActiveIndex(wrappedIndex);
    optionRefs.current[wrappedIndex]?.focus();
  };

  const handleButtonKeyDown = (event) => {
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault();
      const offset = event.key === 'ArrowDown' ? 1 : -1;
      openMenu((selectedIndex + offset + options.length) % options.length);
      return;
    }

    if ((event.key === 'Enter' || event.key === ' ') && !isOpen) {
      event.preventDefault();
      openMenu();
    }
  };

  const handleOptionKeyDown = (event, index) => {
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault();
      moveToOption(index + (event.key === 'ArrowDown' ? 1 : -1));
      return;
    }

    if (event.key === 'Home' || event.key === 'End') {
      event.preventDefault();
      moveToOption(event.key === 'Home' ? 0 : options.length - 1);
      return;
    }

    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      selectOption(options[index]);
      return;
    }

    if (event.key === 'Escape') {
      event.preventDefault();
      event.stopPropagation();
      closeMenu(true);
    }
  };

  useEffect(() => {
    if (!isOpen) return undefined;

    const frameId = window.requestAnimationFrame(() => optionRefs.current[activeIndex]?.focus());
    const handlePointerDown = (event) => {
      if (!menuRef.current?.contains(event.target)) closeMenu(false);
    };

    document.addEventListener('pointerdown', handlePointerDown);

    return () => {
      window.cancelAnimationFrame(frameId);
      document.removeEventListener('pointerdown', handlePointerDown);
    };
  }, [activeIndex, isOpen]);

  return (
    <span
      className={['flight-select-menu', className].filter(Boolean).join(' ')}
      ref={menuRef}
    >
      <button
        aria-controls={menuId}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-label={ariaLabel}
        className="flight-select-menu__button"
        onClick={() => setIsOpen((open) => !open)}
        onKeyDown={handleButtonKeyDown}
        ref={buttonRef}
        type="button"
      >
        {selectedOption?.label}
      </button>

      <span
        aria-label={ariaLabel}
        className="flight-select-menu__list"
        hidden={!isOpen}
        id={menuId}
        role="listbox"
      >
        {options.map((option, index) => (
          <button
            aria-selected={option.value === value}
            className={[
              'flight-select-menu__option',
              option.value === value ? 'is-active' : '',
            ]
              .filter(Boolean)
              .join(' ')}
            key={option.value}
            onClick={() => selectOption(option)}
            onFocus={() => setActiveIndex(index)}
            onKeyDown={(event) => handleOptionKeyDown(event, index)}
            ref={(element) => {
              optionRefs.current[index] = element;
            }}
            role="option"
            tabIndex={activeIndex === index ? 0 : -1}
            type="button"
          >
            {option.label}
          </button>
        ))}
      </span>
    </span>
  );
}

export default FlightSelectMenu;

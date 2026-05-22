import { useState } from 'react';

function FlightSelectMenu({ ariaLabel, className = '', onSelect, options, value }) {
  const [isOpen, setIsOpen] = useState(false);
  const selectedOption = options.find((option) => option.value === value) ?? options[0];

  return (
    <span className={['flight-select-menu', className].filter(Boolean).join(' ')}>
      <button
        aria-expanded={isOpen}
        aria-label={ariaLabel}
        className="flight-select-menu__button"
        onClick={() => setIsOpen((open) => !open)}
        type="button"
      >
        {selectedOption?.label}
      </button>

      {isOpen && (
        <span className="flight-select-menu__list" role="listbox">
          {options.map((option) => (
            <button
              aria-selected={option.value === value}
              className={[
                'flight-select-menu__option',
                option.value === value ? 'is-active' : '',
              ]
                .filter(Boolean)
                .join(' ')}
              key={option.value}
              onClick={() => {
                onSelect?.(option.value);
                setIsOpen(false);
              }}
              role="option"
              type="button"
            >
              {option.label}
            </button>
          ))}
        </span>
      )}
    </span>
  );
}

export default FlightSelectMenu;

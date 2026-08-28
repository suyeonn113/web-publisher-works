import { useRef } from 'react';
import { TRIP_TYPES } from '../../../data/flight-service/tripType';
import { getRovingTabNextIndex } from '../../../utils/rovingTab';

const TRIP_TYPE_OPTIONS = [
  { label: '왕복', value: TRIP_TYPES.ROUND_TRIP },
  { label: '편도', value: TRIP_TYPES.ONE_WAY },
];

function TripTypeSelector({ className = '', onChange, tripType }) {
  const optionRefs = useRef([]);
  const rootClassName = [
    'flight-service-chips',
    'flight-service-chips--trip',
    className,
  ].filter(Boolean).join(' ');

  const handleKeyDown = (event, currentIndex) => {
    const nextIndex = getRovingTabNextIndex(event, currentIndex, TRIP_TYPE_OPTIONS.length);
    if (nextIndex === null) return;

    event.preventDefault();
    onChange(TRIP_TYPE_OPTIONS[nextIndex].value);
    optionRefs.current[nextIndex]?.focus();
  };

  return (
    <div className={rootClassName} role="radiogroup" aria-label="여정 유형">
      {TRIP_TYPE_OPTIONS.map((option, index) => {
        const isSelected = tripType === option.value;

        return (
          <button
            aria-checked={isSelected}
            className={isSelected ? 'is-active' : ''}
            key={option.value}
            onClick={() => onChange(option.value)}
            onKeyDown={(event) => handleKeyDown(event, index)}
            ref={(element) => {
              optionRefs.current[index] = element;
            }}
            role="radio"
            tabIndex={isSelected ? 0 : -1}
            type="button"
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}

export default TripTypeSelector;

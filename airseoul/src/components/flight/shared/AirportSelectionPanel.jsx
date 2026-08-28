import { useId, useRef, useState } from 'react';
import { airportGroups } from '../../../data/flight-service/airports';
import { formatAirportDisplayName } from '../../../utils/airports';
import { getRovingTabNextIndex } from '../../../utils/rovingTab';

const AIRPORT_OPTIONS = airportGroups.flatMap((group) => group.airports);

function AirportSelectionPanel({
  disabledCode = '',
  initialFocusRef,
  onSelect,
  selectedCode = '',
}) {
  const groupIdPrefix = `flight-airports-${useId().replace(/:/g, '')}`;
  const buttonRefs = useRef({});
  const selectedAirport = AIRPORT_OPTIONS.find(
    (airport) => airport.code === selectedCode && airport.code !== disabledCode,
  );
  const initialActiveCode =
    selectedAirport?.code ??
    AIRPORT_OPTIONS.find((airport) => airport.code !== disabledCode)?.code;
  const [activeCode, setActiveCode] = useState(initialActiveCode);

  const handleKeyDown = (event, code) => {
    const enabledAirports = AIRPORT_OPTIONS.filter(
      (airport) => airport.code !== disabledCode,
    );
    const currentIndex = enabledAirports.findIndex((airport) => airport.code === code);
    const nextIndex = getRovingTabNextIndex(event, currentIndex, enabledAirports.length);

    if (nextIndex === null) return;

    event.preventDefault();
    const nextCode = enabledAirports[nextIndex].code;

    setActiveCode(nextCode);
    buttonRefs.current[nextCode]?.focus();
  };

  return (
    <div className="flight-airport-picker" role="group" aria-label="공항 선택">
      {airportGroups.map((group, groupIndex) => {
        const groupTitleId = `${groupIdPrefix}-${groupIndex}`;

        return (
          <section aria-labelledby={groupTitleId} key={group.region} role="group">
            <h3 id={groupTitleId}>{group.region}</h3>
            <div>
              {group.airports.map((airport) => {
                const isSelected = selectedCode === airport.code;
                const isDisabled = disabledCode === airport.code;
                const isActive = activeCode === airport.code;

                return (
                  <button
                    aria-pressed={isSelected}
                    className={isSelected ? 'is-active' : ''}
                    disabled={isDisabled}
                    key={airport.code}
                    onClick={() => onSelect(airport.code)}
                    onFocus={() => setActiveCode(airport.code)}
                    onKeyDown={(event) => handleKeyDown(event, airport.code)}
                    ref={(element) => {
                      buttonRefs.current[airport.code] = element;

                      if (isActive && initialFocusRef) {
                        initialFocusRef.current = element;
                      }
                    }}
                    tabIndex={!isDisabled && isActive ? 0 : -1}
                    type="button"
                  >
                    <strong>{airport.code}</strong>
                    <span>{formatAirportDisplayName(airport)}</span>
                  </button>
                );
              })}
            </div>
          </section>
        );
      })}
    </div>
  );
}

export default AirportSelectionPanel;

import { useEffect, useRef, useState } from 'react';
import { FLIGHT_SERVICE_TABS } from '../../../data/flight-service/flightServiceTabsData';

function FlightServiceTabs({ activeTab, idPrefix, onTabChange }) {
  const tabRefs = useRef([]);
  const [isVertical, setIsVertical] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 1024px)');
    const handleChange = (event) => setIsVertical(event.matches);

    handleChange(mediaQuery);
    mediaQuery.addEventListener('change', handleChange);

    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const handleKeyDown = (event, currentIndex) => {
    const previousKey = isVertical ? 'ArrowUp' : 'ArrowLeft';
    const nextKey = isVertical ? 'ArrowDown' : 'ArrowRight';

    if (![previousKey, nextKey, 'Home', 'End'].includes(event.key)) return;

    event.preventDefault();

    let nextIndex = currentIndex;

    if (event.key === previousKey) {
      nextIndex = (currentIndex - 1 + FLIGHT_SERVICE_TABS.length) % FLIGHT_SERVICE_TABS.length;
    } else if (event.key === nextKey) {
      nextIndex = (currentIndex + 1) % FLIGHT_SERVICE_TABS.length;
    } else if (event.key === 'Home') {
      nextIndex = 0;
    } else if (event.key === 'End') {
      nextIndex = FLIGHT_SERVICE_TABS.length - 1;
    }

    onTabChange(FLIGHT_SERVICE_TABS[nextIndex].id);
    tabRefs.current[nextIndex]?.focus();
  };

  return (
    <div
      className="flight-service-shell__tabs"
      aria-label="항공 서비스"
      aria-orientation={isVertical ? 'vertical' : 'horizontal'}
      role="tablist"
    >
      {FLIGHT_SERVICE_TABS.map((tab, index) => {
        const TabIcon = tab.icon;
        const isActive = activeTab === tab.id;

        return (
          <button
            aria-controls={`${idPrefix}-panel-${tab.id}`}
            aria-selected={isActive}
            className={isActive ? 'is-active' : ''}
            id={`${idPrefix}-tab-${tab.id}`}
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            onKeyDown={(event) => handleKeyDown(event, index)}
            ref={(element) => {
              tabRefs.current[index] = element;
            }}
            role="tab"
            tabIndex={isActive ? 0 : -1}
            type="button"
          >
            <TabIcon aria-hidden="true" size={22} />
            <span>{tab.label}</span>
          </button>
        );
      })}
    </div>
  );
}

export default FlightServiceTabs;

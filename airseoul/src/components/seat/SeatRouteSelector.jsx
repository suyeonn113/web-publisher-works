import { useRef } from 'react';
import { getRovingTabNextIndex } from '../../utils/rovingTab';

export default function SeatRouteSelector({
  activeIndex,
  idPrefix,
  labels,
  onChange,
  panelId,
}) {
  const tabRefs = useRef([]);

  const handleKeyDown = (event, currentIndex) => {
    const nextIndex = getRovingTabNextIndex(event, currentIndex, labels.length);
    if (nextIndex === null) return;

    event.preventDefault();
    onChange(nextIndex);
    tabRefs.current[nextIndex]?.focus();
  };

  return (
    <section className="seat-route-selector" aria-labelledby={`${idPrefix}-title`}>
      <h3 id={`${idPrefix}-title`}>출발 노선</h3>
      <div className="seat-route-tabs" role="tablist" aria-label="좌석 구매 요금 노선 선택">
        {labels.map((label, index) => (
          <button
            type="button"
            role="tab"
            id={`${idPrefix}-tab-${index}`}
            aria-controls={panelId}
            aria-selected={activeIndex === index}
            tabIndex={activeIndex === index ? 0 : -1}
            className={activeIndex === index ? 'is-active' : ''}
            key={label}
            onClick={() => onChange(index)}
            onKeyDown={(event) => handleKeyDown(event, index)}
            ref={(element) => {
              tabRefs.current[index] = element;
            }}
          >
            {label}
          </button>
        ))}
      </div>
    </section>
  );
}

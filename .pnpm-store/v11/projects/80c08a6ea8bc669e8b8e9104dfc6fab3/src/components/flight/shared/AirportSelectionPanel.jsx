import { airportGroups } from '../../../data/airports';
import { formatAirportDisplayName } from '../../../utils/airports';

function AirportSelectionPanel({
  disabledCode = '',
  onSelect,
  selectedCode = '',
}) {
  return (
    <div className="flight-airport-picker">
      {airportGroups.map((group) => (
        <section key={group.region}>
          <h3>{group.region}</h3>
          <div>
            {group.airports.map((airport) => {
              const isSelected = selectedCode === airport.code;
              const isDisabled = disabledCode === airport.code;

              return (
                <button
                  className={isSelected ? 'is-active' : ''}
                  disabled={isDisabled}
                  key={airport.code}
                  type="button"
                  onClick={() => onSelect(airport.code)}
                >
                  <strong>{airport.code}</strong>
                  <span>{formatAirportDisplayName(airport)}</span>
                </button>
              );
            })}
          </div>
        </section>
      ))}
    </div>
  );
}

export default AirportSelectionPanel;

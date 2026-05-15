import { iconSize } from '../../../tokens/size';
import { formatAirportDisplayName } from '../../../utils/airports';
import ArrowRightLeftIcon from '../../icons/ArrowRightLeftIcon';

function FlightRouteSelector({
  className = 'flight-route-selector',
  displayMode = 'detail',
  fromAirport,
  fromCode,
  fromLabel = '출발지',
  fromName,
  onFromClick,
  onSwap,
  onToClick,
  swapAriaLabel = '출발지와 도착지 바꾸기',
  swapButtonClassName = 'flight-route-selector__swap',
  swapIconSize = iconSize.md,
  toAirport,
  toCode,
  toLabel = '도착지',
  toName,
}) {
  const resolvedFromCode = fromCode ?? fromAirport?.code;
  const resolvedToCode = toCode ?? toAirport?.code;
  const resolvedFromName = fromName ?? formatAirportDisplayName(fromAirport);
  const resolvedToName = toName ?? formatAirportDisplayName(toAirport);
  const isSummary = displayMode === 'summary';

  return (
    <div className={className}>
      <button type="button" onClick={onFromClick}>
        {isSummary ? (
          <>
            <strong>{resolvedFromCode}</strong>
            <span>{resolvedFromName || fromLabel}</span>
          </>
        ) : (
          <>
            <span>{fromLabel}</span>
            <strong>{resolvedFromCode}</strong>
            <em>{resolvedFromName}</em>
          </>
        )}
      </button>

      <button
        className={swapButtonClassName}
        type="button"
        aria-label={swapAriaLabel}
        onClick={onSwap}
      >
        <ArrowRightLeftIcon size={swapIconSize} />
      </button>

      <button type="button" onClick={onToClick}>
        {isSummary ? (
          <>
            <strong>{resolvedToCode}</strong>
            <span>{resolvedToName || toLabel}</span>
          </>
        ) : (
          <>
            <span>{toLabel}</span>
            <strong>{resolvedToCode}</strong>
            <em>{resolvedToName}</em>
          </>
        )}
      </button>
    </div>
  );
}

export default FlightRouteSelector;

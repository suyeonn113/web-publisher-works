import { iconSize } from '../../../tokens/size';
import { formatAirportDisplayName } from '../../../utils/airports';
import ArrowRightLeftIcon from '../../icons/ArrowRightLeftIcon';

function FlightRouteSelector({

  className = 'flight-route-selector',
  fromAirport,
  fromCode,
  fromLabel = '출발지',
  fromName,
  fromPlaceholderCode = 'From',
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
  toPlaceholderCode = 'To',
}) {
  const canSwapRoute = Boolean(fromAirport && toAirport);

  const resolvedFromCode = fromCode ?? fromAirport?.code;
  const resolvedToCode = toCode ?? toAirport?.code;
  const resolvedFromName = fromName ?? formatAirportDisplayName(fromAirport);
  const resolvedToName = toName ?? formatAirportDisplayName(toAirport);

  const hasFromValue = Boolean(resolvedFromCode || resolvedFromName);
  const hasToValue = Boolean(resolvedToCode || resolvedToName);

  const shouldShowFromValue = hasFromValue;
  const shouldShowToValue = hasToValue;

  return (
    <div className={className}>
      <button
        className={shouldShowFromValue ? 'is-selected' : ''}
        type="button"
        onClick={onFromClick}
      >
        {shouldShowFromValue ? (
          <>
            <strong>{resolvedFromCode}</strong>
            <span>{resolvedFromName}</span>
          </>
        ) : (
          <>
            <strong>{fromPlaceholderCode}</strong>
            <span>{fromLabel}</span>
          </>
        )}
      </button>

      <button
        className={swapButtonClassName}
        type="button"
        disabled={!canSwapRoute}
        aria-label={swapAriaLabel}
        onClick={onSwap}
      >
        <ArrowRightLeftIcon size={swapIconSize} />
      </button>

      <button
        className={shouldShowToValue ? 'is-selected' : ''}
        type="button"
        onClick={onToClick}
      >
        {shouldShowToValue ? (
          <>
            <strong>{resolvedToCode}</strong>
            <span>{resolvedToName}</span>
          </>
        ) : (
          <>
            <strong>{toPlaceholderCode}</strong>
            <span>{toLabel}</span>
          </>
        )}
      </button>
    </div>
  );
}

export default FlightRouteSelector;

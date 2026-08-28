import { useCallback, useEffect, useId, useRef, useState } from 'react';
import { TRIP_TYPES } from '../../../data/flight-service/tripType';
import { formatKoreanMonthDay, getAppDateText } from '../../../utils/date';
import XIcon from '../../icons/XIcon';
import FlightDatePicker from '../shared/FlightDatePicker';
import FlightLookupField from '../shared/FlightLookupField';
import FlightServicePopupPortal from '../shared/FlightServicePopupPortal';
import { passengerLookupFields } from '../../../data/flight-service/lookupFields';
import useBodyScrollLock from '../../../hooks/useBodyScrollLock';
import useDialogAccessibility from '../../../hooks/useDialogAccessibility';
import useFlightServicePopupPosition from '../shared/useFlightServicePopupPosition';

const POPUP_WIDTHS = {
  date: 960,
  DEFAULT: 520,
};

function FlightMyTripPanel() {
  const [departureDate, setDepartureDate] = useState(getAppDateText());
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [isFullScreenDatePicker, setIsFullScreenDatePicker] = useState(false);
  const popupRef = useRef(null);
  const popupTitleId = `flight-my-trip-popup-${useId().replace(/:/g, '')}`;
  const {
    containerRef: lookupFormRef,
    popupPosition,
    triggerRef,
    updatePopupPosition,
  } = useFlightServicePopupPosition(POPUP_WIDTHS);

  useBodyScrollLock(isDatePickerOpen);

  const closeDatePicker = useCallback(() => {
    setIsDatePickerOpen(false);
    triggerRef.current?.focus();
  }, [triggerRef]);

  useDialogAccessibility({
    dialogRef: popupRef,
    isModal: isFullScreenDatePicker,
    isOpen: isDatePickerOpen,
    onClose: closeDatePicker,
    triggerRef,
  });

  const openDatePicker = (event) => {
    updatePopupPosition('date', event);
    setIsDatePickerOpen(true);
  };

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 768px)');

    const handleChange = (event) => {
      setIsFullScreenDatePicker(event.matches);
    };

    handleChange(mediaQuery);

    mediaQuery.addEventListener('change', handleChange);

    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, []);

  const handleDateChange = (nextDepartureDate) => {
    setDepartureDate(nextDepartureDate);
  };

  return (
    <div className="flight-service-panel flight-service-panel--my-trip">
      <div className="flight-lookup-form" ref={lookupFormRef}>
        {passengerLookupFields.map((field) => (
          <FlightLookupField
            field={field}
            key={field.key}
            value={field.type === 'date' ? formatKoreanMonthDay(departureDate) : undefined}
            onClick={field.type === 'date' ? openDatePicker : undefined}
          />
        ))}
        <button className="flight-service-submit" type="button">
          조회
        </button>

        {isDatePickerOpen && (
          <FlightServicePopupPortal isFullScreen={isFullScreenDatePicker}>
          <div
            className="flight-service-popup flight-service-popup--date"
            style={{
              '--popup-left': `${popupPosition.left}px`,
              '--popup-top': `${popupPosition.top}px`,
            }}
            ref={popupRef}
            role="dialog"
            aria-labelledby={popupTitleId}
            aria-modal={isFullScreenDatePicker}
            tabIndex="-1"
          >
            <header className="flight-service-popup__header">
              <strong id={popupTitleId}>출발일</strong>
              <button type="button" aria-label="선택 창 닫기" onClick={closeDatePicker}>
                <XIcon size={20} />
              </button>
            </header>
            <FlightDatePicker
              firstDate={departureDate}
              showTripTypeOptions={false}
              tripType={TRIP_TYPES.ONE_WAY}
              isFullScreen={isFullScreenDatePicker}
              onClose={closeDatePicker}
              onDateChange={handleDateChange}
            />
          </div>
          </FlightServicePopupPortal>
        )}
      </div>
    </div>
  );
}

export default FlightMyTripPanel;

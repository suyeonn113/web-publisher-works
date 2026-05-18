import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { TRIP_TYPES } from '../../../constants/tripType';
import { 
  formatKoreanMonthDay,
  getAppDateText,
  formatRealtimeDateTime,
} from '../../../utils/date';
import { getAirport } from '../../../utils/airports';
import { sortSelectedDates } from '../../../utils/searchParams';
import XIcon from '../../icons/XIcon';
import AirportSelectionPanel from '../shared/AirportSelectionPanel';
import FlightDateField from '../shared/FlightDateField';
import FlightDatePicker from '../shared/FlightDatePicker';
import FlightRouteSelector from '../shared/FlightRouteSelector';
import useFlightServicePopupPosition from '../shared/useFlightServicePopupPosition';

const PANEL_TYPES = {
  FROM: 'from',
  TO: 'to',
  DATE: 'date',
};

const SEARCH_TYPES = {
  STATUS: 'status',
  WEEKLY: 'weekly',
  REALTIME: 'realtime',
};

const POPUP_WIDTHS = {
  [PANEL_TYPES.DATE]: 960,
  DEFAULT: 520,
};

const REALTIME_FLIGHTS = {
  departures: [
    { flightNo: 'RS 701', time: '09:24', route: '서울/인천(ICN) - 도쿄/나리타(NRT)' },
    { flightNo: 'RS 741', time: '08:41', route: '서울/인천(ICN) - 다카마쓰(TAK)' },
    { flightNo: 'RS 705', time: '08:11', route: '서울/인천(ICN) - 도쿄/나리타(NRT)' },
    { flightNo: 'RS 723', time: '08:04', route: '서울/인천(ICN) - 후쿠오카(FUK)' },
  ],
  arrivals: [
    { flightNo: 'RS 512', time: '07:24', route: '다낭(DAD) - 서울/인천(ICN)' },
    { flightNo: 'RS 528', time: '07:18', route: '나트랑(CXR) - 서울/인천(ICN)' },
  ],
};

function FlightSchedulePanel() {
  const [searchType, setSearchType] = useState(SEARCH_TYPES.STATUS);
  const [routeType, setRouteType] = useState('route');
  const [tripType, setTripType] = useState(TRIP_TYPES.ROUND_TRIP);
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [flightNo, setFlightNo] = useState('');
  const [isFullScreenDatePicker, setIsFullScreenDatePicker] = useState(false);
  const [firstDate, setFirstDate] = useState(getAppDateText());
  const [secondDate, setSecondDate] = useState(getAppDateText());
  const [activePanel, setActivePanel] = useState(null);
  const popupRef = useRef(null);
  const {
    containerRef: searchRef,
    popupPosition,
    triggerRef,
    updatePopupPosition,
  } = useFlightServicePopupPosition(POPUP_WIDTHS);

  const closePanel = useCallback(() => {
    setActivePanel(null);
    triggerRef.current?.focus();
  }, [triggerRef]);

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
  
  useEffect(() => {
    if (activePanel) {
      popupRef.current?.focus();
    }
  }, [activePanel]);

  useEffect(() => {
    if (!activePanel) return undefined;

    const handleEscapeKey = (event) => {
      if (event.key === 'Escape') {
        closePanel();
      }
    };

    window.addEventListener('keydown', handleEscapeKey);

    return () => {
      window.removeEventListener('keydown', handleEscapeKey);
    };
  }, [activePanel, closePanel]);

  const openPanel = (panelType, event) => {
    updatePopupPosition(panelType, event);
    setActivePanel(panelType);
  };

  const handleAirportSelect = (panelType, code) => {
    if ((panelType === PANEL_TYPES.FROM && code === to) || (panelType === PANEL_TYPES.TO && code === from)) {
      return;
    }

    if (panelType === PANEL_TYPES.FROM) {
      setFrom(code);
    } else {
      setTo(code);
    }

    setActivePanel(null);
  };

  const handleDateChange = (nextFirstDate, nextSecondDate) => {
    setFirstDate(nextFirstDate);
    setSecondDate(nextSecondDate);
  };

  const handleFlightNoChange = (event) => {
    setFlightNo(event.target.value.toUpperCase());
  };

  const handleTripTypeChange = (nextTripType) => {
    setTripType(nextTripType);

    if (nextTripType === TRIP_TYPES.ONE_WAY) {
      setSecondDate('');
    }
  };
  const selectedDates = useMemo(() => {
    const dates =
      searchType === SEARCH_TYPES.WEEKLY && tripType === TRIP_TYPES.ROUND_TRIP
        ? [firstDate, secondDate]
        : [firstDate];

    return sortSelectedDates(dates.filter(Boolean));
  }, [firstDate, secondDate, searchType, tripType]);

  const departureDate = selectedDates[0] ?? firstDate;
  const returnDate =
    searchType === SEARCH_TYPES.WEEKLY && tripType === TRIP_TYPES.ROUND_TRIP
      ? selectedDates[1]
      : '';

  const fromAirport = getAirport(from);
  const toAirport = getAirport(to);
  const departureDateLabel = formatKoreanMonthDay(departureDate);
  const returnDateLabel = returnDate ? formatKoreanMonthDay(returnDate) : '';

  const renderServicePopup = () => {
    if (!activePanel) {
      return null;
    }

    return (
      <div
        className={`flight-service-popup flight-service-popup--${activePanel}`}
        style={{
          '--popup-left': `${popupPosition.left}px`,
          '--popup-top': `${popupPosition.top}px`,
        }}
        ref={popupRef}
        role="dialog"
        aria-modal="false"
        tabIndex="-1"
      >
        <header className="flight-service-popup__header">
          <strong>{activePanel === PANEL_TYPES.DATE ? '출발일' : '공항 선택'}</strong>
          <button type="button" aria-label="선택 창 닫기" onClick={closePanel}>
            <XIcon size={20} />
          </button>
        </header>
        {activePanel === PANEL_TYPES.DATE ? (
          <FlightDatePicker
            firstDate={firstDate}
            secondDate={secondDate}
            showTripTypeOptions={searchType === SEARCH_TYPES.WEEKLY}
            tripType={searchType === SEARCH_TYPES.WEEKLY ? tripType : TRIP_TYPES.ONE_WAY}
            isFullScreen={isFullScreenDatePicker}
            onClose={closePanel}
            onDateChange={handleDateChange}
            onTripTypeChange={handleTripTypeChange}
          />
        ) : (
          <AirportSelectionPanel
            disabledCode={activePanel === PANEL_TYPES.FROM ? to : from}
            selectedCode={activePanel === PANEL_TYPES.FROM ? from : to}
            onSelect={(code) => handleAirportSelect(activePanel, code)}
          />
        )}
      </div>
    );
  };

  return (
    <div className="flight-service-panel flight-service-panel--schedule">
      <div className="flight-schedule-options">
        <div className="flight-service-chips" role="group" aria-label="조회 유형">
          <button
            className={searchType === SEARCH_TYPES.STATUS ? 'is-active' : ''}
            type="button"
            onClick={() => setSearchType(SEARCH_TYPES.STATUS)}
          >
            출도착 조회
          </button>
          <button
            className={searchType === SEARCH_TYPES.WEEKLY ? 'is-active' : ''}
            type="button"
            onClick={() => setSearchType(SEARCH_TYPES.WEEKLY)}
          >
            주간 스케줄
          </button>
          <button
            className={searchType === SEARCH_TYPES.REALTIME ? 'is-active' : ''}
            type="button"
            onClick={() => setSearchType(SEARCH_TYPES.REALTIME)}
          >
            실시간
          </button>
        </div>
        {searchType === SEARCH_TYPES.WEEKLY && (
          <div className="flight-service-chips" role="group" aria-label="여정 유형">
            <button
              className={tripType === TRIP_TYPES.ROUND_TRIP ? 'is-active' : ''}
              type="button"
              onClick={() => handleTripTypeChange(TRIP_TYPES.ROUND_TRIP)}
            >
              왕복
            </button>
            <button
              className={tripType === TRIP_TYPES.ONE_WAY ? 'is-active' : ''}
              type="button"
              onClick={() => handleTripTypeChange(TRIP_TYPES.ONE_WAY)}
            >
              편도
            </button>
          </div>
        )}
        {searchType === SEARCH_TYPES.STATUS && (
        <div className="flight-service-chips" role="group" aria-label="조회 기준">
          <button
            className={routeType === 'route' ? 'is-active' : ''}
            type="button"
            onClick={() => setRouteType('route')}
          >
            출/도착지
          </button>
          <button
            className={routeType === 'flightNo' ? 'is-active' : ''}
            type="button"
            onClick={() => setRouteType('flightNo')}
          >
            편명
          </button>
        </div>
        )}
      </div>

      {searchType === SEARCH_TYPES.REALTIME ? (
        <section className="flight-schedule-realtime" aria-label="실시간 출도착 정보">
          <header>
            <h3>실시간 출도착 정보</h3>
            <span>{formatRealtimeDateTime()} 기준</span>
          </header>
          <div className="flight-schedule-realtime__board">
            <section>
              <h4>출발</h4>
              {REALTIME_FLIGHTS.departures.map((flight) => (
                <div className="flight-schedule-realtime__row" key={`${flight.flightNo}-${flight.time}`}>
                  <strong>{flight.flightNo}</strong>
                  <span>{flight.time}</span>
                  <em>{flight.route}</em>
                </div>
              ))}
            </section>
            <section>
              <h4>도착</h4>
              {REALTIME_FLIGHTS.arrivals.map((flight) => (
                <div className="flight-schedule-realtime__row" key={`${flight.flightNo}-${flight.time}`}>
                  <strong>{flight.flightNo}</strong>
                  <span>{flight.time}</span>
                  <em>{flight.route}</em>
                </div>
              ))}
            </section>
          </div>
        </section>
      ) : (
        <div className="flight-schedule-search" ref={searchRef}>
          {routeType === 'flightNo' && searchType === SEARCH_TYPES.STATUS ? (
            <label className="flight-schedule-flight-number">
              <span>편명</span>

              <div className="flight-schedule-flight-number__input">
                <strong>RS</strong>

                <input
                  type="text"
                  value={flightNo}
                  onChange={handleFlightNoChange}
                  placeholder="예: 001"
                  aria-label="편명 번호 입력"
                />
              </div>
            </label>
          ) : (
            <FlightRouteSelector
              className="flight-route-selector flight-route-selector--summary"
              variant="placeholder"
              fromAirport={fromAirport}
              toAirport={toAirport}
              onFromClick={(event) => openPanel(PANEL_TYPES.FROM, event)}
              onSwap={() => {
                setFrom(to);
                setTo(from);
              }}
              onToClick={(event) => openPanel(PANEL_TYPES.TO, event)}
              swapIconSize={22}
            />
          )}
          <FlightDateField
            departureDateLabel={departureDateLabel}
            returnDateLabel={returnDateLabel}
            onClick={(event) => openPanel(PANEL_TYPES.DATE, event)}
          />
          <button className="flight-service-submit" type="button">
            조회
          </button>
          {renderServicePopup()}
        </div>
      )}

    </div>
  );
}

export default FlightSchedulePanel;

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import AdultIcon from '../../icons/AdultIcon';
import ChildIcon from '../../icons/ChildIcon';
import ChevronDownIcon from '../../icons/ChevronDownIcon';
import ChevronUpIcon from '../../icons/ChevronUpIcon';
import CircleQuestionMarkIcon from '../../icons/CircleQuestionMarkIcon';
import InfantIcon from '../../icons/InfantIcon';
import MinusIcon from '../../icons/MinusIcon';
import PlusIcon from '../../icons/PlusIcon';
import XIcon from '../../icons/XIcon';
import { TRIP_TYPES } from '../../../constants/tripType';
import { formatKoreanMonthDay } from '../../../utils/date';
import {
  createSearchParamsFromCalendar,
  sortSelectedDates,
} from '../../../utils/searchParams';
import useBodyScrollLock from '../../../hooks/useBodyScrollLock';
import AirportSelectionPanel from '../shared/AirportSelectionPanel';
import FlightDateField from '../shared/FlightDateField';
import FlightDatePicker from '../shared/FlightDatePicker';
import FlightRouteSelector from '../shared/FlightRouteSelector';
import useFlightServicePopupPosition from '../shared/useFlightServicePopupPosition';
import { getAirport } from '../../../utils/airports';

const PANEL_TYPES = {
  FROM: 'from',
  TO: 'to',
  DATE: 'date',
  PASSENGERS: 'passengers',
};

const POPUP_WIDTHS = {
  [PANEL_TYPES.DATE]: 960,
  [PANEL_TYPES.PASSENGERS]: 720,
  DEFAULT: 520,
};

const PASSENGER_TYPES = [
  { key: 'adult', label: '성인', min: 1 },
  { key: 'child', label: '소아', min: 0 },
  { key: 'infant', label: '유아', min: 0 },
];

const PASSENGER_NOTICE_GROUPS = [
  {
    title: '소아/유아 및 만 14세 미만 탑승객 안내',
    items: [
      {
        text: '소아는 첫 번째 항공편 출발일 기준 나이입니다. 유아는 각 항공편 탑승일 기준 나이입니다.',
      },
      {
        text: '유아는 생후 7일부터 탑승 가능하며 좌석은 점유하지 않습니다. 또한 탑승일 기준 만 18세 이상의 보호자가 동반해야 하며, 함께 예약되어야 합니다.',
        isAccent: true,
      },
      {
        text: '유아 좌석 점유를 원하시는 경우, 소아로 예매를 진행하시기 바랍니다.',
      },
      {
        text: '만 14세 미만 탑승객은 예매 시 법정대리인의 동의 및 인증이 필요합니다. 로그인 후 예매를 진행하여 주시기 바랍니다.',
        isAccent: true,
      },
    ],
  },
  {
    title: '구매와 동시에 발권 진행 시 유의사항',
    items: [
      {
        text: '마일리지 공제를 위해 등록된 가족 기준으로 탑승객을 선택해 주시기 바랍니다.',
      },
      {
        text: '가족 마일리지 합산은 로그인 회원 본인 1인 예매 시에만 가능합니다.',
      },
    ],
  },
];

function FlightBookingPanel({ defaultValues, onSearch }) {
  const [tripType, setTripType] = useState(defaultValues?.tripType ?? TRIP_TYPES.ROUND_TRIP);
  const [from, setFrom] = useState(defaultValues?.from ?? 'ICN');
  const [to, setTo] = useState(defaultValues?.to ?? '');
  const [firstDate, setFirstDate] = useState(defaultValues?.departureDate ?? '');
  const [secondDate, setSecondDate] = useState(defaultValues?.returnDate ?? '');
  const [passengers, setPassengers] = useState({ adult: 1, child: 0, infant: 0 });

  const [isFullScreenDatePicker, setIsFullScreenDatePicker] = useState(false);


  const [promotionCode, setPromotionCode] = useState('');
  const [activePanel, setActivePanel] = useState(null);
  const [isAgeCalculatorOpen, setIsAgeCalculatorOpen] = useState(false);
  const [hasPendingRoundTripDate, setHasPendingRoundTripDate] = useState(false);
  const popupRef = useRef(null);
  const {
    containerRef: searchRef,
    popupPosition,
    triggerRef,
    updatePopupPosition,
  } = useFlightServicePopupPosition(POPUP_WIDTHS);

  const selectedDates = useMemo(() => {
    const dates = tripType === TRIP_TYPES.ONE_WAY ? [firstDate] : [firstDate, secondDate];
    return sortSelectedDates(dates.filter(Boolean));
  }, [firstDate, secondDate, tripType]);

  const departureDate = selectedDates[0] ?? firstDate;
  const returnDate = tripType === TRIP_TYPES.ROUND_TRIP ? selectedDates[1] : '';
  const fromAirport = getAirport(from);
  const toAirport = getAirport(to);
  const departureDateLabel = formatKoreanMonthDay(departureDate);
  const returnDateLabel = returnDate ? formatKoreanMonthDay(returnDate) : '';

  useBodyScrollLock(Boolean(activePanel));

  const closePanel = useCallback(({ shouldValidateDate = false } = {}) => {
    if (
      shouldValidateDate &&
      activePanel === PANEL_TYPES.DATE &&
      tripType === TRIP_TYPES.ROUND_TRIP &&
      hasPendingRoundTripDate
    ) {
      window.alert('왕복 일정은 오는 날을 선택해 주세요.');
      return;
    }

    setActivePanel(null);
    triggerRef.current?.focus();
  }, [activePanel, hasPendingRoundTripDate, triggerRef, tripType]);

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
    if (!activePanel) {
      return undefined;
    }

    const handleEscapeKey = (event) => {
      if (event.key === 'Escape') {
        closePanel({ shouldValidateDate: true });
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

    if (panelType === PANEL_TYPES.DATE) {
      setHasPendingRoundTripDate(false);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    onSearch?.(
      createSearchParamsFromCalendar({
        tripType,
        from,
        to,
        selectedDates,
      })
    );
  };

  const handleTripTypeClick = (nextTripType) => {
    setTripType(nextTripType);

    if (nextTripType === TRIP_TYPES.ONE_WAY) {
      setSecondDate('');
    }

    openPanel(PANEL_TYPES.DATE, { currentTarget: document.activeElement });
  };

  const handleDateChange = (nextFirstDate, nextSecondDate) => {
    setFirstDate(nextFirstDate);
    setSecondDate(nextSecondDate);
    setHasPendingRoundTripDate(
      activePanel === PANEL_TYPES.DATE &&
        tripType === TRIP_TYPES.ROUND_TRIP &&
        Boolean(nextFirstDate) &&
        !nextSecondDate
    );
  };

  const updatePassenger = (key, amount) => {
    const passengerType = PASSENGER_TYPES.find((type) => type.key === key);

    setPassengers((currentPassengers) => ({
      ...currentPassengers,
      [key]: Math.max(passengerType.min, currentPassengers[key] + amount),
    }));
  };

  const handleAirportSelect = (panelType, code) => {
    if (
      (panelType === PANEL_TYPES.FROM && code === to) ||
      (panelType === PANEL_TYPES.TO && code === from)
    ) {
      return;
    }

    if (panelType === PANEL_TYPES.FROM) {
      setFrom(code);
    } else {
      setTo(code);
    }

    setActivePanel(null);
  };

  const handleSwapRoute = () => {
    setFrom(to);
    setTo(from);
  };

  const renderPassengerTooltip = (key) => {
    if (key === 'child') {
      return (
        <span role="tooltip">
          국내선: 만 2세 이상 ~ 만 13세 미만
          <br />
          국제선: 만 2세 이상 ~ 만 12세 미만
        </span>
      );
    }

    if (key === 'infant') {
      return <span role="tooltip">만 2세 미만은 유아 운임이 적용됩니다.</span>;
    }

    return <span role="tooltip">만 12세 이상은 성인 운임이 적용됩니다.</span>;
  };

  const renderPassengersPanel = () => (
    <div className="flight-passenger-picker">
      <div className="flight-passenger-picker__counters">
        {PASSENGER_TYPES.map((type) => (
          <div className="flight-passenger-picker__counter" key={type.key}>
            <span className="flight-passenger-picker__counter-label">
              {type.label}
              <button className="flight-booking-panel__help" type="button">
                <span className="flight-booking-panel__help-hit">
                  <CircleQuestionMarkIcon size={16} />
                </span>
                {renderPassengerTooltip(type.key)}
              </button>
            </span>
            <div className="flight-passenger-picker__counter-controls">
              <button
                type="button"
                disabled={passengers[type.key] <= type.min}
                onClick={() => updatePassenger(type.key, -1)}
              >
                <MinusIcon size={20} />
              </button>
              <strong>{passengers[type.key]}</strong>
              <button type="button" onClick={() => updatePassenger(type.key, 1)}>
                <PlusIcon size={20} />
              </button>
            </div>
          </div>
        ))}
      </div>

      <button
        className="flight-passenger-picker__age-toggle"
        type="button"
        onClick={() => setIsAgeCalculatorOpen((isOpen) => !isOpen)}
      >
        나이 계산기
        {isAgeCalculatorOpen ? <ChevronUpIcon size={16} /> : <ChevronDownIcon size={16} />}
      </button>

      {isAgeCalculatorOpen && (
        <div className="flight-passenger-picker__age-calculator">
          <strong>생년월일</strong>
          <div>
            <select aria-label="연도">
              <option>연도</option>
            </select>
            <select aria-label="월">
              <option>월</option>
            </select>
            <select aria-label="일">
              <option>일</option>
            </select>
            <button type="button">계산하기</button>
          </div>
        </div>
      )}

      <div className="flight-passenger-picker__notice">
        {PASSENGER_NOTICE_GROUPS.map((group) => (
          <section key={group.title}>
            <h3>{group.title}</h3>
            <ul>
              {group.items.map((notice) => (
                <li className={notice.isAccent ? 'is-accent' : ''} key={notice.text}>
                  {notice.text}
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );

  const getPanelTitle = () => {
    if (activePanel === PANEL_TYPES.FROM) return '출발지';
    if (activePanel === PANEL_TYPES.TO) return '도착지';
    if (activePanel === PANEL_TYPES.DATE) return '출발일';
    if (activePanel === PANEL_TYPES.PASSENGERS) return '탑승객 선택';
    return '';
  };

  const renderActivePanel = () => {
    if (activePanel === PANEL_TYPES.FROM || activePanel === PANEL_TYPES.TO) {
      return (
        <AirportSelectionPanel
          disabledCode={activePanel === PANEL_TYPES.FROM ? to : from}
          selectedCode={activePanel === PANEL_TYPES.FROM ? from : to}
          onSelect={(code) => handleAirportSelect(activePanel, code)}
        />
      );
    }

    if (activePanel === PANEL_TYPES.DATE) {
      return (
        <FlightDatePicker
          firstDate={firstDate}
          secondDate={secondDate}
          tripType={tripType}
          isFullScreen={isFullScreenDatePicker}
          onClose={closePanel}
          onDateChange={handleDateChange}
          onTripTypeChange={setTripType}
        />
      );
    }

    if (activePanel === PANEL_TYPES.PASSENGERS) {
      return renderPassengersPanel();
    }

    return null;
  };

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
          <strong>{getPanelTitle()}</strong>
          <button
            type="button"
            aria-label="선택 창 닫기"
            onClick={() => closePanel({ shouldValidateDate: true })}
          >
            <XIcon size={20} />
          </button>
        </header>
        {renderActivePanel()}
      </div>
    );
  };

  return (
    <form className="flight-booking-panel__content" onSubmit={handleSubmit}>
      <div className="flight-booking-panel__options">
        <div className="flight-service-chips" role="group" aria-label="여정 유형">
          <button
            className={tripType === TRIP_TYPES.ROUND_TRIP ? 'is-active' : ''}
            type="button"
            onClick={() => handleTripTypeClick(TRIP_TYPES.ROUND_TRIP)}
          >
            왕복
          </button>
          <button
            className={tripType === TRIP_TYPES.ONE_WAY ? 'is-active' : ''}
            type="button"
            onClick={() => handleTripTypeClick(TRIP_TYPES.ONE_WAY)}
          >
            편도
          </button>
        </div>

        <label className="flight-booking-panel__promo">
          <span>
            프로모션 코드
            <button
              className="flight-booking-panel__help"
              type="button"
              aria-label="프로모션 코드 안내"
            >
              <span className="flight-booking-panel__help-hit">
                <CircleQuestionMarkIcon size={16} />
              </span>
              <span role="tooltip">프로모션 코드를 입력하시면 할인 금액을 조회합니다.</span>
            </button>
          </span>
          <input
            type="text"
            value={promotionCode}
            placeholder="코드 입력"
            onChange={(event) => setPromotionCode(event.target.value)}
          />
        </label>
      </div>

      <div className="flight-booking-panel__search" ref={searchRef}>
        <FlightRouteSelector
          fromAirport={fromAirport}
          toAirport={toAirport}
          onFromClick={(event) => openPanel(PANEL_TYPES.FROM, event)}
          onSwap={handleSwapRoute}
          onToClick={(event) => openPanel(PANEL_TYPES.TO, event)}
        />
        <FlightDateField
          departureDateLabel={departureDateLabel}
          returnDateLabel={returnDateLabel}
          onClick={(event) => openPanel(PANEL_TYPES.DATE, event)}
        />
        <button
          className="flight-service-field-button flight-passenger-field"
          type="button"
          onClick={(event) => openPanel(PANEL_TYPES.PASSENGERS, event)}
        >
          <span>탑승객</span>
          <strong className="flight-booking-panel__passenger-value">
            <span>
              <AdultIcon size={15} />
              성인 {passengers.adult}
            </span>
            <span>
              <ChildIcon size={15} />
              소아 {passengers.child}
            </span>
            <span>
              <InfantIcon size={15} />
              유아 {passengers.infant}
            </span>
          </strong>
        </button>
        {renderServicePopup()}
        <button className="flight-booking-panel__submit" type="submit">
          항공권 검색
        </button>
      </div>
    </form>
  );
}

export default FlightBookingPanel;

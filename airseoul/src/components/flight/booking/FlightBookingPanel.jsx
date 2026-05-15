import { useEffect, useMemo, useRef, useState } from 'react';
import AdultIcon from '../../icons/AdultIcon';
import ArrowRightLeftIcon from '../../icons/ArrowRightLeftIcon';
import CalendarIcon from '../../icons/CalendarIcon';
import ChildIcon from '../../icons/ChildIcon';
import ChevronDownIcon from '../../icons/ChevronDownIcon';
import ChevronUpIcon from '../../icons/ChevronUpIcon';
import CircleQuestionMarkIcon from '../../icons/CircleQuestionMarkIcon';
import InfantIcon from '../../icons/InfantIcon';
import MinusIcon from '../../icons/MinusIcon';
import PlusIcon from '../../icons/PlusIcon';
import { TRIP_TYPES } from '../../../constants/tripType';
import { airportGroups, airports } from '../../../data/airports';
import { formatKoreanMonthDay } from '../../../utils/date';
import {
  createSearchParamsFromCalendar,
  sortSelectedDates,
} from '../../../utils/searchParams';
import FlightDatePicker from './FlightDatePicker';

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
    title: '소아/유아 및 만 14세 미만 승객 안내',
    items: [
      {
        text: '소아는 첫번째 항공편 출발일 기준 나이입니다. 유아는 각 항공편별 탑승일 기준 나이입니다.',
      },
      {
        text: '유아는 생후 7일부터 탑승 가능하며, 좌석을 점유하지 않습니다. 또한 탑승일 기준 만 18세 이상의 보호자가 동반해야 하며, 함께 예약되어야 합니다.',
        isAccent: true,
      },
      {
        text: '유아 좌석 점유를 원하시는 경우, 소아로 예매를 진행하시기 바랍니다.',
      },
      {
        text: '만 14세 미만 승객은 예매 시 법정대리인의 동의 및 인증이 필요합니다. 로그인 후 예매를 진행하여 주시기 바랍니다.',
        isAccent: true,
      },
    ],
  },
  {
    title: '구매와 동시승급 진행 시 유의사항',
    items: [
      {
        text: '마일리지 공제를 위해 등록된 가족 기준으로 승객선택을 해주시기 바랍니다.',
      },
      {
        text: '가족 마일리지 합산은 로그인 회원 본인 1인 예매 시에만 가능합니다.',
      },
    ],
  },
];

const getAirport = (code) => airports.find((airport) => airport.code === code);

const formatAirportDisplayName = (airport) => {
  if (!airport) {
    return '';
  }

  if (airport.city === airport.airport || airport.city.includes(airport.airport)) {
    return airport.city;
  }

  return `${airport.city}/${airport.airport}`;
};

function FlightBookingPanel({ defaultValues, onSearch }) {
  const [tripType, setTripType] = useState(defaultValues?.tripType ?? TRIP_TYPES.ROUND_TRIP);
  const [from, setFrom] = useState(defaultValues?.from ?? 'ICN');
  const [to, setTo] = useState(defaultValues?.to ?? 'KIX');
  const [firstDate, setFirstDate] = useState(defaultValues?.departureDate ?? '');
  const [secondDate, setSecondDate] = useState(defaultValues?.returnDate ?? '');
  const [passengers, setPassengers] = useState({ adult: 1, child: 0, infant: 0 });
  const [promotionCode, setPromotionCode] = useState('');
  const [activePanel, setActivePanel] = useState(null);
  const [popupPosition, setPopupPosition] = useState({ left: 0 });
  const [isAgeCalculatorOpen, setIsAgeCalculatorOpen] = useState(false);
  const searchRef = useRef(null);
  const popupRef = useRef(null);
  const triggerRef = useRef(null);

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

  const closePanel = () => {
    setActivePanel(null);
    triggerRef.current?.focus();
  };

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
        closePanel();
      }
    };

    window.addEventListener('keydown', handleEscapeKey);

    return () => {
      window.removeEventListener('keydown', handleEscapeKey);
    };
  }, [activePanel]);

  const openPanel = (panelType, event) => {
    triggerRef.current = event.currentTarget;
    const triggerRect = event.currentTarget.getBoundingClientRect();
    const searchRect = searchRef.current?.getBoundingClientRect();

    if (searchRect) {
      const popupWidth = Math.min(
        POPUP_WIDTHS[panelType] ?? POPUP_WIDTHS.DEFAULT,
        searchRect.width
      );
      const preferredLeft = triggerRect.left - searchRect.left;
      const maxLeft = Math.max(searchRect.width - popupWidth, 0);

      setPopupPosition({
        left: Math.min(Math.max(preferredLeft, 0), maxLeft),
      });
    }

    setActivePanel(panelType);
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

  const renderAirportPanel = (panelType) => (
    <div className="flight-booking-popup__airports">
      {airportGroups.map((group) => (
        <section key={group.region}>
          <h3>{group.region}</h3>
          <div>
            {group.airports.map((airport) => {
              const isSelected = (panelType === PANEL_TYPES.FROM ? from : to) === airport.code;
              const isDisabled =
                (panelType === PANEL_TYPES.FROM && airport.code === to) ||
                (panelType === PANEL_TYPES.TO && airport.code === from);

              return (
                <button
                  className={isSelected ? 'is-active' : ''}
                  disabled={isDisabled}
                  key={airport.code}
                  type="button"
                  onClick={() => handleAirportSelect(panelType, airport.code)}
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

  const renderPassengerTooltip = (key) => {
    if (key === 'child') {
      return (
        <span role="tooltip">
          국내선 : 만 2세 이상 ~ 만 13세 미만
          <br />
          국제선 : 만 2세 이상 ~ 만 12세 미만
        </span>
      );
    }

    if (key === 'infant') {
      return <span role="tooltip">만 2세 미만은 유아 운임이 적용됩니다.</span>;
    }

    return <span role="tooltip">만 12세 이상은 성인 운임이 적용됩니다.</span>;
  };

  const renderPassengersPanel = () => (
    <div className="flight-booking-popup__passenger-panel">
      <div className="flight-booking-popup__passenger-counters">
        {PASSENGER_TYPES.map((type) => (
          <div className="flight-booking-popup__counter" key={type.key}>
            <span className="flight-booking-popup__counter-label">
              {type.label}
              <button className="flight-booking-panel__help" type="button">
                <span className="flight-booking-panel__help-hit">
                  <CircleQuestionMarkIcon size={16} />
                </span>
                {renderPassengerTooltip(type.key)}
              </button>
            </span>
            <div className="flight-booking-popup__counter-controls">
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
        className="flight-booking-popup__age-toggle"
        type="button"
        onClick={() => setIsAgeCalculatorOpen((isOpen) => !isOpen)}
      >
        나이 계산기
        {isAgeCalculatorOpen ? <ChevronUpIcon size={16} /> : <ChevronDownIcon size={16} />}
      </button>

      {isAgeCalculatorOpen && (
        <div className="flight-booking-popup__age-calculator">
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

      <div className="flight-booking-popup__passenger-notice">
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
    if (activePanel === PANEL_TYPES.PASSENGERS) return '승객 선택';
    return '';
  };

  const renderActivePanel = () => {
    if (activePanel === PANEL_TYPES.FROM || activePanel === PANEL_TYPES.TO) {
      return renderAirportPanel(activePanel);
    }

    if (activePanel === PANEL_TYPES.DATE) {
      return (
        <FlightDatePicker
          firstDate={firstDate}
          secondDate={secondDate}
          tripType={tripType}
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

  return (
    <form className="flight-booking-panel__content" onSubmit={handleSubmit}>
      <div className="flight-booking-panel__options">
        <div className="flight-booking-panel__chips" role="group" aria-label="여정 유형">
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
              <span role="tooltip">프로모션 코드를 입력하시면 할인된 금액을 조회합니다.</span>
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
        <div className="flight-booking-panel__route">
          <button type="button" onClick={(event) => openPanel(PANEL_TYPES.FROM, event)}>
            <span>출발지</span>
            <strong>{fromAirport?.code}</strong>
            <em>{formatAirportDisplayName(fromAirport)}</em>
          </button>

          <button
            className="flight-booking-panel__swap"
            type="button"
            aria-label="출발지와 도착지 바꾸기"
            onClick={handleSwapRoute}
          >
            <ArrowRightLeftIcon size={24} />
          </button>

          <button type="button" onClick={(event) => openPanel(PANEL_TYPES.TO, event)}>
            <span>도착지</span>
            <strong>{toAirport?.code}</strong>
            <em>{formatAirportDisplayName(toAirport)}</em>
          </button>
        </div>

        <button
          className="flight-booking-panel__field flight-booking-panel__date"
          type="button"
          onClick={(event) => openPanel(PANEL_TYPES.DATE, event)}
        >
          <span>출발일</span>
          <strong className="flight-booking-panel__date-value">
            <CalendarIcon size={18} />
            {returnDateLabel ? (
              <>
                <span className="flight-booking-panel__date-start">{departureDateLabel} ~</span>
                <span className="flight-booking-panel__date-end">{returnDateLabel}</span>
              </>
            ) : (
              departureDateLabel
            )}
          </strong>
        </button>

        <button
          className="flight-booking-panel__field"
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

        <button className="flight-booking-panel__submit" type="submit">
          항공편 검색
        </button>
      </div>

      {activePanel && (
        <div
          className={`flight-booking-popup flight-booking-popup--${activePanel}`}
          style={{ '--popup-left': `${popupPosition.left}px` }}
          ref={popupRef}
          role="dialog"
          aria-modal="false"
          tabIndex="-1"
        >
          <header className="flight-booking-popup__header">
            <strong>{getPanelTitle()}</strong>
            <button type="button" aria-label="선택 창 닫기" onClick={closePanel}>
              ×
            </button>
          </header>
          {renderActivePanel()}
        </div>
      )}
    </form>
  );
}

export default FlightBookingPanel;

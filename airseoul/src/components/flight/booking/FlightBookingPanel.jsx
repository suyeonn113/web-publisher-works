import { useCallback, useEffect, useId, useMemo, useRef, useState } from 'react';
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
import { formatKoreanMonthDay, getAppNow } from '../../../utils/date';
import {
  createSearchParamsFromCalendar,
  sortSelectedDates,
} from '../../../utils/searchParams';
import useBodyScrollLock from '../../../hooks/useBodyScrollLock';
import useDialogAccessibility from '../../../hooks/useDialogAccessibility';
import AirportSelectionPanel from '../shared/AirportSelectionPanel';
import FlightDateField from '../shared/FlightDateField';
import FlightDatePicker from '../shared/FlightDatePicker';
import FlightRouteSelector from '../shared/FlightRouteSelector';
import FlightSelectMenu from '../shared/FlightSelectMenu';
import useFlightServicePopupPosition from '../shared/useFlightServicePopupPosition';
import { getAirport } from '../../../utils/airports';
import {
  AGE_CALCULATOR_PLACEHOLDERS,
  getDefaultPassengers,
  MIN_BIRTH_YEAR,
  PANEL_TYPES,
  PASSENGER_NOTICE_GROUPS,
  PASSENGER_TYPES,
  POPUP_WIDTHS,
} from './bookingPanelData';

const getAgeCalculatorDateParts = () => {
  const appNow = getAppNow();

  return {
    year: appNow.getFullYear(),
    month: appNow.getMonth() + 1,
    day: appNow.getDate(),
  };
};

const getYearOptions = (currentYear) =>
  Array.from({ length: currentYear - MIN_BIRTH_YEAR + 1 }, (_, index) => {
    const year = currentYear - index;

    return {
      label: `${year}년`,
      value: String(year),
    };
  });

const getMonthOptions = (year, appDateParts) => {
  const lastMonth = year === appDateParts.year ? appDateParts.month : 12;

  return Array.from({ length: lastMonth }, (_, index) => {
    const month = index + 1;

    return {
      label: `${month}월`,
      value: String(month),
    };
  });
};

const getDayOptions = (year, month, appDateParts) => {
  const daysInMonth = new Date(year, month, 0).getDate();
  const lastDay =
    year === appDateParts.year && month === appDateParts.month
      ? appDateParts.day
      : daysInMonth;

  return Array.from({ length: lastDay }, (_, index) => {
    const day = index + 1;

    return {
      label: `${day}일`,
      value: String(day),
    };
  });
};

function FlightBookingPanel({ defaultValues, onSearch, variant = 'home', isCollapsible = false }) {
  const isResultsVariant = variant === 'results';
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [tripType, setTripType] = useState(defaultValues?.tripType ?? TRIP_TYPES.ROUND_TRIP);
  const [from, setFrom] = useState(defaultValues?.from ?? 'ICN');
  const [to, setTo] = useState(defaultValues?.to ?? '');
  const [firstDate, setFirstDate] = useState(defaultValues?.departureDate ?? '');
  const [secondDate, setSecondDate] = useState(defaultValues?.returnDate ?? '');
  const [passengers, setPassengers] = useState(() => getDefaultPassengers(defaultValues));

  const [isFullScreenDatePicker, setIsFullScreenDatePicker] = useState(false);


  const [promotionCode, setPromotionCode] = useState('');
  const [activePanel, setActivePanel] = useState(null);
  const [isAgeCalculatorOpen, setIsAgeCalculatorOpen] = useState(false);
  const [ageCalculatorDateParts] = useState(getAgeCalculatorDateParts);
  const [birthYear, setBirthYear] = useState('');
  const [birthMonth, setBirthMonth] = useState('');
  const [birthDay, setBirthDay] = useState('');
  const [hasPendingRoundTripDate, setHasPendingRoundTripDate] = useState(false);
  const popupRef = useRef(null);
  const popupTitleId = `flight-booking-popup-${useId().replace(/:/g, '')}`;
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
  const birthYearNumber = Number(birthYear) || ageCalculatorDateParts.year;
  const birthMonthNumber = Number(birthMonth) || ageCalculatorDateParts.month;
  const birthMonthOptions = getMonthOptions(birthYearNumber, ageCalculatorDateParts);
  const birthDayOptions = getDayOptions(birthYearNumber, birthMonthNumber, ageCalculatorDateParts);
  const fromAirport = getAirport(from);
  const toAirport = getAirport(to);
  const departureDateLabel = formatKoreanMonthDay(departureDate);
  const returnDateLabel = returnDate ? formatKoreanMonthDay(returnDate) : '';

  useBodyScrollLock(Boolean(activePanel));

  useEffect(() => {
    setTripType(defaultValues?.tripType ?? TRIP_TYPES.ROUND_TRIP);
    setFrom(defaultValues?.from ?? 'ICN');
    setTo(defaultValues?.to ?? '');
    setFirstDate(defaultValues?.departureDate ?? '');
    setSecondDate(defaultValues?.returnDate ?? '');
    setPassengers({
      adult: Number(defaultValues?.adult) || 1,
      child: Number(defaultValues?.child) || 0,
      infant: Number(defaultValues?.infant) || 0,
    });
  }, [
    defaultValues?.adult,
    defaultValues?.child,
    defaultValues?.departureDate,
    defaultValues?.from,
    defaultValues?.infant,
    defaultValues?.returnDate,
    defaultValues?.to,
    defaultValues?.tripType,
  ]);

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
  const closePanelWithValidation = useCallback(() => {
    closePanel({ shouldValidateDate: true });
  }, [closePanel]);

  useDialogAccessibility({
    dialogRef: popupRef,
    isModal: isFullScreenDatePicker,
    isOpen: Boolean(activePanel),
    onClose: closePanelWithValidation,
    triggerRef,
  });

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

  const openPanel = (panelType, event) => {
    updatePopupPosition(panelType, event);
    setActivePanel(panelType);

    if (panelType === PANEL_TYPES.DATE) {
      setHasPendingRoundTripDate(false);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!departureDate) {
      window.alert('출발일을 선택해 주세요.');
      return;
    }

    if (tripType === TRIP_TYPES.ROUND_TRIP && !returnDate) {
      window.alert('왕복 일정은 오는 날을 선택해 주세요.');
      return;
    }

    if (tripType === TRIP_TYPES.ROUND_TRIP && !from) {
      window.alert('출발지를 선택해 주세요.');
      return;
    }

    if (tripType === TRIP_TYPES.ROUND_TRIP && !to) {
      window.alert('도착지를 선택해 주세요.');
      return;
    }

    onSearch?.(
      {
        ...createSearchParamsFromCalendar({
        tripType,
        from,
        to,
        selectedDates,
        }),
        ...passengers,
      }
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

    closePanel();
  };

  const handleSwapRoute = () => {
    setFrom(to);
    setTo(from);
  };

  const renderPassengerTooltip = (key, tooltipId) => {
    if (key === 'child') {
      return (
        <span id={tooltipId} role="tooltip">
          국내선: 만 2세 이상 ~ 만 13세 미만
          <br />
          국제선: 만 2세 이상 ~ 만 12세 미만
        </span>
      );
    }

    if (key === 'infant') {
      return <span id={tooltipId} role="tooltip">만 2세 미만은 유아 운임이 적용됩니다.</span>;
    }

    return <span id={tooltipId} role="tooltip">만 12세 이상은 성인 운임이 적용됩니다.</span>;
  };

  const renderPassengersPanel = () => (
    <div className="flight-passenger-picker">
      <div className="flight-passenger-picker__counters">
        {PASSENGER_TYPES.map((type) => {
          const tooltipId = `${popupTitleId}-${type.key}-help`;

          return (
            <div className="flight-passenger-picker__counter" key={type.key}>
              <span className="flight-passenger-picker__counter-label">
                {type.label}
                <button
                  aria-describedby={tooltipId}
                  aria-label={`${type.label} 연령 기준 안내`}
                  className="flight-booking-panel__help"
                  type="button"
                >
                  <span className="flight-booking-panel__help-hit">
                    <CircleQuestionMarkIcon size={16} />
                  </span>
                  {renderPassengerTooltip(type.key, tooltipId)}
                </button>
              </span>
              <div className="flight-passenger-picker__counter-controls">
                <button
                  aria-label={`${type.label} 수 감소`}
                  type="button"
                  disabled={passengers[type.key] <= type.min}
                  onClick={() => updatePassenger(type.key, -1)}
                >
                  <MinusIcon size={20} />
                </button>
                <strong aria-live="polite">{passengers[type.key]}</strong>
                <button
                  aria-label={`${type.label} 수 증가`}
                  type="button"
                  onClick={() => updatePassenger(type.key, 1)}
                >
                  <PlusIcon size={20} />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <button
        aria-expanded={isAgeCalculatorOpen}
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
            <FlightSelectMenu
              ariaLabel="연도"
              onSelect={(year) => {
                if (!year) {
                  setBirthYear('');
                  setBirthMonth('');
                  setBirthDay('');
                  return;
                }

                const nextMonthOptions = getMonthOptions(Number(year), ageCalculatorDateParts);
                const nextMonth = nextMonthOptions.some((option) => option.value === birthMonth)
                  ? birthMonth
                  : nextMonthOptions[nextMonthOptions.length - 1].value;
                const nextDayOptions = getDayOptions(
                  Number(year),
                  Number(nextMonth),
                  ageCalculatorDateParts,
                );

                setBirthYear(year);
                setBirthMonth(nextMonth);
                setBirthDay((day) =>
                  nextDayOptions.some((option) => option.value === day)
                    ? day
                    : nextDayOptions[nextDayOptions.length - 1].value,
                );
              }}
              options={[
                AGE_CALCULATOR_PLACEHOLDERS.year,
                ...getYearOptions(ageCalculatorDateParts.year),
              ]}
              value={birthYear}
            />
            <FlightSelectMenu
              ariaLabel="월"
              onSelect={(month) => {
                if (!month) {
                  setBirthMonth('');
                  setBirthDay('');
                  return;
                }

                const nextDayOptions = getDayOptions(
                  birthYearNumber,
                  Number(month),
                  ageCalculatorDateParts,
                );

                setBirthMonth(month);
                setBirthDay((day) =>
                  nextDayOptions.some((option) => option.value === day)
                    ? day
                    : nextDayOptions[nextDayOptions.length - 1].value,
                );
              }}
              options={[AGE_CALCULATOR_PLACEHOLDERS.month, ...birthMonthOptions]}
              value={birthMonth}
            />
            <FlightSelectMenu
              ariaLabel="일"
              onSelect={setBirthDay}
              options={[AGE_CALCULATOR_PLACEHOLDERS.day, ...birthDayOptions]}
              value={birthDay}
            />
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
        aria-labelledby={popupTitleId}
        aria-modal={isFullScreenDatePicker}
        tabIndex="-1"
      >
        <header className="flight-service-popup__header">
          <strong id={popupTitleId}>{getPanelTitle()}</strong>
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
    <form
      className={`flight-booking-panel__content flight-booking-panel--${variant}`}
      onSubmit={handleSubmit}
    >
      <div className="flight-booking-panel__options">
        <div className="flight-service-chips" role="group" aria-label="여정 유형">
          <button
            aria-pressed={tripType === TRIP_TYPES.ROUND_TRIP}
            className={tripType === TRIP_TYPES.ROUND_TRIP ? 'is-active' : ''}
            type="button"
            onClick={() => handleTripTypeClick(TRIP_TYPES.ROUND_TRIP)}
          >
            왕복
          </button>
          <button
            aria-pressed={tripType === TRIP_TYPES.ONE_WAY}
            className={tripType === TRIP_TYPES.ONE_WAY ? 'is-active' : ''}
            type="button"
            onClick={() => handleTripTypeClick(TRIP_TYPES.ONE_WAY)}
          >
            편도
          </button>
        </div>

        {!isResultsVariant && (
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
        )}
      </div>

      <div className="flight-booking-panel__search" ref={searchRef}>
        {isCollapsible ? (
          <>
            <div className="flight-booking-panel__summary">
              <FlightRouteSelector
                fromAirport={fromAirport}
                toAirport={toAirport}
                onFromClick={(event) => openPanel(PANEL_TYPES.FROM, event)}
                onSwap={handleSwapRoute}
                onToClick={(event) => openPanel(PANEL_TYPES.TO, event)}
              />

              <button
                aria-controls="flight-booking-collapsible-details"
                className="flight-booking-panel__toggle"
                type="button"
                aria-expanded={isSearchOpen}
                aria-label={isSearchOpen ? '검색 조건 접기' : '검색 조건 펼치기'}
                onClick={() => setIsSearchOpen((prev) => !prev)}
              >
                {isSearchOpen ? (
                  <ChevronUpIcon size={20} />
                ) : (
                  <ChevronDownIcon size={20} />
                )}
              </button>
            </div>

            <div
              className={`flight-booking-panel__details${isSearchOpen ? ' is-open' : ''}`}
              id="flight-booking-collapsible-details"
            >
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

              <button className="flight-booking-panel__submit" type="submit">
                {isResultsVariant ? '조회 변경' : '항공권 검색'}
              </button>
            </div>

            {renderServicePopup()}
          </>
        ) : (
          <>
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
              {isResultsVariant ? '조회 변경' : '항공권 검색'}
            </button>
          </>
        )}
      </div>
    </form>
  );
}

export default FlightBookingPanel;

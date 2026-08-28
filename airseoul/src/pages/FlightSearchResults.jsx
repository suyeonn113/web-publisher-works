import { useEffect, useRef, useState } from 'react';
import { Navigate, useNavigate, useSearchParams } from 'react-router-dom';
import FlightBookingPanel from '../components/flight/booking/FlightBookingPanel';
import BookingContentLayout from '../components/flight/search/BookingContentLayout';
import BookingKeyNotice from '../components/flight/search/BookingKeyNotice';
import BookingSummaryAside from '../components/flight/search/BookingSummaryAside';
import BookingStepNav from '../components/flight/search/BookingStepNav';
import FareNoticeSection from '../components/flight/search/FareNoticeSection';
import FlightSelectSection from '../components/flight/search/FlightSelectSection';
import PlaneLandingIcon from '../components/icons/PlaneLandingIcon';
import PlaneTakeoffIcon from '../components/icons/PlaneTakeoffIcon';
import { ROUTES } from '../constants/routes';
import { TRIP_TYPES } from '../data/flight-service/tripType';
import { getDateFareBarItems } from '../services/dateFareBar';
import { searchFlights } from '../services/flightSearch';

function getFlightSearchParams(searchParams) {
  return {
    tripType: searchParams.get('tripType') ?? TRIP_TYPES.ROUND_TRIP,
    from: searchParams.get('from') ?? '',
    to: searchParams.get('to') ?? '',
    departureDate: searchParams.get('departureDate') ?? '',
    returnDate: searchParams.get('returnDate') ?? '',
    adult: Number(searchParams.get('adult')) || 1,
    child: Number(searchParams.get('child')) || 0,
    infant: Number(searchParams.get('infant')) || 0,
  };
}

const isValidDateParam = (dateText) =>
  /^\d{4}-\d{2}-\d{2}$/.test(dateText) &&
  !Number.isNaN(new Date(`${dateText}T00:00:00`).getTime());

function BookingCompleteDialog({ isOpen, onClose }) {
  const dialogRef = useRef(null);

  useEffect(() => {
    const dialog = dialogRef.current;

    if (isOpen && !dialog?.open) {
      dialog.showModal();
    } else if (!isOpen && dialog?.open) {
      dialog.close();
    }
  }, [isOpen]);

  return (
    <dialog
      className="booking-complete-dialog"
      ref={dialogRef}
      aria-labelledby="booking-complete-title"
      onCancel={onClose}
      onClose={onClose}
    >
      <div className="booking-complete-dialog__content">
        <span className="booking-complete-dialog__eyebrow">AIR SEOUL</span>
        <h2 id="booking-complete-title">운임 선택이 완료되었습니다.</h2>
        <p>선택한 여정과 운임이 오른쪽 요약에 반영되었습니다.</p>
        <button type="button" onClick={() => dialogRef.current?.close()}>
          확인
        </button>
      </div>
    </dialog>
  );
}

function FlightSearchResults() {
  const navigate = useNavigate();
  const [urlSearchParams] = useSearchParams();
  const searchParams = getFlightSearchParams(urlSearchParams);
  const [selectedOutboundDate, setSelectedOutboundDate] = useState(searchParams.departureDate);
  const [selectedInboundDate, setSelectedInboundDate] = useState(searchParams.returnDate);
  const [selectedOutboundFlight, setSelectedOutboundFlight] = useState(null);
  const [selectedInboundFlight, setSelectedInboundFlight] = useState(null);
  const [isCompleteDialogOpen, setIsCompleteDialogOpen] = useState(false);

  useEffect(() => {
    setSelectedOutboundDate(searchParams.departureDate);
    setSelectedInboundDate(searchParams.returnDate);
    setSelectedOutboundFlight(null);
    setSelectedInboundFlight(null);
  }, [
    searchParams.departureDate,
    searchParams.from,
    searchParams.returnDate,
    searchParams.to,
    searchParams.tripType,
  ]);

  const isRoundTrip = searchParams.tripType === TRIP_TYPES.ROUND_TRIP;
  const hasValidDates =
    isValidDateParam(searchParams.departureDate) &&
    (!isRoundTrip || isValidDateParam(searchParams.returnDate));

  if (!searchParams.from || !searchParams.to || !hasValidDates) {
    return <Navigate to={ROUTES.booking.root} replace />;
  }

  const activeInboundDate = isValidDateParam(selectedInboundDate)
    ? selectedInboundDate
    : searchParams.returnDate;
  const outboundFlights = searchFlights({
    ...searchParams,
    departureDate: selectedOutboundDate,
  });
  const inboundFlights = isRoundTrip
    ? searchFlights({
        from: searchParams.to,
        to: searchParams.from,
        departureDate: activeInboundDate,
      })
    : [];
  const outboundDateFareItems = getDateFareBarItems({
    from: searchParams.from,
    to: searchParams.to,
    baseDate: selectedOutboundDate,
  });
  const inboundDateFareItems = isRoundTrip
    ? getDateFareBarItems({
        from: searchParams.to,
        to: searchParams.from,
        baseDate: activeInboundDate,
      })
    : [];

  const handleSearch = (params) => {
    const query = new URLSearchParams(params).toString();
    navigate(`${ROUTES.booking.flight}?${query}`);
  };
  const passengers = {
    adult: searchParams.adult,
    child: searchParams.child,
    infant: searchParams.infant,
  };

  const handleOutboundDateSelect = (date) => {
    setSelectedOutboundDate(date);
    setSelectedOutboundFlight(null);
  };

  const handleInboundDateSelect = (date) => {
    setSelectedInboundDate(date);
    setSelectedInboundFlight(null);
  };

  return (
    <main className="flight-search-results" aria-labelledby="flight-search-results-title">
      <div className="flight-search-results__inner">
        <h1 className="flight-search-results__title" id="flight-search-results-title">
          항공권 예매
        </h1>

        <BookingStepNav activeStep={2} stepRoutes={{ 1: ROUTES.booking.root }} />

        <section className="flight-search-results__search-area" aria-label="검색 조건">
          <FlightBookingPanel
            defaultValues={searchParams}
            onSearch={handleSearch}
            variant="results"
            isCollapsible
          />
        </section>

        <BookingContentLayout
          aside={
            <BookingSummaryAside
              inboundSelection={selectedInboundFlight}
              isRoundTrip={isRoundTrip}
              onComplete={() => setIsCompleteDialogOpen(true)}
              outboundSelection={selectedOutboundFlight}
              passengers={passengers}
            />
          }
        >
            <FlightSelectSection
              dateFareItems={outboundDateFareItems}
              flights={outboundFlights}
              from={searchParams.from}
              Icon={PlaneTakeoffIcon}
              onSelectDate={handleOutboundDateSelect}
              onSelectFlight={setSelectedOutboundFlight}
              selectedFlight={selectedOutboundFlight}
              selectionName="outbound"
              title="가는편"
              to={searchParams.to}
            />

            {isRoundTrip && (
              <FlightSelectSection
                dateFareItems={inboundDateFareItems}
                flights={inboundFlights}
                from={searchParams.to}
                Icon={PlaneLandingIcon}
                onSelectDate={handleInboundDateSelect}
                onSelectFlight={setSelectedInboundFlight}
                selectedFlight={selectedInboundFlight}
                selectionName="inbound"
                title="오는편"
                to={searchParams.from}
              />
            )}

            <div className="flight-search-results__notice">
              <BookingKeyNotice />
              <FareNoticeSection />
            </div>
        </BookingContentLayout>

        <BookingCompleteDialog
          isOpen={isCompleteDialogOpen}
          onClose={() => setIsCompleteDialogOpen(false)}
        />
      </div>
    </main>
  );
}

export default FlightSearchResults;

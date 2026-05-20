import { Navigate, useNavigate, useSearchParams } from 'react-router-dom';
import FlightBookingPanel from '../components/flight/booking/FlightBookingPanel';
import BookingContentLayout from '../components/flight/search/BookingContentLayout';
import BookingStepNav from '../components/flight/search/BookingStepNav';
import FlightSelectSection from '../components/flight/search/FlightSelectSection';
import { ROUTES } from '../constants/routes';
import { TRIP_TYPES } from '../constants/tripType';
import { getDateFareBarItems } from '../services/dateFareBar';
import { searchFlights, searchRoundTripFlights } from '../services/flightSearch';

function getFlightSearchParams(searchParams) {
  return {
    tripType: searchParams.get('tripType') ?? TRIP_TYPES.ROUND_TRIP,
    from: searchParams.get('from') ?? '',
    to: searchParams.get('to') ?? '',
    departureDate: searchParams.get('departureDate') ?? '',
    returnDate: searchParams.get('returnDate') ?? '',
  };
}

function FlightSearchResults() {
  const navigate = useNavigate();
  const [urlSearchParams] = useSearchParams();
  const searchParams = getFlightSearchParams(urlSearchParams);

  if (!searchParams.from || !searchParams.to || !searchParams.departureDate) {
    return <Navigate to={ROUTES.booking.root} replace />;
  }

  const isRoundTrip = searchParams.tripType === TRIP_TYPES.ROUND_TRIP;
  const { outboundFlights, inboundFlights } = isRoundTrip
    ? searchRoundTripFlights(searchParams)
    : { outboundFlights: searchFlights(searchParams), inboundFlights: [] };
  const resultCount = outboundFlights.length + inboundFlights.length;
  const outboundDateFareItems = getDateFareBarItems({
    from: searchParams.from,
    to: searchParams.to,
    baseDate: searchParams.departureDate,
  });
  const inboundDateFareItems = isRoundTrip
    ? getDateFareBarItems({
        from: searchParams.to,
        to: searchParams.from,
        baseDate: searchParams.returnDate,
      })
    : [];

  const handleSearch = (params) => {
    const query = new URLSearchParams(params).toString();
    navigate(`${ROUTES.booking.flight}?${query}`);
  };

  return (
    <main className="flight-search-results" aria-labelledby="flight-search-results-title">
      <div className="flight-search-results__inner">
        <h1 className="flight-search-results__title" id="flight-search-results-title">
          항공권 예매
        </h1>

        <BookingStepNav activeStep={2} />

        <section className="flight-search-results__search-area" aria-label="검색 조건">
          <FlightBookingPanel
            defaultValues={searchParams}
            onSearch={handleSearch}
            variant="results"
          />
        </section>

        <BookingContentLayout
          aside={
            <>
              <h2>여정 및 운임</h2>
              <p>조회된 항공편 {resultCount}개</p>
            </>
          }
        >
            <FlightSelectSection
              dateFareItems={outboundDateFareItems}
              flights={outboundFlights}
              from={searchParams.from}
              title="가는편"
              to={searchParams.to}
            />

            {isRoundTrip && (
              <FlightSelectSection
                dateFareItems={inboundDateFareItems}
                flights={inboundFlights}
                from={searchParams.to}
                title="오는편"
                to={searchParams.from}
              />
            )}

            <section className="flight-search-results__notice" aria-label="예매 안내" />
        </BookingContentLayout>
      </div>
    </main>
  );
}

export default FlightSearchResults;

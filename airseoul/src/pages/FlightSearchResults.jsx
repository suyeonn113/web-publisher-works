import { Navigate, useSearchParams } from 'react-router-dom';
import { TRIP_TYPES } from '../constants/tripType';
import { ROUTES } from '../constants/routes';
import BookingStepNav from '../components/flight/search/BookingStepNav';
import FlightSearchResultList from '../components/flight/search/FlightSearchResultList';
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

  return (
    <main className="flight-search-results" aria-labelledby="flight-search-results-title">
      <div className="flight-search-results__inner">
        <h1 className="flight-search-results__title" id="flight-search-results-title">
          항공권 예매
        </h1>

        <BookingStepNav activeStep={2} />

        <section className="flight-search-results__search-area" aria-label="검색 조건">
          <dl className="flight-search-results__search-summary">
            <div>
              <dt>출발지</dt>
              <dd>{searchParams.from}</dd>
            </div>
            <div>
              <dt>도착지</dt>
              <dd>{searchParams.to}</dd>
            </div>
            <div>
              <dt>가는 날</dt>
              <dd>{searchParams.departureDate}</dd>
            </div>
            {searchParams.returnDate && (
              <div>
                <dt>오는 날</dt>
                <dd>{searchParams.returnDate}</dd>
              </div>
            )}
          </dl>
        </section>

        <div className="flight-search-results__layout">
          <div className="flight-search-results__main">
            <section className="flight-search-results__section">
              <h2>가는편</h2>
              <FlightSearchResultList flights={outboundFlights} />
            </section>

            {isRoundTrip && (
              <section className="flight-search-results__section">
                <h2>오는편</h2>
                <FlightSearchResultList flights={inboundFlights} />
              </section>
            )}

            <section className="flight-search-results__notice" aria-label="예매 안내" />
          </div>

          <aside className="flight-search-results__aside" aria-label="여정 및 운임 요약">
            <h2>여정 및 운임</h2>
            <p>조회된 항공편 {resultCount}개</p>
          </aside>
        </div>
      </div>
    </main>
  );
}

export default FlightSearchResults;

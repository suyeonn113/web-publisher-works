import { TRIP_TYPES } from '../constants/tripType';
import DateFareBar from '../components/flight/search/DateFareBar';
import FlightSearchResultList from '../components/flight/search/FlightSearchResultList';
import FlightSearchSummary from '../components/flight/search/FlightSearchSummary';
import { getDateFareBarItems } from '../services/dateFareBar';
import { searchFlights, searchRoundTripFlights } from '../services/flightSearch';

function FlightSearchResults({ searchParams }) {
  const isRoundTrip = searchParams.tripType === TRIP_TYPES.ROUND_TRIP;
  const { outboundFlights, inboundFlights } = isRoundTrip
    ? searchRoundTripFlights(searchParams)
    : { outboundFlights: searchFlights(searchParams), inboundFlights: [] };
  const dateFareItems = getDateFareBarItems({
    from: searchParams.from,
    to: searchParams.to,
    baseDate: searchParams.departureDate,
  });
  const resultCount = outboundFlights.length + inboundFlights.length;

  return (
    <main className="flight-search-results">
      <FlightSearchSummary searchParams={searchParams} count={resultCount} />
      <DateFareBar items={dateFareItems} />

      <section className="flight-search-results__section">
        <h2>가는 편</h2>
        <FlightSearchResultList flights={outboundFlights} />
      </section>

      {isRoundTrip && (
        <section className="flight-search-results__section">
          <h2>오는 편</h2>
          <FlightSearchResultList flights={inboundFlights} />
        </section>
      )}
    </main>
  );
}

export default FlightSearchResults;

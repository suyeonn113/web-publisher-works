function FlightSearchSummary({ searchParams, count }) {
  return (
    <section className="flight-search-summary">
      <strong>
        {searchParams.from} - {searchParams.to}
      </strong>
      <span>
        {searchParams.departureDate}
        {searchParams.returnDate ? ` - ${searchParams.returnDate}` : ''}
      </span>
      <span>{count}개 항공편</span>
    </section>
  );
}

export default FlightSearchSummary;

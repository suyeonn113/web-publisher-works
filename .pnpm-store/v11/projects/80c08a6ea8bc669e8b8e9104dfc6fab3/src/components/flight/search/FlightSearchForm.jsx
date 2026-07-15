function FlightSearchForm({ defaultValues, onSubmit }) {
  return (
    <form className="flight-search-form" onSubmit={onSubmit}>
      <div className="flight-search-form__field">{defaultValues?.from}</div>
      <div className="flight-search-form__field">{defaultValues?.to}</div>
      <div className="flight-search-form__field">{defaultValues?.departureDate}</div>
      <div className="flight-search-form__field">{defaultValues?.returnDate}</div>
    </form>
  );
}

export default FlightSearchForm;

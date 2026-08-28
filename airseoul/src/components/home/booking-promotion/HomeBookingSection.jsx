import FlightServiceSection from '../../flight/flight-service/FlightServiceSection';

function HomeBookingSection({ defaultValues, onSearch }) {
  return (
    <section className="home-booking" aria-labelledby="home-booking-title">
      <div className="home-booking__inner">
        <h2 className="sr-only" id="home-booking-title">
          항공권 예매
        </h2>

        <div className="home-booking__panel">
          <FlightServiceSection
            defaultValues={defaultValues}
            onSearch={onSearch}
            variant="home"
          />
        </div>
      </div>
    </section>
  );
}

export default HomeBookingSection;

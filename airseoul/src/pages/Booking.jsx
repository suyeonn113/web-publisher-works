import { useNavigate } from 'react-router-dom';
import BookingStepNav from '../components/flight/search/BookingStepNav';
import FlightServiceSection from '../components/flight/flight-service/FlightServiceSection';
import { APP_BASE_DATE } from '../constants/appDate';
import { ROUTES } from '../constants/routes';
import { createFixedRoundTripSearchParams } from '../utils/searchParams';

const defaultSearchParams = createFixedRoundTripSearchParams({
  from: 'ICN',
  to: '',
  baseDate: APP_BASE_DATE,
});

function Booking() {
  const navigate = useNavigate();

  const handleSearch = (params) => {
    const query = new URLSearchParams(params).toString();
    navigate(`${ROUTES.booking.flight}?${query}`);
  };

  return (
    <main className="booking-page" aria-labelledby="booking-page-title">
      <div className="booking-page__inner">
        <h1 className="booking-page__title" id="booking-page-title">
          항공권 예매
        </h1>
        <BookingStepNav activeStep={1} />
        <FlightServiceSection
          defaultValues={defaultSearchParams}
          onSearch={handleSearch}
          variant="booking"
        />
      </div>
    </main>
  );
}

export default Booking;

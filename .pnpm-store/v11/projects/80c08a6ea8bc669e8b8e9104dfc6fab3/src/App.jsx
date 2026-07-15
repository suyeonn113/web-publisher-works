import { Route, Routes } from 'react-router-dom';
import { APP_BASE_DATE } from './constants/appDate';
import { ROUTES } from './constants/routes';
import MainLayout from './layouts/MainLayout';
import Booking from './pages/Booking';
import BookingChangeRefund from './pages/BookingChangeRefund';
import BrandStory from './pages/BrandStory';
import Home from './pages/Home';
import FlightSearchResults from './pages/FlightSearchResults';
import EventDetail from './pages/EventDetail';
import EventList from './pages/EventList';
import FlightServiceDetail from './pages/FlightServiceDetail';
import NotFound from './pages/NotFound';
import AirportService from './pages/AirportService';
import BaggageGuide from './pages/BaggageGuide';
import SeatGuide from './pages/SeatGuide';
import { FLIGHT_SERVICE_TAB_IDS } from './components/flight/flight-service/flightServiceTabsData';
import { createFixedRoundTripSearchParams } from './utils/searchParams';

function App() {
  const defaultSearchParams = createFixedRoundTripSearchParams({
    from: 'ICN',
    to: '',
    baseDate: APP_BASE_DATE,
  });

  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path={ROUTES.home} element={<Home defaultSearchParams={defaultSearchParams} />} />
        <Route path={ROUTES.company.brandStory} element={<BrandStory />} />
        <Route path={ROUTES.benefit.event} element={<EventList />} />
        <Route path={ROUTES.benefit.eventDetail(':eventId')} element={<EventDetail />} />
        <Route path={ROUTES.booking.root} element={<Booking />} />
        <Route path={ROUTES.booking.flight} element={<FlightSearchResults />} />
        <Route path={ROUTES.booking.refund} element={<BookingChangeRefund />} />
        <Route
          path={ROUTES.booking.bookingCheck}
          element={(
            <FlightServiceDetail
              serviceType={FLIGHT_SERVICE_TAB_IDS.MY_TRIP}
              title="예약 조회"
            />
          )}
        />
        <Route
          path={ROUTES.booking.checkin}
          element={(
            <FlightServiceDetail
              serviceType={FLIGHT_SERVICE_TAB_IDS.CHECK_IN}
              title="체크인"
            />
          )}
        />
        <Route
          path={ROUTES.booking.flightStatus}
          element={(
            <FlightServiceDetail
              serviceType={FLIGHT_SERVICE_TAB_IDS.SCHEDULE}
              title="출도착 / 스케줄"
            />
          )}
        />
        <Route
          path={ROUTES.travel.airportService}
          element={<AirportService />}
        />
        <Route
          path={ROUTES.travel.baggage}
          element={<BaggageGuide />}
        />
        <Route path={ROUTES.travel.seat} element={<SeatGuide />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;

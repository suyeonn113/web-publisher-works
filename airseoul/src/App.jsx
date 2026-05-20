import { Navigate, Route, Routes } from 'react-router-dom';
import { APP_BASE_DATE } from './constants/appDate';
import { ROUTES } from './constants/routes';
import MainLayout from './layouts/MainLayout';
import Booking from './pages/Booking';
import Home from './pages/Home';
import FlightSearchResults from './pages/FlightSearchResults';
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
        <Route path={ROUTES.booking.root} element={<Booking />} />
        <Route path={ROUTES.booking.flight} element={<FlightSearchResults />} />
        <Route path="*" element={<Navigate to={ROUTES.home} replace />} />
      </Route>
    </Routes>
  );
}

export default App;

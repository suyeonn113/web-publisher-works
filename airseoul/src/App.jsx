import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import Header from './components/layout/header/Header';
import Footer from './components/layout/Footer';
import { APP_BASE_DATE } from './constants/appDate';
import { ROUTES } from './constants/routes';
import Booking from './pages/Booking';
import Home from './pages/Home';
import FlightSearchResults from './pages/FlightSearchResults';
import { createFixedRoundTripSearchParams } from './utils/searchParams';

function App() {
  const location = useLocation();
  const hasHero = location.pathname === ROUTES.home;
  const defaultSearchParams = createFixedRoundTripSearchParams({
    from: 'ICN',
    to: '',
    baseDate: APP_BASE_DATE,
  });

  return (
    <>
      <Header hasHero={hasHero} />
      <Routes>
        <Route path={ROUTES.home} element={<Home defaultSearchParams={defaultSearchParams} />} />
        <Route path={ROUTES.booking.root} element={<Booking />} />
        <Route path={ROUTES.booking.flight} element={<FlightSearchResults />} />
        <Route path="*" element={<Navigate to={ROUTES.home} replace />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;

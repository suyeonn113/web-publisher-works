import { lazy, Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { ROUTES } from './constants/routes';
import MainLayout from './layouts/MainLayout';
import { createRoundTripSearchParams } from './utils/searchParams';

const Booking = lazy(() => import('./pages/Booking'));
const FlightSearchResults = lazy(() => import('./pages/FlightSearchResults'));
const Home = lazy(() => import('./pages/home'));
const SeatGuide = lazy(() => import('./pages/SeatGuide'));

function LazyPage({ children }) {
  return (
    <Suspense fallback={<div className="sr-only" role="status">페이지를 불러오는 중입니다.</div>}>
      {children}
    </Suspense>
  );
}

function App() {
  const defaultSearchParams = createRoundTripSearchParams({
    from: 'ICN',
    to: '',
    departureDate: '',
    returnDate: '',
  });

  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route
          path={ROUTES.home}
          element={<LazyPage><Home defaultSearchParams={defaultSearchParams} /></LazyPage>}
        />
        <Route path={ROUTES.booking.root} element={<LazyPage><Booking /></LazyPage>} />
        <Route
          path={ROUTES.booking.flight}
          element={<LazyPage><FlightSearchResults /></LazyPage>}
        />
        <Route path={ROUTES.travel.seat} element={<LazyPage><SeatGuide /></LazyPage>} />
        <Route path="*" element={<Navigate to={ROUTES.home} replace />} />
      </Route>
    </Routes>
  );
}

export default App;

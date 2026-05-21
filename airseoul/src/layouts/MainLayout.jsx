import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Footer from '../components/layout/Footer';
import Header from '../components/layout/header/Header';
import { ROUTES } from '../constants/routes';

function MainLayout() {
  const location = useLocation();
  const hasHero = location.pathname === ROUTES.home;

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0 });
  }, [location.pathname]);

  return (
    <>
      <Header hasHero={hasHero} />
      <Outlet />
      <Footer />
    </>
  );
}

export default MainLayout;

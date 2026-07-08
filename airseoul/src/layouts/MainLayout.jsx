import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import AccessibilityQuickMenu from '../components/common/AccessibilityQuickMenu';
import Footer from '../components/layout/Footer';
import Header from '../components/layout/header/Header';
import { ROUTES } from '../constants/routes';

function MainLayout() {
  const location = useLocation();
  const hasHero = location.pathname === ROUTES.home;

  useEffect(() => {
    if (location.hash) {
      const frameId = window.requestAnimationFrame(() => {
        const target = document.querySelector(location.hash);

        target?.scrollIntoView({ block: 'start' });
        target?.focus?.({ preventScroll: true });
      });

      return () => window.cancelAnimationFrame(frameId);
    }

    window.scrollTo({ top: 0, left: 0 });
    return undefined;
  }, [location.hash, location.pathname]);

  return (
    <>
      <AccessibilityQuickMenu />
      <Header hasHero={hasHero} />
      <div id="main-content" tabIndex={-1}>
        <Outlet />
      </div>
      <Footer />
    </>
  );
}

export default MainLayout;

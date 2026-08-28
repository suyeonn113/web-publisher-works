import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import AccessibilityQuickMenu from '../components/common/AccessibilityQuickMenu';
import Footer from '../components/layout/footer/Footer';
import Header from '../components/layout/header/Header';
import { ROUTES } from '../constants/routes';

function MainLayout() {
  const location = useLocation();
  const hasHero = location.pathname === ROUTES.home;

  useEffect(() => {
    const pageTitles = {
      [ROUTES.home]: '에어서울 | 항공권 예매와 여행 정보',
      [ROUTES.booking.root]: '항공권 예매 | 에어서울',
      [ROUTES.booking.flight]: '운임 선택 | 에어서울',
      [ROUTES.travel.seat]: new URLSearchParams(location.search).get('tab') === 'adjacent'
        ? '옆 좌석 구매 | 에어서울'
        : '사전 좌석 | 에어서울',
    };

    document.title = pageTitles[location.pathname] ?? pageTitles[ROUTES.home];
  }, [location.pathname, location.search]);

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

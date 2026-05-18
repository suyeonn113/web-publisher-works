import { useEffect, useRef, useState } from 'react';

import Logo from '../../common/Logo';
import LoginPanel from '../../login/LoginPanel';
import HeaderActions from './HeaderActions';
import HeaderMobileMenu from './HeaderMobileMenu';
import HeaderNav from './HeaderNav';

export default function Header({ hasHero = true }) {
  const headerRef = useRef(null);
  const [isPastHeroIntro, setIsPastHeroIntro] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoginPanelOpen, setIsLoginPanelOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((isOpen) => !isOpen);
  };

  const openLoginPanel = () => {
    setIsLoginPanelOpen(true);
    setIsMobileMenuOpen(false);
  };

  useEffect(() => {
    const heroSection = document.querySelector('.hero-section');

    if (!hasHero || !heroSection) {
      setIsPastHeroIntro(true);
      return undefined;
    }

    let ticking = false;

    const updateHeaderTone = () => {
      const heroHeight = heroSection.offsetHeight;
      const headerHeight = headerRef.current?.offsetHeight ?? 0;
      const threshold = Math.max(
        heroHeight * 0.68,
        heroHeight - headerHeight - 48
      );

      setIsPastHeroIntro(window.scrollY >= threshold);
      ticking = false;
    };

    const requestUpdate = () => {
      if (ticking) return;

      ticking = true;
      window.requestAnimationFrame(updateHeaderTone);
    };

    updateHeaderTone();

    window.addEventListener('scroll', requestUpdate, { passive: true });
    window.addEventListener('resize', requestUpdate);

    return () => {
      window.removeEventListener('scroll', requestUpdate);
      window.removeEventListener('resize', requestUpdate);
    };
  }, [hasHero]);

  const isHeaderSolid =
    !hasHero || isPastHeroIntro || isMobileMenuOpen || isLoginPanelOpen;

  useEffect(() => {
    if (!isMobileMenuOpen) return undefined;

    const closeMobileMenu = (event) => {
      if (event.key === 'Escape') {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener('keydown', closeMobileMenu);

    return () => {
      document.removeEventListener('keydown', closeMobileMenu);
    };
  }, [isMobileMenuOpen]);

  return (
    <header
      ref={headerRef}
      className={`site-header${isHeaderSolid ? ' is-solid' : ''}`}
    >
      <div className="site-header__main">
        <Logo className="site-header__logo" />

        <HeaderNav />

        <HeaderActions
          isMobileMenuOpen={isMobileMenuOpen}
          onLoginOpen={openLoginPanel}
          onMobileMenuToggle={toggleMobileMenu}
        />
      </div>

      <HeaderMobileMenu isOpen={isMobileMenuOpen} />
      <LoginPanel
        isOpen={isLoginPanelOpen}
        onClose={() => setIsLoginPanelOpen(false)}
      />
    </header>
  );
}

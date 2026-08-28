import { useEffect, useLayoutEffect, useRef, useState } from 'react';

import { createHeroScrollAnimation } from '../../../animations/home/heroScrollAnimation';
import { getHeroSlidesWithLowestFares } from '../../../services/heroFares';

import HeroSlider from './HeroSlider';

const getCssTimeInMilliseconds = (propertyName, fallback) => {
  const value = window
    .getComputedStyle(document.documentElement)
    .getPropertyValue(propertyName)
    .trim();
  const numericValue = Number.parseFloat(value);

  if (!Number.isFinite(numericValue)) return fallback;
  return value.endsWith('ms') ? numericValue : numericValue * 1000;
};

function HeroSection() {
  const stageRef = useRef(null);
  const heroRef = useRef(null);
  const revealFrameRef = useRef();
  const [layoutVersion, setLayoutVersion] = useState(0);
  const [isResizing, setIsResizing] = useState(false);
  const slides = getHeroSlidesWithLowestFares();

  useLayoutEffect(() => {
    const cleanupAnimation = createHeroScrollAnimation({
      hero: heroRef.current,
      stage: stageRef.current,
      booking: document.querySelector('.home-booking'),
      restoreNavigationState: layoutVersion === 0,
    });

    if (layoutVersion > 0) {
      revealFrameRef.current = window.requestAnimationFrame(() => {
        setIsResizing(false);
      });
    }

    return () => {
      window.cancelAnimationFrame(revealFrameRef.current);
      cleanupAnimation();
    };
  }, [layoutVersion]);

  useEffect(() => {
    let resizeSettleTimer;
    const resizeSettleDelay = getCssTimeInMilliseconds('--home-motion-fast', 200);

    const handleResize = () => {
      setIsResizing(true);
      window.clearTimeout(resizeSettleTimer);
      resizeSettleTimer = window.setTimeout(() => {
        setLayoutVersion((currentVersion) => currentVersion + 1);
      }, resizeSettleDelay);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.clearTimeout(resizeSettleTimer);
    };
  }, []);

  return (
    <div className="hero-scroll-stage" ref={stageRef}>
      <div className="hero-scroll-stage__viewport">
        <section
          className={`hero-section${isResizing ? ' is-resizing' : ''}`}
          aria-labelledby="hero-section-title"
          ref={heroRef}
        >
          <h2
            className="sr-only"
            id="hero-section-title"
          >
            에어서울 특가 항공권
          </h2>

          <HeroSlider slides={slides} />
        </section>
      </div>
    </div>
  );
}

export default HeroSection;

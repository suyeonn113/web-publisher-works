import { gsap } from 'gsap';
import { CustomEase } from 'gsap/CustomEase';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, CustomEase);

const HERO_MOTION_QUERY = '(prefers-reduced-motion: no-preference)';
const CONDENSED_PROGRESS = 1;
const BOOKING_REVEAL_START = 0.1;
const TOUCH_ACTIVATION_DISTANCE = 12;
const HERO_RELOAD_STATE_KEY = 'homeHeroReloadState';
const HERO_RELOAD_STATES = {
  COLLAPSED: 'collapsed',
  EXPANDED: 'expanded',
  TRANSITIONING: 'transitioning',
};
const getNavigationType = () => {
  return window.performance.getEntriesByType('navigation')[0]?.type;
};
const getSavedHeroState = () => {
  try {
    return window.sessionStorage.getItem(HERO_RELOAD_STATE_KEY);
  } catch {
    return null;
  }
};
const saveHeroState = (state) => {
  try {
    window.sessionStorage.setItem(HERO_RELOAD_STATE_KEY, state);
  } catch {
    // Storage can be unavailable in privacy-restricted browsing contexts.
  }
};
const PAGE_NAVIGATION_TYPE = getNavigationType();
const INITIAL_SCROLL_RESTORATION = window.history.scrollRestoration;

if (PAGE_NAVIGATION_TYPE === 'reload') {
  window.history.scrollRestoration = 'manual';
}

const getCssLength = (element, propertyName, fallback) => {
  const value = window.getComputedStyle(element).getPropertyValue(propertyName).trim();
  const numericValue = Number.parseFloat(value);

  if (!Number.isFinite(numericValue)) return fallback;
  if (value.endsWith('svh') || value.endsWith('vh')) {
    return window.innerHeight * (numericValue / 100);
  }

  return numericValue;
};
const getCssTime = (propertyName, fallback) => {
  const value = window
    .getComputedStyle(document.documentElement)
    .getPropertyValue(propertyName)
    .trim();
  const numericValue = Number.parseFloat(value);

  if (!Number.isFinite(numericValue)) return fallback;
  return value.endsWith('ms') ? numericValue / 1000 : numericValue;
};
const getHeroTop = (stage) => {
  const headerHeight = document.querySelector('.site-header')?.offsetHeight ?? 112;
  const topGap = getCssLength(stage, '--home-hero-condensed-top-gap', 16);

  return headerHeight + topGap;
};
const getStyleNumber = (element, propertyName) => {
  if (!element) return 0;

  const value = Number.parseFloat(window.getComputedStyle(element)[propertyName]);
  return Number.isFinite(value) ? value : 0;
};
const getCssEase = (propertyName, name, fallback) => {
  const tokenValue = window
    .getComputedStyle(document.documentElement)
    .getPropertyValue(propertyName)
    .trim();
  const controlPoints = tokenValue.match(/-?\d*\.?\d+/g);
  const bezier = controlPoints?.length === 4
    ? controlPoints.join(',')
    : fallback;

  return CustomEase.create(name, bezier);
};

export function createHeroScrollAnimation({
  hero,
  stage,
  booking,
  restoreNavigationState = true,
}) {
  if (!hero || !stage) return () => {};

  const media = gsap.matchMedia();

  media.add(HERO_MOTION_QUERY, () => {
    const root = document.documentElement;
    const initialInlineScrollBehavior = root.style.scrollBehavior;
    const isReload =
      restoreNavigationState && PAGE_NAVIGATION_TYPE === 'reload';
    const shouldRestoreCollapsed =
      isReload && getSavedHeroState() === HERO_RELOAD_STATES.COLLAPSED;

    if (isReload) {
      window.history.scrollRestoration = 'manual';
      root.style.scrollBehavior = 'auto';

      if (!shouldRestoreCollapsed) {
        gsap.set(window, {
          scrollTo: { y: 0, autoKill: false },
        });
      }
    } else if (restoreNavigationState) {
      saveHeroState(HERO_RELOAD_STATES.EXPANDED);
    }

    const heroEase = getCssEase(
      '--home-ease-standard',
      'home-hero-scroll-ease',
      '0.22,1,0.36,1',
    );
    const bookingRevealEase = getCssEase(
      '--home-ease-smooth',
      'home-booking-reveal-ease',
      '0.65,0,0.35,1',
    );
    const contents = gsap.utils.toArray(hero.querySelectorAll('.hero-slider__content'));
    const foregrounds = gsap.utils.toArray(
      hero.querySelectorAll('.hero-slider__foreground'),
    );
    const titles = gsap.utils.toArray(hero.querySelectorAll('.hero-slider__title'));
    const eyebrows = gsap.utils.toArray(hero.querySelectorAll('.hero-slider__eyebrow'));
    const subtitles = gsap.utils.toArray(hero.querySelectorAll('.hero-slider__subtitle'));
    const prices = gsap.utils.toArray(hero.querySelectorAll('.hero-slider__price'));
    const priceValues = gsap.utils.toArray(hero.querySelectorAll('.hero-slider__price strong'));
    const dates = gsap.utils.toArray(hero.querySelectorAll('.hero-slider__date'));
    const ctas = gsap.utils.toArray(hero.querySelectorAll('.hero-slider__cta'));
    const paginations = gsap.utils.toArray(
      hero.querySelectorAll('.hero-slider__pagination'),
    );
    const paginationTracks = gsap.utils.toArray(
      hero.querySelectorAll('.hero-slider__pagination-track'),
    );
    const bookingPanel = booking?.querySelector('.home-booking__panel');
    const getCondensedHeroHeight = () => {
      const baseHeight = getCssLength(stage, '--home-hero-condensed-height', 360);
      const bookingOverlap = getCssLength(stage, '--home-booking-hero-overlap', 0);

      return baseHeight + bookingOverlap;
    };
    const getCondensedHeroCornerRadius = () => {
      const radius = window
        .getComputedStyle(stage)
        .getPropertyValue('--home-hero-condensed-border-radius')
        .trim() || '0px';
      const [horizontalRadius, verticalRadius = horizontalRadius] = radius
        .split('/')
        .map((value) => value.trim());

      return `${horizontalRadius} ${verticalRadius}`;
    };

    const getCondensedHeroWidth = () => {
      const maxContainerWidth = getCssLength(
        stage,
        '--home-container-width',
        1920,
      );
      const viewportWidthRatio = getCssLength(
        stage,
        '--home-hero-condensed-viewport-width-ratio',
        0,
      );

      if (viewportWidthRatio > 0) {
        return Math.min(
          maxContainerWidth,
          window.innerWidth * viewportWidthRatio,
        );
      }

      const availableWidth = Math.min(
        maxContainerWidth,
        window.innerWidth -
          getCssLength(stage, '--home-hero-condensed-inline-inset', 48),
      );
      return availableWidth;
    };

    const expandedStyles = {
      contentPaddingLeft: getStyleNumber(contents[0], 'paddingLeft'),
      contentPaddingRight: getStyleNumber(contents[0], 'paddingRight'),
      foregroundGap: getStyleNumber(foregrounds[0], 'rowGap'),
      eyebrowFontSize: getStyleNumber(eyebrows[0], 'fontSize'),
      subtitleFontSize: getStyleNumber(subtitles[0], 'fontSize'),
      priceFontSize: getStyleNumber(prices[0], 'fontSize'),
      priceMarginTop: getStyleNumber(prices[0], 'marginTop'),
      priceValueFontSize: getStyleNumber(priceValues[0], 'fontSize'),
      dateFontSize: getStyleNumber(dates[0], 'fontSize'),
      ctaFontSize: getStyleNumber(ctas[0], 'fontSize'),
      titleFontSize: getStyleNumber(titles[0], 'fontSize'),
      titleLetterSpacing: getStyleNumber(titles[0], 'letterSpacing'),
      titleLineHeight: getStyleNumber(titles[0], 'lineHeight'),
    };

    hero.classList.add('is-condensed');

    const targetStyles = {
      contentPaddingLeft: getStyleNumber(contents[0], 'paddingLeft'),
      contentPaddingRight: getStyleNumber(contents[0], 'paddingRight'),
      foregroundGap: getStyleNumber(foregrounds[0], 'rowGap'),
      eyebrowFontSize: getCssLength(stage, '--home-hero-condensed-eyebrow-size', 14),
      subtitleFontSize: getCssLength(stage, '--home-hero-condensed-subtitle-size', 16),
      priceFontSize: getCssLength(stage, '--home-hero-condensed-price-size', 20),
      priceMarginTop: getStyleNumber(prices[0], 'marginTop'),
      priceValueFontSize: getCssLength(
        stage,
        '--home-hero-condensed-price-value-size',
        40,
      ),
      dateFontSize: getCssLength(stage, '--home-hero-condensed-date-size', 13),
      ctaFontSize: getCssLength(stage, '--home-hero-condensed-cta-size', 14),
      titleFontSize: getCssLength(stage, '--home-hero-condensed-title-size', 64),
      titleLetterSpacing: getStyleNumber(titles[0], 'letterSpacing'),
      titleLineHeight: getStyleNumber(titles[0], 'lineHeight'),
    };

    gsap.set(hero, {
      width: getCondensedHeroWidth(),
      height: getCondensedHeroHeight(),
      minHeight: getCondensedHeroHeight(),
    });

    const paginationTargetOffsets = paginationTracks.map((track, index) =>
      Math.max(
        0,
        (paginations[index].clientWidth - track.offsetWidth) / 2 - track.offsetLeft,
      ),
    );

    gsap.set(hero, { clearProps: 'width,height,minHeight' });
    hero.classList.remove('is-condensed');

    const expandedBottomGap = getCssLength(
      stage,
      '--home-hero-expanded-copy-bottom-gap',
      48,
    );
    const initialForegroundOffsets = foregrounds.map((foreground) =>
      Math.max(
        0,
        (hero.offsetHeight - foreground.offsetHeight) / 2 - expandedBottomGap,
      ),
    );
    const targetBookingGap = getCssLength(stage, '--home-hero-booking-gap', 48);
    let bookingDocumentTop = 0;
    let initialBookingGap = 0;
    const syncBookingLayout = () => {
      if (!booking) return;

      gsap.set(booking, { y: 0 });

      const condensedBottom =
        getHeroTop(stage) + getCondensedHeroHeight() + targetBookingGap;

      booking.style.setProperty(
        '--home-booking-flow-offset',
        `${condensedBottom - window.innerHeight}px`,
      );

      const stageDocumentTop = stage.getBoundingClientRect().top + window.scrollY;
      bookingDocumentTop = booking.getBoundingClientRect().top + window.scrollY;
      initialBookingGap = bookingDocumentTop - (stageDocumentTop + window.innerHeight);
    };

    syncBookingLayout();

    gsap.set(foregrounds, {
      y: (index) => initialForegroundOffsets[index],
    });

    const setScrollState = (progress) => {
      const isCondensed =
        progress >= CONDENSED_PROGRESS - 0.01;

      hero.classList.toggle('is-condensed', isCondensed);
      document.documentElement.classList.toggle('is-hero-condensed', progress > 0.01);

      if (booking) {
        const transitionRatio = Math.min(1, progress / CONDENSED_PROGRESS);
        const desiredGap = gsap.utils.interpolate(
          initialBookingGap,
          targetBookingGap,
          heroEase(transitionRatio),
        );
        const naturalBookingTop = bookingDocumentTop - window.scrollY;
        const bookingOffset =
          hero.getBoundingClientRect().bottom + desiredGap - naturalBookingTop;

        gsap.set(booking, { y: bookingOffset });
      }
    };

    const heroTransitionDuration = getCssTime('--home-motion-slow', 0.8);
    const inputReleaseDelay = getCssTime('--home-motion-fast', 0.2) * 1000;
    const scrollBoundaryTolerance = 2;
    const frameTimeline = gsap.timeline({ paused: true }).fromTo(
      hero,
      {
        width: () => stage.clientWidth,
        height: () => window.innerHeight,
        minHeight: () => window.innerHeight,
        y: 0,
        borderTopLeftRadius: '0px',
        borderTopRightRadius: '0px',
        borderBottomRightRadius: '0px',
        borderBottomLeftRadius: '0px',
      },
      {
        width: getCondensedHeroWidth,
        height: getCondensedHeroHeight,
        minHeight: getCondensedHeroHeight,
        y: () => getHeroTop(stage),
        borderTopLeftRadius: getCondensedHeroCornerRadius,
        borderTopRightRadius: getCondensedHeroCornerRadius,
        borderBottomRightRadius: getCondensedHeroCornerRadius,
        borderBottomLeftRadius: getCondensedHeroCornerRadius,
        duration: CONDENSED_PROGRESS,
        ease: heroEase,
      },
    );
    const timeline = gsap.timeline({
      onUpdate: () => {
        const progress = timeline.progress();

        frameTimeline.progress(progress, true);
        setScrollState(progress);
      },
      scrollTrigger: {
        trigger: stage,
        start: 'top top',
        end: 'bottom bottom',
        scrub: true,
        onRefreshInit: () => {
          syncBookingLayout();
          frameTimeline.invalidate();
        },
        onRefresh: (scrollTrigger) => {
          const progress = scrollTrigger.animation?.progress() ?? 0;

          frameTimeline.progress(progress, true);
          setScrollState(progress);
        },
        invalidateOnRefresh: true,
      },
    });

    timeline
      .fromTo(
        contents,
        {
          paddingLeft: `${expandedStyles.contentPaddingLeft}px`,
          paddingRight: `${expandedStyles.contentPaddingRight}px`,
        },
        {
          paddingLeft: `${targetStyles.contentPaddingLeft}px`,
          paddingRight: `${targetStyles.contentPaddingRight}px`,
          duration: CONDENSED_PROGRESS,
          ease: heroEase,
        },
        0,
      )
      .fromTo(
        foregrounds,
        {
          y: (index) => initialForegroundOffsets[index],
          rowGap: `${expandedStyles.foregroundGap}px`,
        },
        {
          y: 0,
          rowGap: `${targetStyles.foregroundGap}px`,
          duration: CONDENSED_PROGRESS,
          ease: heroEase,
        },
        0,
      )
      .fromTo(
        titles,
        {
          fontSize: `${expandedStyles.titleFontSize}px`,
          letterSpacing: `${expandedStyles.titleLetterSpacing}px`,
          lineHeight: `${expandedStyles.titleLineHeight}px`,
        },
        {
          fontSize: `${targetStyles.titleFontSize}px`,
          letterSpacing: `${targetStyles.titleLetterSpacing}px`,
          lineHeight: `${targetStyles.titleLineHeight}px`,
          duration: CONDENSED_PROGRESS,
          ease: heroEase,
        },
        0,
      )
      .fromTo(
        eyebrows,
        {
          fontSize: `${expandedStyles.eyebrowFontSize}px`,
        },
        {
          fontSize: `${targetStyles.eyebrowFontSize}px`,
          duration: CONDENSED_PROGRESS,
          ease: heroEase,
        },
        0,
      )
      .fromTo(
        subtitles,
        {
          fontSize: `${expandedStyles.subtitleFontSize}px`,
        },
        {
          fontSize: `${targetStyles.subtitleFontSize}px`,
          duration: CONDENSED_PROGRESS,
          ease: heroEase,
        },
        0,
      )
      .fromTo(
        prices,
        {
          fontSize: `${expandedStyles.priceFontSize}px`,
          marginTop: `${expandedStyles.priceMarginTop}px`,
        },
        {
          fontSize: `${targetStyles.priceFontSize}px`,
          marginTop: `${targetStyles.priceMarginTop}px`,
          duration: CONDENSED_PROGRESS,
          ease: heroEase,
        },
        0,
      )
      .fromTo(
        priceValues,
        {
          fontSize: `${expandedStyles.priceValueFontSize}px`,
        },
        {
          fontSize: `${targetStyles.priceValueFontSize}px`,
          duration: CONDENSED_PROGRESS,
          ease: heroEase,
        },
        0,
      )
      .fromTo(
        dates,
        {
          fontSize: `${expandedStyles.dateFontSize}px`,
        },
        {
          fontSize: `${targetStyles.dateFontSize}px`,
          duration: CONDENSED_PROGRESS,
          ease: heroEase,
        },
        0,
      )
      .fromTo(
        ctas,
        {
          fontSize: `${expandedStyles.ctaFontSize}px`,
        },
        {
          fontSize: `${targetStyles.ctaFontSize}px`,
          duration: CONDENSED_PROGRESS,
          ease: heroEase,
        },
        0,
      );

    if (paginations.length > 0 && paginationTracks.length > 0) {
      timeline.fromTo(
        paginationTracks,
        {
          x: 0,
        },
        {
          x: (index) => paginationTargetOffsets[index] ?? 0,
          duration: CONDENSED_PROGRESS,
          ease: heroEase,
        },
        0,
      );
    }

    if (bookingPanel) {
      const bookingRevealDuration = CONDENSED_PROGRESS - BOOKING_REVEAL_START;

      timeline
        .fromTo(
          bookingPanel,
          { opacity: 0 },
          { opacity: 1, duration: bookingRevealDuration, ease: 'none' },
          BOOKING_REVEAL_START,
        )
        .fromTo(
          bookingPanel,
          { y: () => getCssLength(stage, '--home-booking-reveal-offset', 16) },
          { y: 0, duration: bookingRevealDuration, ease: bookingRevealEase },
          BOOKING_REVEAL_START,
        );
    }

    let restoreFrameId;
    const applyReloadState = () => {
      const scrollTrigger = timeline.scrollTrigger;
      if (!isReload || !scrollTrigger) return;

      const restoredProgress = shouldRestoreCollapsed ? CONDENSED_PROGRESS : 0;
      const targetScroll = shouldRestoreCollapsed
        ? scrollTrigger.end
        : scrollTrigger.start;

      root.style.scrollBehavior = 'auto';
      gsap.set(window, {
        scrollTo: { y: targetScroll, autoKill: false },
      });
      scrollTrigger.update();
      timeline.progress(restoredProgress);
      setScrollState(restoredProgress);
      root.style.scrollBehavior = initialInlineScrollBehavior;
    };

    if (isReload) {
      ScrollTrigger.refresh();
      applyReloadState();
      restoreFrameId = window.requestAnimationFrame(applyReloadState);
    }

    let scrollTween;
    let inputReleaseTimer;
    let isInputLocked = false;
    let touchStartY;

    const getCurrentHeroState = () => {
      const scrollTrigger = timeline.scrollTrigger;
      if (!scrollTrigger || scrollTween) return HERO_RELOAD_STATES.TRANSITIONING;

      if (window.scrollY >= scrollTrigger.end - scrollBoundaryTolerance) {
        return HERO_RELOAD_STATES.COLLAPSED;
      }

      if (window.scrollY <= scrollTrigger.start + scrollBoundaryTolerance) {
        return HERO_RELOAD_STATES.EXPANDED;
      }

      return HERO_RELOAD_STATES.TRANSITIONING;
    };

    const persistHeroState = () => {
      saveHeroState(getCurrentHeroState());
    };

    const handlePageShow = () => {
      applyReloadState();
    };

    const scheduleInputRelease = () => {
      window.clearTimeout(inputReleaseTimer);
      inputReleaseTimer = window.setTimeout(() => {
        if (scrollTween) return;

        isInputLocked = false;
        root.style.scrollBehavior = initialInlineScrollBehavior;
      }, inputReleaseDelay);
    };

    const startHeroTransition = (targetScroll) => {
      isInputLocked = true;
      saveHeroState(HERO_RELOAD_STATES.TRANSITIONING);
      root.style.scrollBehavior = 'auto';
      scrollTween?.kill();
      scrollTween = gsap.to(window, {
        scrollTo: { y: targetScroll, autoKill: false },
        duration: heroTransitionDuration,
        ease: 'none',
        overwrite: true,
        onComplete: () => {
          gsap.set(window, {
            scrollTo: { y: targetScroll, autoKill: false },
          });
          scrollTween = undefined;
          saveHeroState(
            targetScroll >= timeline.scrollTrigger.end - scrollBoundaryTolerance
              ? HERO_RELOAD_STATES.COLLAPSED
              : HERO_RELOAD_STATES.EXPANDED,
          );
          scheduleInputRelease();
        },
        onInterrupt: () => {
          scrollTween = undefined;
          scheduleInputRelease();
        },
      });
    };

    const handleHeroWheel = (event) => {
      if (event.deltaY === 0) return;

      if (isInputLocked) {
        event.preventDefault();
        if (!scrollTween) scheduleInputRelease();
        return;
      }

      const scrollTrigger = timeline.scrollTrigger;
      if (!scrollTrigger) return;

      const currentScroll = window.scrollY;
      const movingDown = event.deltaY > 0;
      const shouldCollapse =
        movingDown &&
        currentScroll >= scrollTrigger.start - scrollBoundaryTolerance &&
        currentScroll < scrollTrigger.end - scrollBoundaryTolerance;
      const shouldExpand =
        !movingDown &&
        currentScroll > scrollTrigger.start + scrollBoundaryTolerance &&
        currentScroll <= scrollTrigger.end + scrollBoundaryTolerance;

      if (!shouldCollapse && !shouldExpand) return;

      event.preventDefault();
      startHeroTransition(shouldCollapse ? scrollTrigger.end : scrollTrigger.start);
    };

    const handleHeroTouchStart = (event) => {
      touchStartY = event.touches[0]?.clientY;
    };

    const handleHeroTouchMove = (event) => {
      const currentTouchY = event.touches[0]?.clientY;
      if (!Number.isFinite(touchStartY) || !Number.isFinite(currentTouchY)) return;

      const touchDistance = touchStartY - currentTouchY;
      if (Math.abs(touchDistance) < TOUCH_ACTIVATION_DISTANCE) return;

      if (isInputLocked) {
        event.preventDefault();
        return;
      }

      const scrollTrigger = timeline.scrollTrigger;
      if (!scrollTrigger) return;

      const currentScroll = window.scrollY;
      const movingDown = touchDistance > 0;
      const shouldCollapse =
        movingDown &&
        currentScroll >= scrollTrigger.start - scrollBoundaryTolerance &&
        currentScroll < scrollTrigger.end - scrollBoundaryTolerance;
      const shouldExpand =
        !movingDown &&
        currentScroll > scrollTrigger.start + scrollBoundaryTolerance &&
        currentScroll <= scrollTrigger.end + scrollBoundaryTolerance;

      if (!shouldCollapse && !shouldExpand) {
        touchStartY = currentTouchY;
        return;
      }

      event.preventDefault();
      startHeroTransition(shouldCollapse ? scrollTrigger.end : scrollTrigger.start);
    };

    const handleHeroTouchEnd = () => {
      touchStartY = undefined;
    };

    let frameResizeId;
    const handleFrameResize = () => {
      window.cancelAnimationFrame(frameResizeId);
      frameResizeId = window.requestAnimationFrame(() => {
        const progress = timeline.progress();

        frameTimeline.invalidate();
        frameTimeline.progress(progress >= 0.5 ? 0 : 1, true);
        frameTimeline.progress(progress, true);
      });
    };

    window.addEventListener('resize', handleFrameResize, { passive: true });
    window.addEventListener('wheel', handleHeroWheel, { passive: false });
    window.addEventListener('touchstart', handleHeroTouchStart, { passive: true });
    window.addEventListener('touchmove', handleHeroTouchMove, { passive: false });
    window.addEventListener('touchend', handleHeroTouchEnd, { passive: true });
    window.addEventListener('touchcancel', handleHeroTouchEnd, { passive: true });
    window.addEventListener('pagehide', persistHeroState);
    window.addEventListener('pageshow', handlePageShow);

    return () => {
      window.removeEventListener('resize', handleFrameResize);
      window.removeEventListener('wheel', handleHeroWheel);
      window.removeEventListener('touchstart', handleHeroTouchStart);
      window.removeEventListener('touchmove', handleHeroTouchMove);
      window.removeEventListener('touchend', handleHeroTouchEnd);
      window.removeEventListener('touchcancel', handleHeroTouchEnd);
      window.removeEventListener('pagehide', persistHeroState);
      window.removeEventListener('pageshow', handlePageShow);
      window.cancelAnimationFrame(restoreFrameId);
      window.cancelAnimationFrame(frameResizeId);
      scrollTween?.kill();
      scrollTween = undefined;
      window.clearTimeout(inputReleaseTimer);
      root.style.scrollBehavior = initialInlineScrollBehavior;
      window.history.scrollRestoration = INITIAL_SCROLL_RESTORATION;
      setScrollState(0);
      timeline.scrollTrigger?.kill();
      timeline.kill();
      frameTimeline.kill();
      if (booking) {
        gsap.set(booking, { clearProps: 'transform' });
        booking.style.removeProperty('--home-booking-flow-offset');
      }
      if (bookingPanel) gsap.set(bookingPanel, { clearProps: 'opacity,transform,visibility' });
    };
  });

  return () => media.revert();
}

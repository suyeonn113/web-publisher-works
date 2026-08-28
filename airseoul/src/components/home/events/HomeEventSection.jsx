import { useEffect, useLayoutEffect, useRef, useState } from 'react';

import { createHomeSectionFadeUpAnimation } from '../../../animations/home/homeSectionRevealAnimations';
import { homeEvents } from '../../../data/homeEvents';
import useReducedMotion from '../../../hooks/useReducedMotion';

const EVENT_AUTOPLAY_DELAY = 3200;
const EVENT_SWIPE_THRESHOLD = 40;
const EVENT_DESKTOP_QUERY = '(min-width: 1440px)';
const EVENT_TABLET_QUERY = '(min-width: 769px)';
const EVENT_MOBILE_QUERY = '(min-width: 481px)';

const EVENT_IMAGE_LABELS = {
  'last-minute-season-sale': '\ub2a6\uce89\uc2a4\u00b7\uac00\uc744 \ud2b9\uac00',
  'toss-pay': '\ud1a0\uc2a4\ud398\uc774 1\ub9cc\uc6d0 \ud560\uc778',
  payco: 'PAYCO 1.5% \uc989\uc2dc \ud560\uc778',
  'weekand-resort': '\ub354\uc704\ud06c\uc564\ub9ac\uc870\ud2b8 \uc81c\ud734 \ud61c\ud0dd',
  'aviation-museum': '\ud56d\uacf5\ubc15\ubb3c\uad00 \uccb4\ud5d8 \ud560\uc778',
  guam: '\uad0c \uc5ec\ud589 \ud61c\ud0dd',
  'cider-sale': '\uc0ac\uc774\ub2e4 \ucd08\ud2b9\uac00',
  'travel-awards': 'TRAVEL AWARDS 2026',
};

function getVisibleCount() {
  if (window.matchMedia(EVENT_DESKTOP_QUERY).matches) return 4;
  if (window.matchMedia(EVENT_TABLET_QUERY).matches) return 3;
  if (window.matchMedia(EVENT_MOBILE_QUERY).matches) return 2;

  return 1;
}

function HomeEventSection() {
  const sectionRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [animationDirection, setAnimationDirection] = useState(null);
  const [isInteractionPaused, setIsInteractionPaused] = useState(false);
  const [progressCycle, setProgressCycle] = useState(0);
  const [visibleCount, setVisibleCount] = useState(getVisibleCount);
  const didSwipeRef = useRef(false);
  const swipeStartRef = useRef(null);
  const isAnimating = animationDirection !== null;
  const prefersReducedMotion = useReducedMotion();
  const hasNavigation = homeEvents.length > visibleCount;
  const visibleEvents = Array.from({ length: visibleCount + 1 }, (_, offset) => {
    return homeEvents[(activeIndex + offset) % homeEvents.length];
  });

  useLayoutEffect(() => {
    return createHomeSectionFadeUpAnimation(sectionRef.current);
  }, []);

  useEffect(() => {
    const desktopQuery = window.matchMedia(EVENT_DESKTOP_QUERY);
    const tabletQuery = window.matchMedia(EVENT_TABLET_QUERY);
    const mobileQuery = window.matchMedia(EVENT_MOBILE_QUERY);
    const updateVisibleCount = () => {
      setAnimationDirection(null);
      setVisibleCount(getVisibleCount());
    };

    desktopQuery.addEventListener('change', updateVisibleCount);
    tabletQuery.addEventListener('change', updateVisibleCount);
    mobileQuery.addEventListener('change', updateVisibleCount);

    return () => {
      desktopQuery.removeEventListener('change', updateVisibleCount);
      tabletQuery.removeEventListener('change', updateVisibleCount);
      mobileQuery.removeEventListener('change', updateVisibleCount);
    };
  }, []);

  useEffect(() => {
    if (!hasNavigation || prefersReducedMotion || isInteractionPaused || isAnimating) {
      return undefined;
    }

    const timer = window.setTimeout(() => {
      setAnimationDirection('next');
    }, EVENT_AUTOPLAY_DELAY);

    return () => window.clearTimeout(timer);
  }, [activeIndex, hasNavigation, isAnimating, isInteractionPaused, prefersReducedMotion, progressCycle]);

  if (homeEvents.length === 0) return null;

  const moveEvent = (direction) => {
    if (!hasNavigation || isAnimating) return;

    const indexOffset = direction === 'previous' ? -1 : 1;

    if (prefersReducedMotion) {
      setActiveIndex((index) => {
        return (index + indexOffset + homeEvents.length) % homeEvents.length;
      });
      return;
    }

    if (direction === 'previous') {
      setActiveIndex((index) => {
        return (index - 1 + homeEvents.length) % homeEvents.length;
      });
    }

    setAnimationDirection(direction);
  };

  const handlePointerDown = (event) => {
    if (!hasNavigation || isAnimating || event.button !== 0) return;

    swipeStartRef.current = {
      clientX: event.clientX,
      pointerId: event.pointerId,
    };
    didSwipeRef.current = false;
    event.currentTarget.setPointerCapture?.(event.pointerId);
    setIsInteractionPaused(true);
  };

  const handlePointerEnd = (event) => {
    const swipeStart = swipeStartRef.current;
    if (!swipeStart || swipeStart.pointerId !== event.pointerId) return;

    const swipeDistance = swipeStart.clientX - event.clientX;
    swipeStartRef.current = null;

    if (event.currentTarget.hasPointerCapture?.(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }

    if (Math.abs(swipeDistance) >= EVENT_SWIPE_THRESHOLD) {
      didSwipeRef.current = true;
      moveEvent(swipeDistance > 0 ? 'next' : 'previous');
      window.setTimeout(() => {
        didSwipeRef.current = false;
      }, 0);
    }

    setIsInteractionPaused(false);
  };

  const handlePointerCancel = () => {
    swipeStartRef.current = null;
    didSwipeRef.current = false;
    setIsInteractionPaused(false);
  };

  const selectEvent = (index) => {
    if (isAnimating) return;

    setActiveIndex(index);
    setProgressCycle((cycle) => cycle + 1);
  };

  return (
    <section className="home-events" ref={sectionRef} aria-labelledby="home-events-title">
      <div className="home-events__inner">
        <header className="home-events__header">
          <span className="home-events__eyebrow">EVENT</span>
          <h2 id="home-events-title">이벤트</h2>
          <p>에어서울을 더 알차게 즐기는 다양한 혜택을 만나보세요.</p>
        </header>

        <div
          className={`home-events__carousel${isInteractionPaused ? ' is-paused' : ''}`}
          style={{
            '--home-events-autoplay-duration': `calc(${EVENT_AUTOPLAY_DELAY}ms + var(--home-motion-panel))`,
          }}
          aria-label="진행 중인 이벤트"
          aria-live="off"
          role="group"
        >
          <div
            className="home-events__viewport"
            onClickCapture={(event) => {
              if (!didSwipeRef.current) return;

              event.preventDefault();
              event.stopPropagation();
            }}
            onDragStart={(event) => event.preventDefault()}
            onPointerCancel={handlePointerCancel}
            onPointerDown={handlePointerDown}
            onPointerUp={handlePointerEnd}
          >
            <div
              className={`home-events__track${
                animationDirection ? ` is-${animationDirection}` : ''
              }`}
              onAnimationEnd={(event) => {
                if (event.target !== event.currentTarget || !animationDirection) return;

                if (animationDirection === 'next') {
                  setActiveIndex((index) => (index + 1) % homeEvents.length);
                }
                setAnimationDirection(null);
              }}
            >
              {visibleEvents.map((eventItem) => (
                <article className="home-event-card" key={eventItem.id}>
                  <a href={eventItem.href} target="_blank" rel="noreferrer">
                    <div className="home-event-card__image">
                      <img src={eventItem.image} alt="" draggable="false" />
                      <span className="home-event-card__image-copy">
                        <strong>{EVENT_IMAGE_LABELS[eventItem.id]}</strong>
                      </span>
                    </div>

                    <div className="home-event-card__content">
                      <time dateTime={eventItem.endDate}>
                        ~ {eventItem.endDate.replaceAll('-', '.')}
                      </time>
                      <h3>{eventItem.title}</h3>
                      <p>{eventItem.description}</p>
                      <span className="home-event-card__link" aria-hidden="true">
                        자세히 보기 <span>›</span>
                      </span>
                    </div>
                  </a>
                </article>
              ))}
            </div>
          </div>

          {hasNavigation && (
            <div className="home-events__progress" aria-label="이벤트 선택">
              {homeEvents.map((eventItem, index) => (
                <button
                  type="button"
                  className={index === activeIndex ? 'is-active' : ''}
                  key={eventItem.id}
                  aria-current={index === activeIndex ? 'true' : undefined}
                  aria-label={`${index + 1}번째 이벤트: ${eventItem.title}`}
                  onBlur={() => setIsInteractionPaused(false)}
                  onClick={() => selectEvent(index)}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter' || event.key === ' ') {
                      setIsInteractionPaused(true);
                    }
                  }}
                  onKeyUp={(event) => {
                    if (event.key === 'Enter' || event.key === ' ') {
                      setIsInteractionPaused(false);
                    }
                  }}
                  onPointerCancel={() => setIsInteractionPaused(false)}
                  onPointerDown={() => setIsInteractionPaused(true)}
                  onPointerLeave={() => setIsInteractionPaused(false)}
                  onPointerUp={() => setIsInteractionPaused(false)}
                >
                  <span key={`${activeIndex}-${progressCycle}-${index}`} />
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default HomeEventSection;

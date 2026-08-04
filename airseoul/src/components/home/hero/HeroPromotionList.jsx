import { useEffect, useRef, useState } from 'react';

import { heroPromotions } from '../../../data/heroPromotions';
import useReducedMotion from '../../../hooks/useReducedMotion';
import AppLink from '../../common/AppLink';

const PROMOTION_AUTOPLAY_DELAY = 5200;
const PROMOTION_SWIPE_ADVANCE_DELAY = 560;
const PROMOTION_SWIPE_MEDIA_QUERY = '(max-width: 768px)';

function HeroPromotionList() {
  const listRef = useRef(null);
  const shouldResetSwipeRef = useRef(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isSwipeLayout, setIsSwipeLayout] = useState(false);
  const [isInteractionPaused, setIsInteractionPaused] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const swipePromotions = heroPromotions.map((_, index) => {
    return heroPromotions[(activeIndex + index) % heroPromotions.length];
  });
  const visiblePromotions = isSwipeLayout
    ? swipePromotions
    : heroPromotions
        .map((_, index) => {
          return heroPromotions[(activeIndex + index) % heroPromotions.length];
        })
        .slice(0, 3);

  const handlePaginationClick = (index) => {
    shouldResetSwipeRef.current = false;

    if (isSwipeLayout) {
      listRef.current?.scrollTo({
        left: 0,
        behavior: 'auto',
      });
    }

    setActiveIndex(index);
  };

  useEffect(() => {
    const mediaQuery = window.matchMedia(PROMOTION_SWIPE_MEDIA_QUERY);
    const updateLayout = () => {
      setIsSwipeLayout(mediaQuery.matches);
    };

    updateLayout();
    mediaQuery.addEventListener('change', updateLayout);

    return () => {
      mediaQuery.removeEventListener('change', updateLayout);
    };
  }, []);

  useEffect(() => {
    if (heroPromotions.length <= 1 || prefersReducedMotion || isInteractionPaused) {
      return undefined;
    }

    let swipeAdvanceTimer;
    const timer = window.setInterval(() => {
      if (isSwipeLayout) {
        const list = listRef.current;
        const nextCard = list?.querySelectorAll('.hero-promotion-card')[1];

        if (list && nextCard) {
          list.scrollTo({
            left: nextCard.offsetLeft - list.offsetLeft,
            behavior: 'smooth',
          });

          swipeAdvanceTimer = window.setTimeout(() => {
            shouldResetSwipeRef.current = true;
            setActiveIndex((currentIndex) => {
              return (currentIndex + 1) % heroPromotions.length;
            });
          }, PROMOTION_SWIPE_ADVANCE_DELAY);

          return;
        }
      }

      setActiveIndex((currentIndex) => {
        return (currentIndex + 1) % heroPromotions.length;
      });
    }, PROMOTION_AUTOPLAY_DELAY);

    return () => {
      window.clearInterval(timer);
      window.clearTimeout(swipeAdvanceTimer);
    };
  }, [activeIndex, isInteractionPaused, isSwipeLayout, prefersReducedMotion]);

  useEffect(() => {
    const list = listRef.current;

    if (!isSwipeLayout) return;
    if (!shouldResetSwipeRef.current) return;
    if (!list) return;

    shouldResetSwipeRef.current = false;
    list.scrollTo({
      left: 0,
      behavior: 'auto',
    });
  }, [activeIndex, isSwipeLayout]);

  return (
    <div
      ref={listRef}
      className="hero-promotion-list"
      aria-label="프로모션 선택"
      aria-live="off"
      role="group"
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setIsInteractionPaused(false);
      }}
      onFocusCapture={() => setIsInteractionPaused(true)}
      onMouseEnter={() => setIsInteractionPaused(true)}
      onMouseLeave={() => setIsInteractionPaused(false)}
    >
      {visiblePromotions.map((promotion, index) => (
        <AppLink
          className={`hero-promotion-card hero-promotion-card--${index + 1}`}
          key={isSwipeLayout ? promotion.id : `${activeIndex}-${promotion.id}`}
          to={promotion.path}
        >
          <div className="hero-promotion-card__image">
            <img
              src={promotion.image}
              alt=""
            />
          </div>

          <div className="hero-promotion-card__content">
            <strong className="hero-promotion-card__title">
              {promotion.title}
            </strong>
          </div>
        </AppLink>
      ))}

      <div
        className="hero-promotion-list__pagination"
        aria-label="프로모션 슬라이드 선택"
        role="group"
      >
        {heroPromotions.map((promotion, index) => (
          <button
            type="button"
            className={index === activeIndex ? 'is-active' : ''}
            key={promotion.id}
            onClick={() => handlePaginationClick(index)}
            aria-label={`${promotion.title} 프로모션 보기`}
            aria-pressed={index === activeIndex}
          >
            <span aria-hidden="true" />
          </button>
        ))}
      </div>
    </div>
  );
}

export default HeroPromotionList;

import { useEffect, useRef, useState } from 'react';

import { heroPromotions } from '../../../data/heroPromotions';
import AppLink from '../../common/AppLink';

const PROMOTION_AUTOPLAY_DELAY = 5200;
const PROMOTION_SWIPE_ADVANCE_DELAY = 560;
const PROMOTION_SWIPE_MEDIA_QUERY = '(max-width: 768px)';

function HeroPromotionList() {
  const listRef = useRef(null);
  const shouldResetSwipeRef = useRef(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isSwipeLayout, setIsSwipeLayout] = useState(false);
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
    if (heroPromotions.length <= 1) return undefined;

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
  }, [isSwipeLayout]);

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

      <div className="hero-promotion-list__pagination" aria-hidden="true">
        {heroPromotions.map((promotion, index) => (
          <span
            className={index === activeIndex ? 'is-active' : ''}
            key={promotion.id}
          />
        ))}
      </div>
    </div>
  );
}

export default HeroPromotionList;

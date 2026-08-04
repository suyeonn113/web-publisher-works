import { useEffect, useRef, useState } from 'react';
import { ROUTES } from '../../../constants/routes';
import useReducedMotion from '../../../hooks/useReducedMotion';
import { PLACEHOLDER_LINK } from '../../../utils/link';
import { createOneWaySearchParams } from '../../../utils/searchParams';
import AppLink from '../../common/AppLink';

function formatPrice(price) {
  if (typeof price !== 'number') return '';

  return price.toLocaleString('ko-KR');
}

function getBookingLink(flight) {
  if (!flight) return PLACEHOLDER_LINK;

  const query = new URLSearchParams(
    createOneWaySearchParams({
      from: flight.route.from.code,
      to: flight.route.to.code,
      departureDate: flight.schedule.departureDate,
    }),
  ).toString();

  return `${ROUTES.booking.flight}?${query}`;
}

function HeroSlider({ slides = [], autoPlayDelay = 5000 }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isInteractionPaused, setIsInteractionPaused] = useState(false);
  const videoRefs = useRef([]);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    videoRefs.current.forEach((video, index) => {
      if (!video) return;

      if (index !== activeIndex || prefersReducedMotion) {
        video.pause();
        video.currentTime = 0;
        return;
      }

      video.currentTime = 0;
      video.play().catch(() => {});
    });
  }, [activeIndex, prefersReducedMotion]);

  useEffect(() => {
    if (slides.length <= 1 || prefersReducedMotion || isInteractionPaused) return undefined;

    const timer = window.setInterval(() => {
      setActiveIndex((prevIndex) => {
        return (prevIndex + 1) % slides.length;
      });
    }, autoPlayDelay);

    return () => {
      window.clearInterval(timer);
    };
  }, [slides.length, autoPlayDelay, isInteractionPaused, prefersReducedMotion]);

  if (slides.length === 0) return null;

  return (
    <div
      className="hero-slider"
      aria-label="특가 항공권 슬라이더"
      aria-live="off"
      aria-roledescription="carousel"
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setIsInteractionPaused(false);
      }}
      onFocusCapture={() => setIsInteractionPaused(true)}
      onMouseEnter={() => setIsInteractionPaused(true)}
      onMouseLeave={() => setIsInteractionPaused(false)}
      role="group"
    >
      <div className="hero-slider__track">
        {slides.map((slide, index) => {
          const isActive = index === activeIndex;
          const isNext = index === (activeIndex + 1) % slides.length;
          const price = slide.lowestFare?.price;
          const description =
            slide.visual.description ??
            slide.flight?.route?.to?.city ??
            slide.visual.subtitle;
          const departureDate = slide.flight?.schedule?.departureDate;

          return (
            <article
              className={`hero-slider__slide ${isActive ? 'is-active' : ''}`}
              id={`hero-slide-${slide.id}`}
              key={slide.id}
              aria-hidden={!isActive}
            >
              <div className="hero-slider__media" aria-hidden="true">
                <video
                  ref={(node) => {
                    videoRefs.current[index] = node;
                  }}
                  muted
                  loop
                  playsInline
                  // poster={slide.visual.media.poster}
                  src={isActive || isNext ? slide.visual.media.src : undefined}
                />
              </div>

              <div className="hero-slider__content">
                <p className="hero-slider__eyebrow">
                  AIR SEOUL SPECIAL FARE
                </p>

                <h3 className="hero-slider__title">
                  {slide.visual.title}
                </h3>

                <p className="hero-slider__subtitle">
                  {description}
                </p>

                {price && (
                  <p className="hero-slider__price">
                    편도 총액 <strong>{formatPrice(price)}원</strong>부터
                  </p>
                )}

                {departureDate && (
                  <p className="hero-slider__date">
                    {departureDate} 출발 기준
                  </p>
                )}

                <AppLink
                  className="hero-slider__cta"
                  tabIndex={isActive ? 0 : -1}
                  to={getBookingLink(slide.flight)}
                >
                  지금 예약하기
                </AppLink>
              </div>
            </article>
          );
        })}
      </div>

      <div className="hero-slider__pagination" aria-label="히어로 슬라이드" role="group">
        {slides.map((slide, index) => (
          <button
            type="button"
            aria-controls={`hero-slide-${slide.id}`}
            key={slide.id}
            className={index === activeIndex ? 'is-active' : ''}
            onClick={() => setActiveIndex(index)}
            aria-label={`${slide.visual.subtitle} 특가 보기`}
            aria-pressed={index === activeIndex}
          >
            <span aria-hidden="true" />
          </button>
        ))}
      </div>
    </div>
  );
}

export default HeroSlider;

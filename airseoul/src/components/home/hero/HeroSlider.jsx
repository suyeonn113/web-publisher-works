import { useEffect, useRef, useState } from 'react';
import AppLink, { PLACEHOLDER_LINK } from '../../common/AppLink';
import { ROUTES } from '../../../constants/routes';
import { createOneWaySearchParams } from '../../../utils/searchParams';

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
  const videoRefs = useRef([]);

  useEffect(() => {
    videoRefs.current.forEach((video, index) => {
      if (!video) return;

      if (index !== activeIndex) {
        video.pause();
        video.currentTime = 0;
        return;
      }

      video.currentTime = 0;
      video.play().catch(() => {});
    });
  }, [activeIndex]);

  useEffect(() => {
    if (slides.length <= 1) return undefined;

    const timer = window.setInterval(() => {
      setActiveIndex((prevIndex) => {
        return (prevIndex + 1) % slides.length;
      });
    }, autoPlayDelay);

    return () => {
      window.clearInterval(timer);
    };
  }, [slides.length, autoPlayDelay]);

  if (slides.length === 0) return null;

  return (
    <div
      className="hero-slider"
      aria-roledescription="carousel"
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

                <AppLink className="hero-slider__cta" to={getBookingLink(slide.flight)}>
                  지금 예약하기
                </AppLink>
              </div>
            </article>
          );
        })}
      </div>

      <div className="hero-slider__pagination" aria-label="히어로 슬라이드">
        {slides.map((slide, index) => (
          <button
            type="button"
            key={slide.id}
            className={index === activeIndex ? 'is-active' : ''}
            onClick={() => setActiveIndex(index)}
            aria-label={`${slide.visual.subtitle} 특가 보기`}
            aria-pressed={index === activeIndex}
          />
        ))}
      </div>
    </div>
  );
}

export default HeroSlider;

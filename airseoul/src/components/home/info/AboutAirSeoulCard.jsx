import { useLayoutEffect, useRef } from 'react';
import { createHomeInfoRevealAnimation } from '../../../animations/home/homeSectionRevealAnimations';
import { ROUTES } from '../../../constants/routes';
import { iconSize } from '../../../tokens/size';
import AppLink from '../../common/AppLink';
import ChevronRightIcon from '../../icons/ChevronRightIcon';

function AboutAirSeoulCard() {
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    return createHomeInfoRevealAnimation(sectionRef.current);
  }, []);

  return (
    <article className="home-info-about" ref={sectionRef}>
      <div className="home-info-about__inner">
        <div className="home-info-about__content">
          <span className="home-info-about__eyebrow">AIR SEOUL STORY</span>
          <h3>
            가벼운 비행,
            <br />
            {' '}
            <em>더 나은 선택.</em>
          </h3>
          <p>
            복잡한 여행의 선택은 덜어내고,
            <br />
            {' '}
            꼭 필요한 편안함은 더했습니다.
          </p>
          <AppLink className="home-info-about__button" to={ROUTES.company.brandStory}>
            <span>에어서울 소개 보기</span>
            <ChevronRightIcon size={iconSize.sm} />
          </AppLink>
        </div>

        <div className="home-info-about__visual-shell">
          <picture className="home-info-about__picture">
            <source
              media="(max-width: 768px)"
              srcSet={`${import.meta.env.BASE_URL}images/home-info/about-airseoul-flight-v6-mobile.png`}
            />
            <img
              className="home-info-about__visual"
              src={`${import.meta.env.BASE_URL}images/home-info/about-airseoul-flight-v6.png`}
              alt="구름 위를 비행하는 에어서울 항공기"
              decoding="async"
              height="992"
              loading="lazy"
              width="1586"
            />
          </picture>
        </div>
      </div>
    </article>
  );
}

export default AboutAirSeoulCard;

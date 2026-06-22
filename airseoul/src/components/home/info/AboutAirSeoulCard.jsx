import { ROUTES } from '../../../constants/routes';
import { airSeoulStats } from '../../../data/homeInfo';
import { iconSize } from '../../../tokens/size';
import AppLink from '../../common/AppLink';
import ChevronRightIcon from '../../icons/ChevronRightIcon';

function AboutAirSeoulCard() {
  return (
    <article className="home-info-about">
      <div className="home-info-about__content">
        <span className="home-info-about__eyebrow">ABOUT AIR SEOUL</span>
        <h3>
          더 나은 선택의 시작,
          <br />
          <strong>에어서울</strong>
        </h3>
        <p>
          합리적인 선택과 고객 맞춤 서비스로
          <br />
          여행을 더 쉽게 완성합니다.
        </p>
        <AppLink className="home-info-about__button" to={ROUTES.company.brandStory}>
          <span>에어서울 소개</span>
          <ChevronRightIcon size={iconSize.sm} />
        </AppLink>
      </div>

      <img
        className="home-info-about__visual"
        src={`${import.meta.env.BASE_URL}images/home-info/about-airseoul-v2.png`}
        alt=""
        aria-hidden="true"
      />

      <ul className="home-info-about__stats">
        {airSeoulStats.map((stat) => {
          const StatIcon = stat.icon;

          return (
            <li className="home-info-about__stat" key={stat.id}>
              <StatIcon />
              <span>
                <strong>{stat.value}</strong>
                <small>{stat.label}</small>
              </span>
            </li>
          );
        })}
      </ul>
    </article>
  );
}

export default AboutAirSeoulCard;

import { ROUTES } from '../../../constants/routes';
import { homeNotices } from '../../../data/homeInfo';
import { iconSize } from '../../../tokens/size';
import AppLink from '../../common/AppLink';
import ChevronRightIcon from '../../icons/ChevronRightIcon';

function NoticePanel() {
  return (
    <article className="home-info-notice">
      <header className="home-info-card-header">
        <h3>공지사항</h3>
        <AppLink className="home-info-more" to={ROUTES.contact.notice}>
          <span>더보기</span>
          <ChevronRightIcon size={iconSize.sm} />
        </AppLink>
      </header>

      <ul className="home-info-notice__list">
        {homeNotices.map((notice) => (
          <li className="home-info-notice__item" key={notice.id}>
            <AppLink className="home-info-notice__link" to={notice.to}>
              <span className="home-info-notice__title">{notice.title}</span>
              <time dateTime={notice.date.replaceAll('.', '-')}>{notice.date}</time>
            </AppLink>
          </li>
        ))}
      </ul>

      <AppLink className="home-info-status" to={ROUTES.booking.flightStatus}>
        <strong>운항 현황 안내</strong>
        <small>실시간 운항 정보를 확인하세요.</small>
        <ChevronRightIcon size={iconSize.sm} />
      </AppLink>
    </article>
  );
}

export default NoticePanel;

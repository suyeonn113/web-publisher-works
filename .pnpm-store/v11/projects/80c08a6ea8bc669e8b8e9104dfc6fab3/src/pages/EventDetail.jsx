import { Navigate, useParams } from 'react-router-dom';
import AppLink from '../components/common/AppLink';
import { ROUTES } from '../constants/routes';
import { heroPromotions } from '../data/heroPromotions';

const EVENT_NOTES = [
  '프로모션 혜택은 에어서울 홈페이지와 모바일에서 구매한 항공권에 적용됩니다.',
  '할인 운임과 혜택은 노선과 날짜별로 다르며 한정 좌석 소진 시 조기 종료될 수 있습니다.',
  '항공권 취소 또는 여정 변경 시 운임 규정에 따른 수수료가 부과될 수 있습니다.',
  '운항 스케줄은 정부 인가 조건이며 예고 없이 변경될 수 있습니다.',
];

export default function EventDetail() {
  const { eventId } = useParams();
  const event = heroPromotions.find((promotion) => promotion.id === eventId);

  if (!event) return <Navigate to={ROUTES.benefit.event} replace />;

  return (
    <main className="event-page event-detail-page" aria-labelledby="event-detail-title">
      <article className="event-page__inner">
        <header className="event-detail__header">
          <span>진행중인 이벤트</span>
          <h1 id="event-detail-title">{event.title}</h1>
          <p>{event.summary}</p>
          <time>{event.period}</time>
        </header>

        <div className="event-detail__visual">
          <img src={event.image} alt={event.title} />
        </div>

        <section className="event-detail__information">
          <h2>이벤트 안내</h2>
          <dl>
            <div>
              <dt>예약 기간</dt>
              <dd>{event.bookingPeriod}</dd>
            </div>
            <div>
              <dt>탑승·이용 기간</dt>
              <dd>{event.travelPeriod}</dd>
            </div>
            <div>
              <dt>주요 혜택</dt>
              <dd>
                <ul>
                  {event.benefits.map((benefit) => <li key={benefit}>{benefit}</li>)}
                </ul>
              </dd>
            </div>
          </dl>
        </section>

        <section className="event-detail__notes">
          <h2>유의사항</h2>
          <ul>
            {EVENT_NOTES.map((note) => <li key={note}>{note}</li>)}
          </ul>
        </section>

        <div className="event-detail__actions">
          <AppLink to={ROUTES.benefit.event}>목록으로</AppLink>
          <AppLink className="is-primary" to={ROUTES.booking.root}>항공권 예매</AppLink>
        </div>
      </article>
    </main>
  );
}

import AppLink from '../common/AppLink';

export default function EventCard({ event }) {
  return (
    <li>
      <AppLink className="event-card" to={event.path}>
        <div className="event-card__image">
          <img src={event.image} alt="" />
        </div>
        <div className="event-card__content">
          <span>진행중</span>
          <h2>{event.title}</h2>
          <p>{event.summary}</p>
          <time>{event.period}</time>
        </div>
      </AppLink>
    </li>
  );
}

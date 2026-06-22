import EventCard from '../components/events/EventCard';
import EventTabs from '../components/events/EventTabs';
import { heroPromotions } from '../data/heroPromotions';

export default function EventList() {
  return (
    <main className="event-page" aria-labelledby="event-list-title">
      <div className="event-page__inner">
        <header className="event-page__header">
          <span>EVENT & PROMOTION</span>
          <h1 id="event-list-title">이벤트</h1>
        </header>
        <EventTabs />
        <ul className="event-list">
          {heroPromotions.map((event) => (
            <EventCard event={event} key={event.id} />
          ))}
        </ul>
      </div>
    </main>
  );
}

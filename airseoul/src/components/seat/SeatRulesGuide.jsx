import { SEAT_RULES } from './seatGuideData';
import CircleAlertIcon from '../icons/CircleAlertIcon';

export default function SeatRulesGuide() {
  return (
    <section className="seat-guide-panel seat-guide-rules">
      <h2 className="seat-guide-rules__title">
        <CircleAlertIcon size={28} />
        <span>구매 전 확인해 주세요</span>
      </h2>
      <ul>
        {SEAT_RULES.map((rule) => <li key={rule}>{rule}</li>)}
      </ul>
    </section>
  );
}

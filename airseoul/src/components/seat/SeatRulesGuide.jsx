import { SEAT_RULES } from './seatGuideData';

export default function SeatRulesGuide() {
  return <section className="seat-guide-panel seat-guide-rules"><h2>구매 전 확인해 주세요</h2><ul>{SEAT_RULES.map((rule) => <li key={rule}>{rule}</li>)}</ul></section>;
}

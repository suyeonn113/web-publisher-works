import SeatAircraftGuide from './SeatAircraftGuide';
import SeatRulesGuide from './SeatRulesGuide';
import SeatZoneGuide from './SeatZoneGuide';

export default function AdvanceSeatGuide({ onLogin }) {
  return (
    <div className="advance-seat-guide">
      <SeatZoneGuide onLogin={onLogin} />
      <SeatAircraftGuide />
      <SeatRulesGuide />
    </div>
  );
}

import SeatMapGallery from './SeatMapGallery';
import SeatGradeGuide from './SeatGradeGuide';
import SeatPriceGuide from './SeatPriceGuide';
import SeatRulesGuide from './SeatRulesGuide';
import SeatZoneGuide from './SeatZoneGuide';

export default function AdvanceSeatGuide() {
  return (
    <div className="advance-seat-guide">
      <SeatZoneGuide />
      <SeatGradeGuide />
      <SeatMapGallery />
      <SeatPriceGuide />
      <SeatRulesGuide />
    </div>
  );
}

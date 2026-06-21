import SeatMapGallery from './SeatMapGallery';
import SeatPriceGuide from './SeatPriceGuide';
import SeatRulesGuide from './SeatRulesGuide';
import SeatZoneGuide from './SeatZoneGuide';

export default function AdvanceSeatGuide() {
  return <div className="advance-seat-guide"><SeatZoneGuide /><SeatMapGallery /><SeatPriceGuide /><SeatRulesGuide /></div>;
}

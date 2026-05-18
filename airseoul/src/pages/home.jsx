import FlightBookingSection from '../components/flight/flight-service/FlightServiceSection';
import SpecialFareSection from '../components/home/SpecialFareSection';
import ServiceShortcutSection from '../components/home/ServiceShortcutSection';
import HomeMobileQuickBar from '../components/home/HomeMobileQuickBar';

export default function Home({ defaultSearchParams, onSearch }) {
  return (
    <main className="home">
      <SpecialFareSection onSelectFare={onSearch} />
      <FlightBookingSection defaultValues={defaultSearchParams} onSearch={onSearch} />
      <ServiceShortcutSection />
      <HomeMobileQuickBar />
    </main>
  );
}

import { useNavigate } from 'react-router-dom';
import FlightBookingSection from '../components/flight/flight-service/FlightServiceSection';
import HomeMobileQuickBar from '../components/home/HomeMobileQuickBar';
import HeroSection from '../components/home/hero/HeroSection';
import HomeInfoSection from '../components/home/info/HomeInfoSection';
import ServiceShortcutSection from '../components/home/service-shortcut/ServiceShortcutSection';
import { ROUTES } from '../constants/routes';

export default function Home({ defaultSearchParams }) {
  const navigate = useNavigate();

  const handleSearch = (params) => {
    const query = new URLSearchParams(params).toString();
    navigate(`${ROUTES.booking.flight}?${query}`);
  };

  return (
    <main className="home">
      <HeroSection />
      <FlightBookingSection defaultValues={defaultSearchParams} onSearch={handleSearch} />
      <ServiceShortcutSection />
      <HomeInfoSection />
      <HomeMobileQuickBar />
    </main>
  );
}

import { useNavigate } from 'react-router-dom';
import HomeMobileQuickBar from '../components/home/HomeMobileQuickBar';
import HomeBookingSection from '../components/home/booking-promotion/HomeBookingSection';
import HomeEventSection from '../components/home/events/HomeEventSection';
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
      <h1 className="sr-only">에어서울 홈</h1>
      <div className="home-hero-booking-scene">
        <HeroSection />
        <HomeBookingSection
          defaultValues={defaultSearchParams}
          onSearch={handleSearch}
        />
      </div>
      <ServiceShortcutSection />
      <HomeEventSection />
      <HomeInfoSection />
      <HomeMobileQuickBar />
    </main>
  );
}

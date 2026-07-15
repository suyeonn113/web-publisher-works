import AboutAirSeoulCard from './AboutAirSeoulCard';
import CustomerCenterPanel from './CustomerCenterPanel';
import NoticePanel from './NoticePanel';

function HomeInfoSection() {
  return (
    <section className="home-info" aria-labelledby="home-info-title">
      <div className="home-info__inner">
        <header className="home-info__header">
          <h2 id="home-info-title">필요한 정보, 빠르게 확인하세요</h2>
          <p>에어서울의 최신 소식과 다양한 고객 지원 서비스를 만나보세요.</p>
        </header>

        <div className="home-info__layout">
          <div className="home-info__support">
            <NoticePanel />
            <CustomerCenterPanel />
          </div>
          <AboutAirSeoulCard />
        </div>
      </div>
    </section>
  );
}

export default HomeInfoSection;

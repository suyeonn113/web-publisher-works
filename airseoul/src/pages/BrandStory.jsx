import BrandValues from '../components/brand/BrandValues';
import BrandStoryTabs from '../components/brand/BrandStoryTabs';
import CustomerStories from '../components/brand/CustomerStories';

const BRAND_HERO_IMAGE = `${import.meta.env.BASE_URL}images/home-info/about-airseoul-v2.png`;

export default function BrandStory() {
  return (
    <main className="brand-story-page" aria-labelledby="brand-story-title">
      <div className="brand-story-page__inner">
        <header className="brand-story-page__header">
          <span>AIR SEOUL STORY</span>
          <h1 id="brand-story-title">에어서울 이야기</h1>
        </header>

        <BrandStoryTabs />

        <section className="brand-story-hero" aria-label="에어서울 브랜드 메시지">
          <img src={BRAND_HERO_IMAGE} alt="구름 위를 비행하는 에어서울 항공기" />
          <div>
            <span>YOUR TRAVEL PARTNER</span>
            <h2>당신의 여행을 위한,<br />에어서울</h2>
            <p>복잡한 선택은 줄이고, 필요한 여행 경험은 더 선명하게 만듭니다.</p>
          </div>
        </section>

        <section className="brand-story-intro">
          <span>OUR PROMISE</span>
          <h2>고객의 필요를 가장 잘 이해하는 항공사</h2>
          <p>여행에서 중요한 것은 화려한 선택지가 아니라 나에게 맞는 합리적인 선택입니다. 에어서울은 운임, 노선과 서비스를 이해하기 쉽게 연결해 고객이 자신만의 여행을 완성하도록 돕습니다.</p>
        </section>

        <BrandValues />
        <CustomerStories />

        <section className="brand-story-closing">
          <span>BETTER CHOICE, BETTER JOURNEY</span>
          <h2>더 나은 선택을 제공하는 여행 파트너</h2>
          <p>당신의 필요를 이해하고 여행의 모든 순간을 더 편리하게 만드는 것, 에어서울이 지향하는 가치입니다.</p>
        </section>
      </div>
    </main>
  );
}

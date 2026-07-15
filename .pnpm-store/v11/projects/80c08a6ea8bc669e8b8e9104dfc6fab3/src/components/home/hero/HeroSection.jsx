import { getHeroSlidesWithLowestFares } from '../../../services/heroFares';

import HeroSlider from './HeroSlider';
import HeroPromotionList from './HeroPromotionList';

function HeroSection() {
  const slides = getHeroSlidesWithLowestFares();

  return (
    <section
      className="hero-section"
      aria-labelledby="hero-section-title"
    >
      <h2
        className="sr-only"
        id="hero-section-title"
      >
        에어서울 특가 항공권
      </h2>

      <HeroSlider slides={slides} />

      <div className="hero-section__overlay">
        <div className="hero-section__inner">
          <HeroPromotionList />
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
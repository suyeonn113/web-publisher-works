import { banners } from '../../../data/banners'
import HeroBannerSlider from './HeroBannerSlider'
import './HomeHeroSection.scss'

function HomeHeroSection() {
  return (
    <section className="home-hero-section" aria-label="메인 배너">
      <HeroBannerSlider banners={banners} />
    </section>
  )
}

export default HomeHeroSection

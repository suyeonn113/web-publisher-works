import HomeHeroSection from '../components/home/HomeHeroSection/HomeHeroSection'
import HomeFeatureShortcutSection from '../components/home/HomeFeatureShortcutSection/HomeFeatureShortcutSection'
import HomeCategoryMenuSection from '../components/home/HomeCategoryMenuSection/HomeCategoryMenuSection'
import HomeRecommendSection from '../components/home/HomeRecommendSection/HomeRecommendSection'
import HomeNewArrivalSection from '../components/home/HomeNewArrivalSection/HomeNewArrivalSection'
import HomeRankingSection from '../components/home/HomeRankingSection/HomeRankingSection'
import HomePromotionSection from '../components/home/HomePromotionSection/HomePromotionSection'
import HomeDeliverySection from '../components/home/HomeDeliverySection/HomeDeliverySection'
import './HomePage.scss'

function HomePage() {
  return (
    <div className="home-page">
      <HomeHeroSection />
      <HomeFeatureShortcutSection />
      <HomeCategoryMenuSection />
      <HomeRecommendSection />
      <HomeNewArrivalSection />
      <HomeRankingSection />
      <HomePromotionSection />
      <HomeDeliverySection />
    </div>
  )
}

export default HomePage

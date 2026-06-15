import ProductCardList from '../../common/ProductCardList/ProductCardList'
import ScrollNavigator from '../../common/ScrollNavigator/ScrollNavigator'
import SectionHeader from '../../common/SectionHeader/SectionHeader'
import { useProducts } from '../../../hooks/useProducts'
import './HomeRecommendSection.scss'

function HomeRecommendSection() {
  const { recommendedProducts,  productsByCategory } = useProducts();

  return (
    <section className="home-section">
      <SectionHeader title="오늘의 추천상품" />
      <ScrollNavigator
        targetSelector=".product-card-list"
        previousLabel="이전 추천상품 보기"
        nextLabel="다음 추천상품 보기"
      >
        <ProductCardList products={recommendedProducts} />
      </ScrollNavigator>
    </section>
  )
}

export default HomeRecommendSection

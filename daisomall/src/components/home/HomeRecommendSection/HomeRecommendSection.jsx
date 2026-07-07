import ProductCardList from '../../common/ProductCardList/ProductCardList'
import ScrollNavigator from '../../common/ScrollNavigator/ScrollNavigator'
import SectionHeader from '../../common/SectionHeader/SectionHeader'
import { useProducts } from '../../../hooks/useProducts'

function HomeRecommendSection() {
  const { recommendedProducts } = useProducts();

  return (
    <section className="home-section">
      <SectionHeader title="오늘의 추천상품" />
      <ScrollNavigator
        targetSelector=".product-card-list"
        previousLabel="이전 추천상품 보기"
        nextLabel="다음 추천상품 보기"
      >
        <ProductCardList products={recommendedProducts} ariaLabel="오늘의 추천상품 목록" />
      </ScrollNavigator>
    </section>
  )
}

export default HomeRecommendSection

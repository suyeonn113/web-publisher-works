import ProductCardList from '../../common/ProductCardList/ProductCardList'
import ScrollNavigator from '../../common/ScrollNavigator/ScrollNavigator'

function RankingProductList({ products }) {
  return (
    <ScrollNavigator
      targetSelector=".product-card-list"
      previousLabel="이전 랭킹상품 보기"
      nextLabel="다음 랭킹상품 보기"
    >
      <ProductCardList products={products} ranked />
    </ScrollNavigator>
  )
}

export default RankingProductList

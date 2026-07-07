import { useState } from 'react'
import SectionHeader from '../../common/SectionHeader/SectionHeader'
import ProductCardList from '../../common/ProductCardList/ProductCardList'
import ScrollNavigator from '../../common/ScrollNavigator/ScrollNavigator'
import { rankingCategories } from '../../../data/rankings'
import { useRankingProducts } from '../../../hooks/useRankingProducts'
import RankingTabList from './RankingTabList'
import './HomeRankingSection.scss'

function HomeRankingSection() {
  const [activeCategoryId, setActiveCategoryId] = useState(rankingCategories[0].id)
  const { rankedProducts } = useRankingProducts(activeCategoryId);
  const rankingPanelId = 'ranking-product-panel'

  return (
    <section className="home-section">
      <SectionHeader title="랭킹" />
      <RankingTabList
        activeTabId={activeCategoryId}
        tabs={rankingCategories}
        panelId={rankingPanelId}
        onTabChange={setActiveCategoryId}
      />
      <div
        id={rankingPanelId}
        role="tabpanel"
        aria-labelledby={`ranking-tab-${activeCategoryId}`}
      >
        <ScrollNavigator
          targetSelector=".product-card-list"
          previousLabel="이전 랭킹상품 보기"
          nextLabel="다음 랭킹상품 보기"
        >
          <ProductCardList products={rankedProducts} ranked ariaLabel="랭킹 상품 목록" />
        </ScrollNavigator>
      </div>
    </section>
  )
}

export default HomeRankingSection

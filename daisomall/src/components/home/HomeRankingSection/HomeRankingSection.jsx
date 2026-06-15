import { useState } from 'react'
import SectionHeader from '../../common/SectionHeader/SectionHeader'
import { rankingCategories } from '../../../data/rankings'
import { useRankingProducts } from '../../../hooks/useRankingProducts'
import RankingTabList from './RankingTabList'
import RankingProductList from './RankingProductList'
import './HomeRankingSection.scss'

function HomeRankingSection() {
  const [activeCategoryId, setActiveCategoryId] = useState(rankingCategories[0].id)
  const { rankedProducts } = useRankingProducts(activeCategoryId);

  return (
    <section className="home-section">
      <SectionHeader title="랭킹" />
      <RankingTabList
        activeTabId={activeCategoryId}
        tabs={rankingCategories}
        onTabChange={setActiveCategoryId}
      />
      <RankingProductList products={rankedProducts} />
    </section>
  )
}

export default HomeRankingSection

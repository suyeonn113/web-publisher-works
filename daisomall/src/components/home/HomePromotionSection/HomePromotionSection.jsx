import { useState } from 'react'
import { promotionGroups, promotionTabs } from '../../../data/promotions'
import SectionHeader from '../../common/SectionHeader/SectionHeader'
import PromotionCardList from './PromotionCardList'
import PromotionTabList from './PromotionTabList'
import './HomePromotionSection.scss'

function HomePromotionSection() {
  const [activeTabId, setActiveTabId] = useState(promotionTabs[0].id)
  const activePromotions = promotionGroups[activeTabId]
  const cardVariant = activeTabId === 'category' ? 'horizontal' : 'vertical'

  return (
    <section className="home-section">
      <SectionHeader title="기획전" />
      <PromotionTabList
        tabs={promotionTabs}
        activeTabId={activeTabId}
        onChangeTab={setActiveTabId}
      />
      <PromotionCardList promotions={activePromotions} variant={cardVariant} />
    </section>
  )
}

export default HomePromotionSection

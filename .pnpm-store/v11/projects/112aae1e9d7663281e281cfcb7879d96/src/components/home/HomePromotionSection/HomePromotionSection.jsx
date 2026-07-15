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
  const promotionPanelId = 'promotion-card-panel'

  return (
    <section className="home-section">
      <SectionHeader title="기획전" />
      <PromotionTabList
        tabs={promotionTabs}
        activeTabId={activeTabId}
        panelId={promotionPanelId}
        onChangeTab={setActiveTabId}
      />
      <div
        id={promotionPanelId}
        role="tabpanel"
        aria-labelledby={`promotion-tab-${activeTabId}`}
      >
        <PromotionCardList promotions={activePromotions} variant={cardVariant} />
      </div>
    </section>
  )
}

export default HomePromotionSection

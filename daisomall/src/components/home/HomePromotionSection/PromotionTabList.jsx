import {
  GeometricShapesIcon,
  ShoppingBagIcon,
  TrendArrowIcon,
} from '../../icons'
import PromotionTabButton from './PromotionTabButton'

const promotionTabIcons = {
  category: GeometricShapesIcon,
  popular: TrendArrowIcon,
  purchase: ShoppingBagIcon,
}

function PromotionTabList({ tabs, activeTabId, onChangeTab }) {
  return (
    <div className="promotion-tab-list">
      {tabs.map((tab) => (
        <PromotionTabButton
          key={tab.id}
          label={tab.label}
          icon={promotionTabIcons[tab.id]}
          isActive={tab.id === activeTabId}
          onClick={() => onChangeTab(tab.id)}
        />
      ))}
    </div>
  )
}

export default PromotionTabList

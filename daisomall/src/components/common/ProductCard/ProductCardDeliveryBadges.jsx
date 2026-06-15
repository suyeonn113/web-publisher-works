import DaisoBulkOrderIcon from '../../icons/DaisoBulkOrderIcon'
import DaisoDeliveryIcon from '../../icons/DaisoDeliveryIcon'
import DaisoPickupIcon from '../../icons/DaisoPickupIcon'
import DaisoTodayArrivalIcon from '../../icons/DaisoTodayArrivalIcon'
import { iconSize } from '../../../tokens/size'

const BADGE_ICONS = {
  delivery: {
    Icon: DaisoDeliveryIcon,
    label: '다이소 배송',
  },
  today: {
    Icon: DaisoTodayArrivalIcon,
    label: '오늘 배송',
  },
  pickup: {
    Icon: DaisoPickupIcon,
    label: '픽업',
  },
  bulk: {
    Icon: DaisoBulkOrderIcon,
    label: '대량 주문',
  },
}

function ProductCardDeliveryBadges({ badges = [] }) {
  const visibleBadges = badges
    .map((badge) => BADGE_ICONS[badge])
    .filter(Boolean)

  if (!visibleBadges.length) {
    return null
  }

  return (
    <ul className="product-card__badges" aria-label="상품 서비스">
      {visibleBadges.map(({ Icon, label }) => (
        <li key={label}>
          <Icon size={iconSize.sm} label={label} />
        </li>
      ))}
    </ul>
  )
}

export default ProductCardDeliveryBadges

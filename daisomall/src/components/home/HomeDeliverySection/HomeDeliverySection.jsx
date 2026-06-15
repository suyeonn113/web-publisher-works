import SectionHeader from '../../common/SectionHeader/SectionHeader'
import {
  DaisoBulkOrderIcon,
  DaisoDeliveryIcon,
  DaisoPickupIcon,
  DaisoTodayArrivalIcon,
} from '../../icons'
import DeliveryServiceCard from './DeliveryServiceCard'
import './HomeDeliverySection.scss'

const deliveryServices = [
  {
    id: 'delivery',
    eyebrow: '오늘 주문 내일 도착',
    title: '택배배송',
    description: ['배송비 3,000원', '3만원 이상 무료'],
    icon: DaisoDeliveryIcon,
  },
  {
    id: 'pickup',
    eyebrow: '원하는 다이소 매장에서',
    title: '매장픽업',
    description: ['픽업 수수료 200원'],
    icon: DaisoPickupIcon,
  },
  {
    id: 'today',
    eyebrow: '오늘 주문 오늘 도착',
    title: '오늘배송',
    description: ['오늘 주문 오늘 도착', '배송비 5,000원'],
    icon: DaisoTodayArrivalIcon,
  },
  {
    id: 'bulk',
    eyebrow: '크고 무거운 상품도 집 앞으로',
    title: '대량주문',
    description: ['소형 26,000원', '대형 38,000원'],
    icon: DaisoBulkOrderIcon,
  },
]

function HomeDeliverySection() {
  return (
    <section className="home-section">
      <SectionHeader title="다이소 배송" />
      <div className="delivery-service-grid">
        {deliveryServices.map((service) => (
          <DeliveryServiceCard key={service.id} service={service} />
        ))}
      </div>
    </section>
  )
}

export default HomeDeliverySection

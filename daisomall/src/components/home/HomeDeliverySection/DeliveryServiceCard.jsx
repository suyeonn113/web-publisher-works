import { getPublicAssetPath } from '../../../utils/getPublicAssetPath'

const deliveryServiceImages = {
  delivery: '/images/delivery/delivery.webp',
  pickup: '/images/delivery/pickup.webp',
  today: '/images/delivery/today.webp',
  bulk: '/images/delivery/bulk.webp',
}

const deliveryServiceIconSize = 'var(--delivery-service-card-icon-size)'

function DeliveryServiceCard({ service }) {
  const ServiceIcon = service.icon
  const backgroundImage = getPublicAssetPath(deliveryServiceImages[service.id])
  const descriptionLines = Array.isArray(service.description)
    ? service.description
    : [service.description]
  const iconColorProps = ['bulk', 'delivery'].includes(service.id)
    ? {
        primaryColor: 'var(--color-text-inverse)',
        secondaryColor: 'rgb(var(--color-white-rgb) / 0.7)',
      }
    : { style: { color: 'var(--color-text-inverse)' } }

  return (
    <button
      type="button"
      className={`delivery-service-card delivery-service-card--${service.id}`}
      aria-label={`${service.title} 준비 중`}
      style={{ '--delivery-service-image': `url(${backgroundImage})` }}
    >
      <div className="delivery-service-card__copy">
        <span className="delivery-service-card__eyebrow">{service.eyebrow}</span>
        <strong>{service.title}</strong>
        <p>
          {descriptionLines.map((line) => (
            <span key={line}>{line}</span>
          ))}
        </p>
      </div>
      <ServiceIcon
        {...iconColorProps}
        size={deliveryServiceIconSize}
        className="delivery-service-card__icon"
      />
    </button>
  )
}

export default DeliveryServiceCard

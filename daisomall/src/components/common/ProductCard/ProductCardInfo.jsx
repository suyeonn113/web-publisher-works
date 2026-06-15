import { formatPrice } from '../../../utils/formatPrice'
import StarIcon from '../../icons/StarIcon'
import ProductCardDeliveryBadges from './ProductCardDeliveryBadges'

function ProductCardInfo({ product }) {
  return (
    <div className="product-card__info">
      <strong>{formatPrice(product.price)}</strong>
      <p>{product.name}</p>
      <span className="product-card__rating">
        <StarIcon size={10} />
        {product.rating} ({product.reviewCount.toLocaleString()})
      </span>
      <ProductCardDeliveryBadges badges={product.badges} />
    </div>
  )
}

export default ProductCardInfo

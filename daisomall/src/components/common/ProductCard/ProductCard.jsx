import { Link } from 'react-router-dom'
import ProductCardImage from './ProductCardImage'
import ProductCardInfo from './ProductCardInfo'
import './ProductCard.scss'

function ProductCard({ product, rank }) {
  if (rank) {
    return (
      <Link to="#" className="product-card">
        <strong className="product-card__rank">{rank}</strong>
        <ProductCardImage product={product} showWish={false} />
        <ProductCardInfo product={product} />
      </Link>
    )
  }

  return (
    <article className="product-card">
      <ProductCardImage product={product} />
      <ProductCardInfo product={product} />
    </article>
  )
}

export default ProductCard

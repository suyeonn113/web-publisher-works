import ProductCardImage from './ProductCardImage'
import ProductCardInfo from './ProductCardInfo'
import './ProductCard.scss'

function ProductCard({ product, rank }) {
  const cardLabel = rank
    ? `${rank}위 ${product.name}, ${product.price.toLocaleString()}원`
    : `${product.name}, ${product.price.toLocaleString()}원`

  if (rank) {
    return (
      <article
        className="product-card"
        tabIndex="0"
        aria-label={cardLabel}
      >
        <strong className="product-card__rank">{rank}</strong>
        <ProductCardImage product={product} showWish={false} imageAlt="" />
        <ProductCardInfo product={product} />
      </article>
    )
  }

  return (
    <article className="product-card" tabIndex="0" aria-label={cardLabel}>
      <ProductCardImage product={product} imageAlt="" />
      <ProductCardInfo product={product} />
    </article>
  )
}

export default ProductCard

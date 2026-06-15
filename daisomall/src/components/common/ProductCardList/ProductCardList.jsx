import ProductCard from '../ProductCard/ProductCard'
import './ProductCardList.scss'

function ProductCardList({ products, ranked = false }) {
  return (
    <div className={ranked ? 'product-card-list is-ranked' : 'product-card-list'}>
      {products.map((product, index) => (
        <ProductCard
          key={product.id}
          product={product}
          rank={ranked ? product.rank ?? index + 1 : undefined}
        />
      ))}
    </div>
  )
}

export default ProductCardList

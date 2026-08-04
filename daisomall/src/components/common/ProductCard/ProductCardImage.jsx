import { useState } from 'react'
import HeartIcon from '../../icons/HeartIcon'
import { iconSize } from '../../../tokens/size'
import { getPublicAssetPath } from '../../../utils/getPublicAssetPath'
import ProductCardLabel from './ProductCardLabel'

function ProductCardImage({ product, showWish = true, imageAlt = product.name }) {
  const [isWished, setIsWished] = useState(false)

  return (
    <div className="product-card__image-wrap">
      <img src={getPublicAssetPath(product.image)} alt={imageAlt} className="product-card__image" />
      {product.label ? <ProductCardLabel label={product.label} /> : null}
      {showWish ? (
        <button
          type="button"
          className="product-card__wish"
          aria-label={`${product.name} ${isWished ? '찜 해제' : '찜하기'}`}
          aria-pressed={isWished}
          onClick={() => setIsWished((current) => !current)}
        >
          <HeartIcon
            outerColor="var(--color-white)"
            innerColor={isWished ? 'var(--color-primary)' : 'var(--color-black)'}
            outerOpacity={0.9}
            innerOpacity={isWished ? 1 : 0.1}
            size={iconSize.sm}
            focusable="false"
          />
        </button>
      ) : null}
    </div>
  )
}

export default ProductCardImage

import { useEffect, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import PlusIcon from '../../icons/PlusIcon'
import { iconSize } from '../../../tokens/size'
import { useProducts } from '../../../hooks/useProducts'
import { formatPrice } from '../../../utils/formatPrice'
import { getPublicAssetPath } from '../../../utils/getPublicAssetPath'

function NewArrivalVideoCard({ content }) {
  const {products} = useProducts();
  const [isProductsOpen, setIsProductsOpen] = useState(false)
  const videoRef = useRef(null)

  const relatedProducts = useMemo(()=>{
    if(!products) return [];
    return products.filter((products)=>content.relatedProductIds.includes(products.id))
  },[products, content.relatedProductIds]);

  useEffect(() => {
    const video = videoRef.current
    if (!video) return undefined

    const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    let isVisible = false

    const updatePlayback = () => {
      if (isVisible && !reducedMotionQuery.matches) {
        video.play().catch(() => {})
        return
      }

      video.pause()
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting && entry.intersectionRatio >= 0.5
        updatePlayback()
      },
      { threshold: [0, 0.5] },
    )

    observer.observe(video)
    reducedMotionQuery.addEventListener('change', updatePlayback)

    return () => {
      observer.disconnect()
      reducedMotionQuery.removeEventListener('change', updatePlayback)
      video.pause()
    }
  }, [])

  return (
    <article className="new-arrival-card">
      <div className="new-arrival-card__media">
        <video
          ref={videoRef}
          src={getPublicAssetPath(content.image)}
          preload="none"
          loop
          muted
          playsInline
        />
        {/*<img src={getPublicAssetPath(content.image)} alt="" />*/}
        {relatedProducts.length ? (
          <button
            type="button"
            className="new-arrival-card__product-toggle"
            aria-label={`${content.title} 관련 상품 ${isProductsOpen ? '접기' : '펼치기'}`}
            aria-expanded={isProductsOpen}
            onClick={() => setIsProductsOpen((current) => !current)}
          >
            <PlusIcon size={iconSize.md} focusable="false" />
          </button>
        ) : null}
        <div className="new-arrival-card__copy">
          {content.subtitle ? <span>{content.subtitle}</span> : null}
          <strong>{content.title}</strong>
        </div>
        {isProductsOpen ? (
          <div className="new-arrival-card__products" aria-label="관련상품">
            <div className="new-arrival-card__product-list">
              {relatedProducts.map((product) => (
                <Link
                  key={product.id}
                  to={`/products/${product.id}`}
                  className="new-arrival-card__product"
                >
                  <img src={getPublicAssetPath(product.image)} alt="" />
                  <span>
                    <strong>{formatPrice(product.price)}</strong>
                    <em>{product.name}</em>
                  </span>
                </Link>
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </article>
  )
}

export default NewArrivalVideoCard

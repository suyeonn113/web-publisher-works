import { getPublicAssetPath } from '../../../utils/getPublicAssetPath'

function PromotionBannerCard({ promotion }) {
  return (
    <article className="promotion-banner-card">
      <img src={getPublicAssetPath(promotion.image)} alt="" />
      <strong>{promotion.title}</strong>
    </article>
  )
}

export default PromotionBannerCard

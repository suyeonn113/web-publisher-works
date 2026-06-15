import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { iconSize } from '../../../tokens/size'
import { getPublicAssetPath } from '../../../utils/getPublicAssetPath'
import ScrollNavigator from '../../common/ScrollNavigator/ScrollNavigator'
import ArrowIcon from '../../icons/ArrowIcon'

function PromotionCardList({ promotions, variant }) {
  const [activePromotionIndex, setActivePromotionIndex] = useState(0)
  const isCategoryVariant = variant === 'horizontal'

  useEffect(() => {
    setActivePromotionIndex(0)
  }, [promotions])

  return (
    <ScrollNavigator
      targetSelector=".promotion-card-list"
      previousLabel="이전 기획전 보기"
      nextLabel="다음 기획전 보기"
    >
      <div className={`promotion-card-list is-${variant} active-index-${activePromotionIndex}`}>
        {promotions.map((promotion, index) => {
          const isActive = index === activePromotionIndex

          return (
            <Link
              key={`${promotion.id}-${index}`}
              to="#"
              className={isActive ? 'promotion-card is-active' : 'promotion-card'}
              onClick={(event) => {
                event.preventDefault()

                if (isActive) return

                setActivePromotionIndex(index)
              }}
            >
              {!isCategoryVariant && promotion.ranking && (
                <div className="promotion-card__ranking">
                  <span className="promotion-card__rank">{promotion.ranking.rank}</span>
                  <span className={`promotion-card__rank-change is-${promotion.ranking.direction}`}>
                    {promotion.ranking.direction === 'up' && '▲'}
                    {promotion.ranking.direction === 'down' && '▼'}
                    {promotion.ranking.direction === 'same' && '-'}
                    {promotion.ranking.direction === 'new' && 'N'}

                    {promotion.ranking.direction !== 'new' && promotion.ranking.change}
                  </span>
                </div>
              )}
              <div className="promotion-card__media">
                <img src={getPublicAssetPath(promotion.image)} alt="" />
                <strong>
                  <span className="promotion-card__title-text">
                    <span className="promotion-card__title-full">{promotion.title}</span>

                    {promotion.shortTitle && (
                      <span className="promotion-card__title-short">{promotion.shortTitle}</span>
                    )}
                  </span>

                  {isCategoryVariant && (
                    <ArrowIcon
                      size={iconSize.sm}
                      className="promotion-card__title-icon"
                      aria-hidden="true"
                    />
                  )}
                </strong>

                {!isCategoryVariant && (
                  <ArrowIcon
                    size={iconSize.sm}
                    className="promotion-card__corner-icon"
                    aria-hidden="true"
                  />
                )}
              </div>
            </Link>
          )
        })}
      </div>
    </ScrollNavigator>
  )
}

export default PromotionCardList

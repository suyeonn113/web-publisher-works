import { Link } from 'react-router-dom'

function PromotionAccordionList({ promotions }) {
  return (
    <div className="promotion-accordion-list">
      {promotions.map((promotion) => (
        <Link key={promotion.id} to={`/promotion/${promotion.id}`}>
          <span>{promotion.title}</span>
          <span aria-hidden="true">›</span>
        </Link>
      ))}
    </div>
  )
}

export default PromotionAccordionList

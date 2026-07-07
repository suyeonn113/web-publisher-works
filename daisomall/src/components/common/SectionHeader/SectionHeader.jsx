import { ArrowIcon } from '../../icons'
import { iconSize } from '../../../tokens/size'
import './SectionHeader.scss'

function SectionHeader({ title, moreLabel = '더보기' }) {
  return (
    <div className="section-header">
      <h2>{title}</h2>
      <button type="button" aria-label={`${title} ${moreLabel} 준비 중`}>
        {moreLabel}
        <ArrowIcon size={iconSize.xxs} className="section-header__more-icon" aria-hidden="true" />
      </button>
    </div>
  )
}

export default SectionHeader

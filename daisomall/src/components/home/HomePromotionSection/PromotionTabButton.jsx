import { iconSize } from '../../../tokens/size'

function PromotionTabButton({ label, icon: Icon, isActive, onClick }) {
  return (
    <button
      type="button"
      className={isActive ? 'promotion-tab-button is-active' : 'promotion-tab-button'}
      onClick={onClick}
    >
      {Icon ? <Icon size={iconSize.md} className="promotion-tab-button__icon" /> : null}
      {label}
    </button>
  )
}

export default PromotionTabButton

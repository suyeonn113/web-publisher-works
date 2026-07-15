import { iconSize } from '../../../tokens/size'

function PromotionTabButton({ label, icon: Icon, isActive, onClick, ...buttonProps }) {
  return (
    <button
      type="button"
      className={isActive ? 'promotion-tab-button is-active' : 'promotion-tab-button'}
      onClick={onClick}
      {...buttonProps}
    >
      {Icon ? <Icon size={iconSize.md} className="promotion-tab-button__icon" /> : null}
      {label}
    </button>
  )
}

export default PromotionTabButton

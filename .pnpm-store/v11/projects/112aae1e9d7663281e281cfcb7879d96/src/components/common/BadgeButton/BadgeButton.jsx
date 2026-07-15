import './BadgeButton.scss'

function BadgeButton({ children, isActive = false, onClick, ...buttonProps }) {
  return (
    <button
      type="button"
      className={isActive ? 'badge-button is-active' : 'badge-button'}
      onClick={onClick}
      {...buttonProps}
    >
      {children}
    </button>
  )
}

export default BadgeButton

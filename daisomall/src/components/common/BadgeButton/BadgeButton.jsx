import './BadgeButton.scss'

function BadgeButton({ children, isActive = false, onClick }) {
  return (
    <button
      type="button"
      className={isActive ? 'badge-button is-active' : 'badge-button'}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

export default BadgeButton

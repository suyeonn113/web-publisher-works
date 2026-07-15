import { Link } from 'react-router-dom'

function BottomTabBarItem({ icon, label, to, onClick }) {
  const handleLinkClick = (event) => {
    window.scrollTo(0, 0)
  }

  const content = (
    <>
      {icon}
      <span>{label}</span>
    </>
  )

  if (to) {
    return (
      <Link
        className="bottom-tab-bar__item"
        to={to}
        onClick={handleLinkClick}
      >
        {content}
      </Link>
    )
  }

  const isDisabled = !onClick

  return (
    <button
      type="button"
      className="bottom-tab-bar__item"
      onClick={onClick}
      disabled={isDisabled}
      aria-label={isDisabled ? `${label} 준비 중` : undefined}
    >
      {content}
    </button>
  )
}

export default BottomTabBarItem

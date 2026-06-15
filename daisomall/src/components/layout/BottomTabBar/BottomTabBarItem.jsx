import { Link } from 'react-router-dom'

function BottomTabBarItem({ icon, label, to, onClick }) {
  const handleLinkClick = (event) => {
    if (to === '#') {
      event.preventDefault()
      return
    }

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

  return (
    <button type="button" className="bottom-tab-bar__item" onClick={onClick}>
      {content}
    </button>
  )
}

export default BottomTabBarItem

function HeaderNotificationButton({ icon }) {
  return (
    <button type="button" className="site-header__icon-button" aria-label="알림">
      {icon}
    </button>
  )
}

export default HeaderNotificationButton

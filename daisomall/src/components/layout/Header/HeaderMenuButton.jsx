function HeaderMenuButton({ icon, onClick }) {
  return (
    <button
      type="button"
      className="site-header__icon-button"
      aria-label="카테고리 열기"
      onClick={onClick}
    >
      {icon}
    </button>
  )
}

export default HeaderMenuButton

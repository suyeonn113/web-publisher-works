export default function HeaderMobileNavItem({
  isActive,
  item,
  onSelect,
}) {
  return (
    <li className="site-header__mobile-nav-item">
      <button
        className="site-header__mobile-nav-button"
        type="button"
        aria-pressed={isActive}
        onClick={onSelect}
      >
        {item.label}
      </button>
    </li>
  );
}

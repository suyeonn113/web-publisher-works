import { Link, NavLink } from 'react-router-dom'
import { featureShortcuts } from '../../../data/featureShortcuts'
import { mainCategories } from '../../../data/mainCategories'
import {
  CategoryIcon,
  DaisoBulkOrderIcon,
  DaisoPickupIcon,
  DaisoTodayArrivalIcon,
} from '../../icons'
import { iconSize } from '../../../tokens/size'
import MainCategoryNavItem from './MainCategoryNavItem'
import './MainCategoryNav.scss'

const desktopShortcutLinks = featureShortcuts.filter((shortcut) => shortcut.id !== 'new-club')

const desktopDeliveryLinks = [
  { id: 'pickup', label: '매장픽업', path: '#', Icon: DaisoPickupIcon },
  { id: 'today', label: '오늘배송', path: '#', Icon: DaisoTodayArrivalIcon },
  { id: 'bulk', label: '대량주문', path: '#', Icon: DaisoBulkOrderIcon },
]

function PlaceholderNavLink({ to, className, children }) {
  const handlePlaceholderClick = (event) => {
    event.preventDefault()
    window.scrollTo(0, 0)
  }

  if (to === '#') {
    return (
      <Link to="#" className={className} onClick={handlePlaceholderClick}>
        {children}
      </Link>
    )
  }

  return (
    <NavLink
      to={to}
      className={({ isActive }) => `${className}${isActive ? ' is-active' : ''}`}
    >
      {children}
    </NavLink>
  )
}

function MainCategoryNav({ onCategoryClick }) {
  return (
    <nav className="main-category-nav" aria-label="주요 카테고리">
      <button
        type="button"
        className="main-category-nav__link main-category-nav__link--category-action"
        onClick={onCategoryClick}
      >
        <CategoryIcon size={iconSize.sm} />
        <MainCategoryNavItem label="카테고리" />
      </button>
      {mainCategories.map((category) => (
        <PlaceholderNavLink
          key={category.id}
          to={category.path}
          className={`main-category-nav__link main-category-nav__link--${category.id}`}
        >
          <MainCategoryNavItem label={category.label} />
        </PlaceholderNavLink>
      ))}
      {desktopShortcutLinks.map((shortcut) => (
        <PlaceholderNavLink
          key={shortcut.id}
          to={shortcut.path}
          className="main-category-nav__link main-category-nav__link--desktop-shortcut"
        >
          <MainCategoryNavItem label={shortcut.label} />
        </PlaceholderNavLink>
      ))}
      <div className="main-category-nav__delivery-links">
        {desktopDeliveryLinks.map(({ id, label, path, Icon }) => (
          <PlaceholderNavLink
            key={id}
            to={path}
            className={`main-category-nav__link main-category-nav__link--delivery-service main-category-nav__link--delivery-service-${id}`}
          >
            <Icon size={iconSize.sm} />
            <MainCategoryNavItem label={label} />
          </PlaceholderNavLink>
        ))}
      </div>
    </nav>
  )
}

export default MainCategoryNav

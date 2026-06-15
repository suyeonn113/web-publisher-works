import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import BagIcon from '../../icons/BagIcon'
import NotificationIcon from '../../icons/NotificationIcon'
import SearchIcon from '../../icons/SearchIcon'
import UserIcon from '../../icons/UserIcon'
import { iconSize } from '../../../tokens/size'
import MainCategoryNav from '../MainCategoryNav/MainCategoryNav'
import HeaderLogo from './HeaderLogo'
import HeaderStoreButton from './HeaderStoreButton'
import HeaderSearchButton from './HeaderSearchButton'
import HeaderNotificationButton from './HeaderNotificationButton'
import './Header.scss'

function Header({ onMenuClick }) {
  const [isBarHidden, setIsBarHidden] = useState(false)
  const lastScrollYRef = useRef(0)

  useEffect(() => {
    const scrollGap = 4
    const hideOffset = 64

    function handleScroll() {
      const currentScrollY = window.scrollY
      const scrollDiff = currentScrollY - lastScrollYRef.current

      if (Math.abs(scrollDiff) < scrollGap) {
        return
      }

      setIsBarHidden(scrollDiff > 0 && currentScrollY > hideOffset)
      lastScrollYRef.current = currentScrollY
    }

    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <header className={`site-header${isBarHidden ? ' is-bar-hidden' : ''}`}>
      <div className="site-header__content">
        <div className="site-header__bar">
          <HeaderLogo />
          <HeaderStoreButton />
          <div className="site-header__actions">
            <HeaderSearchButton icon={<SearchIcon size={iconSize.sm} />} />
            <span className="site-header__notification">
              <HeaderNotificationButton icon={<NotificationIcon size={iconSize.sm} />} />
            </span>
            <Link
              className="site-header__icon-button site-header__desktop-action"
              to="/search"
              aria-label="마이"
            >
              <UserIcon size={iconSize.sm} />
            </Link>
            <Link
              className="site-header__icon-button site-header__desktop-action"
              to="/category/cart"
              aria-label="장바구니"
            >
              <BagIcon size={iconSize.sm} />
            </Link>
          </div>
        </div>
        <div className="main-category-nav-shell">
          <MainCategoryNav onCategoryClick={onMenuClick} /> 
        </div>
      </div>
    </header>
  )
}

export default Header

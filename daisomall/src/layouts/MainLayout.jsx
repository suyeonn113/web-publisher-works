import { useEffect, useRef, useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Header from '../components/layout/Header/Header'
import { PATHS } from '../routes/paths'
import CategoryDrawer from '../components/layout/CategoryDrawer/CategoryDrawer'
import Footer from '../components/layout/Footer/Footer'
import FloatingActionButtons from '../components/layout/FloatingActionButtons/FloatingActionButtons'
import BottomTabBar from '../components/layout/BottomTabBar/BottomTabBar'
import './MainLayout.scss'

function MainLayout() {
  const [isCategoryDrawerOpen, setIsCategoryDrawerOpen] = useState(false)
  const categoryDrawerTriggerRef = useRef(null)
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  const handleCategoryDrawerClose = () => {
    setIsCategoryDrawerOpen(false)
    window.requestAnimationFrame(() => {
      categoryDrawerTriggerRef.current?.focus()
    })
  }

  const handleCategoryDrawerToggle = (event) => {
    if (isCategoryDrawerOpen) {
      handleCategoryDrawerClose()
      return
    }

    categoryDrawerTriggerRef.current = event.currentTarget
    setIsCategoryDrawerOpen(true)
  }

  return (
    <div className={`app-shell ${pathname === PATHS.search ? 'is-search-route' : ''}`}>
      <nav className="skip-links" aria-label="건너뛰기 링크">
        <a href="#main-content">본문 바로가기</a>
        <a href="#primary-navigation">주요 메뉴 바로가기</a>
      </nav>
      <Header onMenuClick={handleCategoryDrawerToggle} />
      <CategoryDrawer
        isOpen={isCategoryDrawerOpen}
        onClose={handleCategoryDrawerClose}
      />
      <main id="main-content" className="app-shell__main" tabIndex="-1">
        <Outlet />
      </main>
      <Footer />
      <FloatingActionButtons />
      <BottomTabBar onCategoryClick={handleCategoryDrawerToggle} />
    </div>
  )
}

export default MainLayout

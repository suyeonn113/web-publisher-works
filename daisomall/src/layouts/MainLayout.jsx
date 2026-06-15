import { useEffect, useState } from 'react'
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
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  const handleCategoryDrawerToggle = () => {
    setIsCategoryDrawerOpen((isOpen) => !isOpen)
  }

  return (
    <div className={`app-shell ${pathname === PATHS.search ? 'is-search-route' : ''}`}>
      <Header onMenuClick={handleCategoryDrawerToggle} />
      <CategoryDrawer
        isOpen={isCategoryDrawerOpen}
        onClose={() => setIsCategoryDrawerOpen(false)}
      />
      <main className="app-shell__main">
        <Outlet />
      </main>
      <Footer />
      <FloatingActionButtons />
      <BottomTabBar onCategoryClick={handleCategoryDrawerToggle} />
    </div>
  )
}

export default MainLayout

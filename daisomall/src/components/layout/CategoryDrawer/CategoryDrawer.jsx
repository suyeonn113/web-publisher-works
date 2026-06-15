import { useEffect, useMemo, useRef, useState } from 'react'
import { categoryDrawerData } from '../../../data/categoryDrawerData'
import CategoryDrawerHeader from './CategoryDrawerHeader'
import CategoryDrawerMenu from './CategoryDrawerMenu'
import CategoryDrawerSidebar from './CategoryDrawerSidebar'
import CategoryDrawerPanel from './CategoryDrawerPanel'
import './CategoryDrawer.scss'

function CategoryDrawer({ isOpen, onClose }) {
  const [activeMainTab, setActiveMainTab] = useState(categoryDrawerData.mainTabs[0]?.id)
  const [activeMenu, setActiveMenu] = useState(categoryDrawerData.menuTabs[0]?.id)
  const [activeCategoryIndex, setActiveCategoryIndex] = useState(0)
  const scrollContainerRef = useRef(null)
  const sectionRefs = useRef([])
  const isAutoScrollingRef = useRef(false)

  const drawerSections = useMemo(() => {
    const fallbackSections = categoryDrawerData.panels['daily-special'] ?? []

    return categoryDrawerData.mainCategories.flatMap((category, categoryIndex) => {
      const sections =
        category.id === 'daily-special'
          ? fallbackSections.filter(
              (section) => section.title === '최근 본' || section.title === category.label,
            )
          : categoryDrawerData.panels[category.id] ??
            fallbackSections.filter((section) => section.title === category.label)

      const categorySections =
        sections.length > 0
          ? sections
          : [
              {
                title: category.label,
                items: [],
              },
            ]

      return categorySections.map((section) => ({
        ...section,
        categoryIndex,
      }))
    })
  }, [])

  useEffect(() => {
    if (!isOpen) {
      return undefined
    }

    if (!window.matchMedia('(max-width: 767px)').matches) {
      return undefined
    }

    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      document.body.style.overflow = originalOverflow
    }
  }, [isOpen])

  useEffect(() => {
    if (!isOpen) {
      return undefined
    }

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, onClose])

  if (!isOpen) {
    return null
  }

  const handleSectionRef = (index, node) => {
    sectionRefs.current[index] = node
  }

  const handleSidebarChange = (categoryIndex) => {
    const sectionIndex = drawerSections.findIndex(
      (section) => section.categoryIndex === categoryIndex,
    )
    const scrollContainer = scrollContainerRef.current
    const targetSection = sectionRefs.current[sectionIndex]
    const targetTop =
      scrollContainer && targetSection
        ? targetSection.getBoundingClientRect().top -
          scrollContainer.getBoundingClientRect().top +
          scrollContainer.scrollTop -
          20
        : 0

    isAutoScrollingRef.current = true
    setActiveCategoryIndex(categoryIndex)
    scrollContainer?.scrollTo({
      top: targetTop,
      behavior: 'smooth',
    })

    window.setTimeout(() => {
      isAutoScrollingRef.current = false
    }, 450)
  }

  const handlePanelScroll = () => {
    if (isAutoScrollingRef.current) {
      return
    }

    const scrollContainer = scrollContainerRef.current

    if (!scrollContainer) {
      return
    }

    const containerTop = scrollContainer.getBoundingClientRect().top
    const activeLine = containerTop + 32
    const activeSection = sectionRefs.current.reduce((currentSection, section, index) => {
      if (!section || section.getBoundingClientRect().top > activeLine) {
        return currentSection
      }

      return drawerSections[index]
    }, drawerSections[0])

    if (activeSection && activeSection.categoryIndex !== activeCategoryIndex) {
      setActiveCategoryIndex(activeSection.categoryIndex)
    }
  }

  return (
    <div className="category-drawer" role="dialog" aria-modal="true">
      <button
        type="button"
        className="category-drawer__dim"
        aria-label="카테고리 닫기"
        onClick={onClose}
      />
      <section className="category-drawer__panel">
        <CategoryDrawerHeader
          activeMainTab={activeMainTab}
          mainTabs={categoryDrawerData.mainTabs}
          onChange={setActiveMainTab}
          onClose={onClose}
        />
        <CategoryDrawerMenu
          activeMenu={activeMenu}
          menuItems={categoryDrawerData.menuTabs}
          quickMenus={categoryDrawerData.quickMenus}
          onChange={setActiveMenu}
        />
        <div className="category-drawer__content">
          <CategoryDrawerSidebar
            activeCategoryIndex={activeCategoryIndex}
            categories={categoryDrawerData.mainCategories}
            onChange={handleSidebarChange}
          />
          <CategoryDrawerPanel
            sections={drawerSections}
            scrollContainerRef={scrollContainerRef}
            onScroll={handlePanelScroll}
            onSectionRef={handleSectionRef}
          />
        </div>
      </section>
    </div>
  )
}

export default CategoryDrawer

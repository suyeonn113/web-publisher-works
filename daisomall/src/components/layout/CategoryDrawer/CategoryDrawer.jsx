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
  const drawerRef = useRef(null)
  const sectionRefs = useRef([])
  const panelRefs = useRef([])
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

  const panelIdByCategoryIndex = useMemo(
    () =>
      categoryDrawerData.mainCategories.map(
        (_, categoryIndex) => `category-drawer-panel-${categoryIndex}`,
      ),
    [],
  )

  const categoryButtonIdByCategoryIndex = useMemo(
    () =>
      categoryDrawerData.mainCategories.map(
        (_, categoryIndex) => `category-drawer-category-${categoryIndex}`,
      ),
    [],
  )

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

    const drawer = drawerRef.current
    const focusableSelector = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
    const getFocusableElements = () =>
      Array.from(drawer?.querySelectorAll(focusableSelector) ?? []).filter(
        (element) => element.tabIndex >= 0 && element.getClientRects().length > 0,
      )
    const focusFrameId = window.requestAnimationFrame(() => {
      drawer?.querySelector('.category-drawer__close')?.focus()
    })

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        onClose()
        return
      }

      if (event.key !== 'Tab') {
        return
      }

      const focusableElements = getFocusableElements()
      const firstFocusableElement = focusableElements[0]
      const lastFocusableElement = focusableElements[focusableElements.length - 1]

      if (!firstFocusableElement || !lastFocusableElement) {
        return
      }

      if (event.shiftKey && document.activeElement === firstFocusableElement) {
        event.preventDefault()
        lastFocusableElement.focus()
        return
      }

      if (!event.shiftKey && document.activeElement === lastFocusableElement) {
        event.preventDefault()
        firstFocusableElement.focus()
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.cancelAnimationFrame(focusFrameId)
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, onClose])

  if (!isOpen) {
    return null
  }

  const handleSectionRef = (index, node) => {
    sectionRefs.current[index] = node
  }

  const handlePanelRef = (categoryIndex, node) => {
    panelRefs.current[categoryIndex] = node
  }

  const handleSidebarChange = (categoryIndex, options = {}) => {
    const { focusSection = true } = options
    const sectionIndex = drawerSections.findIndex(
      (section) => section.categoryIndex === categoryIndex,
    )
    const scrollContainer = scrollContainerRef.current
    const targetSection = sectionRefs.current[sectionIndex]
    const targetPanel = panelRefs.current[categoryIndex]
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

    if (focusSection) {
      window.setTimeout(() => {
        const firstSubCategoryLink = targetPanel?.querySelector('a')
        const focusTarget = firstSubCategoryLink ?? targetPanel

        focusTarget?.focus({ preventScroll: true })
      }, 120)
    }

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
    <div ref={drawerRef} className="category-drawer" role="dialog" aria-modal="true">
      <button
        type="button"
        className="category-drawer__dim"
        aria-label="카테고리 닫기"
        tabIndex="-1"
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
            panelIdByCategoryIndex={panelIdByCategoryIndex}
            categoryButtonIdByCategoryIndex={categoryButtonIdByCategoryIndex}
            onChange={handleSidebarChange}
          />
          <CategoryDrawerPanel
            sections={drawerSections}
            panelIdByCategoryIndex={panelIdByCategoryIndex}
            categoryButtonIdByCategoryIndex={categoryButtonIdByCategoryIndex}
            scrollContainerRef={scrollContainerRef}
            onScroll={handlePanelScroll}
            onPanelRef={handlePanelRef}
            onSectionRef={handleSectionRef}
          />
        </div>
      </section>
    </div>
  )
}

export default CategoryDrawer

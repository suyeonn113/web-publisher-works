import { Link } from 'react-router-dom'
import { getPublicAssetPath } from '../../../utils/getPublicAssetPath'

function CategoryDrawerPanel({
  sections,
  panelIdByCategoryIndex,
  categoryButtonIdByCategoryIndex,
  scrollContainerRef,
  onScroll,
  onPanelRef,
  onSectionRef,
}) {
  if (sections.length === 0) {
    return (
      <div className="category-drawer__section-list" ref={scrollContainerRef} onScroll={onScroll}>
        <p className="category-drawer__empty">등록된 카테고리가 없습니다.</p>
      </div>
    )
  }

  const categoryPanels = sections.reduce((groups, section, index) => {
    const existingGroup = groups.find((group) => group.categoryIndex === section.categoryIndex)
    const sectionWithIndex = { ...section, originalIndex: index }

    if (existingGroup) {
      existingGroup.sections.push(sectionWithIndex)
      return groups
    }

    return [
      ...groups,
      {
        categoryIndex: section.categoryIndex,
        sections: [sectionWithIndex],
      },
    ]
  }, [])

  const focusCategoryButton = (categoryIndex) => {
    document
      .getElementById(categoryButtonIdByCategoryIndex[categoryIndex])
      ?.focus()
  }

  const handleSubCategoryKeyDown = (event, categoryIndex) => {
    const panel = event.currentTarget
    const links = Array.from(panel.querySelectorAll('a'))
    const currentIndex = links.indexOf(event.target)

    if (currentIndex < 0) return

    if (event.key === 'Tab' && event.shiftKey && currentIndex === 0) {
      event.preventDefault()
      focusCategoryButton(categoryIndex)
      return
    }

    const keyDirections = {
      ArrowRight: 1,
      ArrowDown: 1,
      ArrowLeft: -1,
      ArrowUp: -1,
    }
    const direction = keyDirections[event.key]

    if (!direction) return

    event.preventDefault()

    if (currentIndex === 0 && direction < 0) {
      focusCategoryButton(categoryIndex)
      return
    }

    const nextIndex = currentIndex + direction

    if (nextIndex >= 0 && nextIndex < links.length) {
      links[nextIndex].focus()
    }
  }

  return (
    <div className="category-drawer__section-list" ref={scrollContainerRef} onScroll={onScroll}>
      {categoryPanels.map((panel) => (
        <div
          key={panel.categoryIndex}
          id={panelIdByCategoryIndex[panel.categoryIndex]}
          className="category-drawer__section-group"
          role="region"
          aria-labelledby={categoryButtonIdByCategoryIndex[panel.categoryIndex]}
          ref={(node) => onPanelRef(panel.categoryIndex, node)}
          tabIndex="-1"
          onKeyDown={(event) => handleSubCategoryKeyDown(event, panel.categoryIndex)}
        >
          {panel.sections.map((section) => (
            <section
              key={`${section.categoryIndex}-${section.title}`}
              className="category-drawer__section"
              ref={(node) => onSectionRef(section.originalIndex, node)}
            >
              <h2>{section.title}</h2>
              <div className="category-drawer__links">
                {section.items.map((item) => (
                  <Link key={`${item.id}-${item.label}`} to={`/category/${item.id}`}>
                    {item.image && <img src={getPublicAssetPath(item.image)} alt="" />}
                    <span>{item.label}</span>
                  </Link>
                ))}
              </div>
            </section>
          ))}
        </div>
      ))}
    </div>
  )
}

export default CategoryDrawerPanel

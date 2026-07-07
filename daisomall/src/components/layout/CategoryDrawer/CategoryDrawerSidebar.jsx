import { useRef } from 'react'

function CategoryDrawerSidebar({
  activeCategoryIndex,
  categories,
  panelIdByCategoryIndex,
  categoryButtonIdByCategoryIndex,
  onChange,
}) {
  const buttonRefs = useRef([])

  const moveFocus = (nextIndex) => {
    onChange(nextIndex, { focusSection: false })
    window.requestAnimationFrame(() => {
      buttonRefs.current[nextIndex]?.focus()
    })
  }

  const handleKeyDown = (event, index) => {
    if (event.key === 'ArrowDown') {
      event.preventDefault()
      moveFocus((index + 1) % categories.length)
      return
    }

    if (event.key === 'ArrowUp') {
      event.preventDefault()
      moveFocus((index - 1 + categories.length) % categories.length)
      return
    }

    if (event.key === 'Home') {
      event.preventDefault()
      moveFocus(0)
      return
    }

    if (event.key === 'End') {
      event.preventDefault()
      moveFocus(categories.length - 1)
      return
    }
  }

  return (
    <nav className="category-drawer__sidebar" aria-label="카테고리 대분류">
      {categories.map((category, index) => (
        <button
          key={`${category.id}-${index}`}
          ref={(node) => {
            buttonRefs.current[index] = node
          }}
          type="button"
          id={categoryButtonIdByCategoryIndex[index]}
          className={index === activeCategoryIndex ? 'is-active' : ''}
          aria-current={index === activeCategoryIndex ? 'true' : undefined}
          aria-controls={panelIdByCategoryIndex[index]}
          tabIndex={index === activeCategoryIndex ? 0 : -1}
          onClick={() => onChange(index, { focusSection: true })}
          onKeyDown={(event) => handleKeyDown(event, index)}
        >
          {category.label}
        </button>
      ))}
    </nav>
  )
}

export default CategoryDrawerSidebar

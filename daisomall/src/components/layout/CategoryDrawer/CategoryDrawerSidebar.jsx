function CategoryDrawerSidebar({ activeCategoryIndex, categories, onChange }) {
  return (
    <aside className="category-drawer__sidebar">
      {categories.map((category, index) => (
        <button
          key={`${category.id}-${index}`}
          type="button"
          className={index === activeCategoryIndex ? 'is-active' : ''}
          onClick={() => onChange(index)}
        >
          {category.label}
        </button>
      ))}
    </aside>
  )
}

export default CategoryDrawerSidebar

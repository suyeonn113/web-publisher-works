import CategoryMenuButton from './CategoryMenuButton'

function CategoryMenuGrid({ categories }) {
  return (
    <div className="category-menu-grid">
      {categories.map((category) => (
        <CategoryMenuButton key={category.id} category={category} />
      ))}
    </div>
  )
}

export default CategoryMenuGrid

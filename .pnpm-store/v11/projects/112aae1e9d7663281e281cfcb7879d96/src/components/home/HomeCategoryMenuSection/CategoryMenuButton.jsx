import { getPublicAssetPath } from '../../../utils/getPublicAssetPath'

function CategoryMenuButton({ category }) {
  return (
    <button
      type="button"
      className="category-menu-button"
      aria-label={`${category.label} 카테고리 준비 중`}
    >
      <img src={getPublicAssetPath(category.image)} alt="" aria-hidden="true" />
      <span>{category.label}</span>
    </button>
  )
}

export default CategoryMenuButton

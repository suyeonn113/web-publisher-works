import { Link } from 'react-router-dom'
import { getPublicAssetPath } from '../../../utils/getPublicAssetPath'

function CategoryMenuButton({ category }) {
  return (
    <Link className="category-menu-button" to="#">
      <img src={getPublicAssetPath(category.image)} alt="" />
      <span>{category.label}</span>
    </Link>
  )
}

export default CategoryMenuButton

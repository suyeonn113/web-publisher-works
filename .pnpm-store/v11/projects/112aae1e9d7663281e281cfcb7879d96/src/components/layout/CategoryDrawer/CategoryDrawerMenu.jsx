import { Link } from 'react-router-dom'
import { getPublicAssetPath } from '../../../utils/getPublicAssetPath'

function CategoryDrawerMenu({ activeMenu, menuItems, quickMenus, onChange }) {
  return (
    <div className="category-drawer__menu">
      <div className="category-drawer__menu-tabs">
        {menuItems.map((item) => (
          <button
            key={item.id}
            type="button"
            className={item.id === activeMenu ? 'is-active' : ''}
            onClick={() => onChange(item.id)}
          >
            {item.label}
          </button>
        ))}
      </div>
      <div className="category-drawer__quick-menu">
        {quickMenus.map((item) => (
          <Link key={item.id} to={`/category/${item.id}`}>
            <img src={getPublicAssetPath(item.image)} alt="" />
            <span>{item.label}</span>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default CategoryDrawerMenu

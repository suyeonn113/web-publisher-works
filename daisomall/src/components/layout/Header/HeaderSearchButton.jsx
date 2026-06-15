import { Link } from 'react-router-dom'
import { PATHS } from '../../../routes/paths'

function HeaderSearchButton({ icon }) {
  return (
    <Link className="site-header__icon-button" to={PATHS.search} aria-label="검색">
      {icon}
    </Link>
  )
}

export default HeaderSearchButton

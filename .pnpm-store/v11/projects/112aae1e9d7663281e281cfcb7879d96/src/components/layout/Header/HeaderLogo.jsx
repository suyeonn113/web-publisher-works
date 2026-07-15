import { useLocation } from 'react-router-dom'
import Logo from '../../common/Logo'
import { PATHS } from '../../../routes/paths'

function HeaderLogo() {
  const { pathname } = useLocation()
  const isActive = pathname !== PATHS.store

  return <Logo className={`site-header__logo${isActive ? ' is-active' : ''}`} />
}

export default HeaderLogo

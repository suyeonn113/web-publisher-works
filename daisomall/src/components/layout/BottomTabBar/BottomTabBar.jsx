import BagIcon from '../../icons/BagIcon'
import CategoryIcon from '../../icons/CategoryIcon'
import HomeIcon from '../../icons/HomeIcon'
import ShortsIcon from '../../icons/ShortsIcon'
import UserIcon from '../../icons/UserIcon'
import { iconSize } from '../../../tokens/size'
import BottomTabBarItem from './BottomTabBarItem'
import './BottomTabBar.scss'

function BottomTabBar({ onCategoryClick }) {
  return (
    <nav className="bottom-tab-bar" aria-label="하단 메뉴">
      <BottomTabBarItem icon={<HomeIcon size={iconSize.md} />} label="홈" to="/" />
      <BottomTabBarItem
        icon={<CategoryIcon size={iconSize.md} />}
        label="카테고리"
        onClick={onCategoryClick}
      />
      <BottomTabBarItem
        icon={<ShortsIcon size={iconSize.md} />}
        label="발견"
        to="#"
      />
      <BottomTabBarItem icon={<UserIcon size={iconSize.md} />} label="마이" to="#" />
      <BottomTabBarItem
        icon={<BagIcon size={iconSize.md} />}
        label="장바구니"
        to="#"
      />
    </nav>
  )
}

export default BottomTabBar

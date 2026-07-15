import { iconSize } from '../../../tokens/size';
import HeaderLanguageMenu from './HeaderLanguageMenu';
import HeaderMobileNavItem from './HeaderMobileNavItem';

export default function HeaderMobileNav({
  activeMenuId,
  menus,
  onActiveMenuChange,
}) {
  return (
    <nav className="site-header__mobile-nav" aria-label="모바일 주요 메뉴">
      <ul className="site-header__mobile-nav-list">
        {menus.map((item) => (
          <HeaderMobileNavItem
            isActive={activeMenuId === item.id}
            item={item}
            key={item.id}
            onSelect={() => onActiveMenuChange(item.id)}
          />
        ))}
      </ul>

      <div className="site-header__mobile-nav-actions">
        <HeaderLanguageMenu labelMode="icon" iconSizeValue={iconSize.sm} />
      </div>
    </nav>
  );
}

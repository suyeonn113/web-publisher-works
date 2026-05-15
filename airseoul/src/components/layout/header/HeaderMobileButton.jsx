import { iconSize } from '../../../tokens/size';
import MenuIcon from '../../icons/MenuIcon';
import XIcon from '../../icons/XIcon';

export default function HeaderMobileButton({ isOpen, onClick }) {
  return (
    <button
      className="site-header__mobile-button"
      type="button"
      aria-label={isOpen ? '모바일 메뉴 닫기' : '모바일 메뉴 열기'}
      aria-expanded={isOpen}
      onClick={onClick}
    >
      {isOpen ? (
        <XIcon
          className="site-header__mobile-icon"
          size={iconSize.md}
        />
      ) : (
        <MenuIcon
          className="site-header__mobile-icon"
          size={iconSize.md}
        />
      )}
    </button>
  );
}

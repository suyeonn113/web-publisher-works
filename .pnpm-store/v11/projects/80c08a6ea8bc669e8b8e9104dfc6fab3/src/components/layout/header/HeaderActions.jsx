import HeaderContactMenu from './HeaderContactMenu';
import HeaderLanguageMenu from './HeaderLanguageMenu';
import HeaderLoginLink from './HeaderLoginLink';
import HeaderMobileButton from './HeaderMobileButton';

export default function HeaderActions({
  isMobileMenuOpen,
  onLoginOpen,
  onMobileMenuToggle,
}) {
  return (
    <div className="site-header__actions">
      <div className="site-header__desktop-actions">
        <HeaderContactMenu labelMode="full" />
        <HeaderLanguageMenu labelMode="full" />
        <HeaderLoginLink labelMode="full" onClick={onLoginOpen} />
      </div>

      <div className="site-header__mobile-actions">
        <HeaderLoginLink labelMode="text" onClick={onLoginOpen} />
        <HeaderMobileButton
          isOpen={isMobileMenuOpen}
          onClick={onMobileMenuToggle}
        />
      </div>
    </div>
  );
}

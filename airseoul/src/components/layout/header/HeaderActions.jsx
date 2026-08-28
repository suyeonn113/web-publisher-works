import { utilityNav } from '../../../data/utilityNav';
import { iconSize } from '../../../tokens/size';
import AppLink from '../../common/AppLink';
import CircleQuestionMarkIcon from '../../icons/CircleQuestionMarkIcon';
import HeaderLanguageMenu from './shared/HeaderLanguageMenu';
import HeaderLoginLink from './shared/HeaderLoginLink';
import HeaderMobileButton from './mobile/HeaderMobileButton';

const faqItem = utilityNav
  .find((item) => item.id === 'contact')
  ?.children.find((item) => item.id === 'faq');

export default function HeaderActions({
  isMobileMenuOpen,
  mobileMenuButtonRef,
  onLoginOpen,
  onMobileMenuToggle,
}) {
  return (
    <div className="site-header__actions">
      <div className="site-header__desktop-actions">
        {faqItem && (
          <AppLink className="site-header__faq-link" to={faqItem.href}>
            <CircleQuestionMarkIcon size={iconSize.xs} />
            <span>{faqItem.label}</span>
          </AppLink>
        )}
        <HeaderLanguageMenu labelMode="full" />
        <HeaderLoginLink labelMode="full" onClick={onLoginOpen} />
      </div>

      <div className="site-header__mobile-actions">
        <HeaderLoginLink labelMode="text" onClick={onLoginOpen} />
        <HeaderMobileButton
          buttonRef={mobileMenuButtonRef}
          isOpen={isMobileMenuOpen}
          onClick={onMobileMenuToggle}
        />
      </div>
    </div>
  );
}

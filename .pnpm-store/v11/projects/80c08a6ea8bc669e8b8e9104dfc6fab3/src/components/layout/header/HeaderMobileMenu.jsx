import { useRef, useState } from 'react';

import { mainNav } from '../../../data/mainNav';
import { utilityNav } from '../../../data/utilityNav';
import { usePanelTransition } from '../../../hooks/usePanelTransition';
import HeaderMobileNav from './HeaderMobileNav';
import HeaderMobileNavPanel from './HeaderMobileNavPanel';

const contactMenu = utilityNav.find((item) => item.id === 'contact');
const mobileNav = contactMenu ? [...mainNav, contactMenu] : mainNav;

export default function HeaderMobileMenu({ isOpen, onClose }) {
  const [activeMenuId, setActiveMenuId] = useState(mobileNav[0]?.id);
  const sectionRefs = useRef({});
  const { shouldRender, transitionState } = usePanelTransition(isOpen);

  const handleMenuSelect = (menuId) => {
    setActiveMenuId(menuId);

    sectionRefs.current[menuId]?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  };

  if (!shouldRender) return null;

  return (
    <div
      className="site-header__mobile-menu panel-motion--slide-right"
      data-state={transitionState}
    >
      <HeaderMobileNav
        activeMenuId={activeMenuId}
        menus={mobileNav}
        onActiveMenuChange={handleMenuSelect}
      />

      <HeaderMobileNavPanel
        menus={mobileNav}
        onNavigate={onClose}
        sectionRefs={sectionRefs}
      />
    </div>
  );
}

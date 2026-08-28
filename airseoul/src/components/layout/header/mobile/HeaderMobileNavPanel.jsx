import { useState } from 'react';
import { isPlaceholderLink } from '../../../../utils/link';
import AppLink from '../../../common/AppLink';
import ChevronDownIcon from '../../../icons/ChevronDownIcon';
import ChevronRightIcon from '../../../icons/ChevronRightIcon';

export default function HeaderMobileNavPanel({ menus, onNavigate, sectionRefs }) {
  const [openSubmenuId, setOpenSubmenuId] = useState(null);

  return (
    <div className="site-header__mobile-nav-panel">
      {menus.map((menu) => (
        <section
          className="site-header__mobile-panel-section"
          key={menu.id}
          ref={(element) => {
            sectionRefs.current[menu.id] = element;
          }}
        >
          <h3 className="site-header__mobile-panel-heading">
            {menu.label}
          </h3>

          <ul className="site-header__mobile-panel-list">
            {menu.children?.map((item) => {
              const hasChildren = Boolean(item.children?.length);
              const isSubmenuOpen = openSubmenuId === item.id;
              const submenuId = `mobile-panel-submenu-${item.id}`;

              return (
                <li
                  className="site-header__mobile-panel-item"
                  key={item.id}
                >
                  {hasChildren ? (
                    <>
                      <button
                        type="button"
                        className="site-header__mobile-panel-link site-header__mobile-panel-link--toggle"
                        aria-expanded={isSubmenuOpen}
                        aria-controls={submenuId}
                        onClick={() => setOpenSubmenuId(isSubmenuOpen ? null : item.id)}
                      >
                        <span>{item.label}</span>
                        <ChevronDownIcon
                          className="site-header__mobile-panel-chevron site-header__mobile-panel-chevron--toggle"
                          size={16}
                        />
                      </button>

                      <ul
                        className="site-header__mobile-panel-sublist"
                        id={submenuId}
                        hidden={!isSubmenuOpen}
                      >
                        {item.children.map((child) => (
                          <li key={child.id}>
                            <AppLink
                              className="site-header__mobile-panel-sublink"
                              onClick={() => {
                                if (!isPlaceholderLink(child.href)) onNavigate?.();
                              }}
                              to={child.href}
                            >
                              {child.label}
                            </AppLink>
                          </li>
                        ))}
                      </ul>
                    </>
                  ) : (
                    <AppLink
                      className="site-header__mobile-panel-link"
                      onClick={() => {
                        if (!isPlaceholderLink(item.href)) onNavigate?.();
                      }}
                      to={item.href}
                    >
                      <span>{item.label}</span>
                      <ChevronRightIcon
                        className="site-header__mobile-panel-chevron"
                        size={16}
                      />
                    </AppLink>
                  )}
                </li>
              );
            })}
          </ul>
        </section>
      ))}
    </div>
  );
}

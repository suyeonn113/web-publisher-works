import AppLink from '../../common/AppLink';

export default function HeaderMobileNavPanel({ menus, sectionRefs }) {
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
            {menu.children?.map((item) => (
              <li
                className="site-header__mobile-panel-item"
                key={item.id}
              >
                <AppLink
                  className="site-header__mobile-panel-link"
                  to={item.href}
                >
                  {item.label}
                </AppLink>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}

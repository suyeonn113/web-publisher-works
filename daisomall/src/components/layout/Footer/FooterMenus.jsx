import { footerMenuSections, standaloneMenus } from '../../../data/footerData'
import { iconSize } from '../../../tokens/size'
import { ArrowIcon } from '../../icons'
import FooterToggle from './FooterToggle'
import InactiveFooterLink from './InactiveFooterLink'

function FooterMenus() {
  const [membershipSection, companySection] = footerMenuSections

  return (
    <div className="site-footer__menus">
      <div className="site-footer__menu-column site-footer__menu-column--membership">
        <FooterToggle title={membershipSection.title}>
          <ul className="site-footer__submenu">
            {membershipSection.links.map((link) => (
              <li key={link}>
                <InactiveFooterLink>{link}</InactiveFooterLink>
              </li>
            ))}
          </ul>
        </FooterToggle>

        <div className="site-footer__quick-links">
          {standaloneMenus.map((menu) => (
            <InactiveFooterLink key={menu} className="site-footer__menu-button">
              {menu}
              <ArrowIcon size={iconSize.xxs} aria-hidden="true" />
            </InactiveFooterLink>
          ))}
        </div>
      </div>

      {companySection ? (
        <div className="site-footer__menu-column">
          <FooterToggle title={companySection.title}>
            <ul className="site-footer__submenu">
              {companySection.links.map((link) => (
                <li key={link}>
                  <InactiveFooterLink>{link}</InactiveFooterLink>
                </li>
              ))}
            </ul>
          </FooterToggle>
        </div>
      ) : null}
    </div>
  )
}

export default FooterMenus

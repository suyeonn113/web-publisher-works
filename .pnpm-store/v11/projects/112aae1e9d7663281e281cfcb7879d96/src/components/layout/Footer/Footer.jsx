import FooterAppDownload from './FooterAppDownload'
import FooterMenus from './FooterMenus'
import FooterMeta from './FooterMeta'
import FooterServices from './FooterServices'
import './footer-base.scss'
import './footer-app.scss'
import './footer-services.scss'
import './footer-menus.scss'
import './footer-meta.scss'

function Footer() {
  return (
    <footer className="site-footer">
      <FooterAppDownload />
      <FooterServices />
      <FooterMenus />
      <FooterMeta />
    </footer>
  )
}

export default Footer

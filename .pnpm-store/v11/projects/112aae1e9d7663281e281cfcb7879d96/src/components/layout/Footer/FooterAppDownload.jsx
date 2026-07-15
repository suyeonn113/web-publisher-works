import { appButtons } from '../../../data/footerData'
import { getPublicAssetPath } from '../../../utils/getPublicAssetPath'
import InactiveFooterLink from './InactiveFooterLink'

const appIcon = '/images/footer/app-order-icon.svg'

function FooterAppDownload() {
  return (
    <div className="site-footer__app">
      <div className="site-footer__app-head">
        <span className="site-footer__app-icon" aria-hidden="true">
          <img src={getPublicAssetPath(appIcon)} alt="" />
        </span>

        <div className="site-footer__app-copy">
          <strong>찾고 담고 바로 주문</strong>
          <p>재고 확인부터 주문까지 한 번에</p>
        </div>
      </div>

      <div className="site-footer__store-list" aria-label="앱 다운로드">
        <p className="site-footer__app-message">앱에서 더 편하게 이용해보세요</p>
        {appButtons.map((button) => (
          <InactiveFooterLink key={button.id} className="site-footer__store-button">
            <img src={getPublicAssetPath(button.image)} alt={button.alt} />
            <span>
              <small>{button.label}</small>
              {button.store}
            </span>
          </InactiveFooterLink>
        ))}
      </div>
    </div>
  )
}

export default FooterAppDownload

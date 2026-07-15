import {
  certList,
  companyInfoRows,
  policyLinks,
  socialLinks,
} from '../../../data/footerData'
import { iconSize } from '../../../tokens/size'
import { getPublicAssetPath } from '../../../utils/getPublicAssetPath'
import FooterToggle from './FooterToggle'
import InactiveFooterLink from './InactiveFooterLink'

function FooterMeta() {
  return (
    <>
      <div className="site-footer__social-list" aria-label="SNS 바로가기">
        {socialLinks.map(({ label, className, Icon }) => (
          <InactiveFooterLink
            key={label}
            className={`site-footer__social-link ${className}`}
            aria-label={label}
          >
            <Icon size={iconSize.sm} />
          </InactiveFooterLink>
        ))}
      </div>

      <FooterToggle title="(주)아성다이소">
        <dl className="site-footer__company-info">
          {companyInfoRows.map(([label, value]) => (
            <div key={label}>
              <dt>{label}</dt>
              <dd>
                {value}
                {label === '사업자등록번호' && (
                  <InactiveFooterLink className="site-footer__business-link">
                    사업자 정보 확인
                  </InactiveFooterLink>
                )}
              </dd>
            </div>
          ))}
        </dl>
      </FooterToggle>

      <div className="site-footer__info">
        <nav className="site-footer__policy-list" aria-label="약관 및 정책">
          {policyLinks.map((link) => (
            <InactiveFooterLink
              key={link}
              className={link.includes('개인정보') || link.includes('위치기반') ? 'is-strong' : ''}
            >
              {link}
            </InactiveFooterLink>
          ))}
        </nav>
        <p>
          Tel : 1599-2211 <span aria-hidden="true">|</span> email :
          daisomall_help@daiso.co.kr
        </p>
        <div className="site-footer__cert-list" aria-label="인증마크">
          {certList.map((cert) => (
            <span key={cert.label} className="site-footer__cert">
              <img src={getPublicAssetPath(cert.image)} alt={cert.alt} />
              <span className="site-footer__cert-name">{cert.label}</span>
            </span>
          ))}
        </div>
      </div>

      <p className="site-footer__copy">Copyright (c) 2023 DAISO. All Rights Reserved.</p>
    </>
  )
}

export default FooterMeta

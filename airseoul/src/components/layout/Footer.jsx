import { Link } from 'react-router-dom';
import { footerCompanyInfo, footerLinkGroups } from '../../data/footerLinks';
import Logo from '../common/Logo';
import FacebookIcon from '../icons/FacebookIcon';
import InstagramIcon from '../icons/InstagramIcon';
import TwitterIcon from '../icons/TwitterIcon';
import YoutubeIcon from '../icons/YoutubeIcon';

const footerSocialLinks = [
  { id: 'facebook', label: 'Facebook', href: '#facebook', icon: FacebookIcon },
  { id: 'instagram', label: 'Instagram', href: '#instagram', icon: InstagramIcon },
  { id: 'youtube', label: 'YouTube', href: '#youtube', icon: YoutubeIcon },
  { id: 'twitter', label: 'Twitter', href: '#twitter', icon: TwitterIcon },
];

function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <div className="site-footer__main">
          <div className="site-footer__brand">
            <ul className="site-footer__social" aria-label="SNS">
              {footerSocialLinks.map((social) => {
                const SocialIcon = social.icon;

                return (
                  <li className={`site-footer__social-item site-footer__social-item--${social.id}`} key={social.label}>
                    <a href={social.href} aria-label={social.label}>
                      <SocialIcon size={18} />
                    </a>
                  </li>
                );
              })}
            </ul>
            <Logo ariaLabel="AIR SEOUL 홈으로 이동" />
          </div>

          <nav className="site-footer__nav" aria-label="푸터 메뉴">
            {footerLinkGroups.map((group) => (
              <section className="site-footer__group" key={group.id}>
                <h2>{group.title}</h2>
                <ul className="site-footer__links">
                  {group.links.map((link) => (
                    <li key={link.label}>
                      <Link to={link.to}>{link.label}</Link>
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </nav>
        </div>

        <section className="site-footer__company" aria-label="회사 정보">
          <h2>회사 정보</h2>
          <address>
            {footerCompanyInfo.map((group) => (
              <span className="site-footer__company-row" key={group.id}>
                {group.items.map((info) => (
                  <span key={info}>{info}</span>
                ))}
              </span>
            ))}
          </address>
        </section>

        <small className="site-footer__copyright">
          © AIR SEOUL, Inc. All Rights Reserved.
        </small>
      </div>
    </footer>
  );
}

export default Footer;

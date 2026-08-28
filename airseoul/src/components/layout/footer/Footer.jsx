import { useEffect, useState } from 'react';

import { footerCompanyInfo, footerLinkGroups } from '../../../data/footerLinks';
import { iconSize } from '../../../tokens/size';
import AppLink from '../../common/AppLink';
import Logo from '../../common/Logo';
import ChevronDownIcon from '../../icons/ChevronDownIcon';
import FacebookIcon from '../../icons/FacebookIcon';
import InstagramIcon from '../../icons/InstagramIcon';
import TwitterIcon from '../../icons/TwitterIcon';
import YoutubeIcon from '../../icons/YoutubeIcon';

const footerSocialLinks = [
  {
    id: 'facebook',
    label: 'Facebook',
    to: 'https://www.facebook.com/AirSeoul/',
    icon: FacebookIcon,
  },
  {
    id: 'instagram',
    label: 'Instagram',
    to: 'https://www.instagram.com/airseoul_official/',
    icon: InstagramIcon,
  },
  {
    id: 'youtube',
    label: 'YouTube',
    to: 'https://www.youtube.com/airseoul',
    icon: YoutubeIcon,
  },
  {
    id: 'twitter',
    label: 'Twitter',
    to: 'https://twitter.com/airseoul_rb',
    icon: TwitterIcon,
  },
];

const FOOTER_ACCORDION_QUERY = '(max-width: 1024px)';

function Footer() {
  const [isAccordion, setIsAccordion] = useState(() => {
    return window.matchMedia(FOOTER_ACCORDION_QUERY).matches;
  });
  const [openGroupId, setOpenGroupId] = useState(null);

  useEffect(() => {
    const mediaQuery = window.matchMedia(FOOTER_ACCORDION_QUERY);
    const handleChange = (event) => setIsAccordion(event.matches);

    mediaQuery.addEventListener('change', handleChange);

    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const toggleGroup = (groupId) => {
    setOpenGroupId((currentId) => (currentId === groupId ? null : groupId));
  };

  return (
    <footer className="site-footer" id="site-footer" tabIndex={-1}>
      <div className="site-footer__inner">
        <div className="site-footer__main">
          <div className="site-footer__brand">
            <Logo ariaLabel="AIR SEOUL 홈으로 이동" />
            <ul className="site-footer__social" aria-label="에어서울 SNS 채널">
              {footerSocialLinks.map((social) => {
                const SocialIcon = social.icon;

                return (
                  <li
                    className={`site-footer__social-item site-footer__social-item--${social.id}`}
                    key={social.label}
                  >
                    <AppLink
                      to={social.to}
                      aria-label={`${social.label} 새 창 열기`}
                      rel="noreferrer"
                      target="_blank"
                    >
                      <SocialIcon size={22} />
                    </AppLink>
                  </li>
                );
              })}
            </ul>
          </div>

          <nav className="site-footer__nav" aria-label="푸터 메뉴">
            {footerLinkGroups.map((group) => {
              const isOpen = !isAccordion || openGroupId === group.id;
              const linksId = `footer-links-${group.id}`;

              return (
                <section className="site-footer__group" key={group.id}>
                  <h2>
                    {isAccordion ? (
                      <button
                        type="button"
                        className="site-footer__group-toggle"
                        aria-controls={linksId}
                        aria-expanded={isOpen}
                        onClick={() => toggleGroup(group.id)}
                      >
                        <span>{group.title}</span>
                        <ChevronDownIcon size={iconSize.sm} />
                      </button>
                    ) : (
                      group.title
                    )}
                  </h2>
                  <ul className="site-footer__links" id={linksId} hidden={!isOpen}>
                    {group.links.map((link) => (
                      <li key={link.label}>
                        <AppLink to={link.to}>{link.label}</AppLink>
                      </li>
                    ))}
                  </ul>
                </section>
              );
            })}
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

        <div className="site-footer__bottom">
          <small className="site-footer__copyright">
            © AIR SEOUL, Inc. All Rights Reserved.
          </small>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

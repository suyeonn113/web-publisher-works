import { ROUTES } from '../../../constants/routes';
import {
  customerActionLinks,
  customerCenterInfo,
  partnershipInquiries,
} from '../../../data/homeInfo';
import { iconSize } from '../../../tokens/size';
import AppLink from '../../common/AppLink';
import ChatIcon from '../../icons/ChatIcon';
import ChevronRightIcon from '../../icons/ChevronRightIcon';

function CustomerCenterPanel() {
  const CustomerIcon = customerCenterInfo.icon;

  return (
    <article className="home-info-customer">
      <header className="home-info-card-header">
        <div className="home-info-card-header__title">
          <ChatIcon />
          <h3>고객센터</h3>
        </div>
        <AppLink className="home-info-more" to={ROUTES.contact.root}>
          <span>더보기</span>
          <ChevronRightIcon size={iconSize.sm} />
        </AppLink>
      </header>

      <div className="home-info-customer__main">
        <CustomerIcon />
        <div>
          <strong>{customerCenterInfo.title}</strong>
          <a href={`tel:${customerCenterInfo.phone.replaceAll('-', '')}`}>
            {customerCenterInfo.phone}
          </a>
          <span>{customerCenterInfo.hours}</span>
        </div>
      </div>

      <div className="home-info-customer__actions">
        {customerActionLinks.map((action) => {
          const ActionIcon = action.icon;

          return (
            <AppLink className="home-info-customer__button" to={action.to} key={action.id}>
              <ActionIcon size={iconSize.sm} />
              <span>{action.label}</span>
              <ChevronRightIcon size={iconSize.sm} />
            </AppLink>
          );
        })}
      </div>

      <ul className="home-info-customer__inquiries">
        <li className="home-info-customer__inquiry-title">제휴 / 단체문의</li>
        {partnershipInquiries.map((item) => (
          <li className="home-info-customer__inquiry" key={item.id}>
            <strong>{item.title}</strong>
            <a href={`mailto:${item.email}`}>{item.email}</a>
            {item.description.map((text) => (
              <p key={text}>{text}</p>
            ))}
          </li>
        ))}
      </ul>
    </article>
  );
}

export default CustomerCenterPanel;

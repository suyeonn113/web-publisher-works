import { customerActionLinks, customerCenterInfo } from '../../../data/homeInfo';
import { iconSize } from '../../../tokens/size';
import AppLink from '../../common/AppLink';
import ChevronRightIcon from '../../icons/ChevronRightIcon';

function CustomerCenterPanel() {
  const CustomerIcon = customerCenterInfo.icon;

  return (
    <article className="home-info-customer">
      <div className="home-info-customer__main">
        <span className="home-info-customer__phone-icon">
          <CustomerIcon />
        </span>
        <div className="home-info-customer__contact">
          <div className="home-info-customer__phone-row">
            <strong>고객센터</strong>
            <a href={`tel:${customerCenterInfo.phone.replaceAll('-', '')}`}>
              {customerCenterInfo.phone}
            </a>
          </div>
          <span>{customerCenterInfo.hours}</span>
        </div>
      </div>

      <div className="home-info-customer__actions">
        {customerActionLinks.map((action) => (
          <AppLink className="home-info-customer__button" to={action.to} key={action.id}>
            <span>{action.label}</span>
            <ChevronRightIcon size={iconSize.sm} />
          </AppLink>
        ))}
      </div>
    </article>
  );
}

export default CustomerCenterPanel;

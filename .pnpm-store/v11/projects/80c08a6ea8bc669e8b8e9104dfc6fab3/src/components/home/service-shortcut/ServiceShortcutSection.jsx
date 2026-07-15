import { ROUTES } from '../../../constants/routes';
import { serviceShortcuts } from '../../../data/serviceShortcuts';
import { iconSize } from '../../../tokens/size';
import AppLink from '../../common/AppLink';
import ChevronRightIcon from '../../icons/ChevronRightIcon';
import ServiceShortcutItem from './ServiceShortcutItem';

function ServiceShortcutSection() {
  return (
    <section className="service-shortcut" aria-labelledby="service-shortcut-title">
      <div className="service-shortcut__inner">
        <div className="service-shortcut__content">
          <span className="service-shortcut__eyebrow">ADDITIONAL SERVICE</span>

          <h2 className="service-shortcut__title" id="service-shortcut-title">
            부가서비스
          </h2>

          <p className="service-shortcut__text">
            <span>에어서울만의 합리적이고 편리한</span>
            <span>부가 서비스를 미리 만나보세요.</span>
          </p>

          <AppLink className="service-shortcut__guide" to={ROUTES.travel.root}>
            <span>전체 보기</span>
            <ChevronRightIcon size={iconSize.md} />
          </AppLink>
        </div>

        <ul className="service-shortcut__list">
          {serviceShortcuts.map((item) => (
            <ServiceShortcutItem item={item} key={item.id} />
          ))}
        </ul>
      </div>
    </section>
  );
}

export default ServiceShortcutSection;

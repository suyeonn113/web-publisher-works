import { Link } from 'react-router-dom';
import { serviceShortcuts } from '../../data/ServiceShortcutSection.js';

function ServiceShortcutItem({ item }) {
  return (
    <li className="service-shortcut-section__item">
      <Link className="service-shortcut-section__link" to={item.to}>
        <span className="service-shortcut-section__visual" aria-hidden="true">
          <img src={item.image} alt="" />
        </span>

        <strong className="service-shortcut-section__label">
          {item.label}
        </strong>
      </Link>
    </li>
  );
}

function ServiceShortcutSection() {
  return (
    <section className="service-shortcut-section" aria-labelledby="service-shortcut-title">
      <div className="service-shortcut-section__inner">
        <header className="service-shortcut-section__header">
          <h2 id="service-shortcut-title">부가 서비스 구매</h2>
        </header>

        <ul className="service-shortcut-section__list">
          {serviceShortcuts.map((item) => (
            <ServiceShortcutItem item={item} key={item.id} />
          ))}
        </ul>
      </div>
    </section>
  );
}

export default ServiceShortcutSection;
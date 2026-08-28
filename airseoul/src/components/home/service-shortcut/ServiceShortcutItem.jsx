import AppLink from '../../common/AppLink';

function ServiceShortcutItem({ item }) {
  return (
    <li className="service-shortcut__item">
      <AppLink className="service-shortcut__link" to={item.to}>
        <img
          className="service-shortcut__image"
          src={item.imageSrc}
          alt=""
          loading="lazy"
          decoding="async"
        />

        <span className="service-shortcut__card-content">
          <strong className="service-shortcut__label">{item.label}</strong>
          <span className="service-shortcut__description">{item.description}</span>
          <span className="service-shortcut__action" aria-hidden="true">→</span>
        </span>
      </AppLink>
    </li>
  );
}

export default ServiceShortcutItem;

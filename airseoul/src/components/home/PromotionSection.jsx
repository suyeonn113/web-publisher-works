import AppLink from '../common/AppLink';

<AppLink
  className="service-shortcut-section__item"
  to={item.href}
>
  <span className="service-shortcut-section__icon">
    <img src={item.image} alt="" />
  </span>

  <strong>{item.label}</strong>
</AppLink>

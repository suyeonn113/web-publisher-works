
import { Link } from 'react-router-dom';

<Link
  className="service-shortcut-section__item"
  to={item.href}
>
  <span className="service-shortcut-section__icon">
    <img src={item.image} alt="" />
  </span>

  <strong>{item.label}</strong>
</Link>
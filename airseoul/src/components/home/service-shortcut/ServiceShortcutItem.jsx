import { Link } from 'react-router-dom';
function ServiceShortcutItem({ item }) {
  const handleIconError = (event) => {
    event.currentTarget.hidden = true;
  };

  return (
    <li className="service-shortcut__item">
      <Link className="service-shortcut__link" to={item.to}>
        <span className="service-shortcut__icon" aria-hidden="true">
          {item.iconSrc && (
            <img src={item.iconSrc} alt="" loading="lazy" onError={handleIconError} />
          )}
        </span>

        <strong className="service-shortcut__label">{item.label}</strong>
        <span className="service-shortcut__description">{item.description}</span>
      </Link>
    </li>
  );
}

export default ServiceShortcutItem;

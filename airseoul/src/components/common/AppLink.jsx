import { Link } from 'react-router-dom';

export const PLACEHOLDER_LINK = '#';

export function isPlaceholderLink(to) {
  return to === PLACEHOLDER_LINK;
}

export default function AppLink({ onClick, to, ...props }) {
  const handleClick = (event) => {
    onClick?.(event);

    if (isPlaceholderLink(to)) {
      event.preventDefault();
    }
  };

  return <Link to={to} onClick={handleClick} {...props} />;
}

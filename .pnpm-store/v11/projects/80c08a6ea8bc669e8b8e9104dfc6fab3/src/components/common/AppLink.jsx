import { Link } from 'react-router-dom';
import { isPlaceholderLink } from '../../utils/link';

export default function AppLink({ onClick, to, ...props }) {
  const handleClick = (event) => {
    onClick?.(event);

    if (isPlaceholderLink(to)) {
      event.preventDefault();
    }
  };

  return <Link to={to} onClick={handleClick} {...props} />;
}

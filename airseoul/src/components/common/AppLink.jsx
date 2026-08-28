import { Link } from 'react-router-dom';
import { isPlaceholderLink } from '../../utils/link';

export default function AppLink({ onClick, to, ...props }) {
  if (isPlaceholderLink(to)) {
    const { children, className = '', ...elementProps } = props;
    const opensMenu = Boolean(elementProps['aria-haspopup']);

    if (opensMenu) {
      return (
        <button
          type="button"
          className={className}
          onClick={onClick}
          {...elementProps}
        >
          {children}
        </button>
      );
    }

    return (
      <span
        aria-disabled="true"
        className={`${className} app-link--disabled`.trim()}
        data-placeholder-link=""
        {...elementProps}
      >
        {children}
      </span>
    );
  }

  return <Link to={to} onClick={onClick} {...props} />;
}
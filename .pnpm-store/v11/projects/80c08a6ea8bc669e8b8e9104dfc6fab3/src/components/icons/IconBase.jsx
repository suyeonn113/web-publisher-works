import { iconSize } from '../../tokens/size';

function IconBase({
  children,
  size = iconSize.md,
  className = '',
  ...props
}) {
  return (
    <svg
      className={className}
      width={size}
      height={size}

      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"

      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"

      {...props}
    >
      {children}
    </svg>
  );
}

export default IconBase;

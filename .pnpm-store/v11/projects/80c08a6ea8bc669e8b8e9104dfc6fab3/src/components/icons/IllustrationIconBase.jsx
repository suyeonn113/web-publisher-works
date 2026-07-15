import { illustrationIconSize } from '../../tokens/size';

function IllustrationIconBase({
  children,
  size = illustrationIconSize.md,
  className = '',
  ...props
}) {
  return (
    <svg
      className={className}
      width={size}
      height={size}

      viewBox="0 0 500 500"
      fill="none"
      aria-hidden="true"

      stroke="currentColor"
      strokeWidth="1"
      strokeLinecap="round"
      strokeLinejoin="round"

      {...props}
    >
      {children}
    </svg>
  );
}

export default IllustrationIconBase;

function IconBase({
  children,
  size = 24,
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
      strokeLinecap="square"
      strokeLinejoin="miter"

      {...props}
    >
      {children}
    </svg>
  );
}

export default IconBase;
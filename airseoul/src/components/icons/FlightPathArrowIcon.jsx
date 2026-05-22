function FlightPathArrowIcon({
  className = '',
  direction = 'right',
  ...props
}) {
  const isDown = direction === 'down';

  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      height={isDown ? 32 : 12}
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1"
      viewBox={isDown ? '0 0 12 32' : '0 0 72 12'}
      width={isDown ? 12 : 72}
      {...props}
    >
      {isDown ? (
        <path d="M6 1v28m-4-4 4 4 4-4" />
      ) : (
        <path d="M1 6h68m-4-4 4 4-4 4" />
      )}
    </svg>
  );
}

export default FlightPathArrowIcon;

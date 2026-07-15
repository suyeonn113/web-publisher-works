import { iconSize } from '../../tokens/size'

function IconBase({
  children,
  size = iconSize.md,
  viewBox = '0 0 26 26',
  label,
  className = '',
  ...props
}) {
  const accessibilityProps = label
    ? { role: 'img', 'aria-label': label }
    : { 'aria-hidden': true }

  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox={viewBox}
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      stroke="currentColor"
      strokeWidth="1.9"
      strokeLinecap="square"
      strokeLinejoin="round"
      color="currentColor"
      {...accessibilityProps}
      {...props}
    >
      {children}
    </svg>
  )
}

export default IconBase

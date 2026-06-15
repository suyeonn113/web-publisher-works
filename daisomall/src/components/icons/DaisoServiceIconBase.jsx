import { iconSize } from '../../tokens/size'

const serviceColorMap = {
  pickup: 'var(--color-daiso-service-pickup-icon)',
  delivery: 'var(--color-daiso-service-delivery-icon)',
  today: 'var(--color-daiso-service-today-icon)',
  bulk: 'var(--color-daiso-service-bulk-icon-primary)',
}

function DaisoServiceIconBase({
  children,
  type = 'pickup',
  size = iconSize.md,
  viewBox = '0 0 24 24',
  label,
  className = '',
  style = {},
  ...props
}) {
  const accessibilityProps = label
    ? { role: 'img', 'aria-label': label }
    : { 'aria-hidden': true }

  const fillColor = style.color || serviceColorMap[type] || serviceColorMap.pickup

  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox={viewBox}
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      style={{ ...style, color: fillColor }}
      {...accessibilityProps}
      {...props}
    >
      {children}
    </svg>
  )
}

export default DaisoServiceIconBase

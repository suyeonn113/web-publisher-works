import DaisoServiceIconBase from './DaisoServiceIconBase'

function DaisoBulkOrderIcon({
  primaryColor = 'var(--color-daiso-service-bulk-icon-primary)',
  secondaryColor = 'var(--color-daiso-service-bulk-icon-secondary)',
  ...props
}) {
  return (
    <DaisoServiceIconBase type="bulk" {...props}>
      <path d="M14.4 3.04135V7.84135H9.60001V3.04135H3.05334V20.96H20.944V3.04135H14.3973H14.4ZM8.41868 18.7814H5.11601V17.1814H8.41868V18.7814ZM11.116 15.592H5.11601V13.992H11.116V15.592Z" style={{ fill: primaryColor }} />
      <path d="M14.4001 3.04135H9.6001V7.84135H14.4001V3.04135Z" style={{ fill: secondaryColor }} />
    </DaisoServiceIconBase>
  )
}

export default DaisoBulkOrderIcon

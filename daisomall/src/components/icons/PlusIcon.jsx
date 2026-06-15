import CloseIcon from './CloseIcon'

function PlusIcon({ style, ...props }) {
  return (
    <CloseIcon
      style={{ transform: 'rotate(45deg)', transformOrigin: 'center', ...style }}
      {...props}
    />
  )
}

export default PlusIcon

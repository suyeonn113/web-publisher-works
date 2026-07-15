import IconBase from './IconBase'

function ShoppingBagIcon(props) {
  return (
    <IconBase viewBox="0 0 64 64" stroke="none" {...props}>
      <path d="M15 21h34v35H15z" />
      <path
        d="M24 22v-5c0-5 4-9 8-9s8 4 8 9v5"
        fill="none"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <path d="M49 21v35l-5-4V25z" opacity="0.7" />
    </IconBase>
  )
}

export default ShoppingBagIcon

import { Link } from 'react-router-dom'

function InactiveFooterLink({ children, className = '', ...props }) {
  return (
    <Link
      to="#"
      className={className}
      onClick={(event) => event.preventDefault()}
      {...props}
    >
      {children}
    </Link>
  )
}

export default InactiveFooterLink

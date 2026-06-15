import './Button.scss'

function Button({ children, type = 'button' }) {
  return (
    <button type={type} className="button">
      {children}
    </button>
  )
}

export default Button

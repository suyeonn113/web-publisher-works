function InactiveFooterLink({ children, className = '', ...props }) {
  return (
    <button
      type="button"
      className={className}
      aria-label={typeof children === 'string' ? `${children} 준비 중` : undefined}
      {...props}
    >
      {children}
    </button>
  )
}

export default InactiveFooterLink

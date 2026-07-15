export default function CheckInGuidePanel({ children, className = '', title, description }) {
  return (
    <div className={`information-sections ${className}`}>
      <header>
        <h2>{title}</h2>
        <p>{description}</p>
      </header>
      {children}
    </div>
  );
}

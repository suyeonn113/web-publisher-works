function BookingContentLayout({ aside, children }) {
  return (
    <div className="booking-content-layout">
      <div className="booking-content-layout__main">{children}</div>
      <aside className="booking-content-layout__aside" aria-label="여정 및 운임 요약">
        {aside}
      </aside>
    </div>
  );
}

export default BookingContentLayout;

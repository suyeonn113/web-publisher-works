import { keyFareNotices } from '../../../data/fareNotices';

function BookingKeyNotice() {
  return (
    <section className="booking-key-notice" aria-labelledby="booking-key-notice-title">
      <h2 id="booking-key-notice-title">꼭 확인하세요</h2>

      <ul>
        {keyFareNotices.map((notice) => (
          <li key={notice}>{notice}</li>
        ))}
      </ul>
    </section>
  );
}

export default BookingKeyNotice;

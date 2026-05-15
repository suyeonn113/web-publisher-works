import { formatKRW } from '../../../utils/price';

function DateFareBar({ items }) {
  return (
    <div className="date-fare-bar" aria-label="날짜별 최저 운임">
      {items.map((item) => (
        <button
          className={`date-fare-bar__item${item.isSelected ? ' is-selected' : ''}`}
          key={item.date}
          type="button"
        >
          <span>{item.date}</span>
          <strong>{item.price ? formatKRW(item.price) : '-'}</strong>
        </button>
      ))}
    </div>
  );
}

export default DateFareBar;

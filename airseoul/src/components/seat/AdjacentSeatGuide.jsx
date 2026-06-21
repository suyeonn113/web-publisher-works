import { ADJACENT_SEAT_PRICES } from './seatGuideData';

const ADJACENT_PRICE_COLUMNS = ['노선', '1석 구매', '2석 구매'];

export default function AdjacentSeatGuide() {
  return (
    <div className="seat-guide-panel">
      <header>
        <h2>옆 좌석 구매</h2>
        <p>편안한 비행을 위해 본인 좌석과 연결된 좌석을 최대 2석까지 구매할 수 있습니다.</p>
      </header>

      <div className="seat-price-table seat-price-table--preserve-table">
        <table>
          <thead>
            <tr>{ADJACENT_PRICE_COLUMNS.map((column) => <th key={column}>{column}</th>)}</tr>
          </thead>
          <tbody>
            {ADJACENT_SEAT_PRICES.map((row) => (
              <tr key={row[0]}>
                {row.map((cell, index) => (
                  index === 0
                    ? <th scope="row" key={cell}>{cell}</th>
                    : <td key={cell}>{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <section>
        <h3>이용 규정</h3>
        <ul>
          <li>출발 당일 공항에서 잔여 좌석이 있는 경우에만 구매할 수 있습니다.</li>
          <li>사전 구매는 불가능하며 일반적으로 환불되지 않습니다.</li>
          <li>결항이나 지연으로 서비스를 제공받지 못한 경우에는 환불할 수 있습니다.</li>
        </ul>
      </section>
    </div>
  );
}

import { ADVANCE_SEAT_PRICES } from './seatGuideData';

const PRICE_COLUMNS = ['노선', 'MINT 1열·비상구', 'MINT 2~3열', 'A구역', 'B구역'];

export default function SeatPriceGuide() {
  return (
    <section className="seat-guide-panel">
      <header>
        <h2>사전 좌석 구매 요금</h2>
        <p>아래 금액은 한국 출발 기준이며 출발지 통화와 구매 시점에 따라 달라질 수 있습니다.</p>
      </header>

      <div className="seat-price-table">
        <table>
          <thead>
            <tr>{PRICE_COLUMNS.map((column) => <th key={column}>{column}</th>)}</tr>
          </thead>
          <tbody>
            {ADVANCE_SEAT_PRICES.map((row) => (
              <tr key={row[0]}>
                {row.map((cell, index) => (
                  index === 0 ? (
                    <th scope="row" data-label={PRICE_COLUMNS[index]} key={cell}>{cell}</th>
                  ) : (
                    <td data-label={PRICE_COLUMNS[index]} key={cell}>{cell}</td>
                  )
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="seat-guide-caption">
        공항 현장 구매는 MINT ZONE 좌석에 한해 가능하며 사전 구매보다 높은 요금이 적용될 수 있습니다.
      </p>
    </section>
  );
}

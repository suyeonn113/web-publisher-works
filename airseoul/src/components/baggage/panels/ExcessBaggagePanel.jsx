import BaggageIntro from '../BaggageIntro';
import PrepaidBaggageGuide from '../PrepaidBaggageGuide';
import BaggageTable from '../BaggageTable';

const PREPAID_ROWS = [
  ['국내선', '8,000원 / 5kg', '해당 없음'],
  ['일본', '40,000원 · JPY 4,000 / 15kg', '45,000원 · JPY 4,500 / 15kg'],
  ['중국·홍콩', '50,000원 · CNY 350 / 15kg', '55,000원 · CNY 385 / 15kg'],
  ['동남아', '60,000원 · USD 60 / 15kg', '65,000원 · USD 65 / 15kg'],
  ['미주(괌)', '40,000원 · USD 40 / 23kg 1개', '45,000원 · USD 45 / 23kg 1개'],
];

const AIRPORT_ROWS = [
  ['국내선', '해당 없음', '3,000원 / 1kg'],
  ['일본', '60,000원 · JPY 6,000 / 15kg', '12,000원 · JPY 1,200 / 1kg'],
  ['중국·홍콩', '75,000원 · CNY 525 / 15kg', '15,000원 · CNY 105 / 1kg'],
  ['동남아', '90,000원 · USD 90 / 15kg', '18,000원 · USD 18 / 1kg'],
  ['미주(괌)', '50,000원 · USD 50 / 23kg 1개', '50,000원 · USD 50 / 23kg 1개'],
];

const SPORTS_ROWS = [
  ['스키·스노보드·서핑보드·윈드서핑·다이빙 장비·자전거', '20,000원 · JPY 2,000 · CNY 140 · USD 20 / 개'],
  ['그 외 스포츠 장비(골프채 포함)', '별도 취급 수수료 없음 · 무료 허용량 초과 시 초과 요금 부과'],
];

export default function ExcessBaggagePanel() {
  return (
    <article className="baggage-guide-panel" role="tabpanel">
      <BaggageIntro title="초과 수하물" description="무료 허용량을 초과하면 노선, 구매 시점, 무게와 개수에 따라 요금이 부과됩니다." />

      <PrepaidBaggageGuide />

      <section>
        <h3>사전 구매 요금</h3>
        <p>국제선은 출발 48시간 전을 기준으로 요금이 달라집니다.</p>
        <BaggageTable
          caption="노선별 사전 구매 요금"
          columns={['노선', '출발 48시간 이전', '출발 48시간 이내']}
          rows={PREPAID_ROWS}
        />
        <ul>
          <li>국제선 사전 구매는 1회당 15kg 단위이며, 미주 노선은 23kg 수하물 1개 단위입니다.</li>
          <li>구매 가능 시간과 환불 조건은 위의 구매 전 확인사항을 확인해 주세요.</li>
        </ul>
      </section>

      <section>
        <h3>공항 현장 구매 요금</h3>
        <BaggageTable
          caption="노선별 공항 현장 초과 요금"
          columns={['노선', '추가 수하물 또는 15kg 요금', '초과 무게 요금']}
          rows={AIRPORT_ROWS}
        />
        <p className="baggage-guide-note">통화 환산 기준은 KRW 1,000 = USD 1 = JPY 100 = CNY 7 = HKD 8 = MVR 4이며 현장 상황에 따라 달라질 수 있습니다.</p>
      </section>

      <section>
        <h3>특수·스포츠 수하물</h3>
        <p>스포츠 장비는 일반 수하물과 다르게 취급되며, 종류별 취급 수수료와 무료 허용량 초과 요금이 함께 부과될 수 있습니다.</p>
        <BaggageTable
          caption="스포츠 장비 취급 수수료"
          columns={['장비 종류', '취급 수수료']}
          rows={SPORTS_ROWS}
        />
        <ul>
          <li>장비는 전용 하드케이스 등 견고한 용기에 포장해야 하며 포장하지 않은 장비는 운송이 거절될 수 있습니다.</li>
          <li>세 변의 합이 277cm를 초과하면 위탁할 수 없습니다.</li>
          <li>플라스틱 케이스에 보관하지 않은 골프채는 파손 시 보상하지 않습니다.</li>
          <li>골프 장비와 일반 수하물의 합계가 무료 허용량을 넘으면 초과 요금이 부과됩니다.</li>
        </ul>
      </section>

      <section>
        <h3>유의사항</h3>
        <ul>
          <li>요금과 이용 절차는 사전 고지 없이 변경될 수 있습니다.</li>
          <li>공항 구매 요금은 홈페이지 사전 구매보다 높을 수 있으므로 예약센터 또는 홈페이지에서 미리 구매해 주세요.</li>
          <li>위탁 수하물 1개의 무게는 80kg을 초과할 수 없으며 초과 시 운송이 거절됩니다.</li>
        </ul>
      </section>
    </article>
  );
}

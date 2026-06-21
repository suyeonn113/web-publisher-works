import BaggageIntro from '../BaggageIntro';
import BaggageTable from '../BaggageTable';

const ALLOWANCE_ROWS = [
  ['국내선', '15kg · 203cm 이하', '제공되지 않음', '15kg · 203cm 이하', '제공되지 않음'],
  ['국제선', '15kg · 203cm 이하', '10kg · 203cm 이하 · 1개', '제공되지 않음', '제공되지 않음'],
  ['미주 노선', '23kg · 203cm 이하 · 2개', '10kg · 203cm 이하 · 1개', '23kg · 203cm 이하 · 2개', '10kg · 203cm 이하 · 1개'],
];

const GATE_ROWS = [
  ['국내선', '최대 23kg', '10,000원 / 개'],
  ['국제선', '최대 23kg', '20,000원 · JPY 2,000 · CNY 140 · USD 20 / 개'],
];

const PRIORITY_ROWS = [
  ['국내선', '3,000원 / 1개'],
  ['국제선', '5,000원 · JPY 500 · CNY 35 · USD 5 / 1개'],
];

export default function CheckedBaggagePanel() {
  return (
    <article className="baggage-guide-panel" role="tabpanel">
      <BaggageIntro title="위탁 수하물" description="항공사에 운송을 의뢰하고 수하물표를 발급받아 맡기는 수하물입니다." />

      <section className="baggage-guide-highlight">
        <h3>공통 크기 기준</h3>
        <strong>수하물 1개의 세 변 합은 203cm를 초과할 수 없습니다.</strong>
      </section>

      <section>
        <h3>무료 위탁 수하물 허용량</h3>
        <BaggageTable
          caption="운임 및 노선별 무료 위탁 수하물"
          columns={['구분', '정규·할인 운임 성인/소아', '정규·할인 운임 유아', '특가 운임 성인/소아', '특가 운임 유아']}
          rows={ALLOWANCE_ROWS}
        />
        <ul>
          <li>소아와 유아는 유모차, 유아 운반용 요람 또는 유아용 카시트 중 1개를 무료 위탁할 수 있습니다.</li>
          <li>일반 국제선의 무료 위탁 수하물은 정규·할인 운임에만 제공됩니다.</li>
        </ul>
      </section>

      <section>
        <h3>탑승구 위탁 수하물 처리 수수료</h3>
        <p>기내 휴대 가능 수하물 1개 이외의 수하물은 반드시 카운터에서 위탁해야 합니다. 탑승구에서 위탁하면 별도 수수료와 초과 요금이 부과됩니다.</p>
        <BaggageTable
          caption="탑승구 위탁 수수료"
          columns={['구분', '허용 무게', '수수료']}
          rows={GATE_ROWS}
          variant="leading-pair"
          preserveTable
        />
        <ul>
          <li>휠체어와 목발 등 장애 고객의 보조기기는 수수료 부과 대상에서 제외됩니다.</li>
          <li>안전을 위해 탑승구에서 위탁하는 수하물 1개의 무게도 23kg을 넘을 수 없습니다.</li>
          <li>23kg 초과 수하물은 분리 포장해야 하며, 초과 요금은 별도로 부과됩니다.</li>
          <li>객실 반입이 어려운 유모차는 탑승구에서 무료로 위탁할 수 있습니다.</li>
        </ul>
      </section>

      <section>
        <h3>우선 수하물 서비스</h3>
        <p>구매한 수하물을 목적지 공항에서 일반 수하물보다 빠르게 받을 수 있는 서비스입니다.</p>
        <BaggageTable
          caption="우선 수하물 서비스 요금"
          columns={['구분', '요금']}
          rows={PRIORITY_ROWS}
          preserveTable
        />
        <ul>
          <li>출발 당일 공항 현장에서만 구매할 수 있으며 구매 후 환불되지 않습니다.</li>
          <li>휠체어, 유모차, 의료보조기구와 스포츠용품 등 특수 수하물이 먼저 처리될 수 있습니다.</li>
          <li>출발·도착 공항의 시설과 기상 상황에 따라 수하물 수취가 지연될 수 있습니다.</li>
        </ul>
      </section>
    </article>
  );
}

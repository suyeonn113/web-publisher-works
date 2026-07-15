const BENEFITS = [
  {
    title: '할인 요금',
    description: '공항 현장 구매보다 낮은 사전 구매 요금이 적용됩니다.',
  },
  {
    title: '구매 가능 시간',
    description: '국제선은 출발 4시간 전, 국내선은 출발 48시간 전까지 구매할 수 있습니다.',
  },
  {
    title: '이용 가능 노선',
    description: '에어서울이 운항하는 국내선과 국제선에서 구매할 수 있습니다.',
  },
];

const NOTICES = [
  '홈페이지와 모바일에서 항공권을 예매할 때 함께 구매하거나, 예매를 마친 뒤 추가로 구매할 수 있습니다.',
  '공항 현장에서는 사전 수하물을 구매할 수 없습니다.',
  '출발일과 다른 날짜로 여정을 변경하면 온라인 구매가 제한될 수 있으므로 예약센터에 문의해 주세요.',
  '여정을 변경하면 구매한 초과 수하물이 자동 취소·환불되므로 변경 완료 후 다시 구매해야 하며, 여정을 취소하면 함께 취소·환불됩니다.',
  '출발 4시간 이내에 여정을 변경하거나 취소·환불하면 초과 수하물 구매 금액은 환불되지 않습니다.',
  '공동운항편과 제휴 항공사 운항편은 사전 초과 수하물을 구매할 수 없습니다.',
  '여행사 패키지와 단체 항공권은 에어서울 예약센터를 통해 구매할 수 있습니다.',
];

export default function PrepaidBaggageGuide() {
  return (
    <section className="prepaid-baggage-guide" aria-labelledby="prepaid-baggage-title">
      <header>
        <h3 id="prepaid-baggage-title">사전 수하물 구매</h3>
        <p>가져갈 짐이 많다면 출발 전에 초과 수하물을 미리 구매해 주세요.</p>
      </header>

      <div className="prepaid-baggage-guide__benefits">
        {BENEFITS.map(({ title, description }) => (
          <article key={title}>
            <h4>{title}</h4>
            <p>{description}</p>
          </article>
        ))}
      </div>

      <button className="baggage-guide-link" type="button">
        사전 수하물 구매
      </button>

      <div className="prepaid-baggage-guide__notices">
        <h4>구매 전 확인사항</h4>
        <ul>
          {NOTICES.map((notice) => (
            <li key={notice}>{notice}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}

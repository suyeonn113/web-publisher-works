const CUSTOMER_STORIES = [
  {
    title: '여유로운 비행',
    description: '넉넉한 좌석과 필요한 기내 서비스로 이동 시간까지 편안한 여행의 일부가 됩니다.',
  },
  {
    title: '합리적인 여행 설계',
    description: '원하는 좌석과 부가서비스, 다양한 제휴 혜택을 직접 선택해 여행 비용을 효율적으로 구성합니다.',
  },
  {
    title: '빠르고 세심한 서비스',
    description: '체크인부터 탑승까지 필요한 순간에 도움을 제공하며 고객의 의견을 서비스 개선으로 연결합니다.',
  },
];

export default function CustomerStories() {
  return (
    <section className="brand-customer-stories" aria-labelledby="customer-stories-title">
      <header>
        <span>WHY AIR SEOUL</span>
        <h2 id="customer-stories-title">고객이 경험하는 에어서울</h2>
      </header>
      <ul>
        {CUSTOMER_STORIES.map((story) => (
          <li key={story.title}>
            <h3>{story.title}</h3>
            <p>{story.description}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}

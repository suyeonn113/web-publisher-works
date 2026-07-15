import { useRef, useState } from 'react';
import ChevronDownIcon from '../components/icons/ChevronDownIcon';
import { UI_EVENTS } from '../constants/uiEvents';

const GUIDE_TYPES = {
  CHANGE: 'change',
  REFUND: 'refund',
};

const GUIDE_TABS = [
  { id: GUIDE_TYPES.CHANGE, label: '예약 변경' },
  { id: GUIDE_TYPES.REFUND, label: '예약 취소 · 환불' },
];

const GUIDE_CONTENT = {
  [GUIDE_TYPES.CHANGE]: {
    heading: '항공권 변경 안내',
    description: '구매처와 운임 규정에 따라 변경 가능 여부와 수수료가 달라질 수 있습니다.',
    steps: ['예약 조회', '변경 조건 선택', '항공편 선택', '운임 차액 확인 및 결제'],
    accordions: [
      {
        title: '변경 가능 조건',
        content: '항공권의 유효기간과 운임 규정 내에서 날짜와 항공편을 변경할 수 있습니다. 일부 특가 운임은 변경이 제한될 수 있습니다.',
      },
      {
        title: '운임 차액 및 수수료',
        items: [
          '변경 시점의 운임이 기존 운임보다 높은 경우 차액을 결제해야 합니다.',
          '변경 수수료와 항공권 재발행 수수료는 구매한 운임 규정에 따라 달라집니다.',
          '운임이 낮아진 경우 차액 환불 여부는 해당 항공권의 규정을 따릅니다.',
        ],
      },
      {
        title: '구매처별 처리 방법',
        content: '에어서울 홈페이지와 모바일에서 구매한 항공권은 로그인 후 확인할 수 있습니다. 여행사와 예약센터 구매 항공권은 해당 구매처로 문의해 주세요.',
      },
      {
        title: '변경 전 유의사항',
        content: '항공편 변경 시 사전 구매한 좌석, 수하물, 기내식 등 부가서비스를 다시 확인해 주세요.',
      },
    ],
  },
  [GUIDE_TYPES.REFUND]: {
    heading: '예약 취소 및 환불 안내',
    description: '환불 금액과 처리 기간은 운임 규정, 취소 시점, 결제수단에 따라 달라집니다.',
    steps: ['예약 조회', '취소 여정 선택', '환불 금액 확인', '환불 신청'],
    accordions: [
      {
        title: '환불 가능 조건',
        content: '항공권 유효기간과 운임 규정에 따라 환불할 수 있습니다. 사용한 구간이 있거나 출발 시간이 지난 경우 제한될 수 있습니다.',
      },
      {
        title: '환불 수수료',
        items: [
          '구매한 운임과 취소 시점에 따라 환불 위약금 또는 수수료가 공제될 수 있습니다.',
          '출발 시간이 지난 항공권에는 별도의 노쇼 위약금이 적용될 수 있습니다.',
          '사용한 구간이 있는 경우 남은 항공권의 운임을 다시 계산한 후 환불합니다.',
        ],
      },
      {
        title: '결제수단별 환불',
        content: '환불 승인 후 실제 입금 또는 카드 승인 취소까지는 결제수단과 카드사 사정에 따라 시간이 소요될 수 있습니다.',
      },
      {
        title: '구매처 및 부가서비스',
        content: '여행사 구매 항공권은 해당 구매처로 문의해 주세요. 좌석과 수하물 등 부가서비스는 항공권과 환불 규정이 다를 수 있습니다.',
      },
    ],
  },
};

function BookingChangeRefund() {
  const [activeTab, setActiveTab] = useState(GUIDE_TYPES.CHANGE);
  const tabRefs = useRef([]);
  const content = GUIDE_CONTENT[activeTab];
  const feeGuide = content.accordions.find((item) => item.items);
  const visibleGuides = content.accordions.filter((item) => !item.items);

  const openLoginPanel = () => {
    window.dispatchEvent(new CustomEvent(UI_EVENTS.OPEN_LOGIN_PANEL));
  };

  const handleTabKeyDown = (event, currentIndex) => {
    const lastIndex = GUIDE_TABS.length - 1;
    let nextIndex;

    if (event.key === 'ArrowRight') nextIndex = currentIndex === lastIndex ? 0 : currentIndex + 1;
    if (event.key === 'ArrowLeft') nextIndex = currentIndex === 0 ? lastIndex : currentIndex - 1;
    if (event.key === 'Home') nextIndex = 0;
    if (event.key === 'End') nextIndex = lastIndex;
    if (nextIndex === undefined) return;

    event.preventDefault();
    setActiveTab(GUIDE_TABS[nextIndex].id);
    tabRefs.current[nextIndex]?.focus();
  };

  return (
    <main className="booking-guide-page" aria-labelledby="booking-guide-title">
      <div className="booking-guide-page__inner">
        <header className="booking-guide-page__header">
          <h1 id="booking-guide-title">예약 변경 및 환불</h1>
        </header>

        <div className="booking-guide-tabs" role="tablist" aria-label="변경 및 환불 안내">
          {GUIDE_TABS.map((tab, index) => (
            <button
              aria-controls="booking-guide-panel"
              aria-selected={activeTab === tab.id}
              className={activeTab === tab.id ? 'is-active' : ''}
              id={`booking-guide-tab-${tab.id}`}
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              onKeyDown={(event) => handleTabKeyDown(event, index)}
              ref={(element) => {
                tabRefs.current[index] = element;
              }}
              role="tab"
              tabIndex={activeTab === tab.id ? 0 : -1}
              type="button"
            >
              {tab.label}
            </button>
          ))}
        </div>

        <section
          className="booking-guide-content"
          id="booking-guide-panel"
          role="tabpanel"
          aria-labelledby={`booking-guide-tab-${activeTab}`}
        >
          <div className="booking-guide-summary">
            <div>
              <h2>{content.heading}</h2>
              <p>{content.description}</p>
            </div>
            <button type="button" onClick={openLoginPanel}>
              로그인 후 예약 확인
            </button>
          </div>

          <section className="booking-guide-steps" aria-labelledby="booking-guide-steps-title">
            <h2 id="booking-guide-steps-title">온라인 처리 절차</h2>
            <ol>
              {content.steps.map((step, index) => (
                <li key={step}>
                  <span>{index + 1}</span>
                  <strong>{step}</strong>
                </li>
              ))}
            </ol>
          </section>

          <section className="booking-guide-details" aria-labelledby="booking-guide-details-title">
            <h2 id="booking-guide-details-title">확인해 주세요</h2>
            <div className="booking-guide-details__list">
              {visibleGuides.map((item) => (
                <article key={item.title}>
                  <h3>{item.title}</h3>
                  <p>{item.content}</p>
                </article>
              ))}
            </div>

            <details className="booking-guide-fee">
              <summary>
                <span>{feeGuide.title}</span>
                <ChevronDownIcon size={18} />
              </summary>
              <ul>
                {feeGuide.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </details>
          </section>
        </section>
      </div>
    </main>
  );
}

export default BookingChangeRefund;

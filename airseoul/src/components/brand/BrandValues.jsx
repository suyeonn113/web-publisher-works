import ChatIcon from '../icons/ChatIcon';
import ClockIcon from '../icons/ClockIcon';
import PlaneTakeoffIcon from '../icons/PlaneTakeoffIcon';

const BRAND_VALUES = [
  {
    id: 'reliable',
    number: '01',
    title: '정시성과 안전성',
    description: '고객의 안전을 가장 먼저 생각하며, 믿을 수 있는 운항과 정시 도착을 목표로 합니다.',
    tags: ['정시 도착', '믿을 수 있는 비행'],
    icon: ClockIcon,
  },
  {
    id: 'diy',
    number: '02',
    title: '여행 D.I.Y',
    description: '합리적인 운임과 필요한 서비스만 선택하는 방식으로 나에게 맞는 여행을 쉽게 설계합니다.',
    tags: ['합리적인 운임', '맞춤 서비스', '차별화 노선'],
    icon: PlaneTakeoffIcon,
  },
  {
    id: 'service',
    number: '03',
    title: '고객 서비스 A/S',
    description: '여행 전 과정에서 고객의 목소리를 듣고, 피드백을 빠르게 반영하며 서비스를 개선합니다.',
    tags: ['고객 맞춤 케어', '빠른 피드백'],
    icon: ChatIcon,
  },
];

export default function BrandValues() {
  return (
    <section className="brand-values" aria-labelledby="brand-values-title">
      <header>
        <span>TRAVEL EXPERIENCE</span>
        <h2 id="brand-values-title">에어서울과 함께하는 여행 경험</h2>
      </header>

      <ol>
        {BRAND_VALUES.map((value) => {
          const ValueIcon = value.icon;

          return (
            <li key={value.id}>
              <div className="brand-values__icon">
                <ValueIcon size={30} />
              </div>
              <small>{value.number}</small>
              <h3>{value.title}</h3>
              <p>{value.description}</p>
              <div className="brand-values__tags">
                {value.tags.map((tag) => <span key={tag}>#{tag}</span>)}
              </div>
            </li>
          );
        })}
      </ol>
    </section>
  );
}

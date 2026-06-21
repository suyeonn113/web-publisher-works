import { useState } from 'react';
import ClockIcon from '../../icons/ClockIcon';
import ChevronRightIcon from '../../icons/ChevronRightIcon';
import GlobeIcon from '../../icons/GlobeIcon';
import LuggageIcon from '../../icons/LuggageIcon';
import SmartPhoneIcon from '../../icons/SmartPhoneIcon';
import FlightCheckInPanel from './FlightCheckInPanel';
import AirportCheckInGuide from './guides/AirportCheckInGuide';
import CityTerminalGuide from './guides/CityTerminalGuide';
import SelfBagDropGuide from './guides/SelfBagDropGuide';
import CheckInProcessFlow from './guides/CheckInProcessFlow';
import BoardingPassSamples from './guides/BoardingPassSamples';
import { CHECK_IN_TABS } from './guides/checkInGuideData';

const ONLINE_CHECK_IN_IMAGE_PATH = `${import.meta.env.BASE_URL}images/check-in/online`;

const CHECK_IN_STEPS = [
  {
    label: '예약 조회',
    description: '예약번호와 탑승객 정보를 입력합니다.',
    image: `${ONLINE_CHECK_IN_IMAGE_PATH}/step-01.png`,
  },
  {
    label: '탑승객 · 좌석 선택',
    description: '탑승객과 원하는 좌석을 확인합니다.',
    image: `${ONLINE_CHECK_IN_IMAGE_PATH}/step-02.png`,
  },
  {
    label: '탑승권 발급',
    description: '모바일 탑승권을 발급하고 저장합니다.',
    image: `${ONLINE_CHECK_IN_IMAGE_PATH}/step-03.png`,
  },
  {
    label: '공항 수속',
    description: '수하물 위탁 후 보안 검색대로 이동합니다.',
    image: `${ONLINE_CHECK_IN_IMAGE_PATH}/step-04.png`,
  },
];

const AIRPORT_GUIDES = [
  {
    id: 'boarding-pass',
    title: '모바일 탑승권',
    description: '탑승권을 기기에 미리 저장하고 이름, 편명과 탑승 시간을 확인해 주세요.',
    icon: SmartPhoneIcon,
  },
  {
    id: 'baggage',
    title: '위탁 수하물',
    description: '위탁 수하물이 있다면 공항 수하물 위탁 카운터를 방문해야 합니다.',
    icon: LuggageIcon,
  },
  {
    id: 'documents',
    title: '국제선 여행 서류',
    description: '여권과 비자 등 목적지에서 요구하는 서류를 준비해 주세요.',
    icon: GlobeIcon,
  },
  {
    id: 'deadline',
    title: '탑승 마감 시간',
    description: '공항별 마감 시간이 다르므로 보안 검색과 이동 시간을 고려해 일찍 도착해 주세요.',
    icon: ClockIcon,
  },
];

const RESTRICTED_GROUPS = [
  '유아 동반 승객과 혼자 여행하는 어린이 등 별도 확인이 필요한 경우',
  '휠체어 이용 등 공항 직원의 지원이 필요한 경우',
  '반려동물, 추가 좌석 또는 특수 수하물을 신청한 경우',
  '공동운항편이거나 여행 서류 확인이 필요한 경우',
];

function FlightCheckInDetailContent() {
  const [activeTab, setActiveTab] = useState('online');

  return (
    <div className="flight-check-in-detail">
      <div className="information-tabs" role="tablist" aria-label="체크인 안내">
        {CHECK_IN_TABS.map((tab) => (
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === tab.id}
            className={activeTab === tab.id ? 'is-active' : ''}
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === 'airport' && <AirportCheckInGuide />}
      {activeTab === 'city' && <CityTerminalGuide />}
      {activeTab === 'bag-drop' && <SelfBagDropGuide />}
      {activeTab === 'online' && (
        <>
          <div className="flight-check-in-detail__lookup">
            <div className="flight-check-in-detail__intro">
              <h2>온라인 체크인</h2>
              <p>탑승권을 미리 발급받고 공항에서의 수속 시간을 줄여보세요.</p>
            </div>

            <FlightCheckInPanel />
          </div>

          <section
            className="flight-check-in-detail__times"
            aria-labelledby="check-in-time-title"
          >
            <h2 id="check-in-time-title">이용 가능 시간</h2>
            <div>
              <article>
                <ClockIcon size={32} />
                <div>
                  <h3>국내선</h3>
                  <p>
                    <span>출발 24시간 전부터</span>
                    <strong>30분 전까지</strong>
                  </p>
                </div>
              </article>
              <article>
                <ClockIcon size={32} />
                <div>
                  <h3>국제선</h3>
                  <p>
                    <span>출발 24시간 전부터</span>
                    <strong>1시간 30분 전까지</strong>
                  </p>
                </div>
              </article>
            </div>
            <p>노선과 공항 운영 상황에 따라 이용 시간이 달라질 수 있습니다.</p>
          </section>

          <section
            className="flight-check-in-detail__steps"
            aria-labelledby="check-in-steps-title"
          >
            <h2 id="check-in-steps-title">이용 절차</h2>
            <CheckInProcessFlow items={CHECK_IN_STEPS} />
          </section>

          <BoardingPassSamples />

          <section
            className="flight-check-in-detail__airport"
            aria-labelledby="check-in-airport-title"
          >
            <div className="flight-check-in-detail__section-header">
              <h2 id="check-in-airport-title">탑승권 발급 후 공항에서</h2>
              <button type="button" onClick={() => setActiveTab('airport')}>
                <span>공항 체크인 자세히 보기</span>
                <ChevronRightIcon size={16} />
              </button>
            </div>
            <div>
              {AIRPORT_GUIDES.map((guide) => {
                const GuideIcon = guide.icon;

                return (
                  <article key={guide.id}>
                    <GuideIcon size={24} />
                    <div>
                      <h3>{guide.title}</h3>
                      <p>{guide.description}</p>
                    </div>
                  </article>
                );
              })}
            </div>
          </section>

          <section
            className="flight-check-in-detail__confirm"
            aria-labelledby="check-in-confirm-title"
          >
            <h2 id="check-in-confirm-title">체크인 전 확인해 주세요</h2>
            <div>
              <div>
                <div className="flight-check-in-detail__confirm-heading">
                  <h3>온라인 체크인이 제한될 수 있는 경우</h3>
                  <button type="button" onClick={() => setActiveTab('airport')}>
                    <span>제한 대상 안내 보기</span>
                    <ChevronRightIcon size={14} />
                  </button>
                </div>
                <ul>
                  {RESTRICTED_GROUPS.map((group) => (
                    <li key={group}>{group}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h3>유의사항</h3>
                <ul>
                  <li>공항과 노선에 따라 모바일 탑승권 사용이 제한될 수 있습니다.</li>
                  <li>탑승권 정보와 여권의 영문 이름이 일치하는지 확인해 주세요.</li>
                  <li>탑승구 변경 여부를 공항 안내 화면과 방송에서 확인해 주세요.</li>
                </ul>
              </div>
            </div>
          </section>
        </>
      )}
    </div>
  );
}

export default FlightCheckInDetailContent;

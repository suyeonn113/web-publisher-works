import CheckInGuidePanel from './CheckInGuidePanel';
import CheckInProcessFlow from './CheckInProcessFlow';
import { CITY_PROCESS } from './checkInGuideData';

export default function CityTerminalGuide() {
  return (
    <CheckInGuidePanel
      className="city-terminal-guide"
      title="서울역 도심공항터미널"
      description="인천공항 출발 전에 탑승 수속, 수하물 위탁과 출국 심사를 진행할 수 있습니다."
    >
      <div className="check-in-guide__info-grid">
        <section>
          <h3>이용 대상</h3>
          <ul>
            <li>당일 인천공항 출발 에어서울 국제선 승객</li>
            <li>서울역에서 인천공항 직통열차를 이용하는 승객</li>
          </ul>
        </section>

        <section>
          <h3>위치와 마감 시간</h3>
          <ul>
            <li>서울역 지하 2층 도심공항터미널</li>
            <li>항공기 출발 3시간 20분 전 탑승 수속 마감</li>
            <li>운영 시간은 당일 터미널 안내를 우선 확인</li>
          </ul>
        </section>
      </div>

      <section className="city-terminal-guide__process">
        <h3>이용 절차</h3>
        <CheckInProcessFlow items={CITY_PROCESS} />
      </section>

      <section className="check-in-guide__notice">
        <h3>이용이 제한되는 경우</h3>
        <ul>
          <li>공동운항편 또는 도심공항터미널 수속 제외 노선</li>
          <li>휠체어 이용 등 직원의 별도 지원이 필요한 승객</li>
          <li>장변 합계 155cm를 초과하는 대형·특수 수하물 위탁</li>
        </ul>
      </section>
    </CheckInGuidePanel>
  );
}

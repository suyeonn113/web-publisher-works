import CheckInGuidePanel from './CheckInGuidePanel';
import CheckInProcessFlow from './CheckInProcessFlow';
import { AIRPORT_PROCESS } from './checkInGuideData';

export default function AirportCheckInGuide() {
  return (
    <CheckInGuidePanel
      className="airport-check-in-guide"
      title="공항 체크인"
      description="공항 도착부터 항공기 탑승까지 필요한 수속 절차입니다."
    >
      <section className="airport-check-in-guide__process">
        <h3>공항 탑승 수속 절차</h3>
        <CheckInProcessFlow items={AIRPORT_PROCESS} />
      </section>

      <div className="airport-check-in-guide__key-info">
        <section className="airport-check-in-guide__documents">
          <h3>필수 준비 서류</h3>
          <ul>
            <li>
              <strong>국제선</strong>
              <span>유효한 여권, 필요한 비자, 전자항공권</span>
            </li>
            <li>
              <strong>국내선</strong>
              <span>탑승객 본인의 유효한 신분증</span>
            </li>
            <li>
              <strong>여권 확인</strong>
              <span>목적지 입국 기준에 맞는 유효기간과 서명</span>
            </li>
          </ul>
        </section>

        <section className="airport-check-in-guide__deadline">
          <h3>체크인 마감</h3>
          <ul>
            <li>
              <strong>김포 · 제주</strong>
              <span>출발 30분 전</span>
            </li>
            <li>
              <strong>인천</strong>
              <span>출발 60분 전</span>
            </li>
            <li>
              <strong>일부 해외 공항</strong>
              <span>출발 40~50분 전</span>
            </li>
          </ul>
        </section>
      </div>

      <section className="airport-check-in-guide__boarding">
        <h3>탑승 마감</h3>
        <p>
          <strong>
            국제선은 출발 25~30분 전, 국내선은 출발 20분 전부터 탑승을 시작합니다.
          </strong>{' '}
          공항 안내 화면에 표시된 탑승구와 마감 시간을 우선 확인해 주세요.
        </p>
      </section>
    </CheckInGuidePanel>
  );
}

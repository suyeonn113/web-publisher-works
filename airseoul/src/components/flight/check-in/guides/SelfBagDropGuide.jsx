import CheckInGuidePanel from './CheckInGuidePanel';
import CheckInProcessFlow from './CheckInProcessFlow';
import { BAG_DROP_PROCESS } from './checkInGuideData';

export default function SelfBagDropGuide() {
  return (
    <CheckInGuidePanel
      className="self-bag-drop-guide"
      title="셀프 백드롭"
      description="체크인을 완료한 승객이 공항 카운터 대기 없이 직접 수하물을 위탁하는 서비스입니다."
    >
      <div className="check-in-guide__info-grid">
        <section>
          <h3>이용 대상</h3>
          <ul>
            <li>웹·모바일·키오스크에서 체크인을 완료한 승객</li>
            <li>유효한 탑승권과 여권을 소지한 국제선 승객</li>
            <li>항공사 규격에 맞는 일반 수하물을 위탁하는 승객</li>
          </ul>
        </section>

        <section>
          <h3>위치와 이용 시간</h3>
          <ul>
            <li>인천국제공항 제2여객터미널 3층 F 카운터 인근</li>
            <li>기기 운영 시간과 수속 마감은 출발 당일 공항 안내를 확인</li>
          </ul>
        </section>
      </div>

      <section className="self-bag-drop-guide__process">
        <h3>이용 절차</h3>
        <CheckInProcessFlow items={BAG_DROP_PROCESS} />
      </section>

      <section className="check-in-guide__notice">
        <h3>이용이 제한되는 경우</h3>
        <ul>
          <li>연결 구간이 있거나 공동운항편을 이용하는 승객</li>
          <li>초과·특수 수하물, 유아용품 또는 반려동물을 위탁하는 경우</li>
          <li>직원의 확인이나 별도 지원이 필요한 승객</li>
        </ul>
      </section>
    </CheckInGuidePanel>
  );
}

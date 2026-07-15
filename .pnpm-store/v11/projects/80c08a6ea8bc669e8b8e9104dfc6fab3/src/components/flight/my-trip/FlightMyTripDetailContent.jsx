import { UI_EVENTS } from '../../../constants/uiEvents';
import FlightMyTripPanel from './FlightMyTripPanel';

const LOOKUP_NOTICES = [
  '예약번호와 탑승객 성명은 항공권에 표시된 정보와 동일하게 입력해 주세요.',
  '성명은 띄어쓰기와 하이픈을 제외하고 정확하게 입력해야 조회할 수 있습니다.',
  '출발일이 지난 여정과 여행사를 통한 단체 항공권은 온라인 조회가 제한될 수 있습니다.',
  '부가서비스 신청 내역은 예약센터 또는 예약한 여행사에서 확인해 주세요.',
];

function FlightMyTripDetailContent() {
  const openLoginPanel = () => {
    window.dispatchEvent(new CustomEvent(UI_EVENTS.OPEN_LOGIN_PANEL));
  };

  return (
    <div className="flight-my-trip-detail">
      <div className="flight-my-trip-detail__tabs" aria-label="예약 조회 유형">
        <button type="button" onClick={openLoginPanel}>
          홈페이지 예약 조회
        </button>
        <button className="is-active" type="button" aria-current="page">
          여행사 / 예약센터 / 공항 예약 조회
        </button>
      </div>

      <div className="flight-my-trip-detail__body">
        <p className="flight-my-trip-detail__intro">
          여행사, 예약센터 또는 공항에서 예약한 내역을 조회할 수 있습니다.
        </p>

        <FlightMyTripPanel />

        <aside className="flight-my-trip-detail__notice" aria-label="예약 조회 안내">
          <h3>안내사항</h3>
          <ul>
            {LOOKUP_NOTICES.map((notice) => (
              <li key={notice}>{notice}</li>
            ))}
          </ul>
        </aside>
      </div>
    </div>
  );
}

export default FlightMyTripDetailContent;

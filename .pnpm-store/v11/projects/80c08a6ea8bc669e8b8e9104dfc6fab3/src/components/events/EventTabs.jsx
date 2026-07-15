export default function EventTabs() {
  return (
    <div className="event-tabs" aria-label="이벤트 상태">
      <button type="button" aria-pressed="true" className="is-active">
        진행중인 이벤트
      </button>
      <button type="button" aria-pressed="false">
        지난 이벤트
      </button>
    </div>
  );
}

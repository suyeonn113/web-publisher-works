export default function EventTabs() {
  return (
    <div className="event-tabs" role="tablist" aria-label="이벤트 상태">
      <button type="button" role="tab" aria-selected="true" className="is-active">
        진행중인 이벤트
      </button>
      <button type="button" role="tab" aria-selected="false">
        지난 이벤트
      </button>
    </div>
  );
}

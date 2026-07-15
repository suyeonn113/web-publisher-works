import { useRef, useState } from 'react';
import { TRIP_TYPES } from '../../../constants/tripType';
import {
  searchFlights,
  searchFlightsByNumber,
  searchWeeklyFlights,
} from '../../../services/flightSearch';
import FlightSchedulePanel from './FlightSchedulePanel';
import FlightScheduleResults from './FlightScheduleResults';

const DETAIL_SEARCH_TYPES = {
  WEEKLY: 'weekly',
  STATUS: 'status',
  REALTIME: 'realtime',
};

const DETAIL_TABS = [
  { id: DETAIL_SEARCH_TYPES.WEEKLY, label: '스케줄 조회' },
  { id: DETAIL_SEARCH_TYPES.STATUS, label: '출도착 조회' },
  { id: DETAIL_SEARCH_TYPES.REALTIME, label: '실시간 현황' },
];

const DETAIL_NOTICES = {
  [DETAIL_SEARCH_TYPES.WEEKLY]: [
    '항공 스케줄은 정부 인가 조건이며, 스케줄과 기종은 예고 없이 변경될 수 있습니다.',
    '임시편, 비정기편, 제휴 항공사 공동 운항편은 스케줄 조회가 제한될 수 있습니다.',
    '항공편 결항 및 지연 정보는 반영되지 않으므로 정확한 일정은 항공권 예매 시 확인해 주세요.',
    '출도착 시간은 현지 시각 기준이며, +1 표시는 다음 날 도착을 의미합니다.',
  ],
  [DETAIL_SEARCH_TYPES.STATUS]: [
    '오늘을 기준으로 최근 2일간의 에어서울 항공편 출도착 정보를 확인할 수 있습니다.',
    '출도착 일자와 시간은 현지 시각을 기준으로 조회해 주세요.',
    '에어서울 운항편만 조회할 수 있으며, 공동 운항편과 타 항공사 정보는 해당 항공사에서 확인해 주세요.',
  ],
  [DETAIL_SEARCH_TYPES.REALTIME]: [
    '실시간 운항 정보는 공항 사정과 현지 운영 상황에 따라 실제 정보와 차이가 있을 수 있습니다.',
    '탑승 전 공항 안내 방송과 출발 안내 화면을 함께 확인해 주세요.',
  ],
};

function FlightScheduleDetailContent() {
  const [activeTab, setActiveTab] = useState(DETAIL_SEARCH_TYPES.WEEKLY);
  const [searchResult, setSearchResult] = useState(null);
  const tabRefs = useRef([]);
  const panelId = 'flight-schedule-detail-panel';

  const handleTabKeyDown = (event, currentIndex) => {
    const lastIndex = DETAIL_TABS.length - 1;
    let nextIndex;

    if (event.key === 'ArrowRight') nextIndex = currentIndex === lastIndex ? 0 : currentIndex + 1;
    if (event.key === 'ArrowLeft') nextIndex = currentIndex === 0 ? lastIndex : currentIndex - 1;
    if (event.key === 'Home') nextIndex = 0;
    if (event.key === 'End') nextIndex = lastIndex;
    if (nextIndex === undefined) return;

    event.preventDefault();
    setActiveTab(DETAIL_TABS[nextIndex].id);
    setSearchResult(null);
    tabRefs.current[nextIndex]?.focus();
  };

  const handleTabChange = (nextTab) => {
    setActiveTab(nextTab);
    setSearchResult(null);
  };

  const handleSearch = (criteria) => {
    if (criteria.searchType === DETAIL_SEARCH_TYPES.WEEKLY) {
      const outbound = searchWeeklyFlights({
        from: criteria.from,
        to: criteria.to,
        startDate: criteria.departureDate,
      });
      const inbound = criteria.tripType === TRIP_TYPES.ROUND_TRIP
        ? searchWeeklyFlights({
            from: criteria.to,
            to: criteria.from,
            startDate: criteria.returnDate,
          })
        : null;

      setSearchResult({ type: DETAIL_SEARCH_TYPES.WEEKLY, outbound, inbound });
      return;
    }

    const flights = criteria.routeType === 'flightNo'
      ? searchFlightsByNumber({
          flightNo: criteria.flightNo,
          departureDate: criteria.departureDate,
        })
      : searchFlights({
          from: criteria.from,
          to: criteria.to,
          departureDate: criteria.departureDate,
        });

    setSearchResult({ type: DETAIL_SEARCH_TYPES.STATUS, flights });
  };

  const noticeContent = (
    <aside className="flight-schedule-detail__notice" aria-label="조회 안내">
      <h3>안내사항</h3>
      <ul>
        {DETAIL_NOTICES[activeTab].map((notice) => (
          <li key={notice}>{notice}</li>
        ))}
      </ul>
    </aside>
  );

  return (
    <div className="flight-schedule-detail">
      <div className="flight-schedule-detail__tabs" role="tablist" aria-label="운항 정보 조회">
        {DETAIL_TABS.map((tab, index) => (
          <button
            aria-controls={panelId}
            aria-selected={activeTab === tab.id}
            className={activeTab === tab.id ? 'is-active' : ''}
            id={`flight-schedule-tab-${tab.id}`}
            key={tab.id}
            onClick={() => handleTabChange(tab.id)}
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

      <div
        aria-labelledby={`flight-schedule-tab-${activeTab}`}
        id={panelId}
        role="tabpanel"
      >
        <FlightSchedulePanel
          activeSearchType={activeTab}
          onSearchTypeChange={handleTabChange}
          onSubmit={handleSearch}
          resultsContent={<FlightScheduleResults result={searchResult} />}
          showSearchTypeControls={false}
          supplementaryContent={noticeContent}
        />
      </div>
    </div>
  );
}

export default FlightScheduleDetailContent;

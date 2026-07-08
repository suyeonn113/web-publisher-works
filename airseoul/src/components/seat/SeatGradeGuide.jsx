import { useRef, useState } from 'react';
import { getRovingTabNextIndex } from '../../utils/rovingTab';
import { SEAT_GRADE_GROUPS } from './seatGuideData';

function ZoneTitle({ zone }) {
  return (
    <>
      <strong>{zone.grade}</strong>
      {zone.detail && <span>({zone.detail})</span>}
    </>
  );
}

function SeatGradeDetails({ group }) {
  return (
    <dl>
      {group.zones.map((zone) => (
        <div key={`${group.id}-${zone.grade}-${zone.detail}`}>
          <dt><ZoneTitle zone={zone} /></dt>
          <dd>{zone.seats}</dd>
        </div>
      ))}
    </dl>
  );
}

export default function SeatGradeGuide() {
  const [activeGroupId, setActiveGroupId] = useState(SEAT_GRADE_GROUPS[0].id);
  const tabRefs = useRef([]);
  const activeGroup = SEAT_GRADE_GROUPS.find((group) => group.id === activeGroupId);

  const handleTabKeyDown = (event, currentIndex) => {
    const nextIndex = getRovingTabNextIndex(event, currentIndex, SEAT_GRADE_GROUPS.length);
    if (nextIndex === null) return;

    event.preventDefault();
    setActiveGroupId(SEAT_GRADE_GROUPS[nextIndex].id);
    tabRefs.current[nextIndex]?.focus();
  };

  return (
    <section className="seat-guide-panel seat-grade-guide">
      <header>
        <h2>좌석 구분 및 등급</h2>
        <p>2024년 6월 27일 기준이며, 운항 기종과 좌석 배치에 따라 좌석 구역이 다르게 적용됩니다.</p>
      </header>

      <div className="seat-grade-table">
        <table>
          <caption>기종별 좌석 구역과 해당 좌석 번호</caption>
          <thead>
            <tr>
              {SEAT_GRADE_GROUPS.map((group) => (
                <th colSpan={group.zones.length} key={group.id}>{group.aircraft}</th>
              ))}
            </tr>
            <tr>
              {SEAT_GRADE_GROUPS.flatMap((group) => (
                group.zones.map((zone) => (
                  <th key={`${group.id}-${zone.grade}-${zone.detail}`}>
                    <ZoneTitle zone={zone} />
                  </th>
                ))
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              {SEAT_GRADE_GROUPS.flatMap((group) => (
                group.zones.map((zone) => (
                  <td key={`${group.id}-${zone.grade}-${zone.detail}`}>{zone.seats}</td>
                ))
              ))}
            </tr>
          </tbody>
        </table>
      </div>

      <div className="seat-grade-cards">
        {SEAT_GRADE_GROUPS.map((group) => (
          <article key={group.id}>
            <h3>{group.aircraft}</h3>
            <SeatGradeDetails group={group} />
          </article>
        ))}
      </div>

      <div className="seat-grade-mobile">
        <div className="seat-grade-mobile__tabs" role="tablist" aria-label="항공기 좌석 수 선택">
          {SEAT_GRADE_GROUPS.map((group, index) => (
            <button
              type="button"
              role="tab"
              id={`seat-grade-tab-${group.id}`}
              aria-controls="seat-grade-mobile-panel"
              aria-selected={activeGroupId === group.id}
              tabIndex={activeGroupId === group.id ? 0 : -1}
              className={activeGroupId === group.id ? 'is-active' : ''}
              key={group.id}
              onClick={() => setActiveGroupId(group.id)}
              onKeyDown={(event) => handleTabKeyDown(event, index)}
              ref={(element) => {
                tabRefs.current[index] = element;
              }}
            >
              {group.aircraft}
            </button>
          ))}
        </div>
        <article
          className="seat-grade-mobile__panel"
          id="seat-grade-mobile-panel"
          role="tabpanel"
          aria-labelledby={`seat-grade-tab-${activeGroup.id}`}
        >
          <SeatGradeDetails group={activeGroup} />
        </article>
      </div>
    </section>
  );
}

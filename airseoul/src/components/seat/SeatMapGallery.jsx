import { useState } from 'react';
import { SEAT_MAPS } from './seatGuideData';

export default function SeatMapGallery() {
  const [activeMapId, setActiveMapId] = useState(SEAT_MAPS[0].id);
  const activeMap = SEAT_MAPS.find((map) => map.id === activeMapId);
  return <section className="seat-guide-panel"><header><h2>항공기별 좌석 배치도</h2><p>기종을 선택해 좌석 위치를 확인하세요. 실제 운항 기종은 변경될 수 있습니다.</p></header><div className="seat-map-tabs" aria-label="항공기 기종">{SEAT_MAPS.map((map) => <button type="button" aria-pressed={activeMapId === map.id} className={activeMapId === map.id ? 'is-active' : ''} key={map.id} onClick={() => setActiveMapId(map.id)}>{map.label}</button>)}</div><div className="seat-map-list"><figure><figcaption>{activeMap.label}</figcaption><div className="seat-map-image"><img src={activeMap.src} alt={`${activeMap.label} 좌석 배치도`} /></div></figure></div></section>;
}

import { useState } from 'react';

export default function AirportCongestionPanel() {
  const [type, setType] = useState('departure');

  return (
    <div className="information-sections">
      <header>
        <h2>공항 혼잡도</h2>
        <p>출발 공항의 예상 혼잡 정보를 확인하고 여유롭게 이동해 주세요.</p>
      </header>

      <div className="information-subtabs">
        <button
          type="button"
          className={type === 'departure' ? 'is-active' : ''}
          onClick={() => setType('departure')}
        >
          출국장 혼잡도
        </button>
        <button
          type="button"
          className={type === 'parking' ? 'is-active' : ''}
          onClick={() => setType('parking')}
        >
          주차장 혼잡도
        </button>
      </div>

      <section>
        <h3>출발 공항 선택</h3>
        <select defaultValue="ICN">
          <option value="ICN">인천국제공항</option>
          <option value="GMP">김포국제공항</option>
          <option value="CJU">제주국제공항</option>
        </select>
      </section>

      <section>
        <h3>{type === 'departure' ? '출국장 예상 혼잡도' : '주차장 예상 혼잡도'}</h3>
        <p>기준 시각과 혼잡 상태가 표시될 영역입니다. 실시간 데이터는 추후 연결합니다.</p>
        <ul>
          <li>원활</li>
          <li>보통</li>
          <li>혼잡</li>
          <li>매우 혼잡</li>
        </ul>
      </section>

      <aside>
        <p>예상 정보는 실제 공항 상황과 다를 수 있으므로 충분한 여유 시간을 확보해 주세요.</p>
      </aside>
    </div>
  );
}

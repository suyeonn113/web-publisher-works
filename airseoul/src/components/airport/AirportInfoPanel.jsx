const REGIONS = [
  { region: '한국', airports: '인천(ICN), 김포(GMP), 제주(CJU)' },
  {
    region: '동북아',
    airports: '도쿄/나리타(NRT), 오사카/간사이(KIX), 다카마쓰(TAK), 요나고(YGJ), 후쿠오카(FUK)',
  },
  { region: '동남아', airports: '다낭(DAD), 나트랑(CXR), 보홀(TAG)' },
  { region: '대양주', airports: '괌(GUM)' },
];

export default function AirportInfoPanel() {
  return (
    <div className="information-sections">
      <header>
        <h2>취항지 공항정보</h2>
        <p>공항별 터미널, 체크인 카운터와 마감 시간을 확인할 수 있습니다.</p>
      </header>

      <section>
        <h3>지역별 공항</h3>
        <div className="information-table">
          {REGIONS.map((item) => (
            <div key={item.region}>
              <strong>{item.region}</strong>
              <span>{item.airports}</span>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h3>공항 상세 정보</h3>
        <label>
          공항 선택
          <select defaultValue="ICN">
            <option value="ICN">인천국제공항</option>
            <option value="GMP">김포국제공항</option>
            <option value="CJU">제주국제공항</option>
            <option value="NRT">도쿄 나리타국제공항</option>
            <option value="KIX">오사카 간사이국제공항</option>
          </select>
        </label>
        <ul>
          <li>터미널 및 체크인 카운터 위치</li>
          <li>카운터 운영 시작·마감 시간</li>
          <li>공항 주소와 공식 홈페이지</li>
          <li>시차, 공항세와 여권 관련 참고사항</li>
        </ul>
      </section>
    </div>
  );
}

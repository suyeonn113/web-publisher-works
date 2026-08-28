export const airportGroups = [
  {
    region: '대한민국',
    airports: [
      { code: 'ICN', city: '서울', airport: '인천' },
      { code: 'GMP', city: '서울', airport: '김포' },
      { code: 'CJU', city: '제주', airport: '제주' },
    ],
  },
  {
    region: '동북아시아',
    airports: [
      { code: 'NRT', city: '도쿄', airport: '나리타' },
      { code: 'KIX', city: '오사카', airport: '간사이' },
      { code: 'FUK', city: '후쿠오카', airport: '후쿠오카' },
      { code: 'TAK', city: '다카마쓰', airport: '다카마쓰' },
      { code: 'YGJ', city: '돗토리/요나고', airport: '요나고' },
      { code: 'DYG', city: '장자제', airport: '장자제' },
    ],
  },
  {
    region: '동남아시아',
    airports: [
      { code: 'DAD', city: '다낭', airport: '다낭' },
      { code: 'CXR', city: '나트랑', airport: '깜란' },
    ],
  },
];

export const airports = airportGroups.flatMap((group) => group.airports);

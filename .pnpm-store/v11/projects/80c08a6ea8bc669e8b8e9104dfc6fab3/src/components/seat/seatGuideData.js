const SEAT_IMAGE_PATH = `${import.meta.env.BASE_URL}images/seats`;

export const SEAT_TABS = [
  { id: 'guide', label: '사전 좌석 구매' },
  { id: 'adjacent', label: '옆 좌석 구매' },
];

export const SEAT_ZONES = [
  { name: 'MINT ZONE', detail: '1열 및 비상구 좌석', description: '앞 공간이 넓거나 빠른 이동이 가능한 선호 좌석' },
  { name: 'MINT ZONE', detail: '2~3열', description: '항공기 앞쪽에 위치해 빠르게 내릴 수 있는 좌석' },
  { name: 'A구역', detail: '전방 일반 좌석', description: '항공기 앞쪽과 중앙에 위치한 일반 좌석' },
  { name: 'B구역', detail: '후방 일반 좌석', description: '합리적인 가격으로 선택할 수 있는 일반 좌석' },
];

export const SEAT_GRADE_GROUPS = [
  {
    id: '195',
    aircraft: '195석',
    zones: [
      { grade: 'MINT ZONE', detail: '1열 및 비상구', seats: '1열, 10열, 22열, 23F' },
      { grade: 'MINT ZONE', detail: '2~3열', seats: '2~3열' },
      { grade: 'A구역', detail: '', seats: '4~9열' },
      { grade: 'B구역', detail: '', seats: '11~21열, 23ABCDE, 24~34열' },
    ],
  },
  {
    id: '220a',
    aircraft: '220석(A)',
    zones: [
      { grade: 'MINT ZONE', detail: '1열 및 비상구', seats: '1열, 11열, 12AF, 27열' },
      { grade: 'MINT ZONE', detail: '2~3열', seats: '2~3열' },
      { grade: 'A구역', detail: '', seats: '4~10열' },
      { grade: 'B구역', detail: '', seats: '12BCDE, 14~26열, 28~39열' },
    ],
  },
  {
    id: '220b',
    aircraft: '220석(B)',
    zones: [
      {
        grade: 'MINT ZONE',
        detail: '1열 및 비상구',
        seats: '1열, 2ABC, 11열, 12F, 26BC, 27ADE, 28F',
      },
      { grade: 'MINT ZONE', detail: '2~3열', seats: '2~3열(2ABC 제외)' },
      { grade: 'A구역', detail: '', seats: '4~10열' },
      {
        grade: 'B구역',
        detail: '',
        seats: '12ABCDE, 14~25열, 26DE, 27BC, 28ABCDE, 29~39열',
      },
    ],
  },
];

export const SEAT_MAPS = [
  {
    id: '195',
    label: 'A321-200 · 195석',
    src: `${SEAT_IMAGE_PATH}/a321-200-195.png`,
  },
  {
    id: '220a',
    label: 'A321-200 · 220석 A형',
    src: `${SEAT_IMAGE_PATH}/a321-200-220a.png`,
  },
  {
    id: '220b',
    label: 'A321-200 · 220석 B형',
    src: `${SEAT_IMAGE_PATH}/a321-200-220b.png`,
  },
];

export const ADVANCE_SEAT_PRICES = [
  ['국내선', '12,000원', '7,000원', '4,000원', '2,000원'],
  ['일본', '17,000원', '10,000원', '7,000원', '4,000원'],
  ['중국 · 홍콩', '26,000원', '14,000원', '9,000원', '5,000원'],
  ['동남아 · 괌', '40,000원', '20,000원', '12,000원', '7,000원'],
];

export const ADJACENT_SEAT_PRICES = [
  ['국내선', '10,000원', '20,000원'], ['일본', '15,000원', '30,000원'],
  ['중국 · 홍콩', '25,000원', '50,000원'], ['동남아 · 괌', '30,000원', '60,000원'],
];

export const SEAT_RULES = [
  '항공편 출발 24시간 전까지 구매할 수 있습니다.',
  '여정 변경 시 구매한 좌석은 자동 취소되며, 변경 완료 후 다시 구매해야 합니다.',
  '출발 24시간 이내 변경 또는 취소 시 좌석 구매 금액은 환불되지 않을 수 있습니다.',
  '공동운항편과 제휴 항공사 운항편은 사전 좌석 구매가 제한됩니다.',
  '항공기 교체 시 기종과 배정 좌석이 예고 없이 변경 또는 취소될 수 있습니다.',
];

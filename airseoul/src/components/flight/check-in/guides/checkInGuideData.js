const CHECK_IN_IMAGE_PATH = `${import.meta.env.BASE_URL}images/check-in`;

export const CHECK_IN_TABS = [
  { id: 'online', label: '온라인 체크인' },
  { id: 'airport', label: '공항 체크인' },
  { id: 'city', label: '도심공항터미널' },
  { id: 'bag-drop', label: '셀프 백드롭' },
];

export const AIRPORT_PROCESS = [
  {
    label: '공항 도착',
    description: '여권·신분증·전자항공권 준비',
    image: `${CHECK_IN_IMAGE_PATH}/airport/step-01.png`,
  },
  {
    label: '탑승 수속',
    description: '좌석 배정, 탑승권 발급과 수하물 위탁',
    image: `${CHECK_IN_IMAGE_PATH}/airport/step-02.png`,
  },
  {
    label: '검역 · 세관',
    description: '필요한 검역, 병무와 세관 신고',
    image: `${CHECK_IN_IMAGE_PATH}/airport/step-03.png`,
  },
  {
    label: '보안 검색',
    description: '휴대 수하물과 신체 보안 검색',
    image: `${CHECK_IN_IMAGE_PATH}/airport/step-04.png`,
  },
  {
    label: '출국 심사',
    description: '여권과 탑승권 확인',
    image: `${CHECK_IN_IMAGE_PATH}/airport/step-05.png`,
  },
  {
    label: '항공기 탑승',
    description: '탑승구 이동 후 항공기 탑승',
    image: `${CHECK_IN_IMAGE_PATH}/airport/step-06.png`,
  },
];

export const CITY_PROCESS = [
  {
    label: '승차권 구매',
    description: '서울역에서 인천공항 직통열차 승차권 구매',
    image: `${CHECK_IN_IMAGE_PATH}/city-terminal/step-01.png`,
  },
  {
    label: '탑승 수속',
    description: '탑승권 발급과 수하물 위탁',
    image: `${CHECK_IN_IMAGE_PATH}/city-terminal/step-02.png`,
  },
  {
    label: '출국 심사',
    description: '탑승권과 여권 확인',
    image: `${CHECK_IN_IMAGE_PATH}/city-terminal/step-03.png`,
  },
  {
    label: '공항 이동',
    description: '직통열차로 인천공항 이동',
    image: `${CHECK_IN_IMAGE_PATH}/city-terminal/step-04.png`,
  },
  {
    label: '전용 통로',
    description: '인천공항 전용 출국 통로 이용',
    image: `${CHECK_IN_IMAGE_PATH}/city-terminal/step-05.png`,
  },
];

export const BAG_DROP_PROCESS = [
  {
    label: '탑승권 스캔',
    description: '발급된 탑승권 인식',
    image: `${CHECK_IN_IMAGE_PATH}/self-bag-drop/step-01.png`,
  },
  {
    label: '여권 확인',
    description: '탑승객 여권 정보 확인',
    image: `${CHECK_IN_IMAGE_PATH}/self-bag-drop/step-02.png`,
  },
  {
    label: '수하물 확인',
    description: '수하물 규격과 제한 물품 확인',
    image: `${CHECK_IN_IMAGE_PATH}/self-bag-drop/step-03.png`,
  },
  {
    label: '태그 발행',
    description: '수하물 태그와 확인증 발행',
    image: `${CHECK_IN_IMAGE_PATH}/self-bag-drop/step-04.png`,
  },
  {
    label: '태그 부착',
    description: '수하물에 태그를 부착해 투입',
    image: `${CHECK_IN_IMAGE_PATH}/self-bag-drop/step-05.png`,
  },
  {
    label: '위탁 완료',
    description: '수하물 위탁 확인증 보관',
    image: `${CHECK_IN_IMAGE_PATH}/self-bag-drop/step-06.png`,
  },
];

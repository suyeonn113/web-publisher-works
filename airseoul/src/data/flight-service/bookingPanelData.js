export const PANEL_TYPES = {
  FROM: 'from',
  TO: 'to',
  DATE: 'date',
  PASSENGERS: 'passengers',
};

export const POPUP_WIDTHS = {
  [PANEL_TYPES.DATE]: 960,
  [PANEL_TYPES.PASSENGERS]: 720,
  DEFAULT: 520,
};

export const MIN_BIRTH_YEAR = 1900;

export const AGE_CALCULATOR_PLACEHOLDERS = {
  year: { label: '년', value: '' },
  month: { label: '월', value: '' },
  day: { label: '일', value: '' },
};

export const PASSENGER_TYPES = [
  { key: 'adult', label: '성인', min: 1 },
  { key: 'child', label: '소아', min: 0 },
  { key: 'infant', label: '유아', min: 0 },
];

export const PASSENGER_NOTICE_GROUPS = [
  {
    title: '소아/유아 및 만 14세 미만 탑승객 안내',
    items: [
      {
        text: '소아는 첫 번째 항공편 출발일 기준 나이입니다. 유아는 각 항공편 탑승일 기준 나이입니다.',
      },
      {
        text: '유아는 생후 7일부터 탑승 가능하며 좌석은 점유하지 않습니다. 또한 탑승일 기준 만 18세 이상의 보호자가 동반해야 하며, 함께 예약되어야 합니다.',
        isAccent: true,
      },
      {
        text: '유아 좌석 점유를 원하시는 경우, 소아로 예매를 진행하시기 바랍니다.',
      },
      {
        text: '만 14세 미만 탑승객은 예매 시 법정대리인의 동의 및 인증이 필요합니다. 로그인 후 예매를 진행하여 주시기 바랍니다.',
        isAccent: true,
      },
    ],
  },
  {
    title: '구매와 동시에 발권 진행 시 유의사항',
    items: [
      {
        text: '마일리지 공제를 위해 등록된 가족 기준으로 탑승객을 선택해 주시기 바랍니다.',
      },
      {
        text: '가족 마일리지 합산은 로그인 회원 본인 1인 예매 시에만 가능합니다.',
      },
    ],
  },
];

export const getDefaultPassengers = (defaultValues) => ({
  adult: Number(defaultValues?.adult) || 1,
  child: Number(defaultValues?.child) || 0,
  infant: Number(defaultValues?.infant) || 0,
});

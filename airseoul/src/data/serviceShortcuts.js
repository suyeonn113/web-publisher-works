import { ROUTES } from '../constants/routes';

export const serviceShortcuts = [
  {
    id: 'seat',
    label: '사전 좌석 구매',
    description: '원하는 좌석을 미리 선택해 더 편안하게 여행하세요.',
    iconSrc: '/images/home-seviceshortcuts/seat.png',
    to: ROUTES.travel.seat,
  },
  {
    id: 'baggage',
    label: '사전 수하물 구매',
    description: '필요한 수하물을 합리적인 혜택으로 준비하세요.',
    iconSrc: '/images/home-seviceshortcuts/baggage.png',
    to: ROUTES.travel.baggage,
  },
  {
    id: 'meal',
    label: '기내식 주문',
    description: '여정에 어울리는 기내식을 미리 만나보세요.',
    iconSrc: '/images/home-seviceshortcuts/meal.png',
    to: ROUTES.travel.meal,
  },
  {
    id: 'duty-free',
    label: '기내 면세품',
    description: '다양한 상품을 합리적인 가격으로 쇼핑하세요.',
    iconSrc: '/images/home-seviceshortcuts/dutyfree.png',
    to: ROUTES.travel.dutyFree,
  },
  {
    id: 'cafe-mint',
    label: 'Cafe Mint',
    description: '기내에서 즐기는 산뜻한 음료와 스낵을 확인하세요.',
    iconSrc: '/images/home-seviceshortcuts/cafemint.png',
    to: ROUTES.travel.cafeMint,
  },
  {
    id: 'insurance',
    label: '여행자 보험',
    description: '예상치 못한 상황까지 든든하게 준비하세요.',
    iconSrc: '/images/home-seviceshortcuts/insurance.png',
    to: ROUTES.travel.insurance,
  },
];

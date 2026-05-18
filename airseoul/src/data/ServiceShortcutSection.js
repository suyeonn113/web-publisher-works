import { ROUTES } from '../constants/routes';

export const serviceShortcuts = [
  {
    id: 'seat',
    label: '사전 좌석 구매',
    image: '/images/services/seat.png',
    to: ROUTES.service.seat,
  },

  {
    id: 'baggage',
    label: '사전 수하물 구매',
    image: '/images/services/baggage.png',
    to: ROUTES.service.baggage,
  },

  {
    id: 'meal',
    label: '기내식 주문',
    image: '/images/services/meal.png',
    to: ROUTES.service.meal,
  },

  {
    id: 'duty-free',
    label: '기내 면세품',
    image: '/images/services/duty-free.png',
    to: ROUTES.service.dutyFree,
  },

  {
    id: 'cafe-mint',
    label: 'Café Mint',
    image: '/images/services/cafe-mint.png',
    to: ROUTES.service.cafeMint,
  },

  {
    id: 'insurance',
    label: '여행자 보험',
    image: '/images/services/insurance.png',
    to: ROUTES.service.insurance,
  },
];
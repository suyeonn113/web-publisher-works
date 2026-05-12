import { ROUTES } from '../constants/routes';

export const utilityNav = [
  {
    id: 'contact',
    label: '문의',
    href: '#',
    children: [
      { id: 'notice', label: '공지사항', href: '#' },
      { id: 'faq', label: '자주 묻는 질문', href: '#' },
      { id: 'inquiry', label: '1:1 문의', href: '#' },
      { id: 'lost', label: '유실물 안내', href: '#' },
    ],
  },

  {
    id: 'login',
    label: '로그인',
    href: '#',
  },

  {
    id: 'language',
    label: '한국어',
    type: 'language',

    children: [
      { id: 'ko', label: '한국어', value: 'ko' },
      { id: 'en', label: 'English', value: 'en' },
      { id: 'zh', label: '中文', value: 'zh' },
      { id: 'ja', label: '日本語', value: 'ja' },
    ],
  },
];

export const mainNav = [
  {
    id: 'booking',
    label: '예약',
    href: '#',

    children: [
      { id: 'booking-flight', label: '항공권 예매', href: '#' },
      { id: 'booking-check', label: '예약 조회', href: '#' },
      { id: 'booking-refund', label: '변경 및 환불', href: '#' },
      { id: 'booking-checkin', label: '체크인', href: '#' },
      { id: 'flight-status', label: '운항 정보', href: '#' },
    ],
  },

  {
    id: 'travel',
    label: '여행 준비',
    href: '#',

    children: [
      { id: 'seat', label: '좌석', href: '#' },
      { id: 'baggage', label: '수하물', href: '#' },
      { id: 'meal', label: '기내식', href: '#' },
      { id: 'insurance', label: '여행 보험', href: '#' },
      { id: 'airport-service', label: '공항 서비스', href: '#' },
      { id: 'travel-support', label: '여행 지원 안내', href: '#' },
    ],
  },

  {
    id: 'service',
    label: '서비스 안내',
    href: '#',

    children: [
      { id: 'cabin-service', label: '기내 서비스', href: '#' },
      { id: 'aircraft', label: '항공기 안내', href: '#' },
      { id: 'group-booking', label: '단체 예약', href: '#' },
      { id: 'documents', label: '증빙 및 서류', href: '#' },
    ],
  },

  {
    id: 'benefit',
    label: '혜택',
    href: '#',

    children: [
      { id: 'event', label: '이벤트', href: '#' },
      { id: 'partnership', label: '제휴 혜택', href: '#' },
      { id: 'membership', label: '멤버십 혜택', href: '#' },
    ],
  },
];
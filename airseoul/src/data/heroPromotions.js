import { ROUTES } from '../constants/routes';

const PROMOTION_IMAGE_PATH = `${import.meta.env.BASE_URL}images/promotion`;

export const heroPromotions = [
  {
    id: 'earlybird',
    title: '에어서울 전 노선 5~8월 얼리버드 프로모션',
    summary: '미리 준비할수록 가벼워지는 국제선 항공 운임',
    image: `${PROMOTION_IMAGE_PATH}/earlybird.jpg`,
    period: '2026.06.15 ~ 2026.06.30',
    bookingPeriod: '2026.06.15 ~ 2026.06.30',
    travelPeriod: '2026.07.01 ~ 2026.08.31',
    benefits: ['에어서울 국제선 대상 특별 운임', '노선별 한정 좌석 선착순 판매'],
  },
  {
    id: 'guam-allinone',
    title: '괌 올인원 패키지 혜택 프로모션',
    summary: '항공권부터 현지 혜택까지 한 번에 준비하는 괌 여행',
    image: `${PROMOTION_IMAGE_PATH}/guam-allinone.jpg`,
    period: '2026.06.01 ~ 2026.08.31',
    bookingPeriod: '2026.06.01 ~ 2026.08.31',
    travelPeriod: '2026.06.15 ~ 2026.09.15',
    benefits: ['괌 노선 특별 운임', '호텔·현지 제휴 혜택 제공'],
  },
  {
    id: 'dutyfree',
    title: '신세계면세점 특별 쇼핑 혜택',
    summary: '에어서울 고객을 위한 여행 전 면세 쇼핑 혜택',
    image: `${PROMOTION_IMAGE_PATH}/dutyfree.jpg`,
    period: '2026.06.01 ~ 2026.08.31',
    bookingPeriod: '2026.06.01 ~ 2026.08.31',
    travelPeriod: '이벤트 기간 내 이용',
    benefits: ['제휴 면세점 할인 혜택', '구매 조건별 추가 혜택'],
  },
  {
    id: 'japan-trip',
    title: '도쿄·오사카·후쿠오카 특가 여행',
    summary: '가까운 일본 인기 도시를 합리적인 운임으로',
    image: `${PROMOTION_IMAGE_PATH}/japan-trip.jpg`,
    period: '2026.06.17 ~ 2026.06.30',
    bookingPeriod: '2026.06.17 ~ 2026.06.30',
    travelPeriod: '2026.07.01 ~ 2026.08.31',
    benefits: ['일본 주요 노선 특별 운임', '온라인 전용 한정 판매'],
  },
  {
    id: 'payco',
    title: 'PAYCO 간편결제 즉시 할인',
    summary: 'PAYCO로 결제하고 항공권 할인 혜택 받기',
    image: `${PROMOTION_IMAGE_PATH}/payco.jpg`,
    period: '2026.06.01 ~ 2026.06.30',
    bookingPeriod: '2026.06.01 ~ 2026.06.30',
    travelPeriod: '결제 기간 내 발권 항공권',
    benefits: ['PAYCO 결제 시 즉시 할인', '예산 소진 시 조기 종료'],
  },
  {
    id: 'mercure-lounge',
    title: '마곡 머큐어 호텔 · 스카이허브 라운지 제휴 혜택',
    summary: '출발 전후의 여행까지 편안하게 이어지는 제휴 서비스',
    image: `${PROMOTION_IMAGE_PATH}/mercure-lounge.jpg`,
    period: '2026.06.01 ~ 2026.08.31',
    bookingPeriod: '2026.06.01 ~ 2026.08.31',
    travelPeriod: '제휴처별 이용 기간 확인',
    benefits: ['호텔 객실 제휴 요금', '공항 라운지 이용 혜택'],
  },
].map((promotion) => ({
  ...promotion,
  path: ROUTES.benefit.eventDetail(promotion.id),
}));

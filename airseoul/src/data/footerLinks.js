import { ROUTES } from '../constants/routes';

export const footerLinkGroups = [
  {
    id: 'company',
    title: '회사소개',
    links: [
      { label: '회사소개', to: ROUTES.service.root },
      { label: '홍보센터(미디어룸)', to: ROUTES.service.root },
    ],
  },
  {
    id: 'support',
    title: '고객센터',
    links: [
      { label: '공지사항', to: ROUTES.contact.notice },
      { label: 'FAQ', to: ROUTES.contact.faq },
      { label: '1:1 문의', to: ROUTES.contact.inquiry },
      { label: '사이트맵', to: ROUTES.home },
    ],
  },
  {
    id: 'terms',
    title: '규정 및 약관',
    links: [
      { label: '여객운송약관', to: ROUTES.service.root },
      { label: '운임안내', to: ROUTES.booking.flight },
      { label: '기타 고지사항', to: ROUTES.service.root },
      { label: '홈페이지 이용약관', to: ROUTES.service.root },
      { label: '개인정보 처리방침', to: ROUTES.service.root },
    ],
  },
  {
    id: 'etc',
    title: '기타',
    links: [
      { label: '항공교통이용자 서비스 계획', to: ROUTES.service.root },
      { label: '피해구제계획', to: ROUTES.service.root },
      { label: '소비자 안전 관련 정보 공개', to: ROUTES.service.root },
      { label: '이메일무단수집거부', to: ROUTES.service.root },
    ],
  },
];

export const footerCompanyInfo = [
  {
    id: 'company',
    items: [
      'AIR SEOUL',
      '에어서울 주식회사 대표이사 김중호',
    ],
  },
  {
    id: 'address',
    items: [
      '본사 소재지 : (우)07516 서울특별시 강서구 양천로 13',
      '사업장 소재지 : (우)22382 인천광역시 중구 제2터미널대로 446(운서동, 인천국제공항 제2여객터미널)',
    ],
  },
  {
    id: 'contact',
    items: [
      '국내선, 국제선 예약문의 1800-8100 (09:00~18:00)',
      '해외에서 이용 시 +82-1800-8100',
    ],
  },
  {
    id: 'registration',
    items: [
      '사업자 등록 번호 : 825-81-00091',
      '통신판매업 신고번호 제 2016-인천중구-0199',
    ],
  },
  {
    id: 'system',
    items: [
      '호스팅 서버 위치 : 아시아HQ7(주) 전산센터(서울 강서구 오쇠동)',
      '개인정보보호책임자 정보보호센터장 신동선',
    ],
  },
];

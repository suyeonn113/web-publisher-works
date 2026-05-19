import { ROUTES } from '../constants/routes';
import CircleQuestionMarkIcon from '../components/icons/CircleQuestionMarkIcon';
import MailIcon from '../components/icons/MailIcon';
import PhoneIcon from '../components/icons/PhoneIcon';
import BuildingIcon from '../components/icons/BuildingIcon';
import SquarePenIcon from '../components/icons/SquarePenIcon';
import UsersGroupIcon from '../components/icons/UsersGroupIcon';

export const homeNotices = [
  {
    id: 'battery-rule',
    title: '[공지] 보조배터리 규정 변경 안내',
    date: '2026.04.15',
    to: ROUTES.contact.notice,
  },
  {
    id: 'terminal-move',
    title: '★인천국제공항 제2여객터미널 이전 안내 (09.09~)',
    date: '2025.07.17',
    to: ROUTES.contact.notice,
  },
  {
    id: 'fuel-surcharge',
    title: "[유류할증료] '26년 05월 국제선 유류할증료 안내 (한국발)",
    date: '2026.04.20',
    to: ROUTES.contact.notice,
  },
];

export const customerCenterInfo = {
  title: '에어서울 고객센터',
  phone: '1800-8100',
  hours: '매일 09:00 ~ 18:00',
  icon: PhoneIcon,
};

export const customerActionLinks = [
  {
    id: 'faq',
    label: '자주 묻는 질문',
    icon: CircleQuestionMarkIcon,
    to: ROUTES.contact.faq,
  },
  {
    id: 'inquiry',
    label: '1:1 문의',
    icon: MailIcon,
    to: ROUTES.contact.inquiry,
  },
];

export const partnershipInquiries = [
  {
    id: 'group',
    title: '에어서울 단체문의',
    email: 'rssale@flyairseoul.com',
    description: [
      '소규모부터 대규모까지 단체여행 준비하고 있다면 언제든지 문의 주세요.(10인 이상)',
      '에어서울과 함께 설레는 여행을 떠나보세요.',
    ],
  },
  {
    id: 'partnership',
    title: '에어서울 제휴',
    email: 'WITHRS@flyairseoul.com',
    description: [
      '브랜드 협업, 미디어 광고 제휴 프로모션 등 제안을 기다립니다.',
      '에어서울과 함께 새로운 변화를 시작하세요.',
    ],
  },
];

export const airSeoulStats = [
  {
    id: 'founded',
    value: '2015',
    label: '설립연도',
    icon: BuildingIcon,
  },
  {
    id: 'travel-diy',
    value: '여행 D.I.Y',
    label: '합리적 운임',
    icon: SquarePenIcon,
  },
  {
    id: 'service-care',
    value: '서비스 A/S',
    label: '고객 맞춤 케어',
    icon: UsersGroupIcon,
  },
];

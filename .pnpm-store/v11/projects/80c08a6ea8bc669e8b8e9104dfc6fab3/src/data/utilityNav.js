
import { ROUTES } from '../constants/routes';

export const utilityNav = [
  {
    id: 'contact',
    label: '문의',
    href: ROUTES.contact.root,

    children: [
      { id: 'notice', label: '공지사항', href: ROUTES.contact.notice },
      { id: 'faq', label: '자주 묻는 질문', href: ROUTES.contact.faq },
      { id: 'inquiry', label: '1:1 문의', href: ROUTES.contact.inquiry },
      { id: 'lost', label: '유실물 안내', href: ROUTES.contact.lost },
    ],
  },

  {
    id: 'login',
    label: '로그인',
    href: ROUTES.auth.login,
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

import {
  FacebookIcon,
  InstagramIcon,
  NaverBlogIcon,
  TiktokIcon,
  YoutubeIcon,
} from '../components/icons'

export const serviceColumns = [
  {
    title: '온라인 다이소몰',
    time: '평일 09:00 - 18:00',
    links: ['주문조회', '취소/교환/반품', '공지사항', 'FAQ', '1:1 문의', '앱 장애/신고'],
  },
  {
    title: '다이소 매장',
    time: '평일 09:00 - 18:00',
    links: ['매장 상품 찾기', '매장 위치 찾기', '1:1 문의', '고객센터', '제휴문의'],
  },
]

export const footerMenuSections = [
  {
    title: '멤버십',
    links: ['멤버십 소개', '포인트 적립/사용내역', '포인트 선물하기', '멤버십 패밀리'],
  },
  {
    title: '회사소개',
    links: [
      '기업 소개',
      '국민가게, 다이소',
      '경영이념',
      '인재채용',
      '납품문의',
      '인테리어 업체 제휴문의',
      '가맹문의',
    ],
  },
]

export const standaloneMenus = ['상품권', 'BIZ']

export const companyInfoRows = [
  ['상호명 및 호스팅 서비스 제공', '(주)아성다이소'],
  ['대표', '김기호'],
  ['사업자등록번호', '213-81-52063'],
  ['통신판매신고번호', '2008-서울강남-1525'],
  ['주소', '서울특별시 강남구 남부순환로 2748 아성(A SUNG)'],
  ['개인정보 보호 책임자', '김범준'],
  ['청소년 보호 책임자', '조태진'],
]

export const appButtons = [
  {
    id: 'google-play',
    label: 'GET IT ON',
    store: 'Google Play',
    image: '/images/footer/google-play.svg',
    alt: 'Google Play에서 다운로드',
  },
  {
    id: 'app-store',
    label: 'Download on the',
    store: 'App Store',
    image: '/images/footer/app-store.svg',
    alt: 'App Store에서 다운로드',
  },
]

export const policyLinks = [
  '이용약관',
  '위치기반서비스 이용약관',
  '청소년보호정책',
  '개인정보처리방침',
  '우리은행 구매안전 서비스',
]

export const certList = [
  {
    label: '소비자중심경영 인증',
    image: '/images/footer/cert-consumer.svg',
    alt: '소비자중심 인증',
  },
  {
    label: '품질경영시스템 인증',
    image: '/images/footer/cert-kmr.svg',
    alt: 'KMR 인증',
  },
  {
    label: '위해상품 차단시스템 운영매장',
    image: '/images/footer/cert-zero.svg',
    alt: '위해상품 ZERO 인증',
  },
]

export const socialLinks = [
  { label: '네이버 블로그', className: 'is-blog', Icon: NaverBlogIcon },
  { label: '인스타그램', className: 'is-instagram', Icon: InstagramIcon },
  { label: '페이스북', className: 'is-facebook', Icon: FacebookIcon },
  { label: '유튜브', className: 'is-youtube', Icon: YoutubeIcon },
  { label: '틱톡', className: 'is-tiktok', Icon: TiktokIcon },
]
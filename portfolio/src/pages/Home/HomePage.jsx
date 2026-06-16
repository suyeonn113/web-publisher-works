import { Link } from "react-router-dom";

import "./HomePage.scss";

const introLinks = [
  {
    number: "01",
    title: "Introduction",
    to: "#introduction",
    description: "작업 방식과 포트폴리오 방향성을 소개합니다.",
  },
  {
    number: "02",
    title: "Resume",
    to: "/resume",
    description: "기술 역량과 프로젝트 경험을 정리했습니다.",
  },
];

const workLinks = [
  {
    number: "03",
    title: "Daiso Mall",
    meta: "Team Project · Mobile First",
    to: "/projects/daisomall/preview",
    description: "팀 프로젝트로 진행한 모바일 퍼스트 쇼핑몰 리뉴얼 작업입니다.",
  },
  {
    number: "04",
    title: "Air Seoul",
    meta: "React · Responsive Web",
    to: "/projects/air-seoul/preview",
    description: "React 기반으로 항공권 탐색 흐름과 반응형 UI를 구현한 프로젝트입니다.",
  },
  {
    number: "05",
    title: "시립서울\n청소년센터",
    meta: "Planning · Responsive Web",
    to: "/projects/seoul-youth-center",
    description: "공공 웹사이트의 정보 구조와 사용자 흐름을 재설계한 기획형 반응형 웹 프로젝트입니다.",
  },
  {
    number: "06",
    title: "Fragfarm",
    meta: "Mobile Web",
    to: "/projects/fragfarm/preview",
    description: "모바일 환경에 맞춰 브랜드 탐색과 상품 경험을 정리한 모바일 웹 프로젝트입니다.",
  },
];

const renderHomeCard = (link) => {
  const content = (
    <>
      <span className="home-link-card__head">
        <span>{link.number}</span>
      </span>
      <span className="home-link-card__title">
        {link.title.split("\n").map((line) => (
          <span key={line}>{line}</span>
        ))}
      </span>
      {link.meta ? (
        <span className="home-link-card__meta">
          {link.meta}
        </span>
      ) : null}
      <span className="home-link-card__description">
        {link.description}
      </span>
    </>
  );

  return link.to.startsWith("#") ? (
    <a key={link.number} href={link.to}>
      {content}
    </a>
  ) : (
    <Link key={link.number} to={link.to}>
      {content}
    </Link>
  );
};

const HomePage = () => {
  return (
    <div className="home-page">
      <main className="home-main" aria-label="홈 메뉴">
        <nav className="home-info-grid" aria-label="소개 메뉴">
          {introLinks.map(renderHomeCard)}
        </nav>

        <nav className="home-work-grid" aria-label="작업물 메뉴">
          {workLinks.map(renderHomeCard)}
        </nav>
      </main>
    </div>
  );
};

export default HomePage;

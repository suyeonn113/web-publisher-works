import { Link } from "react-router-dom";

import "./HomePage.scss";

const introLinks = [
  {
    number: "01",
    title: "Introduction",
    to: "#introduction",
    description: "한글 설명이 들어갈 거 같습니다만",
  },
  {
    number: "02",
    title: "Resume",
    to: "#resume",
    description: "한글 설명이 들어갈 거 같습니다만",
  },
];

const workLinks = [
  {
    number: "03",
    title: "Daiso Mall",
    meta: "Team Project",
    to: "/projects/daiso-mall",
    description: "한글 설명이 들어갈 거 같습니다만",
  },
  {
    number: "04",
    title: "Air Seoul",
    meta: "React · Responsive Web",
    to: "/projects/air-seoul",
    description: "한글 설명이 들어갈 거 같습니다만",
  },
  {
    number: "05",
    title: "시립서울\n청소년센터",
    meta: "Case Study",
    to: "/projects/seoul-youth-center",
    description: "한글 설명이 들어갈 거 같습니다만",
  },
  {
    number: "06",
    title: "Fragfarm",
    meta: "Mobile Web",
    to: "/projects/fragfarm",
    description: "한글 설명이 들어갈 거 같습니다만",
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

import "./IntroductionPage.scss";

const introMeta = [
  { label: "Role", value: "Web Publisher · UI Front-End" },
  { label: "Focus", value: "Readable Structure · Responsive UI" },
  { label: "Base", value: "Seoul, Korea" },
];

const coreValues = [
  {
    title: "Structure First",
    description:
      "정보의 목적과 사용자 흐름을 먼저 정리한 뒤, 그에 맞는 레이아웃과 컴포넌트를 설계합니다.",
  },
  {
    title: "Readable Build",
    description:
      "시멘틱 마크업, 명확한 네이밍, 반복 가능한 규칙을 통해 읽기 쉽고 유지보수 가능한 구조를 만듭니다.",
  },
  {
    title: "Responsive Detail",
    description:
      "기기별 사용 맥락을 고려해 브레이크포인트마다 필요한 구조와 인터랙션을 다르게 설계합니다.",
  },
];

const journeySteps = [
  {
    number: "01",
    title: "Background",
    description:
      "청소년지도학 전공과 현장 경험을 통해, 사용자의 상황을 이해하고 목적에 맞는 정보를 정리하는 시각을 쌓았습니다.",
  },
  {
    number: "02",
    title: "Transition",
    description:
      "브랜드 실행과 웹 제작 과정을 경험하며, 구조를 설계하고 화면으로 구현하는 일에 흥미를 느껴 웹 퍼블리싱으로 방향을 넓혔습니다.",
  },
  {
    number: "03",
    title: "Today",
    description:
      "현재는 HTML, SCSS, JavaScript, React를 기반으로 반응형 UI와 접근성을 함께 고려한 프로젝트를 만들고 있습니다.",
  },
];

const skillGroups = [
  {
    title: "Planning & UX",
    items: [
      "정보 구조 설계",
      "사용자 흐름 정리",
      "콘텐츠 우선순위 도출",
      "와이어프레임 기획",
    ],
  },
  {
    title: "Publishing",
    items: [
      "HTML",
      "SCSS",
      "JavaScript",
      "Responsive Web",
      "Web Accessibility",
    ],
  },
  {
    title: "Front-End & Tools",
    items: ["React", "Vite", "GitHub", "Figma", "Vercel", "FileZilla"],
  },
];

const workingPrinciples = [
  "화면의 목적이 분명한 구조",
  "읽기 쉽고 수정하기 쉬운 코드",
  "기기 환경에 맞는 반응형 설계",
];

const IntroductionPage = () => {
  return (
    <main className="introduction-page-wrap">
      <section
        className="introduction-page"
        aria-labelledby="introduction-page-title"
      >
        <header className="introduction-page__hero">
          <div className="introduction-page__hero-main">
            <p className="introduction-page__eyebrow">Introduction</p>
            <h1 id="introduction-page-title">
              명확한 흐름을 설계하고,
              <br />
              읽기 좋은 화면을 구현합니다.
            </h1>
            <p className="introduction-page__summary">
              사용자 경험의 흐름을 먼저 생각하고, 그 흐름이 자연스럽게
              읽히도록 구조와 화면을 설계하는 웹 퍼블리셔 조수연입니다.
              단순히 보기 좋은 화면을 넘어서, 목적이 분명하고 유지보수하기
              쉬운 결과물을 만드는 데 집중합니다.
            </p>
          </div>

          <div className="introduction-page__hero-side">
            <ul className="introduction-page__meta-list">
              {introMeta.map(({ label, value }) => (
                <li key={label}>
                  <span>{label}</span>
                  <strong>{value}</strong>
                </li>
              ))}
            </ul>

            <div className="introduction-page__quote">
              <p>Approach</p>
              <strong>Readable · Maintainable · Responsive</strong>
            </div>
          </div>
        </header>

        <div className="introduction-page__editorial-grid">
          <section className="introduction-page__section introduction-page__story">
            <div className="introduction-page__section-heading">
              <p>About Me</p>
              <h2>배경과 관점</h2>
            </div>

            <div className="introduction-page__story-body">
              <p>
                저는 사람과 상황을 이해하는 관점에서 출발해, 화면과 구조를
                설계하는 방식으로 웹 퍼블리싱에 접근합니다.
              </p>
              <p>
                화면을 구현할 때는 단순히 요소를 배치하는 데서 끝내지 않고,
                사용자가 어떤 정보를 먼저 보고 어떤 행동으로 이어질지를 함께
                정리합니다.
              </p>
              <p>
                그래서 기획 의도와 사용자 흐름을 읽기 쉬운 구조로 옮기는
                작업에 강점을 가지고 있습니다.
              </p>
            </div>
          </section>

          <section className="introduction-page__section introduction-page__values">
            <div className="introduction-page__section-heading">
              <p>Core Strengths</p>
              <h2>핵심 강점</h2>
            </div>

            <ul className="introduction-page__value-list">
              {coreValues.map(({ title, description }) => (
                <li key={title}>
                  <strong>{title}</strong>
                  <p>{description}</p>
                </li>
              ))}
            </ul>
          </section>
        </div>

        <div className="introduction-page__bottom-grid">
          <section className="introduction-page__section introduction-page__journey">
            <div className="introduction-page__section-heading">
              <p>Journey</p>
              <h2>간단한 흐름</h2>
            </div>

            <ol className="introduction-page__journey-list">
              {journeySteps.map(({ number, title, description }) => (
                <li key={number}>
                  <span>{number}</span>
                  <div>
                    <strong>{title}</strong>
                    <p>{description}</p>
                  </div>
                </li>
              ))}
            </ol>
          </section>

          <div className="introduction-page__side-stack">
            <section className="introduction-page__section introduction-page__principles">
              <div className="introduction-page__section-heading">
                <p>Working Style</p>
                <h2>작업 방식</h2>
              </div>

              <ul className="introduction-page__principle-list">
                {workingPrinciples.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>

            <section className="introduction-page__section introduction-page__skills">
              <div className="introduction-page__section-heading">
                <p>Skills</p>
                <h2>주요 역량</h2>
              </div>

              <ul className="introduction-page__skill-groups">
                {skillGroups.map(({ title, items }) => (
                  <li key={title}>
                    <strong>{title}</strong>
                    <p>{items.join(" · ")}</p>
                  </li>
                ))}
              </ul>
            </section>
          </div>
        </div>
      </section>
    </main>
  );
};

export default IntroductionPage;
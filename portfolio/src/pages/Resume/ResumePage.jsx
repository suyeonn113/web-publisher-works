import { useState } from "react";
import "./ResumePage.scss";

const profileItems = [
  { label: "지원분야", value: "Web Publisher / UI Front-End" },
  { label: "경력여부", value: "신입" },
  { label: "성명", value: "조수연" },
  { label: "영문명", value: "JO SUYEON" },
  { label: "생년월일", value: "2000.00.00" },
  { label: "연락처", value: "010-0000-0000" },
  { label: "이메일", value: "email@example.com" },
  { label: "주소", value: "서울특별시" },
];

const skillGroups = [
  {
    title: "Markup & Style",
    items: ["HTML", "CSS", "SCSS", "Responsive Web", "Accessibility"],
  },
  {
    title: "Front-End",
    items: ["JavaScript", "React", "Vite", "React Router"],
  },
  {
    title: "Tools",
    items: ["Figma", "Git", "GitHub", "Vercel", "FileZilla"],
  },
];

const educationRows = [
  {
    period: "0000.00 - 0000.00",
    school: "OO대학교",
    major: "청소년지도학과",
    location: "서울",
  },
];

const projectRows = [
  {
    period: "2026.03 - 2026.04",
    name: "시립서울청소년센터 웹사이트 리뉴얼",
    role: "개인 프로젝트",
    description:
      "공공기관 웹사이트의 정보 구조를 재정리하고, 프로그램 탐색부터 신청까지 이어지는 반응형 사용자 흐름을 구현했습니다.",
  },
  {
    period: "2026.05 - 2026.06",
    name: "Daiso Mall",
    role: "팀 프로젝트",
    description:
      "React 기반 쇼핑몰 메인 UI를 모바일 퍼스트 구조로 제작하고, 상품 데이터 구조와 반응형 섹션 레이아웃을 정리했습니다.",
  },
  {
    period: "2026.01 - 2026.06",
    name: "FRAGFARM Mobile Web",
    role: "개인 프로젝트",
    description:
      "모바일 쇼핑 경험을 중심으로 상품 탐색, 위시리스트, 장바구니 진입 흐름을 설계하고 구현했습니다.",
  },
];

const activityRows = [
  {
    period: "0000.00 - 0000.00",
    type: "교육",
    organization: "OO 교육기관",
    description: "웹 퍼블리싱 및 프론트엔드 과정 수료",
  },
];

const licenseRows = [
  {
    date: "0000.00",
    name: "자격증명",
    number: "-",
    organization: "발행기관",
  },
];

const resumeIntro = [
  "사용자 흐름을 구조적으로 정리하고, 화면 목적에 맞는 정보 위계를 설계하는 웹 퍼블리셔를 지향합니다.",
  "HTML, SCSS, JavaScript, React를 기반으로 반응형 UI를 구현하며, 유지보수 가능한 네이밍과 컴포넌트 구조를 중요하게 생각합니다.",
  "프로젝트에서는 단순히 화면을 재현하는 것보다 사용자가 어떤 정보에 먼저 접근해야 하는지, 어떤 흐름으로 행동까지 이어지는지를 중심으로 개선 방향을 정리했습니다.",
];

const clampScale = (value) => Math.min(1.2, Math.max(0.55, value));

const ResumeToolbar = ({ scale, onZoomOut, onReset, onZoomIn, onPrint }) => {
  return (
    <div className="resume-page__toolbar no-print" aria-label="이력서 보기 옵션">
      <div>
        <p>Resume Preview</p>
        <strong>{Math.round(scale * 100)}%</strong>
      </div>

      <div className="resume-page__toolbar-actions">
        <button type="button" onClick={onZoomOut}>
          축소
        </button>
        <button type="button" onClick={onReset}>
          100%
        </button>
        <button type="button" onClick={onZoomIn}>
          확대
        </button>
        <button type="button" onClick={onPrint}>
          인쇄
        </button>
      </div>
    </div>
  );
};

const ResumeSection = ({ title, children }) => {
  return (
    <section className="resume-document__section">
      <h2>{title}</h2>
      {children}
    </section>
  );
};

const InfoGrid = ({ items }) => {
  return (
    <dl className="resume-document__info-grid">
      {items.map(({ label, value }) => (
        <div key={label}>
          <dt>{label}</dt>
          <dd>{value}</dd>
        </div>
      ))}
    </dl>
  );
};

const ResumeTable = ({ columns, rows }) => {
  return (
    <div className="resume-document__table-wrap">
      <table className="resume-document__table">
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column.key} scope="col">
                {column.label}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {rows.map((row, index) => (
            <tr key={`${row.name || row.school || row.period}-${index}`}>
              {columns.map((column) => (
                <td key={column.key}>{row[column.key]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const SkillList = () => {
  return (
    <div className="resume-document__skills">
      {skillGroups.map(({ title, items }) => (
        <div key={title}>
          <h3>{title}</h3>
          <p>{items.join(" · ")}</p>
        </div>
      ))}
    </div>
  );
};

const ResumeSheet = () => {
  return (
    <article className="resume-document resume-document--main">
      <header className="resume-document__header">
        <div>
          <p>Resume</p>
          <h1>조수연</h1>
        </div>

        <strong>Web Publisher</strong>
      </header>

      <ResumeSection title="기본정보">
        <InfoGrid items={profileItems} />
      </ResumeSection>

      <ResumeSection title="핵심역량">
        <SkillList />
      </ResumeSection>

      <ResumeSection title="학력사항">
        <ResumeTable
          columns={[
            { key: "period", label: "재학기간" },
            { key: "school", label: "학교명" },
            { key: "major", label: "전공" },
            { key: "location", label: "소재지" },
          ]}
          rows={educationRows}
        />
      </ResumeSection>

      <ResumeSection title="프로젝트 경험">
        <ResumeTable
          columns={[
            { key: "period", label: "기간" },
            { key: "name", label: "프로젝트명" },
            { key: "role", label: "구분" },
            { key: "description", label: "주요내용" },
          ]}
          rows={projectRows}
        />
      </ResumeSection>

      <ResumeSection title="주요활동 및 사회경험">
        <ResumeTable
          columns={[
            { key: "period", label: "활동기간" },
            { key: "type", label: "활동구분" },
            { key: "organization", label: "기관" },
            { key: "description", label: "활동내용" },
          ]}
          rows={activityRows}
        />
      </ResumeSection>

      <ResumeSection title="자격사항 및 어학능력">
        <ResumeTable
          columns={[
            { key: "date", label: "취득일자" },
            { key: "name", label: "자격증 및 면허종류" },
            { key: "number", label: "취득번호" },
            { key: "organization", label: "발행기관" },
          ]}
          rows={licenseRows}
        />
      </ResumeSection>
    </article>
  );
};

const CoverLetterSheet = () => {
  return (
    <article className="resume-document resume-document--letter">
      <header className="resume-document__header">
        <div>
          <p>Cover Letter</p>
          <h1>자기소개서</h1>
        </div>

        <strong>JO SUYEON</strong>
      </header>

      <ResumeSection title="자기소개">
        <div className="resume-document__letter-body">
          {resumeIntro.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </ResumeSection>

      <ResumeSection title="작업 방향">
        <div className="resume-document__letter-box">
          <strong>Readable · Maintainable · Responsive</strong>
          <p>
            화면의 목적과 사용자 흐름을 먼저 정리한 뒤, 정보 구조와 UI
            컴포넌트를 일관된 규칙으로 구현합니다.
          </p>
        </div>
      </ResumeSection>
    </article>
  );
};

const ResumePage = () => {
  const [scale, setScale] = useState(0.86);

  const handleZoomOut = () => {
    setScale((currentScale) => clampScale(currentScale - 0.08));
  };

  const handleReset = () => {
    setScale(1);
  };

  const handleZoomIn = () => {
    setScale((currentScale) => clampScale(currentScale + 0.08));
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <main className="resume-page">
      <ResumeToolbar
        scale={scale}
        onZoomOut={handleZoomOut}
        onReset={handleReset}
        onZoomIn={handleZoomIn}
        onPrint={handlePrint}
      />

      <div className="resume-page__viewport">
        <div
          className="resume-page__sheet-stack"
          style={{
            "--resume-scale": scale,
          }}
        >
          <div className="resume-page__sheet-frame">
            <ResumeSheet />
          </div>

          <div className="resume-page__sheet-frame">
            <CoverLetterSheet />
          </div>
        </div>
      </div>
    </main>
  );
};

export default ResumePage;
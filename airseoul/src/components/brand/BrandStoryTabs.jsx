const BRAND_STORY_TABS = [
  '브랜드 스토리',
  '개요',
  '윤리경영',
  '연혁',
  '항공기 안내',
  'CI & Color',
  'MINT TEAM',
];

export default function BrandStoryTabs() {
  return (
    <nav className="brand-story-tabs" aria-label="회사소개 메뉴">
      {BRAND_STORY_TABS.map((tab, index) => (
        <button
          type="button"
          className={index === 0 ? 'is-active' : ''}
          aria-current={index === 0 ? 'page' : undefined}
          aria-disabled={index === 0 ? undefined : 'true'}
          key={tab}
        >
          {tab}
        </button>
      ))}
    </nav>
  );
}

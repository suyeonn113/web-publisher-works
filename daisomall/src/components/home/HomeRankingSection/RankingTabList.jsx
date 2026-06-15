import BadgeButton from '../../common/BadgeButton/BadgeButton'

function RankingTabList({ activeTabId, tabs, onTabChange }) {
  return (
    <div className="ranking-tab-list">
      {tabs.map((tab) => (
        <BadgeButton
          key={tab.id}
          isActive={tab.id === activeTabId}
          onClick={() => onTabChange(tab.id)}
        >
          {tab.label}
        </BadgeButton>
      ))}
    </div>
  )
}

export default RankingTabList

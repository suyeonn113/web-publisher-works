import { useEffect, useState } from 'react'
import BadgeButton from '../../common/BadgeButton/BadgeButton'

function RankingTabList({ activeTabId, tabs, panelId, onTabChange }) {
  const [focusedTabId, setFocusedTabId] = useState(activeTabId)
  const focusedIndex = Math.max(
    tabs.findIndex((tab) => tab.id === focusedTabId),
    0,
  )

  useEffect(() => {
    setFocusedTabId(activeTabId)
  }, [activeTabId])

  const moveToTab = (nextIndex) => {
    const nextTab = tabs[nextIndex]

    if (!nextTab) return

    setFocusedTabId(nextTab.id)
    window.requestAnimationFrame(() => {
      document.getElementById(`ranking-tab-${nextTab.id}`)?.focus()
    })
  }

  const handleKeyDown = (event) => {
    if (event.key === 'ArrowRight') {
      event.preventDefault()
      moveToTab((focusedIndex + 1) % tabs.length)
      return
    }

    if (event.key === 'ArrowLeft') {
      event.preventDefault()
      moveToTab((focusedIndex - 1 + tabs.length) % tabs.length)
      return
    }

    if (event.key === 'Home') {
      event.preventDefault()
      moveToTab(0)
      return
    }

    if (event.key === 'End') {
      event.preventDefault()
      moveToTab(tabs.length - 1)
      return
    }

    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      onTabChange(focusedTabId)
    }
  }

  return (
    <div className="ranking-tab-list" role="tablist" aria-label="랭킹 카테고리">
      {tabs.map((tab) => (
        <BadgeButton
          key={tab.id}
          id={`ranking-tab-${tab.id}`}
          role="tab"
          isActive={tab.id === activeTabId}
          aria-selected={tab.id === activeTabId}
          aria-controls={panelId}
          tabIndex={tab.id === focusedTabId ? 0 : -1}
          onClick={() => {
            setFocusedTabId(tab.id)
            onTabChange(tab.id)
          }}
          onKeyDown={handleKeyDown}
        >
          {tab.label}
        </BadgeButton>
      ))}
    </div>
  )
}

export default RankingTabList

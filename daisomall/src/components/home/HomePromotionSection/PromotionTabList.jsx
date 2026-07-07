import { useEffect, useState } from 'react'
import {
  GeometricShapesIcon,
  ShoppingBagIcon,
  TrendArrowIcon,
} from '../../icons'
import PromotionTabButton from './PromotionTabButton'

const promotionTabIcons = {
  category: GeometricShapesIcon,
  popular: TrendArrowIcon,
  purchase: ShoppingBagIcon,
}

function PromotionTabList({ tabs, activeTabId, panelId, onChangeTab }) {
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
      document.getElementById(`promotion-tab-${nextTab.id}`)?.focus()
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
      onChangeTab(focusedTabId)
    }
  }

  return (
    <div className="promotion-tab-list" role="tablist" aria-label="기획전 유형">
      {tabs.map((tab) => (
        <PromotionTabButton
          key={tab.id}
          id={`promotion-tab-${tab.id}`}
          role="tab"
          label={tab.label}
          icon={promotionTabIcons[tab.id]}
          isActive={tab.id === activeTabId}
          aria-selected={tab.id === activeTabId}
          aria-controls={panelId}
          tabIndex={tab.id === focusedTabId ? 0 : -1}
          onClick={() => {
            setFocusedTabId(tab.id)
            onChangeTab(tab.id)
          }}
          onKeyDown={handleKeyDown}
        />
      ))}
    </div>
  )
}

export default PromotionTabList

import { useRef, useState } from 'react';
import { mainNav } from '../../data/mainNav';
import { getRovingTabNextIndex } from '../../utils/rovingTab';
import ChevronDownIcon from '../icons/ChevronDownIcon';

const travelMenuItems = mainNav.find((item) => item.id === 'travel')?.children ?? [];
const seatMenuItem = travelMenuItems.find((item) => item.id === 'seat');
const travelMenuItemsWithoutTabs = travelMenuItems.filter((item) => item.id !== 'seat');

export default function SeatGuideTabs({ activeTab, onChange, tabs }) {
  const [isSeatMenuOpen, setIsSeatMenuOpen] = useState(true);
  const tabRefs = useRef([]);

  const handleKeyDown = (event, currentIndex) => {
    const nextIndex = getRovingTabNextIndex(event, currentIndex, tabs.length);
    if (nextIndex === null) return;

    event.preventDefault();
    onChange(tabs[nextIndex].id);
    tabRefs.current[nextIndex]?.focus();
  };

  return (
    <aside className="seat-guide-subnav">
      <p className="seat-guide-subnav__title">여행 준비</p>
      <nav aria-label="여행 준비 중분류 메뉴">
        <ul className="seat-guide-subnav__grid">
          <li className="seat-guide-subnav__panel">
            <button
              type="button"
              className="seat-guide-subnav__group-toggle"
              aria-expanded={isSeatMenuOpen}
              aria-controls="seat-guide-submenu-tabs"
              onClick={() => setIsSeatMenuOpen((isOpen) => !isOpen)}
            >
              <span>{seatMenuItem.label}</span>
              <ChevronDownIcon className="seat-guide-subnav__toggle-icon" />
            </button>

            <div
              className="seat-guide-tabs"
              id="seat-guide-submenu-tabs"
              role="tablist"
              aria-label="좌석"
              hidden={!isSeatMenuOpen}
            >
              {tabs.map((tab, index) => (
                <button
                  type="button"
                  role="tab"
                  id={`seat-guide-tab-${tab.id}`}
                  aria-controls={`seat-guide-panel-${tab.id}`}
                  aria-selected={activeTab === tab.id}
                  tabIndex={activeTab === tab.id ? 0 : -1}
                  className={activeTab === tab.id ? 'is-active' : ''}
                  key={tab.id}
                  onClick={() => onChange(tab.id)}
                  onKeyDown={(event) => handleKeyDown(event, index)}
                  ref={(element) => {
                    tabRefs.current[index] = element;
                  }}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </li>

          {travelMenuItemsWithoutTabs.map((item) => (
            <li className="seat-guide-subnav__panel" key={item.id}>
              <span className="seat-guide-subnav__placeholder" aria-disabled="true">
                {item.label}
              </span>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}

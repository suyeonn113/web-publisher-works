import { useEffect, useState } from 'react'
import { Icon } from '@iconify/react'
import { NavLink, Outlet } from 'react-router-dom'
import { getPinnedReadingGroupId } from '../services/readingGroupService'

function MainLayout({ user }) {
  const [pinnedGroupId, setPinnedGroupId] = useState('')

  useEffect(() => {
    async function loadPinnedGroup() {
      const groupId = await getPinnedReadingGroupId(user).catch(() => '')
      setPinnedGroupId(groupId)
    }

    const handlePinnedGroupChange = (event) => {
      setPinnedGroupId(event.detail || '')
    }

    loadPinnedGroup()
    window.addEventListener('reading-group-pin-change', handlePinnedGroupChange)

    return () => {
      window.removeEventListener('reading-group-pin-change', handlePinnedGroupChange)
    }
  }, [user])

  return (
    <div className="app-shell">
      <header className="site-header">
        <nav className="app-nav" aria-label="App navigation">
          <NavLink className="app-nav-link" to="/">
            <Icon className="app-icon--inline" icon="fluent:home-24-regular" />
            <span>Home</span>
          </NavLink>

          <NavLink className="app-nav-link" to="/library">
            <Icon className="app-icon--inline" icon="fluent:building-bank-24-regular" />
            <span>Library</span>
          </NavLink>

          <NavLink
            className="app-nav-link"
            to={pinnedGroupId ? `/reading-groups/${pinnedGroupId}` : '/reading-groups'}
          >
            <Icon className="app-icon--inline" icon="fluent:people-community-24-regular" />
            <span>Groups</span>
          </NavLink>

          <NavLink className="app-nav-link" to="/my-page">
            <Icon className="app-icon--inline" icon="fluent:person-24-regular" />
            <span>My page</span>
          </NavLink>
        </nav>
      </header>

      <main className="page">
        <Outlet />
      </main>
    </div>
  )
}

export default MainLayout

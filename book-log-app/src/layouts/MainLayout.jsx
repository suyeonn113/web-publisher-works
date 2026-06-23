import { signOut } from 'firebase/auth'
import { NavLink, Outlet } from 'react-router-dom'
import { auth } from '../firebase/firebase'

function MainLayout({ user }) {
  return (
    <div className="app-shell">
      <header className="site-header">
        <NavLink className="brand" to="/">
          Book Log
        </NavLink>
        <nav className="site-nav" aria-label="Main navigation">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/library">Library</NavLink>
          <button type="button" onClick={() => signOut(auth)}>
            Logout
          </button>
        </nav>
      </header>

      <main className="page">
        <p className="user-badge">{user.displayName || user.email}님</p>
        <Outlet />
      </main>
    </div>
  )
}

export default MainLayout

import { useEffect, useState } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from './firebase/firebase'
import Login from './pages/Login'
import AppRoutes from './routes/AppRoutes'

function App() {
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser)
      setIsLoading(false)
    })

    return unsubscribe
  }, [])

  if (isLoading) {
    return (
      <main className="auth-page">
        <p className="status-message">로그인 상태를 확인하고 있어요.</p>
      </main>
    )
  }

  if (!user) {
    return <Login />
  }

  return <AppRoutes user={user} />
}

export default App

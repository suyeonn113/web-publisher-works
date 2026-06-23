import { Navigate, Route, Routes } from 'react-router-dom'
import MainLayout from '../layouts/MainLayout'
import Home from '../pages/Home'
import Library from '../pages/Library'

function AppRoutes({ user }) {
  return (
    <Routes>
      <Route element={<MainLayout user={user} />}>
        <Route index element={<Home user={user} />} />
        <Route path="library" element={<Library />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  )
}

export default AppRoutes

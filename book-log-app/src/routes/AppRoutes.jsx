import { Navigate, Route, Routes } from 'react-router-dom'
import MainLayout from '../layouts/MainLayout'
import BookDetail from '../pages/BookDetail'
import Home from '../pages/Home'
import Library from '../pages/Library'
import MyPage from '../pages/MyPage'
import ReadingGroupDetail from '../pages/ReadingGroupDetail'
import ReadingGroups from '../pages/ReadingGroups'

function AppRoutes({ user }) {
  return (
    <Routes>
      <Route element={<MainLayout user={user} />}>
        <Route index element={<Home user={user} />} />
        <Route path="library" element={<Library user={user} />} />
        <Route path="reading-groups" element={<ReadingGroups user={user} />} />
        <Route
          path="reading-groups/:groupId"
          element={<ReadingGroupDetail user={user} />}
        />
        <Route path="my-page" element={<MyPage user={user} />} />
        <Route path="books/:personalBookId" element={<BookDetail user={user} />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  )
}

export default AppRoutes

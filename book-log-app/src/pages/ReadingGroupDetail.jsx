import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useToast } from '../components/ToastProvider'
import { getReadingGroup, leaveReadingGroup } from '../services/readingGroupService'

function notifyPinnedGroupChange(groupId) {
  window.dispatchEvent(
    new CustomEvent('reading-group-pin-change', {
      detail: groupId,
    }),
  )
}

function ReadingGroupDetail({ user }) {
  const { groupId } = useParams()
  const navigate = useNavigate()
  const { showToast } = useToast()
  const [group, setGroup] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isLeaving, setIsLeaving] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(() => {
    async function loadGroup() {
      setIsLoading(true)
      setMessage('')

      try {
        const groupDetail = await getReadingGroup(user, groupId)
        setGroup(groupDetail)
      } catch (error) {
        setMessage(error.message)
      } finally {
        setIsLoading(false)
      }
    }

    loadGroup()
  }, [groupId, user])

  if (isLoading) {
    return <p className="library-message">Loading...</p>
  }

  if (!group) {
    return <p className="library-message">{message}</p>
  }

  const handleLeaveGroup = async (deleteMyContent) => {
    setIsLeaving(true)

    try {
      await leaveReadingGroup(user, groupId, { deleteMyContent })
      notifyPinnedGroupChange('')
      showToast(deleteMyContent ? 'Left and deleted' : 'Left')
      navigate('/reading-groups')
    } catch (error) {
      showToast(error.message)
      setIsLeaving(false)
    }
  }

  return (
    <section className="reading-group-detail-page">
      <Link className="back-link" to="/reading-groups">
        Back
      </Link>

      <header className="group-detail-header">
        <h1>{group.name}</h1>
        <p>{group.code}</p>
      </header>

      <section className="group-detail-section">
        <h2>Members</h2>
        <p>{group.memberIds?.length || 0}</p>
      </section>

      <section className="group-detail-section">
        <h2>Group library</h2>
        <p>No books yet.</p>
      </section>

      <section className="group-detail-section">
        <h2>Meeting notes</h2>
        <p>No notes yet.</p>
      </section>

      <section className="group-detail-section group-leave-section">
        <h2>Leave group</h2>
        <div className="group-leave-actions">
          <button
            type="button"
            onClick={() => handleLeaveGroup(false)}
            disabled={isLeaving}
          >
            Leave
          </button>
          <button
            type="button"
            onClick={() => handleLeaveGroup(true)}
            disabled={isLeaving}
          >
            Leave with my notes
          </button>
        </div>
      </section>
    </section>
  )
}

export default ReadingGroupDetail

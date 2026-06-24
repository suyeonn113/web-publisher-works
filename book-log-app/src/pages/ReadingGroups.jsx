import { useEffect, useState } from 'react'
import { Icon } from '@iconify/react'
import { Link } from 'react-router-dom'
import { useToast } from '../components/ToastProvider'
import {
  createReadingGroup,
  getMyReadingGroups,
  getPinnedReadingGroupId,
  joinReadingGroupByCode,
  setPinnedReadingGroupId,
} from '../services/readingGroupService'

function notifyPinnedGroupChange(groupId) {
  window.dispatchEvent(
    new CustomEvent('reading-group-pin-change', {
      detail: groupId,
    }),
  )
}

function ReadingGroups({ user }) {
  const { showToast } = useToast()
  const [groups, setGroups] = useState([])
  const [pinnedGroupId, setPinnedGroupId] = useState('')
  const [groupName, setGroupName] = useState('')
  const [groupCode, setGroupCode] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const loadGroups = async () => {
    setIsLoading(true)

    try {
      const [myGroups, pinnedId] = await Promise.all([
        getMyReadingGroups(user),
        getPinnedReadingGroupId(user),
      ])

      setGroups(myGroups)
      setPinnedGroupId(pinnedId)
      notifyPinnedGroupChange(pinnedId)
    } catch (error) {
      showToast(error.message)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    loadGroups()
  }, [user])

  const handleCreateGroup = async (event) => {
    event.preventDefault()
    setIsSubmitting(true)

    try {
      await createReadingGroup(user, groupName)
      setGroupName('')
      showToast('Created')
      await loadGroups()
    } catch (error) {
      showToast(error.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleJoinGroup = async (event) => {
    event.preventDefault()
    setIsSubmitting(true)

    try {
      await joinReadingGroupByCode(user, groupCode)
      setGroupCode('')
      showToast('Joined')
      await loadGroups()
    } catch (error) {
      showToast(error.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleTogglePin = async (groupId) => {
    const nextPinnedGroupId = pinnedGroupId === groupId ? '' : groupId

    try {
      await setPinnedReadingGroupId(user, nextPinnedGroupId)
      setPinnedGroupId(nextPinnedGroupId)
      notifyPinnedGroupChange(nextPinnedGroupId)
      showToast(nextPinnedGroupId ? 'Pinned' : 'Unpinned')
    } catch (error) {
      showToast(error.message)
    }
  }

  return (
    <section className="reading-groups-page">
      <h1>Reading groups</h1>

      <form className="group-form" onSubmit={handleCreateGroup}>
        <input
          type="text"
          value={groupName}
          placeholder="Group name"
          onChange={(event) => setGroupName(event.target.value)}
        />
        <button type="submit" disabled={isSubmitting}>
          Create
        </button>
      </form>

      <form className="group-form" onSubmit={handleJoinGroup}>
        <input
          type="text"
          value={groupCode}
          placeholder="Group code"
          onChange={(event) => setGroupCode(event.target.value)}
        />
        <button type="submit" disabled={isSubmitting}>
          Join
        </button>
      </form>

      {isLoading && <p className="library-message">Loading...</p>}

      {!isLoading && groups.length === 0 && (
        <div className="empty-panel">
          <p>No reading groups yet.</p>
        </div>
      )}

      <div className="group-list">
        {groups.map((group) => (
          <article className="group-card" key={group.id}>
            <Link to={`/reading-groups/${group.id}`}>
              <strong>{group.name}</strong>
              <span>{group.code}</span>
            </Link>

            <button
              type="button"
              aria-label={pinnedGroupId === group.id ? 'Unpin group' : 'Pin group'}
              onClick={() => handleTogglePin(group.id)}
            >
              <Icon
                className="app-icon--compact-action"
                icon={
                  pinnedGroupId === group.id
                    ? 'fluent:pin-24-filled'
                    : 'fluent:pin-24-regular'
                }
              />
            </button>
          </article>
        ))}
      </div>
    </section>
  )
}

export default ReadingGroups

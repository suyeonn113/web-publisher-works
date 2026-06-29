import { useEffect, useState } from 'react'
import { Icon } from '@iconify/react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import BookLogEditor from '../components/BookLogEditor'
import { useToast } from '../components/ToastProvider'
import {
  deleteLibraryBook,
  getLibraryBookDetail,
  restoreLibraryBook,
  updateLibraryBookMeta,
} from '../services/libraryService'
import {
  getReadingLog,
  saveReadingLog,
} from '../services/readingLogService'

const READ_COUNT_MORE = 4

function formatDateInputValue(value) {
  if (!value) {
    return ''
  }

  if (typeof value === 'string') {
    return value.slice(0, 10)
  }

  const date = value.toDate?.()

  if (date) {
    return date.toISOString().slice(0, 10)
  }

  return ''
}

function getAddedDate(libraryItem) {
  return (
    formatDateInputValue(libraryItem?.addedDate) ||
    formatDateInputValue(libraryItem?.createdAt) ||
    formatDateInputValue(libraryItem?.readDate)
  )
}

function getReadDate(libraryItem) {
  return formatDateInputValue(libraryItem?.readDate) || getAddedDate(libraryItem)
}

function getReadCount(libraryItem) {
  const readCount = Number(libraryItem?.readCount) || 1

  return Math.min(Math.max(readCount, 1), READ_COUNT_MORE)
}

function getNextReadCount(readCount) {
  return readCount >= READ_COUNT_MORE ? 1 : readCount + 1
}

function BookDetail({ user }) {
  const { personalBookId } = useParams()
  const navigate = useNavigate()
  const { showToast } = useToast()
  const [libraryItem, setLibraryItem] = useState(null)
  const [log, setLog] = useState({ body: '', contentJson: null })
  const [isLogDirty, setIsLogDirty] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [isMetaSaving, setIsMetaSaving] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(() => {
    async function loadBookLog() {
      setIsLoading(true)
      setMessage('')

      try {
        const [bookDetail, savedLog] = await Promise.all([
          getLibraryBookDetail(user, personalBookId),
          getReadingLog(user, personalBookId),
        ])

        const addedDate = getAddedDate(bookDetail)
        const readDate = getReadDate(bookDetail)

        setLibraryItem({
          ...bookDetail,
          addedDate,
          readDate,
          readCount: getReadCount(bookDetail),
        })
        setLog({
          body: savedLog.body || '',
          contentJson: savedLog.contentJson || null,
        })
        setIsLogDirty(false)
      } catch (error) {
        setMessage(error.message)
      } finally {
        setIsLoading(false)
      }
    }

    loadBookLog()
  }, [personalBookId, user])

  const handleSave = async () => {
    setIsSaving(true)
    setMessage('')

    try {
      await Promise.all([
        saveReadingLog(user, personalBookId, log),
        updateLibraryBookMeta(personalBookId, {
          addedDate: getAddedDate(libraryItem),
          status: libraryItem.status,
          readDate: getReadDate(libraryItem),
          readCount: getReadCount(libraryItem),
        }),
      ])
      setIsLogDirty(false)
      document.activeElement?.blur()
      showToast('Saved')
    } catch (error) {
      showToast(error.message)
    } finally {
      setIsSaving(false)
    }
  }

  const handleLogChange = (nextLog) => {
    setLog((currentLog) => {
      const isSameLog =
        currentLog.body === nextLog.body &&
        JSON.stringify(currentLog.contentJson) ===
          JSON.stringify(nextLog.contentJson)

      if (!isSameLog) {
        setIsLogDirty(true)
      }

      return nextLog
    })
  }

  const updateLibraryMetaImmediately = async (nextLibraryItem) => {
    setIsMetaSaving(true)
    setMessage('')

    try {
      await updateLibraryBookMeta(personalBookId, {
        addedDate: getAddedDate(nextLibraryItem),
        status: nextLibraryItem.status,
        readDate: getReadDate(nextLibraryItem),
        readCount: getReadCount(nextLibraryItem),
      })
    } catch (error) {
      showToast(error.message)
    } finally {
      setIsMetaSaving(false)
    }
  }

  const handleStatusToggle = () => {
    const nextLibraryItem = {
      ...libraryItem,
      status: isFinished ? 'unfinished' : 'finished',
    }

    setLibraryItem(nextLibraryItem)
    updateLibraryMetaImmediately(nextLibraryItem)
  }

  const handleReadCountCycle = () => {
    const nextLibraryItem = {
      ...libraryItem,
      readCount: getNextReadCount(readCount),
    }

    setLibraryItem(nextLibraryItem)
    updateLibraryMetaImmediately(nextLibraryItem)
  }

  const handleRestoreDeletedBook = async () => {
    try {
      await restoreLibraryBook(personalBookId)
      showToast('Restored')
      navigate(`/books/${personalBookId}`)
    } catch (error) {
      showToast(error.message)
    }
  }

  const handleDeleteConfirm = async () => {
    setIsDeleting(true)
    setMessage('')

    try {
      await deleteLibraryBook(personalBookId)
      setIsDeleteDialogOpen(false)
      showToast('Deleted', {
        duration: 5000,
        action: {
          label: 'Restore deleted book',
          icon: 'fluent:arrow-undo-24-regular',
          onClick: handleRestoreDeletedBook,
        },
      })
      navigate('/')
    } catch (error) {
      showToast(error.message)
      setIsDeleting(false)
    }
  }

  if (isLoading) {
    return <p className="library-message">Loading...</p>
  }

  if (!libraryItem) {
    return <p className="library-message">{message}</p>
  }

  const book = libraryItem.book
  const isFinished = libraryItem.status === 'finished'
  const readCount = getReadCount(libraryItem)
  const readCountLabel =
    readCount === 1 ? '' : readCount >= READ_COUNT_MORE ? '3+' : String(readCount)

  return (
    <section className="book-detail-page">
      <header className="book-log-header">
        <Link className="back-link" to="/">
          Back
        </Link>

        <div className="book-log-actions">
          <label className="read-date-text">
            <span>Read date</span>
            <input
              type="date"
              value={getReadDate(libraryItem)}
              onClick={(event) => event.currentTarget.showPicker?.()}
              onChange={(event) =>
                setLibraryItem((current) => ({
                  ...current,
                  readDate: event.target.value || getAddedDate(current),
                }))
              }
            />
          </label>

          <button
            type="button"
            className="status-icon-button"
            onClick={handleStatusToggle}
            disabled={isMetaSaving}
            aria-label={isFinished ? 'Mark as unfinished' : 'Mark as finished'}
          >
            <Icon
              className="app-icon--compact-action"
              icon={
                isFinished
                  ? 'fluent:checkmark-circle-24-regular'
                  : 'fluent:clock-24-regular'
              }
            />
            <span className="sr-only">{isFinished ? 'Finished' : 'Unfinished'}</span>
          </button>

          <button
            type="button"
            className="read-count-button"
            onClick={handleReadCountCycle}
            disabled={isMetaSaving}
            aria-label={`Read count ${readCount}`}
          >
            <Icon className="app-icon--compact-action" icon="fluent:arrow-repeat-all-24-regular" />
            {readCountLabel && <span>{readCountLabel}</span>}
          </button>
        </div>
      </header>

      <header className="book-detail-header">
        <div className="book-detail-cover">
          {book?.thumbnail ? <img src={book.thumbnail} alt="" /> : <span>No cover</span>}
        </div>
        <div className="book-detail-info">
          <h1>{book?.title || 'Untitled'}</h1>
          <p>{book?.author || '-'}</p>
          <p>{book?.publisher || '-'}</p>
        </div>
      </header>

      <section className={`writing-editor ${isLogDirty ? 'is-dirty' : 'is-saved'}`}>
        <BookLogEditor log={log} onChange={handleLogChange} />
      </section>

      <button
        type="button"
        className="save-log-button"
        onClick={handleSave}
        disabled={isSaving}
      >
        {isSaving ? 'Saving' : 'Save'}
      </button>

      <button
        type="button"
        className="delete-book-button"
        onClick={() => setIsDeleteDialogOpen(true)}
        disabled={isDeleting}
      >
        {isDeleting ? 'Deleting' : 'Delete'}
      </button>

      {isDeleteDialogOpen && (
        <div className="delete-confirm-backdrop" role="presentation">
          <div
            className="delete-confirm-dialog"
            role="dialog"
            aria-modal="true"
            aria-labelledby="delete-confirm-title"
          >
            <h2 id="delete-confirm-title">정말로 삭제하시겠습니까?</h2>
            <p></p>

            <div className="delete-confirm-actions">
              <button
                type="button"
                onClick={handleDeleteConfirm}
                disabled={isDeleting}
              >
                Yes
              </button>
              <button
                type="button"
                onClick={() => setIsDeleteDialogOpen(false)}
                disabled={isDeleting}
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

export default BookDetail

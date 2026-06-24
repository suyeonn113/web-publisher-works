import { useEffect, useState } from 'react'
import { Icon } from '@iconify/react'
import { Link } from 'react-router-dom'
import { getMyLibraryBooks } from '../services/libraryService'
import { getReadingLog } from '../services/readingLogService'

function collectContentText(node) {
  if (!node) {
    return ''
  }

  if (typeof node === 'string') {
    return node
  }

  if (Array.isArray(node)) {
    return node.map(collectContentText).join(' ')
  }

  if (typeof node !== 'object') {
    return ''
  }

  const ownText = [
    node.text,
    ...Object.values(node.attrs?.fields || {}),
    collectContentText(node.content),
  ]

  return ownText.filter(Boolean).join(' ')
}

function getLibraryBookSearchText(item) {
  return [
    item.book?.title,
    item.book?.author,
    item.book?.publisher,
    item.book?.description,
    item.log?.body,
    collectContentText(item.log?.contentJson),
  ]
    .filter(Boolean)
    .join(' ')
    .toLowerCase()
}

function Home({ user }) {
  const [libraryBooks, setLibraryBooks] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [message, setMessage] = useState('')
  const [viewType, setViewType] = useState('thumbnail')
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    async function loadLibrary() {
      setIsLoading(true)
      setMessage('')

      try {
        const books = await getMyLibraryBooks(user)
        const booksWithLogs = await Promise.all(
          books.map(async (book) => {
            const log = await getReadingLog(user, book.id).catch(() => ({
              body: '',
            }))

            return {
              ...book,
              log,
            }
          }),
        )

        setLibraryBooks(booksWithLogs)
      } catch (error) {
        setMessage(error.message)
      } finally {
        setIsLoading(false)
      }
    }

    loadLibrary()
  }, [user])

  const isTextView = viewType === 'text'
  const normalizedSearchQuery = searchQuery.trim().toLowerCase()
  const filteredLibraryBooks = normalizedSearchQuery
    ? libraryBooks.filter((item) => {
        return getLibraryBookSearchText(item).includes(normalizedSearchQuery)
      })
    : libraryBooks

  return (
    <section className="home-page">
      <div className="home-toolbar">
        <label className="home-search">
          <Icon className="app-icon--inline" icon="fluent:search-24-regular" />
          <input
            type="search"
            value={searchQuery}
            placeholder="Search"
            onChange={(event) => setSearchQuery(event.target.value)}
          />
        </label>

        <button
          type="button"
          className="view-toggle-button"
          aria-label={isTextView ? 'Thumbnail view' : 'Text view'}
          title={isTextView ? 'Thumbnail view' : 'Text view'}
          onClick={() => setViewType(isTextView ? 'thumbnail' : 'text')}
        >
          <Icon
            className="app-icon--standalone"
            icon={
              isTextView
                ? 'fluent:grid-24-regular'
                : 'fluent:text-bullet-list-square-24-regular'
            }
          />
        </button>
      </div>

      {isLoading && <p className="library-message">Loading...</p>}
      {message && <p className="library-message">{message}</p>}
      {!isLoading && !message && libraryBooks.length === 0 && (
        <p className="library-message">Search books in Library.</p>
      )}
      {!isLoading &&
        !message &&
        libraryBooks.length > 0 &&
        filteredLibraryBooks.length === 0 && (
          <p className="library-message">No books found.</p>
        )}

      <div className={`saved-book-list saved-book-list--${viewType}`}>
        {filteredLibraryBooks.map((item) => (
          <Link
            className="saved-book-card"
            key={item.id}
            to={`/books/${item.id}`}
          >
            {!isTextView && (
              <div className="saved-book-cover">
                {item.book?.thumbnail ? (
                  <img src={item.book.thumbnail} alt="" />
                ) : (
                  <span>No cover</span>
                )}
              </div>
            )}
            <div className="saved-book-info">
              <h3>{item.book?.title || 'Untitled'}</h3>
              <p>{item.book?.author || '-'}</p>
              <p>{item.book?.publisher || '-'}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}

export default Home

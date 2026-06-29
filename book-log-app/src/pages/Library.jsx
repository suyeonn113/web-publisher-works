import { useEffect, useMemo, useState } from 'react'
import BookResultCard from '../components/BookResultCard'
import BookSearchForm from '../components/BookSearchForm'
import { useToast } from '../components/ToastProvider'
import { searchBooks } from '../services/bookSearchService'
import { getBookDocumentId, getMyLibraryBooks, saveBookToMyLibrary } from '../services/libraryService'

function Library({ user }) {
  const { showToast } = useToast()
  const [query, setQuery] = useState('')
  const [books, setBooks] = useState([])
  const [isSearching, setIsSearching] = useState(false)
  const [savingBookId, setSavingBookId] = useState('')
  const [savedBookIds, setSavedBookIds] = useState([])
  const [message, setMessage] = useState('')
  const savedBookIdSet = useMemo(() => new Set(savedBookIds), [savedBookIds])

  useEffect(() => {
    if (!user) {
      setSavedBookIds([])
      return undefined
    }

    let ignore = false

    async function loadSavedBookIds() {
      try {
        const libraryBooks = await getMyLibraryBooks(user)

        if (!ignore) {
          setSavedBookIds(libraryBooks.map((item) => item.bookId))
        }
      } catch (error) {
        if (!ignore) {
          showToast(error.message)
        }
      }
    }

    loadSavedBookIds()

    return () => {
      ignore = true
    }
  }, [showToast, user])

  const handleSearch = async (event) => {
    event.preventDefault()
    setMessage('')
    setIsSearching(true)

    try {
      const results = await searchBooks(query)
      setBooks(results)
      setMessage(results.length ? '' : 'No books found.')
    } catch (error) {
      showToast(error.message)
    } finally {
      setIsSearching(false)
    }
  }

  const handleSave = async (book) => {
    setMessage('')
    setSavingBookId(book.id)

    try {
      const bookId = await saveBookToMyLibrary(user, book)
      setSavedBookIds((current) => (current.includes(bookId) ? current : [...current, bookId]))
      showToast('Added')
    } catch (error) {
      showToast(error.message)
    } finally {
      setSavingBookId('')
    }
  }

  return (
    <section className="library-page">
      <div className="library-heading">
        <p className="eyebrow">Library</p>
        <h1>Library</h1>
      </div>

      <BookSearchForm
        query={query}
        isLoading={isSearching}
        onQueryChange={setQuery}
        onSubmit={handleSearch}
      />

      {message && <p className="library-message">{message}</p>}

      <div className="book-result-list">
        {books.map((book) => (
          <BookResultCard
            key={book.id}
            book={book}
            isAdded={savedBookIdSet.has(getBookDocumentId(book))}
            isSaving={savingBookId === book.id}
            onSave={handleSave}
          />
        ))}
      </div>
    </section>
  )
}

export default Library

import { useState } from 'react'
import BookResultCard from '../components/BookResultCard'
import BookSearchForm from '../components/BookSearchForm'
import { searchBooks } from '../services/bookSearchService'
import { saveBookToMyLibrary } from '../services/libraryService'

function Library({ user }) {
  const [query, setQuery] = useState('')
  const [books, setBooks] = useState([])
  const [isSearching, setIsSearching] = useState(false)
  const [savingBookId, setSavingBookId] = useState('')
  const [message, setMessage] = useState('')

  const handleSearch = async (event) => {
    event.preventDefault()
    setMessage('')
    setIsSearching(true)

    try {
      const results = await searchBooks(query)
      setBooks(results)
      setMessage(results.length ? '' : 'No books found.')
    } catch (error) {
      setMessage(error.message)
    } finally {
      setIsSearching(false)
    }
  }

  const handleSave = async (book) => {
    setMessage('')
    setSavingBookId(book.id)

    try {
      await saveBookToMyLibrary(user, book)
      setMessage('Saved to your library.')
    } catch (error) {
      setMessage(error.message)
    } finally {
      setSavingBookId('')
    }
  }

  return (
    <section className="library-page">
      <div className="library-heading">
        <p className="eyebrow">My library</p>
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
            isSaving={savingBookId === book.id}
            onSave={handleSave}
          />
        ))}
      </div>
    </section>
  )
}

export default Library

function BookSearchForm({ query, isLoading, onQueryChange, onSubmit }) {
  return (
    <form className="book-search-form" onSubmit={onSubmit}>
      <label className="book-search-label" htmlFor="book-search">
        Book title
      </label>
      <div className="book-search-row">
        <input
          id="book-search"
          type="search"
          value={query}
          onChange={(event) => onQueryChange(event.target.value)}
          placeholder="Search by title"
        />
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Searching' : 'Search'}
        </button>
      </div>
    </form>
  )
}

export default BookSearchForm

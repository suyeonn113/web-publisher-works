function BookResultCard({ book, isAdded, isSaving, onSave }) {
  return (
    <article className="book-result-card">
      <div className="book-cover">
        {book.thumbnail ? (
          <img src={book.thumbnail} alt="" />
        ) : (
          <span>No cover</span>
        )}
      </div>

      <div className="book-result-body">
        <h2>{book.title}</h2>
        <dl>
          <div>
            <dt>Author</dt>
            <dd>{book.author || '-'}</dd>
          </div>
          <div>
            <dt>Publisher</dt>
            <dd>{book.publisher || '-'}</dd>
          </div>
          <div>
            <dt>ISBN</dt>
            <dd className="book-result-isbn">{book.isbn13 || book.isbn || '-'}</dd>
          </div>
        </dl>
        {book.description && <p>{book.description}</p>}
        <button type="button" onClick={() => onSave(book)} disabled={isSaving || isAdded}>
          {isAdded ? 'Added' : isSaving ? 'Saving' : 'Add'}
        </button>
      </div>
    </article>
  )
}

export default BookResultCard

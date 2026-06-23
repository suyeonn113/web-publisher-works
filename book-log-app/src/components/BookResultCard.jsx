function BookResultCard({ book, isSaving, onSave }) {
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
            <dd>{book.isbn13 || book.isbn || '-'}</dd>
          </div>
        </dl>
        {book.description && <p>{book.description}</p>}
        <button type="button" onClick={() => onSave(book)} disabled={isSaving}>
          {isSaving ? 'Saving' : 'Save to library'}
        </button>
      </div>
    </article>
  )
}

export default BookResultCard

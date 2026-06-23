import { doc, serverTimestamp, setDoc } from 'firebase/firestore'
import { db } from '../firebase/firebase'

function getBookDocumentId(book) {
  return String(book.isbn13 || book.isbn || book.id).replace(/[/.#[\]]/g, '-')
}

export async function saveBookToMyLibrary(user, book) {
  const bookId = getBookDocumentId(book)
  const personalBookId = `${user.uid}_${bookId}`

  await setDoc(
    doc(db, 'books', bookId),
    {
      id: bookId,
      aladinId: book.id || '',
      title: book.title || '',
      author: book.author || '',
      publisher: book.publisher || '',
      thumbnail: book.thumbnail || '',
      description: book.description || '',
      isbn: book.isbn || '',
      isbn13: book.isbn13 || '',
      link: book.link || '',
      source: 'aladin',
      updatedAt: serverTimestamp(),
      createdAt: serverTimestamp(),
    },
    { merge: true },
  )

  await setDoc(
    doc(db, 'personalBooks', personalBookId),
    {
      id: personalBookId,
      userId: user.uid,
      bookId,
      status: 'reading',
      rating: 0,
      syncEnabled: false,
      source: 'personal',
      viewType: 'cover',
      deletedAt: null,
      updatedAt: serverTimestamp(),
      createdAt: serverTimestamp(),
    },
    { merge: true },
  )

  return bookId
}

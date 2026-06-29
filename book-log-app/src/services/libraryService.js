import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from 'firebase/firestore'
import { db } from '../firebase/firebase'

export function getBookDocumentId(book) {
  return String(book.isbn13 || book.isbn || book.id).replace(/[/.#[\]]/g, '-')
}

function getTodayDateInputValue() {
  return new Date().toISOString().slice(0, 10)
}

export async function saveBookToMyLibrary(user, book) {
  const bookId = getBookDocumentId(book)
  const personalBookId = `${user.uid}_${bookId}`
  const addedDate = getTodayDateInputValue()

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
      status: 'unfinished',
      readCount: 1,
      rating: 0,
      syncEnabled: false,
      source: 'personal',
      viewType: 'cover',
      addedDate,
      readDate: addedDate,
      deletedAt: null,
      updatedAt: serverTimestamp(),
      createdAt: serverTimestamp(),
    },
    { merge: true },
  )

  return bookId
}

export async function getLibraryBookDetail(user, personalBookId) {
  const personalBookSnap = await getDoc(doc(db, 'personalBooks', personalBookId))

  if (!personalBookSnap.exists()) {
    throw new Error('Book not found')
  }

  const libraryItem = personalBookSnap.data()

  if (libraryItem.userId !== user.uid) {
    throw new Error('You do not have access to this book')
  }

  const bookSnap = await getDoc(doc(db, 'books', libraryItem.bookId))

  return {
    ...libraryItem,
    book: bookSnap.exists() ? bookSnap.data() : null,
  }
}

export async function updateLibraryBookMeta(personalBookId, meta) {
  await updateDoc(doc(db, 'personalBooks', personalBookId), {
    ...meta,
    updatedAt: serverTimestamp(),
  })
}

export async function deleteLibraryBook(personalBookId) {
  await updateDoc(doc(db, 'personalBooks', personalBookId), {
    deletedAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  })
}

export async function restoreLibraryBook(personalBookId) {
  await updateDoc(doc(db, 'personalBooks', personalBookId), {
    deletedAt: null,
    updatedAt: serverTimestamp(),
  })
}

export async function getMyLibraryBooks(user) {
  const personalBooksQuery = query(
    collection(db, 'personalBooks'),
    where('userId', '==', user.uid),
    where('deletedAt', '==', null),
  )
  const personalBooksSnap = await getDocs(personalBooksQuery)
  const personalBooks = personalBooksSnap.docs.map((item) => item.data())

  const books = await Promise.all(
    personalBooks.map(async (libraryItem) => {
      const bookSnap = await getDoc(doc(db, 'books', libraryItem.bookId))
      return {
        ...libraryItem,
        book: bookSnap.exists() ? bookSnap.data() : null,
      }
    }),
  )

  return books.sort((a, b) => {
    const aCreatedAt = a.createdAt?.toMillis?.() || 0
    const bCreatedAt = b.createdAt?.toMillis?.() || 0

    return bCreatedAt - aCreatedAt
  })
}

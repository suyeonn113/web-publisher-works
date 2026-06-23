const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || ''

export async function searchBooks(query) {
  const keyword = query.trim()

  if (!keyword) {
    return []
  }

  const response = await fetch(
    `${API_BASE_URL}/api/search-books?query=${encodeURIComponent(keyword)}`,
  )

  if (!response.ok) {
    const errorBody = await response.json().catch(() => null)
    throw new Error(errorBody?.message || 'Failed to search books')
  }

  const data = await response.json()
  return data.books || []
}

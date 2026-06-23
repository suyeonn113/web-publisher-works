const ALADIN_SEARCH_URL = 'https://www.aladin.co.kr/ttb/api/ItemSearch.aspx'

function normalizeBook(item) {
  return {
    id: item.itemId ? String(item.itemId) : item.isbn13 || item.isbn,
    title: item.title || '',
    author: item.author || '',
    publisher: item.publisher || '',
    thumbnail: item.cover || '',
    description: item.description || '',
    isbn: item.isbn || '',
    isbn13: item.isbn13 || '',
    pubDate: item.pubDate || '',
    link: item.link || '',
  }
}

export default async function handler(request, response) {
  response.setHeader('Access-Control-Allow-Origin', '*')
  response.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS')
  response.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (request.method === 'OPTIONS') {
    response.status(204).end()
    return
  }

  if (request.method !== 'GET') {
    response.status(405).json({ message: 'Method not allowed' })
    return
  }

  const query = String(request.query.query || '').trim()

  if (!query) {
    response.status(400).json({ message: 'Query is required' })
    return
  }

  const ttbKey = process.env.ALADIN_TTB_KEY

  if (!ttbKey) {
    response.status(500).json({ message: 'Aladin API key is missing' })
    return
  }

  const params = new URLSearchParams({
    ttbkey: ttbKey,
    Query: query,
    QueryType: 'Title',
    MaxResults: '10',
    start: '1',
    SearchTarget: 'Book',
    output: 'js',
    Version: '20131101',
    Cover: 'Big',
  })

  try {
    const aladinResponse = await fetch(`${ALADIN_SEARCH_URL}?${params}`)

    if (!aladinResponse.ok) {
      response.status(aladinResponse.status).json({
        message: 'Aladin API request failed',
      })
      return
    }

    const data = await aladinResponse.json()
    const books = Array.isArray(data.item) ? data.item.map(normalizeBook) : []

    response.status(200).json({ books })
  } catch (error) {
    response.status(500).json({
      message: 'Failed to search books',
      detail: error instanceof Error ? error.message : String(error),
    })
  }
}

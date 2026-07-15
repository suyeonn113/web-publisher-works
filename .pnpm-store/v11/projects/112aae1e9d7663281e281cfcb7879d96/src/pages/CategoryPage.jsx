import { useParams } from 'react-router-dom'
import './CategoryPage.scss'

const categoryPlaceholders = {
  beauty: {
    title: '뷰티&헬스',
    description: '기존 뷰티&헬스 페이지와 연결할 예정입니다.',
  },
  new: {
    title: '신상',
    description: '기존 신상 페이지와 연결할 예정입니다.',
  },
}

function CategoryPage() {
  const { categoryId } = useParams()
  const placeholder = categoryPlaceholders[categoryId] ?? {
    title: '카테고리',
    description: '페이지 준비중입니다.',
  }

  return (
    <section className="page-placeholder">
      <h1>{placeholder.title}</h1>
      <p>{placeholder.description}</p>
    </section>
  )
}

export default CategoryPage

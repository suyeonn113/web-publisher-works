import CategoryMenuGrid from './CategoryMenuGrid'
import './HomeCategoryMenuSection.scss'

const categoryMenus = [
  { id: 'beauty', label: '뷰티', image: '/images/home-category/makeup.png' },
  { id: 'kitchen', label: '주방', image: '/images/home-category/pot.png' },
  { id: 'bath', label: '욕실', image: '/images/home-category/cleaner.png' },
  { id: 'storage', label: '수납', image: '/images/home-category/living-box.png' },
  { id: 'stationery', label: '문구', image: '/images/home-category/pen.png' },
  { id: 'interior', label: '인테리어', image: '/images/home-category/diffuser.png' },
  { id: 'digital', label: '디지털', image: '/images/home-category/Phone.png' },
  { id: 'food', label: '식품', image: '/images/home-category/can.png' },
  { id: 'sports', label: '스포츠', image: '/images/home-category/dumbbell.png' },
  { id: 'fashion', label: '패션', image: '/images/home-category/pants.png' },
  { id: 'pet', label: '반려동물', image: '/images/home-category/pet-toy.png' },
  { id: 'kids', label: '유아', image: '/images/home-category/kids-toy.png' },
]

function HomeCategoryMenuSection() {
  return (
    <section className="home-section home-category-menu-section">
      <CategoryMenuGrid categories={categoryMenus} />
    </section>
  )
}

export default HomeCategoryMenuSection

import ScrollNavigator from '../../common/ScrollNavigator/ScrollNavigator'
import NewArrivalVideoCard from './NewArrivalVideoCard'

function NewArrivalCarousel({ contents }) {
  return (
    <ScrollNavigator
      targetSelector=".new-arrival-carousel"
      previousLabel="이전 신상 콘텐츠 보기"
      nextLabel="다음 신상 콘텐츠 보기"
    >
      <div className="new-arrival-carousel">
        {contents.map((content) => (
          <NewArrivalVideoCard key={content.id} content={content} />
        ))}
      </div>
    </ScrollNavigator>
  )
}

export default NewArrivalCarousel

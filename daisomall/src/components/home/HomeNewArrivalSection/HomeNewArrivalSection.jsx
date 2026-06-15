import SectionHeader from '../../common/SectionHeader/SectionHeader'
import { newArrivalContents } from '../../../data/newArrivalContents'
import NewArrivalCarousel from './NewArrivalCarousel'
import './HomeNewArrivalSection.scss'

function HomeNewArrivalSection() {
  return (
    <section className="home-section">
      <SectionHeader title="신상발견" />
      <NewArrivalCarousel contents={newArrivalContents} />
    </section>
  )
}

export default HomeNewArrivalSection

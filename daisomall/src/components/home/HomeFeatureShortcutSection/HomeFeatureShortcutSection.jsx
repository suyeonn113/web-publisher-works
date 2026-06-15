import { featureShortcuts } from '../../../data/featureShortcuts'
import FeatureShortcutList from './FeatureShortcutList'
import './HomeFeatureShortcutSection.scss'

function HomeFeatureShortcutSection() {
  return (
    <section className="home-section home-feature-shortcut-section">
      <FeatureShortcutList shortcuts={featureShortcuts} />
    </section>
  )
}

export default HomeFeatureShortcutSection

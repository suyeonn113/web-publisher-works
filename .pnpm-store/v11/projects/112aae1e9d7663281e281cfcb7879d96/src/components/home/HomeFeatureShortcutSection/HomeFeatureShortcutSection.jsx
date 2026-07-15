import { featureShortcuts } from '../../../data/featureShortcuts'
import FeatureShortcutButton from './FeatureShortcutButton'
import './HomeFeatureShortcutSection.scss'

function HomeFeatureShortcutSection() {
  return (
    <section className="home-section home-feature-shortcut-section">
      <div className="feature-shortcut-list">
        {featureShortcuts.map((shortcut) => (
          <FeatureShortcutButton key={shortcut.id} shortcut={shortcut} />
        ))}
      </div>
    </section>
  )
}

export default HomeFeatureShortcutSection

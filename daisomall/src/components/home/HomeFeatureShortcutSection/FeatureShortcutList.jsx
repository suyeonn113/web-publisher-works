import FeatureShortcutButton from './FeatureShortcutButton'

function FeatureShortcutList({ shortcuts }) {
  return (
    <div className="feature-shortcut-list">
      {shortcuts.map((shortcut) => (
        <FeatureShortcutButton key={shortcut.id} shortcut={shortcut} />
      ))}
    </div>
  )
}

export default FeatureShortcutList

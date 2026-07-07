import { getPublicAssetPath } from '../../../utils/getPublicAssetPath'

function FeatureShortcutButton({ shortcut }) {
  return (
    <button
      type="button"
      className="feature-shortcut-button"
      aria-label={`${shortcut.label} 준비 중`}
    >
      <img src={getPublicAssetPath(shortcut.image)} alt="" aria-hidden="true" />
      <span>{shortcut.label}</span>
    </button>
  )
}

export default FeatureShortcutButton

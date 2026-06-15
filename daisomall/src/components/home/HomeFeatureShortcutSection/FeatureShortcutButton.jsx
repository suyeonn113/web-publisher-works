import { Link } from 'react-router-dom'
import { getPublicAssetPath } from '../../../utils/getPublicAssetPath'

function FeatureShortcutButton({ shortcut }) {
  return (
    <Link to="#" className="feature-shortcut-button">
      <img src={getPublicAssetPath(shortcut.image)} alt="" />
      <span>{shortcut.label}</span>
    </Link>
  )
}

export default FeatureShortcutButton

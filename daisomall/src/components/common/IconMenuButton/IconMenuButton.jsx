import { getPublicAssetPath } from '../../../utils/getPublicAssetPath'
import './IconMenuButton.scss'

function IconMenuButton({ image, label }) {
  return (
    <button type="button" className="icon-menu-button">
      <span className="icon-menu-button__image">
        <img src={getPublicAssetPath(image)} alt="" />
      </span>
      <span>{label}</span>
    </button>
  )
}

export default IconMenuButton

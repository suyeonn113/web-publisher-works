import { iconSize } from '../../../tokens/size';
import LoginIcon from '../../icons/LoginIcon';

export default function HeaderLoginLink({
  labelMode = 'full',
  iconSizeValue = iconSize.xs,
  onClick,
}) {
  const isIconOnly = labelMode === 'icon';
  const isTextOnly = labelMode === 'text';

  return (
    <button
      className="site-header__login-link"
      aria-label={isIconOnly ? '로그인' : undefined}
      type="button"
      onClick={onClick}
    >
      {!isTextOnly && (
        <LoginIcon
          className="site-header__action-symbol"
          size={iconSizeValue}
        />
      )}

      {!isIconOnly && <span>로그인</span>}
    </button>
  );
}

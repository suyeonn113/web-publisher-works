import { useEffect, useRef, useState } from 'react';

import { ROUTES } from '../../constants/routes';
import { usePanelTransition } from '../../hooks/usePanelTransition';
import { iconSize } from '../../tokens/size';
import SearchIcon from '../icons/SearchIcon';
import SquarePenIcon from '../icons/SquarePenIcon';
import SmartPhoneIcon from '../icons/SmartPhoneIcon';
import XIcon from '../icons/XIcon';


const loginTabs = [
  { id: 'member', label: '회원 로그인' },
  { id: 'guest', label: '비회원 로그인' },
];

export default function LoginPanel({ isOpen, onClose }) {
  const [activeTabId, setActiveTabId] = useState(loginTabs[0].id);
  const closeButtonRef = useRef(null);
  const { shouldRender, transitionState } = usePanelTransition(isOpen);

  useEffect(() => {
    if (!isOpen || !shouldRender) return undefined;

    const frameId = requestAnimationFrame(() => {
      closeButtonRef.current?.focus();
    });

    const handleEscape = (event) => {
      if (event.key === 'Escape') onClose();
    };

    document.addEventListener('keydown', handleEscape);

    return () => {
      cancelAnimationFrame(frameId);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose, shouldRender]);

  if (!shouldRender) return null;

  const isMemberLogin = activeTabId === 'member';
  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <div className="login-panel" role="presentation" data-state={transitionState}>
      <button
        className="login-panel__backdrop panel-motion--fade"
        type="button"
        aria-hidden="true"
        tabIndex={-1}
        onClick={onClose}
      />

      <aside
        className="login-panel__dialog panel-motion--slide-right"
        role="dialog"
        aria-modal="true"
        aria-labelledby="login-panel-title"
      >
        <div className="login-panel__header">
          <h2 className="login-panel__title" id="login-panel-title">
            로그인
          </h2>

          <button
            ref={closeButtonRef}
            className="login-panel__close"
            type="button"
            aria-label="로그인 창 닫기"
            onClick={onClose}
          >
            <XIcon size={iconSize.md} />
          </button>
        </div>

        <div className="login-panel__tabs" role="tablist" aria-label="로그인 유형">
          {loginTabs.map((tab) => (
            <button
              className={`login-panel__tab${
                activeTabId === tab.id ? ' login-panel__tab--active' : ''
              }`}
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={activeTabId === tab.id}
              onClick={() => setActiveTabId(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <form className="login-panel__form" onSubmit={handleSubmit}>
          {isMemberLogin ? (
            <>
              <input
                className="login-panel__input"
                type="text"
                placeholder="아이디"
                autoComplete="username"
              />

              <input
                className="login-panel__input"
                type="password"
                placeholder="비밀번호"
                autoComplete="current-password"
              />

              <p className="login-panel__notice">
                아이디와 비밀번호는 대소문자를 구분하여 입력해 주시기 바랍니다.
              </p>
            </>
          ) : (
            <>
              <div className="login-panel__email-row">
                <input
                  className="login-panel__input"
                  type="text"
                  placeholder="이메일 아이디"
                  autoComplete="email"
                />

                <span className="login-panel__email-at">@</span>

                <input
                  className="login-panel__input"
                  type="text"
                  placeholder="도메인"
                />
              </div>

              <input
                className="login-panel__input"
                type="text"
                placeholder="예약번호"
              />
            </>
          )}

          <button className="login-panel__submit" type="submit">
            로그인
          </button>
        </form>

        {isMemberLogin && (
          <div className="login-panel__simple">
            <button className="login-panel__simple-button" type="button">
              <SmartPhoneIcon className="login-panel__link-icon" size={iconSize.sm} />
              <span>휴대폰 간편 로그인</span>
              <span className="login-panel__ad-text">로그인플러스유료서비스광고AD</span>
            </button>
          </div>
        )}

        {isMemberLogin && (
          <div className="login-panel__links">
            <a className="login-panel__link" href={ROUTES.auth.login}>
              <SearchIcon className="login-panel__link-icon" size={iconSize.sm} />
              <span>아이디 / 비밀번호 찾기</span>
            </a>

            <a className="login-panel__link" href={ROUTES.auth.login}>
              <SquarePenIcon className="login-panel__link-icon" size={iconSize.sm} />
              <span>회원가입</span>
            </a>
          </div>
        )}

        <div className="login-panel__ad">
          <img className="login-panel__ad-image" src="" alt="" />
        </div>
      </aside>
    </div>
  );
}

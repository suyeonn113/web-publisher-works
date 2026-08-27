/* ==========================================================
    MENU PANEL SCRIPT INDEX (메뉴 패널 스크립트 구조)

    1. Base Setup (기본 설정)

    2. Shared Utilities (공통 유틸 함수)

    3. Compact Header Menu (컴팩트 헤더 메뉴)
        3-1. State Helpers (상태 처리)
        3-2. Open / Close / Toggle (열기 / 닫기 / 토글)
        3-3. Interaction Binding (이벤트 바인딩)
        3-4. Viewport Sync (뷰포트 대응)

    4. Default Header Menu (기본 헤더 메뉴)
        4-1. Open / Close / Sync (열기 / 닫기 / 동기화)
        4-2. Interaction Binding (이벤트 바인딩)

    5. Default Header Column Layout (기본 헤더 컬럼 레이아웃)
        5-1. Build Columns (컬럼 생성)
        5-2. Restore Columns (원래 구조 복구)
        5-3. Update by Viewport / Mode (뷰포트 / 모드 대응)

    6. Default Header Mega Menu (기본 헤더 전체 메뉴)
        6-1. Entry Focus Flow (진입 포커스 흐름)
        6-2. Internal Focus Flow (내부 포커스 이동)
        6-3. Focus Style / Current State (포커스 스타일 / 현재 상태)
        6-4. Action Blocking (동작 차단)
        6-5. Dismiss (닫기 처리)

    7. Default Header Mode Switching (기본 헤더 모드 전환)

    8. Toggle Button Binding (토글 버튼 연결)

    9. Initial Boot (초기 실행)

========================================================== */


document.addEventListener('DOMContentLoaded', () => {

    /* ===== 1. Base Setup (기본 설정) ===== */

    // CSS global-nav.css의 헤더 구조 전환점과 항상 같이 변경한다.
    const compactMq = window.matchMedia('(max-width: 47.9375rem)');
    const defaultHeaderMq = window.matchMedia('(min-width: 48rem)');
    const menuPanel = document.getElementById('menu-panel');

    document.querySelectorAll('.skip-links__link').forEach((link) => {
        link.addEventListener('click', (event) => {
            const targetId = link.getAttribute('href');
            const target = targetId ? document.querySelector(targetId) : null;

            if (!target) return;

            event.preventDefault();
            target.setAttribute('tabindex', '-1');
            target.focus({ preventScroll: true });
            target.scrollIntoView({ block: 'start' });
            history.replaceState(null, '', targetId);
        });
    });

    document.addEventListener('click', (event) => {
        const disabledAction = event.target.closest(
            'a[aria-disabled="true"], button[aria-disabled="true"]'
        );

        if (!disabledAction) return;
        event.preventDefault();
    });

    if (!menuPanel) return;

    let cleanupDefaultMenu = null;
    let cleanupMenuColumns = null;
    let cleanupCompactHeaderMenu = null;
    let cleanupDefaultHeaderScroll = null;

    /* ===== 2. Shared Utilities (공통 유틸 함수) ===== */
    // addListenerWithCleanup
    // addMqChangeListener
    // cleanupCurrentMode
    // getTargetPanel
    function addListenerWithCleanup(target, type, handler, options) {
        target.addEventListener(type, handler, options);
        return () => target.removeEventListener(type, handler, options);
    }

    function addMqChangeListener(mq, handler) {
        if (mq.addEventListener) {
            mq.addEventListener('change', handler);
            return () => mq.removeEventListener('change', handler);
        }

        mq.addListener(handler);
        return () => mq.removeListener(handler);
    }

    function cleanupCurrentMode() {
        if (cleanupDefaultMenu) {
            cleanupDefaultMenu();
            cleanupDefaultMenu = null;
        }

        if (cleanupMenuColumns) {
            cleanupMenuColumns();
            cleanupMenuColumns = null;
        }
    }

    function getTargetPanel(button) {
            const panelId = button.getAttribute('aria-controls');
            if (!panelId) return null;
            return document.getElementById(panelId);
        }

    function initDefaultHeaderScroll() {
        const siteHeader = document.querySelector('body > header');
        const mainMenu = menuPanel.querySelector('.main-menu');

        if (!siteHeader || !mainMenu) return () => {};

        const cleanups = [];
        let lastScrollY = window.scrollY;
        let ticking = false;
        const SCROLL_THRESHOLD = 8;

        function syncLayoutVars() {
            if (!defaultHeaderMq.matches) return;

            const headerHeight = siteHeader.getBoundingClientRect().height;
            const menuHeight = mainMenu.getBoundingClientRect().height;

            document.documentElement.style.setProperty('--global-header-height', `${headerHeight}px`);
            document.documentElement.style.setProperty('--global-menu-height', `${menuHeight}px`);
        }

        function resetDefaultLayoutState() {
            document.body.classList.remove('is-default-menu-stuck');
            document.documentElement.style.removeProperty('--global-header-height');
            document.documentElement.style.removeProperty('--global-menu-height');
        }

        function resetDefaultHeaderState() {
            document.body.classList.remove('is-header-hidden');
            resetDefaultLayoutState();
        }

        function updateScrollState() {
            if (!defaultHeaderMq.matches) {
                resetDefaultLayoutState();
                ticking = false;
                return;
            }

            syncLayoutVars();

            const currentY = window.scrollY;
            const delta = currentY - lastScrollY;
            const isNearTop = currentY <= 4;

            document.body.classList.toggle('is-default-menu-stuck', currentY > 4);

            if (isNearTop) {
                document.body.classList.remove('is-header-hidden');
            } else if (Math.abs(delta) >= SCROLL_THRESHOLD) {
                document.body.classList.toggle('is-header-hidden', delta > 0);
            }

            lastScrollY = currentY;
            ticking = false;
        }

        function requestScrollStateUpdate() {
            if (ticking) return;
            ticking = true;
            requestAnimationFrame(updateScrollState);
        }

        syncLayoutVars();
        updateScrollState();

        cleanups.push(addListenerWithCleanup(window, 'scroll', requestScrollStateUpdate, { passive: true }));
        cleanups.push(addListenerWithCleanup(window, 'resize', requestScrollStateUpdate));
        cleanups.push(addMqChangeListener(defaultHeaderMq, requestScrollStateUpdate));

        return () => {
            resetDefaultHeaderState();
            cleanups.forEach((cleanup) => cleanup());
        };
    }

    /* ===== 3. Compact Header Menu (컴팩트 헤더 메뉴) ===== */

    function initCompactHeaderMenu() {
        const compactMenuButton = document.querySelector('.header-menu-toggle');
        const siteHeader = document.querySelector('body > .site-header');
        const closeButton = menuPanel.querySelector('.button--close');
        const mainButtons = menuPanel.querySelectorAll('.main-menu__button[aria-controls]');
        const subPanel = menuPanel.querySelector('.sub-panel');

        if (!compactMenuButton || !siteHeader || !closeButton || !subPanel || !mainButtons.length) return () => {};

        const cleanups = [];
        let lastFocusedElement = null;
        const compactBackgroundState = new Map();

        function getCompactFocusableElements() {
            const selector = [
                'a[href]',
                'button:not([disabled])',
                'input:not([disabled])',
                'select:not([disabled])',
                'textarea:not([disabled])',
                '[tabindex]:not([tabindex="-1"])'
            ].join(',');

            return Array.from(menuPanel.querySelectorAll(selector)).filter((element) => {
                return !element.hidden && element.getClientRects().length > 0;
            });
        }

        function setCompactBackgroundInert(isInert) {
            if (isInert) {
                Array.from(document.body.children).forEach((element) => {
                    if (element === menuPanel || element.tagName === 'SCRIPT') return;

                    compactBackgroundState.set(element, {
                        inert: element.inert,
                        ariaHidden: element.getAttribute('aria-hidden')
                    });
                    element.inert = true;
                    element.setAttribute('aria-hidden', 'true');
                });
                return;
            }

            compactBackgroundState.forEach((state, element) => {
                element.inert = state.inert;
                if (state.ariaHidden === null) {
                    element.removeAttribute('aria-hidden');
                } else {
                    element.setAttribute('aria-hidden', state.ariaHidden);
                }
            });
            compactBackgroundState.clear();
        }

        /* --- scroll 상태 --- */
        let lastScrollY = window.scrollY;
        const SCROLL_THRESHOLD = 8;

        /* --- 3-1. State Helpers (상태 관련 함수) --- */
        // setCurrentMainButton
        // setCurrentMainButtonByPanel
        // scrollToPanel
        // focusFirstSubLink
        // isCompactMenuOpen
        // handleHeaderScroll
        function setCurrentMainButton(currentButton) {
            const mainButtons = menuPanel.querySelectorAll('.main-menu__button[aria-controls]');

            mainButtons.forEach((button) => {
                if (button === currentButton) {
                    button.setAttribute('data-current', 'true');
                } else {
                    button.removeAttribute('data-current');
                }
            });
        }

        function setCurrentMainButtonByPanel(panelItem) {
            if (!panelItem) return;

            const panelId = panelItem.id;
            const targetButton = menuPanel.querySelector(
                `.main-menu__button[aria-controls="${panelId}"]`
            );

            if (!targetButton) return;
            setCurrentMainButton(targetButton);
        }

        function scrollToPanel(panelItem) {
            if (!panelItem) return;

            panelItem.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
                inline: 'nearest'
            });
        }

        function focusFirstSubLink(panelItem) {
            if (!panelItem) return;

            const firstSubLink = panelItem.querySelector('.sub-menu__link');
            if (!firstSubLink) return;

            requestAnimationFrame(() => {
                firstSubLink.focus();
            });
        }

        function isCompactMenuOpen() {
            return (
                menuPanel.dataset.compactMenuState === 'open' &&
                compactMenuButton.getAttribute('aria-expanded') === 'true'
            );
        }

        function setHeaderScrollState(state) {
            document.body.classList.toggle('is-header-hidden', state === 'hidden');
        }

        function handleHeaderScroll() {
            if (defaultHeaderMq.matches) return;

            const currentY = window.scrollY;
            const delta = currentY - lastScrollY;
            const isHeaderInteractionOpen =
                isCompactMenuOpen() || siteHeader.classList.contains('is-search-open');

            if (isHeaderInteractionOpen || currentY < 40) {
                setHeaderScrollState('visible');
                lastScrollY = currentY;
                return;
            }

            if (Math.abs(delta) < SCROLL_THRESHOLD) return;

            setHeaderScrollState(delta > 0 ? 'hidden' : 'visible');
            lastScrollY = currentY;
        }

        /* --- 3-2. Open / Close / Toggle (열기/닫기/토글) --- */
        // openCompactMenu
        // closeCompactMenu
        // toggleCompactMenu
        function openCompactMenu() {
            lastFocusedElement = document.activeElement;

            menuPanel.dataset.compactMenuState = 'open';

            compactMenuButton.setAttribute('aria-expanded', 'true');
            compactMenuButton.setAttribute('aria-label', '전체 메뉴 닫기');

            if (compactMq.matches) {
                document.body.classList.add('no-scroll');
            }

            setHeaderScrollState('visible');
            setCompactBackgroundInert(true);
            closeButton.focus();
        }

        function closeCompactMenu({ restoreFocus = true } = {}) {
            menuPanel.dataset.compactMenuState = 'closed';

            compactMenuButton.setAttribute('aria-expanded', 'false');
            compactMenuButton.setAttribute('aria-label', '전체 메뉴 열기');

            document.body.classList.remove('no-scroll');
            setCompactBackgroundInert(false);

            if (
                restoreFocus &&
                lastFocusedElement &&
                typeof lastFocusedElement.focus === 'function'
            ) {
                lastFocusedElement.focus();
            }

            setHeaderScrollState('visible');
        }

        function toggleCompactMenu() {
            const isOpen =
                menuPanel.dataset.compactMenuState === 'open' &&
                compactMenuButton.getAttribute('aria-expanded') === 'true';

            if (isOpen) {
                closeCompactMenu();
                return;
            }

            openCompactMenu();
        }

        if (!menuPanel.dataset.compactMenuState) {
            menuPanel.dataset.compactMenuState = 'closed';
        }

        // 초기 상태
        setHeaderScrollState('visible');

        /* --- 3-3. Interaction Binding (이벤트 연결) --- */
        // click / keydown / outside click / scroll 등
        cleanups.push(
            addListenerWithCleanup(compactMenuButton, 'click', (event) => {
                if (defaultHeaderMq.matches) return;
                event.preventDefault();
                event.stopPropagation();
                toggleCompactMenu();
            })
        );

        cleanups.push(
            addListenerWithCleanup(compactMenuButton, 'keydown', (event) => {
                if (defaultHeaderMq.matches) return;
                if (event.key !== 'Enter' && event.key !== ' ' && event.key !== 'Spacebar') return;
                event.preventDefault();
                event.stopPropagation();
                toggleCompactMenu();
            })
        );

        cleanups.push(
            addListenerWithCleanup(closeButton, 'click', (event) => {
                if (defaultHeaderMq.matches) return;
                event.preventDefault();
                event.stopPropagation();
                closeCompactMenu();
            })
        );

        cleanups.push(
            addListenerWithCleanup(closeButton, 'keydown', (event) => {
                if (defaultHeaderMq.matches) return;
                if (event.key !== 'Enter' && event.key !== ' ' && event.key !== 'Spacebar') return;
                event.preventDefault();
                event.stopPropagation();
                closeCompactMenu();
            })
        );

        cleanups.push(
            addListenerWithCleanup(document, 'keydown', (event) => {
                if (defaultHeaderMq.matches) return;
                if (menuPanel.dataset.compactMenuState !== 'open') return;

                if (event.key === 'Escape') {
                    event.preventDefault();
                    closeCompactMenu();
                    return;
                }

                if (event.key !== 'Tab') return;

                const focusableElements = getCompactFocusableElements();
                if (!focusableElements.length) {
                    event.preventDefault();
                    closeButton.focus();
                    return;
                }

                const firstElement = focusableElements[0];
                const lastElement = focusableElements[focusableElements.length - 1];

                if (event.shiftKey && document.activeElement === firstElement) {
                    event.preventDefault();
                    lastElement.focus();
                } else if (!event.shiftKey && document.activeElement === lastElement) {
                    event.preventDefault();
                    firstElement.focus();
                }
            })
        );

        cleanups.push(
            addListenerWithCleanup(document, 'click', (event) => {
                if (defaultHeaderMq.matches) return;
                if (menuPanel.dataset.compactMenuState !== 'open') return;
                if (menuPanel.contains(event.target)) return;
                if (compactMenuButton.contains(event.target)) return;

                closeCompactMenu();
            })
        );

        cleanups.push(
            addListenerWithCleanup(menuPanel, 'click', (event) => {
                if (defaultHeaderMq.matches) return;

                const mainButton = event.target.closest('.main-menu__button[aria-controls]');
                const subLink = event.target.closest('.sub-menu__link');

                if (mainButton) {
                    if (!isCompactMenuOpen()) return;

                    const targetPanel = getTargetPanel(mainButton);
                    if (!targetPanel) return;

                    event.preventDefault();
                    setCurrentMainButton(mainButton);
                    scrollToPanel(targetPanel);
                    return;
                }

                if (subLink) {
                    if (!isCompactMenuOpen()) return;

                    const panelItem = subLink.closest('.sub-panel__item');
                    setCurrentMainButtonByPanel(panelItem);
                }
            })
        );

        cleanups.push(
            addListenerWithCleanup(menuPanel, 'keydown', (event) => {
                if (defaultHeaderMq.matches) return;

                const mainButton = event.target.closest('.main-menu__button[aria-controls]');
                if (!mainButton) return;
                if (!isCompactMenuOpen()) return;

                const isOpenKey =
                    event.key === 'Enter' ||
                    event.key === ' ' ||
                    event.key === 'Spacebar' ||
                    event.key === 'ArrowDown' ||
                    event.key === 'ArrowRight';

                if (!isOpenKey) return;

                const targetPanel = getTargetPanel(mainButton);
                if (!targetPanel) return;

                event.preventDefault();
                setCurrentMainButton(mainButton);
                scrollToPanel(targetPanel);
                focusFirstSubLink(targetPanel);
            })
        );

        cleanups.push(
            addListenerWithCleanup(menuPanel, 'focusin', (event) => {
                if (defaultHeaderMq.matches) return;

                const subLink = event.target.closest('.sub-menu__link');
                if (!subLink) return;
                if (!isCompactMenuOpen()) return;

                const panelItem = subLink.closest('.sub-panel__item');
                setCurrentMainButtonByPanel(panelItem);
            })
        );

        cleanups.push(
            addListenerWithCleanup(menuPanel, 'keydown', (event) => {
                if (defaultHeaderMq.matches || !isCompactMenuOpen()) return;

                const subLink = event.target.closest('.sub-menu__link');
                if (!subLink) return;
                const panelItem = subLink.closest('.sub-panel__item');
                if (!panelItem) return;

                if (event.key === 'ArrowLeft') {
                    const parentButton = menuPanel.querySelector(
                        `.main-menu__button[aria-controls="${panelItem.id}"]`
                    );
                    if (!parentButton) return;
                    event.preventDefault();
                    parentButton.focus();
                    return;
                }

                if (event.key !== 'ArrowDown' && event.key !== 'ArrowUp') return;
                const links = Array.from(panelItem.querySelectorAll('.sub-menu__link'));
                const currentIndex = links.indexOf(subLink);
                if (currentIndex < 0) return;
                const offset = event.key === 'ArrowDown' ? 1 : -1;
                const nextIndex = (currentIndex + offset + links.length) % links.length;
                event.preventDefault();
                links[nextIndex].focus();
            })
        );

        cleanups.push(
            addListenerWithCleanup(window, 'scroll', handleHeaderScroll, { passive: true })
        );

        /* --- 3-4. Viewport Sync (뷰포트 대응) --- */
        // matchMedia 변경 대응
        cleanups.push(
            addMqChangeListener(defaultHeaderMq, () => {
                closeCompactMenu({ restoreFocus: false });
                setHeaderScrollState('visible');

                if (defaultHeaderMq.matches) {
                    activateDefaultMenu();
                    return;
                }

                cleanupCurrentMode();

                const subPanel = menuPanel.querySelector('.sub-panel');
                const panelItems = menuPanel.querySelectorAll('.sub-panel__item');
                const mainButtons = menuPanel.querySelectorAll('.main-menu__button');

                mainButtons.forEach((button) => {
                    button.setAttribute('aria-expanded', 'false');
                    button.removeAttribute('data-current');
                });

                panelItems.forEach((panel) => {
                    panel.hidden = false;
                });

                if (subPanel) {
                    subPanel.hidden = false;
                    subPanel.style.position = '';
                    subPanel.style.left = '';
                    subPanel.style.top = '';
                }

                menuPanel.dataset.defaultMenuState = 'closed';
            })
        );

        return () => {
            document.body.classList.remove('no-scroll', 'is-header-hidden');
            setCompactBackgroundInert(false);
            cleanups.forEach((cleanup) => cleanup());
        };
    }


    /* ===== 4. Default Header Menu (기본 헤더 메뉴) ===== */

    function initDefaultMenu() {
        if (menuPanel.dataset.menuMode !== 'default') return () => {};

        const mainButtons = menuPanel.querySelectorAll('.main-menu__button');
        const mainLinks = menuPanel.querySelectorAll('.main-menu__link');
        const panelItems = menuPanel.querySelectorAll('.sub-panel__item');
        const subPanel = menuPanel.querySelector('.sub-panel');

        if (!subPanel || !mainButtons.length || !panelItems.length) return () => {};

        const cleanups = [];
        let activeButton = null;

        /* --- 4-1. Open / Close / Sync (열기/닫기/동기화) --- */
        // openPanel
        // closePanel
        // syncMenuByViewport
        function positionPanel(button) {
            if (!button || subPanel.hidden) return;

            const targetPanel = getTargetPanel(button);
            if (!targetPanel) return;

            const buttonRect = button.getBoundingClientRect();
            const menuPanelRect = menuPanel.getBoundingClientRect();
            const top = buttonRect.bottom - menuPanelRect.top;

            subPanel.style.position = 'absolute';
            subPanel.style.left = '50%';
            subPanel.style.top = `${top}px`;
        }

        function openPanel(button) {
            const targetPanel = getTargetPanel(button);
            if (!targetPanel) return;

            mainButtons.forEach((btn) => {
                const isCurrent = btn === button;
                btn.setAttribute('aria-expanded', String(isCurrent));
            });
            activeButton = button;

            panelItems.forEach((panel) => {
                panel.hidden = panel !== targetPanel;
            });

            subPanel.hidden = false;
            menuPanel.dataset.defaultMenuState = 'open';
            positionPanel(button);
        }

        function closePanel({ restoreFocus = false } = {}) {
            if (!defaultHeaderMq.matches || menuPanel.dataset.menuMode !== 'default') return;

            const buttonToRestore = activeButton;

            mainButtons.forEach((btn) => {
                btn.setAttribute('aria-expanded', 'false');
            });

            panelItems.forEach((panel) => {
                panel.hidden = true;
            });

            subPanel.hidden = true;
            subPanel.style.position = '';
            subPanel.style.left = '';
            subPanel.style.top = '';
            menuPanel.dataset.defaultMenuState = 'closed';
            activeButton = null;

            if (restoreFocus && buttonToRestore) {
                requestAnimationFrame(() => buttonToRestore.focus());
            }
        }

        function syncMenuByViewport() {
            const isDefaultHeaderMenu = defaultHeaderMq.matches && menuPanel.dataset.menuMode === 'default';

            if (isDefaultHeaderMenu) {
                closePanel();
                return;
            }

            mainButtons.forEach((btn) => {
                btn.setAttribute('aria-expanded', 'false');
            });

            panelItems.forEach((panel) => {
                panel.hidden = false;
            });

            subPanel.hidden = false;
            subPanel.style.position = '';
            subPanel.style.left = '';
            subPanel.style.top = '';
            menuPanel.dataset.defaultMenuState = 'closed';
        }

        /* --- 4-2. Interaction Binding (이벤트 연결) --- */
        // initPcMenu 내부
        function initPcMenu() {
            mainButtons.forEach((button) => {
                cleanups.push(
                    addListenerWithCleanup(button, 'click', (event) => {
                        if (!defaultHeaderMq.matches) return;
                        if (menuPanel.dataset.menuMode !== 'default') return;

                        event.preventDefault();

                        const isCurrentPanelOpen =
                            menuPanel.dataset.defaultMenuState === 'open' &&
                            activeButton === button;

                        if (isCurrentPanelOpen) {
                            closePanel();
                            return;
                        }

                        openPanel(button);
                    })
                );

                // 서브 메뉴 포커스
                cleanups.push(
                    addListenerWithCleanup(button, 'keydown', (e) => {
                        if (!defaultHeaderMq.matches) return;

                        const isOpenKey =
                            e.key === 'Enter' ||
                            e.key === ' ' ||
                            e.key === 'Spacebar' ||
                            e.key === 'ArrowDown' ||
                            e.key === 'ArrowRight';

                        if (!isOpenKey) return;

                        const targetPanel = getTargetPanel(button);
                        if (!targetPanel) return;

                        const firstSubLink = targetPanel.querySelector('.sub-menu__link');
                        if (!firstSubLink) return;

                        e.preventDefault();
                        openPanel(button);
                        firstSubLink.focus();
                    })
                );

                // 서브 메뉴 포커스 끝난 후 다음 메인 메뉴 포커스
                const targetPanel = getTargetPanel(button);
                if (!targetPanel) return;

                const subLinks = targetPanel.querySelectorAll('.sub-menu__link');
                const firstSubLink = subLinks[0];
                const lastSubLink = subLinks[subLinks.length - 1];

                subLinks.forEach((subLink, index) => {
                    cleanups.push(
                        addListenerWithCleanup(subLink, 'keydown', (e) => {
                            if (!defaultHeaderMq.matches || menuPanel.dataset.menuMode !== 'default') return;

                            if (e.key === 'Escape') {
                                e.preventDefault();
                                closePanel({ restoreFocus: true });
                                return;
                            }

                            if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
                                e.preventDefault();
                                const offset = e.key === 'ArrowDown' ? 1 : -1;
                                const nextIndex = (index + offset + subLinks.length) % subLinks.length;
                                subLinks[nextIndex].focus();
                            }
                        })
                    );
                });

                if (firstSubLink) {
                    cleanups.push(
                        addListenerWithCleanup(firstSubLink, 'keydown', (e) => {
                            if (!defaultHeaderMq.matches || e.key !== 'Tab' || !e.shiftKey) return;
                            e.preventDefault();
                            closePanel();
                            button.focus();
                        })
                    );
                }

                if (lastSubLink) {
                    cleanups.push(
                        addListenerWithCleanup(lastSubLink, 'keydown', (e) => {
                            if (!defaultHeaderMq.matches) return;
                            if (e.key !== 'Tab' || e.shiftKey) return;

                            const mainMenuItems = Array.from(
                                menuPanel.querySelectorAll('.main-menu > li > button, .main-menu > li > a')
                            );

                            const currentIndex = mainMenuItems.indexOf(button);
                            const nextButton = mainMenuItems[currentIndex + 1];

                            if (!nextButton) {
                                closePanel();
                                return;
                            }

                            e.preventDefault();
                            closePanel();
                            nextButton.focus();
                        })
                    );
                }
            });

            mainLinks.forEach((link) => {
                cleanups.push(
                    addListenerWithCleanup(link, 'focus', () => {
                        if (!defaultHeaderMq.matches) return;
                        if (menuPanel.dataset.menuMode !== 'default') return;
                        closePanel();
                    })
                );

                cleanups.push(
                    addListenerWithCleanup(link, 'click', () => {
                        if (!defaultHeaderMq.matches) return;
                        if (menuPanel.dataset.menuMode !== 'default') return;
                        closePanel();
                    })
                );
            });

            cleanups.push(
                addListenerWithCleanup(menuPanel, 'focusout', (e) => {
                    if (!defaultHeaderMq.matches) return;

                    const nextFocus = e.relatedTarget;

                    if (nextFocus && menuPanel.contains(nextFocus)) return;

                    closePanel();
                })
            );

            cleanups.push(
                addListenerWithCleanup(document, 'keydown', (event) => {
                    if (!defaultHeaderMq.matches) return;
                    if (menuPanel.dataset.menuMode !== 'default') return;
                    if (menuPanel.dataset.defaultMenuState !== 'open') return;
                    if (event.key !== 'Escape') return;

                    event.preventDefault();
                    closePanel({ restoreFocus: true });
                })
            );

            cleanups.push(
                addListenerWithCleanup(document, 'pointerdown', (event) => {
                    if (!defaultHeaderMq.matches) return;
                    if (menuPanel.dataset.menuMode !== 'default') return;
                    if (menuPanel.dataset.defaultMenuState !== 'open') return;
                    if (menuPanel.contains(event.target)) return;

                    closePanel();
                })
            );

            cleanups.push(
                addListenerWithCleanup(window, 'resize', () => {
                    if (!defaultHeaderMq.matches) return;
                    if (menuPanel.dataset.menuMode !== 'default') return;
                    if (menuPanel.dataset.defaultMenuState !== 'open') return;

                    positionPanel(activeButton);
                })
            );
        }

        initPcMenu();
        syncMenuByViewport();

        cleanups.push(addMqChangeListener(defaultHeaderMq, syncMenuByViewport));

        return () => {
            cleanups.forEach((cleanup) => cleanup());
        };
    }


    /* ===== 5. Default Header Column Layout (기본 헤더 컬럼 레이아웃) ===== */

    function initMenuColumns() {
        const panelItems = document.querySelectorAll('#menu-panel .sub-panel__item');

        const cleanups = [];

        /* --- 5-1. Build Columns (컬럼 생성) --- */
        // buildMenuColumns
        function buildMenuColumns(panelItem) {
            if (panelItem.dataset.columnsBuilt === 'true') return;

            const menu = panelItem.querySelector('.sub-menu');
            if (!menu) return;

            const items = Array.from(menu.querySelectorAll(':scope > .sub-menu__item'));

            if (!items.length) return;

            const columnsWrap = document.createElement('div');
            columnsWrap.className = 'sub-menu__columns';

            const menuGrid = document.createElement('ul');
            menuGrid.className = 'sub-menu sub-menu__column';

            items.forEach((item) => {
                menuGrid.appendChild(item);
            });

            columnsWrap.appendChild(menuGrid);

            menu.style.display = '';
            panelItem.appendChild(columnsWrap);
            panelItem.dataset.columnsBuilt = 'true';
        }

        /* --- 5-2. Restore Columns (원래 구조 복구) --- */
        // restoreMenuColumns
        function restoreMenuColumns(panelItem) {
            if (panelItem.dataset.columnsBuilt !== 'true') return;

            const menu = panelItem.querySelector('.sub-menu');
            const columnsWrap = panelItem.querySelector('.sub-menu__columns');

            if (!menu || !columnsWrap) return;

            const items = columnsWrap.querySelectorAll('.sub-menu__item');
            items.forEach((item) => {
                menu.appendChild(item);
            });

            columnsWrap.remove();
            menu.style.display = '';
            panelItem.dataset.columnsBuilt = 'false';
        }

        /* --- 5-3. Update by Viewport / Mode (상태에 따른 업데이트) --- */
        // updateMenuColumns
        function updateMenuColumns() {
            const isDefaultMode = menuPanel?.dataset.menuMode === 'default';

            panelItems.forEach((panelItem) => {
                if (defaultHeaderMq.matches && isDefaultMode) {
                    buildMenuColumns(panelItem);
                } else {
                    restoreMenuColumns(panelItem);
                }
            });
        }

        updateMenuColumns();
        cleanups.push(addMqChangeListener(defaultHeaderMq, updateMenuColumns));

        return () => {
            panelItems.forEach((panelItem) => {
                restoreMenuColumns(panelItem);
            });

            cleanups.forEach((cleanup) => cleanup());
        };
    }


    /* ===== 6. Default Header Activation (기본 헤더 활성화) ===== */
    function activateDefaultMenu() {
        cleanupCurrentMode();
        menuPanel.dataset.menuMode = 'default';
        cleanupMenuColumns = initMenuColumns();
        cleanupDefaultMenu = initDefaultMenu();
    }

    /* ===== 7. Initial Boot (초기 실행) ===== */
    cleanupDefaultHeaderScroll = initDefaultHeaderScroll();
    cleanupCompactHeaderMenu = initCompactHeaderMenu();
    activateDefaultMenu();

});

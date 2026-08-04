/* ==========================================================
    MENU PANEL SCRIPT INDEX (메뉴 패널 스크립트 구조)

    1. Base Setup (기본 설정)

    2. Shared Utilities (공통 유틸 함수)

    3. Mobile / Tablet Menu (모바일 / 태블릿 메뉴)
        3-1. State Helpers (상태 처리)
        3-2. Open / Close / Toggle (열기 / 닫기 / 토글)
        3-3. Interaction Binding (이벤트 바인딩)
        3-4. Viewport Sync (뷰포트 대응)

    4. Desktop Drawer Menu (데스크톱 드로어 메뉴)
        4-1. Open / Close / Sync (열기 / 닫기 / 동기화)
        4-2. Interaction Binding (이벤트 바인딩)

    5. Desktop Column Layout (데스크톱 컬럼 레이아웃)
        5-1. Build Columns (컬럼 생성)
        5-2. Restore Columns (원래 구조 복구)
        5-3. Update by Viewport / Mode (뷰포트 / 모드 대응)

    6. Desktop Mega Menu (데스크톱 메가 메뉴)
        6-1. Entry Focus Flow (진입 포커스 흐름)
        6-2. Internal Focus Flow (내부 포커스 이동)
        6-3. Focus Style / Current State (포커스 스타일 / 현재 상태)
        6-4. Action Blocking (동작 차단)
        6-5. Dismiss (닫기 처리)

    7. Desktop Mode Switching (모드 전환)

    8. Toggle Button Binding (토글 버튼 연결)

    9. Initial Boot (초기 실행)

========================================================== */


document.addEventListener('DOMContentLoaded', () => {

    /* ===== 1. Base Setup (기본 설정) ===== */

    const mobileMq = window.matchMedia('(max-width: 767px)');
    const desktopMq = window.matchMedia('(min-width: 1248px)');
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

    if (!menuPanel) return;

    let cleanupDrawerMenu = null;
    let cleanupMegaMenu = null;
    let cleanupMenuColumns = null;
    let cleanupMobileTabletMenu = null;
    let cleanupDesktopHeaderScroll = null;

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
        if (cleanupDrawerMenu) {
            cleanupDrawerMenu();
            cleanupDrawerMenu = null;
        }

        if (cleanupMegaMenu) {
            cleanupMegaMenu();
            cleanupMegaMenu = null;
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

    function initDesktopHeaderScroll() {
        const topBar = document.querySelector('.top-bar');
        const siteHeader = document.querySelector('body > header');
        const mainMenu = menuPanel.querySelector('.main-menu');

        if (!siteHeader || !mainMenu) return () => {};

        const cleanups = [];
        let lastScrollY = window.scrollY;
        let ticking = false;
        const SCROLL_THRESHOLD = 8;

        function syncLayoutVars() {
            if (!desktopMq.matches) return;

            const topBarHeight = topBar ? topBar.getBoundingClientRect().height : 0;
            const headerHeight = siteHeader.getBoundingClientRect().height;
            const menuHeight = mainMenu.getBoundingClientRect().height;

            document.documentElement.style.setProperty('--global-top-bar-height', `${topBarHeight}px`);
            document.documentElement.style.setProperty('--global-header-height', `${headerHeight}px`);
            document.documentElement.style.setProperty('--global-menu-height', `${menuHeight}px`);
        }

        function resetDesktopHeaderState() {
            document.body.classList.remove('is-header-hidden', 'is-desktop-menu-stuck');
            document.documentElement.style.removeProperty('--global-top-bar-height');
            document.documentElement.style.removeProperty('--global-header-height');
            document.documentElement.style.removeProperty('--global-menu-height');
        }

        function updateScrollState() {
            if (!desktopMq.matches) {
                resetDesktopHeaderState();
                ticking = false;
                return;
            }

            syncLayoutVars();

            const currentY = window.scrollY;
            const delta = currentY - lastScrollY;
            const isNearTop = currentY <= 4;

            document.body.classList.toggle('is-desktop-menu-stuck', currentY > 4);

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
        cleanups.push(addMqChangeListener(desktopMq, requestScrollStateUpdate));

        return () => {
            resetDesktopHeaderState();
            cleanups.forEach((cleanup) => cleanup());
        };
    }

    /* ===== 3. Mobile / Tablet Menu (모바일 / 태블릿 메뉴) ===== */

    function initMobileTabletMenu() {
        const mobileMenuButton = document.querySelector('.quick-menu__button--menu');
        const quickMenu = document.querySelector('.quick-menu');
        const closeButton = menuPanel.querySelector('.button--close');
        const mainButtons = menuPanel.querySelectorAll('.main-menu__button[aria-controls]');
        const subPanel = menuPanel.querySelector('.sub-panel');

        if (!mobileMenuButton || !quickMenu || !closeButton || !subPanel || !mainButtons.length) return () => {};

        const cleanups = [];
        let lastFocusedElement = null;

        function syncQuickMenuHeight() {
            if (desktopMq.matches) {
                document.documentElement.style.removeProperty('--global-quick-menu-height');
                return;
            }

            const quickMenuHeight = quickMenu.getBoundingClientRect().height;
            if (quickMenuHeight > 0) {
                document.documentElement.style.setProperty(
                    '--global-quick-menu-height',
                    `${quickMenuHeight}px`
                );
            }
        }

        const quickMenuResizeObserver = typeof ResizeObserver === 'function'
            ? new ResizeObserver(syncQuickMenuHeight)
            : null;

        syncQuickMenuHeight();
        requestAnimationFrame(syncQuickMenuHeight);
        quickMenuResizeObserver?.observe(quickMenu);
        cleanups.push(addListenerWithCleanup(window, 'resize', syncQuickMenuHeight));

        /* --- scroll 상태 --- */
        let lastScrollY = window.scrollY;
        const SCROLL_THRESHOLD = 8;

        /* --- 3-1. State Helpers (상태 관련 함수) --- */
        // setCurrentMainButton
        // setCurrentMainButtonByPanel
        // scrollToPanel
        // focusFirstSubLink
        // setQuickMenuScrollState
        // isMobileTabletMenuOpen
        // handleQuickMenuScroll
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

        function setQuickMenuScrollState(state) {
            // data-scroll-state="visible | hidden"
            quickMenu.dataset.scrollState = state;
        }

        function isMobileTabletMenuOpen() {
            return (
                menuPanel.dataset.mobileMenuState === 'open' &&
                mobileMenuButton.getAttribute('aria-expanded') === 'true'
            );
        }

        function handleQuickMenuScroll() {
            if (desktopMq.matches) return;

            const currentY = window.scrollY;
            const delta = currentY - lastScrollY;

            // 메뉴 열려 있으면 항상 보이게
            if (isMobileTabletMenuOpen()) {
                setQuickMenuScrollState('visible');
                lastScrollY = currentY;
                return;
            }

            // 상단 근처에서는 항상 보이게
            if (currentY < 40) {
                setQuickMenuScrollState('visible');
                lastScrollY = currentY;
                return;
            }

            // 미세한 스크롤은 무시
            if (Math.abs(delta) < SCROLL_THRESHOLD) return;

            if (delta > 0) {
                // ↓ 아래로 스크롤 → 숨김
                setQuickMenuScrollState('hidden');
            } else {
                // ↑ 위로 스크롤 → 표시
                setQuickMenuScrollState('visible');
            }

            lastScrollY = currentY;
        }

        /* --- 3-2. Open / Close / Toggle (열기/닫기/토글) --- */
        // openMobileTabletMenu
        // closeMobileTabletMenu
        // toggleMobileTabletMenu
        function openMobileTabletMenu() {
            lastFocusedElement = document.activeElement;

            menuPanel.dataset.mobileMenuState = 'open';

            mobileMenuButton.setAttribute('aria-expanded', 'true');

            if (mobileMq.matches) {
                document.body.classList.add('no-scroll');
            }

            setQuickMenuScrollState('visible');
            closeButton.focus();
        }

        function closeMobileTabletMenu({ restoreFocus = true } = {}) {
            menuPanel.dataset.mobileMenuState = 'closed';

            mobileMenuButton.setAttribute('aria-expanded', 'false');

            document.body.classList.remove('no-scroll');

            if (
                restoreFocus &&
                lastFocusedElement &&
                typeof lastFocusedElement.focus === 'function'
            ) {
                lastFocusedElement.focus();
            }

            setQuickMenuScrollState('visible');
        }

        function toggleMobileTabletMenu() {
            const isOpen =
                menuPanel.dataset.mobileMenuState === 'open' &&
                mobileMenuButton.getAttribute('aria-expanded') === 'true';

            if (isOpen) {
                closeMobileTabletMenu();
                return;
            }

            openMobileTabletMenu();
        }

        if (!menuPanel.dataset.mobileMenuState) {
            menuPanel.dataset.mobileMenuState = 'closed';
        }

        // 초기 상태
        setQuickMenuScrollState('visible');

        /* --- 3-3. Interaction Binding (이벤트 연결) --- */
        // click / keydown / outside click / scroll 등
        cleanups.push(
            addListenerWithCleanup(mobileMenuButton, 'click', (event) => {
                if (desktopMq.matches) return;
                event.preventDefault();
                event.stopPropagation();
                toggleMobileTabletMenu();
            })
        );

        cleanups.push(
            addListenerWithCleanup(mobileMenuButton, 'keydown', (event) => {
                if (desktopMq.matches) return;
                if (event.key !== 'Enter' && event.key !== ' ' && event.key !== 'Spacebar') return;
                event.preventDefault();
                event.stopPropagation();
                toggleMobileTabletMenu();
            })
        );

        cleanups.push(
            addListenerWithCleanup(closeButton, 'click', (event) => {
                if (desktopMq.matches) return;
                event.preventDefault();
                event.stopPropagation();
                closeMobileTabletMenu();
            })
        );

        cleanups.push(
            addListenerWithCleanup(closeButton, 'keydown', (event) => {
                if (desktopMq.matches) return;
                if (event.key !== 'Enter' && event.key !== ' ' && event.key !== 'Spacebar') return;
                event.preventDefault();
                event.stopPropagation();
                closeMobileTabletMenu();
            })
        );

        cleanups.push(
            addListenerWithCleanup(document, 'keydown', (event) => {
                if (desktopMq.matches) return;
                if (menuPanel.dataset.mobileMenuState !== 'open') return;
                if (event.key !== 'Escape') return;

                event.preventDefault();
                closeMobileTabletMenu();
            })
        );

        cleanups.push(
            addListenerWithCleanup(document, 'click', (event) => {
                if (desktopMq.matches) return;
                if (menuPanel.dataset.mobileMenuState !== 'open') return;
                if (menuPanel.contains(event.target)) return;
                if (mobileMenuButton.contains(event.target)) return;

                closeMobileTabletMenu();
            })
        );

        cleanups.push(
            addListenerWithCleanup(menuPanel, 'click', (event) => {
                if (desktopMq.matches) return;

                const mainButton = event.target.closest('.main-menu__button[aria-controls]');
                const subLink = event.target.closest('.sub-menu__link');

                if (mainButton) {
                    if (!isMobileTabletMenuOpen()) return;

                    const targetPanel = getTargetPanel(mainButton);
                    if (!targetPanel) return;

                    event.preventDefault();
                    setCurrentMainButton(mainButton);
                    scrollToPanel(targetPanel);
                    return;
                }

                if (subLink) {
                    if (!isMobileTabletMenuOpen()) return;

                    const panelItem = subLink.closest('.sub-panel__item');
                    setCurrentMainButtonByPanel(panelItem);
                }
            })
        );

        cleanups.push(
            addListenerWithCleanup(menuPanel, 'keydown', (event) => {
                if (desktopMq.matches) return;

                const mainButton = event.target.closest('.main-menu__button[aria-controls]');
                if (!mainButton) return;
                if (!isMobileTabletMenuOpen()) return;

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
                if (desktopMq.matches) return;

                const subLink = event.target.closest('.sub-menu__link');
                if (!subLink) return;
                if (!isMobileTabletMenuOpen()) return;

                const panelItem = subLink.closest('.sub-panel__item');
                setCurrentMainButtonByPanel(panelItem);
            })
        );

        cleanups.push(
            addListenerWithCleanup(menuPanel, 'keydown', (event) => {
                if (desktopMq.matches || !isMobileTabletMenuOpen()) return;

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
            addListenerWithCleanup(window, 'scroll', handleQuickMenuScroll, { passive: true })
        );

        /* --- 3-4. Viewport Sync (뷰포트 대응) --- */
        // matchMedia 변경 대응
        cleanups.push(
            addMqChangeListener(desktopMq, () => {
                closeMobileTabletMenu({ restoreFocus: false });
                setQuickMenuScrollState('visible');
                syncQuickMenuHeight();

                if (desktopMq.matches) {
                    switchMenuMode('drawer');
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

                menuPanel.dataset.pcMenuState = 'closed';
            })
        );

        return () => {
            document.body.classList.remove('no-scroll');
            quickMenuResizeObserver?.disconnect();
            document.documentElement.style.removeProperty('--global-quick-menu-height');
            cleanups.forEach((cleanup) => cleanup());
        };
    }


    /* ===== 4. Desktop Drawer Menu (데스크톱 드로어 메뉴) ===== */

    function initDrawerMenu() {
        if (menuPanel.dataset.menuMode !== 'drawer') return () => {};

        const mainButtons = menuPanel.querySelectorAll('.main-menu__button');
        const mainLinks = menuPanel.querySelectorAll('.main-menu__link');
        const megaButton = menuPanel.querySelector('.button--mega-menu');
        const panelItems = menuPanel.querySelectorAll('.sub-panel__item');
        const subPanel = menuPanel.querySelector('.sub-panel');

        if (!subPanel || !mainButtons.length || !panelItems.length) return () => {};

        const cleanups = [];
        let activeButton = null;

        /* --- 4-1. Open / Close / Sync (열기/닫기/동기화) --- */
        // openPanel
        // closePanel
        // syncMenuByViewport
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

            // 위치 계산
            const buttonRect = button.getBoundingClientRect();
            const menuPanelRect = menuPanel.getBoundingClientRect();

            const left = buttonRect.left - menuPanelRect.left;
            const top = buttonRect.bottom - menuPanelRect.top + 8;

            subPanel.style.position = 'absolute';
            subPanel.style.left = `${left}px`;
            subPanel.style.top = `${top}px`;

            subPanel.hidden = false;
            menuPanel.dataset.pcMenuState = 'open';
        }

        function closePanel({ restoreFocus = false } = {}) {
            if (!desktopMq.matches || menuPanel.dataset.menuMode !== 'drawer') return;

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
            menuPanel.dataset.pcMenuState = 'closed';
            activeButton = null;

            if (restoreFocus && buttonToRestore) {
                requestAnimationFrame(() => buttonToRestore.focus());
            }
        }

        function syncMenuByViewport() {
            const isDrawerDesktop = desktopMq.matches && menuPanel.dataset.menuMode === 'drawer';

            if (isDrawerDesktop) {
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
            menuPanel.dataset.pcMenuState = 'closed';
        }

        /* --- 4-2. Interaction Binding (이벤트 연결) --- */
        // initPcMenu 내부
        function initPcMenu() {
            mainButtons.forEach((button) => {
                cleanups.push(
                    addListenerWithCleanup(button, 'mouseenter', () => {
                        if (!desktopMq.matches) return;
                        openPanel(button);
                    })
                );

                // 서브 메뉴 포커스
                cleanups.push(
                    addListenerWithCleanup(button, 'keydown', (e) => {
                        if (!desktopMq.matches) return;

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
                            if (!desktopMq.matches || menuPanel.dataset.menuMode !== 'drawer') return;

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
                            if (!desktopMq.matches || e.key !== 'Tab' || !e.shiftKey) return;
                            e.preventDefault();
                            closePanel();
                            button.focus();
                        })
                    );
                }

                if (lastSubLink) {
                    cleanups.push(
                        addListenerWithCleanup(lastSubLink, 'keydown', (e) => {
                            if (!desktopMq.matches) return;
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
                    addListenerWithCleanup(link, 'mouseenter', () => {
                        if (!desktopMq.matches) return;
                        if (menuPanel.dataset.menuMode !== 'drawer') return;
                        closePanel();
                    })
                );

                cleanups.push(
                    addListenerWithCleanup(link, 'focus', () => {
                        if (!desktopMq.matches) return;
                        if (menuPanel.dataset.menuMode !== 'drawer') return;
                        closePanel();
                    })
                );
            });

            if (megaButton) {
                cleanups.push(
                    addListenerWithCleanup(megaButton, 'mouseenter', () => {
                        if (!desktopMq.matches) return;
                        if (menuPanel.dataset.menuMode !== 'drawer') return;
                        closePanel();
                    })
                );

                cleanups.push(
                    addListenerWithCleanup(megaButton, 'focus', () => {
                        if (!desktopMq.matches) return;
                        if (menuPanel.dataset.menuMode !== 'drawer') return;
                        closePanel();
                    })
                );
            }

            cleanups.push(
                addListenerWithCleanup(menuPanel, 'mouseleave', () => {
                    if (!desktopMq.matches) return;
                    closePanel();
                })
            );

            cleanups.push(
                addListenerWithCleanup(menuPanel, 'focusout', (e) => {
                    if (!desktopMq.matches) return;

                    const nextFocus = e.relatedTarget;

                    if (nextFocus && menuPanel.contains(nextFocus)) return;

                    closePanel();
                })
            );

            cleanups.push(
                addListenerWithCleanup(document, 'keydown', (event) => {
                    if (!desktopMq.matches) return;
                    if (menuPanel.dataset.menuMode !== 'drawer') return;
                    if (menuPanel.dataset.pcMenuState !== 'open') return;
                    if (event.key !== 'Escape') return;

                    event.preventDefault();
                    closePanel({ restoreFocus: true });
                })
            );
        }

        initPcMenu();
        syncMenuByViewport();

        cleanups.push(addMqChangeListener(desktopMq, syncMenuByViewport));

        return () => {
            cleanups.forEach((cleanup) => cleanup());
        };
    }


    /* ===== 5. Desktop Column Layout (컬럼 레이아웃) ===== */

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

            for (let i = 0; i < items.length; i += 4) {
                const column = document.createElement('ul');
                column.className = 'sub-menu sub-menu__column';

                items.slice(i, i + 4).forEach((item) => {
                    column.appendChild(item);
                });

                columnsWrap.appendChild(column);
            }

            menu.style.display = 'none';
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
            const isDrawerMode = menuPanel?.dataset.menuMode === 'drawer';

            panelItems.forEach((panelItem) => {
                if (desktopMq.matches && isDrawerMode) {
                    buildMenuColumns(panelItem);
                } else {
                    restoreMenuColumns(panelItem);
                }
            });
        }

        updateMenuColumns();
        cleanups.push(addMqChangeListener(desktopMq, updateMenuColumns));

        return () => {
            panelItems.forEach((panelItem) => {
                restoreMenuColumns(panelItem);
            });

            cleanups.forEach((cleanup) => cleanup());
        };
    }


    /* ===== 6. Desktop Mega Menu (메가 메뉴) ===== */
    
    function initMegaMenu() {
        if (menuPanel.dataset.menuMode !== 'mega') return () => {};

        const cleanups = [];
        const subPanel = menuPanel.querySelector('.sub-panel');
        const panelItems = menuPanel.querySelectorAll('.sub-panel__item');

        if (subPanel) subPanel.hidden = false;
        panelItems.forEach((panel) => {
            panel.hidden = false;
        });

        /* --- 6-1. Entry Focus Flow (진입 포커스 흐름) --- */
        // setupMegaMenuEntryFlow
        function setupMegaMenuEntryFlow() {
            const closeButton = menuPanel.querySelector('.button--close');
            const firstSubLink = menuPanel.querySelector('.sub-panel__item .sub-menu__item a');

            if (!closeButton || !firstSubLink) return;

            cleanups.push(
                addListenerWithCleanup(closeButton, 'keydown', (event) => {
                    if (event.key === 'Tab' && !event.shiftKey) {
                        event.preventDefault();
                        firstSubLink.focus();
                    }
                })
            );

            cleanups.push(
                addListenerWithCleanup(firstSubLink, 'keydown', (event) => {
                    if (event.key === 'Tab' && event.shiftKey) {
                        event.preventDefault();
                        closeButton.focus();
                    }
                })
            );
        }

        /* --- 6-2. Internal Focus Flow (내부 포커스 이동) --- */
        // setupMegaMenuFocusFlow
        function setupMegaMenuFocusFlow() {
            const panel3Last = menuPanel.querySelector('#panel-3 .sub-menu__item:last-child a');
            const mainMenuLink = menuPanel.querySelector('.main-menu__link');
            const panel4First = menuPanel.querySelector('#panel-4 .sub-menu__item a');

            if (!panel3Last || !mainMenuLink || !panel4First) return;

            cleanups.push(
                addListenerWithCleanup(panel3Last, 'keydown', (event) => {
                    if (event.key === 'Tab' && !event.shiftKey) {
                        event.preventDefault();
                        mainMenuLink.focus();
                    }
                })
            );

            cleanups.push(
                addListenerWithCleanup(mainMenuLink, 'keydown', (event) => {
                    if (event.key === 'Tab' && !event.shiftKey) {
                        event.preventDefault();
                        panel4First.focus();
                    }

                    if (event.key === 'Tab' && event.shiftKey) {
                        event.preventDefault();
                        panel3Last.focus();
                    }
                })
            );

            cleanups.push(
                addListenerWithCleanup(panel4First, 'keydown', (event) => {
                    if (event.key === 'Tab' && event.shiftKey) {
                        event.preventDefault();
                        mainMenuLink.focus();
                    }
                })
            );
        }

        /* --- 6-3. Current Label / Focus Style (현재 상태 표시) --- */
        // setCurrentMainLabel
        // clearCurrentMainLabel
        function setupMegaMenuFocusStyle() {
            function clearCurrentMainLabel() {
                const mainButtons = menuPanel.querySelectorAll('.main-menu__button[aria-controls]');

                mainButtons.forEach((button) => {
                    button.removeAttribute('data-current');
                });
            }
            
            function setCurrentMainLabel(panelId) {
                const targetButton = menuPanel.querySelector(
                    `.main-menu__button[aria-controls="${panelId}"]`
                );

                clearCurrentMainLabel();

                if (targetButton) {
                    targetButton.setAttribute('data-current', 'true');
                }
            }
            
            /* --- 6-4. Action Blocking (동작 차단) --- */
            // 클릭 / 키 이벤트 제한
            cleanups.push(
                addListenerWithCleanup(menuPanel, 'focusin', (event) => {
                    const subLink = event.target.closest('.sub-menu__link');
                    if (!subLink) return;

                    const panelItem = subLink.closest('.sub-panel__item');
                    if (!panelItem) return;

                    setCurrentMainLabel(panelItem.id);
                })
            );

            cleanups.push(
                addListenerWithCleanup(menuPanel, 'focusout', (event) => {
                    const nextFocus = event.relatedTarget;

                    if (nextFocus && menuPanel.contains(nextFocus)) return;

                    clearCurrentMainLabel();
                })
            );

            cleanups.push(
                addListenerWithCleanup(menuPanel, 'mouseover', (event) => {
                    const subLink = event.target.closest('.sub-menu__link');
                    if (!subLink) return;

                    const panelItem = subLink.closest('.sub-panel__item');
                    if (!panelItem) return;

                    setCurrentMainLabel(panelItem.id);
                })
            );

            cleanups.push(
                addListenerWithCleanup(menuPanel, 'mouseout', (event) => {
                    const nextHover = event.relatedTarget;

                    if (nextHover && menuPanel.contains(nextHover)) return;

                    clearCurrentMainLabel();
                })
            );
        }

        cleanups.push(
            addListenerWithCleanup(menuPanel, 'click', (event) => {
                const mainButton = event.target.closest('.main-menu__button[aria-controls]');
                if (!mainButton) return;
                if (menuPanel.dataset.menuMode !== 'mega') return;

                event.preventDefault();
                event.stopPropagation();
            })
        );

        cleanups.push(
            addListenerWithCleanup(menuPanel, 'keydown', (event) => {
                const mainButton = event.target.closest('.main-menu__button[aria-controls]');
                if (!mainButton) return;
                if (menuPanel.dataset.menuMode !== 'mega') return;

                const blockedKey =
                    event.key === 'Enter' ||
                    event.key === ' ' ||
                    event.key === 'Spacebar' ||
                    event.key === 'ArrowDown';

                if (!blockedKey) return;

                event.preventDefault();
                event.stopPropagation();
            })
        );

        /* --- 6-5. Dismiss (닫기 처리) --- */
        // ESC / 외부 클릭 / X 버튼
        function setupMegaMenuDismiss() {
            const closeButton = menuPanel.querySelector('.button--close');
            const megaButton = menuPanel.querySelector('.button--mega-menu');

            if (closeButton) {
                cleanups.push(
                    addListenerWithCleanup(closeButton, 'click', () => {
                        switchMenuMode('drawer');
                        requestAnimationFrame(() => megaButton?.focus());
                    })
                );
            }

            cleanups.push(
                addListenerWithCleanup(document, 'keydown', (event) => {
                    if (menuPanel.dataset.menuMode !== 'mega') return;
                    if (event.key !== 'Escape') return;

                    event.preventDefault();
                    switchMenuMode('drawer');
                    requestAnimationFrame(() => megaButton?.focus());
                })
            );

            cleanups.push(
                addListenerWithCleanup(document, 'click', (event) => {
                    if (menuPanel.dataset.menuMode !== 'mega') return;
                    if (menuPanel.contains(event.target)) return;

                    switchMenuMode('drawer');
                })
            );
        }

        setupMegaMenuEntryFlow();
        setupMegaMenuFocusFlow();
        setupMegaMenuFocusStyle();
        setupMegaMenuDismiss();

        return () => {
            cleanups.forEach((cleanup) => cleanup());
        };
    }


    /* ===== 7. Desktop Mode Switching (모드 전환) ===== */
    // resetDrawerStateForMega
    // switchMenuMode
    function resetDrawerStateForMega() {
        const mainButtons = menuPanel.querySelectorAll('.main-menu__button[aria-controls]');
        const panelItems = menuPanel.querySelectorAll('.sub-panel__item');
        const subPanel = menuPanel.querySelector('.sub-panel');

        mainButtons.forEach((btn) => {
            btn.setAttribute('aria-expanded', 'false');
            btn.removeAttribute('data-current');
        });

        panelItems.forEach((panel) => {
            panel.hidden = true;
        });

        if (subPanel) {
            subPanel.hidden = true;
            subPanel.style.position = '';
            subPanel.style.left = '';
            subPanel.style.top = '';
        }

        menuPanel.dataset.pcMenuState = 'closed';
    }

    function switchMenuMode(nextMode) {
        cleanupCurrentMode();

        document.body.classList.toggle('is-mega-menu-open', nextMode === 'mega');

        if (nextMode === 'drawer') {
            menuPanel.querySelector('.button--mega-menu')?.setAttribute('aria-expanded', 'false');
            resetDrawerStateForMega();
        }

        menuPanel.dataset.menuMode = nextMode;

        cleanupMenuColumns = initMenuColumns();

        if (nextMode === 'drawer') {
            cleanupDrawerMenu = initDrawerMenu();
        }

        if (nextMode === 'mega') {
            cleanupMegaMenu = initMegaMenu();
        }
    }


    /* ===== 8. Desktop Toggle Button Binding (토글 버튼 연결) ===== */
    // bindModeToggleButtons
    function bindModeToggleButtons() {
        menuPanel.addEventListener('click', (event) => {
            const closeButton = event.target.closest('.button--close');
            const megaButton = event.target.closest('.button--mega-menu');

            if (closeButton) {
                if (!desktopMq.matches) return;

                const opener = menuPanel.querySelector('.button--mega-menu');
                switchMenuMode('drawer');
                requestAnimationFrame(() => opener?.focus());
                return;
            }

            if (megaButton) {
                if (!desktopMq.matches) return;

                event.preventDefault();
                megaButton.setAttribute('aria-expanded', 'true');
                switchMenuMode('mega');

                requestAnimationFrame(() => {
                    const firstSubLink = menuPanel.querySelector('#panel-1 .sub-menu__link');
                    if (firstSubLink) {
                        firstSubLink.focus();
                    }
                });
            }
        });
    }

    /* ===== 9. Initial Boot (초기 실행) ===== */
    // init 함수 실행들
    bindModeToggleButtons();
    cleanupDesktopHeaderScroll = initDesktopHeaderScroll();
    cleanupMobileTabletMenu = initMobileTabletMenu();
    switchMenuMode(menuPanel.dataset.menuMode || 'drawer');

});

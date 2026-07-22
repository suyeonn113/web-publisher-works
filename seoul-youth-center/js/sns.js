/* =========================
 * SNS
 * - 탭 선택 / 미리보기 상태 관리
 * - 기본 활성 탭: instagram
 * - 탭 목록은 WAI-ARIA 탭 패턴의 roving tabindex 사용
 * - 유튜브 카드 프리뷰:
 *   모든 화면에서 hover / focus / touchstart 시 무음 자동재생
 *   카드 이탈 / 탭 전환 / 패널 변경 시 즉시 정지
 *
 * 키보드 포커스 흐름
 * - Tab / Shift+Tab: DOM 순서에 따라 다음·이전 콘텐츠로 자연스럽게 이동
 * - SNS 플랫폼 간 이동: ArrowLeft / ArrowRight
 * - 선택된 탭만 일반 Tab 순서에 포함
 *
 * 탭 조작
 * - ArrowLeft / ArrowRight : 탭 포커스만 이동
 * - Space / Enter          : 해당 탭 선택 확정
 * ========================= */

document.addEventListener('DOMContentLoaded', () => {
    initSnsTabs();
});

function initSnsTabs() {
    const section = document.querySelector('.sns');
    if (!section) return;

    const tablist = section.querySelector('.sns__platforms[role="tablist"]');
    if (!tablist) return;

    const tabs = Array.from(
        tablist.querySelectorAll('.sns__platform[role="tab"]')
    );

    const panels = Array.from(
        section.querySelectorAll('.sns__panel[role="tabpanel"]')
    );

    const kakaoLink = section.querySelector('.sns__platform--link');

    if (!tabs.length || !panels.length) return;

    const DEFAULT_PLATFORM = 'instagram';
    const REDUCED_MOTION = window.matchMedia('(prefers-reduced-motion: reduce)');

    let selectedTab = null;
    let previewTab = null;
    let isPreviewingExternalLink = false;

    let activePreviewCard = null;
    let activePreviewVideo = null;

    function isPreviewEnabled() {
        return !REDUCED_MOTION.matches;
    }

    function getFirstTab() {
        return tabs[0] || null;
    }

    function getPanelByTab(tab) {
        if (!tab) return null;

        return panels.find(
            (panel) => panel.dataset.platformPanel === tab.dataset.platform
        ) || null;
    }

    function getYoutubePanel() {
        return section.querySelector('.sns__panel[data-platform-panel="youtube"]');
    }

    function getPreviewCards() {
        const youtubePanel = getYoutubePanel();
        if (!youtubePanel) return [];

        return Array.from(youtubePanel.querySelectorAll('.sns__item'));
    }

    function getPreviewLink(card) {
        return card.querySelector('.sns__link');
    }

    function getPreviewLayer(card) {
        return card.querySelector('.sns__preview');
    }

    function getPreviewSource(card) {
        const link = getPreviewLink(card);
        if (!link) return '';

        return (
            link.dataset.previewVideo ||
            card.dataset.previewVideo ||
            ''
        ).trim();
    }

    function clearPreviewLayer(card) {
        const previewLayer = getPreviewLayer(card);
        if (!previewLayer) return;

        previewLayer.innerHTML = '';
    }

    function stopVideoPreview(card = activePreviewCard) {
        if (!card) return;

        const previewLayer = getPreviewLayer(card);
        const video = previewLayer?.querySelector('video');

        if (video) {
            video.pause();
            video.removeAttribute('src');
            video.load();
        }

        card.removeAttribute('data-preview');
        clearPreviewLayer(card);

        if (card === activePreviewCard) {
            activePreviewCard = null;
            activePreviewVideo = null;
        }
    }

    function stopAllVideoPreviews() {
        getPreviewCards().forEach((card) => {
            stopVideoPreview(card);
        });
    }

    function startVideoPreview(card) {
        if (!isPreviewEnabled() || !card) return;

        const previewLayer = getPreviewLayer(card);
        const previewSrc = getPreviewSource(card);

        if (!previewLayer || !previewSrc) return;

        if (activePreviewCard && activePreviewCard !== card) {
            stopVideoPreview(activePreviewCard);
        }

        if (activePreviewCard === card && activePreviewVideo) {
            return;
        }

        clearPreviewLayer(card);

        const video = document.createElement('video');
        video.className = 'sns__preview-video';
        video.src = previewSrc;
        video.muted = true;
        video.autoplay = true;
        video.loop = true;
        video.playsInline = true;
        video.preload = 'metadata';
        video.setAttribute('aria-hidden', 'true');

        previewLayer.appendChild(video);
        card.setAttribute('data-preview', 'true');

        const playPromise = video.play();

        if (playPromise && typeof playPromise.catch === 'function') {
            playPromise.catch(() => {
                stopVideoPreview(card);
            });
        }

        activePreviewCard = card;
        activePreviewVideo = video;
    }

    function render(options = {}) {
        const {
            visualTab = selectedTab,
            panelTab = selectedTab,
            moveFocus = false
        } = options;

        const panelPlatform = panelTab?.dataset.platform ?? null;

        tabs.forEach((tab) => {
            const isSelected = tab === selectedTab;
            const isActive = tab === visualTab;

            tab.setAttribute('aria-selected', String(isSelected));
            tab.setAttribute('tabindex', isSelected ? '0' : '-1');
            tab.classList.toggle('is-active', isActive);
        });

        panels.forEach((panel) => {
            const isActivePanel = panel.dataset.platformPanel === panelPlatform;
            panel.hidden = !isActivePanel;

            if (!isActivePanel) {
                const videos = panel.querySelectorAll('video');

                videos.forEach((video) => {
                    video.pause();
                    video.removeAttribute('src');
                    video.load();
                });
            }
        });

        if (kakaoLink) {
            kakaoLink.classList.toggle('is-active', isPreviewingExternalLink);
        }

        if (moveFocus && selectedTab) {
            selectedTab.focus();
        }
    }

    function activateTab(nextTab, options = {}) {
        if (!nextTab) return;

        stopAllVideoPreviews();

        selectedTab = nextTab;
        previewTab = null;
        isPreviewingExternalLink = false;

        render({
            visualTab: selectedTab,
            panelTab: selectedTab,
            moveFocus: options.moveFocus ?? false
        });
    }

    function previewActiveTab(nextTab) {
        if (!nextTab) return;

        stopAllVideoPreviews();

        previewTab = nextTab;
        isPreviewingExternalLink = false;

        render({
            visualTab: previewTab,
            panelTab: selectedTab
        });
    }

    function previewExternalLink() {
        stopAllVideoPreviews();

        previewTab = null;
        isPreviewingExternalLink = true;

        render({
            visualTab: null,
            panelTab: selectedTab
        });
    }

    function restoreSelectedVisual() {
        stopAllVideoPreviews();

        previewTab = null;
        isPreviewingExternalLink = false;

        render({
            visualTab: selectedTab,
            panelTab: selectedTab
        });
    }

    function focusTabByIndex(index) {
        const targetTab = tabs[index];
        if (!targetTab) return;

        targetTab.focus();
    }

    function getDefaultTab() {
        return (
            tabs.find((tab) => tab.dataset.platform === DEFAULT_PLATFORM) ||
            getFirstTab()
        );
    }

    function setupInitialState() {
        selectedTab = getDefaultTab();
        previewTab = null;
        isPreviewingExternalLink = false;

        render({
            visualTab: selectedTab,
            panelTab: selectedTab
        });
    }

    function bindVideoPreviewEvents() {
        getPreviewCards().forEach((card) => {
            const link = getPreviewLink(card);
            if (!link) return;

            link.addEventListener('mouseenter', () => {
                startVideoPreview(card);
            });

            link.addEventListener('mouseleave', () => {
                if (document.activeElement === link) return;
                stopVideoPreview(card);
            });

            link.addEventListener('focus', () => {
                startVideoPreview(card);
            });

            link.addEventListener('blur', () => {
                stopVideoPreview(card);
            });

            link.addEventListener('touchstart', () => {
                startVideoPreview(card);
            }, { passive: true });
        });
    }

    function bindTabEvents() {
        tabs.forEach((tab, index) => {
            tab.addEventListener('click', () => {
                activateTab(tab, { moveFocus: false });
            });

            tab.addEventListener('mouseenter', () => {
                previewActiveTab(tab);
            });

            tab.addEventListener('mouseleave', () => {
                if (document.activeElement === tab) return;
                restoreSelectedVisual();
            });

            tab.addEventListener('focus', () => {
                previewActiveTab(tab);
            });

            tab.addEventListener('blur', () => {
                if (document.activeElement === tab) return;
                restoreSelectedVisual();
            });

            tab.addEventListener('keydown', (event) => {
                const key = event.key;
                const lastIndex = tabs.length - 1;
                let nextIndex = index;

                switch (key) {
                    case 'ArrowRight':
                    case 'Right':
                        event.preventDefault();
                        nextIndex = index === lastIndex ? 0 : index + 1;
                        focusTabByIndex(nextIndex);
                        break;

                    case 'ArrowLeft':
                    case 'Left':
                        event.preventDefault();
                        nextIndex = index === 0 ? lastIndex : index - 1;
                        focusTabByIndex(nextIndex);
                        break;

                    case 'Home':
                        event.preventDefault();
                        focusTabByIndex(0);
                        break;

                    case 'End':
                        event.preventDefault();
                        focusTabByIndex(lastIndex);
                        break;

                    case 'Enter':
                    case ' ':
                        event.preventDefault();
                        activateTab(tab, { moveFocus: true });
                        break;

                    case 'Escape':
                        event.preventDefault();
                        restoreSelectedVisual();
                        selectedTab?.focus();
                        break;

                    default:
                        break;
                }
            });
        });
    }

    function bindKakaoEvents() {
        if (!kakaoLink) return;

        kakaoLink.addEventListener('mouseenter', () => {
            previewExternalLink();
        });

        kakaoLink.addEventListener('mouseleave', () => {
            if (document.activeElement === kakaoLink) return;
            restoreSelectedVisual();
        });

        kakaoLink.addEventListener('focus', () => {
            previewExternalLink();
        });

        kakaoLink.addEventListener('blur', () => {
            if (document.activeElement === kakaoLink) return;
            restoreSelectedVisual();
        });

        kakaoLink.addEventListener('keydown', (event) => {
            if (event.key === 'Escape') {
                event.preventDefault();
                restoreSelectedVisual();
                selectedTab?.focus();
            }
        });
    }

    function bindTablistEvents() {
        tablist.addEventListener('mouseleave', () => {
            if (document.activeElement && tablist.contains(document.activeElement)) {
                return;
            }
            restoreSelectedVisual();
        });
    }

    function bindMediaQueryEvents() {
        const handleReducedMotionChange = () => {
            stopAllVideoPreviews();
        };

        if (typeof REDUCED_MOTION.addEventListener === 'function') {
            REDUCED_MOTION.addEventListener('change', handleReducedMotionChange);
        } else {
            REDUCED_MOTION.addListener(handleReducedMotionChange);
        }
    }

    setupInitialState();
    bindTabEvents();
    bindKakaoEvents();
    bindTablistEvents();
    bindVideoPreviewEvents();
    bindMediaQueryEvents();
}

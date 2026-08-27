
document.addEventListener('DOMContentLoaded', () => {
    const searchPanel = document.getElementById('search-panel');
    if (!searchPanel) return;

    const toggleButton = searchPanel.querySelector('.button--search__toggle');
    const searchBody = searchPanel.querySelector('#search__body');
    const searchInput = searchPanel.querySelector('#search__input');
    const searchStatus = searchPanel.querySelector('#search-status');
    const header = document.querySelector('body > .site-header');
    const headerMenuToggle = header?.querySelector('.header-menu-toggle');
    const compactMenuUser = document.querySelector('#menu-panel .menu-panel__user');
    const inlineSearchMq = window.matchMedia('(min-width: 48rem)');

    if (!toggleButton || !searchBody || !searchInput) return;

    let isClosing = false;
    let closeTimer = null;

    function syncSearchPlacement() {
        if (!header || !headerMenuToggle || !compactMenuUser) return;

        if (inlineSearchMq.matches) {
            header.insertBefore(searchPanel, headerMenuToggle);
            return;
        }

        compactMenuUser.insertAdjacentElement('afterend', searchPanel);
    }

    function hasKeyword() {
        return searchInput.value.trim().length > 0;
    }

    function updateOpenToggleLabel() {
        if (searchPanel.dataset.state === 'inline') {
            toggleButton.setAttribute('aria-label', hasKeyword() ? '검색 실행' : '검색어 입력');
            return;
        }

        if (searchPanel.dataset.state !== 'open') return;
        toggleButton.setAttribute('aria-label', hasKeyword() ? '검색 실행' : '검색 닫기');
    }

    function openSearch() {
        window.clearTimeout(closeTimer);
        isClosing = false;
        document.body.classList.remove('is-header-hidden');
        searchBody.hidden = false;
        searchInput.disabled = false;

        requestAnimationFrame(() => {
            searchPanel.dataset.state = 'open';
            searchPanel.closest('.site-header')?.classList.add('is-search-open');
            toggleButton.setAttribute('aria-expanded', 'true');
            updateOpenToggleLabel();
            searchInput.focus();
        });
    }

    function finishClose({ focusButton = false } = {}) {
        if (searchPanel.dataset.state !== 'closed') return;

        window.clearTimeout(closeTimer);
        closeTimer = null;
        searchBody.hidden = true;
        searchInput.disabled = true;
        isClosing = false;

        if (focusButton) {
            toggleButton.focus();
        }
    }

    function closeSearch({ keepValue = false, focusButton = false } = {}) {
        if (isClosing) return;
        isClosing = true;

        searchPanel.dataset.state = 'closed';
        header?.classList.remove('is-search-open');
        toggleButton.setAttribute('aria-expanded', 'false');
        toggleButton.setAttribute('aria-label', '검색 열기');

        if (!keepValue) {
            searchInput.value = '';
        }

        const handleTransitionEnd = (event) => {
            if (event.target !== searchBody) return;

            finishClose(focusButton);
        };

        searchBody.addEventListener('transitionend', handleTransitionEnd, { once: true });
        closeTimer = window.setTimeout(() => finishClose({ focusButton }), 400);
    }

    function submitSearch() {
        const keyword = searchInput.value.trim();

        if (!keyword) {
            closeSearch();
            return;
        }

        searchPanel.requestSubmit();
    }

    function syncSearchLayout() {
        window.clearTimeout(closeTimer);
        closeTimer = null;
        isClosing = false;
        header?.classList.remove('is-search-open');
        syncSearchPlacement();

        if (inlineSearchMq.matches) {
            searchPanel.dataset.state = 'inline';
            searchBody.hidden = false;
            searchInput.disabled = false;
            toggleButton.setAttribute('aria-expanded', 'false');
            toggleButton.setAttribute('aria-label', '검색어 입력');
            return;
        }

        searchPanel.dataset.state = 'closed';
        searchBody.hidden = true;
        searchInput.disabled = true;
        toggleButton.setAttribute('aria-expanded', 'false');
        toggleButton.setAttribute('aria-label', '검색 열기');
    }

    toggleButton.addEventListener('click', () => {
        if (inlineSearchMq.matches) {
            if (hasKeyword()) {
                submitSearch();
                return;
            }

            searchInput.focus();
            return;
        }

        const isOpen = searchPanel.dataset.state === 'open';

        if (!isOpen) {
            openSearch();
            return;
        }

        submitSearch();
    });

    searchInput.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            event.preventDefault();

            if (inlineSearchMq.matches) {
                searchInput.blur();
                return;
            }

            closeSearch({ focusButton: true });
        }
    });

    searchInput.addEventListener('input', updateOpenToggleLabel);

    searchPanel.addEventListener('submit', (event) => {
        event.preventDefault();

        const keyword = searchInput.value.trim();
        if (!keyword) {
            if (searchStatus) searchStatus.textContent = '검색어를 입력해 주세요.';
            searchInput.focus();
            return;
        }

        if (searchStatus) {
            searchStatus.textContent = `‘${keyword}’ 검색 결과 기능은 현재 준비 중입니다.`;
        }
    });

    document.addEventListener('pointerdown', (event) => {
        const isOpen = searchPanel.dataset.state === 'open';
        if (!isOpen) return;

        if (searchPanel.contains(event.target)) return;
        if (hasKeyword()) return;

        closeSearch({ keepValue: true });
    }, true);

    document.addEventListener('focusin', (event) => {
        const isOpen = searchPanel.dataset.state === 'open';
        if (!isOpen) return;

        if (searchPanel.contains(event.target)) return;
        if (hasKeyword()) return;

        closeSearch({ keepValue: true });
    });

    window.addEventListener('scroll', () => {
        const isOpen = searchPanel.dataset.state === 'open';
        if (!isOpen || hasKeyword()) return;

        closeSearch();
    }, { passive: true });

    inlineSearchMq.addEventListener('change', syncSearchLayout);
    syncSearchLayout();
});

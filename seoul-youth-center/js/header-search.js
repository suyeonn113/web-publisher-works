
document.addEventListener('DOMContentLoaded', () => {
    const searchPanel = document.getElementById('search-panel');
    if (!searchPanel) return;

    const toggleButton = searchPanel.querySelector('.button--search__toggle');
    const searchBody = searchPanel.querySelector('#search__body');
    const searchInput = searchPanel.querySelector('#search__input');
    const header = searchPanel.closest('.site-header');

    if (!toggleButton || !searchBody || !searchInput) return;

    let isClosing = false;
    let closeTimer = null;

    function openSearch() {
        window.clearTimeout(closeTimer);
        isClosing = false;
        searchBody.hidden = false;

        requestAnimationFrame(() => {
            searchPanel.dataset.state = 'open';
            header?.classList.add('is-search-open');
            toggleButton.setAttribute('aria-expanded', 'true');
            toggleButton.setAttribute('aria-label', '검색 실행');
            searchInput.focus();
        });
    }

    function finishClose({ focusButton = false } = {}) {
        if (searchPanel.dataset.state !== 'closed') return;

        window.clearTimeout(closeTimer);
        closeTimer = null;
        searchBody.hidden = true;
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

    toggleButton.addEventListener('click', () => {
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
            closeSearch({ focusButton: true });
        }
    });

    document.addEventListener('pointerdown', (event) => {
        const isOpen = searchPanel.dataset.state === 'open';
        if (!isOpen) return;

        if (searchPanel.contains(event.target)) return;

        closeSearch({ keepValue: true });
    }, true);

    document.addEventListener('focusin', (event) => {
        const isOpen = searchPanel.dataset.state === 'open';
        if (!isOpen) return;

        if (searchPanel.contains(event.target)) return;

        closeSearch({ keepValue: true });
    });
});

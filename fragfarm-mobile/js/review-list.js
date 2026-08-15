document.addEventListener('DOMContentLoaded', () => {
    const page = document.querySelector('.review-page');
    const grid = document.querySelector('[data-review-grid]');
    const toolbar = document.querySelector('[data-review-toolbar]');
    const searchInput = document.querySelector('[data-review-search]');
    const sortSelect = document.querySelector('[data-review-sort]');
    const emptyMessage = document.querySelector('[data-review-empty]');
    const loadMoreWrap = document.querySelector('[data-review-load-more-wrap]');
    const loadMoreButton = document.querySelector('[data-review-load-more]');
    const loadStatus = document.querySelector('[data-review-load-status]');

    if (!page || !grid || !toolbar || !searchInput || !sortSelect || !emptyMessage || !loadMoreWrap || !loadMoreButton) return;

    const items = Array.from(grid.querySelectorAll('[data-review-list-item]'));
    const originalOrder = new Map(items.map((item, index) => [item, index]));
    const batchSize = 16;
    const storageKey = 'fragfarm_review_list_state';
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const supportsObserver = 'IntersectionObserver' in window;
    let visibleCount = Math.min(batchSize, items.length);
    let restoredScrollY = null;
    let revealObserver = null;
    let activeItems = items;

    try {
        const savedState = JSON.parse(window.sessionStorage.getItem(storageKey) || 'null');

        if (savedState) {
            searchInput.value = String(savedState.query || '');
            if (['latest', 'rating-desc', 'rating-asc'].includes(savedState.sort)) {
                sortSelect.value = savedState.sort;
            }
            visibleCount = Math.min(
                Math.max(batchSize, Number(savedState.visibleCount) || batchSize),
                items.length,
            );
            restoredScrollY = Math.max(0, Number(savedState.scrollY) || 0);
            window.sessionStorage.removeItem(storageKey);
        }
    } catch (error) {
        restoredScrollY = null;
    }

    const revealWithoutMotion = () => {
        revealObserver?.disconnect();
        revealObserver = null;
        page.classList.remove('is-scroll-reveal-ready');
        items.forEach((item) => {
            if (!item.hidden) item.classList.add('is-revealed');
        });
    };

    const observeVisibleItems = () => {
        if (reducedMotion.matches || !supportsObserver) {
            revealWithoutMotion();
            return;
        }

        page.classList.add('is-scroll-reveal-ready');

        items.forEach((item) => {
            if (!item.hidden && !item.classList.contains('is-revealed')) {
                revealObserver.observe(item);
            }
        });
    };

    if (!reducedMotion.matches && supportsObserver) {
        revealObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;

                entry.target.classList.add('is-revealed');
                revealObserver.unobserve(entry.target);
            });
        }, {
            rootMargin: '0px 0px -10%',
            threshold: 0.08,
        });
    }

    const compareLatest = (left, right) => {
        const timestampDifference = Number(right.dataset.reviewTimestamp || 0) - Number(left.dataset.reviewTimestamp || 0);
        return timestampDifference || originalOrder.get(left) - originalOrder.get(right);
    };

    const updateActiveItems = () => {
        const query = searchInput.value.trim().toLocaleLowerCase('ko-KR');

        activeItems = items.filter((item) => (
            query === '' || String(item.dataset.reviewSearchText || '').toLocaleLowerCase('ko-KR').includes(query)
        ));

        activeItems.sort((left, right) => {
            const ratingDifference = Number(right.dataset.reviewRating || 0) - Number(left.dataset.reviewRating || 0);

            if (sortSelect.value === 'rating-desc') return ratingDifference || compareLatest(left, right);
            if (sortSelect.value === 'rating-asc') return -ratingDifference || compareLatest(left, right);
            return compareLatest(left, right);
        });

        activeItems.forEach((item) => grid.append(item));
    };

    const render = () => {
        updateActiveItems();
        const visibleItems = new Set(activeItems.slice(0, visibleCount));

        items.forEach((item) => {
            item.hidden = !visibleItems.has(item);
        });

        emptyMessage.hidden = activeItems.length > 0;
        loadMoreWrap.hidden = visibleCount >= activeItems.length;
        observeVisibleItems();
    };

    const applyControls = () => {
        visibleCount = batchSize;
        items.forEach((item) => item.classList.remove('is-revealed'));
        render();
    };

    toolbar.addEventListener('submit', (event) => {
        event.preventDefault();
        applyControls();
    });

    searchInput.addEventListener('input', applyControls);
    sortSelect.addEventListener('change', applyControls);

    loadMoreButton.addEventListener('click', () => {
        const previousCount = visibleCount;
        visibleCount = Math.min(visibleCount + batchSize, activeItems.length);
        render();

        if (loadStatus) {
            loadStatus.textContent = `리뷰 ${visibleCount - previousCount}개를 더 표시했습니다.`;
        }
    });

    grid.addEventListener('click', (event) => {
        if (!event.target.closest('.review-card__content')) return;

        try {
            window.sessionStorage.setItem(storageKey, JSON.stringify({
                visibleCount,
                scrollY: window.scrollY,
                query: searchInput.value,
                sort: sortSelect.value,
            }));
        } catch (error) {
            // Storage may be unavailable in privacy modes.
        }
    });

    const handleReducedMotion = (event) => {
        if (event.matches) revealWithoutMotion();
    };

    if (typeof reducedMotion.addEventListener === 'function') {
        reducedMotion.addEventListener('change', handleReducedMotion, { once: true });
    } else if (typeof reducedMotion.addListener === 'function') {
        reducedMotion.addListener(handleReducedMotion);
    }

    render();

    if (restoredScrollY !== null) {
        window.requestAnimationFrame(() => {
            window.requestAnimationFrame(() => window.scrollTo({ top: restoredScrollY, behavior: 'auto' }));
        });
    }
});

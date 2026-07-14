document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector('[data-review-grid]');
    const loadMoreWrap = document.querySelector('[data-review-load-more-wrap]');
    const loadMoreButton = document.querySelector('[data-review-load-more]');
    const loadStatus = document.querySelector('[data-review-load-status]');

    if (!grid || !loadMoreWrap || !loadMoreButton) return;

    const items = Array.from(grid.querySelectorAll('[data-review-list-item]'));
    const initialCount = 9;
    const loadCount = 6;
    const storageKey = 'fragfarm_review_list_state';
    let visibleCount = Math.min(initialCount, items.length);
    let restoredScrollY = null;

    try {
        const savedState = JSON.parse(window.sessionStorage.getItem(storageKey) || 'null');

        if (savedState) {
            visibleCount = Math.min(
                Math.max(initialCount, Number(savedState.visibleCount) || initialCount),
                items.length,
            );
            restoredScrollY = Math.max(0, Number(savedState.scrollY) || 0);
            window.sessionStorage.removeItem(storageKey);
        }
    } catch (error) {
        restoredScrollY = null;
    }

    const render = () => {
        items.forEach((item, index) => {
            item.hidden = index >= visibleCount;
        });

        loadMoreWrap.hidden = visibleCount >= items.length;
    };

    loadMoreButton.addEventListener('click', () => {
        const previousCount = visibleCount;
        visibleCount = Math.min(visibleCount + loadCount, items.length);
        render();

        if (loadStatus) {
            loadStatus.textContent = `리뷰 ${visibleCount - previousCount}개를 더 표시했습니다.`;
        }
    });

    grid.addEventListener('click', (event) => {
        if (!event.target.closest('.review-card')) return;

        try {
            window.sessionStorage.setItem(storageKey, JSON.stringify({
                visibleCount,
                scrollY: window.scrollY,
            }));
        } catch (error) {
            // Storage may be unavailable in privacy modes.
        }
    });

    render();

    if (restoredScrollY !== null) {
        window.requestAnimationFrame(() => {
            window.requestAnimationFrame(() => window.scrollTo({ top: restoredScrollY, behavior: 'auto' }));
        });
    }
});

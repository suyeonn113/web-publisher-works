
document.addEventListener('DOMContentLoaded', () => {
    restoreCatalogFocus();
    initSortSubmit();
    initProductGalleryIndicators();
    initProductWishButtons();
});

function restoreCatalogFocus() {
    const params = new URLSearchParams(window.location.search);

    if (params.get('focus') !== 'catalog') return;

    const focusTarget = document.querySelector('[data-catalog-focus-target]');

    if (!focusTarget) return;

    focusTarget.focus();
    params.delete('focus');

    const query = params.toString();
    window.history.replaceState(null, '', `${window.location.pathname}${query ? `?${query}` : ''}${window.location.hash}`);
}

function initSortSubmit() {
    const sortSelect = document.querySelector('#sort');

    if (!sortSelect || !sortSelect.form) return;

    sortSelect.addEventListener('change', () => {
        sortSelect.form.submit();
    });
}

function initProductGalleryIndicators() {
    const cards = document.querySelectorAll('.product__card');

    cards.forEach((card) => {
        const gallery = card.querySelector('.product__gallery');
        const items = card.querySelectorAll('.product__gallery-item');
        const dots = card.querySelectorAll('.pagination__dot');

        if (!gallery || items.length <= 1 || dots.length === 0) return;

        const updateCurrentDot = () => {
            const itemWidth = items[0].clientWidth;
            if (!itemWidth) return;

            const index = Math.round(gallery.scrollLeft / itemWidth);

            dots.forEach((dot, dotIndex) => {
                dot.classList.toggle('is-current', dotIndex === index);
            });
        };

        gallery.addEventListener('scroll', updateCurrentDot, { passive: true });
        window.addEventListener('resize', updateCurrentDot);

        updateCurrentDot();
    });
}

function initProductWishButtons() {
    const wishButtons = document.querySelectorAll('[data-action="toggle-wish"]');
    const toast = document.querySelector('[data-product-toast]');
    let toastTimer;

    const showToast = (message) => {
        if (!toast) return;

        window.clearTimeout(toastTimer);
        toast.textContent = message;
        toast.hidden = false;

        toastTimer = window.setTimeout(() => {
            toast.hidden = true;
        }, 1800);
    };

    wishButtons.forEach((button) => {
        button.addEventListener('click', () => {
            const isActive = button.getAttribute('aria-pressed') === 'true';
            const nextState = !isActive;

            button.setAttribute('aria-pressed', String(nextState));
            button.setAttribute('aria-label', nextState ? '위시리스트에서 제거' : '위시리스트에 추가');

            showToast(nextState ? '위시리스트에 담겼습니다.' : '위시리스트에서 삭제되었습니다.');
        });
    });
}

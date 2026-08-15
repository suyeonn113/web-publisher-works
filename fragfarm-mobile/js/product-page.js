
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
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    cards.forEach((card) => {
        const gallery = card.querySelector('.product__gallery');
        const items = card.querySelectorAll('.product__gallery-item');
        const dots = card.querySelectorAll('.pagination__dot');
        const dotLabels = card.querySelectorAll('.pagination__dot-item .visually-hidden');
        const productLink = card.querySelector('.product__link[href]');
        const status = card.querySelector('[data-gallery-status]');

        if (!gallery || items.length <= 1 || dots.length === 0) return;
        let currentIndex = 0;

        const getCurrentIndex = () => {
            const itemWidth = items[0].clientWidth;
            if (!itemWidth) return 0;

            return Math.max(0, Math.min(items.length - 1, Math.round(gallery.scrollLeft / itemWidth)));
        };

        const updateCurrentDot = (index = getCurrentIndex()) => {
            currentIndex = index;

            dots.forEach((dot, dotIndex) => {
                dot.classList.toggle('is-current', dotIndex === index);
            });

            dotLabels.forEach((label, dotIndex) => {
                label.textContent = `${dotIndex + 1} / ${items.length}${dotIndex === index ? ' 현재 이미지' : ''}`;
            });

            if (status) {
                status.textContent = `${index + 1} / ${items.length} 이미지. 좌우 방향키로 상품 이미지를 확인할 수 있습니다.`;
            }
        };

        productLink?.addEventListener('keydown', (event) => {
            if (!['ArrowLeft', 'ArrowRight'].includes(event.key)) return;

            event.preventDefault();
            const direction = event.key === 'ArrowRight' ? 1 : -1;
            const nextIndex = Math.max(0, Math.min(items.length - 1, currentIndex + direction));

            gallery.scrollTo({
                left: items[nextIndex].offsetLeft,
                behavior: reduceMotion ? 'auto' : 'smooth',
            });
            updateCurrentDot(nextIndex);
        });

        gallery.addEventListener('scroll', () => updateCurrentDot(), { passive: true });
        window.addEventListener('resize', () => updateCurrentDot());

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

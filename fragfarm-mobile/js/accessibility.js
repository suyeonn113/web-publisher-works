(function () {
    const focusableSelector = [
        'a[href]',
        'button:not([disabled])',
        'input:not([disabled]):not([type="hidden"])',
        'select:not([disabled])',
        'textarea:not([disabled])',
        'summary',
        '[tabindex]:not([tabindex="-1"])'
    ].join(',');

    const isVisible = (element) => {
        if (!(element instanceof HTMLElement) || element.hidden) return false;

        const style = window.getComputedStyle(element);
        return style.display !== 'none' && style.visibility !== 'hidden' && element.getClientRects().length > 0;
    };

    const getFocusable = (container) => Array.from(container.querySelectorAll(focusableSelector)).filter(isVisible);

    const trapFocus = (container, event) => {
        if (!container || event.key !== 'Tab') return false;

        const focusable = getFocusable(container);
        if (focusable.length === 0) {
            event.preventDefault();
            return true;
        }

        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        const active = document.activeElement;

        if (event.shiftKey && (active === first || !container.contains(active))) {
            event.preventDefault();
            last.focus();
            return true;
        }

        if (!event.shiftKey && (active === last || !container.contains(active))) {
            event.preventDefault();
            first.focus();
            return true;
        }

        return false;
    };

    const focusFirst = (container) => {
        const first = container ? getFocusable(container)[0] : null;
        first?.focus();
        return first;
    };

    window.FragfarmA11y = Object.freeze({
        focusFirst,
        getFocusable,
        trapFocus
    });

    document.querySelectorAll('.skip-links a[href^="#"]').forEach((link) => {
        link.addEventListener('click', () => {
            const target = document.querySelector(link.getAttribute('href'));
            if (!target) return;

            if (!target.matches(focusableSelector)) target.setAttribute('tabindex', '-1');
            window.requestAnimationFrame(() => target.focus());
        });
    });

    document.addEventListener('keydown', (event) => {
        const scroller = event.target.closest('[data-keyboard-scroll]');
        if (!scroller || (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight')) return;

        event.preventDefault();
        const direction = event.key === 'ArrowRight' ? 1 : -1;
        const controls = Array.from(scroller.querySelectorAll('a[href], button:not([disabled])')).filter(isVisible);
        const currentIndex = controls.indexOf(document.activeElement);

        if (currentIndex >= 0 && controls.length > 0) {
            const nextIndex = Math.min(Math.max(currentIndex + direction, 0), controls.length - 1);
            controls[nextIndex].focus();
            controls[nextIndex].scrollIntoView({
                behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
                block: 'nearest',
                inline: 'nearest'
            });
            return;
        }

        const firstItem = scroller.firstElementChild;
        const gap = Number.parseFloat(window.getComputedStyle(scroller).columnGap) || 0;
        const distance = firstItem ? firstItem.getBoundingClientRect().width + gap : scroller.clientWidth * .8;

        scroller.scrollBy({
            left: direction * distance,
            behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth'
        });
    });
}());

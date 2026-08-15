(function () {
    const page = document.querySelector('.lookbook-page');
    const revealItems = Array.from(document.querySelectorAll('[data-lookbook-reveal]'));
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (page && revealItems.length > 0) {
        if (reduceMotion || !('IntersectionObserver' in window)) {
            revealItems.forEach((item) => item.classList.add('is-visible'));
        } else {
            page.classList.add('is-lookbook-motion-ready');

            revealItems.forEach((item, index) => {
                item.style.setProperty('--lookbook-stagger', String(index % 4));
            });

            const revealObserver = new IntersectionObserver((entries) => {
                entries
                    .filter((entry) => entry.isIntersecting)
                    .sort((entryA, entryB) => revealItems.indexOf(entryA.target) - revealItems.indexOf(entryB.target))
                    .forEach((entry) => {
                        entry.target.classList.add('is-visible');
                        revealObserver.unobserve(entry.target);
                    });
            }, {
                threshold: 0.08,
                rootMargin: '0px 0px -5% 0px',
            });

            revealItems.forEach((item) => revealObserver.observe(item));
        }
    }

    const modal = document.querySelector('[data-lookbook-modal]');

    if (!modal) {
        return;
    }

    const modalImage = modal.querySelector('[data-lookbook-modal-image]');
    const dialog = modal.querySelector('[role="dialog"]');
    const closeButton = modal.querySelector('.lookbook-image-modal__close');
    const closeButtons = modal.querySelectorAll('[data-lookbook-modal-close]');
    const imageButtons = document.querySelectorAll('[data-lookbook-image]');
    let lastFocused = null;

    const closeModal = () => {
        if (modal.hidden) {
            return;
        }

        modal.hidden = true;
        modalImage.removeAttribute('src');
        document.body.classList.remove('is-lookbook-modal-open');

        if (lastFocused) {
            lastFocused.focus();
        }
    };

    const openModal = (button) => {
        const src = button.dataset.lookbookImage;

        if (!src) {
            return;
        }

        lastFocused = button;
        modalImage.src = src;
        modal.hidden = false;
        document.body.classList.add('is-lookbook-modal-open');
        closeButton.focus();
    };

    imageButtons.forEach((button) => {
        button.addEventListener('click', () => openModal(button));
    });

    closeButtons.forEach((button) => {
        button.addEventListener('click', closeModal);
    });

    document.addEventListener('keydown', (event) => {
        if (modal.hidden) return;

        if (event.key === 'Escape') {
            closeModal();
            return;
        }

        window.FragfarmA11y?.trapFocus(dialog, event);
    });
}());

(function () {
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

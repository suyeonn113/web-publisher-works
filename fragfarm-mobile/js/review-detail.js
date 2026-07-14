(function () {
    const modal = document.querySelector('[data-review-modal]');

    if (!modal) {
        return;
    }

    const modalImage = modal.querySelector('[data-review-modal-image]');
    const closeButtons = modal.querySelectorAll('[data-review-modal-close]');
    const imageButtons = document.querySelectorAll('[data-review-image]');
    let lastFocused = null;

    const closeModal = () => {
        modal.hidden = true;
        modalImage.removeAttribute('src');
        document.body.classList.remove('is-review-modal-open');

        if (lastFocused) {
            lastFocused.focus();
        }
    };

    const openModal = (button) => {
        const src = button.dataset.reviewImage;

        if (!src) {
            return;
        }

        lastFocused = button;
        modalImage.src = src;
        modal.hidden = false;
        document.body.classList.add('is-review-modal-open');

        const closeButton = modal.querySelector('.review-image-modal__close');
        closeButton.focus();
    };

    imageButtons.forEach((button) => {
        button.addEventListener('click', () => openModal(button));
    });

    closeButtons.forEach((button) => {
        button.addEventListener('click', closeModal);
    });

    document.addEventListener('keydown', (event) => {
        if (modal.hidden || event.key !== 'Escape') {
            return;
        }

        closeModal();
    });
}());

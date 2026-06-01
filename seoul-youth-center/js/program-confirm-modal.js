document.addEventListener('DOMContentLoaded', () => {
    const modal = document.querySelector('[data-program-confirm-modal]');
    if (!modal) return;

    const panel = modal.querySelector('.program-confirm-modal__panel');
    const programName = modal.querySelector('[data-program-confirm-name]');
    const programIdField = modal.querySelector('[data-program-confirm-id]');
    const form = modal.querySelector('.program-confirm-modal__form');
    const triggers = document.querySelectorAll('[data-program-id].is-confirm, [data-program-confirm-open]');
    let lastFocusedElement = null;

    function openModal(trigger) {
        lastFocusedElement = document.activeElement;

        const title = trigger.dataset.programTitle || '선택한 프로그램';
        if (programName) {
            programName.textContent = title;
        }

        if (programIdField) {
            programIdField.value = trigger.dataset.programId || '';
        }

        modal.hidden = false;
        document.body.classList.add('no-scroll');

        requestAnimationFrame(() => {
            panel?.focus();
        });
    }

    function closeModal() {
        modal.hidden = true;
        document.body.classList.remove('no-scroll');
        form?.reset();

        if (lastFocusedElement && typeof lastFocusedElement.focus === 'function') {
            lastFocusedElement.focus();
        }
    }

    triggers.forEach((trigger) => {
        trigger.addEventListener('click', () => openModal(trigger));
    });

    modal.addEventListener('click', (event) => {
        if (!event.target.closest('[data-program-confirm-close]')) return;
        closeModal();
    });

    document.addEventListener('keydown', (event) => {
        if (modal.hidden || event.key !== 'Escape') return;
        closeModal();
    });

});

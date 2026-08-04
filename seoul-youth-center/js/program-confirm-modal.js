document.addEventListener('DOMContentLoaded', () => {
    const modal = document.querySelector('[data-program-confirm-modal]');
    if (!modal) return;

    const panel = modal.querySelector('.program-confirm-modal__panel');
    const programName = modal.querySelector('[data-program-confirm-name]');
    const programIdField = modal.querySelector('[data-program-confirm-id]');
    const form = modal.querySelector('.program-confirm-modal__form');
    const triggers = document.querySelectorAll('[data-program-id].is-confirm, [data-program-confirm-open]');
    const main = modal.closest('main');
    let lastFocusedElement = null;
    const backgroundState = new Map();

    function getBackgroundElements() {
        const bodySiblings = Array.from(document.body.children).filter((element) => (
            element !== main && element.tagName !== 'SCRIPT'
        ));
        const mainSiblings = main
            ? Array.from(main.children).filter((element) => element !== modal)
            : [];
        return [...bodySiblings, ...mainSiblings];
    }

    function setBackgroundInert(isInert) {
        getBackgroundElements().forEach((element) => {
            if (isInert) {
                backgroundState.set(element, {
                    inert: element.hasAttribute('inert'),
                    ariaHidden: element.getAttribute('aria-hidden')
                });
                element.setAttribute('inert', '');
                element.setAttribute('aria-hidden', 'true');
                return;
            }

            const previous = backgroundState.get(element);
            if (!previous?.inert) element.removeAttribute('inert');
            if (previous?.ariaHidden === null || previous?.ariaHidden === undefined) {
                element.removeAttribute('aria-hidden');
            } else {
                element.setAttribute('aria-hidden', previous.ariaHidden);
            }
        });

        if (!isInert) backgroundState.clear();
    }

    function getFocusableElements() {
        return Array.from(modal.querySelectorAll(
            'a[href], button:not([disabled]), input:not([disabled]):not([type="hidden"]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
        )).filter((element) => !element.hidden && element.getClientRects().length > 0);
    }

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
        setBackgroundInert(true);

        requestAnimationFrame(() => {
            const firstField = form?.querySelector('input:not([type="hidden"])');
            (firstField || panel)?.focus();
        });
    }

    function closeModal() {
        modal.hidden = true;
        document.body.classList.remove('no-scroll');
        setBackgroundInert(false);
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
        if (modal.hidden) return;

        if (event.key === 'Escape') {
            event.preventDefault();
            closeModal();
            return;
        }

        if (event.key !== 'Tab') return;

        const focusableElements = getFocusableElements();
        if (!focusableElements.length) {
            event.preventDefault();
            panel?.focus();
            return;
        }

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (event.shiftKey && (document.activeElement === firstElement || document.activeElement === panel)) {
            event.preventDefault();
            lastElement.focus();
        } else if (!event.shiftKey && document.activeElement === lastElement) {
            event.preventDefault();
            firstElement.focus();
        }
    });

});

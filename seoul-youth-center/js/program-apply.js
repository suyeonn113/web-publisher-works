document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('.program-apply-form');
    if (!form) return;

    const agreeAll = form.querySelector('input[name="agree_all"]');
    const requiredAgreements = form.querySelectorAll(
        'input[name="agree_privacy"], input[name="agree_third_party"]'
    );
    const errorSummary = form.querySelector('[data-form-error-summary]');
    let isDirty = false;
    let isSubmitting = false;

    function getVisibleField(field) {
        if (!field) return null;

        if (field.matches('select.select-control__native')) {
            return field.closest('.select-control')?.querySelector('.select-control__trigger') || field;
        }

        return field;
    }

    function focusField(field) {
        const target = getVisibleField(field);
        if (!target) return;

        const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        target.focus({ preventScroll: true });
        target.scrollIntoView({
            behavior: reduceMotion ? 'auto' : 'smooth',
            block: 'center'
        });
    }

    function findFieldFromHash(hash) {
        if (!hash || hash === '#') return null;

        try {
            return form.querySelector(hash);
        } catch {
            return null;
        }
    }

    function clearFieldError(field) {
        const describedBy = field.getAttribute('aria-describedby');
        field.removeAttribute('aria-invalid');

        if (field.matches('select.select-control__native')) {
            field.closest('.select-control')
                ?.querySelector('.select-control__trigger')
                ?.removeAttribute('aria-invalid');
        }

        if (!describedBy) return;

        describedBy.split(/\s+/).forEach((id) => {
            const description = document.getElementById(id);
            if (description?.classList.contains('program-apply-field-error')) {
                description.hidden = true;
            }
        });
    }

    form.addEventListener('input', (event) => {
        isDirty = true;

        if (event.target instanceof HTMLElement) {
            clearFieldError(event.target);
        }
    });

    form.addEventListener('change', (event) => {
        isDirty = true;

        if (event.target instanceof HTMLElement) {
            clearFieldError(event.target);
        }
    });

    form.addEventListener('submit', () => {
        isSubmitting = true;
    });

    window.addEventListener('beforeunload', (event) => {
        if (!isDirty || isSubmitting) return;

        event.preventDefault();
        event.returnValue = '';
    });

    agreeAll?.addEventListener('change', () => {
        requiredAgreements.forEach((checkbox) => {
            checkbox.checked = agreeAll.checked;
            checkbox.dispatchEvent(new Event('change', { bubbles: true }));
        });
    });

    requiredAgreements.forEach((checkbox) => {
        checkbox.addEventListener('change', () => {
            if (!agreeAll) return;
            agreeAll.checked = Array.from(requiredAgreements).every((item) => item.checked);
        });
    });

    errorSummary?.addEventListener('click', (event) => {
        const link = event.target.closest('a[href^="#field-"]');
        if (!link) return;

        const field = findFieldFromHash(link.hash);
        if (!field) return;

        event.preventDefault();
        focusField(field);
    });

    const firstInvalidField = form.querySelector('[aria-invalid="true"]');
    if (firstInvalidField) {
        window.requestAnimationFrame(() => focusField(firstInvalidField));
    }
});

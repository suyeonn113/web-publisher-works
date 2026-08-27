document.addEventListener('DOMContentLoaded', () => {
    const searchButtons = document.querySelectorAll('button.control--search');

    const hasEnteredValue = (control) => {
        if (control.disabled) return false;

        if (control.matches('input[type="checkbox"], input[type="radio"]')) {
            return control.checked;
        }

        if (control.matches('input[type="file"]')) {
            return control.files.length > 0;
        }

        return control.value.trim() !== '';
    };

    searchButtons.forEach((button) => {
        const form = button.closest('form');
        if (!form) return;

        const controls = [...form.elements].filter((control) => {
            if (!(control instanceof HTMLElement)) return false;
            if (control === button) return false;

            return control.matches(
                'select, textarea, input:not([type="hidden"]):not([type="submit"]):not([type="button"]):not([type="reset"])'
            );
        });

        const updateState = () => {
            button.classList.toggle('is-active', controls.some(hasEnteredValue));
        };

        form.addEventListener('input', updateState);
        form.addEventListener('change', updateState);
        form.addEventListener('reset', () => window.setTimeout(updateState));
        updateState();
    });
});

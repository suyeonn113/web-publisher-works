document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('.application-edit-page .program-apply-form');
    if (!form) return;

    const fields = [...form.querySelectorAll('.program-apply-field input, .program-apply-field select')];

    fields.forEach((field) => {
        const item = field.closest('.program-apply-field');
        const labelText = item?.querySelector(':scope > span');
        if (!item || !labelText) return;

        const initialValue = field.value;
        const status = document.createElement('span');

        status.className = 'application-edit-field-status type-caption';
        status.textContent = '변경됨';
        status.hidden = true;
        labelText.append(status);

        const syncChangedState = () => {
            const isChanged = field.value !== initialValue;

            item.classList.toggle('is-changed', isChanged);
            status.hidden = !isChanged;
        };

        field.addEventListener('input', syncChangedState);
        field.addEventListener('change', syncChangedState);
        form.addEventListener('reset', () => window.setTimeout(syncChangedState));
    });
});

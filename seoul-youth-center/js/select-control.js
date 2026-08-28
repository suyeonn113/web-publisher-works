const selectControlScript = document.currentScript;

document.addEventListener('DOMContentLoaded', () => {
    const baseUrl = selectControlScript?.dataset.baseUrl || '';
    const selects = [...document.querySelectorAll('select:not([data-native-select])')]
        .filter((select) => !select.multiple && select.size <= 1);

    if (selects.length === 0) return;

    const enhancedSelects = [];

    const closeSelect = (item, restoreFocus = false) => {
        if (!item.wrapper.classList.contains('is-open')) return;

        item.wrapper.classList.remove('is-open');
        item.trigger.setAttribute('aria-expanded', 'false');
        item.options.hidden = true;
        item.options.classList.remove('is-above');

        if (restoreFocus) item.trigger.focus();
    };

    const closeAll = (except = null) => {
        enhancedSelects.forEach((item) => {
            if (item !== except) closeSelect(item);
        });
    };

    selects.forEach((select, selectIndex) => {
        if (!select.id) select.id = `select-control-${selectIndex + 1}`;

        const nestedLabel = select.closest('label');
        const explicitLabel = [...document.querySelectorAll('label[for]')]
            .find((label) => label.htmlFor === select.id);
        const label = explicitLabel || nestedLabel;

        if (!label) return;

        const labelText = nestedLabel?.querySelector(':scope > span') || label;
        const wrapper = document.createElement('div');
        const trigger = document.createElement('button');
        const triggerText = document.createElement('span');
        const triggerIcon = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        const triggerIconUse = document.createElementNS('http://www.w3.org/2000/svg', 'use');
        const options = document.createElement('ul');
        const triggerId = `${select.id}-trigger`;
        const triggerTextId = `${select.id}-value`;
        const optionsId = `${select.id}-options`;
        const labelId = labelText.id || `${select.id}-label`;

        labelText.id = labelId;
        if (!nestedLabel) label.htmlFor = triggerId;

        wrapper.className = 'select-control';
        trigger.className = 'select-control__trigger control';
        trigger.id = triggerId;
        trigger.type = 'button';
        trigger.disabled = select.disabled;
        trigger.setAttribute('aria-haspopup', 'listbox');
        trigger.setAttribute('aria-expanded', 'false');
        trigger.setAttribute('aria-controls', optionsId);
        trigger.setAttribute('aria-labelledby', `${labelId} ${triggerTextId}`);
        if (select.required) trigger.setAttribute('aria-required', 'true');
        if (select.hasAttribute('aria-invalid')) trigger.setAttribute('aria-invalid', select.getAttribute('aria-invalid'));
        if (select.hasAttribute('aria-describedby')) trigger.setAttribute('aria-describedby', select.getAttribute('aria-describedby'));

        triggerText.className = 'select-control__value';
        triggerText.id = triggerTextId;
        triggerIcon.classList.add('select-control__icon', 'icon', 'icon--text');
        triggerIcon.setAttribute('aria-hidden', 'true');
        triggerIcon.setAttribute('focusable', 'false');
        triggerIconUse.setAttribute('href', `${baseUrl}/assets/icons/lucide-ui.svg#chevron-down`);
        triggerIcon.append(triggerIconUse);
        trigger.append(triggerText, triggerIcon);

        options.className = 'select-control__options';
        options.id = optionsId;
        options.setAttribute('role', 'listbox');
        options.setAttribute('aria-labelledby', labelId);
        options.hidden = true;

        select.classList.add('select-control__native');
        select.tabIndex = -1;
        select.setAttribute('aria-hidden', 'true');

        [...select.options].forEach((nativeOption, optionIndex) => {
            const option = document.createElement('li');

            option.className = 'select-control__option';
            option.id = `${select.id}-option-${optionIndex}`;
            option.dataset.value = nativeOption.value;
            option.setAttribute('role', 'option');
            option.setAttribute('tabindex', '-1');
            option.setAttribute('aria-selected', String(nativeOption.selected));
            option.setAttribute('aria-disabled', String(nativeOption.disabled));
            option.textContent = nativeOption.textContent;
            options.append(option);
        });

        select.before(wrapper);
        wrapper.append(select, trigger, options);

        const item = { select, wrapper, trigger, triggerText, options };
        enhancedSelects.push(item);

        const optionItems = [...options.querySelectorAll('.select-control__option')];

        const syncSelection = ({ clearInvalid = false } = {}) => {
            const selectedIndex = Math.max(select.selectedIndex, 0);

            triggerText.textContent = select.options[selectedIndex]?.textContent || '';
            trigger.disabled = select.disabled;
            if (clearInvalid) trigger.removeAttribute('aria-invalid');
            optionItems.forEach((option, optionIndex) => {
                option.setAttribute('aria-selected', String(optionIndex === selectedIndex));
            });
        };

        const positionOptions = () => {
            options.classList.remove('is-above');

            const triggerRect = trigger.getBoundingClientRect();
            const optionsHeight = options.offsetHeight;
            const spaceBelow = window.innerHeight - triggerRect.bottom;
            const spaceAbove = triggerRect.top;

            if (optionsHeight > spaceBelow && spaceAbove > spaceBelow) {
                options.classList.add('is-above');
            }
        };

        const openSelect = (focusSelected = false) => {
            if (select.disabled) return;

            closeAll(item);
            wrapper.classList.add('is-open');
            trigger.setAttribute('aria-expanded', 'true');
            options.hidden = false;
            positionOptions();

            if (focusSelected) {
                optionItems[Math.max(select.selectedIndex, 0)]?.focus();
            }
        };

        const selectOption = (option) => {
            if (option.getAttribute('aria-disabled') === 'true') return;

            select.value = option.dataset.value;
            select.dispatchEvent(new Event('change', { bubbles: true }));
            syncSelection({ clearInvalid: true });
            closeSelect(item, true);
        };

        trigger.addEventListener('click', () => {
            if (wrapper.classList.contains('is-open')) {
                closeSelect(item);
            } else {
                openSelect();
            }
        });

        trigger.addEventListener('keydown', (event) => {
            if (!['ArrowDown', 'ArrowUp', 'Enter', ' '].includes(event.key)) return;

            event.preventDefault();
            openSelect(true);
        });

        options.addEventListener('click', (event) => {
            const option = event.target.closest('.select-control__option');
            if (option) selectOption(option);
        });

        options.addEventListener('keydown', (event) => {
            const availableOptions = optionItems.filter(
                (option) => option.getAttribute('aria-disabled') !== 'true'
            );
            const currentIndex = availableOptions.indexOf(document.activeElement);
            let nextIndex = currentIndex;

            if (event.key === 'ArrowDown') nextIndex = Math.min(currentIndex + 1, availableOptions.length - 1);
            if (event.key === 'ArrowUp') nextIndex = Math.max(currentIndex - 1, 0);
            if (event.key === 'Home') nextIndex = 0;
            if (event.key === 'End') nextIndex = availableOptions.length - 1;

            if (nextIndex !== currentIndex && nextIndex >= 0) {
                event.preventDefault();
                availableOptions[nextIndex]?.focus();
                return;
            }

            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                const option = event.target.closest('.select-control__option');
                if (option) selectOption(option);
            }

            if (event.key === 'Escape' || event.key === 'Tab') {
                closeSelect(item, event.key === 'Escape');
            }
        });

        select.addEventListener('change', () => syncSelection({ clearInvalid: true }));
        select.addEventListener('invalid', (event) => {
            event.preventDefault();
            trigger.setAttribute('aria-invalid', 'true');
            openSelect(true);
            trigger.focus();
        });

        if (nestedLabel) {
            nestedLabel.addEventListener('click', (event) => {
                if (event.target.closest('.select-control')) return;

                event.preventDefault();
                trigger.focus();
            });
        }

        select.form?.addEventListener('reset', () => {
            window.setTimeout(syncSelection);
        });

        syncSelection();
    });

    document.addEventListener('pointerdown', (event) => {
        if (!event.target.closest('.select-control')) closeAll();
    });

    window.addEventListener('resize', () => closeAll());
});

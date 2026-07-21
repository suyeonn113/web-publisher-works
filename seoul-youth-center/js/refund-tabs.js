document.querySelectorAll('[data-refund-tabs]').forEach((tabGroup) => {
    const tabs = Array.from(tabGroup.querySelectorAll('[data-refund-tab]'));
    const panels = Array.from(tabGroup.querySelectorAll('[data-refund-panel]'));

    const activateTab = (nextTab, moveFocus = false) => {
        const nextKey = nextTab.dataset.refundTab;

        tabs.forEach((tab) => {
            const isActive = tab === nextTab;
            tab.setAttribute('aria-selected', String(isActive));
            tab.tabIndex = isActive ? 0 : -1;
        });

        panels.forEach((panel) => {
            panel.hidden = panel.dataset.refundPanel !== nextKey;
        });

        if (moveFocus) {
            nextTab.focus();
        }
    };

    tabs.forEach((tab, index) => {
        tab.addEventListener('click', () => activateTab(tab));

        tab.addEventListener('keydown', (event) => {
            let nextIndex = null;

            if (event.key === 'ArrowRight') nextIndex = (index + 1) % tabs.length;
            if (event.key === 'ArrowLeft') nextIndex = (index - 1 + tabs.length) % tabs.length;
            if (event.key === 'Home') nextIndex = 0;
            if (event.key === 'End') nextIndex = tabs.length - 1;

            if (nextIndex === null) return;

            event.preventDefault();
            activateTab(tabs[nextIndex], true);
        });
    });
});

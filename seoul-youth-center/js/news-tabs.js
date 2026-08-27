document.querySelectorAll('[data-news-tabs]').forEach((section) => {
    const tabs = Array.from(section.querySelectorAll('[data-news-tab]'));
    const panels = Array.from(section.querySelectorAll('[data-news-panel]'));
    const moreLink = section.querySelector('[data-news-more]');
    const linksEnabled = section.dataset.newsLinksEnabled === 'true';

    if (tabs.length === 0 || panels.length === 0 || !moreLink) return;

    const syncMoreLink = (tab) => {
        const futureHref = tab.dataset.moreHref || '';
        const moreLabel = tab.dataset.moreLabel || '더보기';

        moreLink.dataset.targetHref = futureHref;
        moreLink.setAttribute('aria-label', moreLabel);

        if (linksEnabled && futureHref) {
            moreLink.setAttribute('href', futureHref);
            moreLink.removeAttribute('role');
            moreLink.removeAttribute('aria-disabled');
            return;
        }

        moreLink.removeAttribute('href');
        moreLink.setAttribute('role', 'link');
        moreLink.setAttribute('aria-disabled', 'true');
    };

    const activateTab = (nextTab, moveFocus = false) => {
        const nextKey = nextTab.dataset.newsTab;

        tabs.forEach((tab) => {
            const isActive = tab === nextTab;
            tab.setAttribute('aria-selected', String(isActive));
            tab.tabIndex = isActive ? 0 : -1;
        });

        panels.forEach((panel) => {
            panel.hidden = panel.dataset.newsPanel !== nextKey;
        });

        syncMoreLink(nextTab);

        if (moveFocus) nextTab.focus();
    };

    tabs.forEach((tab, index) => {
        tab.addEventListener('click', () => activateTab(tab));

        tab.addEventListener('keydown', (event) => {
            let nextIndex = null;

            if (event.key === 'ArrowRight' || event.key === 'ArrowDown') nextIndex = (index + 1) % tabs.length;
            if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') nextIndex = (index - 1 + tabs.length) % tabs.length;
            if (event.key === 'Home') nextIndex = 0;
            if (event.key === 'End') nextIndex = tabs.length - 1;
            if (nextIndex === null) return;

            event.preventDefault();
            activateTab(tabs[nextIndex], true);
        });
    });

    activateTab(tabs.find((tab) => tab.getAttribute('aria-selected') === 'true') || tabs[0]);
});
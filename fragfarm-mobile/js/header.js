(function () {
    const header = document.querySelector('.site-header');
    const drawerPairs = [
        {
            button: document.querySelector('#header-shop'),
            drawer: document.querySelector('#shop-drawer'),
            openLabel: 'SHOP 메뉴 닫기',
            closedLabel: 'SHOP 메뉴 열기',
        },
        {
            button: document.querySelector('#header-menu'),
            drawer: document.querySelector('#gnb'),
            openLabel: 'MENU 닫기',
            closedLabel: 'MENU 열기',
        },
    ].filter(({ button, drawer }) => button && drawer);

    const setDrawerState = (pair, isOpen, returnFocus = false) => {
        pair.button.setAttribute('aria-expanded', String(isOpen));
        pair.button.setAttribute('aria-label', isOpen ? pair.openLabel : pair.closedLabel);
        pair.drawer.dataset.state = isOpen ? 'open' : '';
        header?.classList.toggle('is-drawer-open', drawerPairs.some(({ button }) => button.getAttribute('aria-expanded') === 'true'));

        if (!isOpen && returnFocus) pair.button.focus();
    };

    const closeOtherDrawers = (activePair) => {
        drawerPairs.forEach((pair) => {
            if (pair !== activePair) setDrawerState(pair, false);
        });
    };

    const getDrawerItems = (drawer) => Array.from(
        drawer.querySelectorAll('.header-drawer__list > li > a[href], .header-drawer__search input:not([disabled])')
    ).filter((item) => item.getClientRects().length > 0);

    drawerPairs.forEach((pair) => {
        setDrawerState(pair, false);

        pair.button.addEventListener('click', (event) => {
            const nextState = pair.button.getAttribute('aria-expanded') !== 'true';
            closeOtherDrawers(pair);
            setDrawerState(pair, nextState);

            if (nextState && event.detail === 0) {
                window.requestAnimationFrame(() => getDrawerItems(pair.drawer)[0]?.focus());
            }
        });

        pair.button.addEventListener('keydown', (event) => {
            if (event.key !== 'ArrowDown') return;

            event.preventDefault();
            closeOtherDrawers(pair);
            setDrawerState(pair, true);
            window.requestAnimationFrame(() => getDrawerItems(pair.drawer)[0]?.focus());
        });

        pair.drawer.addEventListener('keydown', (event) => {
            const items = getDrawerItems(pair.drawer);
            const currentIndex = items.indexOf(document.activeElement);
            if (currentIndex < 0 || items.length === 0) return;

            if (event.key === 'Tab' && event.shiftKey) {
                event.preventDefault();
                setDrawerState(pair, false, true);
                return;
            }

            if (!['ArrowDown', 'ArrowUp', 'ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;

            event.preventDefault();
            let nextIndex = currentIndex;
            if (event.key === 'ArrowDown' || event.key === 'ArrowRight') nextIndex = (currentIndex + 1) % items.length;
            if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') nextIndex = (currentIndex - 1 + items.length) % items.length;
            if (event.key === 'Home') nextIndex = 0;
            if (event.key === 'End') nextIndex = items.length - 1;
            items[nextIndex].focus();
        });
    });

    document.addEventListener('click', (event) => {
        drawerPairs.forEach((pair) => {
            if (pair.button.contains(event.target) || pair.drawer.contains(event.target)) return;
            setDrawerState(pair, false);
        });
    });

    document.addEventListener('keydown', (event) => {
        if (event.key !== 'Escape') return;

        const openPair = drawerPairs.find(({ button }) => button.getAttribute('aria-expanded') === 'true');
        if (openPair) setDrawerState(openPair, false, true);
    });

    const placeholderButtons = document.querySelectorAll('[data-global-placeholder]');
    let placeholderToast;
    let placeholderTimer;

    const showPlaceholderToast = (message) => {
        if (!placeholderToast) {
            placeholderToast = document.createElement('p');
            placeholderToast.className = 'global-toast';
            placeholderToast.setAttribute('role', 'status');
            placeholderToast.setAttribute('aria-live', 'polite');
            document.body.appendChild(placeholderToast);
        }

        window.clearTimeout(placeholderTimer);
        placeholderToast.textContent = message || '준비 중입니다.';
        placeholderToast.hidden = false;

        placeholderTimer = window.setTimeout(() => {
            placeholderToast.hidden = true;
        }, 1800);
    };

    window.showGlobalToast = showPlaceholderToast;

    placeholderButtons.forEach((button) => {
        button.addEventListener('click', (event) => {
            event.preventDefault();
            showPlaceholderToast(button.dataset.placeholderMessage);
        });
    });
}());

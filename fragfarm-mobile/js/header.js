    /* Main Menu */
    const menuButton = document.querySelector('#header-menu');
    const mobileMenu = document.querySelector('#gnb');
    const iconOpen = menuButton?.querySelector('[data-state="open"]');
    const iconClosed = menuButton?.querySelector('[data-state="closed"]');
    const header = document.querySelector('header');

    if (menuButton && mobileMenu && iconOpen && iconClosed) {
        function setMenuState(isOpen) {
            menuButton.setAttribute('aria-expanded', String(isOpen));
            menuButton.setAttribute('aria-label', isOpen ? '메뉴 닫기' : '메뉴 열기');

            header?.classList.toggle('is-menu-open', isOpen);
            mobileMenu.dataset.state = isOpen ? 'open' : '';

            iconOpen.hidden = !isOpen;
            iconClosed.hidden = isOpen;
        }

        setMenuState(false);

        menuButton.addEventListener('click', () => {
            const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
            setMenuState(!isOpen);
        });

        const getMenuItems = () => Array.from(mobileMenu.querySelectorAll('a[href], button:not([disabled]), input:not([disabled])'))
            .filter((item) => !item.closest('[hidden]') && item.getClientRects().length > 0);

        menuButton.addEventListener('keydown', (event) => {
            if (event.key !== 'ArrowDown') return;

            event.preventDefault();
            setMenuState(true);
            window.requestAnimationFrame(() => getMenuItems()[0]?.focus());
        });

        mobileMenu.addEventListener('keydown', (event) => {
            if (event.target.matches('input, textarea, select')) return;
            if (!['ArrowDown', 'ArrowUp', 'Home', 'End'].includes(event.key)) return;

            const items = getMenuItems();
            const currentIndex = items.indexOf(document.activeElement);
            if (currentIndex < 0 || items.length === 0) return;

            event.preventDefault();
            let nextIndex = currentIndex;

            if (event.key === 'ArrowDown') nextIndex = (currentIndex + 1) % items.length;
            if (event.key === 'ArrowUp') nextIndex = (currentIndex - 1 + items.length) % items.length;
            if (event.key === 'Home') nextIndex = 0;
            if (event.key === 'End') nextIndex = items.length - 1;

            items[nextIndex].focus();
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
                if (!isOpen) return;

                setMenuState(false);
                menuButton.focus();
            }
        });
    }

    /* Sub Menu */
    const mainMenus = document.querySelectorAll('.gnb__item--has-sub');
    mainMenus.forEach((mainMenu) => {
        const toggleButton = mainMenu.querySelector('.gnb__toggle');
        const subMenu = mainMenu.querySelector('.gnb__sublist');
        const toggleIcon = mainMenu.querySelector('.toggle-btn');

        if (!toggleButton || !subMenu) return;

        const isOpen = toggleButton.getAttribute('aria-expanded') === 'true';
        subMenu.hidden = !isOpen;
        toggleIcon?.classList.toggle('is-sub-open', isOpen);

        toggleButton.addEventListener('click', () => {
            const isOpen = toggleButton.getAttribute('aria-expanded') === 'true';
            const nextState = !isOpen;

            toggleButton.setAttribute('aria-expanded', String(nextState));
            toggleIcon?.classList.toggle('is-sub-open', nextState);
            subMenu.hidden = !nextState;
        });

        toggleButton.addEventListener('keydown', (event) => {
            if (event.key === 'ArrowRight') {
                event.preventDefault();
                toggleButton.setAttribute('aria-expanded', 'true');
                toggleIcon?.classList.add('is-sub-open');
                subMenu.hidden = false;
                subMenu.querySelector('a[href], button:not([disabled])')?.focus();
            }

            if (event.key === 'ArrowLeft' && !subMenu.hidden) {
                event.preventDefault();
                toggleButton.setAttribute('aria-expanded', 'false');
                toggleIcon?.classList.remove('is-sub-open');
                subMenu.hidden = true;
                toggleButton.focus();
            }
        });
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

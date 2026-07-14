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

    placeholderButtons.forEach((button) => {
        button.addEventListener('click', (event) => {
            event.preventDefault();
            showPlaceholderToast(button.dataset.placeholderMessage);
        });
    });

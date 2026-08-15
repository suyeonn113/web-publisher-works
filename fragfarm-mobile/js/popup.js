(function () {
    const popup = document.querySelector('[data-scroll-popup]');
    if (!popup) return;

    const dismiss = popup.querySelector('.popup__dismiss');
    const closeButton = popup.querySelector('.popup__close');
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let hasOpened = false;
    let closeTimer = 0;

    const setCookie = (name, value, days) => {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        document.cookie = `${name}=${value}; expires=${date.toUTCString()}; path=/; SameSite=Lax`;
    };

    const getCookie = (name) => document.cookie
        .split(';')
        .map((cookie) => cookie.trim())
        .find((cookie) => cookie.startsWith(`${name}=`))
        ?.substring(name.length + 1) || null;

    const openPopup = () => {
        if (hasOpened || getCookie('popupClosed')) return;
        hasOpened = true;
        popup.hidden = false;
        if (reducedMotion.matches) popup.classList.add('is-visible');
        else window.requestAnimationFrame(() => popup.classList.add('is-visible'));
    };

    const closePopup = () => {
        if (popup.hidden) return;
        popup.classList.remove('is-visible');
        window.clearTimeout(closeTimer);
        closeTimer = window.setTimeout(() => {
            popup.hidden = true;
        }, reducedMotion.matches ? 0 : 350);
    };

    const handleScroll = () => {
        const revealPoint = Math.min(240, window.innerHeight * 0.22);
        if (window.scrollY < revealPoint) return;
        openPopup();
        window.removeEventListener('scroll', handleScroll);
    };

    if (!getCookie('popupClosed')) {
        window.addEventListener('scroll', handleScroll, { passive: true });
    }

    dismiss?.addEventListener('click', () => {
        setCookie('popupClosed', 'true', 1);
        closePopup();
    });
    closeButton?.addEventListener('click', closePopup);

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && !popup.hidden) closePopup();
    });
}());

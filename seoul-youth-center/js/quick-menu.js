document.addEventListener('DOMContentLoaded', () => {
    const banner = document.querySelector('.banner');
    const quickMenu = document.querySelector('.quick-menu--home');
    const contact = document.querySelector('.quick-menu--home__contact');
    const contactToggle = contact?.querySelector(
        '.quick-menu--home__contact-summary'
    );
    const contactList = contact?.querySelector(
        '.quick-menu--home__contact-list'
    );
    const firstQuickMenuAction = quickMenu?.querySelector(
        '.quick-menu--home__link'
    );

    if (
        !banner ||
        !quickMenu ||
        !contact ||
        !contactToggle ||
        !contactList
    ) return;

    const sideBySideQuery = window.matchMedia('(min-width: 64.125rem)');
    const wideLayoutQuery = window.matchMedia('(min-width: 96rem)');
    let resizeFrame = null;
    let wasSideBySide = sideBySideQuery.matches;
    let contactToggleWasFocused = false;

    function syncContactLayout() {
        const isSideBySide = sideBySideQuery.matches;

        quickMenu.classList.remove(
            'is-contact-heading-hidden',
            'is-contact-info-hidden',
            'is-service-label-hidden'
        );
        contact.classList.remove('visually-hidden');

        if (!isSideBySide) {
            if (wasSideBySide) {
                contactToggle.setAttribute('aria-expanded', 'false');
                contactList.hidden = true;
            }

            wasSideBySide = false;
            return;
        }

        wasSideBySide = true;
        contactToggle.setAttribute('aria-expanded', 'true');
        contactList.hidden = false;

        const fullHeight = quickMenu.getBoundingClientRect().height;
        const bannerHeight = banner.getBoundingClientRect().height;

        if (fullHeight <= bannerHeight + 1) return;

        quickMenu.classList.add('is-contact-heading-hidden');

        const labelHiddenHeight = quickMenu.getBoundingClientRect().height;

        if (labelHiddenHeight > bannerHeight + 1 && !wideLayoutQuery.matches) {
            quickMenu.classList.add('is-contact-info-hidden');
            contact.classList.add('visually-hidden');

            const serviceOnlyHeight = quickMenu.getBoundingClientRect().height;
            const heightTolerance = parseFloat(
                window.getComputedStyle(quickMenu).paddingTop
            ) || 0;

            if (serviceOnlyHeight > bannerHeight + heightTolerance) {
                quickMenu.classList.add('is-service-label-hidden');
            }
        }
    }

    function scheduleContactLayoutSync() {
        if (resizeFrame !== null) cancelAnimationFrame(resizeFrame);
        resizeFrame = requestAnimationFrame(() => {
            syncContactLayout();
            resizeFrame = null;
        });
    }

    function setContactExpanded(isExpanded) {
        if (sideBySideQuery.matches) {
            contactToggle.setAttribute('aria-expanded', 'true');
            return;
        }

        contactToggle.setAttribute('aria-expanded', String(isExpanded));
        contactList.hidden = !isExpanded;
    }

    contactToggle.addEventListener('click', () => {
        const isExpanded = contactToggle.getAttribute('aria-expanded') === 'true';
        setContactExpanded(!isExpanded);
    });

    contactToggle.addEventListener('focus', () => {
        contactToggleWasFocused = true;
    });

    contactToggle.addEventListener('blur', () => {
        if (!sideBySideQuery.matches) contactToggleWasFocused = false;
    });

    sideBySideQuery.addEventListener('change', (event) => {
        scheduleContactLayoutSync();

        if (!event.matches || !contactToggleWasFocused) return;

        requestAnimationFrame(() => {
            firstQuickMenuAction?.focus();
            contactToggleWasFocused = false;
        });
    });
    wideLayoutQuery.addEventListener('change', scheduleContactLayoutSync);
    window.addEventListener('resize', scheduleContactLayoutSync, { passive: true });
    document.fonts?.ready.then(scheduleContactLayoutSync);
    scheduleContactLayoutSync();
});

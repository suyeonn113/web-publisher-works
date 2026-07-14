(function () {
    const hero = document.querySelector('[data-hero-slider]');
    if (!hero) return;

    const pageHeader = document.querySelector('.home-page header');
    let headerFrame = 0;

    const updateHeaderTheme = () => {
        headerFrame = 0;
        if (!pageHeader) return;

        const heroBottom = hero.getBoundingClientRect().bottom;
        const isOverHero = heroBottom > pageHeader.offsetHeight;
        pageHeader.classList.toggle('is-over-hero', isOverHero);
    };

    const requestHeaderUpdate = () => {
        if (headerFrame) return;
        headerFrame = window.requestAnimationFrame(updateHeaderTheme);
    };

    window.addEventListener('scroll', requestHeaderUpdate, { passive: true });
    window.addEventListener('resize', requestHeaderUpdate);
    updateHeaderTheme();

    const slides = Array.from(hero.querySelectorAll('[data-hero-slide]'));
    const dots = Array.from(hero.querySelectorAll('[data-hero-dot]'));
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let currentIndex = 0;
    let autoplayTimer = 0;
    let pointerStartX = 0;
    let pointerStartY = 0;

    const showSlide = (index) => {
        currentIndex = (index + slides.length) % slides.length;
        slides.forEach((slide, slideIndex) => {
            const isCurrent = slideIndex === currentIndex;
            slide.classList.toggle('is-active', isCurrent);
            slide.setAttribute('aria-hidden', String(!isCurrent));
        });
        dots.forEach((dot, dotIndex) => {
            if (dotIndex === currentIndex) dot.setAttribute('aria-current', 'true');
            else dot.removeAttribute('aria-current');
        });
    };

    const stopAutoplay = () => window.clearTimeout(autoplayTimer);
    const startAutoplay = () => {
        stopAutoplay();
        if (reducedMotion.matches || document.hidden || slides.length < 2) return;
        autoplayTimer = window.setTimeout(() => {
            showSlide(currentIndex + 1);
            startAutoplay();
        }, 4500);
    };

    dots.forEach((dot) => {
        dot.addEventListener('click', () => {
            showSlide(Number(dot.dataset.heroDot || 0));
            startAutoplay();
        });

        dot.addEventListener('keydown', (event) => {
            if (!['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Home', 'End'].includes(event.key)) return;

            event.preventDefault();
            const dotIndex = dots.indexOf(dot);
            let nextIndex = dotIndex;
            if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') nextIndex = (dotIndex - 1 + dots.length) % dots.length;
            if (event.key === 'ArrowRight' || event.key === 'ArrowDown') nextIndex = (dotIndex + 1) % dots.length;
            if (event.key === 'Home') nextIndex = 0;
            if (event.key === 'End') nextIndex = dots.length - 1;

            showSlide(nextIndex);
            dots[nextIndex].focus();
            stopAutoplay();
        });
    });

    hero.addEventListener('pointerdown', (event) => {
        pointerStartX = event.clientX;
        pointerStartY = event.clientY;
        stopAutoplay();
    });

    hero.addEventListener('pointerup', (event) => {
        const distanceX = event.clientX - pointerStartX;
        const distanceY = event.clientY - pointerStartY;
        if (Math.abs(distanceX) > 45 && Math.abs(distanceX) > Math.abs(distanceY)) {
            showSlide(currentIndex + (distanceX < 0 ? 1 : -1));
        }
        startAutoplay();
    });

    hero.addEventListener('pointercancel', startAutoplay);

    hero.addEventListener('focusin', stopAutoplay);
    hero.addEventListener('focusout', startAutoplay);
    document.addEventListener('visibilitychange', startAutoplay);
    reducedMotion.addEventListener('change', startAutoplay);

    showSlide(0);
    startAutoplay();
}());

(function () {
    const hero = document.querySelector('[data-hero-slider]');
    if (!hero) return;

    const slides = Array.from(hero.querySelectorAll('[data-hero-slide]'));
    const currentCounter = hero.querySelector('[data-hero-current]');
    const totalCounter = hero.querySelector('[data-hero-total]');
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

    let currentIndex = 0;
    let autoPlayTimer = 0;
    let touchStartX = 0;
    let touchStartY = 0;

    const setActiveSlide = (index) => {
        if (!slides.length || index < 0 || index >= slides.length) return;

        slides.forEach((slide, slideIndex) => {
            const isActive = slideIndex === index;
            slide.classList.toggle('is-active', isActive);
            slide.setAttribute('aria-hidden', String(!isActive));
        });

        if (currentCounter) currentCounter.textContent = String(index + 1);
        if (totalCounter) totalCounter.textContent = String(slides.length);
        currentIndex = index;
    };

    const stopAutoPlay = () => {
        window.clearInterval(autoPlayTimer);
        autoPlayTimer = 0;
    };

    const startAutoPlay = () => {
        stopAutoPlay();
        if (reducedMotion.matches || slides.length < 2) return;

        autoPlayTimer = window.setInterval(() => {
            setActiveSlide((currentIndex + 1) % slides.length);
        }, 4500);
    };

    hero.addEventListener('touchstart', (event) => {
        const touch = event.changedTouches[0];
        touchStartX = touch.clientX;
        touchStartY = touch.clientY;
        stopAutoPlay();
    }, { passive: true });

    hero.addEventListener('touchend', (event) => {
        const touch = event.changedTouches[0];
        const deltaX = touch.clientX - touchStartX;
        const deltaY = touch.clientY - touchStartY;

        if (Math.abs(deltaX) >= 40 && Math.abs(deltaX) > Math.abs(deltaY)) {
            const direction = deltaX < 0 ? 1 : -1;
            setActiveSlide((currentIndex + direction + slides.length) % slides.length);
        }
        startAutoPlay();
    }, { passive: true });

    hero.addEventListener('mouseenter', stopAutoPlay);
    hero.addEventListener('mouseleave', startAutoPlay);
    hero.addEventListener('focusin', stopAutoPlay);
    hero.addEventListener('focusout', startAutoPlay);
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) stopAutoPlay();
        else startAutoPlay();
    });

    const handleReducedMotion = (event) => {
        if (event.matches) stopAutoPlay();
        else startAutoPlay();
    };

    if (typeof reducedMotion.addEventListener === 'function') {
        reducedMotion.addEventListener('change', handleReducedMotion);
    } else if (typeof reducedMotion.addListener === 'function') {
        reducedMotion.addListener(handleReducedMotion);
    }

    setActiveSlide(0);
    startAutoPlay();
}());

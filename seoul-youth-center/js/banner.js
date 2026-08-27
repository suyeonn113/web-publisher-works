document.addEventListener('DOMContentLoaded', () => {
    const banner = document.querySelector('.banner');
    if (!banner) return;

    const bannerList = banner.querySelector('.banner__list');
    const bannerItems = Array.from(banner.querySelectorAll('.banner__item'));
    const prevButton = banner.querySelector('.banner__prev');
    const nextButton = banner.querySelector('.banner__next');
    const pauseButton = banner.querySelector('.banner__pause');
    const countText = banner.querySelector('.banner__count');

    if (
        !bannerList ||
        !bannerItems.length ||
        !prevButton ||
        !nextButton ||
        !pauseButton ||
        !countText
    ) return;

    const total = bannerItems.length;
    const autoDelay = 3000;
    const threshold = 50;

    let currentIndex = 0;
    let autoSlideId = null;
    let isPlaying = true;
    let startX = 0;
    let endX = 0;

    function updatePauseButton() {
        pauseButton.setAttribute(
            'aria-label',
            isPlaying ? '자동재생 일시정지' : '자동재생 다시 시작'
        );
        pauseButton.setAttribute(
            'aria-pressed',
            isPlaying ? 'false' : 'true'
        );
        pauseButton.dataset.state = isPlaying ? 'playing' : 'paused';

        const iconUse = pauseButton.querySelector('use');
        if (iconUse) {
            const baseUrl = window.APP_BASE_URL || '';
            iconUse.setAttribute(
                'href',
                `${baseUrl}/assets/icons/lucide-ui.svg#${isPlaying ? 'pause' : 'play'}`
            );
        }
    }

    function updateCount() {
        countText.textContent = `${currentIndex + 1} / ${total}`;
    }

    function updateItemsA11y() {
        bannerItems.forEach((item, index) => {
            const isActive = index === currentIndex;
            item.setAttribute('aria-hidden', isActive ? 'false' : 'true');
            const link = item.querySelector('a');
            if (link) {
                if (isActive) {
                    link.removeAttribute('tabindex');
                } else {
                    link.setAttribute('tabindex', '-1');
                }
            }
        });
    }

    function setActiveItem(index, animate = true) {
        bannerItems.forEach((item, itemIndex) => {
            item.style.transition = animate ? '' : 'none';
            item.dataset.active = itemIndex === index ? 'true' : 'false';
        });

        if (!animate) {
            bannerList.getBoundingClientRect();
            bannerItems.forEach((item) => {
                item.style.removeProperty('transition');
            });
        }
    }

    function updateBanner(animate = true) {
        setActiveItem(currentIndex, animate);
        updateCount();
        updateItemsA11y();
    }

    function goNext() {
        if (total <= 1) return;

        currentIndex = (currentIndex + 1) % total;
        updateBanner();
    }

    function goPrev() {
        if (total <= 1) return;

        currentIndex = (currentIndex - 1 + total) % total;
        updateBanner();
    }

    function startAutoSlide() {
        stopAutoSlide();
        if (total <= 1) return;
        autoSlideId = window.setInterval(goNext, autoDelay);
    }

    function stopAutoSlide() {
        if (autoSlideId !== null) {
            window.clearInterval(autoSlideId);
            autoSlideId = null;
        }
    }

    prevButton.addEventListener('click', () => {
        goPrev();
        if (isPlaying) startAutoSlide();
    });

    nextButton.addEventListener('click', () => {
        goNext();
        if (isPlaying) startAutoSlide();
    });

    pauseButton.addEventListener('click', () => {
        isPlaying = !isPlaying;

        if (isPlaying) {
            startAutoSlide();
        } else {
            stopAutoSlide();
        }

        updatePauseButton();
    });

    banner.addEventListener('mouseenter', stopAutoSlide);
    banner.addEventListener('mouseleave', () => {
        if (isPlaying) startAutoSlide();
    });

    banner.addEventListener('focusin', () => {
        if (!isPlaying) return;
        isPlaying = false;
        stopAutoSlide();
        updatePauseButton();
    });

    banner.addEventListener('touchstart', (event) => {
        startX = event.touches[0].clientX;
    });

    banner.addEventListener('touchend', (event) => {
        endX = event.changedTouches[0].clientX;

        const diff = startX - endX;
        if (Math.abs(diff) < threshold) return;

        if (diff > 0) {
            goNext();
        } else {
            goPrev();
        }

        if (isPlaying) startAutoSlide();
    });

    if (total <= 1) {
        prevButton.disabled = true;
        nextButton.disabled = true;
    }

    updatePauseButton();
    updateBanner(false);
    startAutoSlide();
});

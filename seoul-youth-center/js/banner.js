
document.addEventListener('DOMContentLoaded', () => {
    const banner = document.querySelector('.banner');
    if (!banner) return;

    const bannerList = document.querySelector('.banner__list');
    const bannerItems = Array.from(banner.querySelectorAll('.banner__item'));
    const prevButton = document.querySelector('.banner__prev');
    const nextButton = document.querySelector('.banner__next');
    const pauseButton = document.querySelector('.banner__pause');
    const countText = document.querySelector('.banner__count');

    if (
        !bannerList ||
        !bannerItems.length ||
        !prevButton ||
        !nextButton ||
        !pauseButton ||
        !countText
    ) return;

    const total = bannerItems.length;
    let currentIndex = 0;
    let autoSlideId = null;
    let isPlaying = true;
    const autoDelay = 3000;
    
    let startX = 0;
    let endX = 0;
    const threshold = 50;

    function updatePauseButton() {
        const PAUSE_PATH = 'M10 8V15.6M14 15.6V8';
        const PLAY_PATH = 'M9 12.0157V9.95824C9 7.7193 10.0813 7.61459 11.737 8.57416L13.3417 9.50602L14.7582 10.4195C16.4139 11.3791 16.4139 12.6893 14.7582 13.6488L13.3417 14.5438L11.737 15.3916C10.0813 16.3512 9 16.3491 9 14.1102V12.0157';

        pauseButton.setAttribute(
            'aria-label',
            isPlaying ? '자동재생 일시정지' : '자동재생 다시 시작'
        );
        pauseButton.setAttribute(
            'aria-pressed',
            isPlaying ? 'false' : 'true'
        );
        pauseButton.dataset.state = isPlaying ? 'playing' : 'paused';

        const symbolPath = pauseButton.querySelector('.icon__symbol');
        if (symbolPath) {
            symbolPath.setAttribute('d', isPlaying ? PAUSE_PATH : PLAY_PATH);
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

    function updateBanner() {
        bannerList.style.transform = `translateX(-${currentIndex * 100}%)`;
        updateCount();
        updateItemsA11y();
    }

    function goNext() {
        currentIndex = (currentIndex + 1) % total;
        updateBanner();
    }

    function goPrev() {
        currentIndex = (currentIndex - 1 + total) % total;
        updateBanner();
    }

    function startAutoSlide() {
        stopAutoSlide();
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

    banner.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
    });

    banner.addEventListener('touchend', (e) => {
        endX = e.changedTouches[0].clientX;

        const diff = startX - endX;

        if (Math.abs(diff) < threshold) return;

        if (diff > 0) {
            goNext(); // 왼쪽으로 밀면 다음
        } else {
            goPrev(); // 오른쪽으로 밀면 이전
        }

        if (isPlaying) startAutoSlide();
    });

    // 초기값
    bannerList.style.transition = 'transform 0.4s ease';
    updatePauseButton();
    updateBanner();
    startAutoSlide();
});

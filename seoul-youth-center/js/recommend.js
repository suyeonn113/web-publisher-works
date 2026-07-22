document.addEventListener('DOMContentLoaded', () => {
    const explorer = document.querySelector('.program-explorer');
    if (!explorer) return;

    const result = explorer.querySelector('.program-explorer__result');
    const slider = explorer.querySelector('.program-explorer__slider');
    const grid = explorer.querySelector('.program-explorer__grid');
    const count = explorer.querySelector('.program-explorer__count');
    const status = explorer.querySelector('.program-explorer__status');
    const previousButton = explorer.querySelector('.program-explorer__nav--prev');
    const nextButton = explorer.querySelector('.program-explorer__nav--next');
    const allLink = explorer.querySelector('.program-explorer__all');

    if (!result || !slider || !grid || !count || !status || !previousButton || !nextButton || !allLink) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const AUTOPLAY_DELAY = 5200;

    let programCount = 0;
    let currentIndex = 0;
    let autoplayTimer = null;
    let isAnimating = false;
    let isPointerInside = false;
    let isFocusInside = false;
    let requestController = null;

    function getSlideStep() {
        const firstCard = grid.querySelector('.card:not([data-carousel-clone="true"])');
        if (!firstCard) return 0;

        const styles = window.getComputedStyle(grid);
        const gap = Number.parseFloat(styles.columnGap || styles.gap) || 0;
        return firstCard.getBoundingClientRect().width + gap;
    }

    function setPosition(index, animate = true) {
        const step = getSlideStep();
        if (!step) return;

        grid.style.transition = animate ? '' : 'none';
        grid.style.transform = `translate3d(${-index * step}px, 0, 0)`;

        if (!animate) {
            grid.getBoundingClientRect();
            grid.style.transition = '';
        }
    }

    function stopAutoplay() {
        window.clearInterval(autoplayTimer);
        autoplayTimer = null;
    }

    function startAutoplay() {
        stopAutoplay();
        if (programCount <= 1 || reduceMotion.matches || isPointerInside || isFocusInside || document.hidden) return;

        autoplayTimer = window.setInterval(() => {
            moveNext();
        }, AUTOPLAY_DELAY);
    }

    function moveNext() {
        if (programCount <= 1 || isAnimating) return;

        if (reduceMotion.matches) {
            currentIndex = (currentIndex + 1) % programCount;
            setPosition(currentIndex, false);
            return;
        }

        isAnimating = true;
        currentIndex += 1;
        setPosition(currentIndex, true);
    }

    function movePrevious() {
        if (programCount <= 1 || isAnimating) return;

        if (reduceMotion.matches) {
            currentIndex = (currentIndex - 1 + programCount) % programCount;
            setPosition(currentIndex, false);
            return;
        }

        isAnimating = true;

        if (currentIndex === 0) {
            currentIndex = programCount;
            setPosition(currentIndex, false);
            currentIndex -= 1;
            window.requestAnimationFrame(() => setPosition(currentIndex, true));
            return;
        }

        currentIndex -= 1;
        setPosition(currentIndex, true);
    }

    function prepareCarousel() {
        const cards = [...grid.querySelectorAll('.card')];
        programCount = cards.length;
        currentIndex = 0;
        isAnimating = false;

        cards.forEach((card, index) => {
            card.setAttribute('aria-label', `${index + 1} / ${programCount}`);

            const clone = card.cloneNode(true);
            clone.dataset.carouselClone = 'true';
            clone.setAttribute('aria-hidden', 'true');
            clone.removeAttribute('aria-label');
            clone.querySelectorAll('a, button, input, select, textarea').forEach((element) => {
                element.tabIndex = -1;
            });
            grid.append(clone);
        });

        previousButton.disabled = programCount <= 1;
        nextButton.disabled = programCount <= 1;
        setPosition(0, false);
        startAutoplay();
    }

    function render(payload) {
        const total = Number(payload.youthCount) || 0;
        const html = typeof payload.youthHtml === 'string' ? payload.youthHtml : '';

        stopAutoplay();
        grid.innerHTML = html;
        count.innerHTML = `<strong>${total}</strong>개`;
        count.setAttribute('aria-label', `현재 접수 중인 프로그램 ${total}개`);
        status.hidden = total > 0;
        status.textContent = total > 0 ? '' : '현재 접수 중인 프로그램이 없습니다.';
        slider.hidden = total === 0;
        allLink.href = `${window.APP_BASE_URL || ''}/programs.php?status=ongoing`;

        if (total > 0) prepareCarousel();
        result.setAttribute('aria-busy', 'false');
    }

    async function fetchPrograms() {
        requestController?.abort();
        requestController = new AbortController();

        const base = window.APP_BASE_URL || '';
        result.setAttribute('aria-busy', 'true');
        status.hidden = false;
        status.textContent = '프로그램을 불러오는 중입니다.';
        slider.hidden = true;

        try {
            const response = await fetch(`${base}/api/recommend-programs.php`, {
                headers: { Accept: 'application/json', 'X-Requested-With': 'XMLHttpRequest' },
                signal: requestController.signal,
            });
            if (!response.ok) throw new Error(`HTTP ${response.status}`);

            render(await response.json());
        } catch (error) {
            if (error.name === 'AbortError') return;
            console.error('프로그램을 불러오지 못했습니다.', error);
            count.textContent = '오류';
            count.setAttribute('aria-label', '프로그램을 불러오지 못했습니다.');
            status.hidden = false;
            status.textContent = '잠시 후 다시 시도해주세요.';
            slider.hidden = true;
            grid.innerHTML = '';
        } finally {
            result.setAttribute('aria-busy', 'false');
        }
    }

    grid.addEventListener('transitionend', (event) => {
        if (event.propertyName !== 'transform') return;

        if (currentIndex >= programCount) {
            currentIndex = 0;
            setPosition(currentIndex, false);
        }

        isAnimating = false;
    });

    previousButton.addEventListener('click', () => {
        movePrevious();
        startAutoplay();
    });

    nextButton.addEventListener('click', () => {
        moveNext();
        startAutoplay();
    });

    slider.addEventListener('pointerenter', () => {
        isPointerInside = true;
        stopAutoplay();
    });

    slider.addEventListener('pointerleave', () => {
        isPointerInside = false;
        startAutoplay();
    });

    slider.addEventListener('focusin', () => {
        isFocusInside = true;
        stopAutoplay();
    });

    slider.addEventListener('focusout', (event) => {
        if (slider.contains(event.relatedTarget)) return;
        isFocusInside = false;
        startAutoplay();
    });

    reduceMotion.addEventListener('change', startAutoplay);
    document.addEventListener('visibilitychange', startAutoplay);
    window.addEventListener('resize', () => setPosition(currentIndex, false));

    fetchPrograms();
});

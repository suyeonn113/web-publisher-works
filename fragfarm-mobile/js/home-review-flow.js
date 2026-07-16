(function () {
    const reviewList = document.querySelector('.review__list');
    if (!reviewList) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const speed = 0.03;
    let frameId = 0;
    let lastTime = 0;
    let paused = false;
    let position = 0;

    const removeClones = () => {
        reviewList.classList.remove('is-auto-flowing');
        reviewList.querySelectorAll('[data-review-clone]').forEach((clone) => clone.remove());
        reviewList.scrollLeft = 0;
        position = 0;
    };

    const stop = () => {
        window.cancelAnimationFrame(frameId);
        frameId = 0;
        lastTime = 0;
    };

    const getLoopWidth = () => {
        const firstItem = reviewList.querySelector('.review__card:not([data-review-clone])');
        const firstClone = reviewList.querySelector('[data-review-clone]');

        if (!firstItem || !firstClone) return 0;
        return firstClone.offsetLeft - firstItem.offsetLeft;
    };

    const animate = (time) => {
        if (!lastTime) lastTime = time;
        const elapsed = Math.min(time - lastTime, 32);
        lastTime = time;

        if (!paused && !document.hidden) {
            const loopWidth = getLoopWidth();
            position += elapsed * speed;

            if (loopWidth > 0 && position >= loopWidth) {
                position -= loopWidth;
            }

            reviewList.scrollLeft = position;
        }

        frameId = window.requestAnimationFrame(animate);
    };

    const start = () => {
        stop();
        removeClones();

        if (reducedMotion.matches) return;

        const originalItems = Array.from(reviewList.children);
        if (originalItems.length < 2) return;

        originalItems.forEach((item) => {
            const clone = item.cloneNode(true);
            clone.dataset.reviewClone = '';
            clone.setAttribute('aria-hidden', 'true');
            clone.querySelectorAll('a, button').forEach((control) => control.setAttribute('tabindex', '-1'));
            reviewList.appendChild(clone);
        });

        reviewList.classList.add('is-auto-flowing');
        frameId = window.requestAnimationFrame(animate);
    };

    reviewList.addEventListener('pointerenter', () => { paused = true; });
    reviewList.addEventListener('pointerleave', () => {
        position = reviewList.scrollLeft;
        paused = false;
    });
    reviewList.addEventListener('focusin', () => { paused = true; });
    reviewList.addEventListener('focusout', (event) => {
        if (!reviewList.contains(event.relatedTarget)) {
            position = reviewList.scrollLeft;
            paused = false;
        }
    });

    reducedMotion.addEventListener('change', start);
    start();
}());

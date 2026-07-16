document.addEventListener('DOMContentLoaded', () => {
    initProductDetailThumbs();
    initSelectedProduct();
    initWishToggle();
    initReviewSummaryScroll();
    initReviewSection();
    initProductReviewPagination();
    initReviewWrite();
    initQnaSection();
    initPlaceholderActions();
    initFeedbackAnchor();
});

function initReviewSummaryScroll() {
    const reviewLink = document.querySelector('[data-review-summary-link]');
    const reviewTitle = document.getElementById('review-title');

    if (!reviewLink || !reviewTitle) return;

    reviewLink.addEventListener('click', (event) => {
        event.preventDefault();
        const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        reviewTitle.scrollIntoView({
            behavior: reduceMotion ? 'auto' : 'smooth',
            block: 'start',
        });
    });
}

function initFeedbackAnchor() {
    if (!window.location.hash) return;

    let target;
    try {
        target = document.getElementById(decodeURIComponent(window.location.hash.slice(1)));
    } catch (error) {
        return;
    }
    if (!target || (!target.classList.contains('review-item') && !target.classList.contains('product-qna-item'))) return;

    const parentDetails = target.closest('details');
    if (parentDetails) parentDetails.open = true;
    if (target.classList.contains('review-item')) target.open = true;

    window.requestAnimationFrame(() => target.scrollIntoView({ block: 'start' }));
}

function initProductDetailThumbs() {
    const mainImage = document.querySelector('#product-main-image');
    const thumbs = Array.from(document.querySelectorAll('.product-detail__thumb'));

    if (!mainImage || thumbs.length === 0) return;

    let currentIndex = thumbs.findIndex((thumb) => thumb.classList.contains('is-current'));
    let swipeStartX = 0;
    let swipeStartY = 0;

    if (currentIndex < 0) {
        currentIndex = 0;
    }

    const renderImage = (index) => {
        const nextIndex = (index + thumbs.length) % thumbs.length;
        const nextThumb = thumbs[nextIndex];
        const nextSrc = nextThumb.dataset.imageSrc;
        const nextAlt = nextThumb.dataset.imageAlt || '';

        if (!nextSrc) return;

        currentIndex = nextIndex;
        mainImage.src = nextSrc;
        mainImage.alt = nextAlt;

        thumbs.forEach((item, itemIndex) => {
            const isCurrent = itemIndex === currentIndex;
            item.classList.toggle('is-current', isCurrent);
            item.setAttribute('aria-current', String(isCurrent));
        });

        nextThumb.scrollIntoView({
            behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
            block: 'nearest',
            inline: 'center',
        });
    };

    thumbs.forEach((thumb, index) => {
        thumb.addEventListener('click', () => {
            renderImage(index);
        });

        thumb.addEventListener('keydown', (event) => {
            if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;

            event.preventDefault();
            let nextIndex = index;
            if (event.key === 'ArrowLeft') nextIndex = (index - 1 + thumbs.length) % thumbs.length;
            if (event.key === 'ArrowRight') nextIndex = (index + 1) % thumbs.length;
            if (event.key === 'Home') nextIndex = 0;
            if (event.key === 'End') nextIndex = thumbs.length - 1;

            renderImage(nextIndex);
            thumbs[nextIndex].focus();
        });
    });

    mainImage.addEventListener('pointerdown', (event) => {
        swipeStartX = event.clientX;
        swipeStartY = event.clientY;
    });

    mainImage.addEventListener('pointerup', (event) => {
        const deltaX = event.clientX - swipeStartX;
        const deltaY = event.clientY - swipeStartY;

        if (Math.abs(deltaX) < 40 || Math.abs(deltaX) < Math.abs(deltaY)) return;

        renderImage(currentIndex + (deltaX < 0 ? 1 : -1));
    });
}

function initPlaceholderActions() {
    const buttons = document.querySelectorAll('[data-placeholder="true"]');

    buttons.forEach((button) => {
        button.addEventListener('click', (event) => {
            event.preventDefault();
            showProductToast(button.dataset.toastMessage || getPlaceholderMessage(button));
        });
    });
}

function initSelectedProduct() {
    const orderForm = document.querySelector('.product-detail__order');
    const selectedProduct = document.querySelector('[data-selected-product]');

    if (!orderForm || !selectedProduct) return;

    const sizeInputs = orderForm.querySelectorAll('input[name="size"]');
    const selectedName = selectedProduct.querySelector('[data-selected-name]');
    const selectedQty = selectedProduct.querySelector('[data-selected-qty]');
    const selectedPrice = selectedProduct.querySelector('[data-selected-price]');
    const removeButton = selectedProduct.querySelector('[data-selected-remove]');
    const qtyButtons = selectedProduct.querySelectorAll('[data-qty-action]');
    const productName = selectedProduct.dataset.productName || '';
    const unitPrice = Number(selectedProduct.dataset.unitPrice || 0);
    let quantity = 1;

    const { formatPrice } = window.FragfarmUtils;

    const updateQuantity = () => {
        if (selectedQty) {
            selectedQty.textContent = String(quantity);
        }

        if (selectedPrice) {
            selectedPrice.textContent = formatPrice(unitPrice * quantity);
        }
    };

    const renderSelectedProduct = (size) => {
        quantity = 1;
        selectedProduct.hidden = false;

        if (selectedName) {
            selectedName.textContent = `${productName} (${size})`;
        }

        updateQuantity();
    };

    const clearSelectedProduct = () => {
        quantity = 1;
        selectedProduct.hidden = true;

        sizeInputs.forEach((input) => {
            input.checked = false;
            input.dataset.wasChecked = 'false';
        });

        updateQuantity();
    };

    sizeInputs.forEach((input) => {
        input.addEventListener('click', () => {
            const isAlreadyChecked = input.dataset.wasChecked === 'true';

            sizeInputs.forEach((item) => {
                item.dataset.wasChecked = 'false';
            });

            if (isAlreadyChecked) {
                input.checked = false;
                clearSelectedProduct();
                return;
            }

            input.checked = true;
            input.dataset.wasChecked = 'true';

            renderSelectedProduct(input.value);
        });
    });

    qtyButtons.forEach((button) => {
        button.addEventListener('click', () => {
            const action = button.dataset.qtyAction;

            if (action === 'increase') {
                quantity += 1;
            }

            if (action === 'decrease') {
                quantity = Math.max(1, quantity - 1);
            }

            updateQuantity();
        });
    });

    removeButton?.addEventListener('click', clearSelectedProduct);
}

function initWishToggle() {
    const wishButton = document.querySelector('[data-wish-toggle]');

    if (!wishButton) return;

    wishButton.addEventListener('click', (event) => {
        event.preventDefault();

        const isActive = wishButton.getAttribute('aria-pressed') === 'true';
        const nextState = !isActive;

        wishButton.setAttribute('aria-pressed', String(nextState));
        wishButton.setAttribute('aria-label', nextState ? '위시리스트에서 제거' : '위시리스트 추가');
        showProductToast(wishButton.dataset.toastMessage || '준비중입니다.');
    });
}

function initReviewSection() {
    const deleteButtons = document.querySelectorAll('[data-comment-delete]');
    const loginRequiredControls = document.querySelectorAll('[data-login-required]');

    deleteButtons.forEach((button) => {
        button.addEventListener('click', () => {
            button.closest('.review-comment')?.remove();
        });
    });

    loginRequiredControls.forEach((control) => {
        control.addEventListener('click', (event) => {
            event.preventDefault();
            showProductToast(control.dataset.toastMessage || '로그인 후 이용해주세요.');
        });
    });
}

function initProductReviewPagination() {
    const list = document.querySelector('.review-list');
    const pagination = document.querySelector('[data-product-review-pagination]');

    if (!list || !pagination) return;

    const reviewsPerPage = 5;
    let currentPage = 1;

    const pageFromHash = () => {
        if (!window.location.hash) return 1;

        const targetId = decodeURIComponent(window.location.hash.slice(1));
        const items = Array.from(list.querySelectorAll(':scope > .review-item'));
        const targetIndex = items.findIndex((item) => item.id === targetId);

        return targetIndex >= 0 ? Math.floor(targetIndex / reviewsPerPage) + 1 : 1;
    };

    const pageControl = (page, label, className = '') => `
        <a class="${className}" href="#review-title" data-product-review-page="${page}">
            ${label}
        </a>
    `;

    const disabledControl = (label) => `
        <span class="pagination__disabled" aria-disabled="true">${label}</span>
    `;

    const render = () => {
        const items = Array.from(list.querySelectorAll(':scope > .review-item'));
        const totalPages = Math.max(1, Math.ceil(items.length / reviewsPerPage));
        currentPage = Math.min(Math.max(1, currentPage), totalPages);

        items.forEach((item, index) => {
            const itemPage = Math.floor(index / reviewsPerPage) + 1;
            item.hidden = itemPage !== currentPage;
            if (item.hidden) item.open = false;
        });

        if (totalPages <= 1) {
            pagination.hidden = true;
            pagination.innerHTML = '';
            return;
        }

        const iconBase = window.FRAGFARM_BASE_URL || '';
        const firstIcon = `<img src="${iconBase}/assets/icons/double-arrow-left.svg" alt=""><span class="visually-hidden">첫 후기 페이지로 이동</span>`;
        const lastIcon = `<img class="icon-rotate-180" src="${iconBase}/assets/icons/double-arrow-left.svg" alt=""><span class="visually-hidden">마지막 후기 페이지로 이동</span>`;
        let startPage = Math.max(1, currentPage - 2);
        let endPage = Math.min(totalPages, startPage + 4);
        startPage = Math.max(1, endPage - 4);
        const numberLinks = [];

        for (let page = startPage; page <= endPage; page += 1) {
            numberLinks.push(`
                <a href="#review-title" data-product-review-page="${page}" ${page === currentPage ? 'aria-current="page"' : ''}>
                    ${page}
                </a>
            `);
        }

        pagination.hidden = false;
        pagination.innerHTML = [
            currentPage > 1
                ? pageControl(1, firstIcon, 'pagination__btn')
                : disabledControl(firstIcon),
            ...numberLinks,
            currentPage < totalPages
                ? pageControl(totalPages, lastIcon, 'pagination__btn')
                : disabledControl(lastIcon),
        ].join('');
    };

    pagination.addEventListener('click', (event) => {
        const control = event.target.closest('[data-product-review-page]');
        if (!control) return;

        event.preventDefault();
        currentPage = Number(control.dataset.productReviewPage || 1);
        render();
        document.getElementById('review-title')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });

    document.addEventListener('product-reviews:updated', () => {
        currentPage = 1;
        render();
    });

    currentPage = pageFromHash();
    render();
}

function initReviewWrite() {
    const reviewForm = document.querySelector('[data-review-write]');

    if (!reviewForm) return;

    const panel = reviewForm.querySelector('[data-review-write-panel]');
    const toggleButton = reviewForm.querySelector('[data-review-write-toggle]');
    const isLoggedOut = reviewForm.querySelector('[data-login-required]') !== null;

    if (!isLoggedOut && panel && toggleButton) {
        const textarea = reviewForm.querySelector('textarea[name="review"]');
        const ratingInputs = Array.from(reviewForm.querySelectorAll('input[name="rating"]'));
        const ratingLabels = Array.from(reviewForm.querySelectorAll('.review-write__rating label'));
        const photoReviewToast = reviewForm.querySelector('[data-photo-review-toast]');
        let photoReviewToastTimer;
        const hasInput = () => Boolean(textarea?.value.trim() || ratingInputs.some((input) => input.checked));

        const showPhotoReviewToast = () => {
            if (!photoReviewToast) return;

            window.clearTimeout(photoReviewToastTimer);
            photoReviewToast.hidden = false;
            photoReviewToastTimer = window.setTimeout(() => {
                photoReviewToast.hidden = true;
            }, 3000);
        };

        const renderButton = () => {
            const isOpen = !panel.hidden;
            const isReady = isOpen && hasInput();

            toggleButton.textContent = !isOpen ? '리뷰쓰기' : isReady ? '등록하기' : '닫기';
            toggleButton.classList.toggle('is-active', isReady);
            toggleButton.setAttribute('aria-expanded', String(isOpen));
        };

        ratingLabels.forEach((label) => {
            const input = document.getElementById(label.htmlFor);

            if (!input) return;

            label.addEventListener('click', (event) => {
                if (input.disabled) return;

                event.preventDefault();
                input.checked = !input.checked;
                input.dispatchEvent(new Event('change', { bubbles: true }));
            });

            input.addEventListener('keydown', (event) => {
                if (['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(event.key)) {
                    event.preventDefault();

                    const direction = event.key === 'ArrowRight' || event.key === 'ArrowDown' ? 1 : -1;
                    const currentValue = Number(input.value);
                    const nextValue = ((currentValue - 1 + direction + 5) % 5) + 1;
                    const nextInput = ratingInputs.find((ratingInput) => Number(ratingInput.value) === nextValue);

                    if (nextInput) {
                        nextInput.checked = true;
                        nextInput.focus();
                        nextInput.dispatchEvent(new Event('change', { bubbles: true }));
                    }
                    return;
                }

                if (event.key === 'Enter') {
                    event.preventDefault();
                    input.checked = !input.checked;
                    input.dispatchEvent(new Event('change', { bubbles: true }));
                    return;
                }

                if (event.key === ' ' && input.checked) {
                    event.preventDefault();
                    input.checked = false;
                    input.dispatchEvent(new Event('change', { bubbles: true }));
                }
            });
        });

        textarea?.addEventListener('input', renderButton);
        ratingInputs.forEach((input) => input.addEventListener('change', renderButton));
        reviewForm.addEventListener('reset', () => window.requestAnimationFrame(renderButton));

        toggleButton.addEventListener('click', (event) => {
            event.preventDefault();

            if (panel.hidden) {
                panel.hidden = false;
                renderButton();
                showPhotoReviewToast();
                textarea?.focus();
                return;
            }

            if (hasInput()) {
                reviewForm.requestSubmit();
                return;
            }

            panel.hidden = true;
            renderButton();
        });

        renderButton();

        return;
    }

    reviewForm.addEventListener('click', (event) => {
        event.preventDefault();
        event.stopImmediatePropagation();
        showProductToast('로그인 후 이용해주세요.');
    }, true);
}

function initQnaSection() {
    const qnaForm = document.querySelector('.qna-form');

    if (!qnaForm) return;

    const isLoggedOut = document.querySelector('[data-login-required]') !== null;
    if (!isLoggedOut) return;
    const controls = qnaForm.querySelectorAll('textarea, button');

    controls.forEach((control) => {
        control.addEventListener('click', (event) => {
            event.preventDefault();
            event.stopImmediatePropagation();

            showProductToast(isLoggedOut ? '로그인 후 이용해주세요.' : '상품 문의를 남겨주세요.');
        });
    });
}

function getPlaceholderMessage(control) {
    if (control.closest('[data-review-write]')) {
        return '후기를 남겨주세요.';
    }

    if (control.closest('.review-comment-form')) {
        return '댓글을 작성해주세요.';
    }

    if (control.closest('.qna-form')) {
        return '상품 문의를 남겨주세요.';
    }

    return '준비중입니다.';
}

let productToastTimer;

function showProductToast(message) {
    const toast = getProductToast();

    if (!toast) return;

    window.clearTimeout(productToastTimer);
    toast.textContent = message;
    toast.hidden = false;

    productToastTimer = window.setTimeout(() => {
        toast.hidden = true;
    }, 1800);
}

function getProductToast() {
    const existingToast = document.querySelector('[data-product-toast]');

    if (existingToast) return existingToast;

    const toast = document.createElement('p');
    toast.className = 'product-toast';
    toast.dataset.productToast = '';
    toast.setAttribute('role', 'status');
    toast.setAttribute('aria-live', 'polite');
    toast.hidden = true;

    document.querySelector('.mobile-shell')?.appendChild(toast);

    return toast;
}

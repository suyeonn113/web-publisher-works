document.addEventListener('DOMContentLoaded', () => {
    initProductDetailThumbs();
    initSelectedProduct();
    initWishToggle();
    initFeedbackTabs();
    initReviewSection();
    initProductReviewList();
    initReviewMedia();
    initReviewImageModal();
    initReviewWrite();
    initQnaSection();
    initPlaceholderActions();
    initFeedbackAnchor();
});

function selectFeedbackTab(tabName, moveFocus = false) {
    const tabs = Array.from(document.querySelectorAll('[data-feedback-tab]'));
    const panels = Array.from(document.querySelectorAll('[data-feedback-panel]'));
    const selectedTab = tabs.find((tab) => tab.dataset.feedbackTab === tabName);

    if (!selectedTab) return;

    tabs.forEach((tab) => {
        const isSelected = tab === selectedTab;
        tab.setAttribute('aria-selected', String(isSelected));
        tab.tabIndex = isSelected ? 0 : -1;
    });

    panels.forEach((panel) => {
        panel.hidden = panel.dataset.feedbackPanel !== tabName;
    });

    if (moveFocus) selectedTab.focus();
}

function initFeedbackTabs() {
    const tabs = Array.from(document.querySelectorAll('[data-feedback-tab]'));

    tabs.forEach((tab, index) => {
        tab.addEventListener('click', () => selectFeedbackTab(tab.dataset.feedbackTab));
        tab.addEventListener('keydown', (event) => {
            if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;

            event.preventDefault();
            const direction = event.key === 'ArrowRight' ? 1 : -1;
            const nextIndex = (index + direction + tabs.length) % tabs.length;
            selectFeedbackTab(tabs[nextIndex].dataset.feedbackTab, true);
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

    const feedbackPanel = target.closest('[data-feedback-panel]');
    if (feedbackPanel) selectFeedbackTab(feedbackPanel.dataset.feedbackPanel);

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

function initProductReviewList() {
    const list = document.querySelector('[data-review-list]');
    const sort = document.querySelector('[data-review-sort]');
    const photoFilter = document.querySelector('[data-review-photo-filter]');
    const pagination = document.querySelector('[data-review-pagination]');

    if (!list || !sort || !photoFilter || !pagination) return;

    const pageSize = 16;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const initialOrder = new WeakMap();
    let nextOrder = 0;
    let currentPage = 1;
    let revealObserver = null;

    const collectItems = () => {
        const items = Array.from(list.querySelectorAll('[data-review-item]'));

        items.forEach((item) => {
            if (!initialOrder.has(item)) {
                initialOrder.set(item, nextOrder);
                nextOrder += 1;
            }
        });

        return items;
    };

    const compareByLatest = (left, right) => {
        const timestampDifference = Number(right.dataset.reviewTimestamp || 0) - Number(left.dataset.reviewTimestamp || 0);
        return timestampDifference || initialOrder.get(left) - initialOrder.get(right);
    };

    const getSortedItems = (items) => items.filter((item) => (
        !photoFilter.checked || item.dataset.reviewHasPhoto === 'true'
    )).sort((left, right) => {
        const scoreDifference = Number(right.dataset.reviewScoreValue || 0) - Number(left.dataset.reviewScoreValue || 0);

        if (sort.value === 'rating-desc') return scoreDifference || compareByLatest(left, right);
        if (sort.value === 'rating-asc') return -scoreDifference || compareByLatest(left, right);
        return compareByLatest(left, right);
    });

    const revealItems = (items) => {
        revealObserver?.disconnect();
        items.forEach((item) => item.classList.remove('is-revealed'));

        if (reducedMotion.matches || !('IntersectionObserver' in window)) {
            list.classList.remove('is-scroll-reveal-ready');
            items.forEach((item) => item.classList.add('is-revealed'));
            return;
        }

        list.classList.add('is-scroll-reveal-ready');
        revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;
                entry.target.classList.add('is-revealed');
                observer.unobserve(entry.target);
            });
        }, {
            threshold: .08,
            rootMargin: '0px 0px -8% 0px',
        });
        items.forEach((item) => revealObserver.observe(item));
    };

    const createPageButton = (label, page, options = {}) => {
        const button = document.createElement('button');
        button.type = 'button';
        button.textContent = label;
        button.setAttribute('aria-label', options.ariaLabel || `${page}페이지`);

        if (options.control) button.classList.add('pagination__btn');
        if (page === currentPage) button.setAttribute('aria-current', 'page');

        button.addEventListener('click', () => {
            if (page === currentPage) return;
            currentPage = page;
            render();
            document.querySelector('.review-head')?.scrollIntoView({
                behavior: reducedMotion.matches ? 'auto' : 'smooth',
                block: 'start',
            });
        });

        return button;
    };

    const renderPagination = (pageCount) => {
        pagination.replaceChildren();
        pagination.hidden = pageCount <= 1;
        if (pageCount <= 1) return;

        const start = Math.max(1, Math.min(currentPage - 2, pageCount - 4));
        const end = Math.min(pageCount, start + 4);

        if (currentPage > 1) {
            pagination.append(createPageButton('«', 1, { control: true, ariaLabel: '첫 페이지로 이동' }));
        }

        for (let page = start; page <= end; page += 1) {
            pagination.append(createPageButton(String(page), page));
        }

        if (currentPage < pageCount) {
            pagination.append(createPageButton('»', pageCount, { control: true, ariaLabel: '마지막 페이지로 이동' }));
        }
    };

    function render(options = {}) {
        const allItems = collectItems();
        const items = getSortedItems(allItems);
        const pageCount = Math.max(1, Math.ceil(items.length / pageSize));

        if (options.resetPage) currentPage = 1;
        currentPage = Math.min(currentPage, pageCount);

        const hashId = window.location.hash ? decodeURIComponent(window.location.hash.slice(1)) : '';
        const hashIndex = hashId ? items.findIndex((item) => item.id === hashId) : -1;
        if (options.followHash && hashIndex >= 0) currentPage = Math.floor(hashIndex / pageSize) + 1;

        items.forEach((item) => list.append(item));
        const pageStart = (currentPage - 1) * pageSize;
        const visibleItems = items.slice(pageStart, pageStart + pageSize);
        const visibleSet = new Set(visibleItems);

        allItems.forEach((item) => {
            item.hidden = !visibleSet.has(item);
        });

        renderPagination(pageCount);
        revealItems(visibleItems);
    }

    sort.addEventListener('change', () => render({ resetPage: true }));
    photoFilter.addEventListener('change', () => render({ resetPage: true }));
    reducedMotion.addEventListener?.('change', () => render());
    window.refreshProductReviewList = (options = {}) => render(options);
    render({ followHash: true });
}

function initReviewMedia() {
    const previews = Array.from(document.querySelectorAll('[data-review-media-preview]'));

    if (previews.length === 0) return;

    const updateOverflowState = () => {
        previews.forEach((preview) => {
            const track = preview.querySelector('[data-review-media-preview-track]');
            if (!track) return;

            preview.classList.toggle('is-overflowing', track.scrollWidth > preview.clientWidth + 1);
        });
    };

    previews.forEach((preview) => {
        preview.querySelectorAll('img').forEach((image) => {
            if (!image.complete) image.addEventListener('load', updateOverflowState, { once: true });
        });
    });

    window.addEventListener('resize', updateOverflowState);
    window.requestAnimationFrame(updateOverflowState);
}

function initReviewImageModal() {
    const modal = document.querySelector('[data-review-modal]');

    if (!modal) return;

    const modalImage = modal.querySelector('[data-review-modal-image]');
    const dialog = modal.querySelector('[role="dialog"]');
    const closeButton = modal.querySelector('.review-image-modal__close');
    const closeButtons = modal.querySelectorAll('[data-review-modal-close]');
    let lastFocused = null;

    const closeModal = () => {
        if (modal.hidden) return;

        modal.hidden = true;
        modalImage.removeAttribute('src');
        document.body.classList.remove('is-review-image-modal-open');
        lastFocused?.focus();
    };

    document.addEventListener('click', (event) => {
        const imageButton = event.target.closest('[data-review-image]');
        if (!imageButton) return;

        const src = imageButton.dataset.reviewImage;
        if (!src) return;

        lastFocused = imageButton;
        modalImage.src = src;
        modal.hidden = false;
        document.body.classList.add('is-review-image-modal-open');
        closeButton.focus();
    });

    closeButtons.forEach((button) => button.addEventListener('click', closeModal));

    document.addEventListener('keydown', (event) => {
        if (modal.hidden) return;

        if (event.key === 'Escape') {
            closeModal();
            return;
        }

        window.FragfarmA11y?.trapFocus(dialog, event);
    });
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
        const hasInput = () => Boolean(textarea?.value.trim() || ratingInputs.some((input) => input.checked));

        const renderButton = () => {
            const isOpen = !panel.hidden;
            const isReady = isOpen && hasInput();

            toggleButton.textContent = !isOpen ? '후기 작성하기' : isReady ? '등록하기' : '닫기';
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

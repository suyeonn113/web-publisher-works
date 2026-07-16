(function () {
    const {
        CART_KEY,
        SHIPPING_FEE,
        SHIPPING_THRESHOLD,
        WISHLIST_KEY,
        WISHLIST_PER_PAGE,
        normalizeItem,
        readItems,
        sampleData,
        writeItems,
    } = window.FragfarmShop;
    const { escapeHtml, formatPrice } = window.FragfarmUtils;
    const openCartOptions = (...args) => window.FragfarmShop.openCartOptions?.(...args);

const renderCart = () => {
    const list = document.querySelector('[data-cart-list]');
    if (!list) return;

    let items = readItems(CART_KEY, sampleData.cart || []).map(normalizeItem);
    const empty = document.querySelector('[data-cart-empty]');
    const checkAll = document.querySelector('[data-cart-check-all]');

    const draw = () => {
        list.innerHTML = items.map((item, index) => `
            <li class="bag-item">
                <a class="bag-item__image" href="product-detail.php?id=${encodeURIComponent(item.id)}" aria-label="${escapeHtml(item.name)} 상품 보기">
                    <img src="${window.FRAGFARM_BASE_URL || ''}${item.image}" alt="${escapeHtml(item.name)}">
                </a>
                <div class="bag-item__body">
                    <h3 class="bag-item__name">${escapeHtml(item.name)}</h3>
                    <p class="bag-item__option">${item.option || `SIZE: ${item.size}`}</p>
                    <div class="bag-item__cart-row">
                        <div class="bag-item__qty">
                            <button type="button" data-cart-decrease="${index}" aria-label="${escapeHtml(item.name)} 수량 감소"><img src="${window.FRAGFARM_BASE_URL || ''}/assets/icons/arrow-left.svg" alt=""></button>
                            <span>${item.quantity}</span>
                            <button type="button" data-cart-increase="${index}" aria-label="${escapeHtml(item.name)} 수량 증가"><img class="icon-rotate-180" src="${window.FRAGFARM_BASE_URL || ''}/assets/icons/arrow-left.svg" alt=""></button>
                        </div>
                        <p class="bag-item__price">${priceHtml(item, item.quantity)}</p>
                        <button class="bag-item__remove" type="button" data-cart-remove="${index}" aria-label="${escapeHtml(item.name)} 삭제"><img src="${window.FRAGFARM_BASE_URL || ''}/assets/icons/close.svg" alt=""></button>
                    </div>
                </div>
                <label class="check-box bag-item__check">
                    <input class="check-box__input" type="checkbox" data-cart-select="${index}" aria-label="${escapeHtml(item.name)} 선택" ${item.selected ? 'checked' : ''}>
                </label>
            </li>
        `).join('');

        list.classList.toggle('is-empty', items.length === 0);

        if (empty) empty.hidden = items.length > 0;
        updateSummary(items);
        bindCartEvents();
    };

    const bindCartEvents = () => {
        list.querySelectorAll('[data-cart-increase]').forEach((button) => {
            button.addEventListener('click', () => {
                items[Number(button.dataset.cartIncrease)].quantity += 1;
                writeItems(CART_KEY, items);
                draw();
            });
        });

        list.querySelectorAll('[data-cart-decrease]').forEach((button) => {
            button.addEventListener('click', () => {
                const item = items[Number(button.dataset.cartDecrease)];
                item.quantity = Math.max(1, item.quantity - 1);
                writeItems(CART_KEY, items);
                draw();
            });
        });

        list.querySelectorAll('[data-cart-remove]').forEach((button) => {
            button.addEventListener('click', () => {
                items.splice(Number(button.dataset.cartRemove), 1);
                writeItems(CART_KEY, items);
                draw();
            });
        });

        list.querySelectorAll('[data-cart-select]').forEach((input) => {
            input.addEventListener('change', () => {
                items[Number(input.dataset.cartSelect)].selected = input.checked;
                writeItems(CART_KEY, items);
                draw();
            });
        });
    };

    checkAll?.addEventListener('change', () => {
        items = items.map((item) => ({ ...item, selected: checkAll.checked }));
        writeItems(CART_KEY, items);
        draw();
    });

    draw();
};

const initShippingInfo = () => {
    const button = document.querySelector('[data-shipping-info]');
    const tooltip = document.querySelector('[data-shipping-tooltip]');
    if (!button || !tooltip) return;

    const close = () => {
        tooltip.hidden = true;
        button.setAttribute('aria-expanded', 'false');
    };

    button.addEventListener('click', (event) => {
        event.stopPropagation();
        const shouldOpen = tooltip.hidden;
        tooltip.hidden = !shouldOpen;
        button.setAttribute('aria-expanded', String(shouldOpen));
    });

    tooltip.addEventListener('click', (event) => event.stopPropagation());
    document.addEventListener('click', close);
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && !tooltip.hidden) {
            close();
            button.focus();
        }
    });
};

const updateSummary = (items) => {
    const selected = items.filter((item) => item.selected);
    const original = selected.reduce((sum, item) => sum + item.originalPrice * item.quantity, 0);
    const sale = selected.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const discount = Math.max(0, original - sale);
    const shipping = sale === 0 || sale >= SHIPPING_THRESHOLD ? 0 : SHIPPING_FEE;

    setText('[data-cart-subtotal]', formatPrice(original));
    setText('[data-cart-discount]', formatPrice(discount));
    setText('[data-cart-shipping]', formatPrice(shipping));
    setText('[data-cart-total]', formatPrice(sale + shipping));
};

const renderWishlist = () => {
    const list = document.querySelector('[data-wishlist-list]');
    if (!list) return;

    const pageRoot = document.querySelector('[data-wishlist-page]');
    const requestedPage = Number(pageRoot?.dataset.wishlistPage || 1);
    const sortSelect = document.querySelector('[data-wishlist-sort]');
    const sort = sortSelect?.value || 'latest';
    const storedItems = readItems(WISHLIST_KEY, sampleData.wishlist || []).map(normalizeItem);
    const allItems = sort === 'oldest' ? [...storedItems].reverse() : storedItems;
    const totalPages = Math.max(1, Math.ceil(allItems.length / WISHLIST_PER_PAGE));
    const page = Math.min(Math.max(1, requestedPage), totalPages);
    const items = allItems.slice((page - 1) * WISHLIST_PER_PAGE, page * WISHLIST_PER_PAGE);
    const empty = document.querySelector('[data-wishlist-empty]');

    list.innerHTML = items.map((item) => `
        <li class="bag-item">
            <a class="bag-item__image" href="product-detail.php?id=${encodeURIComponent(item.id)}" aria-label="${escapeHtml(item.name)} 상품 보기">
                <img src="${window.FRAGFARM_BASE_URL || ''}${item.image}" alt="${escapeHtml(item.name)}">
            </a>
            <div class="bag-item__body">
                <h3 class="bag-item__name">${escapeHtml(item.name)}</h3>
                <p class="bag-item__option">${item.option || `SIZE: ${item.size}`}</p>
                <p class="bag-item__price">${formatPrice(item.price)}</p>
                <button class="bag-item__cart-add" type="button" data-wishlist-cart="${item.id}" aria-haspopup="dialog">장바구니에 담기</button>
            </div>
            <button class="bag-item__heart" type="button" data-wishlist-remove="${item.id}" aria-label="찜 해제">
                <svg viewBox="0 0 14 12" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
                    <path d="M6.80457 11.0151L1.4575 6.17174C-1.44851 3.26572 2.82333 -2.31382 6.80457 2.20019C10.7858 -2.31382 15.0383 3.2851 12.1516 6.17174L6.80457 11.0151Z"/>
                </svg>
            </button>
        </li>
    `).join('');

    list.classList.toggle('is-empty', allItems.length === 0);

    if (empty) empty.hidden = allItems.length > 0;
    renderWishlistPagination(page, totalPages);

    sortSelect?.addEventListener('change', renderWishlist, { once: true });

    list.querySelectorAll('[data-wishlist-remove]').forEach((button) => {
        button.addEventListener('click', () => {
            const nextItems = storedItems.filter((item) => item.id !== button.dataset.wishlistRemove);
            writeItems(WISHLIST_KEY, nextItems);
            renderWishlist();
        });
    });

    list.querySelectorAll('[data-wishlist-cart]').forEach((button) => {
        button.addEventListener('click', () => {
            const item = storedItems.find((wishItem) => wishItem.id === button.dataset.wishlistCart);
            if (item) openCartOptions(item, button);
        });
    });
};

const renderWishlistPagination = (currentPage, totalPages) => {
    const pagination = document.querySelector('[data-wishlist-pagination]');

    if (!pagination) return;

    if (totalPages <= 1) {
        pagination.hidden = true;
        pagination.innerHTML = '';
        return;
    }

    const pageLink = (page, label = page, className = '') => {
        const safePage = Math.min(Math.max(1, page), totalPages);
        const current = safePage === currentPage && String(label) === String(page);

        return `
            <a class="${className}" href="?page=${safePage}" ${current ? 'aria-current="page"' : ''}>
                ${label}
            </a>
        `;
    };

    pagination.hidden = false;
    pagination.innerHTML = [
        currentPage > 1
            ? pageLink(1, `<img src="${window.FRAGFARM_BASE_URL || ''}/assets/icons/double-arrow-left.svg" alt=""><span class="visually-hidden">첫 페이지로 이동</span>`, 'pagination__btn')
            : `<span class="pagination__disabled" aria-disabled="true"><img src="${window.FRAGFARM_BASE_URL || ''}/assets/icons/double-arrow-left.svg" alt=""><span class="visually-hidden">현재 첫 페이지</span></span>`,
        ...Array.from({ length: totalPages }, (_, index) => pageLink(index + 1)),
        currentPage < totalPages
            ? pageLink(totalPages, `<img class="icon-rotate-180" src="${window.FRAGFARM_BASE_URL || ''}/assets/icons/double-arrow-left.svg" alt=""><span class="visually-hidden">마지막 페이지로 이동</span>`, 'pagination__btn')
            : `<span class="pagination__disabled" aria-disabled="true"><img class="icon-rotate-180" src="${window.FRAGFARM_BASE_URL || ''}/assets/icons/double-arrow-left.svg" alt=""><span class="visually-hidden">현재 마지막 페이지</span></span>`,
    ].join('');
};

const priceHtml = (item, quantity = 1) => {
    const original = item.originalPrice * quantity;
    const sale = item.price * quantity;

    if (item.discount > 0) {
        return `<span class="bag-item__discount">${item.discount}%</span> <span class="bag-item__original">${formatPrice(original)}</span> <strong>${formatPrice(sale)}</strong>`;
    }

    return `<strong>${formatPrice(sale)}</strong>`;
};

const setText = (selector, text) => {
    const element = document.querySelector(selector);
    if (element) element.textContent = text;
};


    document.addEventListener('DOMContentLoaded', () => {
        initShippingInfo();
        renderCart();
        renderWishlist();
    });
}());

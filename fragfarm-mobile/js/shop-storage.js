(function () {
    const CART_KEY = 'fragfarm_cart';
    const WISHLIST_KEY = 'fragfarm_wishlist';
    const SHIPPING_THRESHOLD = 70000;
    const SHIPPING_FEE = 3000;
    const WISHLIST_PER_PAGE = 8;

    const parseJson = (value, fallback) => {
        try {
            return JSON.parse(value) || fallback;
        } catch (error) {
            return fallback;
        }
    };

    const sampleData = parseJson(document.querySelector('#shop-sample-data')?.textContent || '{}', {});
    const formatPrice = (value) => `${Number(value || 0).toLocaleString('ko-KR')}원`;

    const readItems = (key, fallback = []) => {
        const stored = parseJson(window.localStorage.getItem(key), null);

        if (Array.isArray(stored)) {
            return stored;
        }

        window.localStorage.setItem(key, JSON.stringify(fallback));
        return fallback;
    };

    const writeItems = (key, items) => {
        window.localStorage.setItem(key, JSON.stringify(items));
        updateHeaderCounts();
    };

    const normalizeItem = (item) => ({
        id: item.id,
        name: item.name,
        price: Number(item.price || 0),
        originalPrice: Number(item.originalPrice || item.price || 0),
        discount: Number(item.discount || 0),
        image: item.image || '',
        size: item.size || 'S',
        option: item.option || '',
        quantity: Math.max(1, Number(item.quantity || 1)),
        selected: item.selected !== false,
    });

    const addToCart = (item) => {
        const items = readItems(CART_KEY, sampleData.cart || []).map(normalizeItem);
        const nextItem = normalizeItem(item);
        const existing = items.find((cartItem) => cartItem.id === nextItem.id && cartItem.size === nextItem.size && cartItem.option === nextItem.option);

        if (existing) {
            existing.quantity += nextItem.quantity;
            existing.selected = true;
        } else {
            items.push(nextItem);
        }

        writeItems(CART_KEY, items);
        showToast('장바구니에 담겼습니다.');
    };

    const toggleWishlist = (item, button) => {
        const items = readItems(WISHLIST_KEY, sampleData.wishlist || []).map(normalizeItem);
        const nextItem = normalizeItem(item);
        const index = items.findIndex((wishItem) => wishItem.id === nextItem.id);
        const shouldAdd = index < 0;

        if (shouldAdd) {
            items.unshift(nextItem);
        } else {
            items.splice(index, 1);
        }

        writeItems(WISHLIST_KEY, items);

        if (button) {
            button.setAttribute('aria-pressed', String(shouldAdd));
            button.setAttribute('aria-label', shouldAdd ? '위시리스트에서 제거' : '위시리스트에 추가');
        }

        showToast(shouldAdd ? '위시리스트에 담겼습니다.' : '위시리스트에서 삭제되었습니다.');
    };

    const showToast = (message) => {
        let toast = document.querySelector('[data-product-toast]');

        if (!toast) {
            toast = document.querySelector('.global-toast');
        }

        if (!toast) {
            toast = document.createElement('p');
            toast.className = 'global-toast';
            toast.setAttribute('role', 'status');
            toast.setAttribute('aria-live', 'polite');
            toast.hidden = true;
            document.querySelector('.mobile-shell')?.appendChild(toast);
        }

        window.clearTimeout(showToast.timer);
        toast.textContent = message;
        toast.hidden = false;
        showToast.timer = window.setTimeout(() => {
            toast.hidden = true;
        }, 1800);
    };

    const itemFromButton = (button) => {
        const raw = button.dataset.shopItem;

        if (raw) {
            return parseJson(raw, null);
        }

        const selected = document.querySelector('[data-selected-product]');
        const size = selected?.hidden ? '' : selected?.querySelector('[data-selected-name]')?.textContent.match(/\((.*?)\)$/)?.[1];
        const quantity = selected?.hidden ? 1 : Number(selected?.querySelector('[data-selected-qty]')?.textContent || 1);

        return {
            id: button.dataset.productId,
            name: button.dataset.productName,
            price: Number(button.dataset.productPrice || 0),
            originalPrice: Number(button.dataset.productOriginalPrice || button.dataset.productPrice || 0),
            discount: Number(button.dataset.productDiscount || 0),
            image: button.dataset.productImage,
            size: size || button.dataset.productSize || 'S',
            quantity,
        };
    };

    const initProductActions = () => {
        document.querySelectorAll('[data-action="add-to-cart"], [data-cart-add]').forEach((button) => {
            button.addEventListener('click', (event) => {
                event.preventDefault();
                const item = itemFromButton(button);
                if (item?.id) addToCart(item);
            });
        });

        document.querySelectorAll('[data-action="toggle-wish"], [data-wish-toggle]').forEach((button) => {
            button.addEventListener('click', (event) => {
                event.preventDefault();
                const item = itemFromButton(button);
                if (item?.id) toggleWishlist(item, button);
            });
        });
    };

    const renderCart = () => {
        const list = document.querySelector('[data-cart-list]');
        if (!list) return;

        let items = readItems(CART_KEY, sampleData.cart || []).map(normalizeItem);
        const empty = document.querySelector('[data-cart-empty]');
        const checkAll = document.querySelector('[data-cart-check-all]');

        const draw = () => {
            list.innerHTML = items.map((item, index) => `
                <li class="bag-item">
                    <a class="bag-item__image" href="product-detail.php?id=${item.id}">
                        <img src="${window.FRAGFARM_BASE_URL || ''}${item.image}" alt="">
                    </a>
                    <div class="bag-item__body">
                        <h3 class="bag-item__name">${item.name}</h3>
                        <p class="bag-item__option">${item.option || `SIZE: ${item.size}`}</p>
                        <div class="bag-item__cart-row">
                            <div class="bag-item__qty">
                                <button type="button" data-cart-decrease="${index}" aria-label="수량 감소">&lt;</button>
                                <span>${item.quantity}</span>
                                <button type="button" data-cart-increase="${index}" aria-label="수량 증가">&gt;</button>
                            </div>
                            <p class="bag-item__price">${priceHtml(item, item.quantity)}</p>
                            <button class="bag-item__remove" type="button" data-cart-remove="${index}" aria-label="삭제">×</button>
                        </div>
                    </div>
                    <label class="check-box bag-item__check">
                        <input class="check-box__input" type="checkbox" data-cart-select="${index}" ${item.selected ? 'checked' : ''}>
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
                <a class="bag-item__image" href="product-detail.php?id=${item.id}">
                    <img src="${window.FRAGFARM_BASE_URL || ''}${item.image}" alt="">
                </a>
                <div class="bag-item__body">
                    <h3 class="bag-item__name">${item.name}</h3>
                    <p class="bag-item__option">${item.option || `SIZE: ${item.size}`}</p>
                    <p class="bag-item__price">${formatPrice(item.price)}</p>
                    <button class="bag-item__cart-add" type="button" data-wishlist-cart="${item.id}">장바구니에 담기</button>
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
                if (item) addToCart(item);
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
            pageLink(currentPage - 1, '&laquo;', 'pagination__btn'),
            ...Array.from({ length: totalPages }, (_, index) => pageLink(index + 1)),
            pageLink(currentPage + 1, '&raquo;', 'pagination__btn'),
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

    const updateHeaderCounts = () => {
        const cart = readItems(CART_KEY, sampleData.cart || []);
        const wishlist = readItems(WISHLIST_KEY, sampleData.wishlist || []);

        document.querySelectorAll('[data-cart-count], .cart__badge').forEach((element) => {
            element.textContent = String(cart.reduce((sum, item) => sum + Number(item.quantity || 1), 0));
        });

        document.querySelectorAll('[data-wishlist-count]').forEach((element) => {
            element.textContent = String(wishlist.length);
        });
    };

    window.FRAGFARM_BASE_URL = document.querySelector('script[src*="/js/"]')?.src.split('/js/')[0] || '';

    document.addEventListener('DOMContentLoaded', () => {
        initProductActions();
        renderCart();
        renderWishlist();
        updateHeaderCounts();
    });
}());

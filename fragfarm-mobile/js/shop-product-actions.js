(function () {
    const {
        CART_KEY,
        CHECKOUT_KEY,
        WISHLIST_KEY,
        normalizeItem,
        readItems,
        sampleData,
        writeItems,
    } = window.FragfarmShop;
    const { escapeHtml, parseJson } = window.FragfarmUtils;

const commitCartAdd = (item) => {
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

let cartOptionLayer = null;
let cartDuplicateLayer = null;
let pendingOptionItem = null;
let pendingDuplicateItem = null;
let lastCartTrigger = null;

const closeCartLayers = () => {
    if (cartOptionLayer) cartOptionLayer.hidden = true;
    if (cartDuplicateLayer) cartDuplicateLayer.hidden = true;
    document.body.classList.remove('is-cart-option-open');
    pendingOptionItem = null;
    pendingDuplicateItem = null;
    lastCartTrigger?.focus();
};

const ensureCartLayers = () => {
    if (cartOptionLayer && cartDuplicateLayer) return;

    cartOptionLayer = document.createElement('div');
    cartOptionLayer.className = 'cart-option-layer';
    cartOptionLayer.dataset.cartOptionLayer = '';
    cartOptionLayer.hidden = true;
    cartOptionLayer.innerHTML = `
        <button class="cart-option-layer__dim" type="button" data-cart-layer-close aria-label="옵션 선택 닫기"></button>
        <section class="cart-option-sheet" role="dialog" aria-modal="true" aria-labelledby="cart-option-name">
            <h2 class="cart-option-sheet__name" id="cart-option-name" data-cart-option-name></h2>
            <fieldset class="cart-option-sheet__options">
                <legend>SIZE</legend>
                <div class="cart-option-sheet__size-list" data-cart-option-sizes></div>
            </fieldset>
            <div class="cart-option-sheet__actions">
                <button type="button" data-cart-option-add disabled>장바구니에 담기</button>
            </div>
        </section>`;

    cartDuplicateLayer = document.createElement('div');
    cartDuplicateLayer.className = 'cart-duplicate-layer';
    cartDuplicateLayer.dataset.cartDuplicateLayer = '';
    cartDuplicateLayer.hidden = true;
    cartDuplicateLayer.innerHTML = `
        <button class="cart-option-layer__dim" type="button" data-cart-duplicate-close aria-label="중복 상품 안내 닫기"></button>
        <section class="cart-duplicate-dialog" role="alertdialog" aria-modal="true" aria-labelledby="cart-duplicate-title" aria-describedby="cart-duplicate-message">
            <h2 id="cart-duplicate-title">같은 상품이 담겨 있어요</h2>
            <p id="cart-duplicate-message" data-cart-duplicate-message></p>
            <div class="cart-duplicate-dialog__actions">
                <button type="button" data-cart-duplicate-close>닫기</button>
                <button class="cart-duplicate-dialog__add" type="button" data-cart-duplicate-add>추가</button>
            </div>
        </section>`;

    document.querySelector('.mobile-shell')?.append(cartOptionLayer, cartDuplicateLayer);

    cartOptionLayer.querySelectorAll('[data-cart-layer-close]').forEach((button) => button.addEventListener('click', closeCartLayers));
    cartOptionLayer.addEventListener('change', (event) => {
        if (!event.target.matches('input[name="cart_option_size"]')) return;
        cartOptionLayer.querySelector('[data-cart-option-add]').disabled = false;
    });
    cartOptionLayer.querySelector('[data-cart-option-add]').addEventListener('click', () => {
        const size = cartOptionLayer.querySelector('input[name="cart_option_size"]:checked')?.value;
        if (!pendingOptionItem || !size) return;
        requestCartAdd({ ...pendingOptionItem, size });
    });
    cartDuplicateLayer.querySelectorAll('[data-cart-duplicate-close]').forEach((button) => button.addEventListener('click', closeCartLayers));
    cartDuplicateLayer.querySelector('[data-cart-duplicate-add]').addEventListener('click', () => {
        if (!pendingDuplicateItem) return;
        commitCartAdd(pendingDuplicateItem);
        closeCartLayers();
    });

    document.addEventListener('keydown', (event) => {
        const activeLayer = !cartDuplicateLayer.hidden ? cartDuplicateLayer : !cartOptionLayer.hidden ? cartOptionLayer : null;
        if (!activeLayer) return;

        if (event.key === 'Escape') {
            closeCartLayers();
            return;
        }

        window.FragfarmA11y?.trapFocus(activeLayer.querySelector('[role="dialog"], [role="alertdialog"]'), event);
    });
};

const openDuplicateConfirm = (item) => {
    ensureCartLayers();
    pendingDuplicateItem = normalizeItem(item);
    const optionText = pendingDuplicateItem.option || `SIZE ${pendingDuplicateItem.size}`;
    cartDuplicateLayer.querySelector('[data-cart-duplicate-message]').textContent = `${pendingDuplicateItem.name} (${optionText}) 상품을 한 번 더 추가할까요?`;
    cartDuplicateLayer.hidden = false;
    document.body.classList.add('is-cart-option-open');
    cartDuplicateLayer.querySelector('[data-cart-duplicate-add]')?.focus();
};

const requestCartAdd = (item) => {
    const nextItem = normalizeItem(item);
    const items = readItems(CART_KEY, sampleData.cart || []).map(normalizeItem);
    const exists = items.some((cartItem) => cartItem.id === nextItem.id && cartItem.size === nextItem.size && cartItem.option === nextItem.option);
    if (exists) {
        openDuplicateConfirm(nextItem);
        return;
    }
    commitCartAdd(nextItem);
    closeCartLayers();
};

const openCartOptions = (item, trigger) => {
    if (!item?.id) return;
    ensureCartLayers();
    pendingOptionItem = normalizeItem(item);
    lastCartTrigger = trigger || document.activeElement;
    const sizes = pendingOptionItem.sizes.length > 0 ? pendingOptionItem.sizes : [pendingOptionItem.size || 'One Size'];
    cartOptionLayer.querySelector('[data-cart-option-name]').textContent = pendingOptionItem.name;
    cartOptionLayer.querySelector('[data-cart-option-sizes]').innerHTML = sizes.map((size, index) => `
        <label class="cart-option-sheet__size">
            <input type="radio" name="cart_option_size" value="${escapeHtml(size)}">
            <span>${escapeHtml(size)}</span>
        </label>`).join('');
    cartOptionLayer.querySelector('[data-cart-option-add]').disabled = true;
    cartOptionLayer.hidden = false;
    cartDuplicateLayer.hidden = true;
    document.body.classList.add('is-cart-option-open');
    cartOptionLayer.querySelector('input[name="cart_option_size"]')?.focus();
};

const getSelectedSize = (selectedProduct) => {
    if (!selectedProduct || selectedProduct.hidden) return '';

    return document.querySelector('.product-detail__order input[name="size"]:checked')?.value || '';
};

const itemFromButton = (button) => {
    const raw = button.dataset.shopItem;

    if (raw) {
        return parseJson(raw, null);
    }

    const selected = document.querySelector('[data-selected-product]');
    const size = getSelectedSize(selected);
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
    document.querySelectorAll('[data-action="add-to-cart"]').forEach((button) => {
        button.addEventListener('click', (event) => {
            event.preventDefault();
            const item = itemFromButton(button);
            if (item?.id) openCartOptions(item, button);
        });
    });

    document.querySelectorAll('[data-cart-add]').forEach((button) => {
        button.addEventListener('click', (event) => {
            event.preventDefault();
            const selected = document.querySelector('[data-selected-product]');
            if (!selected || selected.hidden) {
                showToast('사이즈를 선택해주세요.');
                return;
            }
            const item = itemFromButton(button);
            item.size = getSelectedSize(selected) || item.size;
            item.quantity = Number(selected.querySelector('[data-selected-qty]')?.textContent || 1);
            lastCartTrigger = button;
            requestCartAdd(item);
        });
    });

    document.querySelectorAll('[data-action="toggle-wish"], [data-wish-toggle]').forEach((button) => {
        button.addEventListener('click', (event) => {
            event.preventDefault();
            const item = itemFromButton(button);
            if (item?.id) toggleWishlist(item, button);
        });
    });

    document.querySelector('[data-checkout-product]')?.addEventListener('click', (event) => {
        event.preventDefault();
        const selected = document.querySelector('[data-selected-product]');

        if (!selected || selected.hidden) {
            showToast('사이즈를 선택해주세요.');
            return;
        }

        const item = itemFromButton(event.currentTarget);
        item.size = getSelectedSize(selected) || item.size;
        item.quantity = Number(selected.querySelector('[data-selected-qty]')?.textContent || 1);
        window.localStorage.setItem(CHECKOUT_KEY, JSON.stringify({ source: 'product', items: [normalizeItem(item)] }));
        window.location.href = `${window.FRAGFARM_BASE_URL || ''}/pages/checkout.php`;
    });

    document.querySelector('[data-checkout-cart]')?.addEventListener('click', (event) => {
        event.preventDefault();
        const items = readItems(CART_KEY, sampleData.cart || []).map(normalizeItem).filter((item) => item.selected);

        if (items.length === 0) {
            showToast('구매할 상품을 선택해주세요.');
            return;
        }

        window.localStorage.setItem(CHECKOUT_KEY, JSON.stringify({ source: 'cart', items }));
        window.location.href = `${window.FRAGFARM_BASE_URL || ''}/pages/checkout.php`;
    });
};


    window.FragfarmShop.openCartOptions = openCartOptions;
    document.addEventListener('DOMContentLoaded', initProductActions);
}());

(function () {
    const CART_KEY = 'fragfarm_cart';
    const WISHLIST_KEY = 'fragfarm_wishlist';
    const CHECKOUT_KEY = 'fragfarm_checkout';
    const SHIPPING_THRESHOLD = 70000;
    const SHIPPING_FEE = 3000;
    const WISHLIST_PER_PAGE = 8;
    const { parseJson } = window.FragfarmUtils;
    const sampleData = parseJson(document.querySelector('#shop-sample-data')?.textContent || '{}', {});

    const readItems = (key, fallback = []) => {
        const stored = parseJson(window.localStorage.getItem(key), null);
        if (Array.isArray(stored)) return stored;
        window.FragfarmUtils.writeStorage(key, fallback);
        return fallback;
    };

    const updateHeaderCounts = () => {
        const storedCart = parseJson(window.localStorage.getItem(CART_KEY), null);
        const storedWishlist = parseJson(window.localStorage.getItem(WISHLIST_KEY), null);
        const cartFallback = sampleData.cart || [];
        const wishlistFallback = sampleData.wishlist || [];

        if (Array.isArray(storedCart) || cartFallback.length > 0) {
            const cart = readItems(CART_KEY, cartFallback);
            const cartCount = cart.reduce((sum, item) => sum + Number(item.quantity || 1), 0);
            document.querySelectorAll('[data-cart-count], .cart__badge').forEach((element) => {
                element.textContent = String(cartCount);
                element.closest('.cart')?.setAttribute('aria-label', `CART(${cartCount}), 장바구니 상품 ${cartCount}개`);
            });
        }

        if (Array.isArray(storedWishlist) || wishlistFallback.length > 0) {
            const wishlist = readItems(WISHLIST_KEY, wishlistFallback);
            document.querySelectorAll('[data-wishlist-count]').forEach((element) => {
                element.textContent = String(wishlist.length);
            });
        }
    };

    const writeItems = (key, items) => {
        window.FragfarmUtils.writeStorage(key, items);
        updateHeaderCounts();
    };

    const normalizeProductName = (name) => String(name || '')
        .replace(/\s*\(/g, ' (')
        .trim();

    const normalizeItem = (item) => {
        const sizes = Array.isArray(item.sizes) && item.sizes.length > 0
            ? item.sizes.map((size) => String(size))
            : [String(item.size || 'S')];
        const requestedSize = String(item.size || sizes[0]);

        return {
            id: item.id,
            name: normalizeProductName(item.name),
            price: Number(item.price || 0),
            originalPrice: Number(item.originalPrice || item.price || 0),
            discount: Number(item.discount || 0),
            image: item.image || '',
            sizes,
            size: sizes.includes(requestedSize) ? requestedSize : sizes[0],
            option: item.option || '',
            quantity: Math.max(1, Number(item.quantity || 1)),
            selected: item.selected !== false,
        };
    };

    window.FragfarmShop = {
        CART_KEY,
        CHECKOUT_KEY,
        SHIPPING_FEE,
        SHIPPING_THRESHOLD,
        WISHLIST_KEY,
        WISHLIST_PER_PAGE,
        normalizeItem,
        readItems,
        sampleData,
        updateHeaderCounts,
        writeItems,
    };

    document.addEventListener('DOMContentLoaded', updateHeaderCounts);
}());

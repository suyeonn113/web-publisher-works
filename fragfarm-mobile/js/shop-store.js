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
        const cart = readItems(CART_KEY, sampleData.cart || []);
        const wishlist = readItems(WISHLIST_KEY, sampleData.wishlist || []);
        document.querySelectorAll('[data-cart-count], .cart__badge').forEach((element) => {
            element.textContent = String(cart.reduce((sum, item) => sum + Number(item.quantity || 1), 0));
        });
        document.querySelectorAll('[data-wishlist-count]').forEach((element) => {
            element.textContent = String(wishlist.length);
        });
    };

    const writeItems = (key, items) => {
        window.FragfarmUtils.writeStorage(key, items);
        updateHeaderCounts();
    };

    const normalizeItem = (item) => ({
        id: item.id,
        name: item.name,
        price: Number(item.price || 0),
        originalPrice: Number(item.originalPrice || item.price || 0),
        discount: Number(item.discount || 0),
        image: item.image || '',
        sizes: Array.isArray(item.sizes) && item.sizes.length > 0
            ? item.sizes.map((size) => String(size))
            : [String(item.size || 'S')],
        size: item.size || 'S',
        option: item.option || '',
        quantity: Math.max(1, Number(item.quantity || 1)),
        selected: item.selected !== false,
    });

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

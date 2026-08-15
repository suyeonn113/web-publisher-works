(function () {
    const CHECKOUT_KEY = 'fragfarm_checkout';
    const CART_KEY = 'fragfarm_cart';
    const SHIPPING_THRESHOLD = 70000;
    const SHIPPING_FEE = 3000;
    const DEMO_SESSION_KEY = 'fragfarm_demo_session';
    const DEMO_ORDERS_KEY = 'fragfarm_demo_orders';

    const { escapeHtml, formatPrice, parseJson } = window.FragfarmUtils;
    const checkout = parseJson(window.localStorage.getItem(CHECKOUT_KEY), {});
    const items = Array.isArray(checkout.items) ? checkout.items.filter((item) => item?.id) : [];
    const list = document.querySelector('[data-checkout-items]');
    const form = document.querySelector('[data-checkout-form]');
    const empty = document.querySelector('[data-checkout-empty]');
    const paymentSection = document.querySelector('[data-payment-section]');
    const paymentInputs = form ? [...form.querySelectorAll('input[name="payment_method"]')] : [];

    if (!list || !form) return;

    const isDemoMode = form.dataset.demoMode === 'true';
    if (isDemoMode && !parseJson(window.localStorage.getItem(DEMO_SESSION_KEY), null)) {
        window.localStorage.setItem('fragfarm_demo_after_login', `${window.FRAGFARM_BASE_URL || ''}/pages/checkout.php`);
        window.location.href = `${window.FRAGFARM_BASE_URL || ''}/pages/login.php`;
        return;
    }

    const memberProfile = parseJson(document.querySelector('#checkout-member-profile')?.textContent || '{}', {});
    const fillMemberProfile = () => {
        const fieldMap = {
            user_name: 'recipient_name',
            phone: 'recipient_phone',
            postcode: 'postcode',
            address_line1: 'address_line1',
            address_line2: 'address_line2',
        };
        Object.entries(fieldMap).forEach(([profileKey, fieldName]) => {
            const input = form.elements.namedItem(fieldName);
            if (input) input.value = memberProfile[profileKey] || '';
        });
    };
    document.querySelector('[data-load-member-address]')?.addEventListener('click', fillMemberProfile);

    if (items.length === 0) {
        empty.hidden = false;
        form.hidden = true;
        return;
    }

    list.innerHTML = items.map((item) => `
        <li class="checkout-product">
            <img src="${escapeHtml((window.FRAGFARM_BASE_URL || '') + (item.image || ''))}" alt="">
            <div>
                <h4>${escapeHtml(item.name)}</h4>
                <div class="checkout-product__options">
                    <p>${escapeHtml(item.option || `SIZE: ${item.size || '-'}`)}</p>
                    <p>수량: ${Number(item.quantity || 1)}개</p>
                </div>
                <strong>${formatPrice(Number(item.price || 0) * Number(item.quantity || 1))}</strong>
            </div>
        </li>
    `).join('');

    const subtotal = items.reduce((sum, item) => sum + Number(item.price || 0) * Number(item.quantity || 1), 0);
    const shipping = subtotal >= SHIPPING_THRESHOLD ? 0 : SHIPPING_FEE;
    document.querySelector('[data-checkout-subtotal]').textContent = formatPrice(subtotal);
    document.querySelector('[data-checkout-shipping]').textContent = formatPrice(shipping);
    document.querySelector('[data-checkout-total]').textContent = formatPrice(subtotal + shipping);
    document.querySelector('[data-order-items]').value = JSON.stringify(items.map((item) => ({
        id: item.id,
        size: item.size || '',
        option: item.option || '',
        quantity: Math.max(1, Number(item.quantity || 1)),
    })));

    form.addEventListener('submit', (event) => {
        const selectedPayment = form.querySelector('input[name="payment_method"]:checked');

        if (!selectedPayment) {
            event.preventDefault();
            window.showGlobalToast?.('결제 수단을 선택해주세요.');
            paymentSection?.scrollIntoView({
                behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
                block: 'center',
            });
            window.requestAnimationFrame(() => paymentInputs[0]?.focus({ preventScroll: true }));
            return;
        }

        if (isDemoMode) {
            event.preventDefault();
            const formData = new FormData(form);
            const orders = parseJson(window.localStorage.getItem(DEMO_ORDERS_KEY), []);
            const order = {
                order_number: `LOCAL-${Date.now()}`,
                created_at: new Date().toISOString(),
                order_status: 'ordered',
                total_amount: subtotal + shipping,
                shipping_fee: shipping,
                recipient_name: formData.get('recipient_name'),
                recipient_phone: formData.get('recipient_phone'),
                postcode: formData.get('postcode'),
                address_line1: formData.get('address_line1'),
                address_line2: formData.get('address_line2'),
                delivery_message: formData.get('delivery_message'),
                product_amount: subtotal,
                payment_method: formData.get('payment_method'),
                items,
            };
            orders.unshift(order);
            window.localStorage.setItem(DEMO_ORDERS_KEY, JSON.stringify(orders));
            window.sessionStorage.setItem('fragfarm_demo_last_order', JSON.stringify(order));
            if (checkout.source === 'cart') {
                const cart = parseJson(window.localStorage.getItem(CART_KEY), []);
                const orderedKeys = new Set(items.map((item) => `${item.id}|${item.size || ''}|${item.option || ''}`));
                window.localStorage.setItem(CART_KEY, JSON.stringify(cart.filter((item) => !orderedKeys.has(`${item.id}|${item.size || ''}|${item.option || ''}`))));
            }
            window.location.href = `${window.FRAGFARM_BASE_URL || ''}/pages/order-complete.php`;
            return;
        }

        if (checkout.source !== 'cart') return;
        const cart = parseJson(window.localStorage.getItem(CART_KEY), []);
        const orderedKeys = new Set(items.map((item) => `${item.id}|${item.size || ''}|${item.option || ''}`));
        const remaining = cart.filter((item) => !orderedKeys.has(`${item.id}|${item.size || ''}|${item.option || ''}`));
        window.sessionStorage.setItem('fragfarm_cart_after_order', JSON.stringify(remaining));
    });
}());

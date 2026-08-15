(function () {
    const root = document.querySelector('[data-order-detail]');
    if (!root) return;

    const baseUrl = window.FRAGFARM_BASE_URL || '';
    const session = JSON.parse(window.localStorage.getItem('fragfarm_demo_session') || 'null');
    if (!session) {
        window.localStorage.setItem('fragfarm_demo_after_login', window.location.href);
        window.location.href = `${baseUrl}/pages/login.php`;
        return;
    }

    const orders = JSON.parse(window.localStorage.getItem('fragfarm_demo_orders') || '[]');
    const order = orders.find((item) => item.order_number === root.dataset.orderNumber);
    const content = root.querySelector('[data-order-detail-content]');
    const empty = root.querySelector('[data-order-detail-empty]');

    if (!order) {
        content.hidden = true;
        empty.hidden = false;
        return;
    }

    const { escapeHtml, formatPrice } = window.FragfarmUtils;
    const statusLabels = { ordered: '주문 완료', preparing: '배송 준비 중', shipping: '배송 중', delivered: '배송 완료', cancelled: '취소', exchanged: '교환', returned: '반품' };
    const paymentLabels = { demo_card: '신용카드 모의 결제', demo_bank: '무통장입금 모의 결제' };
    const setText = (selector, value) => {
        const element = root.querySelector(selector);
        if (element) element.textContent = value;
    };

    content.hidden = false;
    empty.hidden = true;
    setText('[data-detail-date]', new Date(order.created_at).toLocaleString('ko-KR'));
    setText('[data-detail-status]', statusLabels[order.order_status] || '주문 확인 중');
    setText('[data-detail-number]', order.order_number);
    setText('[data-detail-recipient]', order.recipient_name || '프래그팜 마스터');
    setText('[data-detail-phone]', order.recipient_phone || '-');
    setText('[data-detail-address]', order.postcode ? `[${order.postcode}] ${order.address_line1 || ''} ${order.address_line2 || ''}` : '-');
    setText('[data-detail-message]', order.delivery_message || '-');
    setText('[data-detail-payment]', paymentLabels[order.payment_method] || order.payment_method || '-');
    setText('[data-detail-subtotal]', formatPrice(order.product_amount ?? (order.total_amount - order.shipping_fee)));
    setText('[data-detail-shipping]', formatPrice(order.shipping_fee));
    setText('[data-detail-total]', formatPrice(order.total_amount));

    root.querySelector('[data-detail-items]').innerHTML = (order.items || []).map((item) => `
        <li class="checkout-product">
            <img src="${escapeHtml(baseUrl + (item.image || ''))}" alt="">
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
}());

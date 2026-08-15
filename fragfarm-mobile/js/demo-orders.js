(function () {
    const baseUrl = window.FRAGFARM_BASE_URL || '';
    const session = JSON.parse(window.localStorage.getItem('fragfarm_demo_session') || 'null');
    if (!session) {
        window.localStorage.setItem('fragfarm_demo_after_login', `${baseUrl}/pages/orders.php`);
        window.location.href = `${baseUrl}/pages/login.php`;
        return;
    }

    const orders = JSON.parse(window.localStorage.getItem('fragfarm_demo_orders') || '[]');
    const list = document.querySelector('[data-demo-orders-list]');
    const empty = document.querySelector('[data-demo-orders-empty]');
    const count = document.querySelector('[data-demo-order-count]');
    const { escapeHtml } = window.FragfarmUtils;

    if (count) count.textContent = String(orders.length);
    document.querySelector('[data-demo-logout]')?.addEventListener('click', () => {
        window.localStorage.removeItem('fragfarm_demo_session');
        window.location.href = `${baseUrl}/pages/login.php`;
    });
    if (empty) empty.hidden = orders.length > 0;
    if (!list) return;

    list.innerHTML = orders.map((order) => {
        const first = order.items?.[0] || {};
        const extra = Math.max(0, (order.items?.length || 1) - 1);
        return `
            <li class="order-card">
                <a class="order-card__link" href="${baseUrl}/pages/order-detail.php?number=${encodeURIComponent(order.order_number)}">
                <div class="order-card__head">
                    <time>${new Date(order.created_at).toLocaleDateString('ko-KR')}</time>
                    <span class="status-badge order-card__status">주문 완료</span>
                </div>
                <div class="order-card__body">
                    <img src="${escapeHtml(baseUrl + (first.image || ''))}" alt="">
                    <div>
                        <p class="order-card__number">주문번호 ${escapeHtml(order.order_number)}</p>
                        <h3>${escapeHtml(first.name || '상품')} ${extra > 0 ? `외 ${extra}건` : ''}</h3>
                        <strong>${Number(order.total_amount || 0).toLocaleString('ko-KR')}원</strong>
                    </div>
                </div>
                </a>
            </li>`;
    }).join('');
}());

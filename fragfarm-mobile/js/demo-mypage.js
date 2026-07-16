(function () {
    const sessionKey = 'fragfarm_demo_session';
    const session = window.FragfarmUtils.readStorage(sessionKey, null);

    if (!session) {
        window.location.href = `${window.FRAGFARM_BASE_URL}/pages/login.php`;
        return;
    }

    const demoOrders = window.FragfarmUtils.readStorageArray('fragfarm_demo_orders');
    const threeMonthsAgo = new Date();
    threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);
    const demoStatusCounts = demoOrders.reduce((counts, order) => {
        const createdAt = new Date(order.created_at);
        if (Number.isNaN(createdAt.getTime()) || createdAt < threeMonthsAgo) return counts;
        const status = order.order_status || 'ordered';
        if (Object.prototype.hasOwnProperty.call(counts, status)) counts[status] += 1;
        return counts;
    }, { ordered: 0, preparing: 0, shipping: 0, delivered: 0, cancelled: 0, exchanged: 0, returned: 0 });

    Object.entries(demoStatusCounts).forEach(([status, count]) => {
        const output = document.querySelector(`[data-order-status="${status}"]`);
        if (output) output.textContent = String(count);
    });

    document.querySelector('[data-demo-mypage-logout]')?.addEventListener('click', () => {
        window.localStorage.removeItem(sessionKey);
        window.location.href = `${window.FRAGFARM_BASE_URL}/pages/login.php`;
    });
}());

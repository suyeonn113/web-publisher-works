(function () {
    const remainingCart = window.sessionStorage.getItem('fragfarm_cart_after_order');
    if (remainingCart !== null) {
        window.localStorage.setItem('fragfarm_cart', remainingCart);
        window.sessionStorage.removeItem('fragfarm_cart_after_order');
    }

    window.localStorage.removeItem('fragfarm_checkout');
    const demoOrder = window.FragfarmUtils.parseJson(
        window.sessionStorage.getItem('fragfarm_demo_last_order'),
        null
    );

    if (!demoOrder) return;

    const numberOutput = document.querySelector('[data-demo-complete-number]');
    const totalOutput = document.querySelector('[data-demo-complete-total]');
    if (numberOutput) numberOutput.textContent = demoOrder.order_number;
    if (totalOutput) totalOutput.textContent = window.FragfarmUtils.formatPrice(demoOrder.total_amount);
    window.sessionStorage.removeItem('fragfarm_demo_last_order');
}());

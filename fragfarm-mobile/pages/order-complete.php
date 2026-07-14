<?php
include __DIR__ . '/../includes/config.php';
if (!FRAGFARM_DEMO_MODE && (empty($_SESSION['member_id']) || empty($_SESSION['last_order']))) {
    header('Location: ' . BASE_URL . '/pages/orders.php');
    exit;
}
$order = $_SESSION['last_order'] ?? ['number' => '', 'total' => 0];
unset($_SESSION['last_order']);
$pageTitle = 'Order Complete | Fragfarm';
$pageCss = 'checkout.css';
?>
<!DOCTYPE html>
<html lang="ko">
<?php include __DIR__ . '/../includes/head.php'; ?>
<body>
<div class="mobile-shell">
    <?php include __DIR__ . '/../includes/header.php'; ?>
    <main id="main" class="order-complete">
        <div class="page-heading page-heading--plain page-heading--contained">
            <h2 class="page-heading__title">ORDER COMPLETE</h2>
        </div>
        <p class="order-complete__mark" aria-hidden="true"><img src="<?= BASE_URL ?>/assets/icons/check.svg" alt=""></p>
        <p class="order-complete__message">주문이 완료되었습니다.</p>
        <p>실제 결제가 발생하지 않은 포트폴리오용 모의 주문입니다.</p>
        <dl class="order-complete__info">
            <div><dt>주문번호</dt><dd data-demo-complete-number><?= htmlspecialchars($order['number'], ENT_QUOTES, 'UTF-8') ?></dd></div>
            <div><dt>결제 금액</dt><dd data-demo-complete-total><?= number_format((int) $order['total']) ?>원</dd></div>
        </dl>
        <div class="order-complete__actions">
            <a href="<?= BASE_URL ?>/pages/orders.php">주문 내역 확인</a>
            <a href="<?= BASE_URL ?>/pages/product.php">쇼핑 계속하기</a>
        </div>
    </main>
    <?php include __DIR__ . '/../includes/footer.php'; ?>
</div>
<script>
const remainingCart = window.sessionStorage.getItem('fragfarm_cart_after_order');
if (remainingCart !== null) {
    window.localStorage.setItem('fragfarm_cart', remainingCart);
    window.sessionStorage.removeItem('fragfarm_cart_after_order');
}
window.localStorage.removeItem('fragfarm_checkout');
const demoOrder = JSON.parse(window.sessionStorage.getItem('fragfarm_demo_last_order') || 'null');
if (demoOrder) {
    document.querySelector('[data-demo-complete-number]').textContent = demoOrder.order_number;
    document.querySelector('[data-demo-complete-total]').textContent = `${Number(demoOrder.total_amount).toLocaleString('ko-KR')}원`;
    window.sessionStorage.removeItem('fragfarm_demo_last_order');
}
</script>
<script src="<?= BASE_URL ?>/js/header.js"></script>
</body>
</html>

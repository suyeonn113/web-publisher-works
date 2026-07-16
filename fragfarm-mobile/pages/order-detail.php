<?php
include __DIR__ . '/../includes/config.php';
require_once __DIR__ . '/../includes/view-helpers.php';

if (!FRAGFARM_DEMO_MODE && empty($_SESSION['member_id'])) {
    header('Location: ' . BASE_URL . '/pages/login.php');
    exit;
}

function order_detail_status(string $status): string
{
    return [
        'ordered' => '주문 완료',
        'preparing' => '배송 준비 중',
        'shipping' => '배송 중',
        'delivered' => '배송 완료',
        'cancelled' => '취소',
        'exchanged' => '교환',
        'returned' => '반품',
    ][$status] ?? '주문 확인 중';
}

function order_detail_payment(string $method): string
{
    return [
        'demo_card' => '신용카드 모의 결제',
        'demo_bank' => '무통장입금 모의 결제',
    ][$method] ?? $method;
}

$orderNumber = trim($_GET['number'] ?? '');
$order = null;
$orderItems = [];

if (!FRAGFARM_DEMO_MODE && $orderNumber !== '') {
    require_once __DIR__ . '/../includes/dbconn.php';
    $memberId = (int) $_SESSION['member_id'];
    $orderStmt = mysqli_prepare($mysqli, 'SELECT * FROM fragfarm_orders WHERE order_number = ? AND member_id = ? LIMIT 1');
    if ($orderStmt) {
        mysqli_stmt_bind_param($orderStmt, 'si', $orderNumber, $memberId);
        mysqli_stmt_execute($orderStmt);
        $order = mysqli_fetch_assoc(mysqli_stmt_get_result($orderStmt));
        mysqli_stmt_close($orderStmt);
    }

    if ($order) {
        $itemStmt = mysqli_prepare($mysqli, 'SELECT * FROM fragfarm_order_items WHERE order_id = ? ORDER BY id ASC');
        if ($itemStmt) {
            $orderId = (int) $order['id'];
            mysqli_stmt_bind_param($itemStmt, 'i', $orderId);
            mysqli_stmt_execute($itemStmt);
            $itemResult = mysqli_stmt_get_result($itemStmt);
            while ($item = mysqli_fetch_assoc($itemResult)) {
                $orderItems[] = $item;
            }
            mysqli_stmt_close($itemStmt);
        }
    }
    mysqli_close($mysqli);
}

if (!FRAGFARM_DEMO_MODE && !$order) {
    http_response_code(404);
}

$pageTitle = 'Order Detail | Fragfarm';
$pageCss = 'checkout.css';
?>
<!DOCTYPE html>
<html lang="ko">
<?php include __DIR__ . '/../includes/head.php'; ?>
<body>
<div class="mobile-shell">
    <?php include __DIR__ . '/../includes/header.php'; ?>
    <main id="main" class="order-detail" data-order-detail data-order-number="<?= e($orderNumber) ?>" data-demo-mode="<?= FRAGFARM_DEMO_MODE ? 'true' : 'false' ?>">
        <div class="page-heading page-heading--back page-heading--contained">
            <a class="page-heading__back" href="<?= BASE_URL ?>/pages/orders.php" aria-label="주문 목록으로 돌아가기"><img src="<?= BASE_URL ?>/assets/icons/arrow-left.svg" alt=""></a>
            <h2 class="page-heading__title">ORDER DETAIL</h2>
        </div>

        <p class="checkout-demo">포트폴리오용 주문 체험이며 실제 결제는 발생하지 않습니다.</p>
        <p class="orders-empty" data-order-detail-empty <?= ($order || FRAGFARM_DEMO_MODE) ? 'hidden' : '' ?>>주문 정보를 찾을 수 없습니다.</p>

        <div data-order-detail-content <?= (!$order && !FRAGFARM_DEMO_MODE) ? 'hidden' : '' ?>>
            <section class="order-detail__summary">
                <div><span data-detail-date><?= $order ? date('Y.m.d H:i', strtotime($order['created_at'])) : '' ?></span><strong data-detail-status><?= $order ? e(order_detail_status($order['order_status'])) : '' ?></strong></div>
                <p>주문번호 <b data-detail-number><?= $order ? e($order['order_number']) : '' ?></b></p>
            </section>

            <section class="checkout-section" aria-labelledby="detail-products-title">
                <h3 id="detail-products-title">주문 상품</h3>
                <ul class="checkout-products" data-detail-items>
                    <?php foreach ($orderItems as $item): ?>
                        <li class="checkout-product">
                            <img src="<?= BASE_URL . e($item['product_image']) ?>" alt="">
                            <div>
                                <h4><?= e($item['product_name']) ?></h4>
                                <p><?= e($item['product_option'] ?: 'SIZE: ' . $item['size']) ?> · <?= (int) $item['quantity'] ?>개</p>
                                <strong><?= number_format((int) $item['line_total']) ?>원</strong>
                            </div>
                        </li>
                    <?php endforeach; ?>
                </ul>
            </section>

            <section class="checkout-section order-detail__info" aria-labelledby="detail-shipping-title">
                <h3 id="detail-shipping-title">배송 정보</h3>
                <dl>
                    <div><dt>받는 분</dt><dd data-detail-recipient><?= $order ? e($order['recipient_name']) : '' ?></dd></div>
                    <div><dt>연락처</dt><dd data-detail-phone><?= $order ? e($order['recipient_phone']) : '' ?></dd></div>
                    <div><dt>주소</dt><dd data-detail-address><?= $order ? e('[' . $order['postcode'] . '] ' . $order['address_line1'] . ' ' . $order['address_line2']) : '' ?></dd></div>
                    <div><dt>배송 메시지</dt><dd data-detail-message><?= $order ? e($order['delivery_message'] ?: '-') : '' ?></dd></div>
                </dl>
            </section>

            <section class="checkout-section order-detail__info" aria-labelledby="detail-payment-title">
                <h3 id="detail-payment-title">결제 정보</h3>
                <dl>
                    <div><dt>결제 수단</dt><dd data-detail-payment><?= $order ? e(order_detail_payment($order['payment_method'])) : '' ?></dd></div>
                    <div><dt>상품 금액</dt><dd data-detail-subtotal><?= $order ? number_format((int) $order['product_amount']) . '원' : '' ?></dd></div>
                    <div><dt>배송비</dt><dd data-detail-shipping><?= $order ? number_format((int) $order['shipping_fee']) . '원' : '' ?></dd></div>
                    <div class="order-detail__total"><dt>총 결제 금액</dt><dd data-detail-total><?= $order ? number_format((int) $order['total_amount']) . '원' : '' ?></dd></div>
                </dl>
            </section>
        </div>
    </main>
    <?php include __DIR__ . '/../includes/footer.php'; ?>
</div>
<script src="<?= BASE_URL ?>/js/header.js"></script>
<?php if (FRAGFARM_DEMO_MODE): ?><script src="<?= BASE_URL ?>/js/demo-order-detail.js"></script><?php endif; ?>
</body>
</html>

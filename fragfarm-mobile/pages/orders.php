<?php
include __DIR__ . '/../includes/config.php';

if (!FRAGFARM_DEMO_MODE && empty($_SESSION['member_id'])) {
    header('Location: ' . BASE_URL . '/pages/login.php');
    exit;
}

function orders_e($value): string
{
    return htmlspecialchars((string) $value, ENT_QUOTES, 'UTF-8');
}

function order_status_label(string $status): string
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

$orders = [];
if (!FRAGFARM_DEMO_MODE) {
    require_once __DIR__ . '/../includes/dbconn.php';
    $memberId = (int) $_SESSION['member_id'];
    $sql = '
    SELECT
        o.id,
        o.order_number,
        o.total_amount,
        o.order_status,
        o.created_at,
        COUNT(oi.id) AS item_count,
        MIN(oi.product_name) AS first_product_name,
        MIN(oi.product_image) AS first_product_image
    FROM fragfarm_orders o
    INNER JOIN fragfarm_order_items oi ON oi.order_id = o.id
    WHERE o.member_id = ?
    GROUP BY o.id, o.order_number, o.total_amount, o.order_status, o.created_at
    ORDER BY o.created_at DESC, o.id DESC
';
    $stmt = mysqli_prepare($mysqli, $sql);
    if ($stmt) {
        mysqli_stmt_bind_param($stmt, 'i', $memberId);
        mysqli_stmt_execute($stmt);
        $result = mysqli_stmt_get_result($stmt);
        while ($row = mysqli_fetch_assoc($result)) {
            $orders[] = $row;
        }
        mysqli_stmt_close($stmt);
    }
    mysqli_close($mysqli);
}

$pageTitle = 'Orders | Fragfarm';
$pageCss = 'orders.css';
?>
<!DOCTYPE html>
<html lang="ko">
<?php include __DIR__ . '/../includes/head.php'; ?>
<body>
<div class="mobile-shell">
    <?php include __DIR__ . '/../includes/header.php'; ?>
    <main id="main" class="orders-page">
        <div class="page-heading page-heading--back page-heading--contained">
            <a class="page-heading__back" href="<?= BASE_URL ?>/pages/mypage.php" aria-label="마이페이지로 돌아가기"><img src="<?= BASE_URL ?>/assets/icons/arrow-left.svg" alt=""></a>
            <h2 class="page-heading__title">ORDERS</h2>
        </div>
        <nav class="orders-tabs" aria-label="주문 내역 유형">
            <a href="<?= BASE_URL ?>/pages/orders.php" aria-current="page">주문 내역 조회 (<span data-demo-order-count><?= count($orders) ?></span>)</a>
            <span>모의 주문 내역</span>
            <?php if (FRAGFARM_DEMO_MODE): ?><button type="button" data-demo-logout>로컬 로그아웃</button><?php endif; ?>
        </nav>

        <?php if (empty($orders)): ?>
            <p class="orders-empty" data-demo-orders-empty>주문 내역이 없습니다.</p>
        <?php else: ?>
            <ul class="orders-list">
                <?php foreach ($orders as $order): ?>
                    <?php $extraCount = max(0, (int) $order['item_count'] - 1); ?>
                    <li class="order-card">
                        <a class="order-card__link" href="<?= BASE_URL ?>/pages/order-detail.php?number=<?= rawurlencode($order['order_number']) ?>">
                        <div class="order-card__head">
                            <time datetime="<?= orders_e($order['created_at']) ?>"><?= date('Y.m.d', strtotime($order['created_at'])) ?></time>
                            <span><?= orders_e(order_status_label($order['order_status'])) ?></span>
                        </div>
                        <div class="order-card__body">
                            <?php if (!empty($order['first_product_image'])): ?>
                                <img src="<?= BASE_URL . orders_e($order['first_product_image']) ?>" alt="">
                            <?php endif; ?>
                            <div>
                                <p class="order-card__number">주문번호 <?= orders_e($order['order_number']) ?></p>
                                <h3><?= orders_e($order['first_product_name']) ?><?= $extraCount > 0 ? ' 외 ' . $extraCount . '건' : '' ?></h3>
                                <strong><?= number_format((int) $order['total_amount']) ?>원</strong>
                            </div>
                        </div>
                        </a>
                    </li>
                <?php endforeach; ?>
            </ul>
        <?php endif; ?>
        <?php if (FRAGFARM_DEMO_MODE): ?>
            <ul class="orders-list" data-demo-orders-list></ul>
        <?php endif; ?>
    </main>
    <?php include __DIR__ . '/../includes/footer.php'; ?>
</div>
<script src="<?= BASE_URL ?>/js/header.js"></script>
<?php if (FRAGFARM_DEMO_MODE): ?><script src="<?= BASE_URL ?>/js/demo-orders.js"></script><?php endif; ?>
</body>
</html>

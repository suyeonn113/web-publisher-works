<?php
include __DIR__ . '/../includes/config.php';
require_once __DIR__ . '/../includes/http-response.php';

if (!FRAGFARM_DEMO_MODE && empty($_SESSION['member_id'])) {
    move_with_alert('로그인 해주세요.', BASE_URL . '/pages/login.php');
}

$member = FRAGFARM_DEMO_MODE ? ['id' => 0, 'user_id' => 'fragfarm', 'user_name' => 'Fragfarm Master', 'email' => '', 'phone' => '', 'postcode' => '', 'address_line1' => '', 'address_line2' => ''] : null;
$orderStatusCounts = [
    'ordered' => 0,
    'preparing' => 0,
    'shipping' => 0,
    'delivered' => 0,
    'cancelled' => 0,
    'exchanged' => 0,
    'returned' => 0,
];

if (!FRAGFARM_DEMO_MODE) {
    require_once __DIR__ . '/../includes/dbconn.php';
    mysqli_set_charset($mysqli, 'utf8mb4');
    $memberId = (int) $_SESSION['member_id'];
    $sql = '
    SELECT
        id,
        user_id,
        user_name,
        email,
        phone,
        postcode,
        address_line1,
        address_line2
    FROM fragfarm_members
    WHERE id = ?
    LIMIT 1
';
    $stmt = mysqli_prepare($mysqli, $sql);
    if ($stmt) {
        mysqli_stmt_bind_param($stmt, 'i', $memberId);
        mysqli_stmt_execute($stmt);
        $result = mysqli_stmt_get_result($stmt);
        $member = mysqli_fetch_assoc($result);
        mysqli_stmt_close($stmt);
    }

    $statusSql = '
        SELECT order_status, COUNT(*) AS status_count
        FROM fragfarm_orders
        WHERE member_id = ?
          AND created_at >= DATE_SUB(NOW(), INTERVAL 3 MONTH)
        GROUP BY order_status
    ';
    $statusStmt = mysqli_prepare($mysqli, $statusSql);
    if ($statusStmt) {
        mysqli_stmt_bind_param($statusStmt, 'i', $memberId);
        mysqli_stmt_execute($statusStmt);
        $statusResult = mysqli_stmt_get_result($statusStmt);
        while ($statusRow = mysqli_fetch_assoc($statusResult)) {
            $status = $statusRow['order_status'];
            if (array_key_exists($status, $orderStatusCounts)) {
                $orderStatusCounts[$status] = (int) $statusRow['status_count'];
            }
        }
        mysqli_stmt_close($statusStmt);
    }
    mysqli_close($mysqli);
}

if (!$member) {
    session_unset();
    session_destroy();
    header('Location: ' . BASE_URL . '/pages/login.php');
    exit;
}

function mypage_icon($name)
{
    $path = __DIR__ . '/../assets/icons/' . $name . '.svg';

    if (!is_file($path)) {
        return '';
    }

    $svg = file_get_contents($path);
    $svg = preg_replace('/\sstroke="[^"]*"/', ' stroke="currentColor"', $svg);

    return preg_replace('/<svg\b/', '<svg aria-hidden="true" focusable="false"', $svg, 1);
}

$pageTitle = 'My Page | Fragfarm';
$pageCss = 'mypage.css';
?>

<!DOCTYPE html>
<html lang="ko">

<!------------ Head ------------>
<?php include __DIR__ . '/../includes/head.php'; ?>

<body>
<div class="mobile-shell">
    <!-- Header -->
    <?php include __DIR__ . '/../includes/header.php'; ?>

    <main id="main" class="mypage">
        <section class="mypage__inner" aria-labelledby="mypage-title">
            <div class="page-heading page-heading--plain page-heading--contained">
                <h2 id="mypage-title" class="page-heading__title">MY PAGE</h2>
            </div>

            <section class="order-status" aria-labelledby="order-status-title">
                <h3 id="order-status-title" class="order-status__title">주문처리 현황 <span>(최근 3개월 기준)</span></h3>
                <dl class="order-status__list">
                    <div class="order-status__item">
                        <dt>주문완료</dt>
                        <dd data-order-status="ordered"><?= $orderStatusCounts['ordered'] ?></dd>
                    </div>
                    <div class="order-status__item">
                        <dt>배송준비중</dt>
                        <dd data-order-status="preparing"><?= $orderStatusCounts['preparing'] ?></dd>
                    </div>
                    <div class="order-status__item">
                        <dt>배송중</dt>
                        <dd data-order-status="shipping"><?= $orderStatusCounts['shipping'] ?></dd>
                    </div>
                    <div class="order-status__item">
                        <dt>배송완료</dt>
                        <dd data-order-status="delivered"><?= $orderStatusCounts['delivered'] ?></dd>
                    </div>
                    <div class="order-status__item">
                        <dt>취소</dt>
                        <dd data-order-status="cancelled"><?= $orderStatusCounts['cancelled'] ?></dd>
                    </div>
                    <div class="order-status__item">
                        <dt>교환</dt>
                        <dd data-order-status="exchanged"><?= $orderStatusCounts['exchanged'] ?></dd>
                    </div>
                    <div class="order-status__item">
                        <dt>반품</dt>
                        <dd data-order-status="returned"><?= $orderStatusCounts['returned'] ?></dd>
                    </div>
                </dl>
            </section>

            <nav class="mypage-menu" aria-label="마이페이지 메뉴">
                <a class="mypage-menu__link" href="<?= BASE_URL ?>/pages/orders.php">
                    <?= mypage_icon('order') ?>
                    <span>주문 조회</span>
                </a>
                <a class="mypage-menu__link" href="<?= BASE_URL ?>/pages/my-posts.php">
                    <?= mypage_icon('post') ?>
                    <span>내가 쓴 글</span>
                </a>
                <a class="mypage-menu__link" href="<?= BASE_URL ?>/pages/coupons.php">
                    <?= mypage_icon('coupon') ?>
                    <span>쿠폰</span>
                </a>
                <a class="mypage-menu__link" href="<?= BASE_URL ?>/pages/points.php">
                    <?= mypage_icon('point') ?>
                    <span>적립금</span>
                </a>
                <a class="mypage-menu__link" href="<?= BASE_URL ?>/pages/addresses.php">
                    <?= mypage_icon('address') ?>
                    <span>배송 주소록</span>
                </a>
                <a class="mypage-menu__link" href="<?= BASE_URL ?>/pages/member_edit.php">
                    <?= mypage_icon('account') ?>
                    <span>회원정보</span>
                </a>
            </nav>

            <?php if (FRAGFARM_DEMO_MODE): ?>
                <button class="mypage__logout" type="button" data-demo-mypage-logout>LOGOUT</button>
            <?php else: ?>
                <a class="mypage__logout" href="<?= BASE_URL ?>/actions/logout.php">LOGOUT</a>
            <?php endif; ?>
        </section>
    </main>

    <!-- Footer -->
    <?php include __DIR__ . '/../includes/footer.php'; ?>
</div>

<!-- JS -->
<script src="<?= BASE_URL ?>/js/header.js"></script>
<?php if (FRAGFARM_DEMO_MODE): ?><script src="<?= BASE_URL ?>/js/demo-mypage.js"></script><?php endif; ?>
</body>
</html>

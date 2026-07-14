<?php
include __DIR__ . '/../includes/config.php';

if (!FRAGFARM_DEMO_MODE && empty($_SESSION['member_id'])) {
    $_SESSION['after_login_redirect'] = BASE_URL . '/pages/coupons.php';
    header('Location: ' . BASE_URL . '/pages/login.php');
    exit;
}

$coupons = FRAGFARM_DEMO_MODE ? [
    [
        'name' => 'WELCOME COUPON',
        'benefit' => '10%',
        'condition' => '50,000원 이상 구매 시 사용 가능',
        'expires_at' => '2026-12-31',
    ],
] : [];
$pageTitle = 'Coupons | Fragfarm';
$pageCss = 'mypage-detail.css';
?>
<!DOCTYPE html>
<html lang="ko">
<?php include __DIR__ . '/../includes/head.php'; ?>
<body>
<div class="mobile-shell">
    <?php include __DIR__ . '/../includes/header.php'; ?>
    <main id="main" class="mypage-detail">
        <div class="page-heading page-heading--back page-heading--contained">
            <a class="page-heading__back" href="<?= BASE_URL ?>/pages/mypage.php" aria-label="마이페이지로 돌아가기"><img src="<?= BASE_URL ?>/assets/icons/arrow-left.svg" alt=""></a>
            <h2 class="page-heading__title">COUPONS</h2>
        </div>

        <?php if (FRAGFARM_DEMO_MODE): ?>
            <p class="mypage-detail__notice">포트폴리오 화면용 데모 쿠폰이며 주문 결제에는 적용되지 않습니다.</p>
        <?php endif; ?>

        <dl class="mypage-summary">
            <dt>사용 가능 쿠폰</dt>
            <dd><?= count($coupons) ?>장</dd>
        </dl>

        <section class="mypage-detail__section" aria-labelledby="coupon-list-title">
            <h3 id="coupon-list-title" class="mypage-detail__section-title">보유 쿠폰</h3>
            <?php if ($coupons): ?>
                <ul class="coupon-list">
                    <?php foreach ($coupons as $coupon): ?>
                        <li class="coupon-card">
                            <div class="coupon-card__head"><strong><?= htmlspecialchars($coupon['benefit'], ENT_QUOTES, 'UTF-8') ?></strong><span>사용 가능</span></div>
                            <h3><?= htmlspecialchars($coupon['name'], ENT_QUOTES, 'UTF-8') ?></h3>
                            <p><?= htmlspecialchars($coupon['condition'], ENT_QUOTES, 'UTF-8') ?></p>
                            <time datetime="<?= htmlspecialchars($coupon['expires_at'], ENT_QUOTES, 'UTF-8') ?>"><?= htmlspecialchars($coupon['expires_at'], ENT_QUOTES, 'UTF-8') ?>까지</time>
                        </li>
                    <?php endforeach; ?>
                </ul>
            <?php else: ?>
                <p class="mypage-detail__empty">사용 가능한 쿠폰이 없습니다.</p>
            <?php endif; ?>
        </section>
    </main>
    <?php include __DIR__ . '/../includes/footer.php'; ?>
</div>
<script src="<?= BASE_URL ?>/js/header.js"></script>
<?php if (FRAGFARM_DEMO_MODE): ?>
<script>window.FRAGFARM_BASE_URL = <?= json_encode(BASE_URL) ?>; window.FRAGFARM_DEMO_MODE = true;</script>
<script src="<?= BASE_URL ?>/js/mypage-detail.js"></script>
<?php endif; ?>
</body>
</html>

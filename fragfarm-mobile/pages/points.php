<?php
include __DIR__ . '/../includes/config.php';

if (!FRAGFARM_DEMO_MODE && empty($_SESSION['member_id'])) {
    $_SESSION['after_login_redirect'] = BASE_URL . '/pages/points.php';
    header('Location: ' . BASE_URL . '/pages/login.php');
    exit;
}

$pointBalance = FRAGFARM_DEMO_MODE ? 3000 : 0;
$pointHistory = FRAGFARM_DEMO_MODE ? [
    ['name' => '신규 회원 가입 적립', 'amount' => 3000, 'created_at' => '2026-07-14'],
] : [];
$pageTitle = 'Points | Fragfarm';
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
            <h2 class="page-heading__title">POINTS</h2>
        </div>

        <?php if (FRAGFARM_DEMO_MODE): ?>
            <p class="mypage-detail__notice">포트폴리오 화면용 데모 적립금이며 주문 결제에는 사용되지 않습니다.</p>
        <?php endif; ?>

        <dl class="mypage-summary">
            <dt>사용 가능 적립금</dt>
            <dd><?= number_format($pointBalance) ?> P</dd>
        </dl>

        <section class="mypage-detail__section" aria-labelledby="point-list-title">
            <h3 id="point-list-title" class="mypage-detail__section-title">적립 내역</h3>
            <?php if ($pointHistory): ?>
                <ul class="point-list">
                    <?php foreach ($pointHistory as $item): ?>
                        <li class="point-item">
                            <div><h3><?= htmlspecialchars($item['name'], ENT_QUOTES, 'UTF-8') ?></h3><time datetime="<?= htmlspecialchars($item['created_at'], ENT_QUOTES, 'UTF-8') ?>"><?= htmlspecialchars($item['created_at'], ENT_QUOTES, 'UTF-8') ?></time></div>
                            <strong>+<?= number_format($item['amount']) ?> P</strong>
                        </li>
                    <?php endforeach; ?>
                </ul>
            <?php else: ?>
                <p class="mypage-detail__empty">적립금 내역이 없습니다.</p>
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

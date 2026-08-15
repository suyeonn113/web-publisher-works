<?php
require_once __DIR__ . '/includes/config.php';

http_response_code(404);

$pageTitle = '페이지를 찾을 수 없습니다';
$pageCss = 'error.css';
?>

<!DOCTYPE html>
<html lang="ko">

<?php include __DIR__ . '/includes/head.php'; ?>

<body>
<div class="mobile-shell">
    <?php include __DIR__ . '/includes/header.php'; ?>

    <main id="main" class="system-message-page">
        <section class="system-message" aria-labelledby="not-found-title">
            <p class="system-message__code" aria-hidden="true">404</p>
            <h2 id="not-found-title" class="system-message__title">페이지를 찾을 수 없습니다.</h2>
            <p class="system-message__description">
                요청하신 페이지가 삭제되었거나 주소가 변경되었을 수 있습니다.<br>
                주소를 다시 확인하거나 다른 메뉴를 이용해주세요.
            </p>
            <div class="system-message__actions">
                <a class="system-message__action system-message__action--primary" href="<?= BASE_URL ?>/index.php">홈으로 돌아가기</a>
                <a class="system-message__action" href="<?= BASE_URL ?>/pages/product.php?category=all">상품 보기</a>
            </div>
        </section>
    </main>

    <?php include __DIR__ . '/includes/footer.php'; ?>
    <script src="<?= BASE_URL ?>/js/header.js"></script>
</div>
</body>
</html>

<?php
require_once __DIR__ . '/includes/config.php';

http_response_code(500);

$pageTitle = '페이지를 불러올 수 없습니다';
$pageCss = 'error.css';
?>

<!DOCTYPE html>
<html lang="ko">

<?php include __DIR__ . '/includes/head.php'; ?>

<body>
<div class="mobile-shell">
    <?php include __DIR__ . '/includes/header.php'; ?>

    <main id="main" class="system-message-page">
        <section class="system-message" aria-labelledby="error-title">
            <p class="system-message__code" aria-hidden="true">ERROR</p>
            <h2 id="error-title" class="system-message__title">페이지를 불러올 수 없습니다.</h2>
            <p class="system-message__description">
                일시적인 오류로 요청하신 화면을 표시하지 못했습니다.<br>
                잠시 후 다시 시도하거나 홈으로 돌아가주세요.
            </p>
            <div class="system-message__actions">
                <a class="system-message__action system-message__action--primary" href="<?= BASE_URL ?>/index.php">홈으로 돌아가기</a>
                <a class="system-message__action" href="">다시 시도하기</a>
            </div>
        </section>
    </main>

    <?php include __DIR__ . '/includes/footer.php'; ?>
    <script src="<?= BASE_URL ?>/js/header.js"></script>
</div>
</body>
</html>

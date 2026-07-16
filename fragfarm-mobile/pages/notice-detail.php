<?php
include __DIR__ . '/../includes/config.php';
require_once __DIR__ . '/../includes/services/notice-service.php';
require_once __DIR__ . '/../includes/view-helpers.php';

$postId = max(0, (int) ($_GET['id'] ?? 0));

if (notice_database_is_configured()) {
    require_once __DIR__ . '/../includes/dbconn.php';
    $post = notice_fetch_post($mysqli, $postId);
    mysqli_close($mysqli);
} else {
    require __DIR__ . '/../includes/data/notices.php';
    $post = notice_fetch_demo_post($noticePosts, $postId);
}

if (!$post) {
    header('Location: ' . BASE_URL . '/pages/notice.php');
    exit;
}

$pageTitle = $post['title'] . ' | Notice | Fragfarm';
$pageCss = 'notice.css';

?>

<!DOCTYPE html>
<html lang="ko">
<?php include __DIR__ . '/../includes/head.php'; ?>
<body>
<div class="mobile-shell">
    <?php include __DIR__ . '/../includes/header.php'; ?>

    <main id="main" class="board-page notice-detail">
        <div class="page-heading page-heading--back page-heading--contained">
            <a class="page-heading__back" href="<?= BASE_URL ?>/pages/notice.php" aria-label="공지사항 목록으로 돌아가기">
                <img src="<?= BASE_URL ?>/assets/icons/arrow-left.svg" alt="">
            </a>
            <h2 class="page-heading__title">NOTICE</h2>
        </div>

        <article class="notice-detail__article">
            <header class="notice-detail__header">
                <h3><?= e($post['title']) ?></h3>
                <time datetime="<?= e(date('Y-m-d', strtotime($post['created_at']))) ?>"><?= e(date('Y.m.d', strtotime($post['created_at']))) ?></time>
            </header>

            <div class="notice-detail__body">
                <?php if (!empty($post['image_src'])): ?>
                    <img src="<?= BASE_URL . e($post['image_src']) ?>" alt="">
                <?php endif; ?>
                <p><?= nl2br(e($post['content'])) ?></p>
            </div>

        </article>
    </main>

    <?php include __DIR__ . '/../includes/footer.php'; ?>
    <?php include __DIR__ . '/../includes/chat-launcher.php'; ?>
</div>
<script src="<?= BASE_URL ?>/js/header.js"></script>
</body>
</html>

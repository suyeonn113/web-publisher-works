<?php
include __DIR__ . '/../includes/config.php';
require_once __DIR__ . '/../includes/dbconn.php';
require_once __DIR__ . '/../includes/services/qna-service.php';

$postId = max(0, (int) ($_GET['id'] ?? 0));
$post = qna_fetch_post($mysqli, $postId);

mysqli_close($mysqli);

if (!$post) {
    header('Location: ' . BASE_URL . '/pages/qna.php');
    exit;
}

$pageTitle = $post['title'] . ' | QnA | Fragfarm';
$pageCss = 'shop-pages.css';

function e($value)
{
    return htmlspecialchars((string) $value, ENT_QUOTES, 'UTF-8');
}
?>

<!DOCTYPE html>
<html lang="ko">
<?php include __DIR__ . '/../includes/head.php'; ?>
<body>
<div class="mobile-shell">
    <?php include __DIR__ . '/../includes/header.php'; ?>

    <main id="main" class="board-page qna-detail">
        <h2 class="page-title board-title">QnA</h2>

        <article class="qna-detail__article">
            <header class="qna-detail__header">
                <h3><?= e($post['title']) ?></h3>
                <form class="board-search" method="get" action="<?= BASE_URL ?>/pages/qna.php">
                    <label class="visually-hidden" for="qna-detail-search">게시글 검색</label>
                    <input id="qna-detail-search" type="search" name="q" placeholder="What are you looking for?">
                    <button type="submit" aria-label="검색">
                        <img src="<?= BASE_URL ?>/assets/icons/search.svg" alt="">
                    </button>
                </form>
            </header>

            <div class="qna-detail__body">
                <?php if (!empty($post['image_src'])): ?>
                    <img src="<?= BASE_URL . e($post['image_src']) ?>" alt="">
                <?php endif; ?>
                <p><?= nl2br(e($post['content'])) ?></p>
            </div>

            <a class="qna-detail__list" href="<?= BASE_URL ?>/pages/qna.php">List</a>
        </article>
    </main>

    <?php include __DIR__ . '/../includes/footer.php'; ?>
    <?php include __DIR__ . '/../includes/chat-launcher.php'; ?>
</div>
<script src="<?= BASE_URL ?>/js/header.js"></script>
</body>
</html>

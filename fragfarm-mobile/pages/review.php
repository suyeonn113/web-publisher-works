<?php
include __DIR__ . '/../includes/config.php';
include __DIR__ . '/../includes/data/reviews.php';

$pageTitle = 'Review | Fragfarm';
$pageCss = 'review.css';
?>

<!DOCTYPE html>
<html lang="ko">

<?php include __DIR__ . '/../includes/head.php'; ?>

<body>
<div class="mobile-shell">
    <?php include __DIR__ . '/../includes/header.php'; ?>

    <main class="review-page" id="main">
        <h1 class="visually-hidden">Review</h1>

        <ul class="review-grid">
            <?php foreach ($reviews as $review): ?>
                <li class="review-grid__item">
                    <a class="review-card" href="<?= BASE_URL ?>/pages/review-detail.php?id=<?= htmlspecialchars($review['id'], ENT_QUOTES, 'UTF-8') ?>">
                        <span class="review-card__media">
                            <img
                                class="review-card__image"
                                src="<?= BASE_URL . htmlspecialchars($review['thumbnail'], ENT_QUOTES, 'UTF-8') ?>"
                                alt="<?= htmlspecialchars($review['title'], ENT_QUOTES, 'UTF-8') ?> 후기 이미지">
                            <span class="review-stars review-card__stars" aria-label="평점 <?= (int) $review['rating'] ?>점">
                                <?php for ($star = 1; $star <= 5; $star++): ?>
                                    <span class="<?= $star <= (int) $review['rating'] ? 'is-filled' : '' ?>" aria-hidden="true"></span>
                                <?php endfor; ?>
                            </span>
                        </span>
                        <strong class="review-card__title"><?= htmlspecialchars($review['title'], ENT_QUOTES, 'UTF-8') ?></strong>
                        <span class="review-card__author"><?= htmlspecialchars($review['author'], ENT_QUOTES, 'UTF-8') ?></span>
                    </a>
                </li>
            <?php endforeach; ?>
        </ul>

        <nav class="pagination review-pagination" aria-label="후기 페이지 이동">
            <span class="pagination__disabled" aria-disabled="true">&laquo;</span>
            <a href="<?= BASE_URL ?>/pages/review.php" aria-current="page">1</a>
            <?php for ($page = 2; $page <= 5; $page++): ?>
                <span class="pagination__disabled" aria-disabled="true"><?= $page ?></span>
            <?php endfor; ?>
            <span class="pagination__disabled" aria-disabled="true">&raquo;</span>
        </nav>
    </main>

    <?php include __DIR__ . '/../includes/footer.php'; ?>
    <?php include __DIR__ . '/../includes/chat-launcher.php'; ?>
</div>

<script src="<?= BASE_URL ?>/js/header.js"></script>
</body>
</html>

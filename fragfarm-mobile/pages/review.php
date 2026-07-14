<?php
include __DIR__ . '/../includes/config.php';
include __DIR__ . '/../includes/data/reviews.php';

$pageTitle = 'Review | Fragfarm';
$pageCss = 'review.css';
$initialReviewCount = 9;
?>

<!DOCTYPE html>
<html lang="ko">

<?php include __DIR__ . '/../includes/head.php'; ?>

<body>
<div class="mobile-shell">
    <?php include __DIR__ . '/../includes/header.php'; ?>

    <main class="review-page" id="main">
        <div class="page-heading page-heading--plain page-heading--contained">
            <h1 class="page-heading__title">REVIEW</h1>
        </div>

        <ul class="review-grid" id="review-grid" data-review-grid>
            <?php foreach ($reviews as $reviewIndex => $review): ?>
                <li class="review-grid__item" data-review-list-item <?= $reviewIndex >= $initialReviewCount ? 'hidden' : '' ?>>
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

        <div class="review-load-more" data-review-load-more-wrap <?= count($reviews) <= $initialReviewCount ? 'hidden' : '' ?>>
            <button type="button" data-review-load-more aria-controls="review-grid">MORE REVIEWS</button>
            <p class="visually-hidden" data-review-load-status aria-live="polite"></p>
        </div>

        <noscript>
            <style>
                .review-grid__item[hidden] { display: list-item !important; }
                .review-load-more { display: none !important; }
            </style>
        </noscript>
    </main>

    <?php include __DIR__ . '/../includes/footer.php'; ?>
    <?php include __DIR__ . '/../includes/chat-launcher.php'; ?>
</div>

<script src="<?= BASE_URL ?>/js/header.js"></script>
<script src="<?= BASE_URL ?>/js/review-list.js"></script>
</body>
</html>

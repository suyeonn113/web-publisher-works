<?php
include __DIR__ . '/../includes/config.php';
include __DIR__ . '/../includes/data/reviews.php';

$reviewId = (string) ($_GET['id'] ?? '');
$review = findReviewById($reviews, $reviewId);

if (!$review) {
    header('Location: ' . BASE_URL . '/pages/review.php');
    exit;
}

$pageTitle = $review['title'] . ' | Review | Fragfarm';
$pageCss = 'review.css';
$comments = $review['comments'] ?? [];
?>

<!DOCTYPE html>
<html lang="ko">

<?php include __DIR__ . '/../includes/head.php'; ?>

<body>
<div class="mobile-shell">
    <?php include __DIR__ . '/../includes/header.php'; ?>

    <main class="review-detail" id="main">
        <article class="review-detail__article">
            <a class="review-detail__back" href="<?= BASE_URL ?>/pages/review.php">Back to reviews</a>
            <h1 class="review-detail__product"><?= htmlspecialchars($review['product'], ENT_QUOTES, 'UTF-8') ?></h1>
            <p class="review-stars review-detail__stars" aria-label="평점 <?= (int) $review['rating'] ?>점">
                <?php for ($star = 1; $star <= 5; $star++): ?>
                    <span class="<?= $star <= (int) $review['rating'] ? 'is-filled' : '' ?>" aria-hidden="true"></span>
                <?php endfor; ?>
            </p>
            <p class="review-detail__meta">
                <?= htmlspecialchars($review['author'], ENT_QUOTES, 'UTF-8') ?>
                <span><?= htmlspecialchars($review['date'], ENT_QUOTES, 'UTF-8') ?></span>
            </p>
            <p class="review-detail__body">
                <?= nl2br(htmlspecialchars($review['body'], ENT_QUOTES, 'UTF-8')) ?>
            </p>

            <ul class="review-detail__gallery" aria-label="후기 이미지">
                <?php foreach ($review['images'] as $index => $image): ?>
                    <?php $imageUrl = BASE_URL . htmlspecialchars($image, ENT_QUOTES, 'UTF-8'); ?>
                    <li>
                        <button
                            class="review-detail__image-button"
                            type="button"
                            data-review-image="<?= $imageUrl ?>"
                            aria-label="후기 이미지 <?= $index + 1 ?> 크게 보기">
                            <img src="<?= $imageUrl ?>" alt="">
                        </button>
                    </li>
                <?php endforeach; ?>
            </ul>
        </article>

        <section class="review-comments" aria-labelledby="comments-title">
            <h2 id="comments-title" class="review-comments__title">COMMENTS (<?= count($comments) ?>)</h2>

            <?php foreach ($comments as $comment): ?>
                <article class="review-comment">
                    <h3 class="review-comment__author"><?= htmlspecialchars($comment['author'], ENT_QUOTES, 'UTF-8') ?></h3>
                    <p><?= nl2br(htmlspecialchars($comment['body'], ENT_QUOTES, 'UTF-8')) ?></p>
                </article>
            <?php endforeach; ?>

            <form class="review-comment-form">
                <label class="visually-hidden" for="review-comment">댓글 입력</label>
                <textarea id="review-comment" placeholder="로그인 후 이용해주세요.&#10;후기에 관한 의견을 남겨주세요." readonly></textarea>
                <button type="button" data-global-placeholder data-placeholder-message="로그인 후 댓글을 작성할 수 있습니다.">댓글쓰기</button>
            </form>
        </section>
    </main>

    <div class="review-image-modal" data-review-modal hidden>
        <button class="review-image-modal__dim" type="button" data-review-modal-close aria-label="큰 이미지 닫기"></button>
        <div class="review-image-modal__dialog" role="dialog" aria-modal="true" aria-label="후기 이미지 크게 보기">
            <button class="review-image-modal__close" type="button" data-review-modal-close aria-label="닫기">×</button>
            <img class="review-image-modal__image" data-review-modal-image src="" alt="">
        </div>
    </div>

    <?php include __DIR__ . '/../includes/footer.php'; ?>
    <?php include __DIR__ . '/../includes/chat-launcher.php'; ?>
</div>

<script src="<?= BASE_URL ?>/js/header.js"></script>
<script src="<?= BASE_URL ?>/js/review-detail.js"></script>
</body>
</html>

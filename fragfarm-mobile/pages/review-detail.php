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
$isLoggedIn = isset($_SESSION['member_id']);
$productId = (string) ($review['product_id'] ?? '');
$comments = $review['comments'] ?? [];

if (empty($_SESSION['product_feedback_csrf'])) {
    $_SESSION['product_feedback_csrf'] = bin2hex(random_bytes(32));
}

if (!FRAGFARM_DEMO_MODE) {
    require_once __DIR__ . '/../includes/dbconn.php';
    require_once __DIR__ . '/../includes/services/product-feedback.php';
    $commentGroups = feedback_fetch_review_comments($mysqli, $productId, (int) ($_SESSION['member_id'] ?? 0));
    if (isset($commentGroups[$reviewId])) $comments = array_merge($comments, $commentGroups[$reviewId]);
    mysqli_close($mysqli);
}
?>

<!DOCTYPE html>
<html lang="ko">

<?php include __DIR__ . '/../includes/head.php'; ?>

<body>
<div class="mobile-shell">
    <?php include __DIR__ . '/../includes/header.php'; ?>

    <main class="review-detail" id="main">
        <div class="page-heading page-heading--back page-heading--contained">
            <a class="page-heading__back" href="<?= BASE_URL ?>/pages/review.php" aria-label="리뷰 목록으로 돌아가기">
                <img src="<?= BASE_URL ?>/assets/icons/arrow-left.svg" alt="">
            </a>
            <h2 class="page-heading__title">REVIEW</h2>
        </div>

        <article class="review-detail__article">
            <h1 class="review-detail__product">
                <a href="<?= BASE_URL ?>/pages/product-detail.php?id=<?= rawurlencode($productId) ?>">
                    <?= htmlspecialchars($review['product'], ENT_QUOTES, 'UTF-8') ?>
                </a>
            </h1>
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

            <ul class="review-detail__gallery" aria-label="후기 이미지. 좌우 방향키로 이동" tabindex="0" data-keyboard-scroll>
                <?php foreach ($review['images'] as $index => $image): ?>
                    <?php $imageUrl = BASE_URL . htmlspecialchars($image, ENT_QUOTES, 'UTF-8'); ?>
                    <li>
                        <button
                            class="review-detail__image-button"
                            type="button"
                            data-review-image="<?= $imageUrl ?>"
                            aria-haspopup="dialog"
                            aria-label="후기 이미지 <?= $index + 1 ?> 크게 보기">
                            <img src="<?= $imageUrl ?>" alt="">
                        </button>
                    </li>
                <?php endforeach; ?>
            </ul>
        </article>

        <section class="review-comments" aria-labelledby="comments-title" data-review-detail-comments="<?= htmlspecialchars($reviewId, ENT_QUOTES, 'UTF-8') ?>">
            <h2 id="comments-title" class="review-comments__title" data-review-detail-comment-count data-base-count="<?= count($comments) ?>">COMMENTS (<?= count($comments) ?>)</h2>

            <div data-review-detail-comment-list>
                <?php foreach ($comments as $comment): ?>
                    <article class="review-comment">
                        <h3 class="review-comment__author"><?= htmlspecialchars($comment['author'], ENT_QUOTES, 'UTF-8') ?></h3>
                        <?php if ($isLoggedIn && !empty($comment['own']) && !empty($comment['id'])): ?>
                            <form class="review-comment__delete" action="<?= BASE_URL ?>/actions/review_comment_delete.php" method="post">
                                <input type="hidden" name="csrf_token" value="<?= htmlspecialchars($_SESSION['product_feedback_csrf'], ENT_QUOTES, 'UTF-8') ?>">
                                <input type="hidden" name="product_id" value="<?= htmlspecialchars($productId, ENT_QUOTES, 'UTF-8') ?>">
                                <input type="hidden" name="review_key" value="<?= htmlspecialchars($reviewId, ENT_QUOTES, 'UTF-8') ?>">
                                <input type="hidden" name="comment_id" value="<?= (int) $comment['id'] ?>">
                                <button type="submit" aria-label="내 댓글 삭제"><img src="<?= BASE_URL ?>/assets/icons/close.svg" alt=""></button>
                            </form>
                        <?php endif; ?>
                        <p><?= nl2br(htmlspecialchars($comment['body'], ENT_QUOTES, 'UTF-8')) ?></p>
                    </article>
                <?php endforeach; ?>
            </div>

            <form class="review-comment-form" action="<?= BASE_URL ?>/actions/review_comment_create.php" method="post" data-demo-review-detail-comment>
                <input type="hidden" name="csrf_token" value="<?= htmlspecialchars($_SESSION['product_feedback_csrf'], ENT_QUOTES, 'UTF-8') ?>">
                <input type="hidden" name="product_id" value="<?= htmlspecialchars($productId, ENT_QUOTES, 'UTF-8') ?>">
                <input type="hidden" name="review_key" value="<?= htmlspecialchars($reviewId, ENT_QUOTES, 'UTF-8') ?>">
                <label class="visually-hidden" for="review-comment">댓글 입력</label>
                <textarea class="form-textarea form-textarea--compact" id="review-comment" name="comment" maxlength="500" placeholder="<?= $isLoggedIn ? '후기에 관한 의견을 남겨주세요.' : '로그인 후 이용해주세요.' ?>" <?= $isLoggedIn ? '' : 'readonly' ?>></textarea>
                <button type="submit">댓글쓰기</button>
            </form>
        </section>
    </main>

    <div class="review-image-modal" data-review-modal hidden>
        <button class="review-image-modal__dim" type="button" data-review-modal-close aria-label="큰 이미지 닫기"></button>
        <div class="review-image-modal__dialog" role="dialog" aria-modal="true" aria-label="후기 이미지 크게 보기">
            <button class="review-image-modal__close" type="button" data-review-modal-close aria-label="닫기"><img src="<?= BASE_URL ?>/assets/icons/close.svg" alt=""></button>
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

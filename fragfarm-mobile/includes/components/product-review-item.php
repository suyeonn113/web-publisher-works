<?php
$reviewKey = (string) ($review['review_key'] ?? 'sample-' . ($reviewIndex + 1));
$reviewId = !empty($review['db_id'])
    ? 'review-' . (int) $review['db_id']
    : 'review-' . e($reviewKey);
$reviewImages = array_values(array_filter($review['images'] ?? []));
$reviewDate = str_replace('.', '-', (string) ($review['date'] ?? ''));
$reviewTimestamp = strtotime($reviewDate);
?>

<details
    class="review-item"
    id="<?= $reviewId ?>"
    data-review-item
    data-review-score-value="<?= (int) $review['score'] ?>"
    data-review-has-photo="<?= $reviewImages ? 'true' : 'false' ?>"
    data-review-timestamp="<?= $reviewTimestamp === false ? 0 : $reviewTimestamp * 1000 ?>">
    <summary class="review-item__summary">
        <span class="review-stars" aria-label="<?= (int) $review['score'] ?>점">
            <?php for ($star = 1; $star <= 5; $star++): ?>
                <span class="<?= $star <= (int) $review['score'] ? 'is-filled' : '' ?>" aria-hidden="true"></span>
            <?php endfor; ?>
        </span>
        <span class="review-item__meta">
            <b><?= e($review['name']) ?></b>
            <time><?= e($review['date']) ?></time>
        </span>
        <span class="review-item__text"><?= e($review['content']) ?></span>
        <?php if ($reviewImages): ?>
            <span class="review-item__media-preview" data-review-media-preview aria-label="리뷰 이미지 <?= count($reviewImages) ?>장">
                <span class="review-item__media-preview-track" data-review-media-preview-track>
                    <?php foreach ($reviewImages as $imageIndex => $image): ?>
                        <img class="review-item__thumb" src="<?= e($image) ?>" alt="리뷰 이미지 <?= $imageIndex + 1 ?>" loading="lazy">
                    <?php endforeach; ?>
                </span>
                <span class="review-item__more" aria-hidden="true">+</span>
            </span>
        <?php endif; ?>
    </summary>

    <div class="review-item__body">
        <?php if ($isLoggedIn && !empty($review['own']) && !empty($review['db_id'])): ?>
            <form action="<?= BASE_URL ?>/actions/review_delete.php" method="post" class="feedback-delete-form">
                <?= csrf_input('product_feedback') ?>
                <input type="hidden" name="product_id" value="<?= $id ?>">
                <input type="hidden" name="review_id" value="<?= (int) $review['db_id'] ?>">
                <button type="submit">내 리뷰 삭제</button>
            </form>
        <?php endif; ?>

        <?php if ($reviewImages): ?>
            <div class="review-item__media-scroll" aria-label="리뷰 이미지 목록">
                <?php foreach ($reviewImages as $imageIndex => $image): ?>
                    <button
                        class="review-item__image-button"
                        type="button"
                        data-review-image="<?= e($image) ?>"
                        aria-haspopup="dialog"
                        aria-label="리뷰 이미지 <?= $imageIndex + 1 ?> 크게 보기">
                        <img class="review-item__image" src="<?= e($image) ?>" alt="" loading="lazy">
                    </button>
                <?php endforeach; ?>
            </div>
        <?php endif; ?>

        <div class="review-comments" aria-label="리뷰 댓글" data-review-comments="<?= e($reviewKey) ?>">
            <h3 data-review-comment-count data-base-count="<?= count($review['comments']) ?>">COMMENTS (<?= count($review['comments']) ?>)</h3>
            <div data-review-comment-list>
                <?php foreach ($review['comments'] as $comment): ?>
                    <div class="review-comment">
                        <strong><?= e($comment['author']) ?></strong>
                        <?php if ($isLoggedIn && !empty($comment['own']) && !empty($comment['id'])): ?>
                            <form class="review-comment__delete" action="<?= BASE_URL ?>/actions/review_comment_delete.php" method="post">
                                <?= csrf_input('product_feedback') ?>
                                <input type="hidden" name="product_id" value="<?= $id ?>">
                                <input type="hidden" name="review_key" value="<?= e($reviewKey) ?>">
                                <input type="hidden" name="comment_id" value="<?= (int) $comment['id'] ?>">
                                <button type="submit" aria-label="내 댓글 삭제"><img src="<?= BASE_URL ?>/assets/icons/close.svg" alt=""></button>
                            </form>
                        <?php endif; ?>
                        <p><?= e($comment['body']) ?></p>
                    </div>
                <?php endforeach; ?>
            </div>

            <form class="review-comment-form" action="<?= BASE_URL ?>/actions/review_comment_create.php" method="post" data-demo-review-comment>
                <?= csrf_input('product_feedback') ?>
                <input type="hidden" name="product_id" value="<?= $id ?>">
                <input type="hidden" name="review_key" value="<?= e($reviewKey) ?>">
                <textarea class="form-textarea form-textarea--compact" name="comment" rows="2" maxlength="500" aria-label="리뷰 댓글" placeholder="<?= $isLoggedIn ? '댓글을 남겨주세요.' : '로그인 후 이용해주세요.' ?>" <?= $isLoggedIn ? '' : 'readonly data-login-required' ?>></textarea>
                <button class="feedback-submit" type="submit" <?= $isLoggedIn ? '' : 'data-login-required' ?>>댓글 등록하기</button>
            </form>
        </div>
    </div>
</details>

<?php
$reviewKey = (string) ($review['review_key'] ?? 'sample-' . ($reviewIndex + 1));
$reviewId = !empty($review['db_id'])
    ? 'review-' . (int) $review['db_id']
    : 'review-' . e($reviewKey);
?>

<details class="review-item" id="<?= $reviewId ?>"<?= $reviewIndex >= 5 ? ' hidden' : '' ?>>
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
        <span class="review-item__text review-item__text--preview"><?= e($review['content']) ?></span>
        <span class="review-item__text review-item__text--full"><?= e($review['content']) ?></span>
        <?php if (!empty($review['images'][0])): ?>
            <img class="review-item__thumb" src="<?= e($review['images'][0]) ?>" alt="">
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

        <?php foreach ($review['images'] as $image): ?>
            <img class="review-item__image" src="<?= e($image) ?>" alt="">
        <?php endforeach; ?>

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
                <button type="submit" <?= $isLoggedIn ? '' : 'data-login-required' ?>>등록</button>
            </form>
        </div>
    </div>
</details>

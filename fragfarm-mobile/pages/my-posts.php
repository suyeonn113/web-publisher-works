<?php
require_once __DIR__ . '/../includes/config.php';
require_once __DIR__ . '/../includes/data/products.php';
require_once __DIR__ . '/../includes/view-helpers.php';
require_once __DIR__ . '/../includes/security.php';

if (!FRAGFARM_DEMO_MODE && empty($_SESSION['member_id'])) {
    $_SESSION['after_login_redirect'] = BASE_URL . '/pages/my-posts.php';
    header('Location: ' . BASE_URL . '/pages/login.php');
    exit;
}

function my_posts_date($value): string
{
    $timestamp = strtotime((string) $value);
    return $timestamp ? date('Y.m.d H:i', $timestamp) : '';
}

function my_posts_review_fragment(string $reviewKey): string
{
    if (preg_match('/^db-(\d+)$/', $reviewKey, $matches)) return 'review-' . $matches[1];
    return 'review-' . preg_replace('/[^a-zA-Z0-9_-]/', '', $reviewKey);
}

function my_posts_review_url(string $productId, string $reviewKey): string
{
    if (preg_match('/^moment-\d{3}$/', $reviewKey)) {
        return BASE_URL . '/pages/review-detail.php?id=' . rawurlencode($reviewKey) . '#comments-title';
    }
    return BASE_URL . '/pages/product-detail.php?id=' . rawurlencode($productId) . '#' . rawurlencode(my_posts_review_fragment($reviewKey));
}

$productNames = [];
foreach ($products as $productItem) {
    $productNames[(string) ($productItem['id'] ?? '')] = (string) ($productItem['name'] ?? '상품');
}

$requestedTab = (string) ($_GET['tab'] ?? 'reviews');
$activeTab = in_array($requestedTab, ['reviews', 'comments', 'qna'], true) ? $requestedTab : 'reviews';
$reviewItems = [];
$commentItems = [];
$qnaItems = [];

if (!FRAGFARM_DEMO_MODE) {
    require_once __DIR__ . '/../includes/dbconn.php';
    require_once __DIR__ . '/../includes/services/product-feedback.php';
    $memberId = (int) $_SESSION['member_id'];
    $reviewItems = feedback_fetch_member_reviews($mysqli, $memberId);
    $commentItems = feedback_fetch_member_review_comments($mysqli, $memberId);
    $qnaItems = feedback_fetch_member_qna($mysqli, $memberId);
    mysqli_close($mysqli);
}

$pageTitle = 'My Posts | Fragfarm';
$pageCss = 'my-posts.css';
$flashError = (string) ($_SESSION['my_posts_error'] ?? '');
unset($_SESSION['my_posts_error']);
?>
<!DOCTYPE html>
<html lang="ko">
<?php include __DIR__ . '/../includes/head.php'; ?>
<body>
<div class="mobile-shell">
    <?php include __DIR__ . '/../includes/header.php'; ?>

    <main id="main" class="my-posts" data-active-tab="<?= $activeTab ?>">
        <div class="page-heading page-heading--back page-heading--contained">
            <a class="page-heading__back" href="<?= BASE_URL ?>/pages/mypage.php" aria-label="마이페이지로 돌아가기"><img src="<?= BASE_URL ?>/assets/icons/arrow-left.svg" alt=""></a>
            <h2 class="page-heading__title">MY POSTS</h2>
        </div>

        <?php if ($flashError !== ''): ?>
            <p class="my-posts__error" role="alert"><?= e($flashError) ?></p>
        <?php endif; ?>

        <nav class="section-tabs" aria-label="내가 쓴 글 종류">
            <a href="<?= BASE_URL ?>/pages/my-posts.php?tab=reviews" <?= $activeTab === 'reviews' ? 'aria-current="page"' : '' ?>>리뷰 <span data-my-review-count>(<?= count($reviewItems) ?>)</span></a>
            <a href="<?= BASE_URL ?>/pages/my-posts.php?tab=comments" <?= $activeTab === 'comments' ? 'aria-current="page"' : '' ?>>댓글 <span data-my-comment-count>(<?= count($commentItems) ?>)</span></a>
            <a href="<?= BASE_URL ?>/pages/my-posts.php?tab=qna" <?= $activeTab === 'qna' ? 'aria-current="page"' : '' ?>>Q&amp;A <span data-my-qna-count>(<?= count($qnaItems) ?>)</span></a>
        </nav>

        <section class="my-posts__panel" data-my-posts-panel="reviews" <?= $activeTab !== 'reviews' ? 'hidden' : '' ?>>
            <h3 class="visually-hidden">내가 작성한 리뷰</h3>
            <div class="my-posts__list" data-my-review-list>
                <?php foreach ($reviewItems as $review): ?>
                    <?php $productId = (string) $review['product_id']; $reviewId = (int) $review['id']; ?>
                    <article class="my-post" id="review-<?= $reviewId ?>">
                        <div class="my-post__head">
                            <a href="<?= BASE_URL ?>/pages/product-detail.php?id=<?= rawurlencode($productId) ?>#review-<?= $reviewId ?>"><?= e($productNames[$productId] ?? $productId) ?></a>
                            <time><?= e(my_posts_date($review['updated_at'] ?: $review['created_at'])) ?></time>
                        </div>
                        <p class="my-post__rating" aria-label="평점 <?= (int) $review['rating'] ?>점">★ <?= (int) $review['rating'] ?> / 5</p>
                        <p class="my-post__content"><?= nl2br(e($review['content'])) ?></p>
                        <div class="my-post__actions">
                            <a href="<?= BASE_URL ?>/pages/product-detail.php?id=<?= rawurlencode($productId) ?>#review-<?= $reviewId ?>">상품에서 보기</a>
                            <button type="button" data-post-edit-toggle>수정</button>
                        </div>
                        <form class="my-post__edit" action="<?= BASE_URL ?>/actions/review_update.php" method="post" data-post-edit-form hidden>
                            <?= csrf_input('product_feedback') ?>
                            <input type="hidden" name="review_id" value="<?= $reviewId ?>">
                            <input type="hidden" name="product_id" value="<?= e($productId) ?>">
                            <label>별점
                                <select name="rating">
                                    <?php for ($score = 5; $score >= 1; $score--): ?>
                                        <option value="<?= $score ?>" <?= (int) $review['rating'] === $score ? 'selected' : '' ?>><?= $score ?>점</option>
                                    <?php endfor; ?>
                                </select>
                            </label>
                            <label>후기 내용<textarea class="form-textarea form-textarea--large" name="review" rows="5" maxlength="2000" required><?= e($review['content']) ?></textarea></label>
                            <button type="submit">수정 저장</button>
                        </form>
                    </article>
                <?php endforeach; ?>
            </div>
            <p class="my-posts__empty" data-my-review-empty <?= count($reviewItems) > 0 ? 'hidden' : '' ?>>작성한 리뷰가 없습니다.</p>
        </section>

        <section class="my-posts__panel" data-my-posts-panel="comments" <?= $activeTab !== 'comments' ? 'hidden' : '' ?>>
            <h3 class="visually-hidden">내가 작성한 리뷰 댓글</h3>
            <div class="my-posts__list" data-my-comment-list>
                <?php foreach ($commentItems as $comment): ?>
                    <?php
                        $productId = (string) $comment['product_id'];
                        $commentId = (int) $comment['id'];
                        $reviewKey = (string) $comment['review_key'];
                        $reviewUrl = my_posts_review_url($productId, $reviewKey);
                    ?>
                    <article class="my-post" id="comment-<?= $commentId ?>">
                        <div class="my-post__head">
                            <a href="<?= e($reviewUrl) ?>"><?= e($productNames[$productId] ?? $productId) ?></a>
                            <time><?= e(my_posts_date($comment['updated_at'] ?: $comment['created_at'])) ?></time>
                        </div>
                        <p class="my-post__content"><?= nl2br(e($comment['content'])) ?></p>
                        <div class="my-post__actions">
                            <a href="<?= e($reviewUrl) ?>">댓글 위치 보기</a>
                            <button type="button" data-post-edit-toggle>수정</button>
                        </div>
                        <form class="my-post__edit" action="<?= BASE_URL ?>/actions/review_comment_update.php" method="post" data-post-edit-form hidden>
                            <?= csrf_input('product_feedback') ?>
                            <input type="hidden" name="comment_id" value="<?= $commentId ?>">
                            <input type="hidden" name="product_id" value="<?= e($productId) ?>">
                            <input type="hidden" name="review_key" value="<?= e($reviewKey) ?>">
                            <label>댓글 내용<textarea class="form-textarea form-textarea--compact" name="comment" rows="4" maxlength="500" required><?= e($comment['content']) ?></textarea></label>
                            <button type="submit">수정 저장</button>
                        </form>
                    </article>
                <?php endforeach; ?>
            </div>
            <p class="my-posts__empty" data-my-comment-empty <?= count($commentItems) > 0 ? 'hidden' : '' ?>>작성한 댓글이 없습니다.</p>
        </section>

        <section class="my-posts__panel" data-my-posts-panel="qna" <?= $activeTab !== 'qna' ? 'hidden' : '' ?>>
            <h3 class="visually-hidden">내가 작성한 Q&amp;A</h3>
            <div class="my-posts__list" data-my-qna-list>
                <?php foreach ($qnaItems as $qna): ?>
                    <?php $productId = (string) $qna['product_id']; $qnaId = (int) $qna['id']; ?>
                    <article class="my-post" id="qna-<?= $qnaId ?>">
                        <div class="my-post__head">
                            <a href="<?= BASE_URL ?>/pages/product-detail.php?id=<?= rawurlencode($productId) ?>#qna-<?= $qnaId ?>"><?= e($productNames[$productId] ?? $productId) ?></a>
                            <time><?= e(my_posts_date($qna['updated_at'] ?: $qna['created_at'])) ?></time>
                        </div>
                        <p class="my-post__content"><?= nl2br(e($qna['content'])) ?></p>
                        <p class="my-post__secret"><?= !empty($qna['is_secret']) ? '비밀글' : '공개글' ?></p>
                        <div class="my-post__answer <?= trim((string) ($qna['answer_content'] ?? '')) !== '' ? 'is-complete' : '' ?>">
                            <strong><?= trim((string) ($qna['answer_content'] ?? '')) !== '' ? '답변 완료' : '답변 대기' ?></strong>
                            <?php if (trim((string) ($qna['answer_content'] ?? '')) !== ''): ?>
                                <p><?= nl2br(e($qna['answer_content'])) ?></p>
                                <?php if (!empty($qna['answered_at'])): ?><time><?= e(my_posts_date($qna['answered_at'])) ?></time><?php endif; ?>
                            <?php endif; ?>
                        </div>
                        <div class="my-post__actions">
                            <a href="<?= BASE_URL ?>/pages/product-detail.php?id=<?= rawurlencode($productId) ?>#qna-<?= $qnaId ?>">상품에서 보기</a>
                            <button type="button" data-post-edit-toggle>수정</button>
                        </div>
                        <form class="my-post__edit" action="<?= BASE_URL ?>/actions/product_qna_update.php" method="post" data-post-edit-form hidden>
                            <?= csrf_input('product_feedback') ?>
                            <input type="hidden" name="qna_id" value="<?= $qnaId ?>">
                            <input type="hidden" name="product_id" value="<?= e($productId) ?>">
                            <label>문의 내용<textarea class="form-textarea form-textarea--large" name="qna" rows="5" maxlength="2000" required><?= e($qna['content']) ?></textarea></label>
                            <label class="my-post__secret-check"><input type="checkbox" name="is_secret" value="1" <?= !empty($qna['is_secret']) ? 'checked' : '' ?>> 비밀글</label>
                            <button type="submit">수정 저장</button>
                        </form>
                    </article>
                <?php endforeach; ?>
            </div>
            <p class="my-posts__empty" data-my-qna-empty <?= count($qnaItems) > 0 ? 'hidden' : '' ?>>작성한 Q&amp;A가 없습니다.</p>
        </section>
    </main>

    <?php include __DIR__ . '/../includes/footer.php'; ?>
</div>

<script type="application/json" id="my-posts-product-names"><?= json_encode($productNames, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_HEX_TAG | JSON_HEX_AMP | JSON_HEX_APOS | JSON_HEX_QUOT) ?></script>
<script src="<?= BASE_URL ?>/js/header.js"></script>
<script src="<?= BASE_URL ?>/js/my-posts.js"></script>
</body>
</html>

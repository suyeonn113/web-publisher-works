<?php
include __DIR__ . '/../includes/config.php';
include __DIR__ . '/../includes/data/reviews.php';
include __DIR__ . '/../includes/data/products.php';

$pageTitle = 'Review | Fragfarm';
$pageCss = 'review.css';
$reviewProductsById = [];
$reviewProductsByName = [];
$normalizeProductName = static function (string $name, bool $withoutVariant = false): string {
    $normalized = strtolower(trim((string) preg_replace('/\s+/u', ' ', $name)));

    if ($withoutVariant) {
        $normalized = trim((string) preg_replace('/\s*\([^)]*\)\s*$/u', '', $normalized));
    }

    return $normalized;
};

foreach ($products as $product) {
    $productId = trim((string) ($product['id'] ?? ''));
    $productName = trim((string) ($product['name'] ?? ''));

    if ($productId === '' || $productName === '') {
        continue;
    }

    $reviewProductsById[$productId] = $product;
    $reviewProductsByName[$normalizeProductName($productName)] = $product;
}
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

        <form class="review-toolbar" role="search" data-review-toolbar>
            <div class="review-toolbar__search">
                <label class="visually-hidden" for="review-search">리뷰 검색</label>
                <input id="review-search" type="search" placeholder="Search reviews" data-review-search>
                <button type="submit" aria-label="리뷰 검색">
                    <img src="<?= BASE_URL ?>/assets/icons/search.svg" alt="">
                </button>
            </div>
            <div class="review-toolbar__sort">
                <label class="visually-hidden" for="review-sort">리뷰 정렬</label>
                <select id="review-sort" class="list-sort" data-review-sort>
                    <option value="latest">최신순</option>
                    <option value="rating-desc">별점 높은 순</option>
                    <option value="rating-asc">별점 낮은 순</option>
                </select>
            </div>
        </form>

        <p class="review-empty" data-review-empty hidden>검색 결과가 없습니다.</p>

        <ul class="review-grid" id="review-grid" data-review-grid>
            <?php foreach ($reviews as $review): ?>
                <?php
                    $reviewImages = array_values($review['images'] ?? []);
                    $reviewThumbnail = $reviewImages[0] ?? ($review['thumbnail'] ?? '');
                    $productThumbnail = $reviewThumbnail;

                    foreach ($reviewImages as $reviewImage) {
                        if (str_contains((string) $reviewImage, '/assets/images/products/')) {
                            $productThumbnail = $reviewImage;
                            break;
                        }
                    }

                    $reviewProductId = trim((string) ($review['product_id'] ?? ''));
                    $reviewProductName = trim((string) ($review['product'] ?? ''));
                    $reviewProduct = $reviewProductsByName[$normalizeProductName($reviewProductName)] ?? null;
                    $idProduct = $reviewProductsById[$reviewProductId] ?? null;

                    if (
                        $reviewProduct === null
                        && $idProduct !== null
                        && $normalizeProductName($reviewProductName, true) === $normalizeProductName((string) ($idProduct['name'] ?? ''), true)
                    ) {
                        $reviewProduct = $idProduct;
                    }

                    $isProductAvailable = $reviewProduct !== null && empty($reviewProduct['soldOut']);
                    $productDetailId = $isProductAvailable ? (string) ($reviewProduct['id'] ?? '') : '';
                ?>
                <?php
                    $reviewDate = str_replace('.', '-', (string) ($review['date'] ?? ''));
                    $reviewTimestamp = strtotime($reviewDate);
                    $reviewSearchText = implode(' ', [
                        (string) ($review['title'] ?? ''),
                        (string) ($review['body'] ?? ''),
                        (string) ($review['author'] ?? ''),
                        (string) ($review['product'] ?? ''),
                    ]);
                ?>
                <li
                    class="review-grid__item"
                    data-review-list-item
                    data-review-rating="<?= (int) ($review['rating'] ?? 0) ?>"
                    data-review-timestamp="<?= $reviewTimestamp === false ? 0 : $reviewTimestamp * 1000 ?>"
                    data-review-search-text="<?= htmlspecialchars($reviewSearchText, ENT_QUOTES, 'UTF-8') ?>">
                    <article class="review-card">
                        <a class="review-card__content" href="<?= BASE_URL ?>/pages/review-detail.php?id=<?= htmlspecialchars($review['id'], ENT_QUOTES, 'UTF-8') ?>">
                            <span class="review-card__media">
                                <img
                                    class="review-card__image"
                                    src="<?= BASE_URL . htmlspecialchars($reviewThumbnail, ENT_QUOTES, 'UTF-8') ?>"
                                    alt="<?= htmlspecialchars($review['title'], ENT_QUOTES, 'UTF-8') ?> 후기 첫 번째 첨부 이미지">
                                <span class="review-stars review-card__stars" aria-label="평점 <?= (int) $review['rating'] ?>점">
                                    <?php for ($star = 1; $star <= 5; $star++): ?>
                                        <span class="<?= $star <= (int) $review['rating'] ? 'is-filled' : '' ?>" aria-hidden="true"></span>
                                    <?php endfor; ?>
                                </span>
                            </span>
                            <strong class="review-card__title"><?= htmlspecialchars($review['title'], ENT_QUOTES, 'UTF-8') ?></strong>
                            <span class="review-card__body"><?= htmlspecialchars($review['body'], ENT_QUOTES, 'UTF-8') ?></span>
                            <span class="review-card__author"><?= htmlspecialchars($review['author'], ENT_QUOTES, 'UTF-8') ?></span>
                        </a>
                        <div class="review-card__product">
                            <img
                                class="review-card__product-image"
                                src="<?= BASE_URL . htmlspecialchars($productThumbnail, ENT_QUOTES, 'UTF-8') ?>"
                                alt="<?= htmlspecialchars($review['product'], ENT_QUOTES, 'UTF-8') ?> 상품 이미지">
                            <span class="review-card__product-name"><?= htmlspecialchars($review['product'], ENT_QUOTES, 'UTF-8') ?></span>
                            <?php if ($productDetailId !== ''): ?>
                                <a class="review-card__product-link" href="<?= BASE_URL ?>/pages/product-detail.php?id=<?= rawurlencode($productDetailId) ?>">상품 보기</a>
                            <?php else: ?>
                                <span class="review-card__product-status">품절</span>
                            <?php endif; ?>
                        </div>
                    </article>
                </li>
            <?php endforeach; ?>
        </ul>

        <div class="review-load-more" data-review-load-more-wrap hidden>
            <button type="button" data-review-load-more aria-controls="review-grid">MORE REVIEWS</button>
            <p class="visually-hidden" data-review-load-status aria-live="polite"></p>
        </div>

    </main>

    <?php include __DIR__ . '/../includes/footer.php'; ?>
    <?php include __DIR__ . '/../includes/chat-launcher.php'; ?>
</div>

<script src="<?= BASE_URL ?>/js/header.js"></script>
<script src="<?= BASE_URL ?>/js/review-list.js"></script>
</body>
</html>

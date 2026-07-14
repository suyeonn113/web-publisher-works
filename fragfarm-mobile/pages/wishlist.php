<?php
include __DIR__ . '/../includes/config.php';
include __DIR__ . '/../includes/data/products.php';
require_once __DIR__ . '/../includes/services/shop-state.php';

$pageTitle = 'Wishlist | Fragfarm';
$pageCss = 'shop-pages.css';
$page = max(1, min(2, (int) ($_GET['page'] ?? 1)));
$sampleItems = shop_sample_items($products);
?>

<!DOCTYPE html>
<html lang="ko">
<?php include __DIR__ . '/../includes/head.php'; ?>
<body>
<div class="mobile-shell">
    <?php include __DIR__ . '/../includes/header.php'; ?>

    <main id="main" class="bag-page" data-shop-page="wishlist" data-wishlist-page="<?= $page ?>">
        <nav class="bag-tabs" aria-label="장바구니와 찜목록">
            <a href="<?= BASE_URL ?>/pages/cart.php">CART (<span data-cart-count>0</span>)</a>
            <a href="<?= BASE_URL ?>/pages/wishlist.php" aria-current="page">WISHLIST (<span data-wishlist-count>0</span>)</a>
        </nav>

        <div class="bag-control">
            <label class="visually-hidden" for="wishlist-sort">찜목록 정렬</label>
            <select class="bag-sort" id="wishlist-sort" data-wishlist-sort>
                <option value="latest">최신순</option>
                <option value="oldest">오래된순</option>
            </select>
        </div>

        <ul class="bag-list" data-wishlist-list></ul>
        <p class="empty-message" data-wishlist-empty hidden>찜한 상품이 없습니다.</p>

        <nav class="pagination" data-wishlist-pagination aria-label="찜목록 페이지 이동" hidden></nav>
    </main>

    <?php include __DIR__ . '/../includes/footer.php'; ?>
    <?php include __DIR__ . '/../includes/chat-launcher.php'; ?>
</div>
<script type="application/json" id="shop-sample-data"><?= json_encode($sampleItems, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES) ?></script>
<script src="<?= BASE_URL ?>/js/header.js"></script>
<script src="<?= BASE_URL ?>/js/shop-storage.js"></script>
</body>
</html>

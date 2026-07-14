<?php
include __DIR__ . '/../includes/config.php';
include __DIR__ . '/../includes/data/products.php';
include __DIR__ . '/../includes/services/product-list-state.php';
require_once __DIR__ . '/../includes/services/shop-state.php';

$pageTitle = 'Fragfarm';
$pageCss = 'product.css';

$state = normalizeProductListState($_GET);
$productList = applyProductListState($products, $state);

$currentCategory = $state['category'];
$currentSort = $state['sort'];
$currentView = $state['view'];
$currentPage = $productList['currentPage'];

$totalProducts = $productList['totalProducts'];
$totalPages = $productList['totalPages'];
$visibleProducts = $productList['items'];
$sampleItems = shop_sample_items($products);
?>

<!DOCTYPE html>
<html lang="ko">

<!------------ Head ------------>
<?php include __DIR__ . '/../includes/head.php'; ?>

<body>
<div class="mobile-shell">
    <!-- Header -->
    <?php include __DIR__ . '/../includes/header.php'; ?>

    <main id="main">
        <!-- Category -->
        <nav class="category-nav" aria-label="상품 카테고리">
            <ul class="category-nav__list">
                <li>
                    <a href="<?= buildProductListUrl($state, ['category' => 'sale', 'page' => 1]) ?>"
                    data-category="sale"
                    <?= $currentCategory === 'sale' ? 'aria-current="page"' : '' ?>>
                        SALE
                    </a>
                </li>
                <li>
                    <a href="<?= buildProductListUrl($state, ['category' => 'all', 'page' => 1]) ?>"
                    data-category="all"
                    <?= $currentCategory === 'all' ? 'aria-current="page"' : '' ?>>
                        ALL
                    </a>
                </li>
                <li>
                    <a href="<?= buildProductListUrl($state, ['category' => 'new', 'page' => 1]) ?>"
                    data-category="new"
                    <?= $currentCategory === 'new' ? 'aria-current="page"' : '' ?>>
                        NEW
                    </a>
                </li>
                <li>
                    <a href="<?= buildProductListUrl($state, ['category' => 'skirt', 'page' => 1]) ?>"
                    data-category="skirt"
                    <?= $currentCategory === 'skirt' ? 'aria-current="page"' : '' ?>>
                        Skirts
                    </a>
                </li>
                <li>
                    <a href="<?= buildProductListUrl($state, ['category' => 'bottom', 'page' => 1]) ?>"
                    data-category="bottom"
                    <?= $currentCategory === 'bottom' ? 'aria-current="page"' : '' ?>>
                        Bottoms
                    </a>
                </li>
                <li>
                    <a href="<?= buildProductListUrl($state, ['category' => 'top', 'page' => 1]) ?>"
                    data-category="top"
                    <?= $currentCategory === 'top' ? 'aria-current="page"' : '' ?>>
                        Tops
                    </a>
                </li>
                <li>
                    <a href="<?= buildProductListUrl($state, ['category' => 'accessory', 'page' => 1]) ?>"
                    data-category="accessory"
                    <?= $currentCategory === 'accessory' ? 'aria-current="page"' : '' ?>>
                        Accessories
                    </a>
                </li>
            </ul>
        </nav>
        <!--  -->
        <section class="catalog-toolbar" aria-label="상품 목록 제어">
            <!-- View Toggle -->
            <div class="view-toggle" role="group" aria-label="한 줄에 표시할 상품 수">
                <span class="view-toggle__label">상품 보기</span>
                <a
                    class="view-toggle__btn"
                    href="<?= buildProductListUrl($state, ['view' => '1col', 'page' => 1]) ?>"
                    <?= $currentView === '1col' ? 'aria-current="true"' : '' ?>
                    aria-label="한 줄에 상품 1개 보기"
                    data-view="1col">
                    1
                </a>
                <a
                    class="view-toggle__btn"
                    href="<?= buildProductListUrl($state, ['view' => '2col', 'page' => 1]) ?>"
                    <?= $currentView === '2col' ? 'aria-current="true"' : '' ?>
                    aria-label="한 줄에 상품 2개 보기"
                    data-view="2col">
                    2
                </a>
            </div>
            <!-- Catalog Sort -->
            <form class="catalog-sort-form" method="get" action="">
                <input type="hidden" name="category" value="<?= htmlspecialchars($state['category'], ENT_QUOTES, 'UTF-8') ?>">
                <input type="hidden" name="view" value="<?= htmlspecialchars($state['view'], ENT_QUOTES, 'UTF-8') ?>">
                <input type="hidden" name="page" value="1">

                <label class="visually-hidden" for="sort">정렬 기준</label>
                <select id="sort" name="sort" class="catalog-sort">
                    <option value="latest" <?= $state['sort'] === 'latest' ? 'selected' : '' ?>>최신순</option>
                    <option value="review" <?= $state['sort'] === 'review' ? 'selected' : '' ?>>후기 많은 순</option>
                    <option value="discount" <?= $state['sort'] === 'discount' ? 'selected' : '' ?>>높은 할인율 순</option>
                </select>
            </form>
        </section>
        <section class="catalog">
            <p class="product-toast" data-product-toast role="status" aria-live="polite" hidden></p>
            <!-- Product Card -->
            <ul id="product-list" class="catalog__list" data-view="<?= htmlspecialchars($currentView, ENT_QUOTES, 'UTF-8') ?>">
                <?php foreach ($visibleProducts as $product): ?>
                    <?php include __DIR__ . '/../includes/components/product-card.php'; ?>
                <?php endforeach; ?>
            </ul>
        </section>
        <!-- Pagination -->
        <nav class="pagination" aria-label="페이지 이동">
            <!-- 5 페이지까지만 보이게 -->
            <?php
                $start = max(1, $currentPage - 2);
                $end = min($totalPages, $start + 4);

                if ($end - $start < 4) {
                    $start = max(1, $end - 4);
                }
            ?>
            <!-- 첫 페이지로 이동 -->
            <?php if ($currentPage > 1): ?>
                <a class="pagination__btn pagination__btn--first"
                href="<?= buildProductListUrl($state, ['page' => 1]) ?>">
                    <img src="<?= BASE_URL ?>/assets/icons/double-arrow-left.svg" alt=""><span class="visually-hidden">첫 페이지로 이동</span>
                </a>
            <?php endif; ?>
            <!-- 현재 페이지 -->
            <?php for ($i = $start; $i <= $end; $i++): ?>
                <a href="<?= buildProductListUrl($state, ['page' => $i]) ?>"
                <?= $i === $currentPage ? 'aria-current="page"' : '' ?>>
                    <?= $i ?>
                </a>
            <?php endfor; ?>
            <!-- 마지막 페이지로 이동 -->
            <?php if ($currentPage < $totalPages): ?>
                <a class="pagination__btn pagination__btn--last"
                href="<?= buildProductListUrl($state, ['page' => $totalPages]) ?>">
                    <img class="icon-rotate-180" src="<?= BASE_URL ?>/assets/icons/double-arrow-left.svg" alt=""><span class="visually-hidden">마지막 페이지로 이동</span>
                </a>
            <?php endif; ?>
        </nav>
    </main>

    <!-- Footer -->
    <?php include __DIR__ . '/../includes/footer.php'; ?>

    <!-- Chat Launcher -->
    <?php include __DIR__ . '/../includes/chat-launcher.php'; ?>

</div>

<script src="<?= BASE_URL ?>/js/header.js"></script>
<script type="application/json" id="shop-sample-data"><?= json_encode($sampleItems, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES) ?></script>
<script src="<?= BASE_URL ?>/js/product-page.js"></script>
<script src="<?= BASE_URL ?>/js/shop-storage.js"></script>
</body>
</html>

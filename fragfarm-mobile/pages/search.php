<?php
include __DIR__ . '/../includes/config.php';
include __DIR__ . '/../includes/data/products.php';
include __DIR__ . '/../includes/services/product-search.php';

$pageTitle = 'Fragfarm';
$pageCss = 'search.css';

$searchState = normalizeSearchQuery($_GET);
$searchResult = searchProducts($products, $searchState);
$keyword = $searchState['q'];
$escapedKeyword = htmlspecialchars($keyword, ENT_QUOTES, 'UTF-8');
?>

<!DOCTYPE html>
<html lang="ko">

<!------------ Head ------------>
<?php include __DIR__ . '/../includes/head.php'; ?>

<body>
<div class="mobile-shell">
    <!-- Header -->
    <?php include __DIR__ . '/../includes/header.php'; ?>

    <main class="search-page" id="main">
        <section class="search-result">
            <div class="search-result__header">
                <div class="page-heading page-heading--plain page-heading--contained">
                    <h1 class="page-heading__title">SEARCH</h1>
                </div>
                <form class="search search-result__form" role="search" action="<?= BASE_URL ?>/pages/search.php" method="get">
                    <label class="search__label visually-hidden" for="search-page-query">검색어 입력</label>
                    <div class="search__bar">
                        <input 
                            class="search__input" 
                            type="search" 
                            name="q" 
                            id="search-page-query" 
                            value="<?= $escapedKeyword ?>"
                            placeholder="What are you looking for?">
                        <button class="search__btn" type="submit" aria-label="검색">
                            <img src="<?= BASE_URL ?>/assets/icons/search.svg" alt="" aria-hidden="true">
                        </button>
                    </div>
                </form> 
                <?php if ($searchResult['hasQuery']): ?>
                    <div class="search-result__summary">
                        <p class="search-result__text">
                            <strong>"<?= $escapedKeyword ?>"</strong> 검색 결과
                        </p>
                        <span class="search-result__count">총 <?= $searchResult['totalProducts'] ?>개의 상품</span>
                    </div>
                <?php else: ?>
                    <p class="search-result__text">
                        상품명, 카테고리, 컬러로 검색해 보세요.
                    </p>
                <?php endif; ?>
            </div>

            <?php if ($searchResult['hasQuery'] && $searchResult['totalProducts'] > 0): ?>
                <ul id="search-result-list" class="search-result__list">
                    <?php foreach ($searchResult['items'] as $product): ?>
                        <?php include __DIR__ . '/../includes/components/search-result-card.php'; ?>
                    <?php endforeach; ?>
                </ul>

                <?php if ($searchResult['totalPages'] > 1): ?>
                    <nav class="pagination" aria-label="검색 결과 페이지 이동">
                        <?php for ($page = 1; $page <= $searchResult['totalPages']; $page++): ?>
                            <a
                                href="<?= buildProductSearchUrl($searchState, ['page' => $page]) ?>"
                                <?= $page === $searchResult['currentPage'] ? 'aria-current="page"' : '' ?>>
                                <?= $page ?>
                            </a>
                        <?php endfor; ?>
                    </nav>
                <?php endif; ?>
            <?php elseif ($searchResult['hasQuery']): ?>
                <div class="search-empty">
                    <p class="search-empty__title">검색 결과가 없습니다.</p>
                    <p class="search-empty__text">다른 검색어로 다시 시도해 주세요.</p>
                    <div class="search-empty__links">
                        <a href="<?= BASE_URL ?>/pages/product.php?category=new">NEW 보러가기</a>
                        <a href="<?= BASE_URL ?>/pages/product.php?category=sale">SALE 보러가기</a>
                    </div>
                </div>
            <?php endif; ?>
        </section>
    </main>


    <!-- Footer -->
    <?php include __DIR__ . '/../includes/footer.php'; ?>

    <!-- Chat Launcher -->
    <?php include __DIR__ . '/../includes/chat-launcher.php'; ?>
</div>
<script src="<?= BASE_URL ?>/js/header.js"></script>
</body>
</html>

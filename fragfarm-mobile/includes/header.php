<?php
$isLoggedIn = isset($_SESSION['member_id']);
?>

<!-- Skip Link -->
<div class="skip-links" aria-label="바로가기 링크">
    <a href="#header-shop" class="skip-links__link">메뉴 바로가기</a>
    <a href="#main" class="skip-links__link">본문 바로가기</a>
</div>

<!-- Header -->
<header class="site-header">
    <div class="header__brand">
        <h1 class="logo">
            <a href="<?= BASE_URL ?>/index.php" aria-label="FRAGFARM 홈">
                <img src="<?= BASE_URL ?>/assets/images/logo-fragfarm.png" alt="FRAGFARM">
            </a>
        </h1>
    </div>
    <div class="header__bar" aria-label="글로벌 메뉴">
        <div class="header__cell header__cell--start">
            <button class="header__drawer-toggle" id="header-shop" type="button"
                    aria-label="SHOP 메뉴 열기" aria-expanded="false" aria-controls="shop-drawer">
                SHOP
            </button>
        </div>
        <a class="cart header__cell header__cell--center" href="<?= BASE_URL ?>/pages/cart.php">
            CART(<span class="cart__badge" data-cart-count>3</span>)
        </a>
        <div class="header__cell header__cell--end">
            <button id="header-menu" class="header__drawer-toggle" type="button"
                    aria-label="MENU 열기" aria-expanded="false" aria-controls="gnb">
                MENU
            </button>
        </div>
    </div>
</header>

<nav class="header-drawer" id="shop-drawer" aria-label="상품 카테고리" data-header-drawer hidden>
    <ul class="header-drawer__list">
        <li><a href="<?= BASE_URL ?>/pages/product.php?category=all">ALL</a></li>
        <li><a href="<?= BASE_URL ?>/pages/product.php?category=skirt">SKIRTS</a></li>
        <li><a href="<?= BASE_URL ?>/pages/product.php?category=top">TOP</a></li>
        <li><a href="<?= BASE_URL ?>/pages/product.php?category=bottom">PANTS</a></li>
        <li><a href="<?= BASE_URL ?>/pages/product.php?category=accessory">ACC</a></li>
        <li class="header-drawer__sale"><a href="<?= BASE_URL ?>/pages/product.php?category=sale">SALE</a></li>
    </ul>
</nav>

<nav class="header-drawer" id="gnb" aria-label="사이트 메뉴" data-header-drawer hidden>
    <ul class="header-drawer__list">
        <li><a href="<?= BASE_URL ?>/pages/mypage.php">MYPAGE</a></li>
        <li class="header-drawer__item--right"><a href="<?= BASE_URL ?>/pages/notice.php">NOTICE</a></li>
        <li><a href="<?= BASE_URL ?>/pages/review.php">REVIEW</a></li>
        <li class="header-drawer__item--right"><a href="<?= BASE_URL ?>/pages/lookbook.php">SEASON BOOK</a></li>
        <li><a href="<?= BASE_URL ?>/pages/about.php">ABOUT US</a></li>
        <li class="header-drawer__item--right"><a href="https://www.instagram.com/fragfarm.house/" target="_blank" rel="noopener noreferrer">INSTAGRAM</a></li>
        <li class="header-drawer__search-item">
            <form class="header-drawer__search" role="search" action="<?= BASE_URL ?>/pages/search.php" method="get">
                <label class="visually-hidden" for="drawer-search-query">상품 검색</label>
                <input id="drawer-search-query" type="search" name="q" placeholder="What are you looking for?">
                <button type="submit" aria-label="검색">
                    <img src="<?= BASE_URL ?>/assets/icons/search.svg" alt="">
                </button>
            </form>
        </li>
    </ul>
</nav>

<script>
window.FRAGFARM_BASE_URL = <?= json_encode(BASE_URL) ?>;
window.FRAGFARM_DEMO_MODE = <?= FRAGFARM_DEMO_MODE ? 'true' : 'false' ?>;
</script>
<script src="<?= BASE_URL ?>/js/app-utils.js"></script>
<script src="<?= BASE_URL ?>/js/shop-store.js"></script>
<script src="<?= BASE_URL ?>/js/accessibility.js"></script>
<?php if (FRAGFARM_DEMO_MODE): ?>
<script src="<?= BASE_URL ?>/js/demo-auth.js"></script>
<?php endif; ?>

<?php
include __DIR__ . '/includes/config.php';
include __DIR__ . '/includes/data/products.php';

$pageTitle = 'Fragfarm';
$pageCss = 'home.css';
$useFlowerFont = true;

$newProducts = $products;
usort($newProducts, static function ($productA, $productB) {
    $dateCompare = strtotime($productB['createdAt'] ?? '1970-01-01')
        <=> strtotime($productA['createdAt'] ?? '1970-01-01');

    return $dateCompare !== 0
        ? $dateCompare
        : strcmp($productB['id'] ?? '', $productA['id'] ?? '');
});
$homeNewProducts = array_slice($newProducts, 0, 16);
$hasDeferredNewProducts = count($homeNewProducts) > 8;

$saleProducts = array_values(array_filter($products, function ($product) {
    $stateTokens = $product['state'] ?? [];
    return is_array($stateTokens) && in_array('sale', $stateTokens, true);
}));
?>

<!DOCTYPE html>
<html lang="ko">

<!------------ Head ------------>
<?php include __DIR__ . '/includes/head.php'; ?>

<body class="home-page">
<div class="mobile-shell">
    <!-- Header -->
    <?php include __DIR__ . '/includes/header.php'; ?>

    <!-- Main -->
    <main id="main">
        <!-- Hero -->
        <section class="hero" aria-label="26 SS Collection 2nd Release 花 캠페인" data-hero-slider>
            <div class="hero__slides">
                <figure class="hero__slide is-active" data-hero-slide aria-hidden="false">
                    <img
                        class="hero__img"
                        src="<?= BASE_URL ?>/assets/images/home/hero-house-01.jpg"
                        alt="검정 블라우스와 플로럴 스커트를 착용한 프레그팜 캠페인 모델">
                </figure>
                <figure class="hero__slide" data-hero-slide aria-hidden="true">
                    <img
                        class="hero__img"
                        src="<?= BASE_URL ?>/assets/images/home/hero-house-02.jpg"
                        alt="검정 블라우스를 착용하고 정원 앞에 앉아 있는 프레그팜 캠페인 모델">
                </figure>
            </div>
            <div class="hero__meta">
                <div class="hero__counter" aria-live="polite">
                    <span data-hero-current>1</span>
                    <span class="hero__counter-divider" aria-hidden="true">/</span>
                    <span data-hero-total>2</span>
                </div>
                <p class="hero__subtitle">26SS 2nd Collection “花” Open</p>
            </div>
        </section>
        <!-- New -->
        <section class="new" data-new-arrivals>
            <div class="new__header">
                <h2 class="section__title font-brand">
                    NEW ARRIVALS
                </h2>
            </div>

            <ul class="product__list product__list--grid">
                <?php foreach ($homeNewProducts as $index => $product): ?>
                    <?php $cardImage = $product['cardImage'] ?? $product['images'][0]; ?>
                    <li
                        class="product__card product__card--compact"
                        data-new-product
                        data-new-product-row="<?= intdiv($index, 2) ?>"
                        <?= $index >= 8 ? 'data-new-product-deferred hidden' : '' ?>>
                        <a class="product__link" 
                           href="<?= BASE_URL ?>/pages/product-detail.php?id=<?= htmlspecialchars($product['id'], ENT_QUOTES, 'UTF-8') ?>">
                            <img
                                class="product__image"
                                src="<?= BASE_URL . htmlspecialchars($cardImage['src'], ENT_QUOTES, 'UTF-8') ?>"
                                alt="<?= htmlspecialchars($cardImage['alt'], ENT_QUOTES, 'UTF-8') ?>">
                            <div class="product__info">
                                <div class="product__name font-brand">
                                    <?= htmlspecialchars($product['name'], ENT_QUOTES, 'UTF-8') ?>
                                </div>
                                <div class="product__price">
                                    <?= number_format($product['price']) ?>원
                                </div>
                            </div>
                        </a>
                    </li>
                <?php endforeach; ?>
            </ul>

            <?php if ($hasDeferredNewProducts): ?>
                <div class="new__reveal-sentinel" data-new-reveal-sentinel aria-hidden="true"></div>
            <?php endif; ?>

            <div class="new__footer" data-new-view-more <?= $hasDeferredNewProducts ? 'hidden' : '' ?>>
                <a class="section__view-more" href="<?= BASE_URL ?>/pages/product.php?category=all">
                    view more
                </a>
            </div>
        </section>
    </main>

    <!-- Footer -->
    <?php include __DIR__ . '/includes/footer.php'; ?>

    <!-- Chat Launcher -->
    <?php include __DIR__ . '/includes/chat-launcher.php'; ?>

    <!-- Popup -->
    <div class="popup" data-scroll-popup hidden>
        <section
            class="popup__dialog"
            role="dialog"
            aria-modal="false"
            aria-label="프래그팜 프로모션 안내">
                <img class="popup__media" src="<?= BASE_URL ?>/assets/images/popup.png" alt="프래그팜 프로모션 안내">
                <div class="popup__actions">
                    <button class="popup__dismiss" type="button">오늘 다시 보지 않기</button>
                    <button class="popup__close" type="button" aria-label="팝업 닫기">닫기</button>
                </div>
        </section>
    </div>
</div>
<!-- Script -->
<script src="<?= BASE_URL ?>/js/popup.js"></script>
<script src="<?= BASE_URL ?>/js/home-hero.js"></script>
<script src="<?= BASE_URL ?>/js/home-products.js"></script>
<script src="<?= BASE_URL ?>/js/header.js"></script>
</body>
</html>

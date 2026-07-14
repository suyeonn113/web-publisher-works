<?php
include __DIR__ . '/includes/config.php';
include __DIR__ . '/includes/data/products.php';

$pageTitle = 'Fragfarm';
$pageCss = 'home.css';

$newProducts = array_values(array_filter($products, function ($product) {
    $stateTokens = $product['state'] ?? [];
    return is_array($stateTokens) && in_array('new', $stateTokens, true);
}));

$saleProducts = array_values(array_filter($products, function ($product) {
    $stateTokens = $product['state'] ?? [];
    return is_array($stateTokens) && in_array('sale', $stateTokens, true);
}));
?>

<!DOCTYPE html>
<html lang="ko">

<!------------ Head ------------>
<?php include __DIR__ . '/includes/head.php'; ?>

<body>
<div class="mobile-shell">
    <!-- Header -->
    <?php include __DIR__ . '/includes/header.php'; ?>

    <!-- Main -->
    <main id="main">
        <!-- Hero -->
        <section class="hero">
            <img class="hero__img" src="<?= BASE_URL ?>/assets/images/hero-2.jpg" alt="메인 이미지">
            <a class="hero__title-group" href="<?= BASE_URL ?>/pages/product.php?category=new">
                <h3 class="hero__subtitle">
                    26 SS Collection 1st Release
                </h3>
                <h2 class="hero__title font-brand">
                SOME NATURE LAYERS
                </h2>
            </a>    
        </section>
        <!-- New -->
        <section class="new">
            <h2 class="section__title font-brand">
                NEW
            </h2>

            <a class="section__view-all" href="<?= BASE_URL ?>/pages/product.php?category=new">
                view all
            </a>

            <ul class="product__list">
                <?php foreach (array_slice($newProducts, 0, 9) as $product): ?>
                    <li class="product__card product__card--compact">
                        <a class="product__link" 
                           href="<?= BASE_URL ?>/pages/product-detail.php?id=<?= htmlspecialchars($product['id'], ENT_QUOTES, 'UTF-8') ?>">
                            <span class="effect-fairy">
                                <img
                                    class="product__image"
                                    src="<?= BASE_URL . htmlspecialchars($product['images'][0]['src'], ENT_QUOTES, 'UTF-8') ?>"
                                    alt="<?= htmlspecialchars($product['images'][0]['alt'], ENT_QUOTES, 'UTF-8') ?>">
                            </span>
                            <div class="product__name font-brand">
                                <?= htmlspecialchars($product['name'], ENT_QUOTES, 'UTF-8') ?>
                            </div>
                            <div class="product__color font-brand">
                                <?= count($product['images'] ?? []) ?> Color
                            </div>
                        </a>
                    </li>
                <?php endforeach; ?>
            </ul>
        </section>
        <!-- Sale -->
        <section class="sale">
            <div class="section__header">
                <h2 class="section__title font-brand">
                    SALE
                </h2>

            <a
                class="section__view-all"
                href="<?= BASE_URL ?>/pages/product.php?category=sale">
                view all
            </a>

            <a
                class="sale__card"
                href="<?= BASE_URL ?>/pages/product.php?category=sale"
                aria-label="25% Summer Sale 상품 전체 보기">

                <div class="sale__media">
                    <img
                        class="sale__image"
                        src="<?= BASE_URL ?>/assets/images/sale-banner.jpg"
                        alt="25% Summer Sale, 7월 6일부터 7월 13일까지">
                </div>

                <div class="sale__info">
                    <span class="sale__period font-brand">
                        07.06 — 07.13
                    </span>

                    <span class="sale__link-text font-brand">
                        Shop summer sale
                        <span aria-hidden="true">→</span>
                    </span>
                </div>
            </a>
        </section>
        <!-- Review -->
        <section class="review" id="review">
            <h2 class="section__title font-brand">
                REVIEW
            </h2>
            <a class="section__view-all" href="<?= BASE_URL ?>/pages/review.php">
                view all
            </a>
            <ul class="review__list">
                <li class="review__card review__card--compact">
                    <a class="review__link" href="<?= BASE_URL ?>/pages/review-detail.php?id=moment-001">
                        <img class="review__image" src="<?= BASE_URL ?>/assets/images/review/review-1.jpeg" 
                            alt="Pink Gaura 스카프 세트 롱 슬리브 고객 착용 후기 사진"> 
                    </a>
                </li>
                <li class="review__card review__card--compact">
                    <a class="review__link" href="<?= BASE_URL ?>/pages/review-detail.php?id=moment-002">
                        <img class="review__image" src="<?= BASE_URL ?>/assets/images/review/review-2.jpeg"
                            alt="Trumpet Flower 와이드 팬츠 고객 착용 후기 사진">
                    </a>
                </li>
                <li class="review__card review__card--compact">
                    <a class="review__link" href="<?= BASE_URL ?>/pages/review-detail.php?id=moment-003">
                        <img class="review__image" src="<?= BASE_URL ?>/assets/images/review/review-3.jpeg"
                            alt="Angela Rose 언발란스 스커트 고객 착용 후기 사진">
                    </a>
                </li>
                <li class="review__card review__card--compact">
                    <a class="review__link" href="<?= BASE_URL ?>/pages/review-detail.php?id=moment-004">
                        <img class="review__image" src="<?= BASE_URL ?>/assets/images/review/review-4.jpeg"
                            alt="Angela Rose 언발란스 스커트 고객 착용 후기 사진">
                    </a>
                </li>
                <li class="review__card review__card--compact">
                    <a class="review__link" href="<?= BASE_URL ?>/pages/review-detail.php?id=moment-005">
                        <img class="review__image" src="<?= BASE_URL ?>/assets/images/review/review-5.jpg" 
                            alt="Angela Rose 언발란스 스커트 고객 착용 후기 사진">
                    </a>
                </li>
                <li class="review__card review__card--compact">
                    <a class="review__link" href="<?= BASE_URL ?>/pages/review-detail.php?id=moment-006">
                        <img class="review__image" src="<?= BASE_URL ?>/assets/images/review/review-6.jpeg"  
                            alt="Sentimental Rose 스커트 고객 착용 후기 사진">
                    </a>
                </li>
                <li class="review__card review__card--compact">
                    <a class="review__link" href="<?= BASE_URL ?>/pages/review-detail.php?id=moment-007">
                        <img class="review__image" src="<?= BASE_URL ?>/assets/images/review/review-7.jpeg" 
                            alt="Angela Rose 언발란스 스커트 고객 착용 후기 사진">
                    </a>
                </li>
                <li class="review__card review__card--compact">
                    <a class="review__link" href="<?= BASE_URL ?>/pages/review-detail.php?id=moment-008">
                        <img class="review__image" src="<?= BASE_URL ?>/assets/images/review/review-8.jpeg" 
                            alt="Iris 버뮤다 팬츠 고객 착용 후기 사진">
                    </a>
                </li>
                <li class="review__card review__card--compact">
                    <a class="review__link" href="<?= BASE_URL ?>/pages/review-detail.php?id=moment-009">
                        <img class="review__image" src="<?= BASE_URL ?>/assets/images/review/review-9.jpeg" 
                            alt="Magic Lily 미디 스커트 고객 착용 후기 사진">
                    </a>
                </li>
            </ul>
        </section>
        <!-- About -->
        <section class="about">
            <h2 class="section__title--about font-brand">
                ABOUT
            </h2>
            <img class="about__image motion-card-spin" src="<?= BASE_URL ?>/assets/images/about-2.png" 
                alt="여러 스타일링 착용 컷이 배열된 이미지 콜라주">
            <h3 class="about__title font-brand">About FRAGFARM</h3>
            <a class="about__link" href="<?= BASE_URL ?>/pages/about.php">
                <span class="about__read-more">read more</span>
            </a>
        </section>
    </main>

    <!-- Footer -->
    <?php include __DIR__ . '/includes/footer.php'; ?>

    <!-- Chat Launcher -->
    <?php include __DIR__ . '/includes/chat-launcher.php'; ?>

    <!-- Popup -->
    <div class="popup" hidden>
        <div class="popup__dim" aria-hidden="true"></div>
        <section
            class="popup__dialog"
            role="dialog"
            aria-modal="true">
                <button class="popup__dismiss" type="button">
                    오늘 다시 보지 않기
                </button>
        </section>
    </div>
</div>
<!-- Script -->
<script src="<?= BASE_URL ?>/js/popup.js"></script>
<script src="<?= BASE_URL ?>/js/header.js"></script>
</body>
</html>

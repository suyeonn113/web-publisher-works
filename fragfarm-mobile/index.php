<?php
include __DIR__ . '/includes/config.php';
include __DIR__ . '/includes/data/products.php';

$pageTitle = 'Fragfarm';
$pageCss = 'home.css';
$useFlowerFont = true;
$useHeroHeader = true;

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

<body class="home-page">
<div class="mobile-shell">
    <!-- Header -->
    <?php include __DIR__ . '/includes/header.php'; ?>

    <!-- Main -->
    <main id="main">
        <!-- Hero -->
        <section class="hero" data-hero-slider aria-roledescription="carousel" aria-label="26 SS Collection 2nd Release 花 캠페인">
            <div class="hero__slides" aria-live="off">
                <?php
                    $heroImages = [
                        '/assets/images/products/accessory-005-bk-1.jpg',
                        '/assets/images/products/accessory-006-na-1.jpg',
                        '/assets/images/products/accessory-007-bk-1.jpg',
                        '/assets/images/products/skirt-005-wh-1.jpg',
                        '/assets/images/products/top-011-bk-2.jpg',
                    ];
                ?>
                <?php foreach ($heroImages as $heroIndex => $heroImage): ?>
                    <figure class="hero__slide <?= $heroIndex === 0 ? 'is-active' : '' ?>" data-hero-slide aria-hidden="<?= $heroIndex === 0 ? 'false' : 'true' ?>">
                        <img
                            class="hero__img"
                            src="<?= BASE_URL . htmlspecialchars($heroImage, ENT_QUOTES, 'UTF-8') ?>"
                            alt=""
                            <?= $heroIndex === 0 ? 'fetchpriority="high"' : 'loading="lazy"' ?>>
                    </figure>
                <?php endforeach; ?>
            </div>
            <a class="hero__title-group" href="<?= BASE_URL ?>/pages/lookbook-flower.php">
                <h3 class="hero__subtitle">
                    26 SS Collection 2nd Release
                </h3>
                <h2 class="hero__title font-flower">
                    “花”
                </h2>
            </a>
            <div class="hero__pagination" role="group" aria-label="히어로 이미지 선택">
                <?php foreach ($heroImages as $heroIndex => $_): ?>
                    <button
                        type="button"
                        data-hero-dot="<?= $heroIndex ?>"
                        aria-label="<?= $heroIndex + 1 ?>번째 이미지 보기"
                        <?= $heroIndex === 0 ? 'aria-current="true"' : '' ?>></button>
                <?php endforeach; ?>
            </div>
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
            </div>

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
                        <span aria-hidden="true"><img src="<?= BASE_URL ?>/assets/icons/arrow-right.svg" alt=""></span>
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
            <div class="review__rail">
            <ul class="review__list" aria-label="고객 리뷰 사진. 좌우 방향키로 이동" tabindex="0" data-keyboard-scroll>
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
            </div>
        </section>
        <!-- About -->
        <section class="about" aria-labelledby="home-about-title">
            <h2 id="home-about-title" class="section__title--about font-brand">
                ABOUT FRAGFARM
            </h2>
            <a
                class="about__card"
                href="<?= BASE_URL ?>/pages/about.php"
                aria-label="ABOUT FRAGFARM 페이지 보기">
                <img
                    class="about__image motion-card-float"
                    src="<?= BASE_URL ?>/assets/images/about-2.png"
                    alt="날개 달린 천사와 FRAGFARM 로고가 그려진 빈티지 카드">
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
            aria-modal="true"
            aria-label="프래그팜 프로모션 안내">
                <button class="popup__dismiss" type="button">
                    오늘 다시 보지 않기
                </button>
        </section>
    </div>
</div>
<!-- Script -->
<script src="<?= BASE_URL ?>/js/popup.js"></script>
<script src="<?= BASE_URL ?>/js/header.js"></script>
<script src="<?= BASE_URL ?>/js/home-hero.js"></script>
</body>
</html>

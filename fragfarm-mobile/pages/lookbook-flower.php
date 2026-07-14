<?php
include __DIR__ . '/../includes/config.php';

$pageTitle = '26 SS Collection 2nd Release “花” | Fragfarm';
$pageCss = 'lookbook.css';
$useFlowerFont = true;
$lookbookItems = [
    ['image' => '/assets/images/products/accessory-005-bk-1.jpg', 'variant' => 'tall'],
    ['image' => '/assets/images/products/accessory-005-wh-1.jpg', 'variant' => 'portrait'],
    ['image' => '/assets/images/products/accessory-006-na-1.jpg', 'variant' => 'wide'],
    ['text' => "26 SS\nCOLLECTION 2ND RELEASE"],
    ['image' => '/assets/images/products/accessory-006-na-2.jpg', 'variant' => 'square'],
    ['image' => '/assets/images/products/accessory-007-bk-1.jpg', 'variant' => 'tall'],
    ['image' => '/assets/images/products/accessory-007-bk-2.jpg', 'variant' => 'portrait'],
    ['image' => '/assets/images/products/accessory-007-wh-2.jpg', 'variant' => 'wide'],
    ['image' => '/assets/images/products/skirt-005-bk-2.jpg', 'variant' => 'square'],
    ['text' => "花", 'class' => 'font-flower'],
    ['image' => '/assets/images/products/skirt-005-wh-1.jpg', 'variant' => 'tall'],
    ['image' => '/assets/images/products/skirt-005-wh-2.jpg', 'variant' => 'portrait'],
    ['image' => '/assets/images/products/top-010-bk-1.jpg', 'variant' => 'square'],
    ['image' => '/assets/images/products/top-010-wh-1.jpg', 'variant' => 'wide'],
    ['image' => '/assets/images/products/top-011-bk-1.jpg', 'variant' => 'portrait'],
    ['image' => '/assets/images/products/top-011-bk-2.jpg', 'variant' => 'tall'],
    ['image' => '/assets/images/products/top-011-cc-1.jpg', 'variant' => 'square'],
    ['image' => '/assets/images/products/top-011-wh-1.jpg', 'variant' => 'portrait'],
];
?>

<!DOCTYPE html>
<html lang="ko">
<?php include __DIR__ . '/../includes/head.php'; ?>
<body>
<div class="mobile-shell">
    <?php include __DIR__ . '/../includes/header.php'; ?>

    <main id="main" class="lookbook-page lookbook-page--flower" aria-labelledby="lookbook-title">
        <h1 id="lookbook-title" class="lookbook-title">26 SS Collection 2nd Release <span class="font-flower">“花”</span></h1>
        <div class="lookbook-grid">
            <?php foreach ($lookbookItems as $index => $item): ?>
                <?php if (isset($item['text'])): ?>
                    <p class="lookbook-text <?= htmlspecialchars($item['class'] ?? '', ENT_QUOTES, 'UTF-8') ?>"><?= nl2br(htmlspecialchars($item['text'], ENT_QUOTES, 'UTF-8')) ?></p>
                <?php else: ?>
                    <?php $imageUrl = BASE_URL . htmlspecialchars($item['image'], ENT_QUOTES, 'UTF-8'); ?>
                    <figure class="lookbook-card lookbook-card--<?= htmlspecialchars($item['variant'] ?? 'portrait', ENT_QUOTES, 'UTF-8') ?>">
                        <button
                            class="lookbook-card__button"
                            type="button"
                            data-lookbook-image="<?= $imageUrl ?>"
                            aria-haspopup="dialog"
                            aria-label="룩북 이미지 <?= $index + 1 ?> 크게 보기">
                            <img src="<?= $imageUrl ?>" alt="" loading="lazy">
                        </button>
                    </figure>
                <?php endif; ?>
            <?php endforeach; ?>
        </div>
    </main>

    <div class="lookbook-image-modal" data-lookbook-modal hidden>
        <button class="lookbook-image-modal__dim" type="button" data-lookbook-modal-close aria-label="큰 이미지 닫기"></button>
        <div class="lookbook-image-modal__dialog" role="dialog" aria-modal="true" aria-label="룩북 이미지 크게 보기">
            <button class="lookbook-image-modal__close" type="button" data-lookbook-modal-close aria-label="닫기"><img src="<?= BASE_URL ?>/assets/icons/close.svg" alt=""></button>
            <img class="lookbook-image-modal__image" data-lookbook-modal-image src="" alt="">
        </div>
    </div>

    <?php include __DIR__ . '/../includes/footer.php'; ?>
</div>
<script src="<?= BASE_URL ?>/js/header.js"></script>
<script src="<?= BASE_URL ?>/js/lookbook.js"></script>
</body>
</html>

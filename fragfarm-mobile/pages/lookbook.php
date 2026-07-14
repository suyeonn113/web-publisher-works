<?php
include __DIR__ . '/../includes/config.php';

$pageTitle = 'Lookbook | Fragfarm';
$pageCss = 'lookbook.css';
$lookbookItems = [
    ['image' => '/assets/images/lookbook/lookbook-25ss-01.jpg', 'variant' => 'tall'],
    ['image' => '/assets/images/lookbook/lookbook-25ss-02.jpg', 'variant' => 'portrait'],
    ['image' => '/assets/images/lookbook/lookbook-25ss-03.jpg', 'variant' => 'wide'],
    ['text' => "25SS\nSENTIMENTAL ROSE"],
    ['image' => '/assets/images/lookbook/lookbook-25ss-04.jpg', 'variant' => 'square'],
    ['image' => '/assets/images/lookbook/lookbook-25ss-05.jpg', 'variant' => 'tall'],
    ['image' => '/assets/images/lookbook/lookbook-25ss-06.jpg', 'variant' => 'portrait'],
    ['image' => '/assets/images/lookbook/lookbook-25ss-07.jpg', 'variant' => 'square'],
    ['image' => '/assets/images/lookbook/lookbook-25ss-08.jpg', 'variant' => 'wide'],
    ['image' => '/assets/images/lookbook/lookbook-25ss-09.jpg', 'variant' => 'portrait'],
    ['image' => '/assets/images/lookbook/lookbook-25ss-10.jpg', 'variant' => 'square'],
    ['image' => '/assets/images/lookbook/lookbook-25ss-11.jpg', 'variant' => 'tall'],
    ['image' => '/assets/images/lookbook/lookbook-25ss-12.jpg', 'variant' => 'portrait'],
    ['image' => '/assets/images/lookbook/lookbook-25ss-13.jpg', 'variant' => 'square'],
    ['text' => "PHOTO BOOKS & ALBUMS"],
    ['image' => '/assets/images/lookbook/lookbook-25ss-14.jpg', 'variant' => 'wide'],
    ['text' => "FRAGFARMHOUSE"],
    ['image' => '/assets/images/lookbook/lookbook-25ss-15.jpg', 'variant' => 'portrait'],
    ['image' => '/assets/images/lookbook/lookbook-25ss-16.jpg', 'variant' => 'square'],
    ['text' => "JULY 2025\nIN THE MIDDLE OF SUMMER"],
    ['image' => '/assets/images/lookbook/lookbook-25ss-17.jpg', 'variant' => 'tall'],
];
?>

<!DOCTYPE html>
<html lang="ko">
<?php include __DIR__ . '/../includes/head.php'; ?>
<body>
<div class="mobile-shell">
    <?php include __DIR__ . '/../includes/header.php'; ?>

    <main id="main" class="lookbook-page" aria-label="Lookbook">
        <h2 class="visually-hidden">LOOKBOOK</h2>
        <div class="lookbook-grid">
            <?php foreach ($lookbookItems as $index => $item): ?>
                <?php if (isset($item['text'])): ?>
                    <p class="lookbook-text"><?= nl2br(htmlspecialchars($item['text'], ENT_QUOTES, 'UTF-8')) ?></p>
                <?php else: ?>
                    <?php $imageUrl = BASE_URL . htmlspecialchars($item['image'], ENT_QUOTES, 'UTF-8'); ?>
                    <figure class="lookbook-card lookbook-card--<?= htmlspecialchars($item['variant'] ?? 'portrait', ENT_QUOTES, 'UTF-8') ?>">
                        <button
                            class="lookbook-card__button"
                            type="button"
                            data-lookbook-image="<?= $imageUrl ?>"
                            aria-haspopup="dialog"
                            aria-label="룩북 이미지 <?= $index + 1 ?> 크게 보기">
                            <img src="<?= $imageUrl ?>" alt="">
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

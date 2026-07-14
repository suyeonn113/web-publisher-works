<?php
include __DIR__ . '/../includes/config.php';

$pageTitle = 'Lookbook | Fragfarm';
$pageCss = 'shop-pages.css';
$lookbookItems = [
    ['image' => '/assets/images/products/top-004-wh-2.jpg', 'variant' => 'tall'],
    ['image' => '/assets/images/products/top-006-na-1.jpg', 'variant' => 'portrait'],
    ['image' => '/assets/images/products/skirt-005-wh-1.jpg', 'variant' => 'wide'],
    ['text' => "25SS\nSENTIMENTAL ROSE"],
    ['image' => '/assets/images/products/bottom-003-wh-2.jpg', 'variant' => 'square'],
    ['image' => '/assets/images/products/top-008-na-3.jpg', 'variant' => 'tall'],
    ['image' => '/assets/images/products/skirt-004-na-1.jpg', 'variant' => 'portrait'],
    ['image' => '/assets/images/products/top-011-wh-1.jpg', 'variant' => 'square'],
    ['image' => '/assets/images/products/bottom-004-sb-1.jpg', 'variant' => 'wide'],
    ['image' => '/assets/images/products/top-009-wh-1.jpg', 'variant' => 'portrait'],
    ['text' => "PHOTO BOOKS & ALBUMS"],
    ['image' => '/assets/images/products/accessory-002-bl-1.jpg', 'variant' => 'square'],
    ['image' => '/assets/images/products/skirt-003-wh-1.jpg', 'variant' => 'tall'],
    ['text' => "FRAGFARMHOUSE"],
    ['image' => '/assets/images/products/skirt-003-bk-1.jpg', 'variant' => 'portrait'],
    ['image' => '/assets/images/products/bottom-003-bk-2.jpg', 'variant' => 'square'],
    ['text' => "JULY 2025\nIN THE MIDDLE OF SUMMER"],
    ['image' => '/assets/images/products/top-010-bk-1.jpg', 'variant' => 'wide'],
    ['image' => '/assets/images/products/bottom-004-sb-1.jpg', 'variant' => 'portrait'],
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
                    <figure class="lookbook-card lookbook-card--<?= htmlspecialchars($item['variant'] ?? 'portrait', ENT_QUOTES, 'UTF-8') ?>">
                        <img src="<?= BASE_URL . htmlspecialchars($item['image'], ENT_QUOTES, 'UTF-8') ?>" alt="">
                    </figure>
                <?php endif; ?>
            <?php endforeach; ?>
        </div>
    </main>

    <?php include __DIR__ . '/../includes/footer.php'; ?>
</div>
<script src="<?= BASE_URL ?>/js/header.js"></script>
</body>
</html>

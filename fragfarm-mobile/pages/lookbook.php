<?php
include __DIR__ . '/../includes/config.php';
include __DIR__ . '/../includes/data/lookbooks.php';

$requestedLookbookKey = (string) ($_GET['season'] ?? $latestLookbookKey);
$currentLookbookKey = array_key_exists($requestedLookbookKey, $lookbooks)
    ? $requestedLookbookKey
    : $latestLookbookKey;
$currentLookbook = $lookbooks[$currentLookbookKey];

$pageTitle = $currentLookbook['season'] . ' ' . $currentLookbook['collection'] . ' | Fragfarm';
$pageCss = 'lookbook.css';
$useFlowerFont = true;
$lookbookItems = $currentLookbook['items'];
?>

<!DOCTYPE html>
<html lang="ko">
<?php include __DIR__ . '/../includes/head.php'; ?>
<body>
<div class="mobile-shell">
    <?php include __DIR__ . '/../includes/header.php'; ?>

    <main id="main" class="lookbook-page" aria-labelledby="lookbook-page-title">
        <h1 id="lookbook-page-title" class="visually-hidden">SEASON BOOK</h1>
        <nav class="lookbook-tabs" aria-label="시즌북 선택">
            <ul class="lookbook-tabs__list">
                <?php foreach ($lookbooks as $lookbookKey => $lookbook): ?>
                    <li>
                        <a href="?season=<?= urlencode($lookbookKey) ?>"
                           <?= $lookbookKey === $currentLookbookKey ? 'aria-current="page"' : '' ?>>
                            <span><?= htmlspecialchars($lookbook['season'], ENT_QUOTES, 'UTF-8') ?></span>
                            <span<?= $lookbookKey === '26ss-2' ? ' class="font-flower"' : '' ?>><?= htmlspecialchars($lookbook['collection'], ENT_QUOTES, 'UTF-8') ?></span>
                        </a>
                    </li>
                <?php endforeach; ?>
            </ul>
        </nav>
        <div class="lookbook-grid lookbook-grid--<?= htmlspecialchars($currentLookbookKey, ENT_QUOTES, 'UTF-8') ?>">
            <?php foreach ($lookbookItems as $index => $item): ?>
                <?php if (isset($item['text'])): ?>
                    <p class="lookbook-text" data-lookbook-reveal><?= nl2br(htmlspecialchars($item['text'], ENT_QUOTES, 'UTF-8')) ?></p>
                <?php else: ?>
                    <?php $imageUrl = BASE_URL . htmlspecialchars($item['image'], ENT_QUOTES, 'UTF-8'); ?>
                    <figure class="lookbook-card lookbook-card--<?= htmlspecialchars($item['variant'] ?? 'portrait', ENT_QUOTES, 'UTF-8') ?>" data-lookbook-reveal>
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

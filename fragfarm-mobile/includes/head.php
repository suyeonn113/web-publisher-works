<?php
$rawPageTitle = trim((string) ($pageTitle ?? ''));
$pageName = preg_replace('/\s*\|\s*Fragfarm\s*$/i', '', $rawPageTitle);
$documentTitle = $pageName === '' || strcasecmp($pageName, 'Fragfarm') === 0
    ? 'Fragfarm'
    : 'Fragfarm | ' . $pageName;
?>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <title><?= htmlspecialchars($documentTitle, ENT_QUOTES, 'UTF-8') ?></title>

    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:ital,wght@0,100..800;1,100..800&display=swap" rel="stylesheet">
    <?php if (!empty($useFlowerFont)): ?>
        <!-- Google Fonts: season title glyph -->
        <link href="https://fonts.googleapis.com/css2?family=Shippori+Mincho:wght@400&amp;display=swap" rel="stylesheet">
    <?php endif; ?>

    <!-- core -->
    <link rel="stylesheet" href="<?= BASE_URL ?>/css/core/colors.css">
    <link rel="stylesheet" href="<?= BASE_URL ?>/css/core/tokens.css">
    <link rel="stylesheet" href="<?= BASE_URL ?>/css/core/reset.css">
    <link rel="stylesheet" href="<?= BASE_URL ?>/css/core/base.css">
    <link rel="stylesheet" href="<?= BASE_URL ?>/css/core/typography.css">

    <!-- favicon -->
    <link rel="icon" type="image/svg+xml" href="<?= BASE_URL ?>/assets/icons/favicon.svg?v=20260723">
    <link rel="icon" type="image/x-icon" href="<?= BASE_URL ?>/assets/icons/favicon.ico?v=20260723">
    <link rel="icon" type="image/png" href="<?= BASE_URL ?>/assets/icons/favicon.png?v=20260723">
    <link rel="apple-touch-icon" href="<?= BASE_URL ?>/assets/icons/apple-touch-icon.png?v=20260723">

    <!-- layout -->
    <link rel="stylesheet" href="<?= BASE_URL ?>/css/layout/layout.css">
    <link rel="stylesheet" href="<?= BASE_URL ?>/css/layout/header.css">
    <link rel="stylesheet" href="<?= BASE_URL ?>/css/layout/footer.css">

    <!-- components -->
    <link rel="stylesheet" href="<?= BASE_URL ?>/css/components/button.css">
    <link rel="stylesheet" href="<?= BASE_URL ?>/css/components/form-field.css">
    <link rel="stylesheet" href="<?= BASE_URL ?>/css/components/status-badge.css">
    <link rel="stylesheet" href="<?= BASE_URL ?>/css/components/card.css">
    <link rel="stylesheet" href="<?= BASE_URL ?>/css/components/check-box.css">
    <link rel="stylesheet" href="<?= BASE_URL ?>/css/components/modal.css">
    <link rel="stylesheet" href="<?= BASE_URL ?>/css/components/cart-option.css">
    <link rel="stylesheet" href="<?= BASE_URL ?>/css/components/motion.css">
    <link rel="stylesheet" href="<?= BASE_URL ?>/css/components/page-head.css">
    <link rel="stylesheet" href="<?= BASE_URL ?>/css/components/section-tabs.css">
    <link rel="stylesheet" href="<?= BASE_URL ?>/css/components/list-controls.css">
    <link rel="stylesheet" href="<?= BASE_URL ?>/css/components/chat-launcher.css">

    <!-- pages -->
    <?php if (!empty($pageCss)): ?>
        <link rel="stylesheet" href="<?= BASE_URL ?>/css/pages/<?= $pageCss ?>">
    <?php endif; ?>
</head>

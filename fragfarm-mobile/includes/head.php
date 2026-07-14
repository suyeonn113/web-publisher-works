<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <title><?= 'Fragfarm' ?></title>

    <!-- core -->
    <link rel="stylesheet" href="<?= BASE_URL ?>/css/core/reset.css">
    <link rel="stylesheet" href="<?= BASE_URL ?>/css/core/base.css">
    <link rel="stylesheet" href="<?= BASE_URL ?>/css/core/typography.css">

    <!-- favicon -->
    <link rel="icon" href="<?= BASE_URL ?>/assets/icons/favicon.ico">
    <link rel="icon" href="<?= BASE_URL ?>/assets/icons/favicon.png">
    <link rel="apple-touch-icon" href="<?= BASE_URL ?>/assets/icons/favicon.png">

    <!-- layout -->
    <link rel="stylesheet" href="<?= BASE_URL ?>/css/layout/layout.css">
    <link rel="stylesheet" href="<?= BASE_URL ?>/css/layout/header.css">
    <link rel="stylesheet" href="<?= BASE_URL ?>/css/layout/footer.css">

    <!-- components -->
    <link rel="stylesheet" href="<?= BASE_URL ?>/css/components/button.css">
    <link rel="stylesheet" href="<?= BASE_URL ?>/css/components/card.css">
    <link rel="stylesheet" href="<?= BASE_URL ?>/css/components/check-box.css">
    <link rel="stylesheet" href="<?= BASE_URL ?>/css/components/modal.css">
    <link rel="stylesheet" href="<?= BASE_URL ?>/css/components/motion.css">
    <link rel="stylesheet" href="<?= BASE_URL ?>/css/components/page-head.css">
    <link rel="stylesheet" href="<?= BASE_URL ?>/css/components/chat-launcher.css">

    <!-- pages -->
    <?php if (!empty($pageCss)): ?>
        <link rel="stylesheet" href="<?= BASE_URL ?>/css/pages/<?= $pageCss ?>">
    <?php endif; ?>
</head>
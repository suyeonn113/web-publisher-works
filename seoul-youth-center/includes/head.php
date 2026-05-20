<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?= htmlspecialchars($pageTitle ?? '서울시립청소년센터') ?></title>
    <!-- Base -->
    <link rel="stylesheet" href="<?= BASE_URL ?>/css/base/reset.css">
    <link rel="stylesheet" href="<?= BASE_URL ?>/css/base/base.css">
    <link rel="stylesheet" href="<?= BASE_URL ?>/css/base/typography.css">
    <link rel="stylesheet" href="<?= BASE_URL ?>/css/base/color.css">

    <!-- Favicons -->
    <link rel="icon" href="<?= BASE_URL ?>/assets/icons/favicon.ico">
    <link rel="apple-touch-icon" href="<?= BASE_URL ?>/assets/icons/favicon.png">

    <!-- Layout -->
    <link rel="stylesheet" href="<?= BASE_URL ?>/css/layout/layout.css">
    <link rel="stylesheet" href="<?= BASE_URL ?>/css/layout/global-nav.css">
    <link rel="stylesheet" href="<?= BASE_URL ?>/css/layout/footer.css">

    <!-- Components -->
    <link rel="stylesheet" href="<?= BASE_URL ?>/css/components/icons.css">
    <link rel="stylesheet" href="<?= BASE_URL ?>/css/components/cards.css">
    
    <!-- pages -->
    <?php if (!empty($pageCss)): ?>
        <link rel="stylesheet" href="<?= BASE_URL ?>/css/pages/<?= htmlspecialchars($pageCss) ?>">
    <?php endif; ?>
</head>
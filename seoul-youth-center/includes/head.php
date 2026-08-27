<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?= htmlspecialchars($pageTitle ?? '시립서울청소년센터') ?></title>
    <meta name="description" content="<?= htmlspecialchars($pageDescription ?? '시립서울청소년센터의 청소년 프로그램, 평생교육, 프로그램 신청과 센터 소식을 확인하세요.', ENT_QUOTES, 'UTF-8') ?>">
    <!-- Base -->
    <link rel="stylesheet" href="<?= BASE_URL ?>/css/base/reset.css">
    <link rel="stylesheet" href="<?= BASE_URL ?>/css/base/color.css">
    <link rel="stylesheet" href="<?= BASE_URL ?>/css/base/tokens.css">
    <link rel="stylesheet" href="<?= BASE_URL ?>/css/base/base.css">

    <!-- Favicons -->
    <link rel="icon" type="image/svg+xml" href="<?= BASE_URL ?>/assets/icons/favicon.svg?v=20260723">
    <link rel="icon" type="image/x-icon" href="<?= BASE_URL ?>/assets/icons/favicon.ico?v=20260723">
    <link rel="icon" type="image/png" href="<?= BASE_URL ?>/assets/icons/favicon.png?v=20260723">
    <link rel="apple-touch-icon" href="<?= BASE_URL ?>/assets/icons/apple-touch-icon.png?v=20260723">

    <!-- Layout -->
    <link rel="stylesheet" href="<?= BASE_URL ?>/css/layout/layout.css">
    <link rel="stylesheet" href="<?= BASE_URL ?>/css/layout/global-nav.css">
    <link rel="stylesheet" href="<?= BASE_URL ?>/css/layout/footer.css">

    <!-- Components -->
    <link rel="stylesheet" href="<?= BASE_URL ?>/css/components/controls.css">
    <link rel="stylesheet" href="<?= BASE_URL ?>/css/components/icons.css">
    <link rel="stylesheet" href="<?= BASE_URL ?>/css/components/program-card.css">
    
    <!-- pages -->
    <?php if (!empty($pageCss)): ?>
        <?php foreach ((array) $pageCss as $cssFile): ?>
            <link rel="stylesheet" href="<?= BASE_URL ?>/css/pages/<?= htmlspecialchars($cssFile) ?>">
        <?php endforeach; ?>
    <?php endif; ?>
    <script
        src="<?= BASE_URL ?>/js/select-control.js"
        data-select-control
        data-base-url="<?= htmlspecialchars(BASE_URL, ENT_QUOTES, 'UTF-8') ?>"
        defer
    ></script>
    <script src="<?= BASE_URL ?>/js/search-control.js" defer></script>
</head>

<?php
$youthLocalCategorySlug = $youthLocalCategorySlug ?? '';
$youthLocalCategories = $youthLocalCategories ?? getYouthProgramCategories();
?>

<aside class="info-local-nav info-local-nav--youth" aria-label="청소년 프로그램 메뉴">
    <h2>청소년 프로그램</h2>
    <nav class="info-local-nav__submenu info-local-nav__submenu--flat" aria-label="청소년 프로그램 분야">
        <?php foreach ($youthLocalCategories as $item): ?>
            <a
                href="<?= BASE_URL ?>/youth-program-category.php?category=<?= urlencode($item['slug']) ?>"
                <?= $item['slug'] === $youthLocalCategorySlug ? 'aria-current="page"' : '' ?>>
                <?= htmlspecialchars($item['name'], ENT_QUOTES, 'UTF-8') ?>
            </a>
        <?php endforeach; ?>
    </nav>
</aside>

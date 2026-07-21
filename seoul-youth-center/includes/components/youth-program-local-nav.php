<?php
$youthLocalPage = $youthLocalPage ?? '';
$youthLocalCategorySlug = $youthLocalCategorySlug ?? '';
$youthLocalCategories = $youthLocalCategories ?? getYouthProgramCategories();
?>

<aside class="info-local-nav info-local-nav--youth" aria-label="청소년 프로그램 메뉴">
    <h2>청소년 프로그램</h2>
    <nav>
        <a
            class="info-local-nav__main-link"
            href="<?= BASE_URL ?>/youth-program-introduction.php"
            <?= $youthLocalPage === 'introduction' ? 'aria-current="page"' : '' ?>>프로그램 소개</a>

        <div class="info-local-nav__submenu" aria-label="프로그램 소개 분야">
            <?php foreach ($youthLocalCategories as $item): ?>
                <a
                    href="<?= BASE_URL ?>/youth-program-category.php?category=<?= urlencode($item['slug']) ?>"
                    <?= $item['slug'] === $youthLocalCategorySlug ? 'aria-current="page"' : '' ?>>
                    <?= htmlspecialchars($item['name'], ENT_QUOTES, 'UTF-8') ?>
                </a>
            <?php endforeach; ?>
        </div>

        <a class="info-local-nav__main-link" href="<?= BASE_URL ?>/programs.php">활동신청</a>
        <a class="info-local-nav__main-link" href="<?= BASE_URL ?>/applications.php">신청내역 조회</a>
    </nav>
</aside>

<?php
include __DIR__ . '/includes/config.php';
require_once __DIR__ . '/includes/functions/youth-program-catalog.php';

$categorySlug = trim((string) ($_GET['category'] ?? 'participation'));
$category = findYouthProgramCategory($categorySlug);
$categories = getYouthProgramCategories();

if ($category === null) {
    http_response_code(404);
    $category = $categories[0] ?? [
        'slug' => 'participation',
        'name' => '청소년 프로그램',
        'eyebrow' => 'YOUTH PROGRAM',
        'description' => '청소년의 경험과 성장을 지원하는 프로그램입니다.',
        'programs' => [],
        'program_count' => 0,
    ];
}

$pageTitle = $category['name'] . ' | 시립서울청소년센터';
$pageCss = ['info-pages.css', 'youth-program-catalog.css'];
$youthLocalPage = 'category';
$youthLocalCategorySlug = $category['slug'];
$youthLocalCategories = $categories;
?>

<!DOCTYPE html>
<html lang="ko">

<?php include __DIR__ . '/includes/head.php'; ?>

<body>
<?php include __DIR__ . '/includes/global-nav.php'; ?>

<main id="main" class="info-page youth-catalog-page">
    <section class="info-hero" aria-labelledby="category-page-title">
        <div class="info-hero__inner inner">
            <nav class="info-breadcrumb" aria-label="현재 위치">
                <ol>
                    <li><a href="<?= BASE_URL ?>/index.php">홈</a></li>
                    <li><a href="<?= BASE_URL ?>/youth-program-introduction.php">청소년 프로그램</a></li>
                    <li aria-current="page"><?= htmlspecialchars($category['name'], ENT_QUOTES, 'UTF-8') ?></li>
                </ol>
            </nav>
            <div class="info-hero__copy">
                <p class="info-eyebrow"><?= htmlspecialchars($category['eyebrow'], ENT_QUOTES, 'UTF-8') ?></p>
                <h1 id="category-page-title"><?= htmlspecialchars($category['name'], ENT_QUOTES, 'UTF-8') ?></h1>
                <p><?= htmlspecialchars($category['description'], ENT_QUOTES, 'UTF-8') ?></p>
            </div>
        </div>
    </section>

    <div class="info-layout inner">
        <?php include __DIR__ . '/includes/components/youth-program-local-nav.php'; ?>

        <div class="info-content">
            <section class="info-section" aria-labelledby="category-list-title">
                <header class="info-section-heading catalog-heading">
                    <div>
                        <p>PROGRAMS</p>
                        <h2 id="category-list-title"><?= htmlspecialchars($category['name'], ENT_QUOTES, 'UTF-8') ?> 프로그램</h2>
                    </div>
                    <span>총 <?= (int) $category['program_count'] ?>개</span>
                </header>

                <div class="catalog-program-grid">
                    <?php foreach ($category['programs'] as $index => $program): ?>
                        <?php
                        $image = getYouthProgramSourceImage($program);
                        $target = getYouthProgramFact($program, '대상');
                        $schedule = getYouthProgramFact($program, '일시');
                        ?>
                        <article class="catalog-program-card">
                            <a
                                class="catalog-program-card__link"
                                href="<?= BASE_URL ?>/youth-program-detail.php?category=<?= urlencode($category['slug']) ?>&amp;program=<?= (int) $program['id'] ?>"
                                aria-label="<?= htmlspecialchars($program['name'], ENT_QUOTES, 'UTF-8') ?> 상세 보기">
                                <div class="catalog-program-card__visual">
                                    <?php if ($image !== ''): ?>
                                        <img
                                            src="<?= htmlspecialchars($image, ENT_QUOTES, 'UTF-8') ?>"
                                            alt=""
                                            loading="lazy"
                                            referrerpolicy="no-referrer">
                                    <?php endif; ?>
                                    <span><?= str_pad((string) ($index + 1), 2, '0', STR_PAD_LEFT) ?></span>
                                </div>
                                <div class="catalog-program-card__body">
                                    <p><?= htmlspecialchars($category['name'], ENT_QUOTES, 'UTF-8') ?></p>
                                    <h3><?= htmlspecialchars($program['name'], ENT_QUOTES, 'UTF-8') ?></h3>
                                    <div class="catalog-program-card__meta">
                                        <?php if ($target !== ''): ?><span><?= htmlspecialchars($target, ENT_QUOTES, 'UTF-8') ?></span><?php endif; ?>
                                        <?php if ($schedule !== ''): ?><span><?= htmlspecialchars($schedule, ENT_QUOTES, 'UTF-8') ?></span><?php endif; ?>
                                    </div>
                                    <strong>
                                        <span>프로그램 상세 보기</span>
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                                            <path d="M5 12h14"></path>
                                            <path d="m13 6 6 6-6 6"></path>
                                        </svg>
                                    </strong>
                                </div>
                            </a>
                        </article>
                    <?php endforeach; ?>
                </div>
            </section>

        </div>
    </div>
</main>

<?php include __DIR__ . '/includes/footer.php'; ?>
<script src="<?= BASE_URL ?>/js/global-nav.js"></script>
<script src="<?= BASE_URL ?>/js/header-search.js"></script>
</body>
</html>

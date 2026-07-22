<?php
include __DIR__ . '/includes/config.php';
require_once __DIR__ . '/includes/functions/youth-program-catalog.php';

$categorySlug = trim((string) ($_GET['category'] ?? ''));
$programId = filter_input(INPUT_GET, 'program', FILTER_VALIDATE_INT) ?: 0;
$category = findYouthProgramCategory($categorySlug);
$program = $category ? findYouthProgramEntry($category, $programId) : null;
$isNotFound = $category === null || $program === null;

if ($isNotFound) {
    http_response_code(404);
    $category = findYouthProgramCategory('participation') ?? ['slug' => 'participation', 'name' => '청소년 프로그램', 'description' => '', 'programs' => []];
    $program = ['id' => 0, 'name' => '프로그램을 찾을 수 없습니다.', 'description' => '', 'facts' => [], 'source_image' => ''];
}

$programs = $category['programs'] ?? [];
$currentIndex = 0;

foreach ($programs as $index => $item) {
    if ((int) ($item['id'] ?? 0) === (int) $program['id']) {
        $currentIndex = $index;
        break;
    }
}

$previousProgram = $currentIndex > 0 ? $programs[$currentIndex - 1] : null;
$nextProgram = $currentIndex < count($programs) - 1 ? $programs[$currentIndex + 1] : null;
$programImage = getYouthProgramSourceImage($program);
$programSummary = getYouthProgramSummary($program, $category);
$pageTitle = $program['name'] . ' | 시립서울청소년센터';
$pageCss = ['info-pages.css', 'youth-program-catalog.css'];
$youthLocalPage = 'detail';
$youthLocalCategorySlug = $category['slug'];
$youthLocalCategories = getYouthProgramCategories();
?>

<!DOCTYPE html>
<html lang="ko">

<?php include __DIR__ . '/includes/head.php'; ?>

<body>
<?php include __DIR__ . '/includes/global-nav.php'; ?>

<main id="main" class="info-page youth-catalog-page youth-detail-page">
    <section class="info-hero" aria-labelledby="program-detail-title">
        <div class="info-hero__inner inner">
            <nav class="info-breadcrumb" aria-label="현재 위치">
                <ol>
                    <li><a href="<?= BASE_URL ?>/index.php">홈</a></li>
                    <li>청소년 프로그램</li>
                    <li><a href="<?= BASE_URL ?>/youth-program-category.php?category=<?= urlencode($category['slug']) ?>"><?= htmlspecialchars($category['name'], ENT_QUOTES, 'UTF-8') ?></a></li>
                    <li aria-current="page"><?= htmlspecialchars($program['name'], ENT_QUOTES, 'UTF-8') ?></li>
                </ol>
            </nav>
            <div class="info-hero__copy">
                <p class="info-eyebrow">PROGRAM DETAIL</p>
                <h1 id="program-detail-title"><?= htmlspecialchars($program['name'], ENT_QUOTES, 'UTF-8') ?></h1>
                <p><?= htmlspecialchars($category['name'], ENT_QUOTES, 'UTF-8') ?> 분야의 사업 내용과 이용 정보를 확인하세요.</p>
            </div>
        </div>
    </section>

    <div class="info-layout inner">
        <?php include __DIR__ . '/includes/components/youth-program-local-nav.php'; ?>

        <div class="info-content">
            <?php if ($isNotFound): ?>
                <section class="catalog-not-found">
                    <p>요청한 프로그램 정보가 없거나 이동되었습니다.</p>
                    <a class="info-button" href="<?= BASE_URL ?>/youth-program-category.php?category=participation">청소년 프로그램 보기</a>
                </section>
            <?php else: ?>
                <a class="catalog-back-link" href="<?= BASE_URL ?>/youth-program-category.php?category=<?= urlencode($category['slug']) ?>">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                        <path d="M19 12H5"></path>
                        <path d="m11 18-6-6 6-6"></path>
                    </svg>
                    <span><?= htmlspecialchars($category['name'], ENT_QUOTES, 'UTF-8') ?> 목록</span>
                </a>

                <article class="catalog-detail">
                    <div class="catalog-detail__visual">
                        <?php if ($programImage !== ''): ?>
                            <img src="<?= htmlspecialchars($programImage, ENT_QUOTES, 'UTF-8') ?>" alt="" referrerpolicy="no-referrer">
                        <?php endif; ?>
                        <span><?= htmlspecialchars($category['eyebrow'] ?? 'YOUTH PROGRAM', ENT_QUOTES, 'UTF-8') ?></span>
                    </div>
                    <div class="catalog-detail__intro">
                        <p><?= htmlspecialchars($category['name'], ENT_QUOTES, 'UTF-8') ?></p>
                        <h2><?= htmlspecialchars($program['name'], ENT_QUOTES, 'UTF-8') ?></h2>
                        <div><?= nl2br(htmlspecialchars($programSummary, ENT_QUOTES, 'UTF-8')) ?></div>
                    </div>
                </article>

                <?php if (!empty($program['facts'])): ?>
                    <section class="info-section" aria-labelledby="program-info-title">
                        <header class="info-section-heading">
                            <p>INFORMATION</p>
                            <h2 id="program-info-title">프로그램 정보</h2>
                        </header>
                        <dl class="catalog-fact-list">
                            <?php foreach ($program['facts'] as $fact): ?>
                                <div>
                                    <dt><?= htmlspecialchars($fact['label'], ENT_QUOTES, 'UTF-8') ?></dt>
                                    <dd><?= htmlspecialchars($fact['value'], ENT_QUOTES, 'UTF-8') ?></dd>
                                </div>
                            <?php endforeach; ?>
                        </dl>
                    </section>
                <?php endif; ?>

                <section class="catalog-detail-cta" aria-label="모집 프로그램 확인">
                    <div>
                        <strong>현재 참여 가능한 프로그램이 궁금한가요?</strong>
                        <p>모집 기간과 대상, 신청 가능 여부는 청소년 프로그램 신청에서 확인할 수 있습니다.</p>
                    </div>
                    <a class="info-button" href="<?= BASE_URL ?>/programs.php">청소년 프로그램 신청</a>
                </section>

                <nav class="catalog-sibling-nav" aria-label="같은 분야의 다른 프로그램">
                    <?php if ($previousProgram): ?>
                        <a href="<?= BASE_URL ?>/youth-program-detail.php?category=<?= urlencode($category['slug']) ?>&amp;program=<?= (int) $previousProgram['id'] ?>">
                            <span>이전 프로그램</span>
                            <strong>
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                                    <path d="M19 12H5"></path>
                                    <path d="m11 18-6-6 6-6"></path>
                                </svg>
                                <span><?= htmlspecialchars($previousProgram['name'], ENT_QUOTES, 'UTF-8') ?></span>
                            </strong>
                        </a>
                    <?php else: ?><span></span><?php endif; ?>
                    <?php if ($nextProgram): ?>
                        <a href="<?= BASE_URL ?>/youth-program-detail.php?category=<?= urlencode($category['slug']) ?>&amp;program=<?= (int) $nextProgram['id'] ?>">
                            <span>다음 프로그램</span>
                            <strong>
                                <span><?= htmlspecialchars($nextProgram['name'], ENT_QUOTES, 'UTF-8') ?></span>
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                                    <path d="M5 12h14"></path>
                                    <path d="m13 6 6 6-6 6"></path>
                                </svg>
                            </strong>
                        </a>
                    <?php endif; ?>
                </nav>
            <?php endif; ?>
        </div>
    </div>
</main>

<?php include __DIR__ . '/includes/footer.php'; ?>
<script src="<?= BASE_URL ?>/js/global-nav.js"></script>
<script src="<?= BASE_URL ?>/js/header-search.js"></script>
</body>
</html>

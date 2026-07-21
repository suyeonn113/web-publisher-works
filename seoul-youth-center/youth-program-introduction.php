<?php
include __DIR__ . '/includes/config.php';
require_once __DIR__ . '/includes/functions/youth-program-catalog.php';

$pageTitle = '청소년 프로그램 소개 | 시립서울청소년센터';
$pageCss = 'info-pages.css';

$programCategories = getYouthProgramCategories();
$youthLocalPage = 'introduction';
$youthLocalCategories = $programCategories;
$categoryIllustrations = [
    'participation' => '01-participation.webp',
    'training' => '02-training.webp',
    'community' => '03-community.webp',
    'school' => '04-school.webp',
    'career' => '05-career.webp',
    'future' => '06-future.webp',
    'global' => '07-international.webp',
    'inclusive' => '08-inclusive.webp',
    'special' => '09-specialized.webp',
    'donggeurami' => '10-circle-school.webp',
    'after-school' => '11-after-school.webp',
    'culture-space' => '12-youth-space.webp',
];
?>

<!DOCTYPE html>
<html lang="ko">

<?php include __DIR__ . '/includes/head.php'; ?>

<body>
<?php include __DIR__ . '/includes/global-nav.php'; ?>

<main id="main" class="info-page">
    <section class="info-hero" aria-labelledby="program-intro-title">
        <div class="info-hero__inner inner">
            <nav class="info-breadcrumb" aria-label="현재 위치">
                <ol>
                    <li><a href="<?= BASE_URL ?>/index.php">홈</a></li>
                    <li>청소년 프로그램</li>
                    <li aria-current="page">프로그램 소개</li>
                </ol>
            </nav>
            <div class="info-hero__copy">
                <p class="info-eyebrow">YOUTH PROGRAM</p>
                <h1 id="program-intro-title">청소년 프로그램 소개</h1>
                <p>관심 분야를 이해하고 현재 모집 중인 활동으로 자연스럽게 이동할 수 있도록 프로그램 체계를 정리했습니다.</p>
            </div>
        </div>
    </section>

    <div class="info-layout inner">
        <?php include __DIR__ . '/includes/components/youth-program-local-nav.php'; ?>

        <div class="info-content">
            <section class="info-section" aria-labelledby="program-system-title">
                <header class="info-section-heading">
                    <p>PROGRAM SYSTEM</p>
                    <h2 id="program-system-title">관심과 성장 단계에 맞춘 활동 분야</h2>
                </header>
                <div class="program-overview-lead">
                    <p>시립서울청소년센터의 프로그램은 참여, 체험, 관계, 진로, 돌봄을 중심으로 청소년의 일상과 성장 과정을 지역과 미래로 연결합니다.</p>
                </div>
            </section>

            <section class="info-section" aria-labelledby="program-category-title">
                <header class="info-section-heading">
                    <p>CATEGORIES</p>
                    <h2 id="program-category-title">프로그램 분야</h2>
                </header>
                <div class="program-category-grid">
                    <?php foreach ($programCategories as $index => $category): ?>
                        <a class="program-category-card" href="<?= BASE_URL ?>/youth-program-category.php?category=<?= urlencode($category['slug']) ?>">
                            <div class="program-category-card__header">
                                <span class="program-category-card__number"><?= str_pad((string) ($index + 1), 2, '0', STR_PAD_LEFT) ?></span>
                                <?php if (isset($categoryIllustrations[$category['slug']])): ?>
                                    <span class="program-category-card__visual" aria-hidden="true">
                                        <img
                                            src="<?= BASE_URL ?>/assets/images/program-category-illustrations/<?= htmlspecialchars($categoryIllustrations[$category['slug']], ENT_QUOTES, 'UTF-8') ?>"
                                            alt=""
                                            width="360"
                                            height="360"
                                        >
                                    </span>
                                <?php endif; ?>
                            </div>
                            <h3><?= htmlspecialchars($category['name'], ENT_QUOTES, 'UTF-8') ?></h3>
                            <p><?= htmlspecialchars($category['description'], ENT_QUOTES, 'UTF-8') ?></p>
                            <strong>
                                <span>프로그램 <?= (int) $category['program_count'] ?>개 보기</span>
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                                    <path d="M5 12h14"></path>
                                    <path d="m13 6 6 6-6 6"></path>
                                </svg>
                            </strong>
                        </a>
                    <?php endforeach; ?>
                </div>
            </section>

            <section class="info-section" aria-label="모집 프로그램 이동">
                <div class="program-overview-cta">
                    <div>
                        <strong>지금 참여할 수 있는 프로그램을 찾아보세요.</strong>
                        <p>모집 상태와 대상 연령을 확인하고 온라인으로 신청할 수 있습니다.</p>
                    </div>
                    <a class="info-button" href="<?= BASE_URL ?>/programs.php">모집 프로그램 보기</a>
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

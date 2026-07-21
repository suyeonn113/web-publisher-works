<?php
header('Content-Type: application/json; charset=utf-8');

include __DIR__ . '/../includes/config.php';
include __DIR__ . '/../includes/data/youth-programs.php';
include __DIR__ . '/../includes/data/lifelong-education-classes.php';
include __DIR__ . '/../includes/functions/program.service.php';

/**
 * -----------------------------------------
 * 1) 청소년 프로그램 필터링
 * -----------------------------------------
 */
$filteredYouthPrograms = getRecommendPrograms($youthPrograms, $_GET);

/**
 * -----------------------------------------
 * 2) 청소년 프로그램 HTML 생성
 * -----------------------------------------
 */
ob_start();

if (!empty($filteredYouthPrograms)) {
    foreach ($filteredYouthPrograms as $program) {
        $programMeta = getProgramCardMeta($program);
        $cardVariant = 'home-explorer';
        include __DIR__ . '/../includes/components/program-card.php';
    }
}

$youthHtml = ob_get_clean();

/**
 * -----------------------------------------
 * 3) 평생교육 프로그램 필터링
 * -----------------------------------------
 */
$filteredEducationPrograms = isset($lifelongEducationClasses) && is_array($lifelongEducationClasses)
    ? $lifelongEducationClasses
    : [];

/**
 * -----------------------------------------
 * 4) 평생교육 프로그램 HTML 생성
 * -----------------------------------------
 */
ob_start();

if (!empty($filteredEducationPrograms)) {
    foreach ($filteredEducationPrograms as $classIndex => $program) {
        $title = (string) ($program['title'] ?? '평생교육 강좌');
        $termLabel = trim((string) ($currentEducationTerm['label'] ?? '') . ' · ' . (string) ($currentEducationTerm['period'] ?? ''), ' ·');
        $scheduleLabel = trim((string) ($program['days_label'] ?? '') . ' ' . (string) ($program['time'] ?? ''));
        $feeLabel = (string) ($program['adult_fee'] ?? $program['youth_fee'] ?? '별도 안내');
        $targetId = 'education-class-' . ($classIndex + 1);
        ?>
        <article class="card education-preview-card">
            <a class="education-preview-card__link" href="<?= BASE_URL ?>/lifelong-education-classes.php#<?= htmlspecialchars($targetId, ENT_QUOTES, 'UTF-8') ?>">
                <div class="education-preview-card__heading">
                    <h4 class="education-preview-card__title"><?= htmlspecialchars($title, ENT_QUOTES, 'UTF-8') ?></h4>
                </div>
                <strong class="education-preview-card__schedule"><?= htmlspecialchars($scheduleLabel, ENT_QUOTES, 'UTF-8') ?></strong>
                <dl class="education-preview-card__meta">
                    <div>
                        <dt>운영기간</dt>
                        <dd><?= htmlspecialchars($termLabel, ENT_QUOTES, 'UTF-8') ?></dd>
                    </div>
                    <div>
                        <dt>수강료</dt>
                        <dd><?= htmlspecialchars($feeLabel, ENT_QUOTES, 'UTF-8') ?></dd>
                    </div>
                </dl>
            </a>
        </article>
        <?php
    }
}

$educationHtml = ob_get_clean();

/**
 * -----------------------------------------
 * 5) 응답
 * -----------------------------------------
 */
echo json_encode([
    'youthHtml' => $youthHtml,
    'educationHtml' => $educationHtml,
    'youthCount' => count($filteredYouthPrograms),
    'educationCount' => count($filteredEducationPrograms),
], JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);

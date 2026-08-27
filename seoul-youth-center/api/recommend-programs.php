<?php
header('Content-Type: application/json; charset=utf-8');

include __DIR__ . '/../includes/config.php';
include __DIR__ . '/../includes/data/youth-programs.php';
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
 * 3) 응답
 * -----------------------------------------
 */
echo json_encode([
    'youthHtml' => $youthHtml,
    'youthCount' => count($filteredYouthPrograms),
], JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);

<?php

declare(strict_types=1);

include dirname(__DIR__) . '/includes/config.php';
require_once dirname(__DIR__) . '/includes/functions/youth-program-catalog.php';

function outputProgramImageFallback(): void
{
    header('Content-Type: image/svg+xml; charset=UTF-8');
    header('Cache-Control: public, max-age=3600');
    echo '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 760">'
        . '<rect width="1200" height="760" fill="#FFF3E8"/>'
        . '<circle cx="1030" cy="130" r="180" fill="#EF8A36" fill-opacity=".12"/>'
        . '<circle cx="180" cy="650" r="230" fill="#DB9C62" fill-opacity=".12"/>'
        . '<text x="600" y="390" text-anchor="middle" fill="#EF8A36" font-family="sans-serif" font-size="42" font-weight="700">SEOUL YOUTH CENTER</text>'
        . '</svg>';
    exit;
}

$programId = filter_input(INPUT_GET, 'program', FILTER_VALIDATE_INT) ?: 0;
$program = findYouthProgramEntryById($programId);
$source = trim((string) ($program['source_image'] ?? ''));

if ($programId <= 0 || !str_starts_with($source, 'http://www.youthc.or.kr/upload/company/')) {
    http_response_code(404);
    outputProgramImageFallback();
}

$path = (string) parse_url($source, PHP_URL_PATH);
$extension = strtolower(pathinfo($path, PATHINFO_EXTENSION));
$mimeTypes = [
    'jpg' => 'image/jpeg',
    'jpeg' => 'image/jpeg',
    'png' => 'image/png',
    'gif' => 'image/gif',
    'webp' => 'image/webp',
];
$contentType = $mimeTypes[$extension] ?? 'image/jpeg';
$cacheDirectory = rtrim(sys_get_temp_dir(), DIRECTORY_SEPARATOR) . DIRECTORY_SEPARATOR . 'seoul-youth-center-program-images';
$cacheFile = $cacheDirectory . DIRECTORY_SEPARATOR . $programId . '.' . ($extension !== '' ? $extension : 'jpg');

if (!is_file($cacheFile) || filesize($cacheFile) === 0) {
    if (!is_dir($cacheDirectory)) {
        @mkdir($cacheDirectory, 0775, true);
    }

    $context = stream_context_create([
        'http' => [
            'timeout' => 8,
            'follow_location' => 1,
            'user_agent' => 'Mozilla/5.0 SeoulYouthCenterPortfolio/1.0',
        ],
    ]);
    $image = @file_get_contents($source, false, $context);

    if (!is_string($image) || strlen($image) < 100) {
        outputProgramImageFallback();
    }

    if (is_dir($cacheDirectory) && is_writable($cacheDirectory)) {
        @file_put_contents($cacheFile, $image, LOCK_EX);
    }
} else {
    $image = file_get_contents($cacheFile);
}

if (!is_string($image) || $image === '') {
    outputProgramImageFallback();
}

header('Content-Type: ' . $contentType);
header('Content-Length: ' . strlen($image));
header('Cache-Control: public, max-age=604800, stale-while-revalidate=86400');
header('X-Content-Type-Options: nosniff');
echo $image;

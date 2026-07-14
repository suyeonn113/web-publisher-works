<?php
include __DIR__ . '/../includes/config.php';

$query = trim((string) ($_SERVER['QUERY_STRING'] ?? ''));
$target = BASE_URL . '/pages/notice-detail.php' . ($query !== '' ? '?' . $query : '');

header('Location: ' . $target, true, 302);
exit;

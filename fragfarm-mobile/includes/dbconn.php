<?php
include_once __DIR__ . '/config.php';

mysqli_report(MYSQLI_REPORT_OFF);

$dbConfig = [
    'host' => getenv('FRAGFARM_DB_HOST') ?: 'localhost',
    'user' => getenv('FRAGFARM_DB_USER') ?: '',
    'password' => getenv('FRAGFARM_DB_PASSWORD') ?: '',
    'database' => getenv('FRAGFARM_DB_NAME') ?: '',
];

$localConfigPath = __DIR__ . '/db.local.php';

if (is_file($localConfigPath)) {
    $localConfig = require $localConfigPath;

    if (is_array($localConfig)) {
        $dbConfig = array_merge($dbConfig, $localConfig);
    }
}

$mysqli = @mysqli_connect(
    $dbConfig['host'],
    $dbConfig['user'],
    $dbConfig['password'],
    $dbConfig['database']
);

if (!$mysqli && $dbConfig['host'] === 'localhost') {
    $mysqli = @mysqli_connect(
        '127.0.0.1',
        $dbConfig['user'],
        $dbConfig['password'],
        $dbConfig['database']
    );
}

if (!$mysqli) {
    error_log('Fragfarm DB connection failed: ' . mysqli_connect_error());
    header('Location: ' . BASE_URL . '/error.php');
    exit;
}

mysqli_set_charset($mysqli, 'utf8mb4');
?>

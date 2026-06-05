<?php

if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

$serverName = $_SERVER['SERVER_NAME'] ?? 'localhost';

$isLocal = in_array($serverName, [
    'localhost',
    '127.0.0.1',
    '::1'
]);

define('ENV', $isLocal ? 'local' : 'production');

if (ENV === 'local') {
    define('BASE_URL', '');
} else {
    define('BASE_URL', '/seoul-youth-center');
}
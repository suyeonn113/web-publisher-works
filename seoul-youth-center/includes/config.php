<?php

declare(strict_types=1);

if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

$serverName = $_SERVER['SERVER_NAME'] ?? 'localhost';

$isLocal = in_array(
    $serverName,
    [
        'localhost',
        '127.0.0.1',
        '::1',
    ],
    true
);

define('ENV', $isLocal ? 'local' : 'production');

if (ENV === 'local') {
    define('BASE_URL', '');
} else {
    define('BASE_URL', '/seoul-youth-center');
}

/**
 * 프로그램 모집 상태와 달력에서 사용하는 공통 데모 기준일
 *
 * 실제 서버 날짜와 관계없이 프로젝트는
 * 2026년 3월 23일을 오늘로 간주한다.
 */
define('PROGRAM_DEMO_TODAY', '2026-03-23');
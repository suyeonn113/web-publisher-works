<?php

if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

$serverName = $_SERVER['SERVER_NAME'] ?? '';
$scriptName = $_SERVER['SCRIPT_NAME'] ?? '';
$localHosts = ['localhost', '127.0.0.1', '::1'];
$isLocal = in_array($serverName, $localHosts, true);

if ($isLocal) {
    $baseUrl = strpos($scriptName, '/fragfarm-mobile/') === 0 ? '/fragfarm-mobile' : '';
} else {
    $baseUrl = '/fragfarm-mobile';
}

define('BASE_URL', $baseUrl);

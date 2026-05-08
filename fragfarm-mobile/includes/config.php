<?php

if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

if ($_SERVER['SERVER_NAME'] === 'localhost') {
    define('BASE_URL', '');
} else {
    define('BASE_URL', '/fragfarm-mobile');
}

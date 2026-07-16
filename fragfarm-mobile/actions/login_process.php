<?php
require_once __DIR__ . '/../includes/config.php';
require_once __DIR__ . '/../includes/dbconn.php';
require_once __DIR__ . '/../includes/http-response.php';

if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

mysqli_set_charset($mysqli, 'utf8mb4');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    move_with_alert('잘못된 접근입니다.', BASE_URL . '/pages/login.php');
}

$userId = trim($_POST['user_id'] ?? '');
$password = $_POST['password'] ?? '';

if ($userId === '' || $password === '') {
    move_with_alert('아이디와 비밀번호를 입력해주세요.');
}

$sql = '
    SELECT
        id,
        user_id,
        password_hash,
        user_name
    FROM fragfarm_members
    WHERE user_id = ?
    LIMIT 1
';

$stmt = mysqli_prepare($mysqli, $sql);

if (!$stmt) {
    move_with_alert('로그인 처리 중 오류가 발생했습니다.');
}

mysqli_stmt_bind_param($stmt, 's', $userId);
mysqli_stmt_execute($stmt);
$result = mysqli_stmt_get_result($stmt);
$member = mysqli_fetch_assoc($result);

mysqli_stmt_close($stmt);

if (!$member || !password_verify($password, $member['password_hash'])) {
    mysqli_close($mysqli);
    move_with_alert('아이디 또는 비밀번호가 올바르지 않습니다.');
}

session_regenerate_id(true);

$_SESSION['member_id'] = $member['id'];
$_SESSION['user_id'] = $member['user_id'];
$_SESSION['user_name'] = $member['user_name'];

mysqli_close($mysqli);

$redirectUrl = $_SESSION['after_login_redirect'] ?? BASE_URL . '/index.php';
unset($_SESSION['after_login_redirect']);
header('Location: ' . $redirectUrl);
exit;

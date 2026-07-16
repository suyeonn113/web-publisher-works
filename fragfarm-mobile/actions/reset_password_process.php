<?php
require_once __DIR__ . '/../includes/config.php';
require_once __DIR__ . '/../includes/dbconn.php';
require_once __DIR__ . '/../includes/http-response.php';
require_once __DIR__ . '/../includes/security.php';
require_once __DIR__ . '/../includes/validation.php';

mysqli_set_charset($mysqli, 'utf8mb4');

if ($_SERVER['REQUEST_METHOD'] !== 'POST' || empty($_SESSION['password_reset_member_id'])) {
    move_with_alert('잘못된 접근입니다.', BASE_URL . '/pages/find_password.php');
}

if (!csrf_verify('password_reset', $_POST['csrf_token'] ?? null)) {
    move_with_alert('요청이 만료되었습니다. 다시 시도해주세요.', BASE_URL . '/pages/reset_password.php');
}

$memberId = (int) $_SESSION['password_reset_member_id'];
$newPassword = $_POST['new_password'] ?? '';
$confirmPassword = $_POST['confirm_password'] ?? '';

if ($newPassword === '' || $confirmPassword === '') {
    move_with_alert('새 비밀번호를 입력해주세요.');
}

if (!valid_member_password($newPassword)) {
    move_with_alert('새 비밀번호 형식이 올바르지 않습니다.');
}

if ($newPassword !== $confirmPassword) {
    move_with_alert('새 비밀번호가 일치하지 않습니다.');
}

$passwordHash = password_hash($newPassword, PASSWORD_DEFAULT);
$sql = 'UPDATE fragfarm_members SET password_hash = ? WHERE id = ?';
$stmt = mysqli_prepare($mysqli, $sql);

if (!$stmt) {
    move_with_alert('비밀번호 재설정 중 오류가 발생했습니다.');
}

mysqli_stmt_bind_param($stmt, 'si', $passwordHash, $memberId);

if (!mysqli_stmt_execute($stmt)) {
    mysqli_stmt_close($stmt);
    move_with_alert('비밀번호 재설정에 실패했습니다.');
}

mysqli_stmt_close($stmt);
mysqli_close($mysqli);

unset($_SESSION['password_reset_member_id']);
csrf_forget('password_reset');

move_with_alert('비밀번호가 변경되었습니다. 로그인해주세요.', BASE_URL . '/pages/login.php');

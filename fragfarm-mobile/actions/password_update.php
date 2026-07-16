<?php
require_once __DIR__ . '/../includes/config.php';
require_once __DIR__ . '/../includes/dbconn.php';
require_once __DIR__ . '/../includes/http-response.php';
require_once __DIR__ . '/../includes/security.php';
require_once __DIR__ . '/../includes/validation.php';

mysqli_set_charset($mysqli, 'utf8mb4');

if ($_SERVER['REQUEST_METHOD'] !== 'POST' || empty($_SESSION['member_id'])) {
    move_with_alert('잘못된 접근입니다.', BASE_URL . '/pages/login.php');
}

if (!csrf_verify('password_update', $_POST['csrf_token'] ?? null)) {
    move_with_alert('요청이 만료되었습니다. 다시 시도해주세요.', BASE_URL . '/pages/member_edit.php');
}

$memberId = (int) $_SESSION['member_id'];
$currentPassword = $_POST['current_password'] ?? '';
$newPassword = $_POST['new_password'] ?? '';
$confirmPassword = $_POST['confirm_password'] ?? '';

if ($currentPassword === '' || $newPassword === '' || $confirmPassword === '') {
    move_with_alert('비밀번호 항목을 모두 입력해주세요.');
}

if (!valid_member_password($newPassword)) {
    move_with_alert('새 비밀번호 형식이 올바르지 않습니다.');
}

if ($newPassword !== $confirmPassword) {
    move_with_alert('새 비밀번호가 일치하지 않습니다.');
}

$sql = 'SELECT password_hash FROM fragfarm_members WHERE id = ? LIMIT 1';
$stmt = mysqli_prepare($mysqli, $sql);

if (!$stmt) {
    move_with_alert('비밀번호 변경 중 오류가 발생했습니다.');
}

mysqli_stmt_bind_param($stmt, 'i', $memberId);
mysqli_stmt_execute($stmt);
$result = mysqli_stmt_get_result($stmt);
$member = mysqli_fetch_assoc($result);
mysqli_stmt_close($stmt);

if (!$member || !password_verify($currentPassword, $member['password_hash'])) {
    mysqli_close($mysqli);
    move_with_alert('현재 비밀번호가 올바르지 않습니다.');
}

$passwordHash = password_hash($newPassword, PASSWORD_DEFAULT);
$updateSql = 'UPDATE fragfarm_members SET password_hash = ? WHERE id = ?';
$updateStmt = mysqli_prepare($mysqli, $updateSql);

if (!$updateStmt) {
    move_with_alert('비밀번호 변경 중 오류가 발생했습니다.');
}

mysqli_stmt_bind_param($updateStmt, 'si', $passwordHash, $memberId);

if (!mysqli_stmt_execute($updateStmt)) {
    mysqli_stmt_close($updateStmt);
    move_with_alert('비밀번호 변경에 실패했습니다.');
}

mysqli_stmt_close($updateStmt);
mysqli_close($mysqli);
csrf_forget('password_update');

move_with_alert('비밀번호가 변경되었습니다.', BASE_URL . '/pages/member_edit.php');

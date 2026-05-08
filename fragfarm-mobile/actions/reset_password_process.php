<?php
require_once __DIR__ . '/../includes/config.php';
require_once __DIR__ . '/../includes/dbconn.php';

mysqli_set_charset($mysqli, 'utf8mb4');

function move_with_alert($message, $url = null)
{
    $safeMessage = htmlspecialchars($message, ENT_QUOTES, 'UTF-8');
    $safeUrl = $url ? htmlspecialchars($url, ENT_QUOTES, 'UTF-8') : '';

    echo '<!DOCTYPE html><html lang="ko"><head><meta charset="UTF-8"><title>Fragfarm</title></head><body>';
    echo '<script>';
    echo 'alert("' . $safeMessage . '");';
    echo $safeUrl ? 'location.href="' . $safeUrl . '";' : 'history.back();';
    echo '</script>';
    echo '</body></html>';
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST' || empty($_SESSION['password_reset_member_id'])) {
    move_with_alert('잘못된 접근입니다.', BASE_URL . '/pages/find_password.php');
}

$memberId = (int) $_SESSION['password_reset_member_id'];
$newPassword = $_POST['new_password'] ?? '';
$confirmPassword = $_POST['confirm_password'] ?? '';

if ($newPassword === '' || $confirmPassword === '') {
    move_with_alert('새 비밀번호를 입력해주세요.');
}

if (!preg_match('/^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^*+=-]).{10,}$/', $newPassword)) {
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

move_with_alert('비밀번호가 변경되었습니다. 로그인해주세요.', BASE_URL . '/pages/login.php');

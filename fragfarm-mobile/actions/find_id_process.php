<?php
require_once __DIR__ . '/../includes/config.php';
require_once __DIR__ . '/../includes/dbconn.php';
require_once __DIR__ . '/../includes/http-response.php';
require_once __DIR__ . '/../includes/validation.php';

mysqli_set_charset($mysqli, 'utf8mb4');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    move_with_alert('잘못된 접근입니다.', BASE_URL . '/pages/find_id.php');
}

$userName = trim($_POST['user_name'] ?? '');
$phone = trim($_POST['phone'] ?? '');

if ($userName === '' || $phone === '') {
    move_with_alert('이름과 전화번호를 입력해주세요.');
}

if (!valid_member_phone($phone)) {
    move_with_alert('전화번호 형식이 올바르지 않습니다.');
}

$sql = 'SELECT user_id FROM fragfarm_members WHERE user_name = ? AND phone = ? LIMIT 1';
$stmt = mysqli_prepare($mysqli, $sql);

if (!$stmt) {
    move_with_alert('아이디 찾기 중 오류가 발생했습니다.');
}

mysqli_stmt_bind_param($stmt, 'ss', $userName, $phone);
mysqli_stmt_execute($stmt);
$result = mysqli_stmt_get_result($stmt);
$member = mysqli_fetch_assoc($result);
mysqli_stmt_close($stmt);
mysqli_close($mysqli);

if (!$member) {
    move_with_alert('일치하는 회원 정보를 찾을 수 없습니다.');
}

$_SESSION['found_user_id'] = $member['user_id'];

header('Location: ' . BASE_URL . '/pages/find_id_result.php');
exit;

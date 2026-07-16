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

if (!csrf_verify('member_update', $_POST['csrf_token'] ?? null)) {
    move_with_alert('요청이 만료되었습니다. 다시 시도해주세요.', BASE_URL . '/pages/member_edit.php');
}

$memberId = (int) $_SESSION['member_id'];
$userName = trim($_POST['user_name'] ?? '');
$email = trim($_POST['email'] ?? '');
$phone = trim($_POST['phone'] ?? '');
$postcode = trim($_POST['postcode'] ?? '');
$addressLine1 = trim($_POST['address_line1'] ?? '');
$addressLine2 = trim($_POST['address_line2'] ?? '');
$agreeMarketing = isset($_POST['agree_marketing']) ? 1 : 0;

if ($userName === '' || $email === '' || $phone === '' || $postcode === '' || $addressLine1 === '' || $addressLine2 === '') {
    move_with_alert('필수 입력 항목을 모두 입력해주세요.');
}

if (!valid_member_email($email)) {
    move_with_alert('이메일 형식이 올바르지 않습니다.');
}

if (!valid_member_phone($phone)) {
    move_with_alert('전화번호 형식이 올바르지 않습니다.');
}

$duplicateSql = 'SELECT id FROM fragfarm_members WHERE email = ? AND id <> ? LIMIT 1';
$duplicateStmt = mysqli_prepare($mysqli, $duplicateSql);

if (!$duplicateStmt) {
    move_with_alert('회원정보 수정 중 오류가 발생했습니다.');
}

mysqli_stmt_bind_param($duplicateStmt, 'si', $email, $memberId);
mysqli_stmt_execute($duplicateStmt);
mysqli_stmt_store_result($duplicateStmt);

if (mysqli_stmt_num_rows($duplicateStmt) > 0) {
    mysqli_stmt_close($duplicateStmt);
    move_with_alert('이미 사용 중인 이메일입니다.');
}

mysqli_stmt_close($duplicateStmt);

$updateSql = '
    UPDATE fragfarm_members
    SET
        user_name = ?,
        email = ?,
        phone = ?,
        postcode = ?,
        address_line1 = ?,
        address_line2 = ?,
        agree_marketing = ?
    WHERE id = ?
';

$stmt = mysqli_prepare($mysqli, $updateSql);

if (!$stmt) {
    move_with_alert('회원정보 수정 중 오류가 발생했습니다.');
}

mysqli_stmt_bind_param(
    $stmt,
    'ssssssii',
    $userName,
    $email,
    $phone,
    $postcode,
    $addressLine1,
    $addressLine2,
    $agreeMarketing,
    $memberId
);

if (!mysqli_stmt_execute($stmt)) {
    mysqli_stmt_close($stmt);
    move_with_alert('회원정보 수정에 실패했습니다.');
}

mysqli_stmt_close($stmt);
mysqli_close($mysqli);

$_SESSION['user_name'] = $userName;
csrf_forget('member_update');

move_with_alert('회원정보가 수정되었습니다.', BASE_URL . '/pages/member_edit.php');

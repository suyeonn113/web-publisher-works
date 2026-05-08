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

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    move_with_alert('잘못된 접근입니다.', BASE_URL . '/pages/join.php');
}

$userId = trim($_POST['user_id'] ?? '');
$password = $_POST['password'] ?? '';
$confirmPassword = $_POST['confirm_password'] ?? '';
$userName = trim($_POST['user_name'] ?? '');
$postcode = trim($_POST['postcode'] ?? '');
$addressLine1 = trim($_POST['address_line1'] ?? '');
$addressLine2 = trim($_POST['address_line2'] ?? '');
$phone = trim($_POST['phone'] ?? '');
$email = trim($_POST['email'] ?? '');
$birthYear = trim($_POST['birth_year'] ?? '');
$birthMonth = trim($_POST['birth_month'] ?? '');
$birthDay = trim($_POST['birth_day'] ?? '');
$calendarType = $_POST['calendar_type'] ?? 'solar';
$agreeTerms = isset($_POST['agree_terms']) ? 1 : 0;
$agreePrivacy = isset($_POST['agree_privacy']) ? 1 : 0;
$agreeAge = isset($_POST['agree_age']) ? 1 : 0;
$agreeMarketing = isset($_POST['agree_marketing']) ? 1 : 0;

if (
    $userId === '' ||
    $password === '' ||
    $confirmPassword === '' ||
    $userName === '' ||
    $postcode === '' ||
    $addressLine1 === '' ||
    $addressLine2 === '' ||
    $phone === '' ||
    $email === ''
) {
    move_with_alert('필수 입력 항목을 모두 입력해주세요.');
}

if (!preg_match('/^(?=.*[a-z])(?=.*[0-9])[a-z0-9]{4,16}$/', $userId)) {
    move_with_alert('아이디 형식이 올바르지 않습니다.');
}

if (!preg_match('/^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^*+=-]).{10,}$/', $password)) {
    move_with_alert('비밀번호 형식이 올바르지 않습니다.');
}

if ($password !== $confirmPassword) {
    move_with_alert('비밀번호가 일치하지 않습니다.');
}

if (!preg_match('/^01[0-9]{8,9}$/', $phone)) {
    move_with_alert('전화번호 형식이 올바르지 않습니다.');
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    move_with_alert('이메일 형식이 올바르지 않습니다.');
}

if (!in_array($calendarType, ['solar', 'lunar'], true)) {
    $calendarType = 'solar';
}

if (!$agreeTerms || !$agreePrivacy || !$agreeAge) {
    move_with_alert('필수 약관에 동의해주세요.');
}

$birthDate = null;
if ($birthYear !== '' && $birthMonth !== '' && $birthDay !== '') {
    $year = (int) $birthYear;
    $month = (int) $birthMonth;
    $day = (int) $birthDay;

    if (!checkdate($month, $day, $year)) {
        move_with_alert('생년월일을 다시 확인해주세요.');
    }

    $birthDate = sprintf('%04d-%02d-%02d', $year, $month, $day);
}

$duplicateSql = 'SELECT id FROM fragfarm_members WHERE user_id = ? OR email = ? LIMIT 1';
$duplicateStmt = mysqli_prepare($mysqli, $duplicateSql);

if (!$duplicateStmt) {
    move_with_alert('회원가입 처리 중 오류가 발생했습니다.');
}

mysqli_stmt_bind_param($duplicateStmt, 'ss', $userId, $email);
mysqli_stmt_execute($duplicateStmt);
mysqli_stmt_store_result($duplicateStmt);

if (mysqli_stmt_num_rows($duplicateStmt) > 0) {
    mysqli_stmt_close($duplicateStmt);
    move_with_alert('이미 사용 중인 아이디 또는 이메일입니다.');
}

mysqli_stmt_close($duplicateStmt);

$passwordHash = password_hash($password, PASSWORD_DEFAULT);

$insertSql = '
    INSERT INTO fragfarm_members (
        user_id,
        password_hash,
        user_name,
        postcode,
        address_line1,
        address_line2,
        phone,
        email,
        birth_date,
        calendar_type,
        agree_terms,
        agree_privacy,
        agree_age,
        agree_marketing
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
';

$insertStmt = mysqli_prepare($mysqli, $insertSql);

if (!$insertStmt) {
    move_with_alert('회원가입 처리 중 오류가 발생했습니다.');
}

mysqli_stmt_bind_param(
    $insertStmt,
    'ssssssssssiiii',
    $userId,
    $passwordHash,
    $userName,
    $postcode,
    $addressLine1,
    $addressLine2,
    $phone,
    $email,
    $birthDate,
    $calendarType,
    $agreeTerms,
    $agreePrivacy,
    $agreeAge,
    $agreeMarketing
);

if (!mysqli_stmt_execute($insertStmt)) {
    mysqli_stmt_close($insertStmt);
    move_with_alert('회원가입에 실패했습니다. 다시 시도해주세요.');
}

mysqli_stmt_close($insertStmt);
mysqli_close($mysqli);

move_with_alert('회원가입이 완료되었습니다. 로그인해주세요.', BASE_URL . '/pages/login.php');

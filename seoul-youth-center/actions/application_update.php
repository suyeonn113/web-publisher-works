<?php
require_once __DIR__ . '/../includes/config.php';
require_once __DIR__ . '/../includes/dbconn.php';
require_once __DIR__ . '/../includes/functions/application.helpers.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    syc_move_with_alert('잘못된 접근입니다.', BASE_URL . '/programs.php');
}

$applicationId = (int) ($_POST['id'] ?? 0);
syc_require_verified_application($applicationId);

$applicantName = trim($_POST['applicant_name'] ?? '');
$birthdate = trim($_POST['birthdate'] ?? '');
$gender = $_POST['gender'] ?? '';
$phone = preg_replace('/\D+/', '', $_POST['phone'] ?? '');
$email = trim($_POST['email'] ?? '');
$address = trim($_POST['address'] ?? '');
$school = trim($_POST['school'] ?? '');

if ($applicationId <= 0 || $applicantName === '' || $birthdate === '' || $gender === '' || $phone === '') {
    syc_move_with_alert('필수 입력 항목을 모두 입력해주세요.');
}

if (!preg_match('/^\d{8}$/', $birthdate)) {
    syc_move_with_alert('생년월일은 숫자 8자리로 입력해주세요.');
}

if (!in_array($gender, ['male', 'female'], true)) {
    syc_move_with_alert('성별을 다시 선택해주세요.');
}

if (!preg_match('/^01[0-9]{8,9}$/', $phone)) {
    syc_move_with_alert('휴대전화 번호를 숫자만 입력해주세요.');
}

if ($email !== '' && !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    syc_move_with_alert('이메일 형식이 올바르지 않습니다.');
}

$sql = '
    UPDATE seoul_youth_center_program_applications
    SET applicant_name = ?,
        birthdate = ?,
        gender = ?,
        phone = ?,
        email = ?,
        address = ?,
        school = ?
    WHERE id = ?
';

$stmt = mysqli_prepare($mysqli, $sql);

if (!$stmt) {
    syc_move_with_alert('신청 수정 중 오류가 발생했습니다.');
}

mysqli_stmt_bind_param(
    $stmt,
    'sssssssi',
    $applicantName,
    $birthdate,
    $gender,
    $phone,
    $email,
    $address,
    $school,
    $applicationId
);

if (!mysqli_stmt_execute($stmt)) {
    mysqli_stmt_close($stmt);
    mysqli_close($mysqli);
    syc_move_with_alert('신청 수정에 실패했습니다. 다시 시도해주세요.');
}

mysqli_stmt_close($stmt);
mysqli_close($mysqli);

syc_move_with_alert('신청 정보가 수정되었습니다.', BASE_URL . '/application-detail.php?id=' . $applicationId);

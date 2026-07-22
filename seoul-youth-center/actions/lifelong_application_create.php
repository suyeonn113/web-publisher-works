<?php
require_once __DIR__ . '/../includes/config.php';
require_once __DIR__ . '/../includes/data/lifelong-education-classes.php';
require_once __DIR__ . '/../includes/functions/lifelong-education.service.php';
require_once __DIR__ . '/../includes/functions/application.helpers.php';

if (($_SERVER['REQUEST_METHOD'] ?? 'GET') !== 'POST') {
    syc_move_with_alert('잘못된 접근입니다.', BASE_URL . '/lifelong-education-apply.php');
}

$programId = (int) ($_POST['program_id'] ?? 0);
$targetClass = findLifelongEducationClass(getOpenLifelongEducationClasses($lifelongEducationClasses), $programId);
$applicantName = trim((string) ($_POST['applicant_name'] ?? ''));
$birthdate = trim((string) ($_POST['birthdate'] ?? ''));
$gender = (string) ($_POST['gender'] ?? '');
$password = (string) ($_POST['password'] ?? '');
$passwordConfirm = (string) ($_POST['password_confirm'] ?? '');
$phone = preg_replace('/\D+/', '', (string) ($_POST['phone'] ?? ''));
$email = trim((string) ($_POST['email'] ?? ''));
$address = trim((string) ($_POST['address'] ?? ''));
$school = trim((string) ($_POST['school'] ?? ''));

if (!$targetClass) {
    syc_move_with_alert('현재 접수 가능한 강좌가 아닙니다.', BASE_URL . '/lifelong-education-apply.php');
}

if ($applicantName === '' || $birthdate === '' || $gender === '' || $password === '' || $passwordConfirm === '' || $phone === '') {
    syc_move_with_alert('필수 입력 항목을 모두 입력해주세요.');
}

if (!isset($_POST['agree_privacy'], $_POST['agree_third_party'])) {
    syc_move_with_alert('필수 동의 항목을 확인해주세요.');
}

if (!preg_match('/^\d{8}$/', $birthdate) || !in_array($gender, ['male', 'female'], true)) {
    syc_move_with_alert('생년월일과 성별을 다시 확인해주세요.');
}

if (strlen($password) < 4 || $password !== $passwordConfirm) {
    syc_move_with_alert('비밀번호는 4자 이상이며 확인 값과 일치해야 합니다.');
}

if (!preg_match('/^01[0-9]{8,9}$/', $phone)) {
    syc_move_with_alert('휴대전화 번호를 숫자만 입력해주세요.');
}

if ($email !== '' && !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    syc_move_with_alert('이메일 형식이 올바르지 않습니다.');
}

$programTitle = (string) $targetClass['title'];
$passwordHash = password_hash($password, PASSWORD_DEFAULT);
$attachmentName = '';

require_once __DIR__ . '/../includes/dbconn.php';
$sql = '
    INSERT INTO seoul_youth_center_program_applications (
        program_type, program_id, program_title, applicant_name, birthdate, gender,
        password_hash, phone, email, address, school, attachment_name
    ) VALUES (\'lifelong\', ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
';
$stmt = mysqli_prepare($mysqli, $sql);

if (!$stmt) {
    mysqli_close($mysqli);
    syc_move_with_alert('신청 처리 중 오류가 발생했습니다. 데이터베이스 업데이트 여부를 확인해주세요.');
}

mysqli_stmt_bind_param($stmt, 'issssssssss', $programId, $programTitle, $applicantName, $birthdate, $gender, $passwordHash, $phone, $email, $address, $school, $attachmentName);

if (!mysqli_stmt_execute($stmt)) {
    mysqli_stmt_close($stmt);
    mysqli_close($mysqli);
    syc_move_with_alert('신청 저장에 실패했습니다. 다시 시도해주세요.');
}

$applicationId = mysqli_insert_id($mysqli);
mysqli_stmt_close($stmt);
mysqli_close($mysqli);
$_SESSION['verified_application_id'] = $applicationId;
syc_move_with_alert('평생교육 수강 신청이 완료되었습니다.', BASE_URL . '/application-detail.php?id=' . $applicationId);

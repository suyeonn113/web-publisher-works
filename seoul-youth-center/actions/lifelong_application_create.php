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
$phoneInput = trim((string) ($_POST['phone'] ?? ''));
$phone = preg_replace('/\D+/', '', $phoneInput);
$email = trim((string) ($_POST['email'] ?? ''));
$address = trim((string) ($_POST['address'] ?? ''));
$school = trim((string) ($_POST['school'] ?? ''));
$agreePrivacy = isset($_POST['agree_privacy']);
$agreeThirdParty = isset($_POST['agree_third_party']);

if (!$targetClass) {
    syc_move_with_alert('현재 접수 가능한 강좌가 아닙니다.', BASE_URL . '/lifelong-education-apply.php');
}

$formErrors = syc_validate_application_form([
    'applicant_name' => $applicantName,
    'birthdate' => $birthdate,
    'gender' => $gender,
    'password' => $password,
    'password_confirm' => $passwordConfirm,
    'phone' => $phone,
    'email' => $email,
    'agree_privacy' => $agreePrivacy,
    'agree_third_party' => $agreeThirdParty,
], [
    'require_password' => true,
    'require_agreements' => true,
]);

if ($formErrors !== []) {
    syc_redirect_with_form_feedback(
        BASE_URL . '/lifelong-education-apply-form.php?id=' . $programId,
        'lifelong_application_create',
        $formErrors,
        [
            'applicant_name' => $applicantName,
            'birthdate' => $birthdate,
            'gender' => $gender,
            'phone' => $phoneInput,
            'email' => $email,
            'address' => $address,
            'school' => $school,
            'agree_privacy' => $agreePrivacy ? '1' : '',
            'agree_third_party' => $agreeThirdParty ? '1' : '',
        ]
    );
}

$programTitle = (string) $targetClass['title'];
$passwordHash = password_hash($password, PASSWORD_DEFAULT);
$attachmentName = '';

require_once __DIR__ . '/../includes/dbconn.php';

if (!syc_ensure_program_type_column($mysqli)) {
    error_log('Seoul Youth Center program_type migration failed: ' . mysqli_error($mysqli));
    mysqli_close($mysqli);
    syc_move_with_alert('신청 처리 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
}

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

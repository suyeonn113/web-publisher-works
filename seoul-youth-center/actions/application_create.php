<?php
require_once __DIR__ . '/../includes/config.php';
require_once __DIR__ . '/../includes/data/youth-programs.php';
require_once __DIR__ . '/../includes/functions/program.service.php';
require_once __DIR__ . '/../includes/functions/application.helpers.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    syc_move_with_alert('잘못된 접근입니다.', BASE_URL . '/programs.php');
}

$programId = (int) ($_POST['program_id'] ?? 0);
$programTitle = trim($_POST['program_title'] ?? '');
$applicantName = trim($_POST['applicant_name'] ?? '');
$birthdate = trim($_POST['birthdate'] ?? '');
$gender = $_POST['gender'] ?? '';
$password = $_POST['password'] ?? '';
$passwordConfirm = $_POST['password_confirm'] ?? '';
$phoneInput = trim((string) ($_POST['phone'] ?? ''));
$phone = preg_replace('/\D+/', '', $phoneInput);
$email = trim($_POST['email'] ?? '');
$address = trim($_POST['address'] ?? '');
$school = trim($_POST['school'] ?? '');
$agreePrivacy = isset($_POST['agree_privacy']);
$agreeThirdParty = isset($_POST['agree_third_party']);
$attachmentName = isset($_FILES['attachment']['name']) ? trim($_FILES['attachment']['name']) : '';

$targetProgram = findProgramById(getOpenProgramsForDisplay($youthPrograms), $programId);

if (!$targetProgram) {
    syc_move_with_alert('현재 접수 중인 프로그램이 아닙니다.', BASE_URL . '/programs.php');
}

$programTitle = (string) ($targetProgram['title'] ?? '');

$formData = [
    'applicant_name' => $applicantName,
    'birthdate' => $birthdate,
    'gender' => $gender,
    'password' => $password,
    'password_confirm' => $passwordConfirm,
    'phone' => $phone,
    'email' => $email,
    'agree_privacy' => $agreePrivacy,
    'agree_third_party' => $agreeThirdParty,
];
$formErrors = syc_validate_application_form($formData, [
    'require_password' => true,
    'require_agreements' => true,
]);

if ($formErrors !== []) {
    syc_redirect_with_form_feedback(
        BASE_URL . '/program-apply.php?id=' . $programId,
        'youth_application_create',
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

$passwordHash = password_hash($password, PASSWORD_DEFAULT);

require_once __DIR__ . '/../includes/dbconn.php';

if (!syc_ensure_program_type_column($mysqli)) {
    error_log('Seoul Youth Center program_type migration failed: ' . mysqli_error($mysqli));
    mysqli_close($mysqli);
    syc_move_with_alert('신청 처리 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
}

$sql = '
    INSERT INTO seoul_youth_center_program_applications (
        program_type,
        program_id,
        program_title,
        applicant_name,
        birthdate,
        gender,
        password_hash,
        phone,
        email,
        address,
        school,
        attachment_name
    ) VALUES (\'youth\', ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
';

$stmt = mysqli_prepare($mysqli, $sql);

if (!$stmt) {
    syc_move_with_alert('신청 처리 중 오류가 발생했습니다.');
}

mysqli_stmt_bind_param(
    $stmt,
    'issssssssss',
    $programId,
    $programTitle,
    $applicantName,
    $birthdate,
    $gender,
    $passwordHash,
    $phone,
    $email,
    $address,
    $school,
    $attachmentName
);

if (!mysqli_stmt_execute($stmt)) {
    mysqli_stmt_close($stmt);
    mysqli_close($mysqli);
    syc_move_with_alert('신청 저장에 실패했습니다. 다시 시도해주세요.');
}

$applicationId = mysqli_insert_id($mysqli);
mysqli_stmt_close($stmt);
mysqli_close($mysqli);

$_SESSION['verified_application_id'] = $applicationId;

syc_move_with_alert('신청이 완료되었습니다.', BASE_URL . '/application-detail.php?id=' . $applicationId);

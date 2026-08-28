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
$phoneInput = trim((string) ($_POST['phone'] ?? ''));
$phone = preg_replace('/\D+/', '', $phoneInput);
$email = trim($_POST['email'] ?? '');
$address = trim($_POST['address'] ?? '');
$school = trim($_POST['school'] ?? '');

$formErrors = syc_validate_application_form([
    'applicant_name' => $applicantName,
    'birthdate' => $birthdate,
    'gender' => $gender,
    'phone' => $phone,
    'email' => $email,
]);

if ($formErrors !== []) {
    syc_redirect_with_form_feedback(
        BASE_URL . '/application-edit.php?id=' . $applicationId,
        'application_update_' . $applicationId,
        $formErrors,
        [
            'applicant_name' => $applicantName,
            'birthdate' => $birthdate,
            'gender' => $gender,
            'phone' => $phoneInput,
            'email' => $email,
            'address' => $address,
            'school' => $school,
        ]
    );
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

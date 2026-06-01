<?php
require_once __DIR__ . '/../includes/config.php';
require_once __DIR__ . '/../includes/dbconn.php';
require_once __DIR__ . '/../includes/functions/application.helpers.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    syc_move_with_alert('잘못된 접근입니다.', BASE_URL . '/programs.php');
}

$programId = (int) ($_POST['program_id'] ?? 0);
$applicantName = trim($_POST['applicant_name'] ?? '');
$password = $_POST['password'] ?? '';
$phone = preg_replace('/\D+/', '', $_POST['phone'] ?? '');

if ($applicantName === '' || $password === '' || $phone === '') {
    syc_move_with_alert('신청 확인 정보를 모두 입력해주세요.');
}

if ($programId > 0) {
    $sql = '
        SELECT id, password_hash
        FROM seoul_youth_center_program_applications
        WHERE program_id = ? AND applicant_name = ? AND phone = ?
        ORDER BY id DESC
        LIMIT 1
    ';
    $stmt = mysqli_prepare($mysqli, $sql);
    if (!$stmt) {
        syc_move_with_alert('신청 확인 중 오류가 발생했습니다.');
    }
    mysqli_stmt_bind_param($stmt, 'iss', $programId, $applicantName, $phone);
} else {
    $sql = '
        SELECT id, password_hash
        FROM seoul_youth_center_program_applications
        WHERE applicant_name = ? AND phone = ?
        ORDER BY id DESC
        LIMIT 1
    ';
    $stmt = mysqli_prepare($mysqli, $sql);
    if (!$stmt) {
        syc_move_with_alert('신청 확인 중 오류가 발생했습니다.');
    }
    mysqli_stmt_bind_param($stmt, 'ss', $applicantName, $phone);
}

mysqli_stmt_execute($stmt);
$result = mysqli_stmt_get_result($stmt);
$application = mysqli_fetch_assoc($result);
mysqli_stmt_close($stmt);
mysqli_close($mysqli);

if (!$application || !password_verify($password, $application['password_hash'])) {
    syc_move_with_alert('일치하는 신청 내역이 없습니다.');
}

$_SESSION['verified_application_id'] = (int) $application['id'];

header('Location: ' . BASE_URL . '/application-detail.php?id=' . (int) $application['id']);
exit;

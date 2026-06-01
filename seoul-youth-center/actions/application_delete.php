<?php
require_once __DIR__ . '/../includes/config.php';
require_once __DIR__ . '/../includes/dbconn.php';
require_once __DIR__ . '/../includes/functions/application.helpers.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    syc_move_with_alert('잘못된 접근입니다.', BASE_URL . '/programs.php');
}

$applicationId = (int) ($_POST['id'] ?? 0);
syc_require_verified_application($applicationId);

$sql = 'DELETE FROM seoul_youth_center_program_applications WHERE id = ?';
$stmt = mysqli_prepare($mysqli, $sql);

if (!$stmt) {
    syc_move_with_alert('신청 삭제 중 오류가 발생했습니다.');
}

mysqli_stmt_bind_param($stmt, 'i', $applicationId);

if (!mysqli_stmt_execute($stmt)) {
    mysqli_stmt_close($stmt);
    mysqli_close($mysqli);
    syc_move_with_alert('신청 삭제에 실패했습니다. 다시 시도해주세요.');
}

mysqli_stmt_close($stmt);
mysqli_close($mysqli);

unset($_SESSION['verified_application_id']);

syc_move_with_alert('신청이 취소되었습니다.', BASE_URL . '/programs.php');

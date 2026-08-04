<?php

function syc_move_with_alert($message, $url = null)
{
    $safeMessage = htmlspecialchars($message, ENT_QUOTES, 'UTF-8');
    $safeUrl = $url ? htmlspecialchars($url, ENT_QUOTES, 'UTF-8') : '';

    echo '<!DOCTYPE html><html lang="ko"><head><meta charset="UTF-8"><title>시립서울청소년센터</title></head><body>';
    echo '<script>';
    echo 'alert("' . $safeMessage . '");';
    echo $safeUrl ? 'location.href="' . $safeUrl . '";' : 'history.back();';
    echo '</script>';
    echo '</body></html>';
    exit;
}

function syc_ensure_program_type_column($mysqli)
{
    $checkColumn = static function () use ($mysqli) {
        $result = mysqli_query(
            $mysqli,
            "SHOW COLUMNS FROM seoul_youth_center_program_applications LIKE 'program_type'"
        );

        if (!$result) {
            return false;
        }

        $hasColumn = mysqli_num_rows($result) > 0;
        mysqli_free_result($result);

        return $hasColumn;
    };

    if ($checkColumn()) {
        return true;
    }

    $altered = mysqli_query(
        $mysqli,
        "ALTER TABLE seoul_youth_center_program_applications
            ADD COLUMN program_type ENUM('youth', 'lifelong') NOT NULL DEFAULT 'youth' AFTER id"
    );

    if ($altered) {
        return true;
    }

    return $checkColumn();
}

function syc_mask_name($name)
{
    $name = trim((string) $name);
    $characters = preg_split('//u', $name, -1, PREG_SPLIT_NO_EMPTY);

    if (!is_array($characters)) {
        return $name;
    }

    $length = count($characters);

    if ($length <= 1) {
        return $name;
    }

    return $characters[0] . str_repeat('*', max(1, $length - 1));
}

function syc_mask_phone($phone)
{
    $digits = preg_replace('/\D+/', '', (string) $phone);

    if (strlen($digits) < 7) {
        return $phone;
    }

    return substr($digits, 0, 3) . '-****-' . substr($digits, -4);
}

function syc_require_verified_application($applicationId)
{
    $verifiedId = (int) ($_SESSION['verified_application_id'] ?? 0);
    $verifiedIds = array_map('intval', (array) ($_SESSION['verified_application_ids'] ?? []));

    if ($verifiedId !== (int) $applicationId && !in_array((int) $applicationId, $verifiedIds, true)) {
        syc_move_with_alert('신청자 확인 후 이용해주세요.', BASE_URL . '/applications.php');
    }
}

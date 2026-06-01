<?php

function syc_move_with_alert($message, $url = null)
{
    $safeMessage = htmlspecialchars($message, ENT_QUOTES, 'UTF-8');
    $safeUrl = $url ? htmlspecialchars($url, ENT_QUOTES, 'UTF-8') : '';

    echo '<!DOCTYPE html><html lang="ko"><head><meta charset="UTF-8"><title>서울시립청소년센터</title></head><body>';
    echo '<script>';
    echo 'alert("' . $safeMessage . '");';
    echo $safeUrl ? 'location.href="' . $safeUrl . '";' : 'history.back();';
    echo '</script>';
    echo '</body></html>';
    exit;
}

function syc_mask_name($name)
{
    $name = trim((string) $name);
    $length = mb_strlen($name, 'UTF-8');

    if ($length <= 1) {
        return $name;
    }

    return mb_substr($name, 0, 1, 'UTF-8') . str_repeat('*', max(1, $length - 1));
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

    if ($verifiedId !== (int) $applicationId) {
        syc_move_with_alert('신청자 확인 후 이용해주세요.', BASE_URL . '/programs.php');
    }
}

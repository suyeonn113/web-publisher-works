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

function syc_store_form_feedback($key, array $errors, array $oldInput, $summary = '입력 내용을 확인해주세요.')
{
    $_SESSION['syc_form_feedback'][$key] = [
        'errors' => $errors,
        'old' => $oldInput,
        'summary' => $summary,
    ];
}

function syc_take_form_feedback($key)
{
    $feedback = $_SESSION['syc_form_feedback'][$key] ?? null;
    unset($_SESSION['syc_form_feedback'][$key]);

    if (!is_array($feedback)) {
        return [
            'errors' => [],
            'old' => [],
            'summary' => '',
        ];
    }

    return [
        'errors' => is_array($feedback['errors'] ?? null) ? $feedback['errors'] : [],
        'old' => is_array($feedback['old'] ?? null) ? $feedback['old'] : [],
        'summary' => (string) ($feedback['summary'] ?? ''),
    ];
}

function syc_redirect_with_form_feedback($url, $key, array $errors, array $oldInput)
{
    syc_store_form_feedback($key, $errors, $oldInput);
    header('Location: ' . $url, true, 303);
    exit;
}

function syc_form_value(array $oldInput, $name, $fallback = '')
{
    return htmlspecialchars((string) ($oldInput[$name] ?? $fallback), ENT_QUOTES, 'UTF-8');
}

function syc_form_error_attributes(array $errors, $name)
{
    if (!isset($errors[$name])) {
        return '';
    }

    return ' aria-invalid="true" aria-describedby="' . htmlspecialchars($name, ENT_QUOTES, 'UTF-8') . '-error"';
}

function syc_render_form_error(array $errors, $name)
{
    if (!isset($errors[$name])) {
        return;
    }

    echo '<span class="program-apply-field-error type-caption" id="'
        . htmlspecialchars($name, ENT_QUOTES, 'UTF-8')
        . '-error">'
        . htmlspecialchars((string) $errors[$name], ENT_QUOTES, 'UTF-8')
        . '</span>';
}

function syc_is_valid_birthdate($birthdate)
{
    if (!preg_match('/^\d{8}$/', (string) $birthdate)) {
        return false;
    }

    $date = DateTime::createFromFormat('!Ymd', (string) $birthdate);

    return $date instanceof DateTime && $date->format('Ymd') === (string) $birthdate;
}

function syc_validate_application_form(array $data, array $options = [])
{
    $errors = [];
    $requirePassword = (bool) ($options['require_password'] ?? false);
    $requireAgreements = (bool) ($options['require_agreements'] ?? false);

    if (($data['applicant_name'] ?? '') === '') {
        $errors['applicant_name'] = '신청자명을 입력해주세요.';
    }

    $birthdate = (string) ($data['birthdate'] ?? '');
    if ($birthdate === '') {
        $errors['birthdate'] = '생년월일을 입력해주세요.';
    } elseif (!syc_is_valid_birthdate($birthdate)) {
        $errors['birthdate'] = '생년월일을 숫자 8자리로 정확히 입력해주세요. 예: 20080115';
    }

    if (!in_array((string) ($data['gender'] ?? ''), ['male', 'female'], true)) {
        $errors['gender'] = '성별을 선택해주세요.';
    }

    $phone = (string) ($data['phone'] ?? '');
    if ($phone === '') {
        $errors['phone'] = '휴대전화 번호를 입력해주세요.';
    } elseif (!preg_match('/^01[0-9]{8,9}$/', $phone)) {
        $errors['phone'] = '휴대전화 번호를 확인해주세요. 숫자만 입력할 수 있습니다.';
    }

    $email = (string) ($data['email'] ?? '');
    if ($email !== '' && !filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $errors['email'] = '이메일 형식을 확인해주세요.';
    }

    if ($requirePassword) {
        $password = (string) ($data['password'] ?? '');
        $passwordConfirm = (string) ($data['password_confirm'] ?? '');

        if ($password === '') {
            $errors['password'] = '신청 비밀번호를 입력해주세요.';
        } elseif (strlen($password) < 4) {
            $errors['password'] = '비밀번호를 4자 이상 입력해주세요.';
        }

        if ($passwordConfirm === '') {
            $errors['password_confirm'] = '비밀번호를 한 번 더 입력해주세요.';
        } elseif ($password !== $passwordConfirm) {
            $errors['password_confirm'] = '비밀번호가 일치하지 않습니다.';
        }
    }

    if ($requireAgreements) {
        if (empty($data['agree_privacy'])) {
            $errors['agree_privacy'] = '개인정보 수집 및 이용에 동의해주세요.';
        }

        if (empty($data['agree_third_party'])) {
            $errors['agree_third_party'] = '개인정보 제3자 제공에 동의해주세요.';
        }
    }

    return $errors;
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

function syc_get_local_demo_applications()
{
    if (!defined('ENV') || ENV !== 'local') {
        return [];
    }

    return [
        [
            'id' => -101,
            'program_type' => 'youth',
            'program_id' => 4,
            'program_title' => '2026년 청소년 성장역량 부트캠프 「스스로 업 프로젝트」 참가자 모집',
            'applicant_name' => '마스터',
            'birthdate' => '20080115',
            'gender' => 'female',
            'phone' => '01000000000',
            'email' => 'local-youth@example.test',
            'address' => '서울특별시 중구',
            'school' => '서울청소년학교',
            'attachment_name' => '',
            'created_at' => '2026-07-08 10:30:00',
            'is_demo' => true,
        ],
        [
            'id' => -102,
            'program_type' => 'lifelong',
            'program_id' => 101,
            'program_title' => '런치요가교실 A반',
            'applicant_name' => '마스터',
            'birthdate' => '19920520',
            'gender' => 'female',
            'phone' => '01000000000',
            'email' => 'local-lifelong@example.test',
            'address' => '서울특별시 중구',
            'school' => '',
            'attachment_name' => '',
            'created_at' => '2026-07-09 13:20:00',
            'is_demo' => true,
        ],
    ];
}

function syc_find_local_demo_application($applicationId)
{
    foreach (syc_get_local_demo_applications() as $application) {
        if ((int) $application['id'] === (int) $applicationId) {
            return $application;
        }
    }

    return null;
}

function syc_require_verified_application($applicationId)
{
    if (syc_find_local_demo_application($applicationId) !== null) {
        return;
    }

    $verifiedId = (int) ($_SESSION['verified_application_id'] ?? 0);
    $verifiedIds = array_map('intval', (array) ($_SESSION['verified_application_ids'] ?? []));

    if ($verifiedId !== (int) $applicationId && !in_array((int) $applicationId, $verifiedIds, true)) {
        syc_move_with_alert('신청자 확인 후 이용해주세요.', BASE_URL . '/applications.php');
    }
}

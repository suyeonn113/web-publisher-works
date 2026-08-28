<?php
include __DIR__ . '/includes/config.php';
require_once __DIR__ . '/includes/functions/application.helpers.php';

$applicationId = (int) ($_GET['id'] ?? 0);
syc_require_verified_application($applicationId);
$application = syc_find_local_demo_application($applicationId);
$isLocalDemo = $application !== null;

if (!$application) {
    require_once __DIR__ . '/includes/dbconn.php';
    $sql = '
        SELECT *
        FROM seoul_youth_center_program_applications
        WHERE id = ?
        LIMIT 1
    ';
    $stmt = mysqli_prepare($mysqli, $sql);
    mysqli_stmt_bind_param($stmt, 'i', $applicationId);
    mysqli_stmt_execute($stmt);
    $result = mysqli_stmt_get_result($stmt);
    $application = mysqli_fetch_assoc($result);
    mysqli_stmt_close($stmt);
    mysqli_close($mysqli);
}

if (!$application) {
    syc_move_with_alert('신청 내역을 찾을 수 없습니다.', BASE_URL . '/programs.php');
}

$formFeedback = syc_take_form_feedback('application_update_' . $applicationId);
$formErrors = $formFeedback['errors'];
$formOld = $formFeedback['old'];
$pageTitle = '신청 수정 | ' . $application['program_title'];
$pageCss = ['info-pages.css', 'program-apply.css', 'applications.css'];
?>

<!DOCTYPE html>
<html lang="ko">

<?php include __DIR__ . '/includes/head.php'; ?>

<body>
<?php include __DIR__ . '/includes/global-nav.php'; ?>

<main id="main" class="info-page program-apply-page application-edit-page">
    <section class="info-hero" aria-labelledby="application-edit-title">
        <div class="info-hero__inner inner">
            <nav class="info-breadcrumb type-caption" aria-label="현재 위치">
                <ol>
                    <li><a href="<?= BASE_URL ?>/index.php">홈</a></li>
                    <li><a href="<?= BASE_URL ?>/applications.php">나의 신청현황</a></li>
                    <li><a href="<?= BASE_URL ?>/application-detail.php?id=<?= (int) $application['id'] ?>">신청 내역 확인</a></li>
                    <li aria-current="page">신청 정보 수정</li>
                </ol>
            </nav>
            <div class="info-hero__copy">
                <p class="info-eyebrow type-label">EDIT APPLICATION</p>
                <h1 class="type-page-title" id="application-edit-title">신청 정보 수정</h1>
                <p class="type-body-lg">신청한 정보를 확인하고 변경할 수 있습니다.</p>
            </div>
        </div>
    </section>

    <form class="program-apply-form inner" action="<?= BASE_URL ?>/actions/application_update.php" method="post" autocomplete="off" novalidate<?= $isLocalDemo ? ' onsubmit="alert(\'로컬 예시 데이터는 저장되지 않습니다.\'); return false;"' : '' ?>>
        <input type="hidden" name="id" value="<?= (int) $application['id'] ?>">
        <?php syc_render_form_error_summary($formErrors, $formFeedback['summary']); ?>

        <section class="program-apply-program" aria-labelledby="application-edit-program-title">
            <h2 class="type-section-title" id="application-edit-program-title"><?= htmlspecialchars($application['program_title'], ENT_QUOTES, 'UTF-8') ?></h2>
        </section>

        <section class="program-apply-info" aria-labelledby="application-edit-info-title">
            <div class="program-apply-info__heading">
                <h2 class="program-apply-section-heading type-body-lg" id="application-edit-info-title">신청자 정보</h2>
                <p class="program-apply-required-note type-caption"><strong>*</strong> 표시는 필수 입력 항목입니다.</p>
            </div>

            <div class="program-apply-fields type-label">
                <label class="program-apply-field">
                    <span>신청자명 <strong>*</strong></span>
                    <input class="control" id="field-applicant_name" type="text" name="applicant_name" value="<?= syc_form_value($formOld, 'applicant_name', $application['applicant_name']) ?>" autocomplete="name" placeholder="신청자명을 입력하세요" required<?= syc_form_error_attributes($formErrors, 'applicant_name') ?>>
                    <?php syc_render_form_error($formErrors, 'applicant_name'); ?>
                </label>
                <label class="program-apply-field">
                    <span>생년월일 <strong>*</strong></span>
                    <input class="control" id="field-birthdate" type="text" name="birthdate" value="<?= syc_form_value($formOld, 'birthdate', $application['birthdate']) ?>" inputmode="numeric" maxlength="8" autocomplete="bday" placeholder="생년월일 8자리를 입력하세요" required<?= syc_form_error_attributes($formErrors, 'birthdate') ?>>
                    <?php syc_render_form_error($formErrors, 'birthdate'); ?>
                </label>
                <label class="program-apply-field">
                    <span>성별 <strong>*</strong></span>
                    <?php $selectedGender = (string) ($formOld['gender'] ?? $application['gender']); ?>
                    <select id="field-gender" name="gender" required<?= syc_form_error_attributes($formErrors, 'gender') ?>>
                        <option value="">선택</option>
                        <option value="male"<?= $selectedGender === 'male' ? ' selected' : '' ?>>남</option>
                        <option value="female"<?= $selectedGender === 'female' ? ' selected' : '' ?>>여</option>
                    </select>
                    <?php syc_render_form_error($formErrors, 'gender'); ?>
                </label>
                <label class="program-apply-field">
                    <span>휴대전화 <strong>*</strong></span>
                    <input class="control" id="field-phone" type="tel" name="phone" value="<?= syc_form_value($formOld, 'phone', $application['phone']) ?>" inputmode="numeric" maxlength="13" autocomplete="tel" placeholder="숫자만 입력하세요" required<?= syc_form_error_attributes($formErrors, 'phone') ?>>
                    <?php syc_render_form_error($formErrors, 'phone'); ?>
                </label>
                <label class="program-apply-field">
                    <span>이메일</span>
                    <input class="control" id="field-email" type="email" name="email" value="<?= syc_form_value($formOld, 'email', $application['email']) ?>" autocomplete="email" placeholder="이메일을 입력하세요"<?= syc_form_error_attributes($formErrors, 'email') ?>>
                    <?php syc_render_form_error($formErrors, 'email'); ?>
                </label>
                <label class="program-apply-field">
                    <span>주소</span>
                    <input class="control" id="field-address" type="text" name="address" value="<?= syc_form_value($formOld, 'address', $application['address']) ?>" autocomplete="street-address" placeholder="주소를 입력하세요">
                </label>
                <label class="program-apply-field">
                    <span>학교·소속</span>
                    <input class="control" id="field-school" type="text" name="school" value="<?= syc_form_value($formOld, 'school', $application['school']) ?>" placeholder="학교 또는 소속명을 입력하세요">
                </label>
            </div>
        </section>

        <div class="program-apply-actions application-edit-actions">
            <a class="control control--muted" href="<?= BASE_URL ?>/application-detail.php?id=<?= (int) $application['id'] ?>">취소</a>
            <button class="control control--primary" type="submit">수정 완료</button>
        </div>
    </form>
</main>

<?php include __DIR__ . '/includes/footer.php'; ?>

<script src="<?= BASE_URL ?>/js/global-nav.js"></script>
<script src="<?= BASE_URL ?>/js/header-search.js"></script>
<script src="<?= BASE_URL ?>/js/program-apply.js"></script>
<script src="<?= BASE_URL ?>/js/application-edit.js"></script>
</body>
</html>

<?php
include __DIR__ . '/includes/config.php';
include __DIR__ . '/includes/data/youth-programs.php';
include __DIR__ . '/includes/functions/program.service.php';
require_once __DIR__ . '/includes/functions/application.helpers.php';

$programId = isset($_GET['id']) ? (int) $_GET['id'] : 0;
$program = findProgramById(getOpenProgramsForDisplay($youthPrograms), $programId);

if (!$program) {
    http_response_code(404);
    $pageTitle = '프로그램을 찾을 수 없습니다';
} else {
    $pageTitle = '신청하기 | ' . ($program['title'] ?? '청소년 활동 신청');
}

$pageCss = ['info-pages.css', 'program-apply.css'];
$programMeta = $program ? getProgramCardMeta($program) : [];
$programDetail = $program ? getProgramDetailContent($program) : [];
$title = $program['title'] ?? '';
$activityPeriod = ($programMeta['activity_period'] ?? '') !== '' ? $programMeta['activity_period'] : '상시 운영';
$formFeedback = syc_take_form_feedback('youth_application_create');
$formErrors = $formFeedback['errors'];
$formOld = $formFeedback['old'];
?>

<!DOCTYPE html>
<html lang="ko">

<?php include __DIR__ . '/includes/head.php'; ?>

<body>
<?php include __DIR__ . '/includes/global-nav.php'; ?>

<main id="main" class="info-page program-apply-page">
    <section class="info-hero" aria-labelledby="program-apply-title">
        <div class="info-hero__inner inner">
            <nav class="info-breadcrumb type-caption" aria-label="현재 위치">
                <ol>
                    <li><a href="<?= BASE_URL ?>/index.php">홈</a></li>
                    <li><a href="<?= BASE_URL ?>/programs.php">청소년 프로그램 신청</a></li>
                    <li aria-current="page">신청서 작성</li>
                </ol>
            </nav>
            <div class="info-hero__copy">
                <p class="info-eyebrow type-label">PROGRAM APPLICATION</p>
                <h1 class="type-page-title" id="program-apply-title">청소년 활동 신청</h1>
                <p class="type-body-lg">신청 정보를 정확하게 작성해주세요.</p>
            </div>
        </div>
    </section>

    <?php if (!$program): ?>
        <section class="program-apply-empty inner">
            <h2 class="type-section-title">프로그램을 찾을 수 없습니다.</h2>
            <a class="control control--muted" href="<?= BASE_URL ?>/programs.php">목록으로 돌아가기</a>
        </section>
    <?php else: ?>
        <form class="program-apply-form inner" action="<?= BASE_URL ?>/actions/application_create.php" method="post" autocomplete="off" novalidate>
            <input type="hidden" name="program_id" value="<?= (int) $programId ?>">
            <input type="hidden" name="program_title" value="<?= htmlspecialchars($title, ENT_QUOTES, 'UTF-8') ?>">
            <?php syc_render_form_error_summary($formErrors, $formFeedback['summary']); ?>
            <section class="program-apply-program" aria-labelledby="program-summary-title">
                <h2 class="type-section-title" id="program-summary-title"><?= htmlspecialchars($title, ENT_QUOTES, 'UTF-8') ?></h2>
                <p class="type-caption">활동기간: <?= htmlspecialchars($activityPeriod, ENT_QUOTES, 'UTF-8') ?></p>
            </section>

            <section class="program-apply-info" aria-labelledby="program-info-title">
                <div class="program-apply-info__heading">
                    <h2 class="program-apply-section-heading type-body-lg" id="program-info-title">신청자 정보</h2>
                    <p class="program-apply-required-note type-caption"><strong>*</strong> 표시는 필수 입력 항목입니다.</p>
                </div>
                <div class="program-apply-fields type-label">
                    <label class="program-apply-field">
                        <span>신청자명 <strong>*</strong></span>
                        <input class="control" id="field-applicant_name" type="text" name="applicant_name" value="<?= syc_form_value($formOld, 'applicant_name') ?>" autocomplete="name" placeholder="신청자명을 입력하세요" required<?= syc_form_error_attributes($formErrors, 'applicant_name') ?>>
                        <?php syc_render_form_error($formErrors, 'applicant_name'); ?>
                    </label>
                    <label class="program-apply-field">
                        <span>생년월일 <strong>*</strong></span>
                        <input class="control" id="field-birthdate" type="text" name="birthdate" value="<?= syc_form_value($formOld, 'birthdate') ?>" placeholder="생년월일 8자리를 입력하세요" inputmode="numeric" maxlength="8" autocomplete="bday" required<?= syc_form_error_attributes($formErrors, 'birthdate') ?>>
                        <?php syc_render_form_error($formErrors, 'birthdate'); ?>
                    </label>
                    <label class="program-apply-field">
                        <span>성별 <strong>*</strong></span>
                        <select id="field-gender" name="gender" required<?= syc_form_error_attributes($formErrors, 'gender') ?>>
                            <option value="">선택</option>
                            <option value="male"<?= ($formOld['gender'] ?? '') === 'male' ? ' selected' : '' ?>>남</option>
                            <option value="female"<?= ($formOld['gender'] ?? '') === 'female' ? ' selected' : '' ?>>여</option>
                        </select>
                        <?php syc_render_form_error($formErrors, 'gender'); ?>
                    </label>
                    <label class="program-apply-field">
                        <span>비밀번호 <strong>*</strong></span>
                        <input class="control" id="field-password" type="password" name="password" placeholder="4자 이상 입력하세요" minlength="4" autocomplete="new-password" required<?= syc_form_error_attributes($formErrors, 'password') ?>>
                        <?php syc_render_form_error($formErrors, 'password'); ?>
                    </label>
                    <label class="program-apply-field">
                        <span>비밀번호 확인 <strong>*</strong></span>
                        <input class="control" id="field-password_confirm" type="password" name="password_confirm" placeholder="비밀번호를 다시 입력하세요" minlength="4" autocomplete="new-password" required<?= syc_form_error_attributes($formErrors, 'password_confirm') ?>>
                        <?php syc_render_form_error($formErrors, 'password_confirm'); ?>
                    </label>
                    <label class="program-apply-field">
                        <span>휴대전화 <strong>*</strong></span>
                        <input class="control" id="field-phone" type="tel" name="phone" value="<?= syc_form_value($formOld, 'phone') ?>" placeholder="숫자만 입력하세요" inputmode="numeric" maxlength="13" autocomplete="tel" required<?= syc_form_error_attributes($formErrors, 'phone') ?>>
                        <?php syc_render_form_error($formErrors, 'phone'); ?>
                    </label>
                    <label class="program-apply-field">
                        <span>이메일</span>
                        <input class="control" id="field-email" type="email" name="email" value="<?= syc_form_value($formOld, 'email') ?>" autocomplete="email" placeholder="이메일을 입력하세요"<?= syc_form_error_attributes($formErrors, 'email') ?>>
                        <?php syc_render_form_error($formErrors, 'email'); ?>
                    </label>
                    <label class="program-apply-field">
                        <span>주소</span>
                        <input class="control" id="field-address" type="text" name="address" value="<?= syc_form_value($formOld, 'address') ?>" placeholder="주소를 입력하세요" autocomplete="street-address">
                    </label>
                    <label class="program-apply-field">
                        <span>학교명</span>
                        <input class="control" id="field-school" type="text" name="school" value="<?= syc_form_value($formOld, 'school') ?>" placeholder="학교명을 입력하세요">
                    </label>
                </div>
            </section>

            <section class="program-apply-agree" aria-labelledby="program-agree-title">
                <div class="program-apply-section-title">
                    <h2 class="program-apply-section-heading type-body-lg" id="program-agree-title">개인정보 수집 및 이용 동의</h2>
                    <label class="program-apply-agree-all type-label">
                        <input type="checkbox" name="agree_all"<?= !empty($formOld['agree_privacy']) && !empty($formOld['agree_third_party']) ? ' checked' : '' ?>>
                        전체동의
                    </label>
                </div>

                <div class="program-apply-agree__items type-body">
                    <div class="program-apply-agree__item">
                        <label class="type-label">
                            <input id="field-agree_privacy" type="checkbox" name="agree_privacy" required<?= !empty($formOld['agree_privacy']) ? ' checked' : '' ?><?= syc_form_error_attributes($formErrors, 'agree_privacy') ?>>
                            <strong>개인정보 수집 및 이용안내에 동의함 <span>(필수)</span></strong>
                        </label>
                        <?php syc_render_form_error($formErrors, 'agree_privacy'); ?>
                        <p>본 프로그램 신청을 위해 신청자명, 연락처, 생년월일 등 필요한 정보를 수집하며, 수집된 정보는 프로그램 운영과 안내 목적으로만 사용됩니다.</p>
                    </div>

                    <div class="program-apply-agree__item">
                        <label class="type-label">
                            <input id="field-agree_third_party" type="checkbox" name="agree_third_party" required<?= !empty($formOld['agree_third_party']) ? ' checked' : '' ?><?= syc_form_error_attributes($formErrors, 'agree_third_party') ?>>
                            <strong>개인정보 제3자 제공 동의 <span>(필수)</span></strong>
                        </label>
                        <?php syc_render_form_error($formErrors, 'agree_third_party'); ?>
                        <p>안전한 활동 운영과 참여 확인을 위해 필요한 범위 내에서 담당 부서에 신청 정보를 제공할 수 있습니다.</p>
                    </div>
                </div>
            </section>

            <div class="program-apply-actions">
                <button class="control control--primary" type="submit">신청하기</button>
                <a class="control control--muted" href="<?= BASE_URL ?>/program-detail.php?id=<?= (int) $programId ?>">목록</a>
            </div>
        </form>
    <?php endif; ?>
</main>

<?php include __DIR__ . '/includes/footer.php'; ?>

<script src="<?= BASE_URL ?>/js/global-nav.js"></script>
<script src="<?= BASE_URL ?>/js/header-search.js"></script>
<script src="<?= BASE_URL ?>/js/program-apply.js"></script>
</body>
</html>

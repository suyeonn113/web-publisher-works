<?php
include __DIR__ . '/includes/config.php';
require_once __DIR__ . '/includes/data/lifelong-education-classes.php';
require_once __DIR__ . '/includes/functions/lifelong-education.service.php';

$classId = (int) ($_GET['id'] ?? 0);
$class = findLifelongEducationClass(getOpenLifelongEducationClasses($lifelongEducationClasses), $classId);
$pageTitle = $class ? '평생교육 신청 | ' . $class['title'] : '강좌를 찾을 수 없습니다';
$pageCss = ['info-pages.css', 'program-apply.css'];
?>

<!DOCTYPE html>
<html lang="ko">
<?php include __DIR__ . '/includes/head.php'; ?>
<body>
<?php include __DIR__ . '/includes/global-nav.php'; ?>
<main id="main" class="info-page program-apply-page">
    <section class="info-hero" aria-labelledby="lifelong-form-title">
        <div class="info-hero__inner inner">
            <nav class="info-breadcrumb type-caption" aria-label="현재 위치"><ol><li><a href="<?= BASE_URL ?>/index.php">홈</a></li><li><a href="<?= BASE_URL ?>/lifelong-education-apply.php">평생교육 프로그램 신청</a></li><li aria-current="page">신청서 작성</li></ol></nav>
            <div class="info-hero__copy"><p class="info-eyebrow type-label">COURSE APPLICATION</p><h1 class="type-page-title" id="lifelong-form-title">평생교육 수강 신청</h1><p class="type-body-lg">신청 정보를 정확하게 작성해주세요.</p></div>
        </div>
    </section>
    <?php if (!$class): ?>
        <section class="program-apply-empty inner"><h2 class="type-section-title">현재 신청할 수 없는 강좌입니다.</h2><a class="control control--muted" href="<?= BASE_URL ?>/lifelong-education-apply.php">강좌 목록으로 돌아가기</a></section>
    <?php else: ?>
        <form class="program-apply-form inner" action="<?= BASE_URL ?>/actions/lifelong_application_create.php" method="post" autocomplete="off">
            <input type="hidden" name="program_id" value="<?= (int) $class['id'] ?>">
            <section class="program-apply-program" aria-labelledby="lifelong-course-summary-title">
                <h2 class="type-section-title" id="lifelong-course-summary-title"><?= htmlspecialchars($class['title'], ENT_QUOTES, 'UTF-8') ?></h2>
                <p class="type-caption"><?= htmlspecialchars($class['days_label'] . ' ' . $class['time'] . ' · ' . $class['place'], ENT_QUOTES, 'UTF-8') ?></p>
            </section>

            <section class="program-apply-info" aria-labelledby="lifelong-application-info-title">
                <div class="program-apply-info__heading">
                    <h2 class="program-apply-section-heading type-body-lg" id="lifelong-application-info-title">신청자 정보</h2>
                    <p class="program-apply-required-note type-caption"><strong>*</strong> 표시는 필수 입력 항목입니다.</p>
                </div>
                <div class="program-apply-fields type-label">
                    <label class="program-apply-field"><span>신청자명 <strong>*</strong></span><input class="control" name="applicant_name" type="text" autocomplete="name" placeholder="신청자명을 입력하세요" required></label>
                    <label class="program-apply-field"><span>생년월일 <strong>*</strong></span><input class="control" name="birthdate" type="text" inputmode="numeric" autocomplete="bday" placeholder="생년월일 8자리를 입력하세요" required></label>
                    <label class="program-apply-field"><span>성별 <strong>*</strong></span><select name="gender" required><option value="">선택</option><option value="male">남</option><option value="female">여</option></select></label>
                    <label class="program-apply-field"><span>휴대전화 <strong>*</strong></span><input class="control" name="phone" type="tel" inputmode="numeric" autocomplete="tel" placeholder="숫자만 입력하세요" required></label>
                    <label class="program-apply-field"><span>신청 비밀번호 <strong>*</strong></span><input class="control" name="password" type="password" minlength="4" autocomplete="new-password" placeholder="4자 이상 입력하세요" required></label>
                    <label class="program-apply-field"><span>비밀번호 확인 <strong>*</strong></span><input class="control" name="password_confirm" type="password" minlength="4" autocomplete="new-password" placeholder="비밀번호를 다시 입력하세요" required></label>
                    <label class="program-apply-field"><span>이메일</span><input class="control" name="email" type="email" autocomplete="email" placeholder="이메일을 입력하세요"></label>
                    <label class="program-apply-field"><span>주소</span><input class="control" name="address" type="text" autocomplete="street-address" placeholder="주소를 입력하세요"></label>
                    <label class="program-apply-field"><span>학교·소속</span><input class="control" name="school" type="text" placeholder="학교 또는 소속명을 입력하세요"></label>
                </div>
            </section>

            <section class="program-apply-agree" aria-labelledby="lifelong-agree-title">
                <div class="program-apply-section-title">
                    <h2 class="program-apply-section-heading type-body-lg" id="lifelong-agree-title">개인정보 수집 및 이용 동의</h2>
                    <label class="program-apply-agree-all type-label"><input type="checkbox" name="agree_all">전체동의</label>
                </div>
                <div class="program-apply-agree__items type-body">
                    <div class="program-apply-agree__item">
                        <label class="type-label"><input type="checkbox" name="agree_privacy" required><strong>개인정보 수집 및 이용에 동의함 <span>(필수)</span></strong></label>
                        <p>수강 신청과 운영 안내를 위해 신청자 정보와 연락처를 수집합니다.</p>
                    </div>
                    <div class="program-apply-agree__item">
                        <label class="type-label"><input type="checkbox" name="agree_third_party" required><strong>개인정보 제3자 제공에 동의함 <span>(필수)</span></strong></label>
                        <p>안전한 강좌 운영을 위해 필요한 범위에서 담당 부서가 신청 정보를 확인합니다.</p>
                    </div>
                </div>
            </section>
            <div class="program-apply-actions"><button class="control control--primary" type="submit">수강 신청하기</button><a class="control control--muted" href="<?= BASE_URL ?>/lifelong-education-apply.php">목록으로 돌아가기</a></div>
        </form>
    <?php endif; ?>
</main>
<?php include __DIR__ . '/includes/footer.php'; ?>
<script src="<?= BASE_URL ?>/js/global-nav.js"></script><script src="<?= BASE_URL ?>/js/header-search.js"></script><script src="<?= BASE_URL ?>/js/program-apply.js"></script>
</body>
</html>

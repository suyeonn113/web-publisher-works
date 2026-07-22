<?php
include __DIR__ . '/includes/config.php';
require_once __DIR__ . '/includes/data/lifelong-education-classes.php';
require_once __DIR__ . '/includes/functions/lifelong-education.service.php';

$classId = (int) ($_GET['id'] ?? 0);
$class = findLifelongEducationClass(getOpenLifelongEducationClasses($lifelongEducationClasses), $classId);
$pageTitle = $class ? '평생교육 신청 | ' . $class['title'] : '강좌를 찾을 수 없습니다';
$pageCss = ['info-pages.css', 'program-apply.css'];
$programContextPage = 'lifelong';
?>

<!DOCTYPE html>
<html lang="ko">
<?php include __DIR__ . '/includes/head.php'; ?>
<body>
<?php include __DIR__ . '/includes/global-nav.php'; ?>
<main id="main" class="info-page program-apply-page">
    <section class="info-hero" aria-labelledby="lifelong-form-title">
        <div class="info-hero__inner inner">
            <nav class="info-breadcrumb" aria-label="현재 위치"><ol><li><a href="<?= BASE_URL ?>/index.php">홈</a></li><li><a href="<?= BASE_URL ?>/lifelong-education-apply.php">평생교육 프로그램 신청</a></li><li aria-current="page">신청서 작성</li></ol></nav>
            <div class="info-hero__copy"><p class="info-eyebrow">COURSE APPLICATION</p><h1 id="lifelong-form-title">평생교육 수강 신청</h1><p>신청 정보를 정확하게 작성해주세요.</p></div>
        </div>
    </section>
    <?php include __DIR__ . '/includes/components/program-context-nav.php'; ?>

    <?php if (!$class): ?>
        <section class="program-apply-empty inner"><h2>현재 신청할 수 없는 강좌입니다.</h2><a href="<?= BASE_URL ?>/lifelong-education-apply.php">강좌 목록으로 돌아가기</a></section>
    <?php else: ?>
        <form class="program-apply-form inner" action="<?= BASE_URL ?>/actions/lifelong_application_create.php" method="post" autocomplete="off">
            <input type="hidden" name="program_id" value="<?= (int) $class['id'] ?>">
            <section class="program-apply-info" aria-labelledby="lifelong-application-info-title">
                <h2 id="lifelong-application-info-title">신청정보</h2>
                <div class="program-apply-card">
                    <div class="program-apply-card__summary">
                        <p><?= htmlspecialchars($class['category'], ENT_QUOTES, 'UTF-8') ?></p>
                        <h3><?= htmlspecialchars($class['title'], ENT_QUOTES, 'UTF-8') ?></h3>
                        <span><?= htmlspecialchars($class['days_label'] . ' ' . $class['time'] . ' · ' . $class['place'], ENT_QUOTES, 'UTF-8') ?></span>
                    </div>
                    <div class="program-apply-fields">
                        <label><span>신청자명 <strong>*</strong></span><input name="applicant_name" type="text" autocomplete="name" required></label>
                        <label><span>생년월일 <strong>*</strong></span><input name="birthdate" type="text" inputmode="numeric" placeholder="예) 20161201" required></label>
                        <label><span>성별 <strong>*</strong></span><select name="gender" required><option value="">선택</option><option value="male">남</option><option value="female">여</option></select></label>
                        <label><span>휴대전화 <strong>*</strong></span><input name="phone" type="tel" inputmode="numeric" autocomplete="tel" required></label>
                        <label><span>신청 비밀번호 <strong>*</strong></span><input name="password" type="password" minlength="4" autocomplete="new-password" required></label>
                        <label><span>비밀번호 확인 <strong>*</strong></span><input name="password_confirm" type="password" minlength="4" autocomplete="new-password" required></label>
                        <label><span>이메일</span><input name="email" type="email" autocomplete="email"></label>
                        <label><span>주소</span><input name="address" type="text" autocomplete="street-address"></label>
                        <label><span>학교·소속</span><input name="school" type="text"></label>
                    </div>
                </div>
            </section>
            <section class="program-apply-agree" aria-labelledby="lifelong-agree-title">
                <div class="program-apply-section-title"><h2 id="lifelong-agree-title">개인정보 동의</h2></div>
                <div class="program-apply-agree__box">
                    <label><strong>개인정보 수집 및 이용에 동의함 <span>(필수)</span></strong><input type="checkbox" name="agree_privacy" required></label>
                    <div class="program-apply-agree__content">수강 신청과 운영 안내를 위해 신청자 정보와 연락처를 수집합니다.</div>
                    <label><strong>개인정보 제3자 제공에 동의함 <span>(필수)</span></strong><input type="checkbox" name="agree_third_party" required></label>
                    <div class="program-apply-agree__content">안전한 강좌 운영을 위해 필요한 범위에서 담당 부서가 신청 정보를 확인합니다.</div>
                </div>
            </section>
            <div class="program-apply-actions"><button type="submit">수강 신청하기</button><a href="<?= BASE_URL ?>/lifelong-education-apply.php">목록으로 돌아가기</a></div>
        </form>
    <?php endif; ?>
</main>
<?php include __DIR__ . '/includes/footer.php'; ?>
<script src="<?= BASE_URL ?>/js/global-nav.js"></script><script src="<?= BASE_URL ?>/js/header-search.js"></script>
</body>
</html>

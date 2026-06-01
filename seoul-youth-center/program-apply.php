<?php
include __DIR__ . '/includes/config.php';
include __DIR__ . '/includes/data/youth-programs.php';
include __DIR__ . '/includes/functions/program.service.php';

$programId = isset($_GET['id']) ? (int) $_GET['id'] : 0;
$program = findProgramById(filterActivePrograms($youthPrograms), $programId);

if (!$program) {
    http_response_code(404);
    $pageTitle = '프로그램을 찾을 수 없습니다';
} else {
    $pageTitle = '신청하기 | ' . ($program['title'] ?? '청소년 활동 신청');
}

$pageCss = 'program-apply.css';
$programMeta = $program ? getProgramCardMeta($program) : [];
$programDetail = $program ? getProgramDetailContent($program) : [];
$title = $program['title'] ?? '';
$activityPeriod = ($programMeta['activity_period'] ?? '') !== '' ? $programMeta['activity_period'] : '상시 운영';
?>

<!DOCTYPE html>
<html lang="ko">

<?php include __DIR__ . '/includes/head.php'; ?>

<body>
<?php include __DIR__ . '/includes/global-nav.php'; ?>

<main id="main" class="program-apply-page">
    <?php if (!$program): ?>
        <section class="program-apply-empty inner">
            <h1>프로그램을 찾을 수 없습니다.</h1>
            <a href="<?= BASE_URL ?>/programs.php">목록으로 돌아가기</a>
        </section>
    <?php else: ?>
        <section class="program-apply-header inner" aria-labelledby="program-apply-title">
            <h1 id="program-apply-title">청소년 활동 신청</h1>
        </section>

        <form class="program-apply-form inner" action="<?= BASE_URL ?>/actions/application_create.php" method="post" enctype="multipart/form-data">
            <input type="hidden" name="program_id" value="<?= (int) $programId ?>">
            <input type="hidden" name="program_title" value="<?= htmlspecialchars($title, ENT_QUOTES, 'UTF-8') ?>">
            <section class="program-apply-agree" aria-labelledby="program-agree-title">
                <div class="program-apply-section-title">
                    <h2 id="program-agree-title">개인정보 수집 및 이용 동의</h2>
                    <label>
                        <input type="checkbox" name="agree_all">
                        전체동의
                    </label>
                </div>

                <div class="program-apply-agree__box">
                    <label>
                        <strong>개인정보 수집 및 이용안내에 동의함 <span>(필수)</span></strong>
                        <input type="checkbox" name="agree_privacy" required>
                    </label>
                    <div class="program-apply-agree__content">
                        본 프로그램 신청을 위해 신청자명, 연락처, 생년월일 등 필요한 정보를 수집하며, 수집된 정보는 프로그램 운영과 안내 목적으로만 사용됩니다.
                    </div>

                    <label>
                        <strong>개인정보 제3자 제공 동의 <span>(필수)</span></strong>
                        <input type="checkbox" name="agree_third_party" required>
                    </label>
                    <div class="program-apply-agree__content">
                        안전한 활동 운영과 참여 확인을 위해 필요한 범위 내에서 담당 부서에 신청 정보를 제공할 수 있습니다.
                    </div>
                </div>
            </section>

            <section class="program-apply-info" aria-labelledby="program-info-title">
                <h2 id="program-info-title">신청정보</h2>
                <div class="program-apply-card">
                    <div class="program-apply-card__summary">
                        <p><?= htmlspecialchars(getProgramFieldLabel($program), ENT_QUOTES, 'UTF-8') ?></p>
                        <h3><?= htmlspecialchars($title, ENT_QUOTES, 'UTF-8') ?></h3>
                        <span>활동기간: <?= htmlspecialchars($activityPeriod, ENT_QUOTES, 'UTF-8') ?></span>
                    </div>

                    <div class="program-apply-fields">
                        <label>
                            <span>신청자명 <strong>*</strong></span>
                            <input type="text" name="applicant_name" required>
                        </label>
                        <label>
                            <span>생년월일 <strong>*</strong></span>
                            <input type="text" name="birthdate" placeholder="예) 20161201(8자)" inputmode="numeric" required>
                        </label>
                        <label>
                            <span>성별 <strong>*</strong></span>
                            <select name="gender" required>
                                <option value="">선택</option>
                                <option value="male">남</option>
                                <option value="female">여</option>
                            </select>
                        </label>
                        <label>
                            <span>비밀번호 <strong>*</strong></span>
                            <input type="password" name="password" placeholder="4자 이상" minlength="4" required>
                        </label>
                        <label>
                            <span>비밀번호 확인 <strong>*</strong></span>
                            <input type="password" name="password_confirm" placeholder="4자 이상" minlength="4" required>
                        </label>
                        <label>
                            <span>휴대전화 <strong>*</strong></span>
                            <input type="tel" name="phone" placeholder="숫자만 입력" inputmode="numeric" required>
                        </label>
                        <label>
                            <span>이메일</span>
                            <input type="email" name="email">
                        </label>
                        <label>
                            <span>주소</span>
                            <input type="text" name="address" placeholder="주소를 입력하세요">
                        </label>
                        <label>
                            <span>학교명</span>
                            <input type="text" name="school" placeholder="학교명">
                        </label>
                        <label>
                            <span>첨부파일</span>
                            <input type="file" name="attachment">
                        </label>
                    </div>

                    <div class="program-apply-captcha" aria-label="자동입력 방지">
                        <span></span>
                        <p>로봇이 아닙니다.</p>
                    </div>
                </div>
            </section>

            <div class="program-apply-actions">
                <button type="submit">수강신청</button>
                <a href="<?= BASE_URL ?>/program-detail.php?id=<?= (int) $programId ?>">목록</a>
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

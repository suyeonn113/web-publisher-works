<?php
include __DIR__ . '/includes/config.php';
require_once __DIR__ . '/includes/dbconn.php';
require_once __DIR__ . '/includes/functions/application.helpers.php';

$applicationId = (int) ($_GET['id'] ?? 0);
syc_require_verified_application($applicationId);

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

if (!$application) {
    syc_move_with_alert('신청 내역을 찾을 수 없습니다.', BASE_URL . '/programs.php');
}

$pageTitle = '신청 수정 | ' . $application['program_title'];
$pageCss = ['program-apply.css', 'applications.css'];
?>

<!DOCTYPE html>
<html lang="ko">

<?php include __DIR__ . '/includes/head.php'; ?>

<body>
<?php include __DIR__ . '/includes/global-nav.php'; ?>

<main id="main" class="program-apply-page">
    <section class="program-apply-header inner" aria-labelledby="application-edit-title">
        <h1 id="application-edit-title">신청 정보 수정</h1>
    </section>

    <form class="program-apply-form inner" action="<?= BASE_URL ?>/actions/application_update.php" method="post" autocomplete="off">
        <input type="hidden" name="id" value="<?= (int) $application['id'] ?>">

        <section class="program-apply-info" aria-labelledby="application-edit-info-title">
            <h2 id="application-edit-info-title">신청정보</h2>
            <div class="program-apply-card">
                <div class="program-apply-card__summary">
                    <p>프로그램 신청</p>
                    <h3><?= htmlspecialchars($application['program_title'], ENT_QUOTES, 'UTF-8') ?></h3>
                </div>

                <div class="program-apply-fields">
                    <label>
                        <span>신청자명 <strong>*</strong></span>
                        <input type="text" name="applicant_name" value="<?= htmlspecialchars($application['applicant_name'], ENT_QUOTES, 'UTF-8') ?>" required>
                    </label>
                    <label>
                        <span>생년월일 <strong>*</strong></span>
                        <input type="text" name="birthdate" value="<?= htmlspecialchars($application['birthdate'], ENT_QUOTES, 'UTF-8') ?>" inputmode="numeric" required>
                    </label>
                    <label>
                        <span>성별 <strong>*</strong></span>
                        <select name="gender" required>
                            <option value="">선택</option>
                            <option value="male"<?= $application['gender'] === 'male' ? ' selected' : '' ?>>남</option>
                            <option value="female"<?= $application['gender'] === 'female' ? ' selected' : '' ?>>여</option>
                        </select>
                    </label>
                    <label>
                        <span>휴대전화 <strong>*</strong></span>
                        <input type="tel" name="phone" value="<?= htmlspecialchars($application['phone'], ENT_QUOTES, 'UTF-8') ?>" inputmode="numeric" required>
                    </label>
                    <label>
                        <span>이메일</span>
                        <input type="email" name="email" value="<?= htmlspecialchars($application['email'], ENT_QUOTES, 'UTF-8') ?>" autocomplete="off">
                    </label>
                    <label>
                        <span>주소</span>
                        <input type="text" name="address" value="<?= htmlspecialchars($application['address'], ENT_QUOTES, 'UTF-8') ?>">
                    </label>
                    <label>
                        <span>학교명</span>
                        <input type="text" name="school" value="<?= htmlspecialchars($application['school'], ENT_QUOTES, 'UTF-8') ?>">
                    </label>
                </div>
            </div>
        </section>

        <div class="program-apply-actions">
            <button type="submit">수정완료</button>
            <a href="<?= BASE_URL ?>/application-detail.php?id=<?= (int) $application['id'] ?>">취소</a>
        </div>
    </form>
</main>

<?php include __DIR__ . '/includes/footer.php'; ?>

<script src="<?= BASE_URL ?>/js/global-nav.js"></script>
<script src="<?= BASE_URL ?>/js/header-search.js"></script>
</body>
</html>

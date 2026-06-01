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

$pageTitle = '신청 상세 | ' . $application['program_title'];
$pageCss = 'applications.css';
?>

<!DOCTYPE html>
<html lang="ko">

<?php include __DIR__ . '/includes/head.php'; ?>

<body>
<?php include __DIR__ . '/includes/global-nav.php'; ?>

<main id="main" class="application-detail-page">
    <section class="applications-header inner" aria-labelledby="application-detail-title">
        <h1 id="application-detail-title">신청 내역 확인</h1>
        <p><?= htmlspecialchars($application['program_title'], ENT_QUOTES, 'UTF-8') ?></p>
    </section>

    <section class="application-detail inner" aria-label="신청 상세 정보">
        <dl>
            <div>
                <dt>신청번호</dt>
                <dd><?= (int) $application['id'] ?></dd>
            </div>
            <div>
                <dt>프로그램명</dt>
                <dd><?= htmlspecialchars($application['program_title'], ENT_QUOTES, 'UTF-8') ?></dd>
            </div>
            <div>
                <dt>신청자명</dt>
                <dd><?= htmlspecialchars($application['applicant_name'], ENT_QUOTES, 'UTF-8') ?></dd>
            </div>
            <div>
                <dt>생년월일</dt>
                <dd><?= htmlspecialchars($application['birthdate'], ENT_QUOTES, 'UTF-8') ?></dd>
            </div>
            <div>
                <dt>성별</dt>
                <dd><?= $application['gender'] === 'male' ? '남' : '여' ?></dd>
            </div>
            <div>
                <dt>휴대전화</dt>
                <dd><?= htmlspecialchars($application['phone'], ENT_QUOTES, 'UTF-8') ?></dd>
            </div>
            <div>
                <dt>이메일</dt>
                <dd><?= htmlspecialchars($application['email'] ?: '-', ENT_QUOTES, 'UTF-8') ?></dd>
            </div>
            <div>
                <dt>주소</dt>
                <dd><?= htmlspecialchars($application['address'] ?: '-', ENT_QUOTES, 'UTF-8') ?></dd>
            </div>
            <div>
                <dt>학교명</dt>
                <dd><?= htmlspecialchars($application['school'] ?: '-', ENT_QUOTES, 'UTF-8') ?></dd>
            </div>
            <div>
                <dt>첨부파일</dt>
                <dd><?= htmlspecialchars($application['attachment_name'] ?: '-', ENT_QUOTES, 'UTF-8') ?></dd>
            </div>
            <div>
                <dt>등록일</dt>
                <dd><?= htmlspecialchars($application['created_at'], ENT_QUOTES, 'UTF-8') ?></dd>
            </div>
        </dl>

        <div class="application-actions">
            <div class="application-actions__manage">
                <a href="<?= BASE_URL ?>/application-edit.php?id=<?= (int) $application['id'] ?>">수정</a>
                <form action="<?= BASE_URL ?>/actions/application_delete.php" method="post" onsubmit="return confirm('신청을 취소하시겠습니까?');">
                    <input type="hidden" name="id" value="<?= (int) $application['id'] ?>">
                    <button type="submit">삭제</button>
                </form>
            </div>
            <a href="<?= BASE_URL ?>/programs.php">목록</a>
        </div>
    </section>
</main>

<?php include __DIR__ . '/includes/footer.php'; ?>

<script src="<?= BASE_URL ?>/js/global-nav.js"></script>
<script src="<?= BASE_URL ?>/js/header-search.js"></script>
</body>
</html>

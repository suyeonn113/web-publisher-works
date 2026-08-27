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

$pageTitle = '신청 상세 | ' . $application['program_title'];
$pageCss = ['info-pages.css', 'program-apply.css', 'applications.css'];
$applicationType = ($application['program_type'] ?? 'youth') === 'lifelong' ? '평생교육 프로그램' : '청소년 프로그램';
$createdAt = (string) ($application['created_at'] ?? '');
$createdAtTimestamp = strtotime($createdAt);
$applicationDate = $createdAtTimestamp !== false ? date('Y.m.d', $createdAtTimestamp) : $createdAt;
?>

<!DOCTYPE html>
<html lang="ko">

<?php include __DIR__ . '/includes/head.php'; ?>

<body>
<?php include __DIR__ . '/includes/global-nav.php'; ?>

<main id="main" class="info-page application-detail-page">
    <section class="info-hero" aria-labelledby="application-detail-title">
        <div class="info-hero__inner inner">
            <nav class="info-breadcrumb type-caption" aria-label="현재 위치">
                <ol>
                    <li><a href="<?= BASE_URL ?>/index.php">홈</a></li>
                    <li><a href="<?= BASE_URL ?>/applications.php">나의 신청현황</a></li>
                    <li aria-current="page">신청 내역 확인</li>
                </ol>
            </nav>
            <div class="info-hero__copy">
                <p class="info-eyebrow type-label">APPLICATION DETAILS</p>
                <h1 class="type-page-title" id="application-detail-title">신청 내역 확인</h1>
                <p class="type-body-lg">신청한 프로그램과 신청자 정보를 확인할 수 있습니다.</p>
            </div>
        </div>
    </section>

    <div class="application-detail inner">
        <section class="program-apply-program" aria-labelledby="application-program-title">
            <p class="application-detail__type type-label"><?= htmlspecialchars($applicationType, ENT_QUOTES, 'UTF-8') ?></p>
            <h2 class="type-section-title" id="application-program-title"><?= htmlspecialchars($application['program_title'], ENT_QUOTES, 'UTF-8') ?></h2>
            <p class="application-detail__meta type-caption">
                <span>신청번호 <?= (int) $application['id'] ?></span>
                <span>신청일 <?= htmlspecialchars($applicationDate, ENT_QUOTES, 'UTF-8') ?></span>
            </p>
        </section>

        <section class="application-detail__info" aria-labelledby="application-detail-info-title">
            <h2 class="program-apply-section-heading type-body-lg" id="application-detail-info-title">신청자 정보</h2>
            <dl class="application-detail__list type-body">
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
                    <dt>학교·소속</dt>
                    <dd><?= htmlspecialchars($application['school'] ?: '-', ENT_QUOTES, 'UTF-8') ?></dd>
                </div>
                <div class="application-detail__item--wide">
                    <dt>주소</dt>
                    <dd><?= htmlspecialchars($application['address'] ?: '-', ENT_QUOTES, 'UTF-8') ?></dd>
                </div>
                <?php if (($application['attachment_name'] ?? '') !== ''): ?>
                    <div class="application-detail__item--wide">
                        <dt>첨부파일</dt>
                        <dd><?= htmlspecialchars($application['attachment_name'], ENT_QUOTES, 'UTF-8') ?></dd>
                    </div>
                <?php endif; ?>
            </dl>
        </section>

        <div class="application-actions">
            <a class="control control--muted" href="<?= BASE_URL ?>/applications.php">신청내역 목록</a>
            <?php if ($isLocalDemo): ?>
                <button class="control control--muted" type="button" disabled aria-disabled="true" title="로컬 예시 데이터는 삭제되지 않습니다.">신청 취소</button>
            <?php else: ?>
                <form action="<?= BASE_URL ?>/actions/application_delete.php" method="post" onsubmit="return confirm('신청을 취소하시겠습니까?');">
                    <input type="hidden" name="id" value="<?= (int) $application['id'] ?>">
                    <button class="control control--muted" type="submit">신청 취소</button>
                </form>
            <?php endif; ?>
            <a class="control control--primary" href="<?= BASE_URL ?>/application-edit.php?id=<?= (int) $application['id'] ?>">수정하기</a>
        </div>
    </div>
</main>

<?php include __DIR__ . '/includes/footer.php'; ?>

<script src="<?= BASE_URL ?>/js/global-nav.js"></script>
<script src="<?= BASE_URL ?>/js/header-search.js"></script>
</body>
</html>

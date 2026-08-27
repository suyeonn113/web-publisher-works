<?php
include __DIR__ . '/includes/config.php';
require_once __DIR__ . '/includes/functions/application.helpers.php';
require_once __DIR__ . '/includes/data/youth-programs.php';
require_once __DIR__ . '/includes/functions/program.service.php';
require_once __DIR__ . '/includes/data/lifelong-education-classes.php';
require_once __DIR__ . '/includes/functions/lifelong-education.service.php';

$pageTitle = '나의 신청현황 | 시립서울청소년센터';
$pageCss = ['info-pages.css', 'applications.css'];
$programContextPage = 'applications';

$applicantName = trim((string) ($_POST['applicant_name'] ?? ''));
$phone = preg_replace('/\D+/', '', (string) ($_POST['phone'] ?? ''));
$password = (string) ($_POST['password'] ?? '');
$isLookupRequest = ($_SERVER['REQUEST_METHOD'] ?? 'GET') === 'POST';
$lookupAttempted = $isLookupRequest;
$lookupError = '';
$applications = [];
$openYouthIds = array_fill_keys(array_map(static fn(array $program): int => (int) ($program['id'] ?? 0), getOpenProgramsForDisplay($youthPrograms)), true);
$openLifelongIds = array_fill_keys(array_map(static fn(array $class): int => (int) ($class['id'] ?? 0), getOpenLifelongEducationClasses($lifelongEducationClasses)), true);
$localMaster = [
    'applicant_name' => '마스터',
    'phone' => '01000000000',
    'password_hash' => '$2y$10$IotcE8Z96NoMVDewczOlVOCrjo1sdD7qsce9tErBYyZhvzMyOUW62',
];
$localDemoApplications = syc_get_local_demo_applications();

if ($isLookupRequest) {
    unset($_SESSION['verified_application_ids']);

    if ($applicantName === '' || $phone === '' || $password === '') {
        $lookupError = '신청자명, 휴대전화, 비밀번호를 모두 입력해주세요.';
    } elseif (!preg_match('/^01[0-9]{8,9}$/', $phone)) {
        $lookupError = '휴대전화 번호를 숫자만 입력해주세요.';
    } elseif (ENV === 'local' && $applicantName === $localMaster['applicant_name'] && $phone === $localMaster['phone']) {
        if (password_verify($password, $localMaster['password_hash'])) {
            $applications = $localDemoApplications;
        } else {
            $lookupError = '입력한 정보와 일치하는 신청내역이 없습니다.';
        }
    } else {
        require_once __DIR__ . '/includes/dbconn.php';
        $columnResult = mysqli_query($mysqli, "SHOW COLUMNS FROM seoul_youth_center_program_applications LIKE 'program_type'");
        $hasProgramType = $columnResult && mysqli_num_rows($columnResult) > 0;
        if ($columnResult) {
            mysqli_free_result($columnResult);
        }

        $typeSelect = $hasProgramType ? 'program_type' : "'youth' AS program_type";
        $sql = "
            SELECT id, {$typeSelect}, program_id, program_title, applicant_name, phone, password_hash, created_at
            FROM seoul_youth_center_program_applications
            WHERE applicant_name = ? AND phone = ?
            ORDER BY id DESC
        ";
        $stmt = mysqli_prepare($mysqli, $sql);

        if ($stmt) {
            mysqli_stmt_bind_param($stmt, 'ss', $applicantName, $phone);
            mysqli_stmt_execute($stmt);
            $result = mysqli_stmt_get_result($stmt);
            $candidates = mysqli_fetch_all($result, MYSQLI_ASSOC);

            foreach ($candidates as $candidate) {
                if (!password_verify($password, $candidate['password_hash'])) {
                    continue;
                }
                unset($candidate['password_hash']);
                $candidate['is_demo'] = false;
                $applications[] = $candidate;
            }
            mysqli_stmt_close($stmt);
        }
        mysqli_close($mysqli);

        if ($applications === []) {
            $lookupError = '입력한 정보와 일치하는 신청내역이 없습니다.';
        } else {
            $_SESSION['verified_application_ids'] = array_values(array_map(
                static fn(array $application): int => (int) $application['id'],
                array_filter($applications, static fn(array $application): bool => empty($application['is_demo']))
            ));
        }
    }
}

if (ENV === 'local' && !$isLookupRequest) {
    $applicantName = $localMaster['applicant_name'];
    $phone = $localMaster['phone'];
    $applications = $localDemoApplications;
    $lookupAttempted = true;
}

$youthApplications = array_values(array_filter($applications, static fn(array $application): bool => ($application['program_type'] ?? 'youth') === 'youth'));
$lifelongApplications = array_values(array_filter($applications, static fn(array $application): bool => ($application['program_type'] ?? 'youth') === 'lifelong'));

function renderApplicationRows(array $items, string $type, array $openYouthIds, array $openLifelongIds): void
{
    if ($items === []) {
        echo '<tr><td colspan="6" class="applications-board__empty">조회된 신청내역이 없습니다.</td></tr>';
        return;
    }

    foreach ($items as $application) {
        $programId = (int) $application['program_id'];
        $isOpen = $type === 'lifelong' ? isset($openLifelongIds[$programId]) : isset($openYouthIds[$programId]);
        $programUrl = $type === 'lifelong'
            ? BASE_URL . '/lifelong-education-apply.php'
            : BASE_URL . '/program-detail.php?id=' . $programId;
        ?>
        <tr>
            <td data-label="프로그램명"><?= htmlspecialchars($application['program_title'], ENT_QUOTES, 'UTF-8') ?></td>
            <td data-label="신청자"><?= htmlspecialchars(syc_mask_name($application['applicant_name']), ENT_QUOTES, 'UTF-8') ?></td>
            <td data-label="연락처"><?= htmlspecialchars(syc_mask_phone($application['phone']), ENT_QUOTES, 'UTF-8') ?></td>
            <td data-label="신청일"><?= htmlspecialchars(date('Y.m.d', strtotime($application['created_at'])), ENT_QUOTES, 'UTF-8') ?></td>
            <td data-label="접수상태"><span class="application-status-badge">접수완료</span></td>
            <td data-label="바로가기">
                <div class="application-row-actions">
                    <?php if ($isOpen): ?><a class="application-detail-link is-program control control--compact" href="<?= htmlspecialchars($programUrl, ENT_QUOTES, 'UTF-8') ?>">프로그램 보기</a><?php else: ?><span class="application-detail-link is-disabled control control--compact">접수 종료</span><?php endif; ?>
                    <a class="application-detail-link control control--compact" href="<?= BASE_URL ?>/application-detail.php?id=<?= (int) $application['id'] ?>">신청정보 확인</a>
                </div>
            </td>
        </tr>
        <?php
    }
}
?>

<!DOCTYPE html>
<html lang="ko">
<?php include __DIR__ . '/includes/head.php'; ?>
<body>
<?php include __DIR__ . '/includes/global-nav.php'; ?>
<main id="main" class="info-page applications-page">
    <section class="info-hero" aria-labelledby="applications-title">
        <div class="info-hero__inner inner">
            <nav class="info-breadcrumb type-caption" aria-label="현재 위치"><ol><li><a href="<?= BASE_URL ?>/index.php">홈</a></li><li>통합신청</li><li aria-current="page">나의 신청현황</li></ol></nav>
            <div class="info-hero__copy"><p class="info-eyebrow type-label">APPLICATION HISTORY</p><h1 class="type-page-title" id="applications-title">나의 신청현황</h1><p class="type-body-lg">청소년 프로그램과 평생교육 프로그램 신청내역을 한 번에 확인할 수 있습니다.</p></div>
        </div>
    </section>
    <?php include __DIR__ . '/includes/components/program-context-nav.php'; ?>

    <section class="program-context-content applications-header inner" aria-label="나의 신청현황 정보 입력">
        <form class="application-lookup" action="<?= BASE_URL ?>/applications.php" method="post" autocomplete="off">
            <div class="application-lookup__fields type-label">
                <label><span>신청자명</span><input name="applicant_name" type="text" value="<?= htmlspecialchars($applicantName, ENT_QUOTES, 'UTF-8') ?>" autocomplete="name" required></label>
                <label><span>휴대전화</span><input name="phone" type="tel" value="<?= htmlspecialchars($phone, ENT_QUOTES, 'UTF-8') ?>" placeholder="숫자만 입력" inputmode="numeric" autocomplete="tel" required></label>
                <label><span>신청 비밀번호</span><input name="password" type="password" autocomplete="current-password" required></label>
            </div>
            <button class="control control--search" type="submit">나의 신청현황</button>
        </form>
        <?php if (ENV === 'local'): ?><aside class="application-master type-label" aria-label="로컬 테스트용 마스터 조회 정보"><strong>로컬 테스트용 마스터</strong><dl><div><dt>신청자명</dt><dd>마스터</dd></div><div><dt>휴대전화</dt><dd>01000000000</dd></div><div><dt>비밀번호</dt><dd>1234</dd></div></dl></aside><?php endif; ?>
        <?php if ($lookupError !== ''): ?><p class="application-lookup__error type-body" role="alert"><?= htmlspecialchars($lookupError, ENT_QUOTES, 'UTF-8') ?></p><?php endif; ?>
        <aside class="application-lookup-guide type-body" aria-labelledby="application-lookup-guide-title"><h2 id="application-lookup-guide-title"><span aria-hidden="true">i</span>신청내역 조회 전 꼭 확인해 주세요</h2><ul><li>신청할 때 입력한 신청자명, 휴대전화, 비밀번호가 모두 일치해야 합니다.</li><li>청소년 프로그램과 평생교육 프로그램 신청내역이 구분되어 표시됩니다.</li><li>진행 상태에 따라 신청 정보 수정과 취소가 제한될 수 있습니다.</li></ul></aside>
    </section>

    <?php if ($lookupAttempted && $lookupError === ''): ?>
        <div class="applications-results inner">
            <section class="applications-board" aria-labelledby="youth-applications-title">
                <div class="applications-board__heading"><h2 class="type-card-title" id="youth-applications-title">청소년 프로그램</h2><p class="type-body">총 <strong><?= count($youthApplications) ?></strong>건</p></div>
                <table><thead><tr><th scope="col">프로그램명</th><th scope="col">신청자</th><th scope="col">연락처</th><th scope="col">신청일</th><th scope="col">접수상태</th><th scope="col">바로가기</th></tr></thead><tbody><?php renderApplicationRows($youthApplications, 'youth', $openYouthIds, $openLifelongIds); ?></tbody></table>
            </section>
            <section class="applications-board" aria-labelledby="lifelong-applications-title">
                <div class="applications-board__heading"><h2 class="type-card-title" id="lifelong-applications-title">평생교육 프로그램</h2><p class="type-body">총 <strong><?= count($lifelongApplications) ?></strong>건</p></div>
                <table><thead><tr><th scope="col">강좌명</th><th scope="col">신청자</th><th scope="col">연락처</th><th scope="col">신청일</th><th scope="col">접수상태</th><th scope="col">바로가기</th></tr></thead><tbody><?php renderApplicationRows($lifelongApplications, 'lifelong', $openYouthIds, $openLifelongIds); ?></tbody></table>
            </section>
        </div>
    <?php endif; ?>
</main>
<?php include __DIR__ . '/includes/footer.php'; ?>
<script src="<?= BASE_URL ?>/js/global-nav.js"></script><script src="<?= BASE_URL ?>/js/header-search.js"></script>
</body>
</html>

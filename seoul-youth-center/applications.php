<?php
include __DIR__ . '/includes/config.php';
require_once __DIR__ . '/includes/functions/application.helpers.php';
require_once __DIR__ . '/includes/data/youth-programs.php';
require_once __DIR__ . '/includes/functions/program.service.php';
require_once __DIR__ . '/includes/data/lifelong-education-classes.php';
require_once __DIR__ . '/includes/functions/lifelong-education.service.php';

$pageTitle = '신청내역 확인 | 시립서울청소년센터';
$pageCss = ['info-pages.css', 'applications.css'];
$programContextPage = 'applications';

$applicantName = trim((string) ($_POST['applicant_name'] ?? ''));
$phone = preg_replace('/\D+/', '', (string) ($_POST['phone'] ?? ''));
$password = (string) ($_POST['password'] ?? '');
$lookupAttempted = ($_SERVER['REQUEST_METHOD'] ?? 'GET') === 'POST';
$lookupError = '';
$applications = [];
$openYouthIds = array_fill_keys(array_map(static fn(array $program): int => (int) ($program['id'] ?? 0), getOpenProgramsForDisplay($youthPrograms)), true);
$openLifelongIds = array_fill_keys(array_map(static fn(array $class): int => (int) ($class['id'] ?? 0), getOpenLifelongEducationClasses($lifelongEducationClasses)), true);
$localMaster = [
    'applicant_name' => '마스터',
    'phone' => '01000000000',
    'password_hash' => '$2y$10$IotcE8Z96NoMVDewczOlVOCrjo1sdD7qsce9tErBYyZhvzMyOUW62',
];

if ($lookupAttempted) {
    unset($_SESSION['verified_application_ids']);

    if ($applicantName === '' || $phone === '' || $password === '') {
        $lookupError = '신청자명, 휴대전화, 비밀번호를 모두 입력해주세요.';
    } elseif (!preg_match('/^01[0-9]{8,9}$/', $phone)) {
        $lookupError = '휴대전화 번호를 숫자만 입력해주세요.';
    } elseif (ENV === 'local' && $applicantName === $localMaster['applicant_name'] && $phone === $localMaster['phone']) {
        if (password_verify($password, $localMaster['password_hash'])) {
            $demoApplications = [
                ['program_type' => 'youth', 'program_id' => 4, 'program_title' => '2026년 청소년 성장역량 부트캠프 「스스로 업 프로젝트」 참가자 모집', 'created_at' => '2026-07-08 10:30:00'],
                ['program_type' => 'youth', 'program_id' => 2, 'program_title' => '우리동네 참여 프로젝트 「청소년 체인지업 메이킹」', 'created_at' => '2026-06-24 14:10:00'],
                ['program_type' => 'lifelong', 'program_id' => 101, 'program_title' => '런치요가교실 A반', 'created_at' => '2026-07-09 13:20:00'],
                ['program_type' => 'lifelong', 'program_id' => 109, 'program_title' => '어반스케치교실', 'created_at' => '2026-07-03 18:05:00'],
            ];

            foreach ($demoApplications as $index => $demo) {
                $applications[] = array_merge($demo, [
                    'id' => -($index + 1),
                    'applicant_name' => $localMaster['applicant_name'],
                    'phone' => $localMaster['phone'],
                    'is_demo' => true,
                ]);
            }
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
                    <?php if ($isOpen): ?><a class="application-detail-link is-program" href="<?= htmlspecialchars($programUrl, ENT_QUOTES, 'UTF-8') ?>">프로그램 보기</a><?php else: ?><span class="application-detail-link is-disabled">접수 종료</span><?php endif; ?>
                    <?php if (empty($application['is_demo'])): ?><a class="application-detail-link" href="<?= BASE_URL ?>/application-detail.php?id=<?= (int) $application['id'] ?>">신청정보 확인</a><?php endif; ?>
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
            <nav class="info-breadcrumb" aria-label="현재 위치"><ol><li><a href="<?= BASE_URL ?>/index.php">홈</a></li><li>프로그램 신청</li><li aria-current="page">신청내역 확인</li></ol></nav>
            <div class="info-hero__copy"><p class="info-eyebrow">APPLICATION HISTORY</p><h1 id="applications-title">신청내역 확인</h1><p>청소년 프로그램과 평생교육 프로그램 신청내역을 한 번에 확인할 수 있습니다.</p></div>
        </div>
    </section>
    <?php include __DIR__ . '/includes/components/program-context-nav.php'; ?>

    <section class="applications-header inner" aria-label="신청내역 조회 정보 입력">
        <form class="application-lookup" action="<?= BASE_URL ?>/applications.php" method="post" autocomplete="off">
            <div class="application-lookup__fields">
                <label><span>신청자명</span><input name="applicant_name" type="text" value="<?= htmlspecialchars($applicantName, ENT_QUOTES, 'UTF-8') ?>" autocomplete="name" required></label>
                <label><span>휴대전화</span><input name="phone" type="tel" value="<?= htmlspecialchars($phone, ENT_QUOTES, 'UTF-8') ?>" placeholder="숫자만 입력" inputmode="numeric" autocomplete="tel" required></label>
                <label><span>신청 비밀번호</span><input name="password" type="password" autocomplete="current-password" required></label>
            </div>
            <button type="submit">신청내역 조회</button>
        </form>
        <?php if (ENV === 'local'): ?><aside class="application-master" aria-label="로컬 테스트용 마스터 조회 정보"><strong>로컬 테스트용 마스터</strong><dl><div><dt>신청자명</dt><dd>마스터</dd></div><div><dt>휴대전화</dt><dd>01000000000</dd></div><div><dt>비밀번호</dt><dd>1234</dd></div></dl></aside><?php endif; ?>
        <?php if ($lookupError !== ''): ?><p class="application-lookup__error" role="alert"><?= htmlspecialchars($lookupError, ENT_QUOTES, 'UTF-8') ?></p><?php endif; ?>
        <details class="application-lookup-guide"><summary><span aria-hidden="true">i</span>신청내역 조회 안내</summary><ul><li>신청할 때 입력한 신청자명, 휴대전화, 비밀번호가 모두 일치해야 합니다.</li><li>청소년 프로그램과 평생교육 프로그램 신청내역이 구분되어 표시됩니다.</li><li>진행 상태에 따라 신청 정보 수정과 취소가 제한될 수 있습니다.</li></ul></details>
    </section>

    <?php if ($lookupAttempted && $lookupError === ''): ?>
        <div class="applications-results inner">
            <section class="applications-board" aria-labelledby="youth-applications-title">
                <div class="applications-board__heading"><h2 id="youth-applications-title">청소년 프로그램</h2><p>총 <strong><?= count($youthApplications) ?></strong>건</p></div>
                <table><thead><tr><th scope="col">프로그램명</th><th scope="col">신청자</th><th scope="col">연락처</th><th scope="col">신청일</th><th scope="col">접수상태</th><th scope="col">바로가기</th></tr></thead><tbody><?php renderApplicationRows($youthApplications, 'youth', $openYouthIds, $openLifelongIds); ?></tbody></table>
            </section>
            <section class="applications-board" aria-labelledby="lifelong-applications-title">
                <div class="applications-board__heading"><h2 id="lifelong-applications-title">평생교육 프로그램</h2><p>총 <strong><?= count($lifelongApplications) ?></strong>건</p></div>
                <table><thead><tr><th scope="col">강좌명</th><th scope="col">신청자</th><th scope="col">연락처</th><th scope="col">신청일</th><th scope="col">접수상태</th><th scope="col">바로가기</th></tr></thead><tbody><?php renderApplicationRows($lifelongApplications, 'lifelong', $openYouthIds, $openLifelongIds); ?></tbody></table>
            </section>
        </div>
    <?php endif; ?>
</main>
<?php include __DIR__ . '/includes/footer.php'; ?>
<script src="<?= BASE_URL ?>/js/global-nav.js"></script><script src="<?= BASE_URL ?>/js/header-search.js"></script>
</body>
</html>

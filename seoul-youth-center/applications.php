<?php
include __DIR__ . '/includes/config.php';
require_once __DIR__ . '/includes/functions/application.helpers.php';

$pageTitle = '신청내역 조회 | 시립서울청소년센터';
$pageCss = ['info-pages.css', 'applications.css'];
$programContextPage = 'applications';

$applicantName = trim((string) ($_POST['applicant_name'] ?? ''));
$phone = preg_replace('/\D+/', '', (string) ($_POST['phone'] ?? ''));
$password = (string) ($_POST['password'] ?? '');
$lookupAttempted = ($_SERVER['REQUEST_METHOD'] ?? 'GET') === 'POST';
$lookupError = '';
$applications = [];
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
    } elseif (
        ENV === 'local'
        && $applicantName === $localMaster['applicant_name']
        && $phone === $localMaster['phone']
    ) {
        if (password_verify($password, $localMaster['password_hash'])) {
            $demoApplications = [
                [
                    'program_id' => 4,
                    'program_title' => '2026년 청소년 성장역량 부트캠프 「스스로 업 프로젝트」 참가자 모집',
                    'created_at' => '2026-07-08 10:30:00',
                ],
                [
                    'program_id' => 2,
                    'program_title' => '2026학년도 우리동네 참여 프로젝트 「청소년 체인지업 메이킹」 참가자 모집',
                    'created_at' => '2026-06-24 14:10:00',
                ],
                [
                    'program_id' => 6,
                    'program_title' => '2026년 문화예술 창작 스튜디오 「드로잉 앤 메이킹 클래스」 참가자 모집',
                    'created_at' => '2026-05-19 09:20:00',
                ],
                [
                    'program_id' => 14,
                    'program_title' => '2026년 진로직업 확장 프로그램 「미래탐색 커리어 브릿지」 참가자 모집',
                    'created_at' => '2026-04-02 16:40:00',
                ],
            ];

            foreach ($demoApplications as $index => $demoApplication) {
                $applications[] = [
                    'id' => -($index + 1),
                    'program_id' => $demoApplication['program_id'],
                    'program_title' => $demoApplication['program_title'],
                    'applicant_name' => $localMaster['applicant_name'],
                    'phone' => $localMaster['phone'],
                    'created_at' => $demoApplication['created_at'],
                    'is_demo' => true,
                ];
            }
        } else {
            $lookupError = '입력한 정보와 일치하는 신청내역이 없습니다.';
        }
    } else {
        require_once __DIR__ . '/includes/dbconn.php';

        $sql = '
            SELECT id, program_id, program_title, applicant_name, phone, password_hash, created_at
            FROM seoul_youth_center_program_applications
            WHERE applicant_name = ? AND phone = ?
            ORDER BY id DESC
        ';
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

        if (empty($applications)) {
            $lookupError = '입력한 정보와 일치하는 신청내역이 없습니다.';
        } else {
            $_SESSION['verified_application_ids'] = array_values(array_map(
                static fn(array $application): int => (int) $application['id'],
                array_filter(
                    $applications,
                    static fn(array $application): bool => empty($application['is_demo'])
                )
            ));
        }
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
            <nav class="info-breadcrumb" aria-label="현재 위치">
                <ol>
                    <li><a href="<?= BASE_URL ?>/index.php">홈</a></li>
                    <li>청소년 프로그램</li>
                    <li aria-current="page">신청내역 조회</li>
                </ol>
            </nav>
            <div class="info-hero__copy">
                <p class="info-eyebrow">APPLICATION HISTORY</p>
                <h1 id="applications-title">신청내역 조회</h1>
                <p>프로그램 구분 없이 신청자 정보로 내 신청내역을 확인할 수 있습니다.</p>
            </div>
        </div>
    </section>

    <?php include __DIR__ . '/includes/components/program-context-nav.php'; ?>

    <section class="applications-header inner" aria-label="신청내역 조회 정보 입력">

        <form
            class="application-lookup"
            action="<?= BASE_URL ?>/applications.php"
            method="post"
            autocomplete="off"
        >
            <div class="application-lookup__fields">
                <label>
                    <span>신청자명</span>
                    <input
                        name="applicant_name"
                        type="text"
                        value="<?= htmlspecialchars($applicantName, ENT_QUOTES, 'UTF-8') ?>"
                        autocomplete="name"
                        required
                    >
                </label>
                <label>
                    <span>휴대전화</span>
                    <input
                        name="phone"
                        type="tel"
                        value="<?= htmlspecialchars($phone, ENT_QUOTES, 'UTF-8') ?>"
                        placeholder="숫자만 입력"
                        inputmode="numeric"
                        autocomplete="tel"
                        required
                    >
                </label>
                <label>
                    <span>신청 비밀번호</span>
                    <input
                        name="password"
                        type="password"
                        autocomplete="current-password"
                        required
                    >
                </label>
            </div>
            <button type="submit">신청내역 조회</button>
        </form>

        <?php if (ENV === 'local'): ?>
            <aside class="application-master" aria-label="로컬 테스트용 마스터 조회 정보">
                <strong>로컬 테스트용 마스터</strong>
                <dl>
                    <div>
                        <dt>신청자명</dt>
                        <dd>마스터</dd>
                    </div>
                    <div>
                        <dt>휴대전화</dt>
                        <dd>01000000000</dd>
                    </div>
                    <div>
                        <dt>비밀번호</dt>
                        <dd>1234</dd>
                    </div>
                </dl>
            </aside>
        <?php endif; ?>

        <?php if ($lookupError !== ''): ?>
            <p class="application-lookup__error" role="alert">
                <?= htmlspecialchars($lookupError, ENT_QUOTES, 'UTF-8') ?>
            </p>
        <?php endif; ?>

        <details class="application-lookup-guide">
            <summary>
                <span aria-hidden="true">i</span>
                신청내역 조회 안내
            </summary>
            <ul>
                <li>신청할 때 입력한 신청자명, 휴대전화, 비밀번호가 모두 일치해야 합니다.</li>
                <li>프로그램 진행 상태에 따라 신청 정보 수정과 취소가 제한될 수 있습니다.</li>
                <li>활동 종료 후 보관 기간이 지난 신청내역은 조회 결과에 표시되지 않습니다.</li>
            </ul>
        </details>
    </section>

    <?php if (!empty($applications)): ?>
        <section class="applications-board inner" aria-labelledby="applications-result-title">
            <div class="applications-board__heading">
                <h2 id="applications-result-title">조회 결과</h2>
                <p>총 <strong><?= count($applications) ?></strong>건</p>
            </div>
            <table>
                <thead>
                    <tr>
                        <th scope="col">프로그램명</th>
                        <th scope="col">신청자</th>
                        <th scope="col">연락처</th>
                        <th scope="col">신청일</th>
                        <th scope="col">접수상태</th>
                        <th scope="col">바로가기</th>
                    </tr>
                </thead>
                <tbody>
                    <?php foreach ($applications as $application): ?>
                        <tr>
                            <td data-label="프로그램명"><?= htmlspecialchars($application['program_title'], ENT_QUOTES, 'UTF-8') ?></td>
                            <td data-label="신청자"><?= htmlspecialchars(syc_mask_name($application['applicant_name']), ENT_QUOTES, 'UTF-8') ?></td>
                            <td data-label="연락처"><?= htmlspecialchars(syc_mask_phone($application['phone']), ENT_QUOTES, 'UTF-8') ?></td>
                            <td data-label="신청일"><?= htmlspecialchars(date('Y.m.d', strtotime($application['created_at'])), ENT_QUOTES, 'UTF-8') ?></td>
                            <td data-label="접수상태">
                                <span class="application-status-badge">접수완료</span>
                            </td>
                            <td data-label="바로가기">
                                <div class="application-row-actions">
                                    <a
                                        class="application-detail-link is-program"
                                        href="<?= BASE_URL ?>/program-detail.php?id=<?= (int) $application['program_id'] ?>"
                                    >
                                        프로그램 상세 보기
                                    </a>
                                    <?php if (empty($application['is_demo'])): ?>
                                    <a class="application-detail-link" href="<?= BASE_URL ?>/application-detail.php?id=<?= (int) $application['id'] ?>">
                                        신청정보 확인
                                    </a>
                                    <?php endif; ?>
                                </div>
                            </td>
                        </tr>
                    <?php endforeach; ?>
                </tbody>
            </table>
        </section>
    <?php endif; ?>
</main>

<?php include __DIR__ . '/includes/footer.php'; ?>

<script src="<?= BASE_URL ?>/js/global-nav.js"></script>
<script src="<?= BASE_URL ?>/js/header-search.js"></script>
</body>
</html>

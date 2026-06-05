<?php
include __DIR__ . '/includes/config.php';
require_once __DIR__ . '/includes/dbconn.php';
require_once __DIR__ . '/includes/functions/application.helpers.php';

$pageTitle = '신청 목록 | 청소년 활동 신청';
$pageCss = 'applications.css';

$keyword = trim($_GET['keyword'] ?? '');
$page = max(1, (int) ($_GET['page'] ?? 1));
$perPage = 10;
$offset = ($page - 1) * $perPage;
$likeKeyword = '%' . $keyword . '%';

if ($keyword !== '') {
    $countSql = '
        SELECT COUNT(*) AS total
        FROM seoul_youth_center_program_applications
        WHERE program_title LIKE ? OR applicant_name LIKE ? OR phone LIKE ?
    ';
    $countStmt = mysqli_prepare($mysqli, $countSql);
    mysqli_stmt_bind_param($countStmt, 'sss', $likeKeyword, $likeKeyword, $likeKeyword);
} else {
    $countSql = 'SELECT COUNT(*) AS total FROM seoul_youth_center_program_applications';
    $countStmt = mysqli_prepare($mysqli, $countSql);
}

mysqli_stmt_execute($countStmt);
$countResult = mysqli_stmt_get_result($countStmt);
$totalCount = (int) (mysqli_fetch_assoc($countResult)['total'] ?? 0);
mysqli_stmt_close($countStmt);

$totalPages = max(1, (int) ceil($totalCount / $perPage));

if ($keyword !== '') {
    $listSql = '
        SELECT id, program_title, applicant_name, phone, created_at
        FROM seoul_youth_center_program_applications
        WHERE program_title LIKE ? OR applicant_name LIKE ? OR phone LIKE ?
        ORDER BY id DESC
        LIMIT ? OFFSET ?
    ';
    $listStmt = mysqli_prepare($mysqli, $listSql);
    mysqli_stmt_bind_param($listStmt, 'sssii', $likeKeyword, $likeKeyword, $likeKeyword, $perPage, $offset);
} else {
    $listSql = '
        SELECT id, program_title, applicant_name, phone, created_at
        FROM seoul_youth_center_program_applications
        ORDER BY id DESC
        LIMIT ? OFFSET ?
    ';
    $listStmt = mysqli_prepare($mysqli, $listSql);
    mysqli_stmt_bind_param($listStmt, 'ii', $perPage, $offset);
}

mysqli_stmt_execute($listStmt);
$listResult = mysqli_stmt_get_result($listStmt);
$applications = mysqli_fetch_all($listResult, MYSQLI_ASSOC);
mysqli_stmt_close($listStmt);
mysqli_close($mysqli);
?>

<!DOCTYPE html>
<html lang="ko">

<?php include __DIR__ . '/includes/head.php'; ?>

<body>
<?php include __DIR__ . '/includes/global-nav.php'; ?>

<main id="main" class="applications-page">
    <section class="applications-header inner" aria-labelledby="applications-title">
        <h1 id="applications-title">프로그램 신청 목록</h1>
        <p>총 <strong><?= number_format($totalCount) ?></strong>개의 신청 내역이 등록되어 있습니다.</p>

        <form class="applications-search" action="<?= BASE_URL ?>/applications.php" method="get" role="search">
            <label class="visually-hidden" for="application-keyword">신청 검색어</label>
            <input
                id="application-keyword"
                name="keyword"
                type="search"
                value="<?= htmlspecialchars($keyword, ENT_QUOTES, 'UTF-8') ?>"
                placeholder="프로그램명, 신청자명, 연락처 검색"
            >
            <button type="submit">검색</button>
        </form>
    </section>

    <section class="applications-board inner" aria-label="프로그램 신청 목록">
        <table>
            <thead>
                <tr>
                    <th scope="col">번호</th>
                    <th scope="col">프로그램명</th>
                    <th scope="col">신청자</th>
                    <th scope="col">연락처</th>
                    <th scope="col">등록일</th>
                </tr>
            </thead>
            <tbody>
                <?php if (empty($applications)): ?>
                    <tr>
                        <td colspan="5">등록된 신청 내역이 없습니다.</td>
                    </tr>
                <?php else: ?>
                    <?php foreach ($applications as $application): ?>
                        <tr>
                            <td data-label="번호"><?= (int) $application['id'] ?></td>
                            <td data-label="프로그램명"><?= htmlspecialchars($application['program_title'], ENT_QUOTES, 'UTF-8') ?></td>
                            <td data-label="신청자"><?= htmlspecialchars(syc_mask_name($application['applicant_name']), ENT_QUOTES, 'UTF-8') ?></td>
                            <td data-label="연락처"><?= htmlspecialchars(syc_mask_phone($application['phone']), ENT_QUOTES, 'UTF-8') ?></td>
                            <td data-label="등록일"><?= htmlspecialchars(date('Y.m.d', strtotime($application['created_at'])), ENT_QUOTES, 'UTF-8') ?></td>
                        </tr>
                    <?php endforeach; ?>
                <?php endif; ?>
            </tbody>
        </table>
    </section>

    <nav class="applications-pagination inner" aria-label="신청 목록 페이지">
        <?php for ($i = 1; $i <= $totalPages; $i++): ?>
            <?php if ($i === $page): ?>
                <strong aria-current="page"><?= $i ?></strong>
            <?php else: ?>
                <a href="<?= BASE_URL ?>/applications.php?keyword=<?= urlencode($keyword) ?>&page=<?= $i ?>"><?= $i ?></a>
            <?php endif; ?>
        <?php endfor; ?>
    </nav>
</main>

<?php include __DIR__ . '/includes/footer.php'; ?>

<script src="<?= BASE_URL ?>/js/global-nav.js"></script>
<script src="<?= BASE_URL ?>/js/header-search.js"></script>
</body>
</html>

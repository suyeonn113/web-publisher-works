<?php
include __DIR__ . '/includes/config.php';
include __DIR__ . '/includes/data/youth-programs.php';
include __DIR__ . '/includes/functions/program.service.php';

$pageTitle = '청소년 활동 신청';
$pageCss = ['info-pages.css', 'programs.css', 'program-confirm-modal.css'];
$programContextPage = 'programs';

$statusFilter = isset($_GET['status']) ? trim((string) $_GET['status']) : '';
$keyword = isset($_GET['keyword']) ? trim((string) $_GET['keyword']) : '';
$currentPage = isset($_GET['page']) ? (int) $_GET['page'] : 1;
$programsPerPage = 12;
$allowedStatuses = [
    '',
    ProgramStatus::ALWAYS,
    ProgramStatus::ONGOING,
    ProgramStatus::CLOSED,
];

if (!in_array($statusFilter, $allowedStatuses, true)) {
    $statusFilter = '';
}

function matchesProgramKeyword(array $program, string $keyword): bool
{
    if ($keyword === '') {
        return true;
    }

    $haystacks = [
        $program['title'] ?? '',
        $program['field_code'] ?? '',
        implode(' ', $program['hashtags'] ?? []),
        implode(' ', $program['search_keywords'] ?? []),
    ];

    foreach ($haystacks as $text) {
        if (mb_stripos((string) $text, $keyword, 0, 'UTF-8') !== false) {
            return true;
        }
    }

    return false;
}

function buildProgramPageUrl(int $page, string $statusFilter, string $keyword): string
{
    $params = [];

    if ($statusFilter !== '') {
        $params['status'] = $statusFilter;
    }

    if ($keyword !== '') {
        $params['keyword'] = $keyword;
    }

    if ($page > 1) {
        $params['page'] = $page;
    }

    $query = http_build_query($params);

    return BASE_URL . '/programs.php' . ($query !== '' ? '?' . $query : '');
}

$programs = filterActivePrograms($youthPrograms);
$programs = sortProgramsForDisplay($programs);
$programs = array_values(array_filter(
    $programs,
    static function (array $program) use ($statusFilter, $keyword): bool {
        $matchesStatus = $statusFilter === '' || getProgramStatus($program) === $statusFilter;

        return $matchesStatus && matchesProgramKeyword($program, $keyword);
    }
));

$totalPrograms = count($programs);
$totalPages = max(1, (int) ceil($totalPrograms / $programsPerPage));
$currentPage = max(1, min($currentPage, $totalPages));
$pageOffset = ($currentPage - 1) * $programsPerPage;
$pagedPrograms = array_slice($programs, $pageOffset, $programsPerPage);
?>

<!DOCTYPE html>
<html lang="ko">

<?php include __DIR__ . '/includes/head.php'; ?>

<body>
<?php include __DIR__ . '/includes/global-nav.php'; ?>

<main id="main" class="info-page program-page">
    <section class="info-hero" aria-labelledby="program-page-title">
        <div class="info-hero__inner inner">
            <nav class="info-breadcrumb" aria-label="현재 위치">
                <ol>
                    <li><a href="<?= BASE_URL ?>/index.php">홈</a></li>
                    <li>청소년 프로그램</li>
                    <li aria-current="page">활동신청</li>
                </ol>
            </nav>
            <div class="info-hero__copy">
                <p class="info-eyebrow">PROGRAM APPLICATION</p>
                <h1 id="program-page-title">청소년 활동 신청</h1>
                <p>현재 모집 중인 프로그램을 확인하고 관심 있는 활동에 바로 신청할 수 있습니다.</p>
            </div>
        </div>
    </section>

    <?php include __DIR__ . '/includes/components/program-context-nav.php'; ?>

    <section class="program-page__header inner" aria-labelledby="program-page-title">
        <p>
            총 <strong><?= $totalPrograms ?></strong>개의 프로그램이 등록되어 있습니다.
        </p>

        <form class="program-search" action="<?= BASE_URL ?>/programs.php" method="get" role="search">
            <label class="visually-hidden" for="program-status">모집 상태 선택</label>
            <select id="program-status" name="status">
                <option value=""<?= $statusFilter === '' ? ' selected' : '' ?>>전체</option>
                <option value="<?= ProgramStatus::ONGOING ?>"<?= $statusFilter === ProgramStatus::ONGOING ? ' selected' : '' ?>>모집중</option>
                <option value="<?= ProgramStatus::ALWAYS ?>"<?= $statusFilter === ProgramStatus::ALWAYS ? ' selected' : '' ?>>상시</option>
                <option value="<?= ProgramStatus::CLOSED ?>"<?= $statusFilter === ProgramStatus::CLOSED ? ' selected' : '' ?>>마감</option>
            </select>

            <label class="visually-hidden" for="program-keyword">프로그램 검색어</label>
            <input
                id="program-keyword"
                name="keyword"
                type="search"
                value="<?= htmlspecialchars($keyword, ENT_QUOTES, 'UTF-8') ?>"
                placeholder="검색어를 입력하세요"
            >

            <button class="program-search__submit button" type="submit">검색</button>
        </form>
    </section>

    <section class="program-list inner" aria-label="청소년 활동 신청 프로그램 목록">
        <?php if (empty($pagedPrograms)): ?>
            <p class="program-list__empty">조건에 맞는 프로그램이 없습니다.</p>
        <?php else: ?>
            <?php foreach ($pagedPrograms as $program): ?>
                <?php
                $programMeta = getProgramCardMeta($program);
                $status = $programMeta['status'];
                $isClosed = $status === ProgramStatus::CLOSED;
                $image = $program['image'] ?? [];
                $imageSrc = BASE_URL . ($image['src'] ?? '');
                $imageAlt = $image['alt'] ?? ($program['title'] ?? '');
                $title = $program['title'] ?? '';
                $ageLabel = getProgramAgeLabel($program);
                $recruitmentPeriod = $programMeta['recruitment_period'] !== ''
                    ? $programMeta['recruitment_period']
                    : '상시 모집';
                $activityPeriod = $programMeta['activity_period'] !== ''
                    ? $programMeta['activity_period']
                    : '상시 운영';
                ?>
                <article class="program-apply-card<?= $isClosed ? ' is-closed' : '' ?>" id="program-<?= (int) ($program['id'] ?? 0) ?>">
                    <a class="program-apply-card__media" href="<?= BASE_URL ?>/program-detail.php?id=<?= (int) ($program['id'] ?? 0) ?>">
                        <img
                            src="<?= htmlspecialchars($imageSrc, ENT_QUOTES, 'UTF-8') ?>"
                            alt="<?= htmlspecialchars($imageAlt, ENT_QUOTES, 'UTF-8') ?>"
                        >
                        <div class="program-apply-card__overlay" aria-hidden="true">
                            <strong><?= htmlspecialchars($title, ENT_QUOTES, 'UTF-8') ?></strong>
                            <dl>
                                <div>
                                    <dt>신청기간</dt>
                                    <dd><?= htmlspecialchars($recruitmentPeriod, ENT_QUOTES, 'UTF-8') ?></dd>
                                </div>
                                <div>
                                    <dt>신청대상</dt>
                                    <dd><?= htmlspecialchars($ageLabel, ENT_QUOTES, 'UTF-8') ?></dd>
                                </div>
                                <div>
                                    <dt>활동기간</dt>
                                    <dd><?= htmlspecialchars($activityPeriod, ENT_QUOTES, 'UTF-8') ?></dd>
                                </div>
                            </dl>
                            <span class="program-apply-card__plus">+</span>
                        </div>
                    </a>

                    <div class="program-apply-card__actions">
                        <?php if ($isClosed): ?>
                            <button class="program-apply-card__cta is-closed" type="button" disabled>마감</button>
                        <?php else: ?>
                            <a
                                class="program-apply-card__cta is-apply"
                                href="<?= BASE_URL ?>/program-apply.php?id=<?= (int) ($program['id'] ?? 0) ?>"
                            >
                                신청하기
                            </a>
                        <?php endif; ?>
                        <button
                            class="program-apply-card__cta is-confirm"
                            type="button"
                            data-program-id="<?= (int) ($program['id'] ?? 0) ?>"
                            data-program-title="<?= htmlspecialchars($title, ENT_QUOTES, 'UTF-8') ?>"
                        >
                            신청확인
                        </button>
                    </div>
                </article>
            <?php endforeach; ?>
        <?php endif; ?>
    </section>

    <?php if ($totalPages > 1): ?>
        <nav class="program-pagination inner" aria-label="프로그램 목록 페이지">
            <?php if ($currentPage > 1): ?>
                <a href="<?= htmlspecialchars(buildProgramPageUrl(1, $statusFilter, $keyword), ENT_QUOTES, 'UTF-8') ?>" aria-label="첫 페이지">«</a>
                <a href="<?= htmlspecialchars(buildProgramPageUrl($currentPage - 1, $statusFilter, $keyword), ENT_QUOTES, 'UTF-8') ?>" aria-label="이전 페이지">‹</a>
            <?php else: ?>
                <span aria-disabled="true" aria-label="첫 페이지">«</span>
                <span aria-disabled="true" aria-label="이전 페이지">‹</span>
            <?php endif; ?>

            <?php for ($page = 1; $page <= $totalPages; $page++): ?>
                <?php if ($page === $currentPage): ?>
                    <strong aria-current="page"><?= $page ?></strong>
                <?php else: ?>
                    <a href="<?= htmlspecialchars(buildProgramPageUrl($page, $statusFilter, $keyword), ENT_QUOTES, 'UTF-8') ?>"><?= $page ?></a>
                <?php endif; ?>
            <?php endfor; ?>

            <?php if ($currentPage < $totalPages): ?>
                <a href="<?= htmlspecialchars(buildProgramPageUrl($currentPage + 1, $statusFilter, $keyword), ENT_QUOTES, 'UTF-8') ?>" aria-label="다음 페이지">›</a>
                <a href="<?= htmlspecialchars(buildProgramPageUrl($totalPages, $statusFilter, $keyword), ENT_QUOTES, 'UTF-8') ?>" aria-label="마지막 페이지">»</a>
            <?php else: ?>
                <span aria-disabled="true" aria-label="다음 페이지">›</span>
                <span aria-disabled="true" aria-label="마지막 페이지">»</span>
            <?php endif; ?>
        </nav>
    <?php endif; ?>

    <?php include __DIR__ . '/includes/components/program-confirm-modal.php'; ?>
</main>

<?php include __DIR__ . '/includes/footer.php'; ?>

<script>
    window.APP_BASE_URL = '<?= BASE_URL ?>';
</script>
<script src="<?= BASE_URL ?>/js/global-nav.js"></script>
<script src="<?= BASE_URL ?>/js/header-search.js"></script>
<script src="<?= BASE_URL ?>/js/program-confirm-modal.js"></script>

</body>
</html>

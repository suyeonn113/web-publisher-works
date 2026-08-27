<?php
include __DIR__ . '/includes/config.php';
include __DIR__ . '/includes/data/youth-programs.php';
include __DIR__ . '/includes/functions/program.service.php';


$pageTitle = '청소년 활동 신청';
$pageCss = ['info-pages.css', 'programs.css', 'program-confirm-modal.css'];
$programContextPage = 'youth';

$statusFilter = isset($_GET['status']) ? trim((string) $_GET['status']) : '';
$keyword = isset($_GET['keyword']) ? trim((string) $_GET['keyword']) : '';
$recommendFilterState = normalizeRecommendFilterState($_GET);
$ageFilter = (string) ($recommendFilterState['age'] ?? '');
$fieldFilter = (string) ($recommendFilterState['field'] ?? '');
$currentPage = isset($_GET['page']) ? (int) $_GET['page'] : 1;
$programsPerPage = 12;
$allowedStatuses = [
    '',
    ProgramStatus::ALWAYS,
    ProgramStatus::ONGOING,
];

if (!in_array($statusFilter, $allowedStatuses, true)) {
    $statusFilter = '';
}

$ageOptions = [
    'infant' => '유아',
    'elementary-low' => '초등 저학년',
    'elementary-high' => '초등 고학년',
    'early-youth' => '초기 청소년',
    'mid-youth' => '중기 청소년',
    'late-youth' => '후기 청소년',
    'citizen' => '시민',
];

$fieldOptions = [
    'career' => '진로 직업',
    'culture-art' => '문화 예술',
    'emotional' => '정서 관계',
    'competency' => '역량 성장',
    'citizen' => '시민 참여',
];

$hasActiveFilters = $statusFilter !== '' || $keyword !== '' || $ageFilter !== '' || $fieldFilter !== '';
$facetFilterState = [
    'age' => $ageFilter !== '' ? $ageFilter : null,
    'field' => $fieldFilter !== '' ? $fieldFilter : null,
];

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

function buildProgramPageUrl(
    int $page,
    string $statusFilter,
    string $keyword,
    string $ageFilter,
    string $fieldFilter
): string
{
    $params = [];

    if ($statusFilter !== '') {
        $params['status'] = $statusFilter;
    }

    if ($keyword !== '') {
        $params['keyword'] = $keyword;
    }

    if ($ageFilter !== '') {
        $params['age'] = $ageFilter;
    }

    if ($fieldFilter !== '') {
        $params['field'] = $fieldFilter;
    }

    if ($page > 1) {
        $params['page'] = $page;
    }

    $query = http_build_query($params);

    return BASE_URL . '/programs.php' . ($query !== '' ? '?' . $query : '');
}

$programs = getOpenProgramsForDisplay($youthPrograms);
$programs = array_values(array_filter(
    $programs,
    static function (array $program) use ($statusFilter, $keyword, $facetFilterState): bool {
        $matchesStatus = $statusFilter === '' || getProgramStatus($program) === $statusFilter;

        return $matchesStatus
            && matchesProgramKeyword($program, $keyword)
            && matchesRecommendProgram($program, $facetFilterState);
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
            <nav class="info-breadcrumb type-caption" aria-label="현재 위치">
                <ol>
                    <li><a href="<?= BASE_URL ?>/index.php">홈</a></li>
                    <li>통합신청</li>
                    <li aria-current="page">청소년 프로그램 신청</li>
                </ol>
            </nav>
            <div class="info-hero__copy">
                <p class="info-eyebrow type-label">PROGRAM APPLICATION</p>
                <h1 class="type-page-title" id="program-page-title">청소년 프로그램 신청</h1>
                <p class="type-body-lg">현재 접수 중인 프로그램을 확인하고 관심 있는 활동에 바로 신청할 수 있습니다.</p>
            </div>
        </div>
    </section>

    <?php include __DIR__ . '/includes/components/program-context-nav.php'; ?>

    <div class="program-context-content program-page__content inner">
    <section class="program-page__header" aria-labelledby="program-page-title">
        <p class="type-body-lg">
            총 <strong><?= $totalPrograms ?></strong>개의 프로그램이 등록되어 있습니다.
        </p>

        <form class="program-filter program-search" action="<?= BASE_URL ?>/programs.php" method="get" role="search" aria-label="프로그램 필터 검색">
            <div class="program-search__field">
                <label class="type-label" for="program-status">모집 상태</label>
                <select id="program-status" name="status">
                    <option value=""<?= $statusFilter === '' ? ' selected' : '' ?>>전체</option>
                    <option value="<?= ProgramStatus::ONGOING ?>"<?= $statusFilter === ProgramStatus::ONGOING ? ' selected' : '' ?>>접수중</option>
                    <option value="<?= ProgramStatus::ALWAYS ?>"<?= $statusFilter === ProgramStatus::ALWAYS ? ' selected' : '' ?>>상시</option>
                </select>
            </div>

            <div class="program-search__field">
                <label class="type-label" for="program-age">연령</label>
                <select id="program-age" name="age">
                    <option value="">전체 연령</option>
                    <?php foreach ($ageOptions as $value => $label): ?>
                        <option value="<?= $value ?>"<?= $ageFilter === $value ? ' selected' : '' ?>><?= $label ?></option>
                    <?php endforeach; ?>
                </select>
            </div>

            <div class="program-search__field">
                <label class="type-label" for="program-field">분야</label>
                <select id="program-field" name="field">
                    <option value="">전체 분야</option>
                    <?php foreach ($fieldOptions as $value => $label): ?>
                        <option value="<?= $value ?>"<?= $fieldFilter === $value ? ' selected' : '' ?>><?= $label ?></option>
                    <?php endforeach; ?>
                </select>
            </div>

            <div class="program-search__field program-search__field--keyword">
                <label class="type-label" for="program-keyword">검색어</label>
                <input
                    id="program-keyword"
                    name="keyword"
                    type="search"
                    value="<?= htmlspecialchars($keyword, ENT_QUOTES, 'UTF-8') ?>"
                    placeholder="프로그램명 또는 키워드"
                >
            </div>

            <div class="program-search__actions">
                <button class="program-search__submit button control control--search" type="submit">검색</button>
                <?php if ($hasActiveFilters): ?>
                    <a class="program-search__reset control" href="<?= BASE_URL ?>/programs.php">초기화</a>
                <?php endif; ?>
            </div>
        </form>
    </section>

    <section class="program-list" aria-label="청소년 활동 신청 프로그램 목록">
        <?php if (empty($pagedPrograms)): ?>
            <p class="program-list__empty empty-state type-body">조건에 맞는 프로그램이 없습니다.</p>
        <?php else: ?>
            <?php foreach ($pagedPrograms as $program): ?>
                <?php
                $programMeta = getProgramCardMeta($program);
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
                <article class="program-apply-card" id="program-<?= (int) ($program['id'] ?? 0) ?>">
                    <a class="program-apply-card__media" href="<?= BASE_URL ?>/program-detail.php?id=<?= (int) ($program['id'] ?? 0) ?>">
                        <img
                            src="<?= htmlspecialchars($imageSrc, ENT_QUOTES, 'UTF-8') ?>"
                            alt="<?= htmlspecialchars($imageAlt, ENT_QUOTES, 'UTF-8') ?>"
                        >
                        <div class="program-apply-card__overlay" aria-hidden="true">
                            <strong class="type-body-lg"><?= htmlspecialchars($title, ENT_QUOTES, 'UTF-8') ?></strong>
                            <dl class="type-caption">
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
                        </div>
                    </a>

                    <div class="program-apply-card__actions">
                        <a
                            class="program-apply-card__cta is-apply control control--primary"
                            href="<?= BASE_URL ?>/program-apply.php?id=<?= (int) ($program['id'] ?? 0) ?>"
                        >
                            신청하기
                        </a>
                        <button
                            class="program-apply-card__cta is-confirm control"
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
        <nav class="program-pagination" aria-label="프로그램 목록 페이지">
            <?php if ($currentPage > 1): ?>
                <a href="<?= htmlspecialchars(buildProgramPageUrl(1, $statusFilter, $keyword, $ageFilter, $fieldFilter), ENT_QUOTES, 'UTF-8') ?>" aria-label="첫 페이지">«</a>
                <a href="<?= htmlspecialchars(buildProgramPageUrl($currentPage - 1, $statusFilter, $keyword, $ageFilter, $fieldFilter), ENT_QUOTES, 'UTF-8') ?>" aria-label="이전 페이지">‹</a>
            <?php else: ?>
                <span aria-disabled="true" aria-label="첫 페이지">«</span>
                <span aria-disabled="true" aria-label="이전 페이지">‹</span>
            <?php endif; ?>

            <?php for ($page = 1; $page <= $totalPages; $page++): ?>
                <?php if ($page === $currentPage): ?>
                    <strong aria-current="page"><?= $page ?></strong>
                <?php else: ?>
                    <a href="<?= htmlspecialchars(buildProgramPageUrl($page, $statusFilter, $keyword, $ageFilter, $fieldFilter), ENT_QUOTES, 'UTF-8') ?>"><?= $page ?></a>
                <?php endif; ?>
            <?php endfor; ?>

            <?php if ($currentPage < $totalPages): ?>
                <a href="<?= htmlspecialchars(buildProgramPageUrl($currentPage + 1, $statusFilter, $keyword, $ageFilter, $fieldFilter), ENT_QUOTES, 'UTF-8') ?>" aria-label="다음 페이지">›</a>
                <a href="<?= htmlspecialchars(buildProgramPageUrl($totalPages, $statusFilter, $keyword, $ageFilter, $fieldFilter), ENT_QUOTES, 'UTF-8') ?>" aria-label="마지막 페이지">»</a>
            <?php else: ?>
                <span aria-disabled="true" aria-label="다음 페이지">›</span>
                <span aria-disabled="true" aria-label="마지막 페이지">»</span>
            <?php endif; ?>
        </nav>
    <?php endif; ?>
    </div>

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

<?php
include __DIR__ . '/includes/config.php';
include __DIR__ . '/includes/data/youth-programs.php';
include __DIR__ . '/includes/data/education-programs.php';
include __DIR__ . '/includes/functions/program.service.php';
require_once __DIR__ . '/includes/functions/youth-program-catalog.php';

$pageTitle = '통합검색 | 시립서울청소년센터';
$pageCss = 'search.css';

$siteSearchQuery = trim((string) ($_GET['q'] ?? ''));
$selectedType = trim((string) ($_GET['type'] ?? 'all'));

$searchTypes = [
    'all' => '전체',
    'center' => '센터 안내',
    'youth' => '청소년 프로그램',
    'lifelong' => '평생교육',
    'service' => '이용 안내',
    'news' => '센터 소식',
    'apply' => '프로그램 신청',
];

if (!array_key_exists($selectedType, $searchTypes)) {
    $selectedType = 'all';
}

$searchItems = [
    [
        'type' => 'center',
        'title' => '시립서울청소년센터 소개',
        'description' => '청소년의 행복한 꿈을 키우는 시립서울청소년센터의 인사말과 운영 방향을 안내합니다.',
        'url' => BASE_URL . '/center-introduction.php',
        'keywords' => ['센터소개', '인사말', '청소년센터'],
    ],
    [
        'type' => 'center',
        'title' => '시설 및 개요',
        'description' => '센터 개관일, 소재지, 시설규모, 운영시간과 층별 시설 정보를 확인할 수 있습니다.',
        'url' => BASE_URL . '/facility-overview.php',
        'keywords' => ['시설', '운영시간', '층별안내', '개요'],
    ],
    [
        'type' => 'center',
        'title' => '찾아오시는 길',
        'description' => '시립서울청소년센터 위치와 대중교통, 주차 이용 정보를 안내합니다.',
        'url' => BASE_URL . '/directions.php',
        'keywords' => ['주소', '교통', '주차', '을지로'],
    ],
    [
        'type' => 'lifelong',
        'title' => '평생교육 프로그램 접수안내',
        'description' => '접수 방법과 시간, 환불 기준, 준비 서류와 수강 전 확인사항을 안내합니다.',
        'url' => BASE_URL . '/lifelong-education-guide.php',
        'keywords' => ['평생교육', '접수', '환불', '수강'],
    ],
    [
        'type' => 'lifelong',
        'title' => '평생교육 교육강좌',
        'description' => '요일과 분야별 평생교육 강좌를 찾아보고 상세 운영 정보를 확인할 수 있습니다.',
        'url' => BASE_URL . '/lifelong-education-classes.php',
        'keywords' => ['강좌', '교육', '수업', '문화'],
    ],
    [
        'type' => 'service',
        'title' => '청소년문화공간 이용 안내',
        'description' => '청소년문화공간의 이용 대상, 운영시간과 공간 이용방법을 안내합니다.',
        'url' => BASE_URL . '/culture-space.php',
        'keywords' => ['문화공간', '공간', '이용'],
    ],
    [
        'type' => 'service',
        'title' => '종합체력실 이용 안내',
        'description' => '종합체력실 운영시간, 이용요금, 일회권과 운동기구 이용수칙을 확인할 수 있습니다.',
        'url' => BASE_URL . '/fitness-center.php',
        'keywords' => ['체력실', '헬스', '운동', '일회권', '요금'],
    ],
    [
        'type' => 'service',
        'title' => '시설대관 안내',
        'description' => '대관 신청 절차, 사용요금과 시설별 이용 규칙을 안내합니다.',
        'url' => BASE_URL . '/facility-rental.php',
        'keywords' => ['대관', '대여', '시설', '회의실'],
    ],
    [
        'type' => 'service',
        'title' => '기관방문 안내',
        'description' => '기관방문 목적과 대상, 운영 내용, 신청 문의 정보를 확인할 수 있습니다.',
        'url' => BASE_URL . '/visit.php',
        'keywords' => ['방문', '견학', '기관'],
    ],
    [
        'type' => 'news',
        'title' => '공지사항',
        'description' => '센터 운영, 프로그램 모집, 채용과 계약 관련 최신 소식을 확인할 수 있습니다.',
        'url' => BASE_URL . '/notices.php',
        'keywords' => ['공지', '소식', '채용', '운영', '모집'],
    ],
    [
        'type' => 'apply',
        'title' => '청소년 프로그램 신청',
        'description' => '현재 접수 중인 청소년 프로그램을 검색하고 참여 신청을 진행할 수 있습니다.',
        'url' => BASE_URL . '/programs.php',
        'keywords' => ['신청', '접수', '청소년활동'],
    ],
    [
        'type' => 'apply',
        'title' => '평생교육 프로그램 신청',
        'description' => '접수 가능한 평생교육 강좌를 확인하고 수강 신청을 진행할 수 있습니다.',
        'url' => BASE_URL . '/lifelong-education-apply.php',
        'keywords' => ['수강신청', '강좌신청', '평생교육'],
    ],
    [
        'type' => 'apply',
        'title' => '신청내역 확인',
        'description' => '신청한 청소년 프로그램과 평생교육 프로그램 내역을 확인할 수 있습니다.',
        'url' => BASE_URL . '/applications.php',
        'keywords' => ['신청내역', '접수확인', '조회'],
    ],
];

foreach (getYouthProgramCategories() as $category) {
    $searchItems[] = [
        'type' => 'youth',
        'title' => (string) $category['name'],
        'description' => (string) $category['description'],
        'url' => BASE_URL . '/youth-program-category.php?category=' . urlencode((string) $category['slug']),
        'keywords' => [(string) $category['name'], '청소년 프로그램', '청소년활동'],
    ];
}

foreach (getOpenProgramsForDisplay($youthPrograms) as $program) {
    $programId = (int) ($program['id'] ?? 0);
    $searchItems[] = [
        'type' => 'youth',
        'title' => (string) ($program['title'] ?? ''),
        'description' => getProgramFieldLabel($program) . ' 분야 · ' . getProgramAgeLabel($program) . ' 대상 프로그램입니다.',
        'url' => BASE_URL . '/program-detail.php?id=' . $programId,
        'keywords' => array_merge(
            (array) ($program['hashtags'] ?? []),
            (array) ($program['search_keywords'] ?? [])
        ),
    ];
}

foreach ($educationPrograms as $program) {
    if (empty($program['is_active'])) {
        continue;
    }

    $searchItems[] = [
        'type' => 'lifelong',
        'title' => (string) ($program['title'] ?? ''),
        'description' => getProgramFieldLabel($program) . ' 분야 · ' . getProgramAgeLabel($program) . ' 대상 강좌입니다.',
        'url' => BASE_URL . '/lifelong-education-apply.php',
        'keywords' => (array) ($program['search_keywords'] ?? []),
    ];
}

function siteSearchMatches(array $item, string $query): bool
{
    if ($query === '') {
        return false;
    }

    $haystack = implode(' ', [
        (string) ($item['title'] ?? ''),
        (string) ($item['description'] ?? ''),
        implode(' ', (array) ($item['keywords'] ?? [])),
    ]);

    if (function_exists('mb_stripos')) {
        return mb_stripos($haystack, $query, 0, 'UTF-8') !== false;
    }

    return stripos($haystack, $query) !== false;
}

function siteSearchExcerpt(string $text, string $query): string
{
    $escaped = htmlspecialchars($text, ENT_QUOTES, 'UTF-8');
    if ($query === '') {
        return $escaped;
    }

    $escapedQuery = htmlspecialchars($query, ENT_QUOTES, 'UTF-8');
    return (string) preg_replace(
        '/(' . preg_quote($escapedQuery, '/') . ')/iu',
        '<mark>$1</mark>',
        $escaped
    );
}

$matchedItems = array_values(array_filter(
    $searchItems,
    static fn(array $item): bool => siteSearchMatches($item, $siteSearchQuery)
));

$typeCounts = array_fill_keys(array_keys($searchTypes), 0);
$typeCounts['all'] = count($matchedItems);
foreach ($matchedItems as $item) {
    $type = (string) $item['type'];
    if (isset($typeCounts[$type])) {
        $typeCounts[$type]++;
    }
}

$visibleItems = $selectedType === 'all'
    ? $matchedItems
    : array_values(array_filter(
        $matchedItems,
        static fn(array $item): bool => $item['type'] === $selectedType
    ));
?>

<!DOCTYPE html>
<html lang="ko">

<?php include __DIR__ . '/includes/head.php'; ?>

<body>
<?php include __DIR__ . '/includes/global-nav.php'; ?>

<main id="main" class="site-search-page">
    <section class="site-search-hero" aria-labelledby="site-search-title">
        <div class="inner">
            <nav class="site-search-breadcrumb" aria-label="현재 위치">
                <ol>
                    <li><a href="<?= BASE_URL ?>/index.php">홈</a></li>
                    <li aria-current="page">통합검색</li>
                </ol>
            </nav>
            <h1 id="site-search-title">통합검색</h1>
            <p>시립서울청소년센터의 프로그램과 이용 정보를 한 번에 찾아보세요.</p>
        </div>
    </section>

    <div class="site-search-content inner">
        <form class="site-search-form" method="get" action="<?= BASE_URL ?>/search.php" role="search">
            <label class="visually-hidden" for="site-search-input">검색어</label>
            <input id="site-search-input" type="search" name="q"
                   value="<?= htmlspecialchars($siteSearchQuery, ENT_QUOTES, 'UTF-8') ?>"
                   placeholder="검색어를 입력하세요" required>
            <button type="submit" aria-label="검색">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                    <circle cx="11" cy="11" r="7"></circle>
                    <path d="m16 16 5 5"></path>
                </svg>
                <span>검색</span>
            </button>
        </form>

        <?php if ($siteSearchQuery === ''): ?>
            <section class="site-search-empty" aria-labelledby="search-guide-title">
                <span aria-hidden="true">⌕</span>
                <h2 id="search-guide-title">찾고 싶은 내용을 입력해주세요</h2>
                <p>프로그램명, 시설명 또는 궁금한 내용을 검색할 수 있습니다.</p>
                <div class="site-search-suggestions" aria-label="추천 검색어">
                    <a href="<?= BASE_URL ?>/search.php?q=청소년+프로그램">청소년 프로그램</a>
                    <a href="<?= BASE_URL ?>/search.php?q=평생교육">평생교육</a>
                    <a href="<?= BASE_URL ?>/search.php?q=시설대관">시설대관</a>
                    <a href="<?= BASE_URL ?>/search.php?q=운영시간">운영시간</a>
                </div>
            </section>
        <?php else: ?>
            <section class="site-search-results" aria-labelledby="search-results-title">
                <header class="site-search-results__head">
                    <h2 id="search-results-title">
                        <span>‘<?= htmlspecialchars($siteSearchQuery, ENT_QUOTES, 'UTF-8') ?>’</span> 검색 결과
                    </h2>
                    <p aria-live="polite">총 <strong><?= count($matchedItems) ?></strong>건</p>
                </header>

                <?php if ($matchedItems): ?>
                    <nav class="site-search-filters" aria-label="검색 결과 분류">
                        <?php foreach ($searchTypes as $type => $label): ?>
                            <?php if ($type !== 'all' && $typeCounts[$type] === 0) continue; ?>
                            <a href="<?= BASE_URL ?>/search.php?<?= htmlspecialchars(http_build_query(['q' => $siteSearchQuery, 'type' => $type]), ENT_QUOTES, 'UTF-8') ?>"
                               <?= $selectedType === $type ? 'aria-current="page"' : '' ?>>
                                <?= htmlspecialchars($label, ENT_QUOTES, 'UTF-8') ?>
                                <span><?= (int) $typeCounts[$type] ?></span>
                            </a>
                        <?php endforeach; ?>
                    </nav>

                    <div class="site-search-list">
                        <?php foreach ($visibleItems as $item): ?>
                            <article class="site-search-item">
                                <p class="site-search-item__type"><?= htmlspecialchars($searchTypes[$item['type']], ENT_QUOTES, 'UTF-8') ?></p>
                                <h3>
                                    <a href="<?= htmlspecialchars($item['url'], ENT_QUOTES, 'UTF-8') ?>">
                                        <?= siteSearchExcerpt((string) $item['title'], $siteSearchQuery) ?>
                                        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m9 5 7 7-7 7"></path></svg>
                                    </a>
                                </h3>
                                <p class="site-search-item__description"><?= siteSearchExcerpt((string) $item['description'], $siteSearchQuery) ?></p>
                            </article>
                        <?php endforeach; ?>
                    </div>
                <?php else: ?>
                    <div class="site-search-empty site-search-empty--result">
                        <span aria-hidden="true">!</span>
                        <h3>검색 결과가 없습니다</h3>
                        <p>검색어의 철자를 확인하거나 더 짧은 단어로 다시 검색해보세요.</p>
                    </div>
                <?php endif; ?>
            </section>
        <?php endif; ?>
    </div>
</main>

<?php include __DIR__ . '/includes/footer.php'; ?>
<script src="<?= BASE_URL ?>/js/global-nav.js"></script>
<script src="<?= BASE_URL ?>/js/header-search.js"></script>
</body>
</html>

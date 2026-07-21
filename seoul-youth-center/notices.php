<?php
include __DIR__ . '/includes/config.php';

$pageTitle = '공지사항 | 시립서울청소년센터';
$pageCss = 'info-pages.css';

$notices = [
    ['id' => 14, 'category' => '채용', 'title' => '상반기 정직원 채용 면접 안내', 'date' => '2026.03.23', 'pinned' => false, 'body' => "2026년 상반기 정직원 채용 면접 일정을 안내드립니다.\n면접 대상자는 개별 안내된 시간에 맞춰 센터 2층 안내데스크로 방문해 주세요.\n\n문의: 시립서울청소년센터 운영지원팀"],
    ['id' => 13, 'category' => '운영', 'title' => '정기 휴관일 안내', 'date' => '2026.03.23', 'pinned' => false, 'body' => "센터 정기 휴관일을 안내드립니다.\n휴관일에는 시설 이용과 현장 접수가 운영되지 않으니 방문 전에 일정을 확인해 주세요.\n\n온라인 프로그램 신청과 신청내역 확인은 정상적으로 이용할 수 있습니다."],
    ['id' => 12, 'category' => '공지', 'title' => '홈페이지 회원 자동탈퇴(파기) 안내 및 재동의 사전 안내', 'date' => '2026.04.08', 'pinned' => true, 'body' => "개인정보 보호를 위해 장기간 이용 기록이 없는 회원정보의 정리 절차를 안내드립니다.\n대상자와 처리 일정은 등록된 연락처를 통해 별도로 안내할 예정입니다."],
    ['id' => 11, 'category' => '공지', 'title' => '홈페이지 자녀계정 로그인 방법 안내', 'date' => '2026.04.03', 'pinned' => true, 'body' => "청소년 프로그램 신청을 위한 자녀계정 로그인 절차를 안내합니다.\n로그인에 어려움이 있는 경우 대표전화로 문의해 주세요."],
    ['id' => 10, 'category' => '채용', 'title' => '2026년 평생교육 기구필라테스 강사 채용 공고', 'date' => '2026.03.29', 'pinned' => false, 'body' => "시립서울청소년센터 평생교육 프로그램을 함께 운영할 기구필라테스 강사를 모집합니다.\n세부 일정과 제출서류는 공고 내용을 확인해 주세요."],
    ['id' => 9, 'category' => '운영', 'title' => '시립서울청소년센터 운영백서(2025년) 안내', 'date' => '2026.03.25', 'pinned' => false, 'body' => "2025년 주요 사업과 운영 성과를 정리한 운영백서를 안내합니다.\n센터의 프로그램과 지역연계 활동 내용을 확인하실 수 있습니다."],
    ['id' => 8, 'category' => '입찰', 'title' => '수의계약 공개내역서(2026년 3월 꿈꾸는 아이들 책걸상 구매)', 'date' => '2026.03.21', 'pinned' => false, 'body' => "관련 규정에 따라 2026년 3월 수의계약 내역을 공개합니다."],
    ['id' => 7, 'category' => '공지', 'title' => '2026년 4월 센터 휴관일 및 운영시간 안내', 'date' => '2026.03.18', 'pinned' => false, 'body' => "센터 방문 전 4월 휴관일과 시설별 운영시간을 확인해 주세요.\n프로그램별 일정은 각 모집 상세 페이지에서 확인할 수 있습니다."],
    ['id' => 6, 'category' => '모집', 'title' => '제24기 청소년운영위원회 추가위원 모집', 'date' => '2026.03.14', 'pinned' => false, 'body' => "청소년의 의견을 센터 운영에 반영하는 청소년운영위원회 추가위원을 모집합니다.\n대상과 활동기간을 확인한 후 신청해 주세요."],
    ['id' => 5, 'category' => '운영', 'title' => '청소년문화공간 움 4월 이용 안내', 'date' => '2026.03.11', 'pinned' => false, 'body' => "청소년문화공간 움의 4월 운영시간과 이용수칙을 안내합니다."],
    ['id' => 4, 'category' => '채용', 'title' => '2026년 청소년 프로그램 보조지도자 모집', 'date' => '2026.03.07', 'pinned' => false, 'body' => "청소년 프로그램 운영을 지원할 보조지도자를 모집합니다.\n지원자격과 활동조건을 확인해 주세요."],
    ['id' => 3, 'category' => '공지', 'title' => '센터 주차장 이용요금 및 운영시간 변경 안내', 'date' => '2026.03.02', 'pinned' => false, 'body' => "센터 주차장 운영시간과 이용요금 변경사항을 안내드립니다.\n주차공간이 협소하므로 대중교통 이용을 권장합니다."],
];

$categories = ['all' => '전체', '공지' => '공지', '모집' => '모집', '채용' => '채용', '운영' => '운영', '입찰' => '입찰'];
$selectedCategory = (string) ($_GET['category'] ?? 'all');
$keyword = trim((string) ($_GET['q'] ?? ''));
$selectedNoticeId = (int) ($_GET['notice'] ?? 0);

if (!array_key_exists($selectedCategory, $categories)) {
    $selectedCategory = 'all';
}

$filteredNotices = array_values(array_filter($notices, static function (array $notice) use ($selectedCategory, $keyword): bool {
    $categoryMatches = $selectedCategory === 'all' || $notice['category'] === $selectedCategory;
    $keywordMatches = $keyword === '' || strpos($notice['title'], $keyword) !== false;
    return $categoryMatches && $keywordMatches;
}));

usort($filteredNotices, static function (array $left, array $right): int {
    return (int) $right['pinned'] <=> (int) $left['pinned'];
});

$regularNoticeNumber = count(array_filter($filteredNotices, static fn (array $notice): bool => !$notice['pinned']));

$selectedNotice = null;
foreach ($notices as $notice) {
    if ($notice['id'] === $selectedNoticeId) {
        $selectedNotice = $notice;
        break;
    }
}
?>

<!DOCTYPE html>
<html lang="ko">

<?php include __DIR__ . '/includes/head.php'; ?>

<body>
<?php include __DIR__ . '/includes/global-nav.php'; ?>

<main id="main" class="info-page">
    <section class="info-hero" aria-labelledby="notices-title">
        <div class="info-hero__inner inner">
            <nav class="info-breadcrumb" aria-label="현재 위치">
                <ol>
                    <li><a href="<?= BASE_URL ?>/index.php">홈</a></li>
                    <li>소식</li>
                    <li aria-current="page">공지사항</li>
                </ol>
            </nav>
            <div class="info-hero__copy">
                <p class="info-eyebrow">NOTICE</p>
                <h1 id="notices-title">공지사항</h1>
                <p>센터 운영, 프로그램 모집, 채용과 계약 정보를 빠르게 확인할 수 있습니다.</p>
            </div>
        </div>
    </section>

    <div class="info-layout inner">
        <aside class="info-local-nav" aria-label="센터 소식 메뉴">
            <h2>센터 소식</h2>
            <nav>
                <a href="<?= BASE_URL ?>/notices.php" aria-current="page">공지사항</a>
                <a href="#">프로그램 활동사진</a>
                <a href="#">보도자료</a>
                <a href="#">서울시정</a>
                <a href="#">공유자료</a>
            </nav>
        </aside>

        <div class="info-content">
            <?php if ($selectedNotice): ?>
                <article class="notice-detail info-card" aria-labelledby="notice-detail-title">
                    <header class="notice-detail__head">
                        <span class="notice-row__category"><?= htmlspecialchars($selectedNotice['category'], ENT_QUOTES, 'UTF-8') ?></span>
                        <h2 id="notice-detail-title"><?= htmlspecialchars($selectedNotice['title'], ENT_QUOTES, 'UTF-8') ?></h2>
                        <div class="notice-detail__meta"><span>등록일 <?= htmlspecialchars($selectedNotice['date'], ENT_QUOTES, 'UTF-8') ?></span><span>담당 시립서울청소년센터</span></div>
                    </header>
                    <div class="notice-detail__body"><?= htmlspecialchars($selectedNotice['body'], ENT_QUOTES, 'UTF-8') ?></div>
                    <a class="info-button info-button--secondary notice-detail__back" href="<?= BASE_URL ?>/notices.php">목록으로 돌아가기</a>
                </article>
            <?php endif; ?>

            <section class="info-section" aria-labelledby="notice-list-title">
                <header class="info-section-heading">
                    <p>CENTER NEWS</p>
                    <h2 id="notice-list-title">센터 소식</h2>
                </header>

                <form class="notice-toolbar info-card" method="get" action="<?= BASE_URL ?>/notices.php" role="search">
                    <label class="visually-hidden" for="notice-category">분류 선택</label>
                    <select id="notice-category" name="category">
                        <?php foreach ($categories as $value => $label): ?>
                            <option value="<?= htmlspecialchars($value, ENT_QUOTES, 'UTF-8') ?>" <?= $selectedCategory === $value ? 'selected' : '' ?>><?= htmlspecialchars($label, ENT_QUOTES, 'UTF-8') ?></option>
                        <?php endforeach; ?>
                    </select>
                    <label class="visually-hidden" for="notice-keyword">공지사항 검색어</label>
                    <input id="notice-keyword" type="search" name="q" value="<?= htmlspecialchars($keyword, ENT_QUOTES, 'UTF-8') ?>" placeholder="제목을 검색하세요">
                    <button type="submit">검색</button>
                </form>

                <p class="notice-result-count">총 <strong><?= count($filteredNotices) ?></strong>건</p>

                <div class="notice-list">
                    <?php if (!$filteredNotices): ?>
                        <p class="notice-empty">검색 조건에 맞는 공지사항이 없습니다.</p>
                    <?php else: ?>
                        <?php foreach ($filteredNotices as $notice): ?>
                            <article class="notice-row<?= $notice['pinned'] ? ' is-pinned' : '' ?>" id="notice-<?= (int) $notice['id'] ?>">
                                <span class="notice-row__number"><?= $notice['pinned'] ? '필독' : (string) $regularNoticeNumber-- ?></span>
                                <span class="notice-row__category"><?= htmlspecialchars($notice['category'], ENT_QUOTES, 'UTF-8') ?></span>
                                <h3 class="notice-row__title"><a href="<?= BASE_URL ?>/notices.php?notice=<?= (int) $notice['id'] ?>"><?= htmlspecialchars($notice['title'], ENT_QUOTES, 'UTF-8') ?></a></h3>
                                <time class="notice-row__date" datetime="<?= str_replace('.', '-', htmlspecialchars($notice['date'], ENT_QUOTES, 'UTF-8')) ?>"><?= htmlspecialchars($notice['date'], ENT_QUOTES, 'UTF-8') ?></time>
                            </article>
                        <?php endforeach; ?>
                    <?php endif; ?>
                </div>
            </section>
        </div>
    </div>
</main>

<?php include __DIR__ . '/includes/footer.php'; ?>
<script src="<?= BASE_URL ?>/js/global-nav.js"></script>
<script src="<?= BASE_URL ?>/js/header-search.js"></script>
</body>
</html>

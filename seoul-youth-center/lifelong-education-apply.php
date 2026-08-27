<?php
include __DIR__ . '/includes/config.php';
require_once __DIR__ . '/includes/data/lifelong-education-classes.php';
require_once __DIR__ . '/includes/functions/lifelong-education.service.php';

$pageTitle = '평생교육 프로그램 신청 | 시립서울청소년센터';
$pageCss = ['info-pages.css', 'lifelong-education-apply.css'];
$programContextPage = 'lifelong';

$groupFilter = trim((string) ($_GET['group'] ?? ''));
$categoryFilter = trim((string) ($_GET['category'] ?? ''));
$keyword = trim((string) ($_GET['keyword'] ?? ''));
$groups = array_values(array_unique(array_column($lifelongEducationClasses, 'group')));
$categories = array_values(array_unique(array_column($lifelongEducationClasses, 'category')));
$classes = sortLifelongEducationClassesByAvailability(array_values(array_filter(
    $lifelongEducationClasses,
    static fn(array $class): bool => matchesLifelongEducationFilters($class, $groupFilter, $categoryFilter, $keyword)
)));
$hasFilters = $groupFilter !== '' || $categoryFilter !== '' || $keyword !== '';
?>

<!DOCTYPE html>
<html lang="ko">
<?php include __DIR__ . '/includes/head.php'; ?>
<body>
<?php include __DIR__ . '/includes/global-nav.php'; ?>

<main id="main" class="info-page lifelong-apply-page">
    <section class="info-hero" aria-labelledby="lifelong-apply-title">
        <div class="info-hero__inner inner">
            <nav class="info-breadcrumb type-caption" aria-label="현재 위치">
                <ol>
                    <li><a href="<?= BASE_URL ?>/index.php">홈</a></li>
                    <li>통합신청</li>
                    <li aria-current="page">평생교육 프로그램 신청</li>
                </ol>
            </nav>
            <div class="info-hero__copy">
                <p class="info-eyebrow type-label">LIFELONG EDUCATION APPLICATION</p>
                <h1 class="type-page-title" id="lifelong-apply-title">평생교육 프로그램 신청</h1>
                <p class="type-body-lg">강좌별 일정과 접수 상태를 확인하고 온라인으로 신청하세요.</p>
            </div>
        </div>
    </section>

    <?php include __DIR__ . '/includes/components/program-context-nav.php'; ?>

    <div class="program-context-content lifelong-apply-content inner">
        <section class="lifelong-course-search" aria-label="평생교육 강좌 검색">
            <div class="lifelong-course-search__heading">
                <p class="lifelong-course-search__notice type-body-lg">
                    <strong><span class="lifelong-course-search__term"><?= htmlspecialchars($currentEducationTerm['label'] . '(' . $currentEducationTerm['period'] . ')', ENT_QUOTES, 'UTF-8') ?></span> 평생교육 프로그램을 접수 중입니다.</strong>
                </p>
            </div>
            <form class="program-filter type-label" action="<?= BASE_URL ?>/lifelong-education-apply.php" method="get" role="search">
                <label>
                    <span>종목</span>
                    <select name="group">
                        <option value="">전체 종목</option>
                        <?php foreach ($groups as $group): ?>
                            <option value="<?= htmlspecialchars($group, ENT_QUOTES, 'UTF-8') ?>"<?= $groupFilter === $group ? ' selected' : '' ?>><?= htmlspecialchars($group, ENT_QUOTES, 'UTF-8') ?></option>
                        <?php endforeach; ?>
                    </select>
                </label>
                <label>
                    <span>강습반</span>
                    <select name="category">
                        <option value="">전체 강습반</option>
                        <?php foreach ($categories as $category): ?>
                            <option value="<?= htmlspecialchars($category, ENT_QUOTES, 'UTF-8') ?>"<?= $categoryFilter === $category ? ' selected' : '' ?>><?= htmlspecialchars($category, ENT_QUOTES, 'UTF-8') ?></option>
                        <?php endforeach; ?>
                    </select>
                </label>
                <label class="lifelong-course-search__keyword">
                    <span>강좌명</span>
                    <input name="keyword" type="search" value="<?= htmlspecialchars($keyword, ENT_QUOTES, 'UTF-8') ?>" placeholder="강좌명 또는 강사명">
                </label>
                <div class="lifelong-course-search__actions">
                    <?php if ($hasFilters): ?><a class="control" href="<?= BASE_URL ?>/lifelong-education-apply.php">초기화</a><?php endif; ?>
                    <button class="control control--search" type="submit">강좌 검색</button>
                </div>
            </form>
        </section>

        <section class="lifelong-course-results" aria-label="평생교육 강좌 목록">
            <p class="lifelong-course-results__count type-body">총 <strong><?= count($classes) ?></strong>개</p>

            <?php if ($classes === []): ?>
                <p class="lifelong-course-results__empty empty-state type-body">조건에 맞는 강좌가 없습니다.</p>
            <?php else: ?>
                <div class="lifelong-course-table-wrap">
                    <table class="lifelong-course-table">
                        <caption class="visually-hidden">평생교육 강좌 목록</caption>
                        <thead>
                            <tr>
                                <th scope="col">강좌명</th><th scope="col">장소</th><th scope="col">종목</th><th scope="col">강사</th><th scope="col">요일·시간</th><th scope="col">대상</th><th scope="col">수강료</th><th scope="col">정원</th><th scope="col">신청</th>
                            </tr>
                        </thead>
                        <?php foreach ($classes as $class): ?>
                            <?php
                            $occupancy = getLifelongEducationOccupancy($class);
                            $isOpen = isLifelongEducationClassOpen($class);
                            ?>
                            <tbody class="lifelong-course-card<?= $isOpen ? '' : ' is-closed' ?>">
                                <tr>
                                    <th scope="row" data-label="강좌명">
                                        <span class="lifelong-course-title">
                                            <strong><?= htmlspecialchars($class['title'], ENT_QUOTES, 'UTF-8') ?></strong>
                                            <span class="lifelong-course-status<?= $isOpen ? '' : ' is-closed' ?>"><?= $isOpen ? '접수가능' : '접수마감' ?></span>
                                        </span>
                                    </th>
                                    <td data-label="장소"><?= htmlspecialchars($class['place'], ENT_QUOTES, 'UTF-8') ?></td>
                                    <td data-label="종목"><?= htmlspecialchars($class['category'], ENT_QUOTES, 'UTF-8') ?></td>
                                    <td data-label="강사"><?= htmlspecialchars($class['instructor'], ENT_QUOTES, 'UTF-8') ?></td>
                                    <td data-label="요일·시간"><?= htmlspecialchars($class['days_label'] . ' ' . $class['time'], ENT_QUOTES, 'UTF-8') ?></td>
                                    <td data-label="대상"><?= htmlspecialchars($class['target'], ENT_QUOTES, 'UTF-8') ?></td>
                                    <td data-label="수강료"><?= number_format((int) $class['fee']) ?>원</td>
                                    <td data-label="정원"><?= (int) $class['applied_count'] ?>/<?= (int) $class['capacity'] ?>명</td>
                                    <td data-label="신청">
                                        <?php if ($isOpen): ?>
                                            <a class="lifelong-course-apply control control--compact control--primary" href="<?= BASE_URL ?>/lifelong-education-apply-form.php?id=<?= (int) $class['id'] ?>">신청</a>
                                        <?php else: ?>
                                            <button class="lifelong-course-apply is-closed control control--compact" type="button" disabled>접수마감</button>
                                        <?php endif; ?>
                                    </td>
                                </tr>
                                <tr class="lifelong-course-progress-row" aria-label="<?= htmlspecialchars($class['title'], ENT_QUOTES, 'UTF-8') ?> 접수율 <?= $occupancy ?>%">
                                    <td colspan="9">
                                        <div class="lifelong-course-progress"><span style="width: <?= $occupancy ?>%"></span></div>
                                        <small>접수현황 <?= (int) $class['applied_count'] ?>/<?= (int) $class['capacity'] ?>명 · <?= $occupancy ?>%</small>
                                    </td>
                                </tr>
                            </tbody>
                        <?php endforeach; ?>
                    </table>
                </div>
            <?php endif; ?>
        </section>
    </div>
</main>

<?php include __DIR__ . '/includes/footer.php'; ?>
<script src="<?= BASE_URL ?>/js/global-nav.js"></script>
<script src="<?= BASE_URL ?>/js/header-search.js"></script>
</body>
</html>

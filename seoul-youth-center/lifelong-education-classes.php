<?php
include __DIR__ . '/includes/config.php';
include __DIR__ . '/includes/data/lifelong-education-classes.php';

$pageTitle = '평생교육 교육강좌 | 시립서울청소년센터';
$pageCss = ['info-pages.css', 'service-pages.css'];
$serviceSection = 'education';
$serviceCurrent = 'classes';
$currentTerm = $currentEducationTerm;
$classes = $lifelongEducationClasses;

$dayFilters = ['전체', '월', '화', '수', '목'];
$categoryFilters = ['전체', '건강운동', '댄스', '음악', '미술', '생활취미'];
?>

<!DOCTYPE html>
<html lang="ko">

<?php include __DIR__ . '/includes/head.php'; ?>

<body>
<?php include __DIR__ . '/includes/global-nav.php'; ?>

<main id="main" class="info-page">
    <section class="info-hero" aria-labelledby="education-classes-title">
        <div class="info-hero__inner inner">
            <nav class="info-breadcrumb" aria-label="현재 위치">
                <ol>
                    <li><a href="<?= BASE_URL ?>/index.php">홈</a></li>
                    <li>평생교육 프로그램</li>
                    <li aria-current="page">교육강좌</li>
                </ol>
            </nav>
            <div class="info-hero__copy">
                <p class="info-eyebrow">CLASS PROGRAM</p>
                <h1 id="education-classes-title">평생교육 교육강좌</h1>
                <p>분기마다 달라지는 강좌 편성을 확인하고 요일과 관심 분야에 맞는 수업을 찾아볼 수 있습니다.</p>
            </div>
        </div>
    </section>

    <div class="info-layout inner">
        <?php include __DIR__ . '/includes/components/service-local-nav.php'; ?>

        <div class="info-content">
            <section class="info-section" aria-labelledby="education-term-title">
                <div class="education-term-panel">
                    <div class="education-term-panel__copy">
                        <span>현재 표시 중인 편성표</span>
                        <h2 id="education-term-title"><?= htmlspecialchars($currentTerm['label'], ENT_QUOTES, 'UTF-8') ?> 강좌</h2>
                        <p><?= htmlspecialchars($currentTerm['period'], ENT_QUOTES, 'UTF-8') ?> 운영 예정 · <?= htmlspecialchars($currentTerm['published'], ENT_QUOTES, 'UTF-8') ?> 기준 편성 정보</p>
                    </div>
                    <div class="education-term-panel__meta">
                        <span>편성 시기</span>
                        <strong><?= htmlspecialchars($currentTerm['label'], ENT_QUOTES, 'UTF-8') ?> · <?= htmlspecialchars($currentTerm['period'], ENT_QUOTES, 'UTF-8') ?></strong>
                    </div>
                </div>
            </section>

            <section class="info-section" aria-label="평생교육 강좌 필터 및 목록">
                <div class="class-filter" data-class-filter>
                    <fieldset>
                        <legend>요일</legend>
                        <div class="class-filter__options">
                            <?php foreach ($dayFilters as $filter): ?>
                                <button type="button" data-filter-type="day" data-filter-value="<?= $filter === '전체' ? 'all' : htmlspecialchars($filter, ENT_QUOTES, 'UTF-8') ?>" aria-pressed="<?= $filter === '전체' ? 'true' : 'false' ?>"><?= htmlspecialchars($filter, ENT_QUOTES, 'UTF-8') ?></button>
                            <?php endforeach; ?>
                        </div>
                    </fieldset>
                    <fieldset>
                        <legend>분야</legend>
                        <div class="class-filter__options">
                            <?php foreach ($categoryFilters as $filter): ?>
                                <button type="button" data-filter-type="category" data-filter-value="<?= $filter === '전체' ? 'all' : htmlspecialchars($filter, ENT_QUOTES, 'UTF-8') ?>" aria-pressed="<?= $filter === '전체' ? 'true' : 'false' ?>"><?= htmlspecialchars($filter, ENT_QUOTES, 'UTF-8') ?></button>
                            <?php endforeach; ?>
                        </div>
                    </fieldset>
                </div>
                <p class="class-filter__result" aria-live="polite">전체 <strong><?= count($classes) ?></strong>개 강좌</p>

                <div class="class-grid" data-class-grid>
                    <?php foreach ($classes as $classIndex => $class): ?>
                        <article id="education-class-<?= $classIndex + 1 ?>" class="class-card" data-class-card data-days="<?= htmlspecialchars(implode(',', $class['days']), ENT_QUOTES, 'UTF-8') ?>" data-category="<?= htmlspecialchars($class['category'], ENT_QUOTES, 'UTF-8') ?>">
                            <div class="class-card__head">
                                <h3><?= htmlspecialchars($class['title'], ENT_QUOTES, 'UTF-8') ?></h3>
                                <div class="class-card__tags">
                                    <span class="class-card__tag class-card__tag--category"><?= htmlspecialchars($class['category'], ENT_QUOTES, 'UTF-8') ?></span>
                                    <span class="class-card__tag class-card__tag--day"><?= htmlspecialchars($class['days_label'], ENT_QUOTES, 'UTF-8') ?></span>
                                </div>
                            </div>
                            <dl>
                                <div><dt>시간</dt><dd><?= htmlspecialchars($class['time'], ENT_QUOTES, 'UTF-8') ?></dd></div>
                                <div><dt>장소</dt><dd><?= htmlspecialchars($class['place'], ENT_QUOTES, 'UTF-8') ?></dd></div>
                                <div><dt>청소년</dt><dd><?= htmlspecialchars($class['youth_fee'], ENT_QUOTES, 'UTF-8') ?></dd></div>
                                <div><dt>성인</dt><dd><?= htmlspecialchars($class['adult_fee'], ENT_QUOTES, 'UTF-8') ?></dd></div>
                            </dl>
                            <p class="class-card__note"><?= htmlspecialchars($class['note'], ENT_QUOTES, 'UTF-8') ?></p>
                        </article>
                    <?php endforeach; ?>
                </div>
                <p class="class-filter__empty" data-class-empty hidden>선택한 요일과 분야에 해당하는 강좌가 없습니다.</p>
            </section>

            <section class="info-section" aria-labelledby="class-notice-title">
                <header class="info-section-heading">
                    <p>NOTICE</p>
                    <h2 id="class-notice-title">수강 전 확인사항</h2>
                </header>
                <div class="service-note">
                    <strong>분기가 바뀔 때마다 최신 편성표와 잔여 정원을 확인해주세요.</strong>
                    <p>강좌 구성과 시간, 강의실은 분기별로 변경될 수 있으며 매월 다섯째 주는 정기 휴강 주간입니다.<br>개인 악기와 준비물, 재료비는 강좌별 안내를 확인해주세요. 강좌 문의는 02-2267-2111로 연락해주세요.</p>
                </div>
            </section>

            <section class="info-section" aria-label="접수 안내 이동">
                <div class="service-contact">
                    <div>
                        <strong>신청과 환불 기준을 먼저 확인해주세요.</strong>
                        <p>접수 시간, 납부 방법, 환불 시점별 기준을 접수안내에서 확인할 수 있습니다.</p>
                    </div>
                    <div class="service-contact__actions">
                        <a class="info-button" href="<?= BASE_URL ?>/lifelong-education-apply.php">온라인 신청하기</a>
                        <a class="info-button info-button--line" href="<?= BASE_URL ?>/lifelong-education-guide.php">접수안내 보기</a>
                    </div>
                </div>
            </section>
        </div>
    </div>
</main>

<?php include __DIR__ . '/includes/footer.php'; ?>
<script src="<?= BASE_URL ?>/js/global-nav.js"></script>
<script src="<?= BASE_URL ?>/js/header-search.js"></script>
<script src="<?= BASE_URL ?>/js/education-classes.js"></script>
</body>
</html>

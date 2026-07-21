<?php
include __DIR__ . '/includes/config.php';

$pageTitle = '시설 및 개요 | 시립서울청소년센터';
$pageCss = ['info-pages.css', 'facility-overview.css'];
?>

<!DOCTYPE html>
<html lang="ko">

<?php include __DIR__ . '/includes/head.php'; ?>

<body>
<?php include __DIR__ . '/includes/global-nav.php'; ?>

<main id="main" class="info-page facility-overview-page">
    <section class="info-hero" aria-labelledby="facility-overview-title">
        <div class="info-hero__inner inner">
            <nav class="info-breadcrumb" aria-label="현재 위치">
                <ol>
                    <li><a href="<?= BASE_URL ?>/index.php">홈</a></li>
                    <li>청소년센터 안내</li>
                    <li aria-current="page">시설 및 개요</li>
                </ol>
            </nav>
            <div class="info-hero__copy">
                <p class="info-eyebrow">FACILITY OVERVIEW</p>
                <h1 id="facility-overview-title">시설 및 개요</h1>
                <p>시립서울청소년센터의 기본 현황과 주요 이용 시설을 안내합니다.</p>
            </div>
        </div>
    </section>

    <div class="info-layout inner">
        <aside class="info-local-nav" aria-label="청소년센터 안내 메뉴">
            <h2>청소년센터 안내</h2>
            <nav>
                <a href="<?= BASE_URL ?>/center-introduction.php">소개</a>
                <a href="<?= BASE_URL ?>/facility-overview.php" aria-current="page">시설 및 개요</a>
                <a href="<?= BASE_URL ?>/directions.php">찾아오시는 길</a>
            </nav>
        </aside>

        <div class="info-content">
            <section class="info-section" aria-labelledby="facility-summary-title">
                <header class="info-section-heading">
                    <p>OVERVIEW</p>
                    <h2 id="facility-summary-title">센터 시설 개요</h2>
                    <span>청소년과 지역사회를 위한 시립 청소년수련시설입니다.</span>
                </header>

                <div class="facility-summary">
                    <dl class="facility-summary__list">
                        <div><dt>시설명</dt><dd>서울특별시립 서울청소년센터</dd></div>
                        <div><dt>개관일</dt><dd>1970년 11월 11일</dd></div>
                        <div><dt>소재지</dt><dd>서울특별시 중구 을지로11길 23</dd></div>
                        <div><dt>시설종류</dt><dd>청소년수련시설</dd></div>
                        <div><dt>운영방식</dt><dd>사단법인 한국청소년육성회 위탁운영</dd></div>
                        <div><dt>시설규모</dt><dd>지하 1층 ~ 지상 8층</dd></div>
                        <div class="facility-summary__hours">
                            <dt>운영시간</dt>
                            <dd>
                                <span>월~금요일 06:00 ~ 22:00</span>
                                <span>토요일 09:00 ~ 21:00</span>
                                <span>일요일·공휴일 09:00 ~ 18:00</span>
                            </dd>
                        </div>
                    </dl>
                    <figure class="facility-summary__image">
                        <img src="<?= BASE_URL ?>/assets/images/center-introduction-hero-v2.png"
                             alt="시립서울청소년센터 건물 전경"
                             width="1680"
                             height="945">
                    </figure>
                </div>
            </section>

            <section class="info-section" aria-labelledby="facility-guide-title">
                <header class="info-section-heading">
                    <p>FACILITY GUIDE</p>
                    <h2 id="facility-guide-title">주요 시설 안내</h2>
                    <span>이용 목적에 맞는 공간을 확인하고 자세한 안내 페이지로 이동할 수 있습니다.</span>
                </header>

                <div class="facility-guide-grid">
                    <a class="facility-guide-card" href="<?= BASE_URL ?>/culture-space.php">
                        <img src="<?= BASE_URL ?>/assets/images/rental-activity-room.jpg" alt="문화공간 활동실" width="750" height="500" loading="lazy">
                        <span><strong>문화공간</strong><small>청소년 활동과 문화 체험을 위한 공간</small></span>
                    </a>
                    <a class="facility-guide-card" href="<?= BASE_URL ?>/fitness-center.php">
                        <img src="<?= BASE_URL ?>/assets/images/fitness-cardio.png" alt="운동 기구가 마련된 종합체력실" width="1200" height="675" loading="lazy">
                        <span><strong>종합체력실</strong><small>유산소·근력 운동 시설 이용 안내</small></span>
                    </a>
                    <a class="facility-guide-card" href="<?= BASE_URL ?>/facility-rental.php">
                        <img src="<?= BASE_URL ?>/assets/images/rental-large-meeting.jpg" alt="센터 대회의실" width="750" height="500" loading="lazy">
                        <span><strong>시설대관</strong><small>회의·교육·행사를 위한 대관 공간</small></span>
                    </a>
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

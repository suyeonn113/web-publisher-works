<?php
include __DIR__ . '/includes/config.php';

$pageTitle = '오시는 길 | 시립서울청소년센터';
$pageCss = 'info-pages.css';
?>

<!DOCTYPE html>
<html lang="ko">

<?php include __DIR__ . '/includes/head.php'; ?>

<body>
<?php include __DIR__ . '/includes/global-nav.php'; ?>

<main id="main" class="info-page">
    <section class="info-hero" aria-labelledby="directions-title">
        <div class="info-hero__inner inner">
            <nav class="info-breadcrumb" aria-label="현재 위치">
                <ol>
                    <li><a href="<?= BASE_URL ?>/index.php">홈</a></li>
                    <li>청소년센터 안내</li>
                    <li aria-current="page">오시는 길</li>
                </ol>
            </nav>
            <div class="info-hero__copy">
                <p class="info-eyebrow">LOCATION</p>
                <h1 id="directions-title">오시는 길</h1>
                <p>대중교통 이용 방법부터 주차 안내까지 방문에 필요한 정보를 한곳에 정리했습니다.</p>
            </div>
        </div>
    </section>

    <div class="info-layout inner">
        <aside class="info-local-nav" aria-label="청소년센터 안내 메뉴">
            <h2>청소년센터 안내</h2>
            <nav>
                <a href="<?= BASE_URL ?>/center-introduction.php">소개</a>
                <a href="<?= BASE_URL ?>/facility-overview.php">시설 및 개요</a>
                <a href="<?= BASE_URL ?>/directions.php" aria-current="page">오시는 길</a>
            </nav>
        </aside>

        <div class="info-content">
            <section class="info-section" aria-labelledby="map-title">
                <header class="info-section-heading">
                    <p>MAP</p>
                    <h2 id="map-title">지도에서 위치 확인하기</h2>
                    <span>을지로3가역과 청계천 사이, 을지로11길에 위치하고 있습니다.</span>
                </header>

                <div class="map-card info-card">
                    <iframe
                        title="시립서울청소년센터 위치 지도"
                        src="https://www.google.com/maps?q=%EC%84%9C%EC%9A%B8%ED%8A%B9%EB%B3%84%EC%8B%9C+%EC%A4%91%EA%B5%AC+%EC%9D%84%EC%A7%80%EB%A1%9C11%EA%B8%B8+23&amp;output=embed"
                        loading="lazy"
                        referrerpolicy="no-referrer-when-downgrade"></iframe>
                    <div class="map-card__info">
                        <div class="map-card__address">
                            <strong>시립서울청소년센터</strong>
                            <span>[04543] 서울특별시 중구 을지로11길 23</span>
                        </div>
                        <div class="map-card__actions">
                            <a class="info-button" href="https://map.naver.com/p/search/%EC%8B%9C%EB%A6%BD%EC%84%9C%EC%9A%B8%EC%B2%AD%EC%86%8C%EB%85%84%EC%84%BC%ED%84%B0" target="_blank" rel="noopener">네이버 지도에서 보기</a>
                            <a class="info-button info-button--secondary" href="https://map.kakao.com/?q=%EC%8B%9C%EB%A6%BD%EC%84%9C%EC%9A%B8%EC%B2%AD%EC%86%8C%EB%85%84%EC%84%BC%ED%84%B0" target="_blank" rel="noopener">카카오맵에서 보기</a>
                        </div>
                    </div>
                </div>
            </section>

            <section class="info-section" aria-labelledby="transport-title">
                <header class="info-section-heading">
                    <p>TRANSPORTATION</p>
                    <h2 id="transport-title">교통편 안내</h2>
                </header>
                <div class="transport-grid">
                    <article class="transport-card info-card">
                        <h3 class="transport-card__title">
                            <span class="transport-card__icon" aria-hidden="true">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                                    <rect width="16" height="16" x="4" y="3" rx="2"/>
                                    <path d="M4 11h16M12 3v8M8 15h.01M16 15h.01M8 19l-2 3M16 19l2 3"/>
                                </svg>
                            </span>
                            지하철
                        </h3>
                        <ul>
                            <li><b>을지로3가역 2번 출구</b>에서 약 50m 직진 후 첫 번째 골목에서 좌회전</li>
                            <li><b>을지로3가역 3번 출구</b>에서 약 50m 직진 후 두 번째 골목에서 우회전</li>
                            <li><b>을지로3가역 4번 출구</b> 바로 옆 왼쪽 골목으로 들어와 약 50m 직진</li>
                        </ul>
                    </article>
                    <article class="transport-card info-card">
                        <h3 class="transport-card__title">
                            <span class="transport-card__icon" aria-hidden="true">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                                    <rect width="16" height="16" x="4" y="3" rx="2"/>
                                    <path d="M4 11h16M8 15h.01M16 15h.01M6 19v2M18 19v2M4 6 2 7M20 6l2 1M10 6h4"/>
                                </svg>
                            </span>
                            버스
                        </h3>
                        <ul>
                            <li><b>청계2가·삼일교 정류장</b> 173번</li>
                            <li><b>을지로3가 정류장</b> 100, 105, 152, 202, 261, N30번</li>
                        </ul>
                    </article>
                    <article class="transport-card info-card">
                        <h3 class="transport-card__title">
                            <span class="transport-card__icon" aria-hidden="true">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                                    <path d="m21 8-2 2-1.5-3.7A2 2 0 0 0 15.65 5h-7.3A2 2 0 0 0 6.5 6.3L5 10 3 8M7 14h.01M17 14h.01"/>
                                    <rect width="18" height="8" x="3" y="10" rx="2"/>
                                    <path d="M5 18v2M19 18v2"/>
                                </svg>
                            </span>
                            자가운전
                        </h3>
                        <ul>
                            <li>청계2가에서 청계4가 방면으로 이동해 수표교 횡단보도를 지난 뒤 오른쪽 첫 번째 골목으로 우회전</li>
                            <li>센터 주변은 일방통행 구간이 있으므로 지도 경로를 함께 확인해 주세요.</li>
                        </ul>
                    </article>
                    <article class="transport-card info-card">
                        <h3 class="transport-card__title">
                            <span class="transport-card__icon" aria-hidden="true">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                                    <circle cx="12" cy="12" r="10"/>
                                    <path d="M9 17V7h4a3 3 0 0 1 0 6H9"/>
                                </svg>
                            </span>
                            주차
                        </h3>
                        <ul>
                            <li><b>운영시간</b> 평일 09:00~19:00</li>
                            <li><b>이용요금</b> 10분당 500원 · 정기 월 200,000원</li>
                            <li>주차면수는 23대로 협소하므로 가급적 대중교통을 이용해 주세요.</li>
                        </ul>
                    </article>
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

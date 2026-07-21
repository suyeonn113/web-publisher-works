<?php
include __DIR__ . '/includes/config.php';

$pageTitle = '종합체력실 | 시립서울청소년센터';
$pageCss = ['info-pages.css', 'service-pages.css'];
$serviceSection = 'facility';
$serviceCurrent = 'fitness';
$fitnessBlogUrl = 'https://blog.naver.com/seoulyouthc/224232702394';
?>

<!DOCTYPE html>
<html lang="ko">

<?php include __DIR__ . '/includes/head.php'; ?>

<body>
<?php include __DIR__ . '/includes/global-nav.php'; ?>

<main id="main" class="info-page fitness-center-page">
    <section class="info-hero" aria-labelledby="fitness-title">
        <div class="info-hero__inner inner">
            <nav class="info-breadcrumb" aria-label="현재 위치">
                <ol>
                    <li><a href="<?= BASE_URL ?>/index.php">홈</a></li>
                    <li>이용 안내</li>
                    <li aria-current="page">종합체력실</li>
                </ol>
            </nav>
            <div class="info-hero__copy">
                <p class="info-eyebrow">FITNESS CENTER</p>
                <h1 id="fitness-title">종합체력실</h1>
                <p>유산소·웨이트 운동과 GX 프로그램을 이용하고, 처음 방문한다면 일회권으로 시설을 경험할 수 있습니다.</p>
            </div>
        </div>
    </section>

    <div class="info-layout inner">
        <?php include __DIR__ . '/includes/components/service-local-nav.php'; ?>

        <div class="info-content">
            <section class="info-section" aria-labelledby="fitness-guide-title">
                <header class="info-section-heading">
                    <p>USE GUIDE</p>
                    <h2 id="fitness-guide-title">이용 안내</h2>
                </header>
                <div class="facility-stat-grid">
                    <div class="facility-stat"><span>운영일</span><strong>월요일~금요일</strong><small>공휴일 및 센터 휴관일 제외</small></div>
                    <div class="facility-stat"><span>운영시간</span><strong>06:00~22:00</strong><small>입장은 마감 1시간 전까지</small></div>
                    <div class="facility-stat"><span>청소년 요금</span><strong>월 35,000원</strong><small>증빙자료 확인 후 적용</small></div>
                    <div class="facility-stat"><span>성인 요금</span><strong>월 70,000원</strong><small>장기 등록 할인 별도</small></div>
                </div>
            </section>

            <section class="info-section" aria-labelledby="fitness-fee-title">
                <header class="info-section-heading">
                    <p>MEMBERSHIP</p>
                    <h2 id="fitness-fee-title">이용요금</h2>
                </header>
                <div class="service-table-wrap">
                    <table class="service-table">
                        <caption class="visually-hidden">종합체력실 이용요금</caption>
                        <thead><tr><th scope="col">구분</th><th scope="col">청소년</th><th scope="col">성인</th></tr></thead>
                        <tbody>
                            <tr><th scope="row" data-label="구분">일회권</th><td colspan="2" data-label="이용요금">1회 5,000원</td></tr>
                            <tr><th scope="row" data-label="구분">1개월</th><td data-label="청소년">35,000원</td><td data-label="성인">70,000원</td></tr>
                            <tr><th scope="row" data-label="구분">장기 등록</th><td colspan="2" data-label="할인 내용">3개월 10% · 6개월 15% · 12개월 20% 할인</td></tr>
                            <tr><th scope="row" data-label="구분">비고</th><td colspan="2" data-label="할인 대상">65세 이상 20% · 국가유공자 50% · 장애인 20% 할인</td></tr>
                        </tbody>
                    </table>
                </div>
            </section>

            <section class="info-section" aria-labelledby="fitness-day-pass-title">
                <header class="info-section-heading">
                    <p>DAY PASS</p>
                    <h2 id="fitness-day-pass-title">처음이라면 일회권으로 이용해보세요</h2>
                    <span>정기 등록 전에 내부 시설과 운동 환경을 직접 경험할 수 있습니다.</span>
                </header>

                <article class="fitness-day-pass">
                    <div class="fitness-day-pass__head">
                        <div>
                            <span class="fitness-day-pass__label">종합체력실 일회권</span>
                            <strong>5,000원</strong>
                            <p>을지로·청계천 주변에서 가볍게 운동하거나 시설을 먼저 체험하고 싶은 이용자에게 적합합니다.</p>
                        </div>
                        <a class="info-button info-button--secondary" href="<?= htmlspecialchars($fitnessBlogUrl, ENT_QUOTES, 'UTF-8') ?>" target="_blank" rel="noopener">공식 블로그 이용 안내 ↗</a>
                    </div>

                    <dl class="fitness-day-pass__details">
                        <div><dt>이용 기준</dt><dd>구매 당일 1회 사용</dd></div>
                        <div><dt>이용 횟수</dt><dd>월 3회까지</dd></div>
                        <div><dt>제공 물품</dt><dd>운동복·수건</dd></div>
                        <div><dt>편의시설</dt><dd>탈의실·샤워실 이용 가능</dd></div>
                    </dl>

                    <div class="fitness-day-pass__notice">
                        <strong>개인 실내 운동화를 꼭 지참해주세요.</strong>
                        <p>점심시간이나 퇴근 후 운동, 청계천 러닝 후 샤워, 소모임·동아리의 가벼운 체력 활동에도 활용할 수 있습니다.</p>
                    </div>
                </article>
            </section>

            <section class="info-section" aria-labelledby="fitness-facility-title">
                <header class="info-section-heading">
                    <p>FACILITIES</p>
                    <h2 id="fitness-facility-title">시설 구성</h2>
                </header>
                <div class="facility-gallery">
                    <article class="facility-card"><div class="facility-card__visual facility-card__visual--photo"><img src="<?= BASE_URL ?>/assets/images/fitness-cardio.png" alt="러닝머신이 정렬된 유산소 운동 공간" width="332" height="249" loading="lazy"><span>유산소 존</span></div><div class="facility-card__body"><h3>러닝·사이클</h3><p>트레드밀과 사이클 장비를 이용할 수 있습니다.</p></div></article>
                    <article class="facility-card"><div class="facility-card__visual facility-card__visual--photo"><img src="<?= BASE_URL ?>/assets/images/fitness-weights.png" alt="웨이트 머신과 바벨이 마련된 근력 운동 공간" width="332" height="249" loading="lazy"><span>웨이트 존</span></div><div class="facility-card__body"><h3>근력 운동</h3><p>기본 머신과 프리웨이트 공간을 운영합니다.</p></div></article>
                    <article class="facility-card"><div class="facility-card__visual facility-card__visual--photo"><img src="<?= BASE_URL ?>/assets/images/fitness-showers.jpg" alt="개별 칸막이가 설치된 샤워실" width="664" height="498" loading="lazy"><span>편의시설</span></div><div class="facility-card__body"><h3>샤워실·탈의실</h3><p>운동 전후 편리하게 이용할 수 있습니다.</p></div></article>
                    <article class="facility-card"><div class="facility-card__visual facility-card__visual--photo"><img src="<?= BASE_URL ?>/assets/images/fitness-stretching.png" alt="스트레칭과 생활체육 수업을 위한 운동 공간" width="332" height="249" loading="lazy"><span>GX 공간</span></div><div class="facility-card__body"><h3>스트레칭 룸</h3><p>준비운동과 소규모 생활체육 수업을 진행합니다.</p></div></article>
                </div>
            </section>

            <section class="info-section" aria-labelledby="fitness-benefit-title">
                <header class="info-section-heading">
                    <p>MEMBER BENEFIT</p>
                    <h2 id="fitness-benefit-title">회원 이용 혜택</h2>
                </header>
                <ul class="service-list">
                    <li>신규 회원 체성분 측정 및 1:1 맞춤형 개인 상담</li>
                    <li>개인 사물함과 운동복, 수건 제공</li>
                    <li>회원 대상 전문 트레이너 GX 프로그램 무료 참여</li>
                    <li>센터 운영시간 내 하루 이용 횟수 제한 없이 이용</li>
                </ul>
            </section>

            <section class="info-section" aria-labelledby="fitness-policy-title">
                <header class="info-section-heading">
                    <p>POLICY</p>
                    <h2 id="fitness-policy-title">환불·연기 및 이용수칙</h2>
                </header>
                <div class="fitness-policy-layout">
                    <article class="fitness-equipment-guide">
                        <div class="fitness-equipment-guide__title">
                            <span class="fitness-equipment-guide__icon" aria-hidden="true">
                                <svg viewBox="0 0 24 24" fill="none"><path d="M3 9v6m3-8v10m12-10v10m3-8v6M6 12h12" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>
                            </span>
                            <div><span>꼭 확인해주세요</span><h3>운동기구 이용 안내</h3></div>
                        </div>
                        <ul><li>운동복과 실내용 운동화를 착용해주세요.</li><li>기구 사용 후 다음 이용자를 위해 정리해주세요.</li><li>개인 물품 분실에 주의해주세요.</li></ul>
                    </article>
                    <div class="fitness-policy-columns">
                        <article><h3>환불 안내</h3><ul><li>센터 접수실을 방문해 환불 신청서를 작성합니다.</li><li>환불은 회원 명의 계좌로 입금됩니다.</li><li>개시일 이후에는 이용일수와 수수료를 공제합니다.</li></ul></article>
                        <article><h3>이용 연기</h3><ul><li>센터 접수실에서 직접 신청합니다.</li><li>출장 등 개인 사유만으로는 연기가 어렵습니다.</li><li>2주 초과 병원 진단 등 증빙이 필요합니다.</li></ul></article>
                        <article><h3>안전 안내</h3><ul><li>불편하거나 다친 경우 즉시 직원에게 알려주세요.</li><li>무리한 운동은 피하고 충분히 준비운동을 해주세요.</li><li>센터 안전수칙과 직원 안내를 따라주세요.</li></ul></article>
                    </div>
                </div>
            </section>

            <section class="info-section" aria-label="종합체력실 문의">
                <div class="service-contact"><div><strong>종합체력실 이용 문의</strong><p>등록 가능 여부와 운영 일정은 방문 전 전화로 확인해주세요.</p></div><a class="info-button" href="tel:0222672113">02-2267-2113</a></div>
            </section>
        </div>
    </div>
</main>

<?php include __DIR__ . '/includes/footer.php'; ?>
<script src="<?= BASE_URL ?>/js/global-nav.js"></script>
<script src="<?= BASE_URL ?>/js/header-search.js"></script>
</body>
</html>

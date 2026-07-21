<?php
include __DIR__ . '/includes/config.php';

$pageTitle = '시설대관 | 시립서울청소년센터';
$pageCss = ['info-pages.css', 'service-pages.css'];
$serviceSection = 'facility';
$serviceCurrent = 'rental';
?>

<!DOCTYPE html>
<html lang="ko">

<?php include __DIR__ . '/includes/head.php'; ?>

<body>
<?php include __DIR__ . '/includes/global-nav.php'; ?>

<main id="main" class="info-page facility-rental-page">
    <section class="info-hero" aria-labelledby="rental-title">
        <div class="info-hero__inner inner">
            <nav class="info-breadcrumb" aria-label="현재 위치">
                <ol>
                    <li><a href="<?= BASE_URL ?>/index.php">홈</a></li>
                    <li>이용 안내</li>
                    <li aria-current="page">시설대관</li>
                </ol>
            </nav>
            <div class="info-hero__copy">
                <p class="info-eyebrow">FACILITY RENTAL</p>
                <h1 id="rental-title">시설대관</h1>
                <p>회의, 교육, 소규모 행사에 필요한 공간과 이용요금, 신청 절차를 안내합니다.</p>
            </div>
        </div>
    </section>

    <div class="info-layout inner">
        <?php include __DIR__ . '/includes/components/service-local-nav.php'; ?>

        <div class="info-content">
            <section class="info-section" aria-labelledby="rental-process-title">
                <header class="info-section-heading"><p>APPLICATION</p><h2 id="rental-process-title">대관 신청 절차</h2></header>
                <ol class="service-process">
                    <li><div><strong>전화 상담</strong><p>희망일과 인원, 이용 목적을 먼저 문의합니다.</p></div><svg class="service-process__arrow" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="m9 6 6 6-6 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></li>
                    <li><div><strong>신청서 제출</strong><p>사업계획과 행사 정보를 포함해 신청서를 제출합니다.</p></div><svg class="service-process__arrow" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="m9 6 6 6-6 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></li>
                    <li><div><strong>사용 승인</strong><p>센터 심사 후 이용 가능 여부를 안내합니다.</p></div><svg class="service-process__arrow" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="m9 6 6 6-6 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></li>
                    <li><div><strong>결제·확정</strong><p>대관료 납부 후 예약이 최종 확정됩니다.</p></div></li>
                </ol>
            </section>

            <section class="info-section" aria-labelledby="rental-summary-title">
                <header class="info-section-heading"><p>INFORMATION</p><h2 id="rental-summary-title">대관 안내</h2></header>
                <dl class="service-summary service-summary--plain">
                    <div><dt><svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M7 3v3m10-3v3M4 9h16M5 5h14a1 1 0 0 1 1 1v14H4V6a1 1 0 0 1 1-1Z" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg>신청 기간</dt><dd>대관 예정일 2개월 전부터 기간 안에 신청</dd></div>
                    <div><dt><svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M7 4 5 6c0 6.6 5.4 12 12 12l2-2-4-3-2 2c-2.1-.9-3.1-1.9-4-4l2-2-4-5Z" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg>대관 문의</dt><dd><a href="tel:0222672113">02-2267-2113</a></dd></div>
                    <div><dt><svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M3 6h18v12H3V6Zm1 1 8 6 8-6" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg>서류 접수</dt><dd><a href="mailto:seoulyouthc@naver.com">seoulyouthc@naver.com</a></dd></div>
                </dl>
            </section>

            <section class="info-section" aria-labelledby="rental-fee-title">
                <header class="info-section-heading"><p>RENTAL FEE</p><h2 id="rental-fee-title">사용요금</h2><span>부가세 10%와 냉난방비는 별도입니다.</span></header>
                <div class="service-table-wrap">
                    <table class="service-table">
                        <caption class="visually-hidden">시설대관 공간별 기본 이용요금</caption>
                        <thead><tr><th scope="col">공간</th><th scope="col">기본시간</th><th scope="col">평일</th><th scope="col">주말·공휴일</th></tr></thead>
                        <tbody>
                            <tr><th scope="row" data-label="공간">대회의실</th><td data-label="기본시간">3시간</td><td data-label="평일">250,000원</td><td data-label="주말·공휴일">320,000원</td></tr>
                            <tr><th scope="row" data-label="공간">중회의실</th><td data-label="기본시간">3시간</td><td data-label="평일">180,000원</td><td data-label="주말·공휴일">230,000원</td></tr>
                            <tr><th scope="row" data-label="공간">소회의실</th><td data-label="기본시간">3시간</td><td data-label="평일">90,000원</td><td data-label="주말·공휴일">117,000원</td></tr>
                            <tr><th scope="row" data-label="공간">예체능실</th><td data-label="기본시간">3시간</td><td data-label="평일">105,000원</td><td data-label="주말·공휴일">135,000원</td></tr>
                        </tbody>
                    </table>
                </div>
                <p class="rental-fee-note"><svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 8v5m0 3.5v.1M12 3 2.5 20h19L12 3Z" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg><span><strong>장비 이용 안내</strong> 빔프로젝터 등 부대 장비는 별도 협의가 필요합니다.</span></p>
            </section>

            <section class="info-section" aria-labelledby="rental-space-title">
                <header class="info-section-heading"><p>SPACES</p><h2 id="rental-space-title">대관 공간</h2></header>
                <div class="facility-gallery">
                    <article class="facility-card"><div class="facility-card__visual facility-card__visual--photo"><img src="<?= BASE_URL ?>/assets/images/rental-large-meeting.jpg" alt="책상과 발표 설비가 마련된 대회의실" width="750" height="500" loading="lazy"><span>대회의실</span></div><div class="facility-card__body"><h3>100명 내외</h3><p>교육, 세미나, 설명회에 적합한 대형 공간입니다.</p></div></article>
                    <article class="facility-card"><div class="facility-card__visual facility-card__visual--photo"><img src="<?= BASE_URL ?>/assets/images/rental-medium-meeting.jpg" alt="이동식 책상과 의자가 배치된 중회의실" width="960" height="720" loading="lazy"><span>중회의실</span></div><div class="facility-card__body"><h3>50명 내외</h3><p>중규모 회의와 워크숍에 적합합니다.</p></div></article>
                    <article class="facility-card"><div class="facility-card__visual facility-card__visual--photo"><img src="<?= BASE_URL ?>/assets/images/rental-small-meeting.jpg" alt="회의용 책상이 배치된 소회의실" width="429" height="286" loading="lazy"><span>소회의실</span></div><div class="facility-card__body"><h3>20명 내외</h3><p>소모임과 팀 회의를 위한 집중형 공간입니다.</p></div></article>
                    <article class="facility-card"><div class="facility-card__visual facility-card__visual--photo"><img src="<?= BASE_URL ?>/assets/images/rental-activity-room.jpg" alt="전면 거울과 목재 바닥이 설치된 예체능실" width="515" height="342" loading="lazy"><span>예체능실</span></div><div class="facility-card__body"><h3>50명 내외</h3><p>움직임이 필요한 교육과 연습에 활용할 수 있습니다.</p></div></article>
                </div>
            </section>

            <section class="info-section" aria-labelledby="rental-rule-title">
                <header class="info-section-heading"><p>RULES</p><h2 id="rental-rule-title">시설대관 사용 규칙</h2></header>
                <div class="rental-rule-grid">
                    <article class="rental-rule-group"><header><span aria-hidden="true"><svg viewBox="0 0 24 24" fill="none"><path d="M7 3v3m10-3v3M4 9h16M5 5h14a1 1 0 0 1 1 1v14H4V6a1 1 0 0 1 1-1Z" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg></span><h3>신청 및 이용시간</h3></header><ul><li>대관 희망일로부터 2개월 이내 기간에 신청할 수 있습니다.</li><li>신청서와 사업계획을 제출하고 사용 승인을 받아야 합니다.</li><li>기본 사용시간은 3시간이며 초과 시 추가요금이 발생합니다.</li></ul></article>
                    <article class="rental-rule-group"><header><span aria-hidden="true"><svg viewBox="0 0 24 24" fill="none"><path d="M12 3v18m4-14H9.5a2.5 2.5 0 0 0 0 5h5a2.5 2.5 0 0 1 0 5H8" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg></span><h3>요금 환불</h3></header><ul><li>사용일 7일 전 취소 시 전액 환불됩니다.</li><li>사용일 5일 전 취소 시 30%를 공제합니다.</li><li>사용일 3일 전 취소 시 50%를 공제합니다.</li><li>사용일 1일 전과 당일에는 환불이 어렵습니다.</li></ul></article>
                    <article class="rental-rule-group"><header><span aria-hidden="true"><svg viewBox="0 0 24 24" fill="none"><path d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm-3-6 6-6m-6 0 6 6" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg></span><h3>승인 취소</h3></header><ul><li>센터 설립 목적과 맞지 않거나 운영에 지장이 있는 경우</li><li>허가 조건을 위반하거나 신청 내용과 다르게 사용하는 경우</li><li>안전과 질서를 해칠 우려가 있는 경우</li></ul></article>
                    <article class="rental-rule-group"><header><span aria-hidden="true"><svg viewBox="0 0 24 24" fill="none"><path d="M9 3h6l1 2h3v16H5V5h3l1-2Zm0 8 2 2 4-4m-6 8h6" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg></span><h3>준수사항</h3></header><ul><li>시설과 비품은 사용 후 원상복구해주세요.</li><li>화재 위험 물품과 위험물 반입은 금지됩니다.</li><li>시설 내 음주, 흡연, 취사 행위는 제한됩니다.</li><li>이용 중 발생한 사고와 물품 관리에 주의해주세요.</li></ul></article>
                </div>
            </section>

            <section class="info-section" aria-label="시설대관 문의">
                <div class="service-contact">
                    <div><strong>대관 가능 여부를 먼저 확인해주세요.</strong><p>희망 날짜, 행사 성격, 예상 인원을 준비하면 빠르게 상담받을 수 있습니다.</p></div>
                    <div class="service-actions"><a class="info-button" href="tel:0222672113">전화 문의</a><a class="info-button" href="mailto:seoulyouthc@naver.com">이메일 문의</a></div>
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

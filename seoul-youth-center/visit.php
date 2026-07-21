<?php
include __DIR__ . '/includes/config.php';

$pageTitle = '기관방문 | 시립서울청소년센터';
$pageCss = ['info-pages.css', 'service-pages.css'];
$serviceSection = 'facility';
$serviceCurrent = 'visit';
?>

<!DOCTYPE html>
<html lang="ko">

<?php include __DIR__ . '/includes/head.php'; ?>

<body>
<?php include __DIR__ . '/includes/global-nav.php'; ?>

<main id="main" class="info-page visit-page">
    <section class="info-hero" aria-labelledby="visit-title">
        <div class="info-hero__inner inner">
            <nav class="info-breadcrumb" aria-label="현재 위치">
                <ol>
                    <li><a href="<?= BASE_URL ?>/index.php">홈</a></li>
                    <li>이용 안내</li>
                    <li aria-current="page">기관방문</li>
                </ol>
            </nav>
            <div class="info-hero__copy">
                <p class="info-eyebrow">FACILITY VISIT</p>
                <h1 id="visit-title">기관방문 안내</h1>
                <p>청소년시설 운영과 프로그램 현장을 살펴볼 수 있도록 기관 라운딩과 안내를 제공합니다.</p>
            </div>
        </div>
    </section>

    <div class="info-layout inner">
        <?php include __DIR__ . '/includes/components/service-local-nav.php'; ?>

        <div class="info-content">
            <section class="info-section" aria-labelledby="visit-guide-title">
                <header class="info-section-heading">
                    <p>VISIT GUIDE</p>
                    <h2 id="visit-guide-title">방문 안내</h2>
                </header>
                <dl class="visit-summary info-card">
                    <div>
                        <dt><svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="8" stroke="currentColor" stroke-width="1.7"/><circle cx="12" cy="12" r="4" stroke="currentColor" stroke-width="1.7"/><path d="m15 9 5-5m0 0v4m0-4h-4" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg>목적</dt>
                        <dd>청소년 및 청소년교육학과·사회복지학과 전공생에게 청소년지도사의 업무와 청소년 프로그램 정보를 안내하고, 예비 청소년지도사로서의 성장을 지원합니다.</dd>
                    </div>
                    <div>
                        <dt><svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="9" cy="8" r="3" stroke="currentColor" stroke-width="1.7"/><path d="M3 20c.4-4 2.4-6 6-6s5.6 2 6 6m1-13a3 3 0 0 1 0 6m1 2c2.4.6 3.7 2.2 4 5" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg>대상</dt>
                        <dd>청소년, 청소년 및 사회복지 관련 학과 대학생 · 참가인원 최소 5명</dd>
                    </div>
                    <div>
                        <dt><svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 3h10l4 4v14H5V3Zm10 0v5h4M8 12h8m-8 4h8" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg>내용</dt>
                        <dd>시설 운영 및 프로그램 안내, 기관 라운딩 등 약 2시간 소요</dd>
                    </div>
                    <div>
                        <dt><svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M7 4 5 6c0 6.6 5.4 12 12 12l2-2-4-3-2 2c-2.1-.9-3.1-1.9-4-4l2-2-4-5Z" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg>문의</dt>
                        <dd>업무지원팀 02-2267-2914 · seoulyouthc@naver.com</dd>
                    </div>
                </dl>
            </section>

            <section class="info-section" aria-labelledby="visit-process-title">
                <header class="info-section-heading">
                    <p>PROCESS</p>
                    <h2 id="visit-process-title">신청 방법</h2>
                </header>
                <ol class="visit-steps">
                    <li>
                        <div><strong>담당자와 일정 문의</strong><p>방문 희망일과 인원을 업무지원팀에 먼저 문의합니다.</p></div>
                    </li>
                    <li>
                        <div><strong>신청서 작성 및 제출</strong><p>아래 신청서를 내려받아 작성한 뒤 이메일로 제출합니다.</p></div>
                    </li>
                    <li>
                        <div><strong>방문 확정 안내</strong><p>담당자가 문자 또는 전화로 확정 일정을 안내합니다.</p></div>
                    </li>
                </ol>
            </section>

            <section class="info-section" aria-labelledby="visit-download-title">
                <div class="download-card info-card">
                    <div class="download-card__copy">
                        <p class="info-eyebrow">DOWNLOAD</p>
                        <strong id="visit-download-title">기관방문 신청서</strong>
                        <p>한글 문서(HWP) 형식입니다. 파일 작성 후 seoulyouthc@naver.com으로 보내주세요.</p>
                    </div>
                    <a class="info-button" href="<?= BASE_URL ?>/assets/downloads/seoul-youth-center-visit-application.hwp" download="시립서울청소년센터_기관방문_신청서.hwp">신청서 내려받기</a>
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

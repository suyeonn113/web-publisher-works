<?php
include __DIR__ . '/includes/config.php';

$pageTitle = '문화공간 이용·예약 | 시립서울청소년센터';
$pageCss = ['info-pages.css', 'service-pages.css'];
$serviceSection = 'facility';
$serviceCurrent = 'culture';
$naverBookingUrl = 'https://m.booking.naver.com/booking/12/bizes/521254?theme=place&service-target=map-pc&entry=pll&lang=ko';
?>

<!DOCTYPE html>
<html lang="ko">

<?php include __DIR__ . '/includes/head.php'; ?>

<body>
<?php include __DIR__ . '/includes/global-nav.php'; ?>

<main id="main" class="info-page culture-space-page">
    <section class="info-hero" aria-labelledby="culture-space-title">
        <div class="info-hero__inner inner">
            <nav class="info-breadcrumb" aria-label="현재 위치">
                <ol>
                    <li><a href="<?= BASE_URL ?>/index.php">홈</a></li>
                    <li>이용 안내</li>
                    <li aria-current="page">문화공간 이용·예약</li>
                </ol>
            </nav>
            <div class="info-hero__copy">
                <p class="info-eyebrow">SPACE RESERVATION</p>
                <h1 id="culture-space-title">문화공간 이용·예약</h1>
                <p>청소년 프로그램 참여자와 평생교육 이용자를 위한 공간 예약 정보를 확인할 수 있습니다.</p>
            </div>
        </div>
    </section>

    <div class="info-layout inner">
        <?php include __DIR__ . '/includes/components/service-local-nav.php'; ?>

        <div class="info-content">
            <section class="info-section" aria-labelledby="space-booking-title">
                <header class="info-section-heading">
                    <p>ONLINE BOOKING</p>
                    <h2 id="space-booking-title">네이버 실시간 예약</h2>
                    <span>운영 시기에 따라 청소년 프로그램과 이용자 전용 공간이 예약 목록에 표시됩니다.</span>
                </header>

                <article class="space-booking">
                    <div class="space-booking__head">
                        <div>
                            <span class="space-booking__status">현재 예약 가능</span>
                            <h3>늘봄(드럼)실</h3>
                            <p>평생교육 드럼교실 수강자가 개인 연습을 위해 예약할 수 있는 공간입니다.</p>
                        </div>
                        <a class="info-button space-booking__button" href="<?= htmlspecialchars($naverBookingUrl, ENT_QUOTES, 'UTF-8') ?>" target="_blank" rel="noopener">네이버에서 예약하기 ↗</a>
                    </div>

                    <dl class="space-booking__details">
                        <div><dt>이용 대상</dt><dd>센터 평생교육 드럼교실 수강자</dd></div>
                        <div><dt>기본 이용</dt><dd>1시간</dd></div>
                        <div><dt>이용요금</dt><dd>시간당 5,000원</dd></div>
                        <div><dt>결제 방법</dt><dd>네이버 예약 후 1층 접수실에서 결제</dd></div>
                    </dl>
                </article>
            </section>

            <section class="info-section" aria-labelledby="space-booking-guide-title">
                <header class="info-section-heading">
                    <p>GUIDE</p>
                    <h2 id="space-booking-guide-title">예약 전 확인해주세요</h2>
                </header>
                <div class="space-booking-guide">
                    <ul>
                        <li>네이버 예약 목록은 프로그램 운영 시기와 접수 상태에 따라 변경됩니다.</li>
                        <li>예약 항목이 보이지 않으면 접수 기간이 아니거나 예약이 마감된 상태일 수 있습니다.</li>
                        <li>청소년 프로그램과 다른 교육 프로그램이 진행될 경우 기존 예약이 취소될 수 있습니다.</li>
                        <li>타 단체 또는 이용 대상이 아닌 회원의 예약은 제한될 수 있습니다.</li>
                    </ul>
                </div>
            </section>

            <section class="info-section" aria-label="기업 및 단체 시설대관 안내">
                <div class="service-contact">
                    <div>
                        <strong>기업·단체 행사 공간을 찾고 있나요?</strong>
                        <p>회의실, 세미나, 단체 교육과 행사 목적의 공간은 시설대관 안내에서 확인해주세요.</p>
                    </div>
                    <a class="info-button info-button--secondary" href="<?= BASE_URL ?>/facility-rental.php">시설대관 안내 보기</a>
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

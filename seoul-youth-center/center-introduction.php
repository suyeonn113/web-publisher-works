<?php
include __DIR__ . '/includes/config.php';

$pageTitle = '기관소개 | 시립서울청소년센터';
$pageCss = 'center-introduction.css';
?>

<!DOCTYPE html>
<html lang="ko">

<?php include __DIR__ . '/includes/head.php'; ?>

<body>
<?php include __DIR__ . '/includes/global-nav.php'; ?>

<main id="main" class="center-introduction-page">
    <section class="center-intro-hero" aria-labelledby="center-intro-title">
        <div class="center-intro-hero__inner inner">
            <nav class="center-breadcrumb" aria-label="현재 위치">
                <ol>
                    <li><a href="<?= BASE_URL ?>/index.php">홈</a></li>
                    <li>청소년센터 안내</li>
                    <li aria-current="page">소개</li>
                </ol>
            </nav>

            <div class="center-intro-hero__content">
                <div class="center-intro-hero__copy">
                    <p class="center-intro-eyebrow">SEOUL YOUTH CENTER</p>
                    <h1 id="center-intro-title">
                        청소년의 행복한 꿈을 키우는
                        <strong>시립서울청소년센터</strong>
                    </h1>
                    <p>
                        서울 한가운데에서 청소년의 성장과 참여를 지원해 온 대한민국 최초의 청소년시설입니다.
                        오늘도 청소년과 지역사회가 함께 경험하고 연결되는 공간을 만들어갑니다.
                    </p>
                </div>

                <div class="center-intro-hero__symbol" aria-label="1970년 11월 11일 개관">
                    <span>SINCE</span>
                    <strong>1970</strong>
                    <p>대한민국 1호<br>청소년시설</p>
                </div>
            </div>

        </div>
    </section>

    <div class="center-section-nav-wrap">
        <nav class="center-section-nav inner" aria-label="기관소개 페이지 내 이동">
                <a href="#center-overview">센터소개</a>
                <a href="#center-direction">운영방향</a>
                <a href="#center-history">주요연혁</a>
                <a href="#center-operation">운영체계</a>
        </nav>
    </div>

    <div class="center-intro-layout inner">
        <aside class="center-local-nav" aria-label="청소년센터 안내 메뉴">
            <h2>청소년센터 안내</h2>
            <nav>
                <a href="<?= BASE_URL ?>/center-introduction.php" aria-current="page">소개</a>
                <a href="<?= BASE_URL ?>/facility-overview.php">시설 및 개요</a>
                <a href="<?= BASE_URL ?>/directions.php">찾아오시는 길</a>
            </nav>
        </aside>

        <div class="center-intro-content">
    <section id="center-overview" class="center-intro-section center-overview" aria-labelledby="center-overview-title">
        <header class="center-section-heading">
            <p>ABOUT US</p>
            <h2 id="center-overview-title">
                <span>청소년의</span> <em>행복한</em> 꿈을 키우는 청소년센터
            </h2>
        </header>

        <div class="center-overview__message">
            <p class="center-overview__lead">
                시립서울청소년센터에 오신 것을 환영합니다.
            </p>
            <div>
                <p>
                    시립서울청소년센터는 1970년에 개관한 <strong>“대한민국 1호 청소년시설”</strong>로
                    깊은 역사를 자랑하는 청소년 전용시설입니다.
                </p>
                <p>
                    시립서울청소년센터는 <strong>청소년들의 올바른 인격형성과 균형 있는 성장</strong>을 돕기 위한
                    다양한 수련활동을 수행하여 우리의 청소년들이 국가와 사회가 필요로 하는 건전한 민주시민으로
                    성장할 수 있도록 기여함을 목표로 운영하고 있으며,
                    <strong>“청소년과 함께 밝은 미래를 향하여!”</strong>라는 슬로건과
                    <strong>“청소년의 행복한 꿈을 키우는 센터”</strong>라는 미션을 바탕으로 설립 이래 청소년들이
                    건강하고 행복하게 성장할 수 있도록 지원하고 있습니다.
                </p>
                <p>
                    또한 청소년들의 <strong>성장과 참여</strong>를 유도하는 동아리활동과 봉사활동,
                    <strong>희망과 미래</strong>를 준비하는 진로활동, <strong>창의와 상상</strong>을 펼칠 수 있는
                    문화예술활동, 청소년과 <strong>지역사회와의 조화</strong>를 위한 연계지원활동 등을 운영하여
                    청소년들의 삶과 질을 향상시키고, 올바른 가치관 확립과 더불어 청소년들의 건전한 성장을 위해
                    다양한 청소년활동을 전개해오고 있습니다.
                </p>
                <p>
                    앞으로도 시립서울청소년센터는
                    <strong>“청소년이 가고 싶은 청소년센터, 지역사회와 소통하는 청소년센터, 청소년지도사도 행복한 청소년센터”</strong>라는
                    비전을 실현하기 위하여 최선을 다하겠습니다.
                </p>
            </div>
        </div>

    </section>

    <section id="center-direction" class="center-intro-section center-direction" aria-labelledby="center-direction-title">
        <div class="center-direction__inner">
            <header class="center-section-heading">
                <p>DIRECTION</p>
                <h2 id="center-direction-title">청소년의 가능성을 중심에 둔 운영방향</h2>
            </header>

            <div class="center-direction__list">
                <article class="center-direction__row">
                    <header><h3>슬로건</h3><span>Slogan</span></header>
                    <div><strong>청소년과 함께 밝은 미래를 향하여!</strong></div>
                </article>
                <article class="center-direction__row">
                    <header><h3>미션</h3><span>Mission</span></header>
                    <div><strong>청소년의 행복한 꿈을 키우는 시립서울청소년센터</strong></div>
                </article>
                <article class="center-direction__row">
                    <header><h3>비전</h3><span>Vision</span></header>
                    <div class="center-direction__lines">
                        <p>청소년이 가고 싶은 청소년센터</p>
                        <p>청소년과 함께 성장하는 청소년센터</p>
                        <p>청소년지도사도 행복한 청소년센터</p>
                    </div>
                </article>
                <article class="center-direction__row">
                    <header><h3>핵심가치</h3><span>Core Value</span></header>
                    <div class="center-direction__keywords" aria-label="핵심가치 미래, 창의, 참여, 연결">
                        <strong>미래</strong><strong>창의</strong><strong>참여</strong><strong>연결</strong>
                    </div>
                </article>
                <article class="center-direction__row">
                    <header><h3>핵심목표</h3><span>Core Goal</span></header>
                    <div class="center-direction__lines">
                        <p>청소년의 미래준비를 위한 맞춤형 공간</p>
                        <p>청소년의 창의와 상상을 위한 활동 공간</p>
                        <p>청소년의 성장과 자발적 참여 활동 공간</p>
                        <p>청소년과 지역사회가 함께하는 공간</p>
                    </div>
                </article>
            </div>
        </div>
    </section>

    <section id="center-history" class="center-intro-section center-history" aria-labelledby="center-history-title">
        <header class="center-section-heading center-section-heading--split">
            <div>
                <p>HISTORY</p>
                <h2 id="center-history-title">서울 청소년과 함께 걸어온 시간</h2>
                <p class="center-section-heading__description">
                    1964년 청소년 보호 활동의 시작부터 오늘의 시립서울청소년센터까지 주요 발자취입니다.
                </p>
            </div>
        </header>

        <div class="center-history__list">
            <details open>
                <summary><strong>2020's</strong><span>변화하는 청소년 환경과 함께</span></summary>
                <ol>
                    <li><time>2025. 12. 31.</time><p>청소년시설 종합평가 최우수등급 선정</p></li>
                    <li><time>2025. 07. 01.</time><p>시립서울청소년센터 위탁공모 선정</p></li>
                    <li><time>2024. 12. 04.</time><p>우수청소년시설 서울특별시장상 수상</p></li>
                    <li><time>2023. 12. 31.</time><p>청소년수련시설 종합평가 최우수등급 선정</p></li>
                    <li><time>2023. 07. 01.</time><p>시립서울청소년센터 위탁 재계약 선정</p></li>
                    <li><time>2022. 12. 07.</time><p>서울특별시의회 의장 표창장 수상</p></li>
                    <li><time>2021. 12. 31.</time><p>서울시 청소년시설 운영평가 우수등급 선정</p></li>
                    <li><time>2021. 12. 03.</time><p>한국청소년활동진흥원 이사장상 수상</p></li>
                    <li><time>2020. 12. 31.</time><p>청소년공감센터-움 완공</p></li>
                    <li><time>2020. 12. 31.</time><p>청소년아지트 및 특성화 청소년공감센터 조성</p></li>
                    <li><time>2020. 07. 01.</time><p>시립서울청소년센터 위탁공모 선정</p></li>
                </ol>
            </details>

            <details>
                <summary><strong>2010's</strong><span>전문성과 공공성을 넓히다</span></summary>
                <ol>
                    <li><time>2019. 12. 19.</time><p>서울특별시의회 의장 표창장 수상</p></li>
                    <li><time>2019. 07. 01.</time><p>서울청소년수련관에서 서울청소년센터로 기관명 변경</p></li>
                    <li><time>2016. 02. 25.</time><p>공공청소년시설 프로그램 최우수기관 선정</p></li>
                    <li><time>2015. 01. 02.</time><p>특성화사업 우리문화체험 영역 인센티브 우수상 수상</p></li>
                    <li><time>2014. 12. 18.</time><p>시립청소년시설 운영실적 인센티브평가 특별상 수상</p></li>
                    <li><time>2014. 12. 09.</time><p>한국청소년활동진흥원 프로그램 등록 우수기관 선정</p></li>
                    <li><time>2012. 03. 01.</time><p>서울시교육청 지정 위탁형 대안학교 운영 시작</p></li>
                    <li><time>2011. 02. 14.</time><p>서울청소년수련관 재개관</p></li>
                    <li><time>2010. 12. 10.</time><p>인증프로그램 최다 개발기관 대상</p></li>
                </ol>
            </details>

            <details>
                <summary><strong>2000's</strong><span>더 나은 활동 환경을 준비하다</span></summary>
                <ol>
                    <li><time>2009. 08. 01.</time><p>서울청소년수련관 리모델링 공사 착공</p></li>
                    <li><time>2002. 07. 04.</time><p>청소년수련관 분야 행정서비스 시민만족도 우수기관 선정</p></li>
                    <li><time>2001. 12. 01.</time><p>문화관광부 시범 청소년수련시설 지정</p></li>
                    <li><time>2001. 07. 16.</time><p>청소년수련관 분야 행정서비스 시민만족도 최우수기관 선정</p></li>
                </ol>
            </details>

            <details>
                <summary><strong>1964—1999</strong><span>대한민국 최초 청소년시설의 시작</span></summary>
                <ol>
                    <li><time>1992. 07. 01.</time><p>서울특별시로부터 서울청소년회관 위탁운영</p></li>
                    <li><time>1991. 11. 23.</time><p>서울청소년회관 관리권을 서울특별시로 변경</p></li>
                    <li><time>1973. 11. 06.</time><p>서울청소년회관을 서울시경찰국에 공용 배정</p></li>
                    <li><time>1973. 09. 27.</time><p>서울특별시에 회관 기부채납</p></li>
                    <li><time>1970. 11. 11.</time><p>서울청소년회관 개관</p></li>
                    <li><time>1970. 07. 01.</time><p>청소년회관 건립위원회 해체 및 중앙청소년회관운영회 설립</p></li>
                    <li><time>1967. 05. 27.</time><p>서울청소년회관 기공</p></li>
                    <li><time>1967. 03. 22.</time><p>사단법인 서울청소년회관 건립위원회 설치</p></li>
                    <li><time>1965. 03. 30.</time><p>청소년회관 건립위원회 설치</p></li>
                    <li><time>1964. 09. 11.</time><p>청소년보호대책위원회 설치</p></li>
                </ol>
            </details>
        </div>
    </section>

    <section id="center-operation" class="center-intro-section center-operation" aria-labelledby="center-operation-title">
        <div class="center-operation__inner">
            <header class="center-section-heading">
                <p>ORGANIZATION</p>
                <h2 id="center-operation-title">청소년의 일상을 지원하는 운영체계</h2>
            </header>

            <article class="center-operator">
                <div>
                    <p>운영법인</p>
                    <h3>사단법인 한국청소년육성회</h3>
                </div>
                <p>
                    1964년 시작된 청소년단체로, 청소년 보호와 유해환경 예방, 문화활동 및 연구를 통해
                    건강한 시민의식과 청소년의 성장을 지원하고 있습니다.
                </p>
                <dl>
                    <div><dt>설립근거</dt><dd>민법 제32조</dd></div>
                    <div><dt>설립일</dt><dd>1964년 9월 11일</dd></div>
                    <div><dt>허가부서</dt><dd>경찰청</dd></div>
                    <div><dt>단체가입</dt><dd>한국청소년단체협의회 정회원</dd></div>
                    <div><dt>운영방식</dt><dd>서울특별시 위탁운영</dd></div>
                </dl>
            </article>

            <div class="center-org-chart" aria-label="시립서울청소년센터 조직도">
                <div class="center-org-chart__committees">
                    <span>센터운영위원회</span>
                    <span>청소년운영위원회</span>
                </div>
                <div class="center-org-chart__level is-director">
                    <strong>관장</strong>
                    <span>센터 운영 총괄</span>
                </div>
                <div class="center-org-chart__level is-manager">
                    <strong>부장</strong>
                    <span>운영 조정 및 관리</span>
                </div>
                <ul class="center-org-chart__teams" aria-label="5개 운영팀">
                    <li>업무지원팀</li>
                    <li>창의사업팀</li>
                    <li>복지사업팀</li>
                    <li>평생교육팀</li>
                    <li>돌봄운영팀</li>
                </ul>
            </div>

            <div class="center-teams" aria-label="부서별 주요 업무와 연락처">
                <article>
                    <h3>업무지원팀</h3>
                    <a href="tel:0222672914">02-2267-2914</a>
                    <p>행정·인사·회계·홍보·시설관리·접수</p>
                </article>
                <article>
                    <h3>창의사업팀</h3>
                    <a href="tel:0222672111">02-2267-2111</a>
                    <p>청소년 참여·동아리·진로·미래융합·지역연계</p>
                </article>
                <article>
                    <h3>복지사업팀</h3>
                    <a href="tel:0222642510">02-2264-2510</a>
                    <p>참여·수련·장애청소년·대안교육 연계사업 · 동그라미학교 02-2265-0909</p>
                </article>
                <article>
                    <h3>평생교육팀</h3>
                    <a href="tel:0222652113">02-2265-2113</a>
                    <p>평생교육·생활체육·시설대관·편의시설</p>
                </article>
                <article>
                    <h3>돌봄운영팀</h3>
                    <a href="tel:0222663340">02-2266-3340</a>
                    <p>청소년방과후아카데미·토요체험·기관연계</p>
                </article>
            </div>
        </div>
    </section>
        </div>
    </div>

    <section class="center-intro-contact inner" aria-label="시립서울청소년센터 대표 문의">
        <div>
            <p>시립서울청소년센터에 궁금한 점이 있나요?</p>
            <strong>대표전화로 편하게 문의해주세요.</strong>
        </div>
        <a href="tel:0222672914">02-2267-2914</a>
    </section>
</main>

<?php include __DIR__ . '/includes/footer.php'; ?>

<script src="<?= BASE_URL ?>/js/global-nav.js"></script>
<script src="<?= BASE_URL ?>/js/header-search.js"></script>
</body>
</html>

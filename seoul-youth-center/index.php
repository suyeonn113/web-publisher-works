<?php
include __DIR__ . '/includes/config.php';
include __DIR__ . '/includes/data/youth-programs.php';
include __DIR__ . '/includes/functions/program.service.php';

// 메인 배너 데이터
$heroBanners = [
    [
        'id' => 1,
        'link' => null,
        'target' => '_self',
        'rel' => '',
        'image' => '/assets/images/banners/hero-center-intro-final-v6.png',
        'alt' => '시립서울청소년센터. 청소년의 행복한 꿈을 키우는 공간입니다.',
        'is_active' => true,
        'sort_order' => 1,
    ],
    [
        'id' => 3,
        'link' => null,
        'target' => null,
        'rel' => null,
        'image' => '/assets/images/banners/hero-kakao-full-v5.png',
        'alt' => '가장 빠른 센터 소식. 시립서울청소년센터 카카오톡 채널. 궁금한 점은 편하게 묻고, 프로그램과 운영 소식은 빠르게 받아보세요.',
        'is_active' => true,
        'sort_order' => 3,
    ],
    [
        'id' => 4,
        'link' => BASE_URL . '/programs.php?status=ongoing',
        'target' => '_self',
        'rel' => '',
        'image' => '/assets/images/banners/hero-youth-club-final-v6.png',
        'alt' => '청소년동아리 부원 모집. 문의 02.2267.2111.',
        'is_active' => true,
        'sort_order' => 4,
    ],
    [
        'id' => 5,
        'link' => null,
        'target' => '_self',
        'rel' => '',
        'image' => '/assets/images/banners/hero-fitness-dodam-final-v3.png',
        'alt' => 'Health & Body. 종합체력실 도담도담. 청소년과 지역사회가 함께하는 공간. 문의 02.2266.0875.',
        'is_active' => true,
        'sort_order' => 5,
    ],
];

// 메인 최신 소식 탭용 임시 데이터
$homeNewsTabs = [
    'notices' => [
        'label' => '공지사항',
        'future_href' => '/notices.php',
        'items' => [
            ['title' => '홈페이지 회원 자동탈퇴(파기) 안내 및 재동의 사전 안내', 'date' => '2026.04.08'],
            ['title' => '홈페이지 자녀계정 로그인 방법 안내', 'date' => '2026.04.03'],
            ['title' => '2026년 평생교육 기구필라테스 강사 채용 공고', 'date' => '2026.03.29'],
            ['title' => '시립서울청소년센터 운영백서(2025년) 안내', 'date' => '2026.03.25'],
            ['title' => '상반기 정직원 채용 면접 안내', 'date' => '2026.03.23'],
        ],
    ],
    'city' => [
        'label' => '서울시정',
        'future_href' => '/seoul-city-news.php',
        'items' => [
            ['title' => '제1기 청년 공존·공감위원회 청년위원 모집 공고', 'date' => '2026.05.18'],
            ['title' => '서울특별시 청소년참여위원회 모집', 'date' => '2026.05.09'],
            ['title' => '2026년 서울시 청소년 정책제안대회 참가자 모집', 'date' => '2026.04.27'],
            ['title' => '청소년시설 문화예술 프로젝트 참여기관 안내', 'date' => '2026.04.15'],
            ['title' => '서울시 청소년 활동 지원사업 운영 안내', 'date' => '2026.04.04'],
        ],
    ],
    'press' => [
        'label' => '보도자료',
        'future_href' => '/press-releases.php',
        'items' => [
            ['title' => '시립서울청소년센터, 미래직업 진로체험 프로그램 운영', 'date' => '2026.05.15'],
            ['title' => '지역사회 연계 청소년 봉사활동 확대', 'date' => '2026.05.02'],
            ['title' => '봄학기 평생교육 프로그램 접수 시작', 'date' => '2026.04.20'],
            ['title' => '제24기 청소년운영위원회 발대식 개최', 'date' => '2026.04.08'],
            ['title' => '청소년 미래융합 프로그램 참여자 모집', 'date' => '2026.03.28'],
        ],
    ],
];

// 메인 SNS 링크용 임시 데이터: 실제 주소 확정 후 href를 추가
$socialChannels = [
    ['name' => '인스타그램', 'label_parts' => ['인스타그램'], 'slug' => 'instagram', 'icon' => 'instagram.png'],
    ['name' => '유튜브', 'label_parts' => ['유튜브'], 'slug' => 'youtube', 'icon' => 'youtube.png'],
    ['name' => '페이스북', 'label_parts' => ['페이스북'], 'slug' => 'facebook', 'icon' => 'facebook.png'],
    ['name' => '네이버 블로그', 'label_parts' => ['네이버', '블로그'], 'slug' => 'naverblog', 'icon' => 'naverblog.png'],
    ['name' => '카카오톡 채널', 'label_parts' => ['카카오톡', '채널'], 'slug' => 'kakao', 'icon' => 'kakao.png'],
];
$pageTitle = '시립서울청소년센터';
$pageCss = ['home.css', 'home-hero.css'];

// 청소년프로그램 필터 함수
$programs = filterActivePrograms($youthPrograms);
$programs = sortProgramsForDisplay($programs);
?>

<!DOCTYPE html>
<html lang="ko">

<!------------ <Head> ------------>
<?php include __DIR__ . '/includes/head.php'; ?>

<body>
<!------------ <Header> & Menu ------------>
<?php include './includes/global-nav.php'; ?>

<!------------ <Main> ------------>
<main id="main">
    <h1 class="visually-hidden">시립서울청소년센터</h1>
    <!------------ Hero ------------>
    <section class="hero-season" aria-label="센터 주요 소식">
    <div class="hero inner">
        <!-- Banner -->
        <div class="banner">
            <div class="banner__gallery">
                <ul class="banner__list">
                    <?php if (!empty($heroBanners)): ?>
                        <?php foreach ($heroBanners as $bannerIndex => $banner): ?>
                            <?php
                            $bannerLink = $banner['link'] ?? null;
                            $bannerTarget = $banner['target'] ?? '_self';
                            $bannerRel = $banner['rel'] ?? '';
                            $bannerImage = BASE_URL . '/' . ltrim($banner['image'] ?? '', '/');
                            $bannerAlt = $banner['alt'] ?? '';
                            ?>
                            <li class="banner__item"
                                data-active="<?= $bannerIndex === 0 ? 'true' : 'false' ?>"
                                data-banner-id="<?= (int) ($banner['id'] ?? 0) ?>">
                                <a
                                <?php if ($bannerLink !== null && $bannerLink !== ''): ?>
                                href="<?= htmlspecialchars($bannerLink, ENT_QUOTES, 'UTF-8') ?>"
                                target="<?= htmlspecialchars($bannerTarget, ENT_QUOTES, 'UTF-8') ?>"
                                <?= $bannerRel !== '' ? 'rel="' . htmlspecialchars($bannerRel, ENT_QUOTES, 'UTF-8') . '"' : '' ?>>
                                <?php else: ?>
                                role="link" aria-disabled="true">
                                <?php endif; ?>
                                    <img class="banner__image"
                                        src="<?= htmlspecialchars($bannerImage, ENT_QUOTES, 'UTF-8') ?>"
                                        alt="<?= htmlspecialchars($bannerAlt, ENT_QUOTES, 'UTF-8') ?>"
                                        width="2172"
                                        height="724"
                                        decoding="async"
                                        <?= $bannerIndex === 0 ? 'fetchpriority="high"' : 'loading="lazy"' ?>>
                                </a>
                            </li>
                        <?php endforeach; ?>
                    <?php else: ?>
                        <li class="banner__item" data-active="true">
                            <p>등록된 배너가 없습니다.</p>
                        </li>
                    <?php endif; ?>
                </ul>
            </div>
            <div class="banner__controls">
                <button class="banner__prev" 
                        type="button"
                        aria-label="이전 배너">
                    <svg class="icon--prev icon" aria-hidden="true" focusable="false">
                        <use href="<?= BASE_URL ?>/assets/icons/lucide-ui.svg#chevron-left"></use>
                    </svg>
                </button>
                <button class="banner__next" 
                        type="button"
                        aria-label="다음 배너">
                    <svg class="icon--next icon" aria-hidden="true" focusable="false">
                        <use href="<?= BASE_URL ?>/assets/icons/lucide-ui.svg#chevron-right"></use>
                    </svg>
                </button>
                <div class="banner__status">
                    <span class="banner__count">1 / <?= count($heroBanners) ?></span>
                    <button class="banner__pause"
                            type="button"
                            aria-label="자동재생 일시정지">
                        <svg class="icon--pause icon" aria-hidden="true" focusable="false">
                            <use href="<?= BASE_URL ?>/assets/icons/lucide-ui.svg#pause"></use>
                        </svg>
                    </button>
                </div>
            </div>
        </div>
        <!-- Quick Menu -->
        <nav class="quick-menu--home" aria-label="센터 바로 이용하기">
            <p class="quick-menu--home__service-label type-label">자주 찾는 서비스</p>
            <div class="quick-menu--home__contact">
                <div class="quick-menu--home__contact-details">
                    <button class="quick-menu--home__contact-summary type-label"
                            type="button"
                            aria-expanded="false"
                            aria-controls="home-contact-list">
                        <span>센터 이용이 궁금하신가요?</span>
                        <svg class="quick-menu--home__contact-icon icon icon--text"
                             aria-hidden="true"
                             focusable="false">
                            <use href="<?= BASE_URL ?>/assets/icons/lucide-ui.svg#chevron-down"></use>
                        </svg>
                    </button>
                    <p class="quick-menu--home__contact-heading type-label">
                        센터 이용이 궁금하신가요?
                    </p>
                    <ul class="quick-menu--home__contact-list" id="home-contact-list" hidden>
                        <li class="quick-menu--home__contact-item">
                            <span class="quick-menu--home__contact-label">시설·대관 문의</span>
                            <span class="quick-menu--home__contact-number">02-2267-2113</span>
                        </li>
                        <li class="quick-menu--home__contact-item">
                            <span class="quick-menu--home__contact-label">프로그램 문의</span>
                            <span class="quick-menu--home__contact-number">02-2267-2111</span>
                        </li>
                    </ul>
                </div>
            </div>
            <ul class="quick-menu--home__list">
                <li class="quick-menu--home__item">
                    <a class="quick-menu--home__link text-action"
                       href="<?= BASE_URL ?>/programs.php">
                        <img class="quick-menu--home__icon"
                             src="<?= BASE_URL ?>/assets/images/quick-menu/program-apply-clipboard-3d.png"
                             alt=""
                             width="1254"
                             height="1254"
                             decoding="async">
                        <span class="quick-menu--home__text">
                            <strong>
                                <span class="quick-menu--home__text-unit">프로그램</span>
                                <span class="quick-menu--home__text-unit">신청하기</span>
                            </strong>
                        </span>
                    </a>
                </li>
                <li class="quick-menu--home__item">
                    <a class="quick-menu--home__link text-action"
                       href="https://m.booking.naver.com/booking/12/bizes/521254"
                       target="_blank"
                       rel="noopener noreferrer"
                       aria-label="청소년공감센터 '움' 예약하기 (새 창)">
                        <img class="quick-menu--home__icon"
                             src="<?= BASE_URL ?>/assets/images/quick-menu/woom-face-3d.png"
                             alt=""
                             width="1254"
                             height="1254"
                             decoding="async">
                        <span class="quick-menu--home__text">
                            <strong>
                                <span class="quick-menu--home__text-unit">청소년공감센터</span>
                                <span class="quick-menu--home__text-unit">'움' 예약하기</span>
                            </strong>
                        </span>
                    </a>
                </li>
                <li class="quick-menu--home__item quick-menu--home__item--applications">
                    <a class="quick-menu--home__applications control control--compact control--primary text-action"
                       href="<?= BASE_URL ?>/applications.php">나의 신청현황</a>
                </li>
            </ul>
        </nav>
    </div>
    </section>

    <!------------ Program explorer ------------>
    <section class="program-explorer wrapper padding-block">
        <div class="program-explorer__arches" aria-hidden="true">
            <svg viewBox="0 0 1600 240" preserveAspectRatio="none" focusable="false">
                <path class="program-explorer__arch program-explorer__arch--halo program-explorer__arch--halo-outer"
                      d="M -120 236 Q 800 -34 1720 236"></path>
                <path class="program-explorer__arch program-explorer__arch--outer"
                      d="M -120 236 Q 800 -34 1720 236"></path>
                <path class="program-explorer__arch program-explorer__arch--middle"
                      d="M -120 236 Q 800 18 1720 236"></path>
            </svg>
        </div>
        <div class="program-explorer__inner inner">
            <div class="program-explorer__heading">
                <div class="program-explorer__headline">
                    <div class="program-explorer__headline-copy">
                        <div class="program-explorer__visual program-explorer__visual--start"
                             aria-hidden="true">
                            <img class="program-explorer__mascot program-explorer__mascot--jump"
                                 src="<?= BASE_URL ?>/assets/images/mascots/woom-program-3d.png"
                                 alt=""
                                 width="1190"
                                 height="1322"
                                 loading="lazy"
                                 decoding="async">
                            <img class="program-explorer__decoration program-explorer__decoration--butterfly"
                                 src="<?= BASE_URL ?>/assets/images/decor/program-explorer-butterfly-yellow-3d.png"
                                 alt=""
                                 width="1402"
                                 height="1122"
                                 loading="lazy"
                                 decoding="async">
                        </div>
                        <div class="program-explorer__title-row">
                            <h2 class="section__title type-section-title">
                                <span><span class="program-explorer__title-accent">지금</span> 신청</span>
                                <span>가능해요!</span>
                            </h2>
                        </div>
                        <p class="program-explorer__eyebrow type-label">
                            접수중인 프로그램
                            <span class="program-explorer__count" aria-live="polite">불러오는 중</span>
                        </p>
                        <div class="program-explorer__visual program-explorer__visual--end"
                             aria-hidden="true">
                            <img class="program-explorer__mascot program-explorer__mascot--salute"
                                 src="<?= BASE_URL ?>/assets/images/mascots/woom-salute-segmented-3d.png"
                                 alt=""
                                 width="1199"
                                 height="1312"
                                 loading="lazy"
                                 decoding="async">
                        </div>
                    </div>
                </div>
                <a class="program-explorer__all button button--more" href="<?= BASE_URL ?>/programs.php?status=ongoing">
                    전체 프로그램 보기
                    <svg class="button--more__icon icon icon--text" aria-hidden="true" focusable="false">
                        <use href="<?= BASE_URL ?>/assets/icons/lucide-ui.svg#plus"></use>
                    </svg>
                </a>
            </div>

            <div class="program-explorer__result" aria-busy="true">
                <p class="program-explorer__status type-body">프로그램을 불러오는 중입니다.</p>
                <div class="program-explorer__slider"
                     role="region"
                     aria-roledescription="carousel"
                     aria-label="접수 중인 프로그램">
                    <button class="program-explorer__nav program-explorer__nav--prev"
                            type="button"
                            aria-label="이전 프로그램 보기">
                        <span class="program-explorer__nav-frame" aria-hidden="true">
                            <svg class="icon" focusable="false">
                                <use href="<?= BASE_URL ?>/assets/icons/lucide-ui.svg#chevron-left"></use>
                            </svg>
                        </span>
                    </button>
                    <div class="program-explorer__viewport">
                        <div class="program-explorer__grid"></div>
                    </div>
                    <button class="program-explorer__nav program-explorer__nav--next"
                            type="button"
                            aria-label="다음 프로그램 보기">
                        <span class="program-explorer__nav-frame" aria-hidden="true">
                            <svg class="icon" focusable="false">
                                <use href="<?= BASE_URL ?>/assets/icons/lucide-ui.svg#chevron-right"></use>
                            </svg>
                        </span>
                    </button>
                </div>
            </div>
        </div>
    </section>

    <!------------ Home Updates ------------>
    <div class="home-updates wrapper">
        <div class="home-updates__inner inner">
            <section class="news" aria-labelledby="latest-news-title" data-news-tabs data-news-links-enabled="false">
                <div class="news__heading">
                    <h2 class="section__title type-section-title" id="latest-news-title">최신 소식</h2>
                </div>

                <div class="news__controls">
                    <div class="news__tabs" role="tablist" aria-label="최신 소식 분류" aria-orientation="vertical">
                    <?php $defaultNewsTabKey = array_key_first($homeNewsTabs); ?>
                    <?php foreach ($homeNewsTabs as $newsTabKey => $newsTab): ?>
                        <?php $isActiveNewsTab = $newsTabKey === $defaultNewsTabKey; ?>
                        <button
                            class="news__tab type-label"
                            id="news-tab-<?= htmlspecialchars($newsTabKey, ENT_QUOTES, 'UTF-8') ?>"
                            type="button"
                            role="tab"
                            aria-selected="<?= $isActiveNewsTab ? 'true' : 'false' ?>"
                            aria-controls="news-panel-<?= htmlspecialchars($newsTabKey, ENT_QUOTES, 'UTF-8') ?>"
                            tabindex="<?= $isActiveNewsTab ? '0' : '-1' ?>"
                            data-news-tab="<?= htmlspecialchars($newsTabKey, ENT_QUOTES, 'UTF-8') ?>"
                            data-more-href="<?= htmlspecialchars(BASE_URL . (string) $newsTab['future_href'], ENT_QUOTES, 'UTF-8') ?>"
                            data-more-label="<?= htmlspecialchars((string) $newsTab['label'], ENT_QUOTES, 'UTF-8') ?> 더보기">
                            <?= htmlspecialchars((string) $newsTab['label'], ENT_QUOTES, 'UTF-8') ?>
                        </button>
                    <?php endforeach; ?>
                    </div>
                    <a class="news__more button button--more type-label" role="link" aria-disabled="true" data-news-more>
                        더보기
                        <svg class="button--more__icon icon icon--text" aria-hidden="true" focusable="false">
                            <use href="<?= BASE_URL ?>/assets/icons/lucide-ui.svg#plus"></use>
                        </svg>
                    </a>
                </div>

                <div class="news__panels">
                    <?php foreach ($homeNewsTabs as $newsTabKey => $newsTab): ?>
                        <?php $isActiveNewsTab = $newsTabKey === $defaultNewsTabKey; ?>
                        <div
                            class="news__panel"
                            id="news-panel-<?= htmlspecialchars($newsTabKey, ENT_QUOTES, 'UTF-8') ?>"
                            role="tabpanel"
                            aria-labelledby="news-tab-<?= htmlspecialchars($newsTabKey, ENT_QUOTES, 'UTF-8') ?>"
                            data-news-panel="<?= htmlspecialchars($newsTabKey, ENT_QUOTES, 'UTF-8') ?>"<?php if (!$isActiveNewsTab): ?> hidden<?php endif; ?>>
                            <ul class="notice-list" aria-label="<?= htmlspecialchars((string) $newsTab['label'], ENT_QUOTES, 'UTF-8') ?> 목록">
                                <?php foreach (array_slice((array) $newsTab['items'], 0, 5) as $newsItem): ?>
                                    <li class="notice-list__item">
                                        <a class="notice-list__link" role="link" aria-disabled="true">
                                            <span class="notice-list__title type-body"><?= htmlspecialchars((string) $newsItem['title'], ENT_QUOTES, 'UTF-8') ?></span>
                                            <time class="notice-list__date type-caption" datetime="<?= htmlspecialchars(str_replace('.', '-', (string) $newsItem['date']), ENT_QUOTES, 'UTF-8') ?>">
                                                <?= htmlspecialchars((string) $newsItem['date'], ENT_QUOTES, 'UTF-8') ?>
                                            </time>
                                        </a>
                                    </li>
                                <?php endforeach; ?>
                            </ul>
                        </div>
                    <?php endforeach; ?>
                </div>
            </section>
            <aside class="social-channels" aria-labelledby="social-channels-title">
                <h2 class="social-channels__title" id="social-channels-title">
                    <span class="social-channels__line social-channels__line--lead">
                        <strong class="social-channels__keyword type-section-title">SNS</strong>
                        <span class="social-channels__suffix">에서</span>
                    </span>
                    <span class="social-channels__line social-channels__description">더 많은 소식을 만나보세요</span>
                </h2>
                <ul class="social-channels__list">
                    <?php foreach ($socialChannels as $socialChannel): ?>
                        <li class="social-channels__item">
                            <a class="social-channels__link social-channels__link--<?= htmlspecialchars($socialChannel['slug'], ENT_QUOTES, 'UTF-8') ?>"
                               role="link"
                               aria-disabled="true"
                               tabindex="0">
                                <span class="social-channels__icon-frame" aria-hidden="true">
                                    <img class="social-channels__icon icon-image"
                                         src="<?= BASE_URL ?>/assets/icons/<?= htmlspecialchars($socialChannel['icon'], ENT_QUOTES, 'UTF-8') ?>"
                                         alt="">
                                </span>
                                <span class="social-channels__label type-label">
                                    <?php foreach ($socialChannel['label_parts'] as $labelIndex => $labelPart): ?>
                                        <?= $labelIndex > 0 ? ' ' : '' ?><span class="social-channels__label-part"><?= htmlspecialchars($labelPart, ENT_QUOTES, 'UTF-8') ?></span>
                                    <?php endforeach; ?>
                                </span>
                            </a>
                        </li>
                    <?php endforeach; ?>
                </ul>
            </aside>
        </div>
    </div>
    <!------------ Gallery ------------>
    <section class="gallery inner">
        <div class="gallery__heading">
            <h2 class="section__title type-section-title">활동 사진</h2>
        </div>
        <span class="button--more button" aria-disabled="true">
            더보기
            <svg class="button--more__icon icon icon--text" aria-hidden="true" focusable="false">
                <use href="<?= BASE_URL ?>/assets/icons/lucide-ui.svg#plus"></use>
            </svg>
        </span>
        <div class="gallery__slider">
            <div class="gallery__controls">
                <button class="gallery__prev" type="button" aria-label="이전 활동사진">
                    <span class="gallery__nav-frame" aria-hidden="true">
                        <svg class="icon" focusable="false">
                            <use href="<?= BASE_URL ?>/assets/icons/lucide-ui.svg#chevron-left"></use>
                        </svg>
                    </span>
                </button>
                <button class="gallery__next" type="button" aria-label="다음 활동사진">
                    <span class="gallery__nav-frame" aria-hidden="true">
                        <svg class="icon" focusable="false">
                            <use href="<?= BASE_URL ?>/assets/icons/lucide-ui.svg#chevron-right"></use>
                        </svg>
                    </span>
                </button>
            </div>
            <ul class="gallery__track">
                <!-- JS로 li.gallery__item 생성 -->
            </ul>
        </div>
    </section>

    <!------------ Related Links ------------>
    <div class="related-links wrapper">
        <section class="related-links inner">
            <button id="related-links__toggle" 
                    class="related-links__toggle"
                    aria-expanded="false" 
                    aria-controls="related-links__list">
                <span class="related-links__toggle-title type-label">유관기관 보기</span>
                <svg class="icon--toggle icon icon--text" aria-hidden="true" focusable="false">
                    <use href="<?= BASE_URL ?>/assets/icons/lucide-ui.svg#chevron-down"></use>
                </svg>
            </button>
            <ul id="related-links__list" class="related-links__list" hidden>
                <li class="related-links__item">
                    <a
                        aria-label="서울특별시 새 창 열기" role="link" aria-disabled="true">
                        <img src="<?= BASE_URL ?>/assets/images/links/seoul.png"
                            alt="서울특별시">
                    </a>
                </li>
                <li class="related-links__item">
                    <a
                        aria-label="서울특별시교육청 새 창 열기" role="link" aria-disabled="true">
                        <img src="<?= BASE_URL ?>/assets/images/links/sen.png"
                            alt="서울특별시교육청">
                    </a>
                </li>
                <li class="related-links__item">
                    <a
                        aria-label="한국청소년활동진흥원 새 창 열기" role="link" aria-disabled="true">
                        <img src="<?= BASE_URL ?>/assets/images/links/kywa.png"
                            alt="한국청소년활동진흥원">
                    </a>
                </li>
                <li class="related-links__item">
                    <a
                        aria-label="서울특별시기술교육원 새 창 열기" role="link" aria-disabled="true">
                        <img src="<?= BASE_URL ?>/assets/images/links/edu.png"
                            alt="서울특별시기술교육원">
                    </a>
                </li>
                <li class="related-links__item">
                    <a
                        aria-label="서울특별시청소년시설협회 새 창 열기" role="link" aria-disabled="true">
                        <img src="<?= BASE_URL ?>/assets/images/links/youthcenter.png"
                            alt="서울특별시청소년시설협회">
                    </a>
                </li>
                <li class="related-links__item">
                    <a
                        aria-label="한국청소년육성회 새 창 열기" role="link" aria-disabled="true">
                        <img src="<?= BASE_URL ?>/assets/images/links/kays.png"
                            alt="한국청소년육성회">
                    </a>
                </li>
                <li class="related-links__item">
                    <a
                        aria-label="청소년활동진흥센터 새 창 열기" role="link" aria-disabled="true">
                        <img src="<?= BASE_URL ?>/assets/images/links/sy0404.png"
                            alt="청소년활동진흥센터">
                    </a>
                </li>
                <li class="related-links__item">
                    <a
                        aria-label="서울시청소년상담복지센터 새 창 열기" role="link" aria-disabled="true">
                        <img src="<?= BASE_URL ?>/assets/images/links/teen1318.png"
                            alt="서울시청소년상담복지센터">
                    </a>
                </li>
                <li class="related-links__item">
                    <a
                        aria-label="청소년1338 새 창 열기" role="link" aria-disabled="true">
                        <img src="<?= BASE_URL ?>/assets/images/links/1388.png"
                            alt="청소년1338">
                    </a>
                </li>
                <li class="related-links__item">
                    <a
                        aria-label="서울시청소년몽땅 새 창 열기" role="link" aria-disabled="true">
                        <img src="<?= BASE_URL ?>/assets/images/links/youthnavi-hq.png"
                            alt="서울시청소년몽땅">
                    </a>
                </li>
                <li class="related-links__item">
                    <a
                        aria-label="청소년활동정보서비스 e청소년 새 창 열기" role="link" aria-disabled="true">
                        <img src="<?= BASE_URL ?>/assets/images/links/youth.png"
                            alt="청소년활동정보서비스 e청소년">
                    </a>
                </li>
                <li class="related-links__item">
                    <a
                        aria-label="서울런 새 창 열기" role="link" aria-disabled="true">
                        <img src="<?= BASE_URL ?>/assets/images/links/slearn.png"
                            alt="서울런">
                    </a>
                </li>
            </ul>
        </section>
    </div>

</main>

<!------------ <Footer> ------------>
<?php include './includes/footer.php'; ?>



<!------------- <Script> ------------>
<script>
    window.APP_BASE_URL = '<?= BASE_URL ?>';
</script>
<script src="<?= BASE_URL ?>/js/global-nav.js"></script>
<script src="<?= BASE_URL ?>/js/header-search.js"></script>
<script src="<?= BASE_URL ?>/js/banner.js"></script>
<script src="<?= BASE_URL ?>/js/quick-menu.js"></script>
<script src="<?= BASE_URL ?>/js/recommend.js"></script>
<script src="<?= BASE_URL ?>/js/news-tabs.js"></script>
<script src="<?= BASE_URL ?>/js/gallery.js"></script>
<script src="<?= BASE_URL ?>/js/related-links.js"></script>

</body>
</html>

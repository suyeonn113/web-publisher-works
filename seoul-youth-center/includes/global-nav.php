
<?php
$globalYouthProgramLabels = [
    '참여활동', '수련활동', '지역연계활동', '학교연계활동',
    '진로체험활동', '미래융합활동', '국제교류활동', '장애청소년활동',
    '특성화활동', '동그라미학교', '방과후아카데미', '청소년문화공간',
];
?>

<!------------ Skip Link ------------>
<div class="skip-links" aria-label="바로가기 링크">
    <a href="#menu" class="skip-links__link">메뉴 바로가기</a>
    <a href="#main" class="skip-links__link">본문 바로가기</a>
</div>

<!------------ Header ------------>
<header class="site-header inner">
    <!-- Logo -->
    <div class="logo">
        <a class="logo__link" href="<?= BASE_URL ?>/index.php" aria-label="시립서울청소년센터 홈으로 이동">
            <img src="<?= BASE_URL ?>/assets/images/logo.gif" alt="시립서울청소년센터">
        </a>
    </div>
    <!-- Search -->
    <form class="search" id="search-panel" role="search" data-state="closed">
        <label for="search__input" class="visually-hidden">검색어 입력</label>
        <button
            class="button--search__toggle button icon-frame icon-frame--round"
            type="button"
            aria-label="검색 열기"
            aria-expanded="false"
            aria-controls="search__body">
            <svg class="icon--search icon" aria-hidden="true" focusable="false">
                <use href="<?= BASE_URL ?>/assets/icons/lucide-ui.svg#search"></use>
            </svg>
            <span class="button--search__label">통합검색</span>
        </button>
        <div class="search__body" id="search__body" hidden>
            <div class="search__field">
                <input
                    id="search__input"
                    class="search__input"
                    type="search"
                    name="q"
                    placeholder="통합 검색"
                    autocomplete="off"
                    enterkeyhint="search"
                    disabled>
            </div>
        </div>
        <p class="visually-hidden" id="search-status" aria-live="polite"></p>
    </form>
    <button class="header-menu-toggle icon-frame"
            type="button"
            aria-label="전체 메뉴 열기"
            aria-controls="menu-panel"
            aria-expanded="false">
        <svg class="header-menu-toggle__icon icon" aria-hidden="true" focusable="false">
            <use href="<?= BASE_URL ?>/assets/icons/lucide-ui.svg#menu"></use>
        </svg>
    </button>
    <!-- Only PC -->
    <nav class="nav-user">
        <a class="login header__login text-action" role="link" aria-disabled="true">
            <svg class="icon--login icon icon--text" aria-hidden="true" focusable="false">
                <use href="<?= BASE_URL ?>/assets/icons/lucide-ui.svg#log-in"></use>
            </svg>
            로그인
        </a>
    </nav>
</header>

<!------------ Menu ------------>
<nav id="menu-panel" data-menu-mode="default" >
    <!-- Only Compact -->
    <div class="menu-panel__top">
        <div class="menu-panel__user">
            <a class="login menu__login text-action" role="link" aria-disabled="true">
                <svg class="icon--login icon icon--text" aria-hidden="true" focusable="false">
                    <use href="<?= BASE_URL ?>/assets/icons/lucide-ui.svg#log-in"></use>
                </svg>
                로그인
            </a>
        </div>
        <p class="menu-panel__title">전체메뉴</p>
        <button class="button--close button icon-frame"
                type="button"
                aria-label="메뉴 닫기"
                aria-controls="menu-panel">
            <svg class="icon icon-close" aria-hidden="true" focusable="false">
                <use href="<?= BASE_URL ?>/assets/icons/lucide-ui.svg#x"></use>
            </svg>
        </button>
    </div>

    <!-- Main menu -->
    <ul class="main-menu inner" id="menu">
        <li class="main-menu__item">
            <button class="main-menu__button"
                    id="tab-1"
                    aria-expanded="false"
                    aria-controls="panel-1"><span class="main-menu__label">센터소개</span></button>
        </li>
        <li class="main-menu__item">
            <button class="main-menu__button"
                    id="tab-2"
                    aria-expanded="false"
                    aria-controls="panel-2"><span class="main-menu__label">청소년 프로그램</span></button>
        </li>
        <li class="main-menu__item">
            <button class="main-menu__button"
                    id="tab-3"
                    aria-expanded="false"
                    aria-controls="panel-3"><span class="main-menu__label">평생교육 프로그램</span></button>
        </li>
        <li class="main-menu__item">
            <button class="main-menu__button main-menu__button--primary-hover"
                    id="tab-4"
                    aria-expanded="false"
                    aria-controls="panel-4"><span class="main-menu__label">이용안내</span></button>
        </li>
        <li class="main-menu__item">
            <button class="main-menu__button"
                    id="tab-5"
                    aria-expanded="false"
                    aria-controls="panel-5"><span class="main-menu__label">열린마당</span></button>
        </li>
        <li class="main-menu__item main-menu__item--application">
            <button class="main-menu__button main-menu__button--application main-menu__button--primary-hover"
                    id="tab-6"
                    aria-expanded="false"
                    aria-controls="panel-6"><span class="main-menu__label">통합신청</span></button>
        </li>
        <li class="main-menu__item main-menu__item--applications">
            <a class="main-menu__applications text-action" href="<?= BASE_URL ?>/applications.php">나의 신청현황</a>
        </li>
    </ul>

     <!-- Sub menu -->
    <div class="sub-panel text-action-group">
        <div class="sub-panel__item" 
             id="panel-1" 
             aria-labelledby="tab-1">
            <ul class="sub-menu">
                <li class="sub-menu__title">센터소개</li>
                <li class="sub-menu__item">
                    <a class="sub-menu__link" role="link" aria-disabled="true">인사말</a>
                </li>
                <li class="sub-menu__item">
                    <a class="sub-menu__link" role="link" aria-disabled="true">연혁 및 운영방향</a>
                </li>
                <li class="sub-menu__item">
                    <a class="sub-menu__link" role="link" aria-disabled="true">함께하는 사람들</a>
                </li>
                <li class="sub-menu__item">
                    <a class="sub-menu__link" role="link" aria-disabled="true">시설안내</a>
                </li>
                <li class="sub-menu__item">
                    <a class="sub-menu__link" role="link" aria-disabled="true">오시는길</a>
                </li>
            </ul>
        </div>
        <div class="sub-panel__item" 
             id="panel-2"
             aria-labelledby="tab-2">
            <ul class="sub-menu">
                <li class="sub-menu__title">청소년 프로그램</li>
                <?php foreach ($globalYouthProgramLabels as $globalYouthProgramLabel): ?>
                    <li class="sub-menu__item">
                        <a class="sub-menu__link" role="link" aria-disabled="true">
                            <?= htmlspecialchars($globalYouthProgramLabel, ENT_QUOTES, 'UTF-8') ?>
                        </a>
                    </li>
                <?php endforeach; ?>
            </ul>
        </div>
        <div class="sub-panel__item"
             id="panel-3"
             aria-labelledby="tab-3">
            <ul class="sub-menu">
                <li class="sub-menu__title">평생교육 프로그램</li>
                <li class="sub-menu__item">
                    <a class="sub-menu__link" role="link" aria-disabled="true">접수안내</a>
                </li>
                <li class="sub-menu__item">
                    <a class="sub-menu__link" role="link" aria-disabled="true">교육강좌</a>
                </li>
            </ul>
        </div>
        <div class="sub-panel__item" 
             id="panel-4"
             aria-labelledby="tab-4">
            <ul class="sub-menu">
                <li class="sub-menu__title">이용안내</li>
                <li class="sub-menu__item">
                    <a class="sub-menu__link" role="link" aria-disabled="true">문화공간</a>
                </li>
                <li class="sub-menu__item">
                    <a class="sub-menu__link" role="link" aria-disabled="true">종합체력실</a>
                </li>
                <li class="sub-menu__item">
                    <a class="sub-menu__link" role="link" aria-disabled="true">시설대관</a>
                </li>
                <li class="sub-menu__item">
                    <a class="sub-menu__link" role="link" aria-disabled="true">기관방문</a>
                </li>
            </ul>
        </div>
        <div class="sub-panel__item" 
             id="panel-5"
             aria-labelledby="tab-5">
            <ul class="sub-menu">
                <li class="sub-menu__title">열린마당</li>
                <li class="sub-menu__item">
                    <a class="sub-menu__link" role="link" aria-disabled="true">공지사항</a>
                </li>
                <li class="sub-menu__item">
                    <a class="sub-menu__link" role="link" aria-disabled="true">프로그램 활동사진</a>
                </li>
                <li class="sub-menu__item">
                    <a class="sub-menu__link" role="link" aria-disabled="true">보도자료</a>
                </li>
                <li class="sub-menu__item">
                    <a class="sub-menu__link" role="link" aria-disabled="true">서울시정</a>
                </li>
                <li class="sub-menu__item">
                    <a class="sub-menu__link" role="link" aria-disabled="true">공유자료</a>
                </li>
            </ul>
        </div>
        <div class="sub-panel__item sub-panel__item--application"
             id="panel-6"
             aria-labelledby="tab-6">
            <ul class="sub-menu">
                <li class="sub-menu__title">통합신청</li>
                <li class="sub-menu__item">
                    <a class="sub-menu__link" href="<?= BASE_URL ?>/programs.php">청소년 프로그램 신청</a>
                </li>
                <li class="sub-menu__item">
                    <a class="sub-menu__link" href="<?= BASE_URL ?>/lifelong-education-apply.php">평생교육 프로그램 신청</a>
                </li>
                <li class="sub-menu__item">
                    <a class="sub-menu__link" role="link" aria-disabled="true">대관신청</a>
                </li>
                <li class="sub-menu__item">
                    <a class="sub-menu__link" role="link" aria-disabled="true">방문신청</a>
                </li>
                <li class="sub-menu__item sub-menu__item--applications">
                    <a class="sub-menu__link" href="<?= BASE_URL ?>/applications.php">나의 신청현황</a>
                </li>
            </ul>
        </div>
    </div>
</nav>

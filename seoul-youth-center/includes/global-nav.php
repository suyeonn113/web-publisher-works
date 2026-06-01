
<!------------ Skip Link ------------>
<div class="skip-links" aria-label="바로가기 링크">
    <a href="#menu" class="skip-links__link">메뉴 바로가기</a>
    <a href="#main" class="skip-links__link">본문 바로가기</a>
</div>

<!------------ Top Notice ------------>
<div class="top-bar wrapper">
<p class="top-bar__notice inner">
    이 누리집은 대한민국 공식 전자정부 누리집입니다.
</p>
</div>

<!------------ Header ------------>
<header class="inner">
    <!-- Logo -->
    <h1 class="logo">
        <a class="logo__link" href="<?= BASE_URL ?>/index.php" aria-label="서울시립청소년센터 홈으로 이동">
            <img src="<?= BASE_URL ?>/assets/images/logo.gif" alt="서울시립청소년센터">
        </a>
    </h1>
    <!-- Search -->
    <form class="search" id="search-panel" role="search" data-state="closed">
        <label for="search__input" class="visually-hidden">검색어 입력</label>
        <button
            class="button--search__toggle button"
            type="button"
            aria-label="검색 열기"
            aria-expanded="false"
            aria-controls="search__body">
            <svg class="icon--search icon" 
                 viewBox="0 0 24 24" 
                 aria-hidden="true" 
                 focusable="false">
                <path d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z"/>
                <path d="M22 22L20 20"/>
            </svg>
        </button>
        <div class="search__body" id="search__body" hidden>
            <div class="search__field">
                <input
                    id="search__input"
                    class="search__input"
                    type="search"
                    name="q"
                    placeholder="검색어를 입력하세요"
                    autocomplete="off"
                    enterkeyhint="search">
            </div>
        </div>
    </form>
    <!-- Only PC -->
    <nav class="nav-user">
        <a class="login header__login" href="#">
            <svg class="icon--login icon" 
                aria-hidden="true"
                focusable="false"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                focusable="false">
                <path d="M8.90002 7.55999C9.21002 3.95999 11.06 2.48999 15.11 2.48999H15.24C19.71 2.48999 21.5 4.27999 21.5 8.74999V15.27C21.5 19.74 19.71 21.53 15.24 21.53H15.11C11.09 21.53 9.24002 20.08 8.91002 16.54"/>
                <path d="M2 12H14.88"/>
                <path d="M12.65 8.6499L16 11.9999L12.65 15.3499"/>
            </svg>
            로그인
        </a>
        <a class="sign-up header__sign-up" href="#">
            <svg class="icon--sign-up icon"
                viewBox="0 0 24 24" 
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                focusable="false">
                <path d="M12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12Z"/>
                <path d="M20.59 22C20.59 18.13 16.74 15 12 15C7.26003 15 3.41003 18.13 3.41003 22"/>
            </svg>
            회원가입
        </a>
    </nav>
</header>

<!------------ Menu ------------>
<nav id="menu-panel" data-menu-mode="drawer" >
    <!-- Only Mobile, Tablet -->
    <div class="menu-panel__top">
        <a class="login menu__login" href="#">
            <svg class="icon--login icon" 
                aria-hidden="true"
                focusable="false"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                focusable="false">
                <path d="M8.90002 7.55999C9.21002 3.95999 11.06 2.48999 15.11 2.48999H15.24C19.71 2.48999 21.5 4.27999 21.5 8.74999V15.27C21.5 19.74 19.71 21.53 15.24 21.53H15.11C11.09 21.53 9.24002 20.08 8.91002 16.54"/>
                <path d="M2 12H14.88"/>
                <path d="M12.65 8.6499L16 11.9999L12.65 15.3499"/>
            </svg>
            로그인
        </a>
        <p class="menu-panel__title">전체메뉴</p>
        <button class="button--close button"
                type="button"
                aria-label="메뉴 닫기"
                aria-expanded="true"
                aria-controls="menu-panel">
            <svg class="icon icon-close" 
                viewBox="0 0 24 24" 
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                focusable="false">
                <path d="M19.8571 5L5 19.8571"/>
                <path d="M5 5L19.8571 19.8571"/>
            </svg>
        </button>
    </div>

    <!-- Main menu -->
    <ul class="main-menu inner" id="menu">
        <li class="main-menu__mega-menu">
            <button class="button--mega-menu"
                    type="button"
                    aria-label="전체 메뉴 열기"
                    aria-expanded="false"
                    aria-controls="sub-panel">
                <svg class="icon--menu-all icon" 
                    viewBox="0 0 24 24"  
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                    focusable="false">
                    <path d="M22 8.27V4.23C22 2.64 21.36 2 19.77 2H15.73C14.14 2 13.5 2.64 13.5 4.23V8.27C13.5 9.86 14.14 10.5 15.73 10.5H19.77C21.36 10.5 22 9.86 22 8.27Z"/>
                    <path d="M10.5 8.52V3.98C10.5 2.57 9.86 2 8.27 2H4.23C2.64 2 2 2.57 2 3.98V8.51C2 9.93 2.64 10.49 4.23 10.49H8.27C9.86 10.5 10.5 9.93 10.5 8.52Z"/>
                    <path d="M10.5 19.77V15.73C10.5 14.14 9.86 13.5 8.27 13.5H4.23C2.64 13.5 2 14.14 2 15.73V19.77C2 21.36 2.64 22 4.23 22H8.27C9.86 22 10.5 21.36 10.5 19.77Z"/>
                    <path d="M15 15.5H21"/>
                    <path d="M15 19.5H21"/>
                </svg>
            전체
            </button>
        </li>
        <li class="main-menu__item">
            <button class="main-menu__button"
                    id="tab-1"
                    aria-selected="true"
                    aria-controls="panel-1">청소년센터 안내</button>
        </li>
        <li class="main-menu__item">
            <button class="main-menu__button"
                    id="tab-2"
                    aria-selected="false"
                    aria-controls="panel-2">청소년 프로그램</button>
        </li>
        <li class="main-menu__item">
            <button class="main-menu__button"
                    id="tab-3"
                    aria-selected="false"
                    aria-controls="panel-3">평생교육 프로그램</button>
        </li>
        <li class="main-menu__item">
            <a class="main-menu__link"
               href="http://0909.youthc.or.kr/"
               target="_blank"
               rel="noopener noreferrer">
                동그라미 학교
                <svg class="icon--export icon" 
                     viewBox="0 0 24 24"
                     xmlns="http://www.w3.org/2000/svg"
                     aria-hidden="true"
                     focusable="false">
                    <path d="M13 11L21.2 2.80005"/>
                    <path d="M22 6.8V2H17.2"/>
                    <path d="M11 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22H15C20 22 22 20 22 15V13"/>
                </svg>
            </a>
        </li>
        <li class="main-menu__item">
            <button class="main-menu__button"
                    id="tab-4"
                    aria-selected="false"
                    aria-controls="panel-4">이용 안내</button>
        </li>
        <li class="main-menu__item">
            <button class="main-menu__button"
                    id="tab-5"
                    aria-selected="false"
                    aria-controls="panel-5">소식</button>
        </li>
    </ul>

     <!-- Sub menu -->
    <div class="sub-panel">
        <div class="sub-panel__item" 
             id="panel-1" 
             aria-labelledby="tab-1">
            <ul class="sub-menu">
                <li class="sub-menu__title">청소년센터 안내</li>
                <li class="sub-menu__item">
                    <a class="sub-menu__link" href="#">소개</a>
                </li>
                <li class="sub-menu__item">
                    <a class="sub-menu__link" href="#">시설개요 및 안내</a>
                </li>
                <li class="sub-menu__item">
                    <a class="sub-menu__link" href="#">찾아오시는 길</a>
                </li>
            </ul>
        </div>
        <div class="sub-panel__item" 
             id="panel-2"
             aria-labelledby="tab-2">
            <ul class="sub-menu">
                <li class="sub-menu__title">청소년 프로그램</li>
                <li class="sub-menu__item">
                    <a class="sub-menu__link" href="<?= BASE_URL ?>/programs.php">활동신청</a>
                </li>
                <li class="sub-menu__item">
                    <a class="sub-menu__link" href="<?= BASE_URL ?>/applications.php">신청목록</a>
                </li>
                <li class="sub-menu__item">
                    <a class="sub-menu__link" href="#">참여활동</a>
                </li>
                <li class="sub-menu__item">
                    <a class="sub-menu__link" href="#">수련활동</a>
                </li>
                <li class="sub-menu__item">
                    <a class="sub-menu__link" href="#">봉사활동</a>
                </li>
                <li class="sub-menu__item">
                    <a class="sub-menu__link" href="#">지역연계활동</a>
                </li>
                <li class="sub-menu__item">
                    <a class="sub-menu__link" href="#">학교연계활동</a>
                </li>
                <li class="sub-menu__item">
                    <a class="sub-menu__link" href="#">진로체험활동</a>
                </li>
                <li class="sub-menu__item">
                    <a class="sub-menu__link" href="#">문화예술활동</a>
                </li>
                <li class="sub-menu__item">
                    <a class="sub-menu__link" href="#">미래융합활동</a>
                </li>
                <li class="sub-menu__item">
                    <a class="sub-menu__link" href="#">국제교류활동</a>
                </li>
                <li class="sub-menu__item">
                    <a class="sub-menu__link" href="#">장애청소년활동</a>
                </li>
                <li class="sub-menu__item">
                    <a class="sub-menu__link" href="#">위기청소년활동</a>
                </li>
                <li class="sub-menu__item">
                    <a class="sub-menu__link" href="#">특성화활동</a>
                </li>
                <li class="sub-menu__item">
                    <a class="sub-menu__link" href="#">동그라미학교</a>
                </li>
                <li class="sub-menu__item">
                    <a class="sub-menu__link" href="#">방과후아카데미</a>
                </li>
            </ul>
        </div>
        <div class="sub-panel__item"
             id="panel-3"
             aria-labelledby="tab-3">
            <ul class="sub-menu">
                <li class="sub-menu__title">평생교육 프로그램</li>
                <li class="sub-menu__item">
                    <a class="sub-menu__link" href="#">접수안내</a>
                </li>
                <li class="sub-menu__item">
                    <a class="sub-menu__link" href="#">교육강좌</a>
                </li>
            </ul>
        </div>
        <div class="sub-panel__item" 
             id="panel-4"
             aria-labelledby="tab-4">
            <ul class="sub-menu">
                <li class="sub-menu__title">이용 안내</li>
                <li class="sub-menu__item">
                    <a class="sub-menu__link" href="#">문화공간</a>
                </li>
                <li class="sub-menu__item">
                    <a class="sub-menu__link" href="#">종합체력실</a>
                </li>
                <li class="sub-menu__item">
                    <a class="sub-menu__link" href="#">시설대관</a>
                </li>
                <li class="sub-menu__item">
                    <a class="sub-menu__link" href="#">기관방문</a>
                </li>
            </ul>
        </div>
        <div class="sub-panel__item" 
             id="panel-5"
             aria-labelledby="tab-5">
            <ul class="sub-menu">
                <li class="sub-menu__title">소식</li>
                <li class="sub-menu__item">
                    <a class="sub-menu__link" href="#">공지사항</a>
                </li>
                <li class="sub-menu__item">
                    <a class="sub-menu__link" href="#">프로그램 활동사진</a>
                </li>
                <li class="sub-menu__item">
                    <a class="sub-menu__link" href="#">보도자료</a>
                </li>
                <li class="sub-menu__item">
                    <a class="sub-menu__link" href="#">서울시정</a>
                </li>
                <li class="sub-menu__item">
                    <a class="sub-menu__link" href="#">공유자료</a>
                </li>
            </ul>
        </div>
    </div>
</nav>

<!------------ Quick menu ------------>
<nav class="quick-menu" aria-label="빠른 메뉴">
    <ul class="quick-menu__list">
        <li class="quick-menu__item">
            <a class="quick-menu__link gap" 
               href="<?= BASE_URL ?>/index.php">
                <span class="icon--home__background">
                    <svg class="icon--home icon--quick-menu icon" 
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                        aria-hidden="true"
                        focusable="false">
                        <path d="M9 20.4161V13.4161C9 12.8638 9.44772 12.4161 10 12.4161H14C14.5523 12.4161 15 12.8638 15 13.4161V20.4161M4 18.4161V10.8571C4 9.65736 4.53851 8.52098 5.46705 7.76126L10.7335 3.45233C11.4703 2.84955 12.5297 2.84955 13.2665 3.45233L18.533 7.76126C19.4615 8.52098 20 9.65736 20 10.8571V18.4161C20 19.5207 19.1046 20.4161 18 20.4161H16H8H6C4.89543 20.4161 4 19.5207 4 18.4161Z"/>
                    </svg>
                </span>
                홈
            </a>
        </li>
        <li class="quick-menu__item">
            <button class="quick-menu__button quick-menu__button--menu"
                    type="button"
                    aria-controls="menu-panel"
                    aria-expanded="false"
                    aria-label="전체 메뉴 열기">
                <svg class="icon--menu-all icon--quick-menu icon" 
                     viewBox="0 0 24 24" 
                     xmlns="http://www.w3.org/2000/svg"
                     aria-hidden="true"
                     focusable="false">
                    <path d="M22 8.27V4.23C22 2.64 21.36 2 19.77 2H15.73C14.14 2 13.5 2.64 13.5 4.23V8.27C13.5 9.86 14.14 10.5 15.73 10.5H19.77C21.36 10.5 22 9.86 22 8.27Z"/>
                    <path d="M10.5 8.52V3.98C10.5 2.57 9.86 2 8.27 2H4.23C2.64 2 2 2.57 2 3.98V8.51C2 9.93 2.64 10.49 4.23 10.49H8.27C9.86 10.5 10.5 9.93 10.5 8.52Z"/>
                    <path d="M10.5 19.77V15.73C10.5 14.14 9.86 13.5 8.27 13.5H4.23C2.64 13.5 2 14.14 2 15.73V19.77C2 21.36 2.64 22 4.23 22H8.27C9.86 22 10.5 21.36 10.5 19.77Z"/>
                    <path d="M15 15.5H21"/>
                    <path d="M15 19.5H21"/>
                </svg>
                전체메뉴
            </button>
        </li>
        <li class="quick-menu__item">
            <a class="quick-menu__link" 
               href="<?= BASE_URL ?>/programs.php">
                <svg class="icon--youth icon--quick-menu icon" 
                     viewBox="0 0 24 24"
                     xmlns="http://www.w3.org/2000/svg"
                     aria-hidden="true"
                     focusable="false">
                    <path d="M14 4c0 1.1-.9 2-2 2s-2-.9-2-2 .9-2 2-2 2 .9 2 2Z"/>
                    <path class="fill-full" d="M17.47 7.11c-.16 0-.32.02-.48.05l-1.9.41-.2.04c-1.91.4-3.87.4-5.78 0l-.2-.04-1.9-.41a2.288 2.288 0 0 0-2.76 2.23c0 .98.63 1.86 1.56 2.17l2.18.73c.13.05.22.07.28.09.04.01.05.02.05.02.09.06.13.15.12.25 0 0 0 .01-.02.06-.02.06-.05.14-.1.28l-1.25 3.24a2.21 2.21 0 0 0 1.28 2.87 2.215 2.215 0 0 0 2.72-.97h.01l.92-1.62.92 1.62c.4.69 1.14 1.12 1.93 1.12.61 0 1.17-.25 1.58-.65.4-.41.65-.96.65-1.57 0-.28-.05-.55-.15-.8l-1.25-3.24c-.03-.1-.07-.19-.1-.28-.02-.05-.02-.06-.02-.06-.01-.1.03-.19.12-.25 0 0 .01-.01.05-.02.06-.02.15-.05.28-.1s2.18-.72 2.18-.72a2.28 2.28 0 0 0 1.56-2.16c0-1.26-1.02-2.29-2.28-2.29m.25 3.03-2.18.72c-.22.08-.46.15-.65.27-.59.36-.91 1.04-.81 1.72.02.23.12.47.2.68l1.25 3.24c.14.37-.04.79-.42.93a.706.706 0 0 1-.88-.31l-1.58-2.76a.74.74 0 0 0-1.02-.28c-.12.06-.21.16-.28.28l-1.58 2.75a.72.72 0 0 1-1.3-.61l1.25-3.25c.08-.21.17-.44.2-.67.1-.68-.22-1.36-.81-1.72-.19-.12-.43-.19-.65-.27l-2.18-.72a.8.8 0 0 1-.53-.74c0-.5.46-.87.95-.77l1.89.41.22.04c2.1.44 4.28.44 6.38 0l.22-.04 1.89-.41c.43-.09.84.18.93.6.01.05.02.12.02.17 0 .33-.22.63-.53.74"/>
                    <path class="fill-none" d="M19.45 14.5c1.58.8 2.55 1.85 2.55 3 0 2.49-4.48 4.5-10 4.5S2 19.99 2 17.5c0-1.15.96-2.2 2.55-3"/>
                </svg>
                프로그램
            </a>
        </li>
        <li class="quick-menu__item">
            <a class="quick-menu__link" 
               href="#">
                <svg class="icon--education icon--quick-menu icon" 
                     viewBox="0 0 24 24"
                     xmlns="http://www.w3.org/2000/svg"
                     aria-hidden="true"
                     focusable="false">
                    <path d="M12 21C10.204 21 7.8537 19.8787 6.38533 19.0656C5.5035 18.5772 5 17.6334 5 16.6254V11.5H19V16.6254C19 17.6334 18.4965 18.5772 17.6147 19.0656C16.1463 19.8787 13.796 21 12 21Z"/>
                    <path d="M9.78272 3.49965C11.2037 2.83345 12.7962 2.83345 14.2172 3.49965L20.9084 6.63664C22.3639 7.31899 22.3639 9.68105 20.9084 10.3634L14.2173 13.5003C12.7963 14.1665 11.2038 14.1665 9.78281 13.5003L3.0916 10.3634C1.63613 9.68101 1.63614 7.31895 3.0916 6.63659L9.78272 3.49965Z"/>
                    <path d="M2 8.5V14"/>
                </svg>
                평생교육
            </a>
        </li>
        <li class="quick-menu__item">
            <a class="quick-menu__link" 
               href="#">
                <svg class="icon--contact icon--quick-menu icon" 
                     viewBox="0 0 24 24"
                     xmlns="http://www.w3.org/2000/svg"
                     aria-hidden="true"
                     focusable="false">
                    <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 13.5997 2.37562 15.1116 3.04346 16.4525C3.22094 16.8088 3.28001 17.2161 3.17712 17.6006L2.58151 19.8267C2.32295 20.793 3.20701 21.677 4.17335 21.4185L6.39939 20.8229C6.78393 20.72 7.19121 20.7791 7.54753 20.9565C8.88836 21.6244 10.4003 22 12 22Z"/>
                    <path d="M8 12H8.009M11.991 12H12M15.991 12H16"/>
                </svg>
                문의하기
            </a>
        </li>
    </ul>
</nav>

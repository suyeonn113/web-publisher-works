
<?php
$isLoggedIn = isset($_SESSION['member_id']);
$loginState = $isLoggedIn ? 'logged-in' : 'logged-out';
$loginHref = $isLoggedIn ? BASE_URL . '/pages/mypage.php' : BASE_URL . '/pages/login.php';
$loginLabel = $isLoggedIn ? '마이페이지' : '로그인';
?>

<!-- Skip Link -->
<div class="skip-links" aria-label="바로가기 링크">
    <a href="#gnb" class="skip-links__link">메뉴 바로가기</a>
    <a href="#main" class="skip-links__link">본문 바로가기</a>
</div>

<!-- Header -->
<header>
    <!-- Logo -->
    <h1 class="logo font-brand"><a href="<?= BASE_URL ?>/index.php">FRAGFARM</a></h1>
    <!-- Main Menu -->
    <button id="header-menu" class="header__menu" 
            aria-label="메뉴 열기" aria-expanded="false">
        <svg viewBox="0 0 24 20" xmlns="http://www.w3.org/2000/svg" 
             aria-hidden="true" focusable="false">
            <g data-state="closed">
                <path d="M11.4976 4.02856L11.4976 8.02856"/>
                <path d="M3.99756 8.62854H18.9976V17.8552C18.9976 18.1611 18.876 18.4544 18.6596 18.6707C18.4432 18.887 18.1497 19.0085 17.8437 19.0085H5.1514C4.84539 19.0085 4.5519 18.887 4.33551 18.6707C4.11912 18.4544 3.99756 18.1611 3.99756 17.8552V8.62854Z" />
                <path d="M3.99756 8.61541L5.72833 5.28078C5.91492 4.90493 6.20045 4.58708 6.5542 4.3614C6.90796 4.13573 7.31655 4.01078 7.73602 4H15.2591C15.6884 4.00023 16.1092 4.12022 16.474 4.34648C16.8389 4.57274 17.1334 4.8963 17.3245 5.28078L18.9976 8.61541"/>
            </g>
            <g data-state="open">
                <path d="M3.99756 8.6286H18.9976V17.8553C18.9976 18.1612 18.876 18.4545 18.6596 18.6708C18.4432 18.8871 18.1497 19.0086 17.8437 19.0086H5.1514C4.84539 19.0086 4.5519 18.8871 4.33551 18.6708C4.11912 18.4545 3.99756 18.1612 3.99756 17.8553V8.6286Z"/>
                <path d="M3.99756 8.61541L5.72833 5.28078C5.91492 4.90493 6.20045 4.58708 6.5542 4.3614C6.90796 4.13573 7.31655 4.01078 7.73602 4H15.2591C15.6884 4.00023 16.1092 4.12022 16.474 4.34648C16.8389 4.57274 17.1334 4.8963 17.3245 5.28078L18.9976 8.61541"/>
                <path d="M19.0393 8.60625C19.4786 7.47947 20.3327 6.46085 21.4514 5.72954C21.5801 5.64904 21.6782 5.5336 21.7267 5.40551C21.7751 5.27741 21.7705 5.14574 21.7138 5.03591L19.8937 1.44591C19.8611 1.38149 19.8116 1.32654 19.7488 1.28485C19.686 1.24315 19.6112 1.2157 19.5298 1.20437C19.4497 1.19327 19.3651 1.19798 19.2813 1.2182C19.1976 1.23842 19.1168 1.27368 19.0442 1.32164C17.9886 2.04886 17.1847 3.03316 16.7624 4.1154L19.0393 8.60625Z"/>
                <path d="M4.06768 8.60625C3.62834 7.47947 2.77421 6.46085 1.65551 5.72954C1.52679 5.64904 1.42874 5.5336 1.38028 5.40551C1.33182 5.27741 1.3364 5.14574 1.39311 5.03591L3.21322 1.44591C3.24587 1.38149 3.29531 1.32654 3.35814 1.28485C3.42097 1.24315 3.49569 1.2157 3.57716 1.20437C3.65719 1.19327 3.74188 1.19798 3.8256 1.2182C3.90933 1.23842 3.99018 1.27368 4.06277 1.32164C5.11834 2.04886 5.92224 3.03316 6.34451 4.1154L4.06768 8.60625Z"/>
            </g>
        </svg>
    </button>
    <!-- Menu Drawer -->
    <nav class="header__gnb" id="gnb">
        <ul class="gnb__list">
            <li class="gnb__item">
                <a class="gnb__link" href="<?= BASE_URL ?>/pages/about.php">about us</a>
            </li>
            <li class="gnb__item">
                <a class="gnb__link" href="<?= BASE_URL ?>/pages/product.php">SHOP</a>
            </li>
            <li class="gnb__item">
                <a class="gnb__link" href="#">review</a>
            </li>
            <li class="gnb__item gnb__item--has-sub">
                <button class="gnb__toggle" 
                        type="button" 
                        aria-expanded="false" 
                        aria-controls="submenu-season">
                    season book
                    <img class="toggle-btn" src="<?= BASE_URL ?>/assets/icons/expand.svg" alt="" aria-hidden="true">
                </button>
                <ul id="submenu-season" class="gnb__sublist" hidden>
                    <li class="gnb__subitem">
                        <a class="gnb__link gnb__sublink" href="#">
                            2025 S/S Sentimental Rose
                        </a>
                    </li>
                </ul>
            </li>
            <li class="gnb__item gnb__item--has-sub">
                <button class="gnb__toggle" 
                        type="button" 
                        aria-expanded="false" 
                        aria-controls="submenu-cs">
                    customer service
                    <img class="toggle-btn" src="<?= BASE_URL ?>/assets/icons/expand.svg" alt="" aria-hidden="true">
                </button>
                <ul id="submenu-cs" class="gnb__sublist" hidden>
                    <li class="gnb__subitem">
                        <a class="gnb__link gnb__sublink" href="#">
                            QnA
                        </a>
                    </li>
                    <li class="gnb__subitem">
                        <a class="gnb__link gnb__sublink" href="<?= BASE_URL ?>/pages/mypage.php">
                            my page
                        </a>
                    </li>
                </ul>
            </li>
            <li class="gnb__instagram">
                <a class="instagram" aria-label="인스타그램" href="https://www.instagram.com/fragfarm.house?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==">
                <img src="<?= BASE_URL ?>/assets/icons/instagram.svg" alt="" aria-hidden="true">
                </a>   
            </li>
            <li class="gnb__search">
                <form class="search" role="search" action="<?= BASE_URL ?>/pages/search.php" method="get">
                    <label class="search__label visually-hidden" for="search">검색어 입력</label>
                    <div class="search__bar">
                        <input 
                            class="search__input" 
                            type="search" 
                            name="q" 
                            id="search" 
                            placeholder="What are you looking for?">
                        <button class="search__btn" type="submit" aria-label="검색">
                            <img src="<?= BASE_URL ?>/assets/icons/search.svg" alt="" aria-hidden="true">
                        </button>
                    </div>
                </form>    
            </li>
        </ul>
    </nav>
    <!-- Avtion Menu -->
    <div class="header__actions">
        <a class="login" 
           data-state="<?= $loginState ?>" 
           aria-label="<?= $loginLabel ?>" 
           href="<?= $loginHref ?>">
            <svg viewBox="0 0 24 24" fill="none"
                xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
                <g transform="translate(0 -17)" data-icon="logged-out">
                    <path d="M10.0286 30.5429L18.4286 22.1429L21.2857 25" 
                            stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M15.2143 25.3572L17.7143 27.8572" 
                            stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M7.00001 37.8572C9.36694 37.8572 11.2857 35.9384 11.2857 33.5715C11.2857 31.2045 9.36694 29.2858 7.00001 29.2858C4.63307 29.2858 2.71429 31.2045 2.71429 33.5715C2.71429 35.9384 4.63307 37.8572 7.00001 37.8572Z" 
                            stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>
                </g>
                <g transform="translate(0 2)" data-icon="logged-in">
                    <path d="M2.71429 12.8571L12 3.57141L21.2857 12.8571"
                            stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M5.57141 10V19.2857H18.4286V10"
                            stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M12 19.2857V13.5714"
                            stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>
                </g>
            </svg>
        </a>
        <a class="cart" aria-label="장바구니" href="#" >
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
                <g transform="translate(0 4)">
                    <path d="M19.1433 0.5H15.5719L14.329 12.8571C14.2773 13.1978 14.1043 13.5083 13.8418 13.7314C13.5793 13.9546 13.2449 14.0753 12.9004 14.0714H3.90043C3.5889 14.0877 3.28062 14.0015 3.02266 13.8261C2.76471 13.6507 2.57125 13.3957 2.47186 13.1L0.571856 7.38571C0.501015 7.17088 0.482206 6.94229 0.516977 6.71876C0.551747 6.49524 0.639104 6.28317 0.771856 6.1C0.910153 5.90526 1.09507 5.7483 1.3097 5.64348C1.52433 5.53866 1.76181 5.48933 2.00043 5.5H15.0719" 
                            stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M4.14327 19.0715C4.53776 19.0715 4.85756 18.7517 4.85756 18.3572C4.85756 17.9627 4.53776 17.6429 4.14327 17.6429C3.74878 17.6429 3.42899 17.9627 3.42899 18.3572C3.42899 18.7517 3.74878 19.0715 4.14327 19.0715Z" 
                            stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M13.429 19.0715C13.8235 19.0715 14.1433 18.7517 14.1433 18.3572C14.1433 17.9627 13.8235 17.6429 13.429 17.6429C13.0345 17.6429 12.7147 17.9627 12.7147 18.3572C12.7147 18.7517 13.0345 19.0715 13.429 19.0715Z" 
                            stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>
                </g>
            </svg>
            <span class="cart__badge">2</span>
        </a>
    </div>
</header>

<?php
include __DIR__ . '/../includes/config.php';

$pageTitle = 'Fragfarm';
$pageCss = 'login.css';
?>

<!DOCTYPE html>
<html lang="ko">

<!------------ Head ------------>
<?php include __DIR__ . '/../includes/head.php'; ?>

<body>
<div class="mobile-shell">

    <!-- Header -->
    <?php include __DIR__ . '/../includes/header.php'; ?>

    <main id="main">
        <div class="page-heading page-heading--plain">
            <h1 class="page-heading__title">LOGIN</h1>
        </div>

        <form class="login-form" method="post" action="<?= BASE_URL ?>/actions/login_process.php" data-demo-login>
            <label class="login__label" 
                   for="login-id">ID</label>
            <input id="login-id" 
                   name="user_id" 
                   class="login__input"
                   type="text"
                   autocomplete="username"
                   required>

            <label class="login__label" 
                   for="login-password">Password</label>
            <input id="login-password" 
                   name="password" 
                   class="login__input"
                   type="password"
                   autocomplete="current-password"
                   required>

            <button class="btn login__button" type="submit">LOGIN</button>
        </form>
        <a class="join-link"
           href="<?= BASE_URL ?>/pages/join.php">
           SIGN UP
        </a>

        <div class="login-help" aria-label="로그인 보조 메뉴">
            <a class="login-help__link" href="<?= BASE_URL ?>/pages/find_id.php">아이디 찾기</a>
            <a class="login-help__link" href="<?= BASE_URL ?>/pages/find_password.php">비밀번호 찾기</a>
            <button class="login-help__link" type="button" data-global-placeholder data-placeholder-message="비회원 주문 조회 기능은 준비 중입니다.">비회원 주문 조회하기</button>
        </div>
        
        <section class="social-login" aria-labelledby="social-login-title">
            <h2 id="social-login-title" class="social-login__title visually-hidden">간편 로그인</h2>
            <ul class="social-login__list">
                <li>
                    <button class="social-login__link social-login__link--naver"
                        type="button"
                        data-global-placeholder
                        data-placeholder-message="네이버 간편 로그인은 준비 중입니다."
                        aria-label="네이버로 로그인">
                        <svg viewBox="5 4 14 16" aria-hidden="true" focusable="false">
                            <path d="M6 5h4.2l3.9 5.7V5H18v14h-4.2l-3.9-5.7V19H6V5Z"/>
                        </svg>
                    </button>
                </li>
                <li>
                    <button class="social-login__link social-login__link--kakao"
                        type="button"
                        data-global-placeholder
                        data-placeholder-message="카카오 간편 로그인은 준비 중입니다."
                        aria-label="카카오로 로그인">
                        <svg viewBox="3 4 18 17" aria-hidden="true" focusable="false">
                            <path d="M12 5.25c-4.42 0-8 2.82-8 6.3 0 2.25 1.51 4.23 3.78 5.35l-.77 2.82c-.07.25.21.45.43.31l3.37-2.22c.39.04.78.06 1.19.06 4.42 0 8-2.82 8-6.32s-3.58-6.3-8-6.3Z"/>
                        </svg>
                    </button>
                </li>
                <li>
                    <button class="social-login__link social-login__link--facebook"
                        type="button"
                        data-global-placeholder
                        data-placeholder-message="페이스북 간편 로그인은 준비 중입니다."
                        aria-label="페이스북으로 로그인">
                        <svg viewBox="7 4 10 16" aria-hidden="true" focusable="false">
                            <path d="M13.65 19v-6.38h2.14l.32-2.49h-2.46V8.54c0-.72.2-1.21 1.24-1.21h1.33V5.1c-.23-.03-1.02-.1-1.94-.1-1.92 0-3.24 1.17-3.24 3.33v1.8H8.86v2.49h2.18V19h2.61Z"/>
                        </svg>
                    </button>
                </li>
                <li>
                    <button class="social-login__link social-login__link--google"
                        type="button"
                        data-global-placeholder
                        data-placeholder-message="구글 간편 로그인은 준비 중입니다."
                        aria-label="구글로 로그인">
                        <svg viewBox="0 0 18 18" aria-hidden="true" focusable="false">
                            <path fill="#4285f4" d="M17.64 9.205c0-.638-.057-1.252-.164-1.841H9v3.481h4.844c-.209 1.125-.843 2.078-1.797 2.716v2.258h2.909c1.702-1.567 2.684-3.875 2.684-6.614Z"/>
                            <path fill="#34a853" d="M9 18c2.43 0 4.467-.806 5.956-2.181l-2.909-2.258c-.806.54-1.835.859-3.047.859-2.344 0-4.328-1.584-5.037-3.711H.956v2.332A9 9 0 0 0 9 18Z"/>
                            <path fill="#fbbc05" d="M3.963 10.709A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.169.281-1.709V4.959H.956A9 9 0 0 0 0 9c0 1.452.347 2.827.956 4.041l3.007-2.332Z"/>
                            <path fill="#ea4335" d="M9 3.58c1.321 0 2.507.454 3.441 1.345l2.581-2.581C13.463.891 11.426 0 9 0A9 9 0 0 0 .956 4.959l3.007 2.332C4.672 5.164 6.656 3.58 9 3.58Z"/>
                        </svg>
                    </button>
                </li>
            </ul>
        </section>
    </main>

    <!-- Footer -->
    <?php include __DIR__ . '/../includes/footer.php'; ?>
    <?php include __DIR__ . '/../includes/chat-launcher.php'; ?>
</div>

<script src="<?= BASE_URL ?>/js/header.js"></script>
</body>
</html>

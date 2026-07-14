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
        <h1 class="page-title">LOGIN</h1>

        <form class="login-form" method="post" action="<?= BASE_URL ?>/actions/login_process.php">
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

            <button class="login__button" type="submit">LOGIN</button>
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
                        <img src="<?= BASE_URL ?>/assets/icons/social-login-naver.png" alt="">
                    </button>
                </li>
                <li>
                    <button class="social-login__link social-login__link--kakao"
                        type="button"
                        data-global-placeholder
                        data-placeholder-message="카카오 간편 로그인은 준비 중입니다."
                        aria-label="카카오로 로그인">
                        <img src="<?= BASE_URL ?>/assets/icons/social-login-kakao.png" alt="">
                    </button>
                </li>
                <li>
                    <button class="social-login__link social-login__link--facebook"
                        type="button"
                        data-global-placeholder
                        data-placeholder-message="페이스북 간편 로그인은 준비 중입니다."
                        aria-label="페이스북으로 로그인">
                        <img src="<?= BASE_URL ?>/assets/icons/social-login-facebook.png" alt="">
                    </button>
                </li>
                <li>
                    <button class="social-login__link social-login__link--google"
                        type="button"
                        data-global-placeholder
                        data-placeholder-message="구글 간편 로그인은 준비 중입니다."
                        aria-label="구글로 로그인">
                        <img src="<?= BASE_URL ?>/assets/icons/social-login-google.png" alt="">
                    </button>
                </li>
            </ul>
        </section>
    </main>

    <!-- Footer -->
    <?php include __DIR__ . '/../includes/footer.php'; ?>
</div>

<script src="<?= BASE_URL ?>/js/header.js"></script>
</body>
</html>

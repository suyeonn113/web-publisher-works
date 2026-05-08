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
                   type="text" >

            <label class="login__label" 
                   for="login-password">Password</label>
            <input id="login-password" 
                   name="password" 
                   class="login__input"
                   type="password">

            <button class="login__button" type="submit">LOGIN</button>
        </form>
        <a class="join-link"
           href="<?= BASE_URL ?>/pages/join.php">
           SIGN UP
        </a>

        <div class="login-help" aria-label="로그인 보조 메뉴">
            <a class="login-help__link" href="<?= BASE_URL ?>/pages/find_id.php">아이디 찾기</a>
            <a class="login-help__link" href="<?= BASE_URL ?>/pages/find_password.php">비밀번호 찾기</a>
            <a class="login-help__link" href="#">비회원 주문 조회하기</a>
        </div>
        
        <section class="social-login" aria-labelledby="social-login-title">
            <h2 id="social-login-title" class="social-login__title visually-hidden">간편 로그인</h2>
            <ul class="social-login__list">
                <li>
                    <a class="social-login__link social-login__link--naver"
                        href="#"
                        aria-label="네이버로 로그인">
                        <img src="<?= BASE_URL ?>/assets/icons/social-login-naver.png" alt="">
                    </a>
                </li>
                <li>
                    <a class="social-login__link social-login__link--kakao"
                        href="#"
                        aria-label="카카오로 로그인">
                        <img src="<?= BASE_URL ?>/assets/icons/social-login-kakao.png" alt="">
                    </a>
                </li>
                <li>
                    <a class="social-login__link social-login__link--facebook"
                        href="#"
                        aria-label="페이스북으로 로그인">
                        <img src="<?= BASE_URL ?>/assets/icons/social-login-facebook.png" alt="">
                    </a>
                </li>
                <li>
                    <a class="social-login__link social-login__link--google"
                        href="#"
                        aria-label="구글로 로그인">
                        <img src="<?= BASE_URL ?>/assets/icons/social-login-google.png" alt="">
                    </a>
                </li>
            </ul>
        </section>
    </main>

    <!-- Footer -->
    <?php include __DIR__ . '/../includes/footer.php'; ?>
</div>

<!-- JS -->
<!-- <script src="<?= BASE_URL ?>/js/join.js"></script> -->
<script src="<?= BASE_URL ?>/js/header.js"></script>
</body>
</html>

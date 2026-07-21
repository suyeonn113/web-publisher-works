<?php
include __DIR__ . '/includes/config.php';

$pageTitle = '로그인 | 시립서울청소년센터';
$pageCss = 'login.css';
?>

<!DOCTYPE html>
<html lang="ko">

<?php include __DIR__ . '/includes/head.php'; ?>

<body>
<?php include __DIR__ . '/includes/global-nav.php'; ?>

<main id="main" class="login-page">
    <header class="login-heading" aria-labelledby="login-title">
        <div class="login-heading__inner inner">
            <p>MEMBER LOGIN</p>
            <h1 id="login-title">로그인</h1>
        </div>
    </header>

    <div class="login-shell inner">
        <section class="login-card" aria-labelledby="login-form-title">
            <h2 id="login-form-title" class="visually-hidden">회원 로그인</h2>
            <form class="login-form" action="<?= BASE_URL ?>/login.php" method="post">
                <div class="login-field">
                    <label for="login-id">아이디</label>
                    <input
                        id="login-id"
                        name="user_id"
                        type="text"
                        autocomplete="username"
                        placeholder="아이디를 입력해주세요"
                        required>
                </div>

                <div class="login-field">
                    <label for="login-password">비밀번호</label>
                    <input
                        id="login-password"
                        name="user_password"
                        type="password"
                        autocomplete="current-password"
                        placeholder="비밀번호를 입력해주세요"
                        required>
                </div>

                <label class="login-save" for="save-login-id">
                    <input id="save-login-id" name="save_login_id" type="checkbox">
                    <span>아이디 저장</span>
                </label>

                <button class="login-submit" type="submit">로그인</button>
            </form>

            <nav class="login-account-links" aria-label="계정 도움말">
                <a href="#">아이디 찾기</a>
                <a href="#">비밀번호 찾기</a>
                <a href="#">회원가입</a>
            </nav>

            <div class="login-contact">
                <strong>로그인 이용 문의</strong>
                <a href="tel:0222672914">02-2267-2914</a>
            </div>
        </section>
    </div>
</main>

<?php include __DIR__ . '/includes/footer.php'; ?>
<script src="<?= BASE_URL ?>/js/global-nav.js"></script>
<script src="<?= BASE_URL ?>/js/header-search.js"></script>
</body>
</html>

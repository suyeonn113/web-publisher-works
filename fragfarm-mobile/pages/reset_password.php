<?php
include __DIR__ . '/../includes/config.php';

if (empty($_SESSION['password_reset_member_id'])) {
    header('Location: ' . BASE_URL . '/pages/find_password.php');
    exit;
}

$pageTitle = 'Reset Password | Fragfarm';
$pageCss = 'account-help.css';
?>

<!DOCTYPE html>
<html lang="ko">

<?php include __DIR__ . '/../includes/head.php'; ?>

<body>
<div class="mobile-shell">
    <?php include __DIR__ . '/../includes/header.php'; ?>

    <main id="main" class="account-help">
        <section class="account-help__inner" aria-labelledby="reset-password-title">
            <h2 id="reset-password-title" class="account-help__title">RESET PASSWORD</h2>
            <p class="account-help__lead">새 비밀번호를 입력해주세요.</p>

            <form class="account-help-form" action="<?= BASE_URL ?>/actions/reset_password_process.php" method="post">
                <div class="account-help-form__group">
                    <label class="account-help-form__label" for="new-password">NEW PASSWORD</label>
                    <input id="new-password" class="account-help-form__input" name="new_password" type="password" autocomplete="new-password" placeholder="영문, 숫자, 특수문자 포함 10자 이상 입력" required>
                </div>

                <div class="account-help-form__group">
                    <label class="account-help-form__label" for="confirm-password">CONFIRM PASSWORD</label>
                    <input id="confirm-password" class="account-help-form__input" name="confirm_password" type="password" autocomplete="new-password" placeholder="영문, 숫자, 특수문자 포함 10자 이상 입력" required>
                </div>

                <button class="account-help-form__button account-help-form__button--primary" type="submit">SAVE PASSWORD</button>
            </form>
        </section>
    </main>

    <?php include __DIR__ . '/../includes/footer.php'; ?>
</div>

<script src="<?= BASE_URL ?>/js/header.js"></script>
</body>
</html>

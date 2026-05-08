<?php
include __DIR__ . '/../includes/config.php';

$pageTitle = 'Find ID | Fragfarm';
$pageCss = 'account-help.css';
?>

<!DOCTYPE html>
<html lang="ko">

<?php include __DIR__ . '/../includes/head.php'; ?>

<body>
<div class="mobile-shell">
    <?php include __DIR__ . '/../includes/header.php'; ?>

    <main id="main" class="account-help">
        <section class="account-help__inner" aria-labelledby="find-id-title">
            <h2 id="find-id-title" class="account-help__title">FIND ID</h2>
            <p class="account-help__lead">가입 시 입력한 이름과 전화번호를 입력해주세요.</p>

            <form class="account-help-form" action="<?= BASE_URL ?>/actions/find_id_process.php" method="post">
                <div class="account-help-form__group">
                    <label class="account-help-form__label" for="user-name">NAME</label>
                    <input id="user-name" class="account-help-form__input" name="user_name" type="text" autocomplete="name" placeholder="실명 입력" required>
                </div>

                <div class="account-help-form__group">
                    <label class="account-help-form__label" for="phone">PHONE</label>
                    <input id="phone" class="account-help-form__input" name="phone" type="tel" inputmode="numeric" autocomplete="tel" placeholder="'-' 없이 입력" required>
                </div>

                <button class="account-help-form__button account-help-form__button--primary" type="submit">FIND ID</button>
            </form>
        </section>
    </main>

    <?php include __DIR__ . '/../includes/footer.php'; ?>
</div>

<script src="<?= BASE_URL ?>/js/header.js"></script>
</body>
</html>

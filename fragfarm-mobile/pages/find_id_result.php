<?php
include __DIR__ . '/../includes/config.php';

if (empty($_SESSION['found_user_id'])) {
    header('Location: ' . BASE_URL . '/pages/find_id.php');
    exit;
}

$foundUserId = $_SESSION['found_user_id'];
unset($_SESSION['found_user_id']);

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
        <section class="account-help__inner" aria-labelledby="find-id-result-title">
            <h2 id="find-id-result-title" class="account-help__title">FIND ID</h2>
            <p class="account-help__result">회원님의 아이디는 <strong><?= htmlspecialchars($foundUserId, ENT_QUOTES, 'UTF-8') ?></strong> 입니다.</p>

            <div class="account-help__actions">
                <a class="account-help__link" href="<?= BASE_URL ?>/pages/login.php">LOGIN</a>
                <a class="account-help__link" href="<?= BASE_URL ?>/pages/find_password.php">FIND PASSWORD</a>
            </div>
        </section>
    </main>

    <?php include __DIR__ . '/../includes/footer.php'; ?>
</div>

<script src="<?= BASE_URL ?>/js/header.js"></script>
</body>
</html>

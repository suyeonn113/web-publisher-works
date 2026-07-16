<?php
include __DIR__ . '/../includes/config.php';

$pageTitle = 'Fragfarm';
$pageCss = 'about.css';
?>

<!DOCTYPE html>
<html lang="ko">

<!------------ Head ------------>
<?php include __DIR__ . '/../includes/head.php'; ?>

<body>
<div class="mobile-shell">
    <!-- Header -->
    <?php include __DIR__ . '/../includes/header.php'; ?>

    <main id="main" class="about-page">
        <article>
        <h1 class="visually-hidden">About FRAGFARM</h1>
        <div class="about__text">
            <p>계절은 늘 끝 없는 순환을 겪습니다.</p>
            <p>봄의 생명을 낳고</p>
            <p>여름은 성장의 정점을 가져옵니다.</p>
            <p>가을에는 열매라는 결실을 맺고</p>
            <p>겨울에는 새로이 다가올 생명을 위해<br>거름으로 점점 변해갑니다.</p>
            <p>우리는 때때로 지나간 계절을<br>그리워하고</p>
            <p>곧 다가올 계절을 기다리며<br>설레여하기도 합니다.</p>
            <p>우리가 늘 사계절 속에 머물러 있듯이,</p>
            <p>자연의 순환 속에서<br>볼 수 있는 과정들과 순간들을<br>다양한 의류에 기록하고 소개합니다.</p>
        </div>
    </article>
    </main>

    <!-- Footer -->
    <?php include __DIR__ . '/../includes/footer.php'; ?>

    <!-- Chat Launcher -->
    <?php include __DIR__ . '/../includes/chat-launcher.php'; ?>
  <script src="<?= BASE_URL ?>/js/header.js"></script>
</div>
</body>
</html>

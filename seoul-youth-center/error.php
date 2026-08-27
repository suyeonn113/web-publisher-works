<?php
include __DIR__ . '/includes/config.php';

http_response_code(500);

$pageTitle = '페이지를 불러올 수 없습니다 | 시립서울청소년센터';
$pageCss = ['status.css'];
?>

<!DOCTYPE html>
<html lang="ko">

<?php include __DIR__ . '/includes/head.php'; ?>

<body>
<?php include __DIR__ . '/includes/global-nav.php'; ?>

<main id="main" class="status-page" role="status">
    <div class="status-page__inner">
        <h1 class="type-page-title">페이지를 불러올 수 없습니다</h1>
        <p class="type-body-lg">
            <span>일시적인 오류로 요청한 화면을 표시하지 못했습니다.</span>
            <span>잠시 후 다시 시도하거나 메인으로 돌아가 주세요.</span>
        </p>
        <div class="status-page__actions">
            <a class="control control--primary" href="<?= BASE_URL ?>/index.php">메인으로 돌아가기</a>
            <a class="control control--muted" href="<?= BASE_URL ?>/programs.php">프로그램 보기</a>
        </div>
    </div>
</main>

<?php include __DIR__ . '/includes/footer.php'; ?>

<script src="<?= BASE_URL ?>/js/global-nav.js"></script>
<script src="<?= BASE_URL ?>/js/header-search.js"></script>
</body>
</html>

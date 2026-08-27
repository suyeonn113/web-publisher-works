<?php
include __DIR__ . '/includes/config.php';

http_response_code(404);

$pageTitle = '페이지를 찾을 수 없습니다 | 시립서울청소년센터';
$pageCss = ['status.css'];
?>

<!DOCTYPE html>
<html lang="ko">

<?php include __DIR__ . '/includes/head.php'; ?>

<body>
<?php include __DIR__ . '/includes/global-nav.php'; ?>

<main id="main" class="status-page" role="status">
    <div class="status-page__inner">
        <h1 class="type-page-title">페이지를 찾을 수 없습니다</h1>
        <p class="type-body-lg">
            <span>요청한 페이지가 삭제되었거나 주소가 변경되었을 수 있습니다.</span>
            <span>주소를 다시 확인하거나 메인으로 돌아가 주세요.</span>
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

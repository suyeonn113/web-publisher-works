<?php
include __DIR__ . '/../includes/config.php';

if (empty($_SESSION['member_id'])) {
    header('Location: ' . BASE_URL . '/pages/login.php');
    exit;
}

$pageTitle = 'Orders | Fragfarm';
$pageCss = 'shop-pages.css';
?>

<!DOCTYPE html>
<html lang="ko">
<?php include __DIR__ . '/../includes/head.php'; ?>
<body>
<div class="mobile-shell">
    <?php include __DIR__ . '/../includes/header.php'; ?>

    <main id="main" class="orders-page">
        <h2 class="page-title">ORDERS</h2>

        <nav class="orders-tabs" aria-label="주문 내역 유형">
            <a href="#" aria-current="page">주문 내역 조회 (0)</a>
            <a href="#">취소 / 반품 / 교환 내역 (0)</a>
            <a href="#">과거 주문 내역 (0)</a>
        </nav>

        <form class="orders-filter">
            <button type="button">오늘</button>
            <button type="button">1개월</button>
            <button type="button">3개월</button>
            <button type="button">6개월</button>
            <span>2025. 10. 29</span>
            <span>-</span>
            <span>2026. 1. 29</span>
            <button type="button">검색</button>
        </form>

        <p class="orders-empty">주문 내역이 없습니다.</p>

        <nav class="pagination" aria-label="주문 페이지 이동">
            <a class="pagination__btn" href="#">&laquo;</a>
            <a href="#" aria-current="page">1</a>
            <a class="pagination__btn" href="#">&raquo;</a>
        </nav>
    </main>

    <?php include __DIR__ . '/../includes/footer.php'; ?>
</div>
<script src="<?= BASE_URL ?>/js/header.js"></script>
</body>
</html>

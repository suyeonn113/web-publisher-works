<?php
require_once __DIR__ . '/../includes/config.php';
require_once __DIR__ . '/../includes/dbconn.php';
require_once __DIR__ . '/../includes/services/product-feedback.php';
if ($_SERVER['REQUEST_METHOD'] !== 'POST' || empty($_SESSION['member_id']) || !hash_equals($_SESSION['product_feedback_csrf'] ?? '', $_POST['csrf_token'] ?? '')) { http_response_code(403); exit('잘못된 요청입니다.'); }
$reviewId = (int) ($_POST['review_id'] ?? 0);
$productId = trim($_POST['product_id'] ?? '');
$memberId = (int) $_SESSION['member_id'];
$stmt = mysqli_prepare($mysqli, 'DELETE FROM fragfarm_product_reviews WHERE id = ? AND member_id = ?');
mysqli_stmt_bind_param($stmt, 'ii', $reviewId, $memberId);
mysqli_stmt_execute($stmt);
$reviewDeleted = mysqli_stmt_affected_rows($stmt) === 1;
mysqli_stmt_close($stmt);
if ($reviewDeleted && feedback_table_exists($mysqli, 'fragfarm_review_comments')) {
    $reviewKey = 'db-' . $reviewId;
    $stmt = mysqli_prepare($mysqli, 'DELETE FROM fragfarm_review_comments WHERE product_id = ? AND review_key = ?');
    mysqli_stmt_bind_param($stmt, 'ss', $productId, $reviewKey);
    mysqli_stmt_execute($stmt);
    mysqli_stmt_close($stmt);
}
mysqli_close($mysqli);
header('Location: ' . BASE_URL . '/pages/product-detail.php?id=' . rawurlencode($productId) . '#review-title');
exit;

<?php
require_once __DIR__ . '/../includes/config.php';
require_once __DIR__ . '/../includes/security.php';
require_once __DIR__ . '/../includes/dbconn.php';

$productId = trim($_POST['product_id'] ?? '');
$reviewKey = trim($_POST['review_key'] ?? '');
$anchor = preg_match('/^db-(\d+)$/', $reviewKey, $anchorMatch) ? 'review-' . $anchorMatch[1] : 'review-' . $reviewKey;
$redirect = preg_match('/^moment-\d{3}$/', $reviewKey)
    ? BASE_URL . '/pages/review-detail.php?id=' . rawurlencode($reviewKey) . '#comments-title'
    : BASE_URL . '/pages/product-detail.php?id=' . rawurlencode($productId) . '#' . rawurlencode($anchor);

if ($_SERVER['REQUEST_METHOD'] !== 'POST' || empty($_SESSION['member_id']) || !csrf_verify('product_feedback', $_POST['csrf_token'] ?? null)) {
    http_response_code(403);
    exit('잘못된 요청입니다.');
}

$commentId = (int) ($_POST['comment_id'] ?? 0);
$memberId = (int) $_SESSION['member_id'];
$stmt = mysqli_prepare($mysqli, 'DELETE FROM fragfarm_review_comments WHERE id = ? AND member_id = ? AND product_id = ? AND review_key = ?');
mysqli_stmt_bind_param($stmt, 'iiss', $commentId, $memberId, $productId, $reviewKey);
mysqli_stmt_execute($stmt);
mysqli_stmt_close($stmt);
mysqli_close($mysqli);
header('Location: ' . $redirect);
exit;

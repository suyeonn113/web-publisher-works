<?php
require_once __DIR__ . '/../includes/config.php';
require_once __DIR__ . '/../includes/dbconn.php';
require_once __DIR__ . '/../includes/data/products.php';
require_once __DIR__ . '/../includes/data/reviews.php';
require_once __DIR__ . '/../includes/services/shop-state.php';
require_once __DIR__ . '/../includes/services/product-feedback.php';

$productId = trim($_POST['product_id'] ?? '');
$reviewKey = trim($_POST['review_key'] ?? '');
$isMomentReview = preg_match('/^moment-\d{3}$/', $reviewKey) === 1;
$anchor = preg_match('/^db-(\d+)$/', $reviewKey, $anchorMatch) ? 'review-' . $anchorMatch[1] : 'review-' . $reviewKey;
$redirect = $isMomentReview
    ? BASE_URL . '/pages/review-detail.php?id=' . rawurlencode($reviewKey) . '#comments-title'
    : BASE_URL . '/pages/product-detail.php?id=' . rawurlencode($productId) . '#' . rawurlencode($anchor);

if ($_SERVER['REQUEST_METHOD'] !== 'POST' || empty($_SESSION['member_id'])) {
    header('Location: ' . BASE_URL . '/pages/login.php');
    exit;
}

if (!hash_equals($_SESSION['product_feedback_csrf'] ?? '', $_POST['csrf_token'] ?? '')) {
    $_SESSION['feedback_error'] = '요청이 만료되었습니다.';
    header('Location: ' . $redirect);
    exit;
}

$content = trim($_POST['comment'] ?? '');
$validTarget = in_array($reviewKey, ['sample-1', 'sample-2', 'sample-3'], true);

if ($isMomentReview) {
    $momentReview = findReviewById($reviews, $reviewKey);
    $validTarget = $momentReview !== null && (string) ($momentReview['product_id'] ?? '') === $productId;
}

if (preg_match('/^db-(\d+)$/', $reviewKey, $matches)) {
    $reviewId = (int) $matches[1];
    $stmt = mysqli_prepare($mysqli, 'SELECT id FROM fragfarm_product_reviews WHERE id = ? AND product_id = ? LIMIT 1');
    mysqli_stmt_bind_param($stmt, 'is', $reviewId, $productId);
    mysqli_stmt_execute($stmt);
    $validTarget = mysqli_stmt_get_result($stmt)->num_rows === 1;
    mysqli_stmt_close($stmt);
}

if (!shop_find_product($products, $productId) || !$validTarget || $content === '' || mb_strlen($content) > 500) {
    $_SESSION['feedback_error'] = '댓글 내용을 확인해주세요.';
    header('Location: ' . $redirect);
    exit;
}

if (!feedback_table_exists($mysqli, 'fragfarm_review_comments')) {
    $_SESSION['feedback_error'] = '리뷰 댓글 테이블을 먼저 추가해주세요.';
    header('Location: ' . $redirect);
    exit;
}

$memberId = (int) $_SESSION['member_id'];
$stmt = mysqli_prepare($mysqli, 'INSERT INTO fragfarm_review_comments (product_id, review_key, member_id, content) VALUES (?, ?, ?, ?)');
mysqli_stmt_bind_param($stmt, 'ssis', $productId, $reviewKey, $memberId, $content);
if (!mysqli_stmt_execute($stmt)) $_SESSION['feedback_error'] = '댓글 저장에 실패했습니다.';
mysqli_stmt_close($stmt);
mysqli_close($mysqli);
header('Location: ' . $redirect);
exit;

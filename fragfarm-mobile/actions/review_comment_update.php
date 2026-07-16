<?php
require_once __DIR__ . '/../includes/config.php';
require_once __DIR__ . '/../includes/security.php';
require_once __DIR__ . '/../includes/dbconn.php';
require_once __DIR__ . '/../includes/data/products.php';
require_once __DIR__ . '/../includes/services/shop-state.php';

$commentId = (int) ($_POST['comment_id'] ?? 0);
$productId = trim((string) ($_POST['product_id'] ?? ''));
$reviewKey = trim((string) ($_POST['review_key'] ?? ''));
$redirect = BASE_URL . '/pages/my-posts.php?tab=comments#comment-' . $commentId;

if ($_SERVER['REQUEST_METHOD'] !== 'POST' || empty($_SESSION['member_id'])) {
    header('Location: ' . BASE_URL . '/pages/login.php');
    exit;
}

if (!csrf_verify('product_feedback', $_POST['csrf_token'] ?? null)) {
    $_SESSION['my_posts_error'] = '요청이 만료되었습니다.';
    header('Location: ' . $redirect);
    exit;
}

$content = trim((string) ($_POST['comment'] ?? ''));
$memberId = (int) $_SESSION['member_id'];

if ($commentId < 1 || !shop_find_product($products, $productId) || !preg_match('/^(?:sample-[1-3]|db-\d+|moment-\d{3})$/', $reviewKey) || $content === '' || mb_strlen($content) > 500) {
    $_SESSION['my_posts_error'] = '댓글 내용을 확인해주세요.';
    header('Location: ' . $redirect);
    exit;
}

$stmt = mysqli_prepare($mysqli, 'UPDATE fragfarm_review_comments SET content = ? WHERE id = ? AND member_id = ? AND product_id = ? AND review_key = ?');
mysqli_stmt_bind_param($stmt, 'siiss', $content, $commentId, $memberId, $productId, $reviewKey);
if (!mysqli_stmt_execute($stmt)) $_SESSION['my_posts_error'] = '댓글 수정에 실패했습니다.';
mysqli_stmt_close($stmt);
mysqli_close($mysqli);

header('Location: ' . $redirect);
exit;

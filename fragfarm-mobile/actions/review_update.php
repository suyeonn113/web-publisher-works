<?php
require_once __DIR__ . '/../includes/config.php';
require_once __DIR__ . '/../includes/security.php';
require_once __DIR__ . '/../includes/dbconn.php';
require_once __DIR__ . '/../includes/data/products.php';
require_once __DIR__ . '/../includes/services/shop-state.php';

$reviewId = (int) ($_POST['review_id'] ?? 0);
$productId = trim((string) ($_POST['product_id'] ?? ''));
$redirect = BASE_URL . '/pages/my-posts.php?tab=reviews#review-' . $reviewId;

if ($_SERVER['REQUEST_METHOD'] !== 'POST' || empty($_SESSION['member_id'])) {
    header('Location: ' . BASE_URL . '/pages/login.php');
    exit;
}

if (!csrf_verify('product_feedback', $_POST['csrf_token'] ?? null)) {
    $_SESSION['my_posts_error'] = '요청이 만료되었습니다.';
    header('Location: ' . $redirect);
    exit;
}

$content = trim((string) ($_POST['review'] ?? ''));
$rating = (int) ($_POST['rating'] ?? 0);
$memberId = (int) $_SESSION['member_id'];

if ($reviewId < 1 || !shop_find_product($products, $productId) || $content === '' || mb_strlen($content) > 2000 || $rating < 1 || $rating > 5) {
    $_SESSION['my_posts_error'] = '후기 내용과 별점을 확인해주세요.';
    header('Location: ' . $redirect);
    exit;
}

$stmt = mysqli_prepare($mysqli, 'UPDATE fragfarm_product_reviews SET rating = ?, content = ? WHERE id = ? AND member_id = ? AND product_id = ?');
mysqli_stmt_bind_param($stmt, 'isiis', $rating, $content, $reviewId, $memberId, $productId);
if (!mysqli_stmt_execute($stmt)) $_SESSION['my_posts_error'] = '후기 수정에 실패했습니다.';
mysqli_stmt_close($stmt);
mysqli_close($mysqli);

header('Location: ' . $redirect);
exit;

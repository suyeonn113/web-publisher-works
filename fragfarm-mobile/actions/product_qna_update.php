<?php
require_once __DIR__ . '/../includes/config.php';
require_once __DIR__ . '/../includes/security.php';
require_once __DIR__ . '/../includes/dbconn.php';
require_once __DIR__ . '/../includes/data/products.php';
require_once __DIR__ . '/../includes/services/shop-state.php';

$qnaId = (int) ($_POST['qna_id'] ?? 0);
$productId = trim((string) ($_POST['product_id'] ?? ''));
$redirect = BASE_URL . '/pages/my-posts.php?tab=qna#qna-' . $qnaId;

if ($_SERVER['REQUEST_METHOD'] !== 'POST' || empty($_SESSION['member_id'])) {
    header('Location: ' . BASE_URL . '/pages/login.php');
    exit;
}

if (!csrf_verify('product_feedback', $_POST['csrf_token'] ?? null)) {
    $_SESSION['my_posts_error'] = '요청이 만료되었습니다.';
    header('Location: ' . $redirect);
    exit;
}

$content = trim((string) ($_POST['qna'] ?? ''));
$isSecret = isset($_POST['is_secret']) ? 1 : 0;
$memberId = (int) $_SESSION['member_id'];

if ($qnaId < 1 || !shop_find_product($products, $productId) || $content === '' || mb_strlen($content) > 2000) {
    $_SESSION['my_posts_error'] = '문의 내용을 확인해주세요.';
    header('Location: ' . $redirect);
    exit;
}

$stmt = mysqli_prepare($mysqli, 'UPDATE fragfarm_product_qna SET content = ?, is_secret = ? WHERE id = ? AND member_id = ? AND product_id = ?');
mysqli_stmt_bind_param($stmt, 'siiis', $content, $isSecret, $qnaId, $memberId, $productId);
if (!mysqli_stmt_execute($stmt)) $_SESSION['my_posts_error'] = '문의 수정에 실패했습니다.';
mysqli_stmt_close($stmt);
mysqli_close($mysqli);

header('Location: ' . $redirect);
exit;

<?php
require_once __DIR__ . '/../includes/config.php';
require_once __DIR__ . '/../includes/security.php';
require_once __DIR__ . '/../includes/dbconn.php';
require_once __DIR__ . '/../includes/data/products.php';
require_once __DIR__ . '/../includes/services/shop-state.php';
$productId = trim($_POST['product_id'] ?? '');
$redirect = BASE_URL . '/pages/product-detail.php?id=' . rawurlencode($productId) . '#product-qna';
if ($_SERVER['REQUEST_METHOD'] !== 'POST' || empty($_SESSION['member_id'])) { header('Location: ' . BASE_URL . '/pages/login.php'); exit; }
if (!csrf_verify('product_feedback', $_POST['csrf_token'] ?? null)) { $_SESSION['feedback_error'] = '요청이 만료되었습니다.'; header('Location: ' . $redirect); exit; }
$content = trim($_POST['qna'] ?? '');
$isSecret = isset($_POST['is_secret']) ? 1 : 0;
if (!shop_find_product($products, $productId) || $content === '' || mb_strlen($content) > 2000) { $_SESSION['feedback_error'] = '문의 내용을 확인해주세요.'; header('Location: ' . $redirect); exit; }
$memberId = (int) $_SESSION['member_id'];
$stmt = mysqli_prepare($mysqli, 'INSERT INTO fragfarm_product_qna (product_id, member_id, content, is_secret) VALUES (?, ?, ?, ?)');
mysqli_stmt_bind_param($stmt, 'sisi', $productId, $memberId, $content, $isSecret);
if (!mysqli_stmt_execute($stmt)) { $_SESSION['feedback_error'] = '문의 저장에 실패했습니다.'; }
mysqli_stmt_close($stmt);
mysqli_close($mysqli);
header('Location: ' . $redirect);
exit;

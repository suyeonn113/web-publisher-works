<?php
require_once __DIR__ . '/../includes/config.php';
require_once __DIR__ . '/../includes/dbconn.php';
require_once __DIR__ . '/../includes/data/products.php';
require_once __DIR__ . '/../includes/services/shop-state.php';

function order_fail(string $message): void
{
    $_SESSION['order_error'] = $message;
    header('Location: ' . BASE_URL . '/pages/checkout.php');
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST' || empty($_SESSION['member_id'])) {
    header('Location: ' . BASE_URL . '/pages/login.php');
    exit;
}

if (!hash_equals($_SESSION['checkout_csrf'] ?? '', $_POST['csrf_token'] ?? '')) {
    order_fail('주문 요청이 만료되었습니다. 다시 시도해주세요.');
}

$rawItems = json_decode($_POST['order_items'] ?? '', true);
if (!is_array($rawItems) || count($rawItems) < 1 || count($rawItems) > 50) {
    order_fail('주문 상품 정보를 확인해주세요.');
}

$recipientName = trim($_POST['recipient_name'] ?? '');
$recipientPhone = preg_replace('/[^0-9]/', '', $_POST['recipient_phone'] ?? '');
$postcode = trim($_POST['postcode'] ?? '');
$addressLine1 = trim($_POST['address_line1'] ?? '');
$addressLine2 = trim($_POST['address_line2'] ?? '');
$deliveryMessage = trim($_POST['delivery_message'] ?? '');
$paymentMethod = in_array($_POST['payment_method'] ?? '', ['demo_card', 'demo_bank'], true) ? $_POST['payment_method'] : 'demo_card';

if ($recipientName === '' || $recipientPhone === '' || $postcode === '' || $addressLine1 === '' || $addressLine2 === '') {
    order_fail('배송 정보를 모두 입력해주세요.');
}

$validatedItems = [];
$productAmount = 0;
foreach ($rawItems as $rawItem) {
    $productId = (string) ($rawItem['id'] ?? '');
    $product = shop_find_product($products, $productId);
    $quantity = min(99, max(1, (int) ($rawItem['quantity'] ?? 1)));

    if (!$product || !empty($product['soldOut'])) {
        order_fail('판매 중인 상품만 주문할 수 있습니다.');
    }

    $unitPrice = (int) ($product['price'] ?? 0);
    $originalPrice = (int) ($product['originalPrice'] ?? $unitPrice);
    $lineTotal = $unitPrice * $quantity;
    $image = $product['images'][0]['src'] ?? null;
    $validatedItems[] = [
        'id' => $productId,
        'name' => (string) ($product['name'] ?? ''),
        'image' => $image,
        'option' => trim((string) ($rawItem['option'] ?? '')),
        'size' => trim((string) ($rawItem['size'] ?? '')),
        'quantity' => $quantity,
        'unit_price' => $unitPrice,
        'original_price' => $originalPrice,
        'line_total' => $lineTotal,
    ];
    $productAmount += $lineTotal;
}

$shippingFee = $productAmount >= 70000 ? 0 : 3000;
$totalAmount = $productAmount + $shippingFee;
$memberId = (int) $_SESSION['member_id'];
$orderNumber = 'FF' . date('YmdHis') . strtoupper(bin2hex(random_bytes(3)));

mysqli_begin_transaction($mysqli);
try {
    $orderSql = 'INSERT INTO fragfarm_orders (order_number, member_id, recipient_name, recipient_phone, postcode, address_line1, address_line2, delivery_message, product_amount, shipping_fee, total_amount, payment_method, payment_status, order_status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, \'demo_paid\', \'ordered\')';
    $orderStmt = mysqli_prepare($mysqli, $orderSql);
    if (!$orderStmt) throw new RuntimeException('order prepare failed');
    mysqli_stmt_bind_param($orderStmt, 'sissssssiiis', $orderNumber, $memberId, $recipientName, $recipientPhone, $postcode, $addressLine1, $addressLine2, $deliveryMessage, $productAmount, $shippingFee, $totalAmount, $paymentMethod);
    if (!mysqli_stmt_execute($orderStmt)) throw new RuntimeException('order insert failed');
    $orderId = mysqli_insert_id($mysqli);
    mysqli_stmt_close($orderStmt);

    $itemSql = 'INSERT INTO fragfarm_order_items (order_id, product_id, product_name, product_image, product_option, size, quantity, unit_price, original_unit_price, line_total) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
    $itemStmt = mysqli_prepare($mysqli, $itemSql);
    if (!$itemStmt) throw new RuntimeException('item prepare failed');
    foreach ($validatedItems as $item) {
        mysqli_stmt_bind_param($itemStmt, 'isssssiiii', $orderId, $item['id'], $item['name'], $item['image'], $item['option'], $item['size'], $item['quantity'], $item['unit_price'], $item['original_price'], $item['line_total']);
        if (!mysqli_stmt_execute($itemStmt)) throw new RuntimeException('item insert failed');
    }
    mysqli_stmt_close($itemStmt);
    mysqli_commit($mysqli);
} catch (Throwable $error) {
    mysqli_rollback($mysqli);
    error_log('Fragfarm order failed: ' . $error->getMessage());
    order_fail('주문 저장 중 오류가 발생했습니다.');
}

unset($_SESSION['checkout_csrf']);
$_SESSION['last_order'] = ['number' => $orderNumber, 'total' => $totalAmount];
header('Location: ' . BASE_URL . '/pages/order-complete.php');
exit;

<?php
include __DIR__ . '/../includes/config.php';
require_once __DIR__ . '/../includes/view-helpers.php';
require_once __DIR__ . '/../includes/security.php';

if (!FRAGFARM_DEMO_MODE && empty($_SESSION['member_id'])) {
    $_SESSION['after_login_redirect'] = BASE_URL . '/pages/checkout.php';
    header('Location: ' . BASE_URL . '/pages/login.php');
    exit;
}

$member = FRAGFARM_DEMO_MODE
    ? [
        'user_name' => '프래그팜 마스터',
        'phone' => '01012345678',
        'postcode' => '04782',
        'address_line1' => '서울특별시 성동구 연무장길 00',
        'address_line2' => '프래그팜 101호',
    ]
    : ['user_name' => '', 'phone' => '', 'postcode' => '', 'address_line1' => '', 'address_line2' => ''];
if (!FRAGFARM_DEMO_MODE) {
    require_once __DIR__ . '/../includes/dbconn.php';
    $memberId = (int) $_SESSION['member_id'];
    $stmt = mysqli_prepare($mysqli, 'SELECT user_name, phone, postcode, address_line1, address_line2 FROM fragfarm_members WHERE id = ? LIMIT 1');
    mysqli_stmt_bind_param($stmt, 'i', $memberId);
    mysqli_stmt_execute($stmt);
    $member = mysqli_fetch_assoc(mysqli_stmt_get_result($stmt));
    mysqli_stmt_close($stmt);
    mysqli_close($mysqli);
    if (!$member) {
        header('Location: ' . BASE_URL . '/pages/login.php');
        exit;
    }
}

$pageTitle = 'Checkout | Fragfarm';
$pageCss = 'checkout.css';
?>
<!DOCTYPE html>
<html lang="ko">
<?php include __DIR__ . '/../includes/head.php'; ?>
<body>
<div class="mobile-shell">
    <?php include __DIR__ . '/../includes/header.php'; ?>
    <main id="main" class="checkout-page" data-checkout-page>
        <div class="page-heading page-heading--plain page-heading--contained">
            <h2 class="page-heading__title">ORDER</h2>
        </div>
        <p class="checkout-demo">포트폴리오용 주문 체험이며 실제 결제는 발생하지 않습니다.</p>
        <?php if (!empty($_SESSION['order_error'])): ?>
            <p class="checkout-error" role="alert"><?= e($_SESSION['order_error']) ?></p>
            <?php unset($_SESSION['order_error']); ?>
        <?php endif; ?>
        <section class="checkout-section" aria-labelledby="checkout-products-title">
            <h3 id="checkout-products-title">주문 상품</h3>
            <ul class="checkout-products" data-checkout-items></ul>
            <p data-checkout-empty hidden>주문할 상품이 없습니다.</p>
        </section>
        <form class="checkout-form" action="<?= BASE_URL ?>/actions/order_process.php" method="post" data-checkout-form data-demo-mode="<?= FRAGFARM_DEMO_MODE ? 'true' : 'false' ?>">
            <?= csrf_input('checkout') ?>
            <input type="hidden" name="order_items" data-order-items>
            <section class="checkout-section" aria-labelledby="shipping-title">
                <div class="checkout-section__head">
                    <h3 id="shipping-title">배송 정보</h3>
                    <button type="button" data-load-member-address>기본 배송지 불러오기</button>
                </div>
                <label>받는 분<input name="recipient_name" type="text" value="<?= e($member['user_name']) ?>" autocomplete="name" required></label>
                <label>연락처<input name="recipient_phone" type="tel" value="<?= e($member['phone']) ?>" inputmode="numeric" autocomplete="tel" required></label>
                <label>우편번호<input name="postcode" type="text" value="<?= e($member['postcode']) ?>" required></label>
                <label>주소<input name="address_line1" type="text" value="<?= e($member['address_line1']) ?>" required></label>
                <label>상세 주소<input name="address_line2" type="text" value="<?= e($member['address_line2']) ?>" required></label>
                <label>배송 메시지<input name="delivery_message" type="text" maxlength="255" placeholder="배송 요청사항을 입력해주세요."></label>
            </section>
            <section class="checkout-section checkout-payment" aria-labelledby="payment-title" data-payment-section>
                <h3 id="payment-title">결제 수단</h3>
                <div class="checkout-payment__options">
                    <label class="checkout-radio"><input name="payment_method" type="radio" value="demo_card"><span>신용카드 모의 결제</span></label>
                    <label class="checkout-radio"><input name="payment_method" type="radio" value="demo_bank"><span>무통장입금 모의 결제</span></label>
                </div>
            </section>
            <section class="checkout-total" aria-label="결제 금액">
                <dl>
                    <div><dt>상품 금액</dt><dd data-checkout-subtotal>0원</dd></div>
                    <div><dt>배송비</dt><dd data-checkout-shipping>0원</dd></div>
                </dl>
                <strong>총 결제 금액 <span data-checkout-total>0원</span></strong>
            </section>
            <button class="checkout-submit" type="submit">모의 주문하기</button>
        </form>
    </main>
    <?php include __DIR__ . '/../includes/footer.php'; ?>
</div>
<script type="application/json" id="checkout-member-profile"><?= json_encode($member, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_HEX_TAG | JSON_HEX_AMP | JSON_HEX_APOS | JSON_HEX_QUOT) ?></script>
<script src="<?= BASE_URL ?>/js/header.js"></script>
<script src="<?= BASE_URL ?>/js/order-flow.js"></script>
</body>
</html>

<?php
include __DIR__ . '/../includes/config.php';
include __DIR__ . '/../includes/data/products.php';
require_once __DIR__ . '/../includes/services/shop-state.php';

$pageTitle = 'Cart | Fragfarm';
$pageCss = 'bag.css';
$sampleItems = shop_sample_items($products);
?>

<!DOCTYPE html>
<html lang="ko">
<?php include __DIR__ . '/../includes/head.php'; ?>
<body>
<div class="mobile-shell">
    <?php include __DIR__ . '/../includes/header.php'; ?>

    <main id="main" class="bag-page" data-shop-page="cart">
        <nav class="bag-tabs" aria-label="장바구니와 찜목록">
            <a href="<?= BASE_URL ?>/pages/cart.php" aria-current="page">CART (<span data-cart-count>0</span>)</a>
            <a href="<?= BASE_URL ?>/pages/wishlist.php">WISHLIST (<span data-wishlist-count>0</span>)</a>
        </nav>

        <div class="bag-control">
            <label class="check-box">
                <span>전체 선택</span>
                <input class="check-box__input" type="checkbox" data-cart-check-all checked>
            </label>
        </div>

        <ul class="bag-list" data-cart-list></ul>
        <p class="empty-message" data-cart-empty hidden>장바구니에 담긴 상품이 없습니다.</p>

        <section class="cart-summary" aria-label="장바구니 합계">
            <dl>
                <div>
                    <dt>상품합계</dt>
                    <dd data-cart-subtotal>0원</dd>
                </div>
                <div>
                    <dt>할인 금액</dt>
                    <dd data-cart-discount>0원</dd>
                </div>
                <div>
                    <dt>
                        배송비
                        <span class="shipping-info">
                            <button type="button" aria-label="지역별 추가 배송비 안내" aria-expanded="false" aria-controls="shipping-info-tooltip" data-shipping-info>ⓘ</button>
                            <span class="shipping-info__tooltip" id="shipping-info-tooltip" role="tooltip" data-shipping-tooltip hidden>
                                <strong>지역별 추가 배송비</strong>
                                제주 및 도서 산간 3,000원 추가
                            </span>
                        </span>
                    </dt>
                    <dd data-cart-shipping>0원</dd>
                </div>
            </dl>
            <strong data-cart-total>0원</strong>
        </section>

        <div class="cart-actions">
            <button class="cart-actions__buy" type="button" data-checkout-cart>구매하기</button>
            <button class="cart-actions__pay cart-actions__pay--naver" type="button" data-global-placeholder data-placeholder-message="네이버페이는 준비 중입니다." aria-label="네이버페이 연결 준비중">
                <svg viewBox="0 0 45 15" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
                    <path d="M7.09972 14.1656C3.17937 14.1656 0 10.9938 0 7.08279C0 3.17179 3.17937 0 7.09972 0C11.0201 0 14.1994 3.17179 14.1994 7.08279C14.1994 10.9938 11.0201 14.1656 7.09972 14.1656ZM8.4707 3.53977V7.43449L5.72547 3.53977H3.54823V10.6226H5.72874V6.72783L8.47396 10.6226H10.6512V3.53977H8.4707Z"/>
                    <path d="M19.5005 12.5764V9.61302V12.5764ZM42.2424 2.5856L40.1403 7.39863L37.8161 2.5856H35.6944L39.2132 9.41438L37.7998 12.5764H39.804L44.2499 2.5856H42.2457H42.2424ZM32.7304 10.2448H34.6302V2.5856H32.7304V3.21409C32.0776 2.6898 31.3399 2.41626 30.4455 2.41626C28.2845 2.41626 26.5904 4.18777 26.5904 6.41193C26.5904 8.63609 28.2845 10.4076 30.4455 10.4076C31.3399 10.4076 32.0776 10.1341 32.7304 9.60977V10.2383V10.2448ZM30.7197 8.85753C29.4499 8.85753 28.4902 7.80569 28.4902 6.41519C28.4902 5.02468 29.4499 3.97285 30.7197 3.97285C31.9895 3.97285 32.9491 5.02468 32.9491 6.41519C32.9491 7.80569 31.9895 8.85753 30.7197 8.85753ZM19.5266 9.6521C20.1664 10.1536 20.8813 10.4109 21.7463 10.4109C23.9072 10.4109 25.6013 8.63934 25.6013 6.41519C25.6013 4.18777 23.9072 2.41952 21.7463 2.41952C20.8519 2.41952 20.1142 2.69306 19.4613 3.21735V2.58885H17.5615V12.5797H19.5266V9.6521ZM19.2426 6.41519C19.2426 5.02142 20.2023 3.97285 21.4721 3.97285C22.7419 3.97285 23.7016 5.02468 23.7016 6.41519C23.7016 7.80895 22.7419 8.85753 21.4721 8.85753C20.2023 8.85753 19.2426 7.80569 19.2426 6.41519Z"/>
                </svg>
                <span class="visually-hidden">Naver Pay</span>
            </button>
            <button class="cart-actions__pay cart-actions__pay--kakao" type="button" data-global-placeholder data-placeholder-message="카카오페이는 준비 중입니다." aria-label="카카오페이 연결 준비중">
                <svg viewBox="0 0 45 15" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M6.75934 0C3.02846 0 0 2.39073 0 5.33909C0 7.23381 1.2539 8.89746 3.13628 9.84636L2.49855 12.2248C2.47391 12.2987 2.49547 12.3757 2.54785 12.4281C2.58482 12.4651 2.63411 12.4836 2.68648 12.4836C2.72653 12.4836 2.76658 12.4682 2.80355 12.4404L5.54241 10.5919C5.93984 10.6474 6.34651 10.6813 6.75934 10.6813C10.4902 10.6813 13.5187 8.29054 13.5187 5.34218C13.5187 2.39381 10.4933 0.00308032 6.75934 0.00308032V0Z"/>
                    <path d="M19.2152 9.77543V13.2229H16.7598V0.508268H18.4912L18.7931 1.31545C19.3138 0.794785 20.1055 0.240234 21.3841 0.240234C23.7902 0.240234 24.9332 2.03944 24.9147 4.94776C24.9147 7.99162 23.1494 9.9418 20.6262 9.9418C20.1394 9.9418 19.7697 9.90791 19.2152 9.77235V9.77543ZM19.2152 2.56011V8.0594C19.3507 8.07481 19.6866 8.1087 20.007 8.1087C21.7569 8.1087 22.4285 6.88252 22.4285 4.94776C22.4285 3.25021 21.9756 2.22429 20.58 2.22429C20.1271 2.22429 19.6219 2.35985 19.2183 2.56011H19.2152Z"/>
                    <path d="M30.2599 4.09138H31.6556V3.78945C31.6556 2.78202 31.0825 2.31065 30.0905 2.31065C29.3326 2.31065 28.3591 2.52939 27.5673 2.91758L26.8957 1.26933C27.7706 0.662402 29.1139 0.243408 30.3092 0.243408C32.663 0.243408 33.9415 1.48807 33.9415 3.86031V9.69542H32.2101L31.9575 8.92213C30.9655 9.64613 30.0566 9.94805 29.234 9.94805C27.4348 9.94805 26.4243 8.87284 26.4243 7.05514C26.4243 5.12038 27.7706 4.09446 30.2569 4.09446L30.2599 4.09138ZM31.6556 7.3355V5.65336H30.528C29.2679 5.65336 28.6271 6.10625 28.6271 7.01509C28.6271 7.7052 28.9814 8.04101 29.7023 8.04101C30.3739 8.04101 31.2335 7.7052 31.6525 7.3355H31.6556Z"/>
                    <path d="M41.3755 8.74954C40.519 11.0355 39.4931 12.7023 37.9958 13.6265L36.4832 12.2309C37.3581 11.473 37.9804 10.7336 38.5165 9.74157L35.2539 0.847184L37.6908 0.190965L39.7766 7.40629L41.8438 0.160156L44.2499 0.831779L41.3755 8.75262V8.74954Z"/>
                </svg>
                <span class="visually-hidden">Kakao Pay</span>
            </button>
        </div>
    </main>

    <?php include __DIR__ . '/../includes/footer.php'; ?>
    <?php include __DIR__ . '/../includes/chat-launcher.php'; ?>
</div>
<script type="application/json" id="shop-sample-data"><?= json_encode($sampleItems, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES) ?></script>
<script src="<?= BASE_URL ?>/js/header.js"></script>
<script src="<?= BASE_URL ?>/js/shop-storage.js"></script>
</body>
</html>

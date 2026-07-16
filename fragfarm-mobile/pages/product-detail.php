<?php
include __DIR__ . '/../includes/config.php';
include __DIR__ . '/../includes/data/products.php';
require_once __DIR__ . '/../includes/services/shop-state.php';
require_once __DIR__ . '/../includes/view-helpers.php';
require_once __DIR__ . '/../includes/security.php';

$productId = $_GET['id'] ?? '';
$product = shop_find_product($products, (string) $productId);

if ($product === null) {
    http_response_code(404);
    require __DIR__ . '/../404.php';
    exit;
}

$pageTitle = ($product['name'] ?? 'Product Detail') . ' | Fragfarm';
$pageCss = 'product-detail.css';
$isLoggedIn = isset($_SESSION['member_id']);

function productDetailImageUrl($src)
{
    if ($src === '') {
        return '';
    }

    return BASE_URL . $src;
}

$id = e($product['id'] ?? '');
$name = e($product['name'] ?? '');
$color = e($product['color'] ?? '');
$price = (int) ($product['price'] ?? 0);
$originalPrice = (int) ($product['originalPrice'] ?? 0);
$discount = (int) ($product['discount'] ?? 0);
$catalogRating = (float) ($product['rating'] ?? 0);
$catalogReviewCount = max(0, (int) ($product['reviewCount'] ?? 0));
$descriptionLines = array_values(array_filter(
    array_map(
        static function ($line) {
            $line = str_replace(
                ["\xc2\xa0", "\xe3\x80\x80", "\xe2\x80\x8b", "\xef\xbb\xbf"],
                ' ',
                (string) $line
            );
            return trim($line);
        },
        preg_split('/\R+/', (string) ($product['description'] ?? ''))
    ),
    static fn($line) => preg_match('/[\p{L}\p{N}]/u', $line) === 1
));
$details = $product['details'] ?? [];
$images = $product['images'] ?? [];
$mainImage = $images[0] ?? ['src' => '', 'alt' => $product['name'] ?? 'Product image'];
$sizeText = (string) ($details['size'] ?? 'One Size');
$sizes = array_filter(array_map('trim', explode(',', $sizeText)));
if (empty($sizes)) {
    $sizes = ['One Size'];
}
$isSoldOut = !empty($product['soldOut']);
$shopItem = shop_item_from_product($product, ['size' => $sizes[0] ?? 'S']);
$shopItemAttr = shop_item_json($shopItem);
$sampleReviews = FRAGFARM_DEMO_MODE
    ? require __DIR__ . '/../includes/data/product-detail-reviews.php'
    : [];

$mysqli = null;
if (!FRAGFARM_DEMO_MODE) {
    require_once __DIR__ . '/../includes/dbconn.php';
}

require_once __DIR__ . '/../includes/services/product-detail-view.php';
$feedbackView = build_product_detail_feedback(
    $product,
    $sampleReviews,
    $catalogReviewCount,
    $catalogRating,
    $mysqli,
    (int) ($_SESSION['member_id'] ?? 0)
);

if ($mysqli) {
    mysqli_close($mysqli);
}

$reviewItems = $feedbackView['reviews'];
$productQnaItems = $feedbackView['qna'];
$reviewCount = $feedbackView['count'];
$reviewScoreSum = $feedbackView['score_sum'];
$reviewAverage = $feedbackView['average'];
$rating = number_format($reviewAverage, 1);
?>

<!DOCTYPE html>
<html lang="ko">

<?php include __DIR__ . '/../includes/head.php'; ?>

<body>
<div class="mobile-shell">
    <?php include __DIR__ . '/../includes/header.php'; ?>

    <main id="main" class="product-detail">
        <?php if (!empty($_SESSION['feedback_error'])): ?>
            <p class="product-toast product-toast--server" role="alert"><?= e($_SESSION['feedback_error']) ?></p>
            <?php unset($_SESSION['feedback_error']); ?>
        <?php endif; ?>

        <div class="page-heading page-heading--back">
            <a
                class="page-heading__back"
                href="<?= BASE_URL ?>/pages/product.php?category=<?= rawurlencode((string) ($product['category'] ?? 'all')) ?>"
                aria-label="상품 목록으로 돌아가기">
                <img src="<?= BASE_URL ?>/assets/icons/arrow-left.svg" alt="">
            </a>
            <h2 class="page-heading__title">SHOP</h2>
        </div>

        <section class="product-detail__hero" aria-labelledby="product-title">
            <div class="product-detail__media">
                <img
                    id="product-main-image"
                    class="product-detail__main-image"
                    src="<?= productDetailImageUrl(e($mainImage['src'] ?? '')) ?>"
                    alt="<?= e($mainImage['alt'] ?? $name) ?>">
            </div>

            <?php if (count($images) > 1): ?>
                <div class="product-detail__thumbs" role="list" aria-label="상품 이미지 선택">
                    <?php foreach ($images as $index => $image): ?>
                        <button
                            class="product-detail__thumb<?= $index === 0 ? ' is-current' : '' ?>"
                            type="button"
                            data-image-src="<?= productDetailImageUrl(e($image['src'] ?? '')) ?>"
                            data-image-alt="<?= e($image['alt'] ?? $name) ?>"
                            aria-label="<?= e($name) ?> 이미지 <?= $index + 1 ?>"
                            aria-current="<?= $index === 0 ? 'true' : 'false' ?>">
                            <img
                                src="<?= productDetailImageUrl(e($image['src'] ?? '')) ?>"
                                alt="">
                        </button>
                    <?php endforeach; ?>
                </div>
            <?php endif; ?>
        </section>

        <section class="product-detail__summary">
          
            <div class="product-detail__title-row">
                <h2 id="product-title" class="product-detail__title"><?= $name ?></h2>
                <button
                    class="product-detail__wish"
                    type="button"
                    aria-label="위시리스트 추가"
                    aria-pressed="false"
                    data-wish-toggle
                    data-shop-item="<?= $shopItemAttr ?>"
                    data-product-id="<?= $id ?>"
                    data-product-name="<?= $name ?>"
                    data-product-price="<?= $price ?>"
                    data-product-original-price="<?= $originalPrice ?>"
                    data-product-discount="<?= $discount ?>"
                    data-product-image="<?= e($images[0]['src'] ?? '') ?>">
                    <svg viewBox="0 0 14 12" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
                        <path d="M6.80457 11.0151L1.4575 6.17174C-1.44851 3.26572 2.82333 -2.31382 6.80457 2.20019C10.7858 -2.31382 15.0383 3.2851 12.1516 6.17174L6.80457 11.0151Z"/>
                    </svg>
                </button>
            </div>

            <a class="product-detail__rating" href="#review-title" data-product-review-summary data-review-summary-link aria-label="평점 <?= $rating ?>점, 후기 <?= $reviewCount ?>개. 리뷰로 이동">
                <strong data-product-review-average><?= $rating ?></strong>
                <span data-product-review-count>(<?= $reviewCount ?>개의 후기)</span>
            </a>

            <p class="product-detail__price<?= $discount > 0 ? ' has-discount' : '' ?>">
                <?php if ($discount > 0): ?>
                    <del><?= number_format($originalPrice) ?>원</del>
                    <span class="product-detail__sale-row">
                        <strong><?= number_format($price) ?>원</strong>
                        <span class="product-detail__discount"><?= $discount ?>%</span>
                    </span>
                <?php else: ?>
                    <strong><?= number_format($price) ?>원</strong>
                <?php endif; ?>
            </p>

            <?php if (!empty($descriptionLines)): ?>
                <ul class="product-detail__description">
                    <?php foreach ($descriptionLines as $line): ?>
                        <?php if (preg_match('/[\p{L}\p{N}]/u', $line) === 1): ?>
                            <li><?= e($line) ?></li>
                        <?php endif; ?>
                    <?php endforeach; ?>
                </ul>
            <?php endif; ?>

            <div class="product-detail__info-toggles" aria-label="상품 기본 정보">
                <details class="detail-toggle">
                    <summary>
                        <span>PRODUCT DETAILS</span>
                        <svg class="detail-toggle__icon" viewBox="0 0 10 5" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
                            <path d="M1.41406 6.18106e-08L4.85352 3.43945L8.31856 3.63616e-07L9.70703 4.24308e-07L4.85352 4.85352L2.12154e-07 0L1.41406 6.18106e-08Z"/>
                        </svg>
                    </summary>
                    <div class="detail-toggle__body">
                        <?php if (!empty($details)): ?>
                            <dl class="product-spec">
                                <?php foreach ($details as $label => $value): ?>
                                    <div>
                                        <dt><?= strtoupper(e($label)) ?></dt>
                                        <dd><?= e($value) ?></dd>
                                    </div>
                                <?php endforeach; ?>
                                <div>
                                    <dt>CARE</dt>
                                    <dd>
                                        첫 세탁은 손세탁해 주세요.<br>
                                        프린팅 보호를 위해 뒤집어서 세탁해 주세요.<br>
                                        중성세제를 사용하고 건조기 사용은 피해 주세요.<br>
                                        강한 마찰 및 산성 세제 사용을 피해 주세요.
                                    </dd>
                                </div>
                            </dl>
                        <?php endif; ?>
                    </div>
                </details>

                <details class="detail-toggle">
                    <summary>
                        <span>SIZE GUIDE</span>
                        <svg class="detail-toggle__icon" viewBox="0 0 10 5" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
                            <path d="M1.41406 6.18106e-08L4.85352 3.43945L8.31856 3.63616e-07L9.70703 4.24308e-07L4.85352 4.85352L2.12154e-07 0L1.41406 6.18106e-08Z"/>
                        </svg>
                    </summary>
                    <div class="detail-toggle__body">
                        <div class="size-guide">
                            <p>측정 방식에 따라 1-2cm 오차가 있을 수 있습니다.</p>
                            <table>
                                <thead>
                                    <tr>
                                        <th>Size</th>
                                        <th>Shoulder</th>
                                        <th>Chest</th>
                                        <th>Length</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <?php foreach ($sizes as $size): ?>
                                        <tr>
                                            <td><?= e($size) ?></td>
                                            <td>-</td>
                                            <td>-</td>
                                            <td>-</td>
                                        </tr>
                                    <?php endforeach; ?>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </details>
            </div>

            <form class="product-detail__order" method="post">
                <input type="hidden" name="product_id" value="<?= $id ?>">

                <fieldset class="product-detail__sizes">
                    <legend>SIZE</legend>
                    <div class="product-detail__size-list">
                        <?php foreach ($sizes as $size): ?>
                            <label class="product-detail__size">
                                <input type="radio" name="size" value="<?= e($size) ?>">
                                <span><?= e($size) ?></span>
                            </label>
                        <?php endforeach; ?>
                    </div>
                </fieldset>

                <div
                    class="selected-product"
                    data-selected-product
                    data-product-name="<?= $name ?>"
                    data-unit-price="<?= $price ?>"
                    hidden>
                    <p class="selected-product__name" data-selected-name></p>
                    <div class="selected-product__controls" aria-label="선택 상품 수량">
                        <button class="selected-product__qty-btn" type="button" data-qty-action="decrease" aria-label="수량 감소"><img src="<?= BASE_URL ?>/assets/icons/arrow-left.svg" alt=""></button>
                        <span class="selected-product__qty" data-selected-qty>1</span>
                        <button class="selected-product__qty-btn" type="button" data-qty-action="increase" aria-label="수량 증가"><img class="icon-rotate-180" src="<?= BASE_URL ?>/assets/icons/arrow-left.svg" alt=""></button>
                        <strong class="selected-product__price" data-selected-price><?= number_format($price) ?>원</strong>
                        <button class="selected-product__remove" type="button" data-selected-remove aria-label="선택 상품 삭제"><img src="<?= BASE_URL ?>/assets/icons/close.svg" alt=""></button>
                    </div>
                </div>

                <div class="product-detail__actions">
                    <button class="product-detail__buy" type="button" data-checkout-product data-shop-item="<?= $shopItemAttr ?>" <?= $isSoldOut ? 'disabled' : '' ?>>
                        <?= $isSoldOut ? 'SOLD OUT' : '구매하기' ?>
                    </button>

                    <div class="product-detail__pay-actions" aria-label="간편 결제">
                    <button class="product-detail__pay product-detail__pay--naver" type="button" data-placeholder="true" aria-label="네이버페이 연결 준비중">
                        <svg viewBox="0 0 45 15" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
                            <path d="M7.09972 14.1656C3.17937 14.1656 0 10.9938 0 7.08279C0 3.17179 3.17937 0 7.09972 0C11.0201 0 14.1994 3.17179 14.1994 7.08279C14.1994 10.9938 11.0201 14.1656 7.09972 14.1656ZM8.4707 3.53977V7.43449L5.72547 3.53977H3.54823V10.6226H5.72874V6.72783L8.47396 10.6226H10.6512V3.53977H8.4707Z"/>
                            <path d="M19.5005 12.5764V9.61302V12.5764ZM42.2424 2.5856L40.1403 7.39863L37.8161 2.5856H35.6944L39.2132 9.41438L37.7998 12.5764H39.804L44.2499 2.5856H42.2457H42.2424ZM32.7304 10.2448H34.6302V2.5856H32.7304V3.21409C32.0776 2.6898 31.3399 2.41626 30.4455 2.41626C28.2845 2.41626 26.5904 4.18777 26.5904 6.41193C26.5904 8.63609 28.2845 10.4076 30.4455 10.4076C31.3399 10.4076 32.0776 10.1341 32.7304 9.60977V10.2383V10.2448ZM30.7197 8.85753C29.4499 8.85753 28.4902 7.80569 28.4902 6.41519C28.4902 5.02468 29.4499 3.97285 30.7197 3.97285C31.9895 3.97285 32.9491 5.02468 32.9491 6.41519C32.9491 7.80569 31.9895 8.85753 30.7197 8.85753ZM19.5266 9.6521C20.1664 10.1536 20.8813 10.4109 21.7463 10.4109C23.9072 10.4109 25.6013 8.63934 25.6013 6.41519C25.6013 4.18777 23.9072 2.41952 21.7463 2.41952C20.8519 2.41952 20.1142 2.69306 19.4613 3.21735V2.58885H17.5615V12.5797H19.5266V9.6521ZM19.2426 6.41519C19.2426 5.02142 20.2023 3.97285 21.4721 3.97285C22.7419 3.97285 23.7016 5.02468 23.7016 6.41519C23.7016 7.80895 22.7419 8.85753 21.4721 8.85753C20.2023 8.85753 19.2426 7.80569 19.2426 6.41519Z"/>
                        </svg>
                        <span class="visually-hidden">Naver Pay</span>
                    </button>
                    <button class="product-detail__pay product-detail__pay--kakao" type="button" data-placeholder="true" aria-label="카카오페이 연결 준비중">
                        <svg viewBox="0 0 45 15" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M6.75934 0C3.02846 0 0 2.39073 0 5.33909C0 7.23381 1.2539 8.89746 3.13628 9.84636L2.49855 12.2248C2.47391 12.2987 2.49547 12.3757 2.54785 12.4281C2.58482 12.4651 2.63411 12.4836 2.68648 12.4836C2.72653 12.4836 2.76658 12.4682 2.80355 12.4404L5.54241 10.5919C5.93984 10.6474 6.34651 10.6813 6.75934 10.6813C10.4902 10.6813 13.5187 8.29054 13.5187 5.34218C13.5187 2.39381 10.4933 0.00308032 6.75934 0.00308032V0Z"/>
                            <path d="M19.2152 9.77543V13.2229H16.7598V0.508268H18.4912L18.7931 1.31545C19.3138 0.794785 20.1055 0.240234 21.3841 0.240234C23.7902 0.240234 24.9332 2.03944 24.9147 4.94776C24.9147 7.99162 23.1494 9.9418 20.6262 9.9418C20.1394 9.9418 19.7697 9.90791 19.2152 9.77235V9.77543ZM19.2152 2.56011V8.0594C19.3507 8.07481 19.6866 8.1087 20.007 8.1087C21.7569 8.1087 22.4285 6.88252 22.4285 4.94776C22.4285 3.25021 21.9756 2.22429 20.58 2.22429C20.1271 2.22429 19.6219 2.35985 19.2183 2.56011H19.2152Z"/>
                            <path d="M30.2599 4.09138H31.6556V3.78945C31.6556 2.78202 31.0825 2.31065 30.0905 2.31065C29.3326 2.31065 28.3591 2.52939 27.5673 2.91758L26.8957 1.26933C27.7706 0.662402 29.1139 0.243408 30.3092 0.243408C32.663 0.243408 33.9415 1.48807 33.9415 3.86031V9.69542H32.2101L31.9575 8.92213C30.9655 9.64613 30.0566 9.94805 29.234 9.94805C27.4348 9.94805 26.4243 8.87284 26.4243 7.05514C26.4243 5.12038 27.7706 4.09446 30.2569 4.09446L30.2599 4.09138ZM31.6556 7.3355V5.65336H30.528C29.2679 5.65336 28.6271 6.10625 28.6271 7.01509C28.6271 7.7052 28.9814 8.04101 29.7023 8.04101C30.3739 8.04101 31.2335 7.7052 31.6525 7.3355H31.6556Z"/>
                            <path d="M41.3755 8.74954C40.519 11.0355 39.4931 12.7023 37.9958 13.6265L36.4832 12.2309C37.3581 11.473 37.9804 10.7336 38.5165 9.74157L35.2539 0.847184L37.6908 0.190965L39.7766 7.40629L41.8438 0.160156L44.2499 0.831779L41.3755 8.75262V8.74954Z"/>
                        </svg>
                        <span class="visually-hidden">Kakao Pay</span>
                    </button>
                    </div>
                    <button
                        class="product-detail__cart"
                        type="button"
                        data-cart-add
                        data-shop-item="<?= $shopItemAttr ?>"
                        data-product-id="<?= $id ?>"
                        data-product-name="<?= $name ?>"
                        data-product-price="<?= $price ?>"
                        data-product-original-price="<?= $originalPrice ?>"
                        data-product-discount="<?= $discount ?>"
                        data-product-image="<?= e($images[0]['src'] ?? '') ?>">
                        장바구니에 담기
                    </button>
                </div>

                <p class="product-detail__feedback" role="status" aria-live="polite"></p>
            </form>
        </section>

        <section class="product-detail__reviews" aria-labelledby="review-title">
            <div class="review-head">
                <h2 id="review-title">REVIEW</h2>
                <div class="review-benefit">
                    <img
                        src="<?= BASE_URL ?>/assets/images/review/review-benefit-banner-curled-v2.png"
                        alt="리뷰 작성 시 3,000 point, Photo 리뷰 작성 시 5,000 point">
                </div>
                <div class="review-score" data-review-score data-base-count="<?= $reviewCount ?>" data-base-sum="<?= $reviewScoreSum ?>">
                    <strong><?= number_format($reviewAverage, 1) ?> / 5</strong>
                    <span>(<?= $reviewCount ?>개의 후기)</span>
                </div>
            </div>

            <div class="review-list">
                <?php foreach ($reviewItems as $reviewIndex => $review): ?>
                    <?php include __DIR__ . '/../includes/components/product-review-item.php'; ?>
                <?php endforeach; ?>
            </div>

            <nav class="pagination review-list__pagination" data-product-review-pagination aria-label="상품 후기 페이지 이동" hidden></nav>

            <form class="review-write" action="<?= BASE_URL ?>/actions/review_create.php" method="post" data-review-write data-demo-product-feedback>
                <?= csrf_input('product_feedback') ?>
                <input type="hidden" name="product_id" value="<?= $id ?>">
                <div class="review-write__box form-textarea-shell" id="review-write-panel" data-review-write-panel hidden>
                    <textarea
                        class="form-textarea form-textarea--large form-textarea--embedded"
                        name="review"
                        rows="5"
                        aria-label="리뷰 내용"
                        placeholder="<?= $isLoggedIn ? '후기를 남겨주세요.' : '로그인 후 이용해주세요.' ?>"
                        <?= $isLoggedIn ? '' : 'readonly data-login-required' ?>></textarea>

                    <div class="review-write__tools">
                        <div class="review-write__photo-field">
                            <button
                                class="review-write__photo"
                                type="button"
                                data-placeholder="true"
                                data-toast-message="사진 첨부 기능은 데모에서 지원하지 않습니다."
                                aria-label="사진 첨부 (데모 미지원)">
                                <img src="<?= BASE_URL ?>/assets/icons/camera.svg" alt="">
                                <span class="visually-hidden">사진 첨부</span>
                            </button>
                            <span class="review-write__photo-toast" role="status" data-photo-review-toast hidden>포토 리뷰 작성 시 5,000 point 적립</span>
                        </div>

                        <fieldset class="review-write__rating" aria-label="별점 선택">
                            <?php for ($star = 5; $star >= 1; $star--): ?>
                                <input
                                    id="review-rating-<?= $star ?>"
                                    type="radio"
                                    name="rating"
                                    value="<?= $star ?>"
                                    <?= $isLoggedIn ? '' : 'disabled' ?>>
                                <label for="review-rating-<?= $star ?>" aria-label="<?= $star ?>점"></label>
                            <?php endfor; ?>
                        </fieldset>
                    </div>
                </div>

                <button
                    class="review-write__submit"
                    type="button"
                    aria-expanded="false"
                    aria-controls="review-write-panel"
                    <?= $isLoggedIn ? 'data-review-write-toggle' : 'data-login-required' ?>>
                    리뷰쓰기
                </button>
            </form>
        </section>

        <section class="product-detail__accordions" aria-label="상품 상세 정보">
            <details class="detail-toggle">
                <summary>
                    <span>EXCHANGE / RETURN</span>
                    <svg class="detail-toggle__icon" viewBox="0 0 10 5" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
                        <path d="M1.41406 6.18106e-08L4.85352 3.43945L8.31856 3.63616e-07L9.70703 4.24308e-07L4.85352 4.85352L2.12154e-07 0L1.41406 6.18106e-08Z"/>
                    </svg>
                </summary>
                <div class="detail-toggle__body">
                    <ul>
                        <li>단순 변심의 경우 상품 수령일로부터 7일 이내 교환 및 반품을 신청해 주세요. (배송비 고객 부담)</li>
                        <li>제품 불량의 경우 상품 수령 후 24시간 이내 동일 상품으로 교환해 드리며 배송비는 fragfarm에서 부담합니다.</li>
                        <li>부주의로 인한 제품 오염 및 파손, 사용 흔적이 발견된 경우 교환 및 반품이 어렵습니다.</li>
                        <li>세탁, 향수, 착용 흔적 및 오염이 발견될 경우 반송 처리되며 배송비는 고객 부담입니다.</li>
                        <li>반품 및 교환 요청은 상품 상세 Q&amp;A 또는 채팅 상담을 통해 접수해 주세요.</li>
                        <li>교환 시 왕복 배송비가 발생하며 제주 및 도서산간 지역은 추가 비용이 발생할 수 있습니다.</li>
                        <li>사이즈 및 품목 교환은 상품 상세 Q&amp;A에 원하는 옵션을 함께 남겨 주세요.</li>
                        <li>반품 시 배송비 3,000원, 무료배송 주문 건은 총 6,000원이 차감 후 환불 처리됩니다.</li>
                        <li>세일 상품은 교환 및 반품이 불가합니다.</li>
                    </ul>
                </div>
            </details>

            <details class="detail-toggle">
                <summary>
                    <span>DELIVERY</span>
                    <svg class="detail-toggle__icon" viewBox="0 0 10 5" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
                        <path d="M1.41406 6.18106e-08L4.85352 3.43945L8.31856 3.63616e-07L9.70703 4.24308e-07L4.85352 4.85352L2.12154e-07 0L1.41406 6.18106e-08Z"/>
                    </svg>
                </summary>
                <div class="detail-toggle__body">
                    <ul>
                        <li>구매 금액 70,000원 이상 주문 시 무료 배송해 드립니다.</li>
                        <li>제주 및 도서산간 지역은 추가 배송비 2,000원이 발생할 수 있습니다.</li>
                        <li>생산처 사정에 따라 배송이 지연될 수 있으며 최대 1~2주 정도 소요될 수 있습니다.</li>
                        <li>배송 기간에 여유를 두고 주문해 주세요.</li>
                    </ul>
                </div>
            </details>
        </section>

        <section id="product-qna" class="product-detail__qna" aria-labelledby="qna-title">
            <details class="detail-toggle">
                <summary>
                    <span id="qna-title">Q&amp;A</span>
                    <svg class="detail-toggle__icon" viewBox="0 0 10 5" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
                        <path d="M1.41406 6.18106e-08L4.85352 3.43945L8.31856 3.63616e-07L9.70703 4.24308e-07L4.85352 4.85352L2.12154e-07 0L1.41406 6.18106e-08Z"/>
                    </svg>
                </summary>
                <div class="detail-toggle__body">
                    <div class="product-qna-list" data-product-qna-list>
                        <?php foreach ($productQnaItems as $qnaItem): ?>
                            <article class="product-qna-item" id="qna-<?= (int) $qnaItem['id'] ?>">
                                <div><strong><?= e($qnaItem['display_name']) ?></strong><time><?= e(date('Y.m.d', strtotime($qnaItem['created_at']))) ?></time></div>
                                <p><?= !empty($qnaItem['is_secret']) && empty($qnaItem['own']) ? '비밀글입니다.' : nl2br(e($qnaItem['content'])) ?></p>
                                <?php if ((empty($qnaItem['is_secret']) || !empty($qnaItem['own'])) && trim((string) ($qnaItem['answer_content'] ?? '')) !== ''): ?>
                                    <div class="product-qna-answer">
                                        <strong>답변</strong>
                                        <p><?= nl2br(e($qnaItem['answer_content'])) ?></p>
                                        <?php if (!empty($qnaItem['answered_at'])): ?><time><?= e(date('Y.m.d', strtotime($qnaItem['answered_at']))) ?></time><?php endif; ?>
                                    </div>
                                <?php endif; ?>
                                <?php if (!empty($qnaItem['own'])): ?>
                                    <form action="<?= BASE_URL ?>/actions/product_qna_delete.php" method="post" class="feedback-delete-form">
                                        <?= csrf_input('product_feedback') ?>
                                        <input type="hidden" name="product_id" value="<?= $id ?>">
                                        <input type="hidden" name="qna_id" value="<?= (int) $qnaItem['id'] ?>">
                                        <button type="submit">내 문의 삭제</button>
                                    </form>
                                <?php endif; ?>
                            </article>
                        <?php endforeach; ?>
                    </div>
                    <form class="qna-form" action="<?= BASE_URL ?>/actions/product_qna_create.php" method="post" data-demo-product-qna>
                        <?= csrf_input('product_feedback') ?>
                        <input type="hidden" name="product_id" value="<?= $id ?>">
                        <label for="qna-content">문의 내용</label>
                        <textarea
                            class="form-textarea"
                            id="qna-content"
                            name="qna"
                            rows="5"
                            placeholder="<?= $isLoggedIn ? '상품 문의를 남겨주세요.' : '로그인 후 이용해주세요.' ?>"
                            <?= $isLoggedIn ? '' : 'readonly data-login-required' ?>></textarea>
                        <label class="qna-secret"><input type="checkbox" name="is_secret" value="1"> 비밀글</label>
                        <button type="submit" <?= $isLoggedIn ? '' : 'data-login-required' ?>>작성하기</button>
                    </form>
                </div>
            </details>
        </section>

        <section class="product-detail__related" aria-labelledby="related-title">
            <h2 id="related-title">RELATED PRODUCTS</h2>
            <?php
                $relatedProducts = [
                    [
                        'href' => BASE_URL . '/pages/product-detail.php?id=top-008-na',
                        'src' => BASE_URL . '/assets/images/products/top-008-na-1.jpg',
                        'alt' => 'Blooming Short Tee'
                    ],
                    [
                        'href' => BASE_URL . '/pages/product-detail.php?id=skirt-005-wh',
                        'src' => BASE_URL . '/assets/images/products/skirt-005-wh-1.jpg',
                        'alt' => 'White skirt'
                    ],
                    [
                        'href' => BASE_URL . '/pages/product-detail.php?id=accessory-007-wh',
                        'src' => BASE_URL . '/assets/images/products/accessory-007-wh-1.jpg',
                        'alt' => 'White accessory'
                    ],
                ];
            ?>
            <ul class="related-list">
                <?php foreach ($relatedProducts as $relatedProduct): ?>
                    <li>
                        <a href="<?= e($relatedProduct['href']) ?>">
                            <img src="<?= e($relatedProduct['src']) ?>" alt="<?= e($relatedProduct['alt']) ?>">
                        </a>
                    </li>
                <?php endforeach; ?>
            </ul>
        </section>
    </main>

    <?php include __DIR__ . '/../includes/footer.php'; ?>
    <?php include __DIR__ . '/../includes/chat-launcher.php'; ?>
</div>

<script src="<?= BASE_URL ?>/js/header.js"></script>
<script src="<?= BASE_URL ?>/js/product-detail.js"></script>
<script type="application/json" id="shop-sample-data"><?= json_encode(shop_sample_items($products), JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES) ?></script>
<script src="<?= BASE_URL ?>/js/shop-store.js"></script>
<script src="<?= BASE_URL ?>/js/shop-product-actions.js"></script>
<?php if (FRAGFARM_DEMO_MODE): ?><script src="<?= BASE_URL ?>/js/demo-product-feedback.js"></script><?php endif; ?>
</body>
</html>

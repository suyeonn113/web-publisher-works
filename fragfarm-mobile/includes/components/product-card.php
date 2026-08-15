
<?php

if (!isset($product) || !is_array($product)) {
    return;
}

$rawId = (string) ($product['id'] ?? '');
$id = htmlspecialchars($rawId, ENT_QUOTES, 'UTF-8');
$name = htmlspecialchars($product['name'] ?? '', ENT_QUOTES, 'UTF-8');
$price = (int) ($product['price'] ?? 0);
$originalPrice = (int) ($product['originalPrice'] ?? 0);
$discount = (int) ($product['discount'] ?? 0);
$category = htmlspecialchars($product['category'] ?? '', ENT_QUOTES, 'UTF-8');
$productState = $product['state'] ?? [];
$isSoldOut = in_array('soldout', $productState, true);
$images = $product['images'] ?? [];
$cardImage = $product['cardImage'] ?? null;
$displayImages = $images;

if (is_array($cardImage) && ($cardImage['src'] ?? '') !== ($images[0]['src'] ?? '')) {
    array_unshift($displayImages, $cardImage);
}

$hasMultipleImages = count($displayImages) > 1;
$galleryStatusId = 'product-gallery-status-' . preg_replace('/[^a-zA-Z0-9_-]/', '-', $rawId);

$rating = number_format((float) ($product['rating'] ?? 0), 1);
$reviewCount = (int) ($product['reviewCount'] ?? 0);
$createdAt = htmlspecialchars($product['createdAt'] ?? '', ENT_QUOTES, 'UTF-8');

$stateAttr = htmlspecialchars(implode(' ', $productState), ENT_QUOTES, 'UTF-8');
$shopItem = function_exists('shop_item_from_product')
    ? shop_item_from_product($product)
    : [
        'id' => $product['id'] ?? '',
        'name' => $product['name'] ?? '',
        'price' => $price,
        'originalPrice' => $originalPrice,
        'discount' => $discount,
        'image' => $cardImage['src'] ?? $images[0]['src'] ?? '',
        'size' => 'S',
        'quantity' => 1,
    ];
$shopItemAttr = function_exists('shop_item_json')
    ? shop_item_json($shopItem)
    : htmlspecialchars(json_encode($shopItem, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES), ENT_QUOTES, 'UTF-8');

$badges = [];

if (!$isSoldOut) {
    if (in_array('sale', $productState, true)) {
        $badges[] = ['type' => 'sale', 'text' => 'SALE', 'label' => '세일'];
    }

    if (in_array('new', $productState, true)) {
        $badges[] = ['type' => 'new', 'text' => 'NEW', 'label' => '신제품'];
    }
}
?>

<li>
    <article
        class="product__card product__card--detail"
        data-id="<?= $id ?>"
        data-name="<?= $name ?>"
        data-price="<?= $price ?>"
        data-original-price="<?= $originalPrice ?>"
        data-discount="<?= $discount ?>"
        data-review-count="<?= $reviewCount ?>"
        data-created-at="<?= $createdAt ?>"
        data-category="<?= $category ?>"
        data-state="<?= $stateAttr ?>">
        <?php if ($isSoldOut): ?>
            <div class="product__link product__link--soldout">
        <?php else: ?>
            <a
                class="product__link"
                href="<?= BASE_URL ?>/pages/product-detail.php?id=<?= $id ?>"
                <?= $hasMultipleImages ? 'aria-describedby="' . htmlspecialchars($galleryStatusId, ENT_QUOTES, 'UTF-8') . '"' : '' ?>
                data-role="link">
        <?php endif; ?>
            <div class="product__media">
                <div class="product__gallery" aria-label="상품 이미지 미리보기" tabindex="-1">
                    <ul class="product__gallery-track">
                        <?php foreach ($displayImages as $imageIndex => $image): ?>
                            <?php
                            $imageAlt = trim((string) ($image['alt'] ?? ''));
                            if ($imageAlt === '') {
                                $imageAlt = ($product['name'] ?? '상품') . ' 이미지 ' . ($imageIndex + 1);
                            }
                            ?>
                            <li class="product__gallery-item">
                                <img
                                    class="product__gallery-image"
                                    src="<?= BASE_URL . htmlspecialchars($image['src'], ENT_QUOTES, 'UTF-8') ?>"
                                    alt="<?= htmlspecialchars($imageAlt, ENT_QUOTES, 'UTF-8') ?>">
                            </li>
                        <?php endforeach; ?>
                    </ul>
                </div>
                <?php if ($hasMultipleImages): ?>
                    <ol class="pagination__dots" aria-label="상품 이미지 위치">
                        <?php foreach ($displayImages as $index => $image): ?>
                            <li class="pagination__dot-item">
                                <span
                                    class="pagination__dot<?= $index === 0 ? ' is-current' : '' ?>"
                                    aria-hidden="true"></span>
                                <span class="visually-hidden">
                                    <?= $index + 1 ?> / <?= count($displayImages) ?>
                                    <?= $index === 0 ? ' 현재 이미지' : '' ?>
                                </span>
                            </li>
                        <?php endforeach; ?>
                    </ol>
                    <span
                        id="<?= htmlspecialchars($galleryStatusId, ENT_QUOTES, 'UTF-8') ?>"
                        class="visually-hidden"
                        data-gallery-status
                        role="status"
                        aria-live="polite">
                        1 / <?= count($displayImages) ?> 이미지. 좌우 방향키로 상품 이미지를 확인할 수 있습니다.
                    </span>
                <?php endif; ?>
                <?php if ($badges !== []): ?>
                    <div class="product__badges">
                        <?php foreach ($badges as $badge): ?>
                            <span
                                class="status-badge product__badge font-brand"
                                data-role="product-badge"
                                data-badge="<?= htmlspecialchars($badge['type'], ENT_QUOTES, 'UTF-8') ?>"
                                aria-label="<?= htmlspecialchars($badge['label'], ENT_QUOTES, 'UTF-8') ?>">
                                <?= htmlspecialchars($badge['text'], ENT_QUOTES, 'UTF-8') ?>
                            </span>
                        <?php endforeach; ?>
                    </div>
                <?php endif; ?>
            </div>
            <div class="product__meta">
                <div class="product__title-row">
                    <h3 class="product__name" data-role="product-name"><?= $name ?></h3>
                    <p class="product__review" aria-label="리뷰 <?= $reviewCount ?>개">
                        <span>Review(<span data-role="product-review-count"><?= $reviewCount ?></span>)</span>
                    </p>
                </div>
                <p class="product__price" data-role="product-price">
                    <?php if ($isSoldOut): ?>
                        <span class="product__price--regular" data-role="product-price-original">
                            <?= number_format($originalPrice > 0 ? $originalPrice : $price) ?>원
                        </span>
                    <?php else: ?>
                        <?php if ($discount > 0): ?>
                            <span class="product__price--discount" data-role="product-price-discount">
                                <?= $discount ?>%
                            </span>
                            <span class="product__price--original" data-role="product-price-original">
                                <?= number_format($originalPrice) ?>원
                            </span>
                        <?php endif; ?>

                        <span class="product__price--sale" data-role="product-price-sale">
                            <?= number_format($price) ?>원
                        </span>
                    <?php endif; ?>
                </p>
            </div>
        <?php if ($isSoldOut): ?>
            </div>
        <?php else: ?>
            </a>
        <?php endif; ?>
        <div class="product__footer">
            <div class="product__actions">
                <?php if ($isSoldOut): ?>
                    <span class="product__soldout-action">품절</span>
                <?php else: ?>
                    <button
                        class="product__btn product__btn--cart"
                        type="button"
                        data-action="add-to-cart"
                        data-shop-item="<?= $shopItemAttr ?>"
                        aria-haspopup="dialog"
                        aria-label="장바구니에 담기">
                        <svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
                            <path d="M19.1433 0.5H15.5719L14.329 12.8571C14.2773 13.1978 14.1043 13.5083 13.8418 13.7314C13.5793 13.9546 13.2449 14.0753 12.9004 14.0714H3.90043C3.5889 14.0877 3.28062 14.0015 3.02266 13.8261C2.76471 13.6507 2.57125 13.3957 2.47186 13.1L0.571856 7.38571C0.501015 7.17088 0.482206 6.94229 0.516977 6.71876C0.551747 6.49524 0.639104 6.28317 0.771856 6.1C0.910153 5.90526 1.09507 5.7483 1.3097 5.64348C1.52433 5.53866 1.76181 5.48933 2.00043 5.5H15.0719"/>
                            <path d="M4.14327 19.0715C4.53776 19.0715 4.85756 18.7517 4.85756 18.3572C4.85756 17.9627 4.53776 17.6429 4.14327 17.6429C3.74878 17.6429 3.42899 17.9627 3.42899 18.3572C3.42899 18.7517 3.74878 19.0715 4.14327 19.0715Z"/>
                            <path d="M13.429 19.0715C13.8235 19.0715 14.1433 18.7517 14.1433 18.3572C14.1433 17.9627 13.8235 17.6429 13.429 17.6429C13.0345 17.6429 12.7147 17.9627 12.7147 18.3572C12.7147 18.7517 13.0345 19.0715 13.429 19.0715Z"/>
                        </svg>
                    </button>
                    <button
                        class="product__btn product__btn--wish"
                        type="button"
                        data-action="toggle-wish"
                        data-shop-item="<?= $shopItemAttr ?>"
                        aria-pressed="false"
                        aria-label="위시리스트에 담기">
                        <svg viewBox="0 0 14 12" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
                            <path d="M6.80457 11.0151L1.4575 6.17174C-1.44851 3.26572 2.82333 -2.31382 6.80457 2.20019C10.7858 -2.31382 15.0383 3.2851 12.1516 6.17174L6.80457 11.0151Z"/>
                        </svg>
                    </button>
                <?php endif; ?>
            </div>
        </div>
    </article>
</li>

<?php

if (!isset($product) || !is_array($product)) {
    return;
}

$id = htmlspecialchars($product['id'] ?? '', ENT_QUOTES, 'UTF-8');
$price = (int) ($product['price'] ?? 0);
$originalPrice = (int) ($product['originalPrice'] ?? 0);
$discount = (int) ($product['discount'] ?? 0);
$images = $product['images'] ?? [];
$image = $images[0] ?? null;
$highlightedName = highlightProductSearchTerm((string) ($product['name'] ?? ''), (string) ($keyword ?? ''));

if (!$image) {
    return;
}
?>

<li class="search-card">
    <a class="search-card__link" href="<?= BASE_URL ?>/pages/product-detail.php?id=<?= $id ?>">
        <span class="search-card__thumb">
            <img
                class="search-card__image"
                src="<?= BASE_URL . htmlspecialchars($image['src'], ENT_QUOTES, 'UTF-8') ?>"
                alt="<?= htmlspecialchars($image['alt'], ENT_QUOTES, 'UTF-8') ?>">
        </span>

        <span class="search-card__body">
            <strong class="search-card__name"><?= $highlightedName ?></strong>
            <span class="search-card__price">
                <?php if ($discount > 0): ?>
                    <span class="search-card__discount"><?= $discount ?>%</span>
                    <span class="search-card__original"><?= number_format($originalPrice) ?>원</span>
                <?php endif; ?>
                <span class="search-card__sale"><?= number_format($price) ?>원</span>
            </span>
        </span>
    </a>
</li>

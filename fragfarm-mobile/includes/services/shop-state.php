<?php

function shop_format_price($price): string
{
    return number_format((int) $price) . '원';
}

function shop_find_product(array $products, string $id): ?array
{
    foreach ($products as $product) {
        if (($product['id'] ?? '') === $id) {
            return $product;
        }
    }

    return null;
}

function shop_item_from_product(array $product, array $overrides = []): array
{
    $images = $product['images'] ?? [];
    $image = $product['cardImage']['src'] ?? $images[0]['src'] ?? '';
    $originalPrice = (int) ($product['originalPrice'] ?? $product['price'] ?? 0);
    $price = (int) ($product['price'] ?? 0);
    $sizeText = (string) ($product['details']['size'] ?? 'One Size');
    $sizes = array_values(array_filter(array_map('trim', explode(',', $sizeText))));
    if (empty($sizes)) $sizes = ['One Size'];

    return array_merge([
        'id' => (string) ($product['id'] ?? ''),
        'name' => (string) ($product['name'] ?? ''),
        'price' => $price,
        'originalPrice' => $originalPrice,
        'discount' => (int) ($product['discount'] ?? 0),
        'image' => $image,
        'sizes' => $sizes,
        'size' => $sizes[0],
        'option' => '',
        'quantity' => 1,
    ], $overrides);
}

function shop_sample_items(array $products): array
{
    $map = [];

    foreach ([
        'cart' => [
            ['skirt-004-na', ['size' => 'S']],
            ['top-006-na', ['size' => 'S']],
            ['accessory-002-bl', ['option' => 'Finger Hole O']],
        ],
        'wishlist' => [
            ['top-005-wh', ['size' => 'S']],
            ['bottom-003-bk', ['size' => 'S']],
            ['top-006-na', ['size' => 'S']],
            ['top-004-wh', ['size' => 'M']],
            ['accessory-002-bk', ['option' => 'Black']],
            ['accessory-002-bl', ['option' => 'Finger Hole O']],
            ['skirt-004-na', ['size' => 'S']],
        ],
    ] as $group => $items) {
        $map[$group] = [];

        foreach ($items as [$id, $overrides]) {
            $product = shop_find_product($products, $id);

            if ($product) {
                $map[$group][] = shop_item_from_product($product, $overrides);
            }
        }
    }

    return $map;
}

function shop_item_json(array $item): string
{
    return htmlspecialchars(
        json_encode($item, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES),
        ENT_QUOTES,
        'UTF-8'
    );
}

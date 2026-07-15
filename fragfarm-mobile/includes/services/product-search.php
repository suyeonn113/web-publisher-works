<?php

function normalizeSearchQuery(array $query): array
{
    return [
        'q' => trim((string) ($query['q'] ?? '')),
        'page' => max(1, (int) ($query['page'] ?? 1)),
    ];
}

function normalizeSearchText($value): string
{
    $text = (string) $value;
    $text = function_exists('mb_strtolower')
        ? mb_strtolower($text, 'UTF-8')
        : strtolower($text);
    $text = preg_replace('/\s+/u', ' ', $text);

    return trim($text);
}

function getProductCategorySearchTerms($category): array
{
    $aliasMap = [
        'top' => [
            'top', 'tops', 'shirt', 'shirts', 'tee', 't-shirt', 'blouse',
            '상의', '티', '티셔츠', '셔츠', '블라우스',
        ],
        'bottom' => [
            'bottom', 'bottoms', 'pants', 'trousers', 'slacks', 'shorts', 'bermuda',
            '하의', '바지', '팬츠', '슬랙스', '반바지', '쇼츠', '버뮤다',
        ],
        'skirt' => ['skirt', 'skirts', '치마', '스커트'],
        'outer' => [
            'outer', 'outers', 'jacket', 'jackets', 'coat', 'coats', 'cardigan',
            '아우터', '재킷', '자켓', '코트', '가디건',
        ],
        'dress' => ['dress', 'dresses', 'onepiece', 'one-piece', '드레스', '원피스'],
        'accessory' => [
            'accessory', 'accessories', 'acc', 'bag', 'bags', 'hat', 'hats', 'scarf', 'keyring',
            '액세서리', '악세사리', '악세서리','악세서리', '소품', '가방', '모자', '스카프', '키링',
        ],
    ];

    $normalizedCategory = normalizeSearchText($category);

    if ($normalizedCategory === '') {
        return [];
    }

    foreach ($aliasMap as $key => $aliases) {
        if ($normalizedCategory === $key || in_array($normalizedCategory, $aliases, true)) {
            return $aliases;
        }
    }

    return [$normalizedCategory];
}

function buildProductSearchHaystack(array $product): string
{
    $stateTokens = $product['state'] ?? [];

    if (!is_array($stateTokens)) {
        $stateTokens = [];
    }

    $searchParts = [
        $product['name'] ?? '',
        $product['category'] ?? '',
        $product['color'] ?? '',
        $product['description'] ?? '',
        ...$stateTokens,
        ...getProductCategorySearchTerms($product['category'] ?? ''),
    ];

    return normalizeSearchText(implode(' ', $searchParts));
}

function searchProducts(array $products, array $state): array
{
    $itemsPerPage = 10;
    $keyword = normalizeSearchText($state['q']);

    if ($keyword === '') {
        return [
            'items' => [],
            'totalProducts' => 0,
            'totalPages' => 1,
            'currentPage' => 1,
            'hasQuery' => false,
        ];
    }

    $matchedProducts = array_values(array_filter($products, function ($product) use ($keyword) {
        return str_contains(buildProductSearchHaystack($product), $keyword);
    }));

    usort($matchedProducts, function ($a, $b) {
        $stateA = is_array($a['state'] ?? null) ? $a['state'] : [];
        $stateB = is_array($b['state'] ?? null) ? $b['state'] : [];

        $isSoldOutA = in_array('soldout', $stateA, true);
        $isSoldOutB = in_array('soldout', $stateB, true);

        if ($isSoldOutA !== $isSoldOutB) {
            return $isSoldOutA ? 1 : -1;
        }

        return strtotime($b['createdAt'] ?? '1970-01-01')
            <=> strtotime($a['createdAt'] ?? '1970-01-01');
    });

    $totalProducts = count($matchedProducts);
    $totalPages = max(1, (int) ceil($totalProducts / $itemsPerPage));
    $currentPage = min($state['page'], $totalPages);
    $offset = ($currentPage - 1) * $itemsPerPage;

    return [
        'items' => array_slice($matchedProducts, $offset, $itemsPerPage),
        'totalProducts' => $totalProducts,
        'totalPages' => $totalPages,
        'currentPage' => $currentPage,
        'hasQuery' => true,
    ];
}

function buildProductSearchUrl(array $state, array $overrides = []): string
{
    $nextState = array_merge($state, $overrides);
    $params = ['q' => $nextState['q'] ?? ''];

    if (($nextState['page'] ?? 1) > 1) {
        $params['page'] = (int) $nextState['page'];
    }

    return '?' . http_build_query($params);
}

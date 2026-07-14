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
    $text = mb_strtolower((string) $value, 'UTF-8');
    $text = preg_replace('/\s+/u', ' ', $text);

    return trim($text);
}

function getProductCategorySearchTerms($category): array
{
    $aliasMap = [
        'top' => ['top', 'tops', 'shirt', 'shirts', 'tee', 't-shirt', 'blouse'],
        'bottom' => ['bottom', 'bottoms', 'pants', 'trousers', 'skirt', 'skirts'],
        'outer' => ['outer', 'outers', 'jacket', 'jackets', 'coat', 'coats', 'cardigan'],
        'dress' => ['dress', 'dresses', 'onepiece', 'one-piece'],
        'accessory' => ['accessory', 'accessories', 'acc', 'bag', 'bags', 'hat', 'hats'],
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
    $itemsPerPage = 8;
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

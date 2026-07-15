<?php

function normalizeProductListState(array $query): array
{
    $state = [
        'category' => $query['category'] ?? 'all',
        'sort' => $query['sort'] ?? 'latest',
        'page' => max(1, (int) ($query['page'] ?? 1)),
        'view' => $query['view'] ?? '2col',
    ];

    $allowedViews = ['1col', '2col'];
    if (!in_array($state['view'], $allowedViews, true)) {
        $state['view'] = '2col';
    }

    return $state;
}

function applyProductListState(array $products, array $state): array
{
    $itemsPerPage = 10;

    // 1. 필터
    $filteredProducts = array_filter($products, function ($product) use ($state) {
        if ($state['category'] === 'all') {
            return true;
        }

        $categoryTokens = preg_split('/\s+/', trim((string) ($product['category'] ?? '')));
        $categoryTokens = array_filter($categoryTokens);

        $stateTokens = $product['state'] ?? [];
        if (!is_array($stateTokens)) {
            $stateTokens = [];
        }

        if ($state['category'] === 'sale' || $state['category'] === 'new') {
            return in_array($state['category'], $stateTokens, true);
        }

        return in_array($state['category'], $categoryTokens, true);
    });

    $filteredProducts = array_values($filteredProducts);

    // 2. 정렬
    usort($filteredProducts, function ($a, $b) use ($state) {
        $stateA = is_array($a['state'] ?? null) ? $a['state'] : [];
        $stateB = is_array($b['state'] ?? null) ? $b['state'] : [];

        $isSoldOutA = in_array('soldout', $stateA, true);
        $isSoldOutB = in_array('soldout', $stateB, true);

        if ($isSoldOutA !== $isSoldOutB) {
            return $isSoldOutA ? 1 : -1;
        }

        switch ($state['sort']) {
            case 'review':
                return ($b['reviewCount'] ?? 0) <=> ($a['reviewCount'] ?? 0);

            case 'discount':
                return ($b['discount'] ?? 0) <=> ($a['discount'] ?? 0);

            case 'latest':
            default:
                return strtotime($b['createdAt'] ?? '1970-01-01')
                    <=> strtotime($a['createdAt'] ?? '1970-01-01');
        }
    });

    // 3. 페이지네이션
    $totalProducts = count($filteredProducts);
    $totalPages = max(1, (int) ceil($totalProducts / $itemsPerPage));
    $currentPage = min($state['page'], $totalPages);
    $offset = ($currentPage - 1) * $itemsPerPage;

    return [
        'items' => array_slice($filteredProducts, $offset, $itemsPerPage),
        'totalProducts' => $totalProducts,
        'totalPages' => $totalPages,
        'currentPage' => $currentPage,
    ];
}

function buildProductListUrl(array $state, array $overrides = []): string
{
    $nextState = array_merge($state, $overrides);

    $params = [
        'category' => $nextState['category'] ?? 'all',
        'view' => $nextState['view'] ?? '2col',
    ];

    if (($nextState['sort'] ?? 'latest') !== 'latest') {
        $params['sort'] = $nextState['sort'];
    }

    if (($nextState['page'] ?? 1) > 1) {
        $params['page'] = (int) $nextState['page'];
    }

    if (($nextState['focus'] ?? '') === 'catalog') {
        $params['focus'] = 'catalog';
    }

    return '?' . http_build_query($params);
}

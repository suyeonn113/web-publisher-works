<?php

function notice_database_is_configured(): bool
{
    if (!defined('FRAGFARM_DEMO_MODE') || !FRAGFARM_DEMO_MODE) {
        return true;
    }

    $config = [
        'host' => getenv('FRAGFARM_DB_HOST') ?: '',
        'user' => getenv('FRAGFARM_DB_USER') ?: '',
        'database' => getenv('FRAGFARM_DB_NAME') ?: '',
    ];
    $localConfigPath = __DIR__ . '/../db.local.php';

    if (is_file($localConfigPath)) {
        $localConfig = require $localConfigPath;

        if (is_array($localConfig)) {
            $config = array_merge($config, $localConfig);
        }
    }

    foreach (['host', 'user', 'database'] as $key) {
        $value = trim((string) ($config[$key] ?? ''));

        if ($value === '' || strpos($value, 'DOTHOME_') === 0) {
            return false;
        }
    }

    return true;
}

function notice_table_exists(mysqli $mysqli): bool
{
    $result = mysqli_query($mysqli, "SHOW TABLES LIKE 'fragfarm_posts'");

    return $result && mysqli_num_rows($result) > 0;
}

function notice_fetch_demo_posts(array $posts, string $keyword = '', int $page = 1, int $perPage = 10): array
{
    $keyword = trim($keyword);
    $items = array_values(array_filter($posts, static function (array $post) use ($keyword): bool {
        if ((int) ($post['is_notice'] ?? 0) !== 1) {
            return false;
        }

        $searchText = (string) ($post['title'] ?? '') . "\n" . (string) ($post['content'] ?? '');

        return $keyword === '' || stripos($searchText, $keyword) !== false;
    }));

    usort($items, static function (array $left, array $right): int {
        $dateOrder = strcmp((string) ($right['created_at'] ?? ''), (string) ($left['created_at'] ?? ''));

        return $dateOrder !== 0 ? $dateOrder : ((int) ($right['id'] ?? 0) <=> (int) ($left['id'] ?? 0));
    });

    $totalItems = count($items);
    $totalPages = max(1, (int) ceil($totalItems / $perPage));
    $currentPage = min(max(1, $page), $totalPages);
    $offset = ($currentPage - 1) * $perPage;

    return [
        'items' => array_slice($items, $offset, $perPage),
        'totalItems' => $totalItems,
        'totalPages' => $totalPages,
        'currentPage' => $currentPage,
    ];
}

function notice_fetch_demo_post(array $posts, int $id): ?array
{
    foreach ($posts as $post) {
        if ((int) ($post['id'] ?? 0) === $id && (int) ($post['is_notice'] ?? 0) === 1) {
            return $post;
        }
    }

    return null;
}

function notice_fetch_posts(mysqli $mysqli, string $keyword = '', int $page = 1, int $perPage = 10): array
{
    if (!notice_table_exists($mysqli)) {
        return [
            'items' => [],
            'totalItems' => 0,
            'totalPages' => 1,
            'currentPage' => 1,
        ];
    }

    $keyword = trim($keyword);
    $currentPage = max(1, $page);
    $params = [];
    $types = '';
    $where = 'WHERE is_notice = 1';

    if ($keyword !== '') {
        $where .= ' AND (title LIKE ? OR content LIKE ?)';
        $params[] = '%' . $keyword . '%';
        $params[] = '%' . $keyword . '%';
        $types = 'ss';
    }

    $countStmt = mysqli_prepare($mysqli, "SELECT COUNT(*) AS total FROM fragfarm_posts {$where}");

    if ($types !== '') {
        mysqli_stmt_bind_param($countStmt, $types, ...$params);
    }

    mysqli_stmt_execute($countStmt);
    $countResult = mysqli_stmt_get_result($countStmt);
    $totalItems = (int) (mysqli_fetch_assoc($countResult)['total'] ?? 0);
    mysqli_stmt_close($countStmt);

    $totalPages = max(1, (int) ceil($totalItems / $perPage));
    $currentPage = min($currentPage, $totalPages);
    $offset = ($currentPage - 1) * $perPage;
    $listStmt = mysqli_prepare(
        $mysqli,
        "SELECT id, title, content, image_src, created_at FROM fragfarm_posts {$where} ORDER BY created_at DESC, id DESC LIMIT ? OFFSET ?"
    );
    $listParams = [...$params, $perPage, $offset];
    $listTypes = $types . 'ii';

    mysqli_stmt_bind_param($listStmt, $listTypes, ...$listParams);
    mysqli_stmt_execute($listStmt);
    $listResult = mysqli_stmt_get_result($listStmt);
    $items = $listResult ? mysqli_fetch_all($listResult, MYSQLI_ASSOC) : [];
    mysqli_stmt_close($listStmt);

    return [
        'items' => $items,
        'totalItems' => $totalItems,
        'totalPages' => $totalPages,
        'currentPage' => $currentPage,
    ];
}

function notice_fetch_post(mysqli $mysqli, int $id): ?array
{
    if (!notice_table_exists($mysqli)) {
        return null;
    }

    $stmt = mysqli_prepare(
        $mysqli,
        'SELECT id, title, content, image_src, created_at FROM fragfarm_posts WHERE id = ? AND is_notice = 1 LIMIT 1'
    );
    mysqli_stmt_bind_param($stmt, 'i', $id);
    mysqli_stmt_execute($stmt);
    $result = mysqli_stmt_get_result($stmt);
    $post = mysqli_fetch_assoc($result);
    mysqli_stmt_close($stmt);

    return $post ?: null;
}

function notice_build_url(array $params = []): string
{
    $query = array_filter($params, static fn($value) => $value !== '' && $value !== null);

    return empty($query) ? 'notice.php' : 'notice.php?' . http_build_query($query);
}

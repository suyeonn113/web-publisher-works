<?php

function qna_table_exists(mysqli $mysqli): bool
{
    $result = mysqli_query($mysqli, "SHOW TABLES LIKE 'fragfarm_qna_posts'");

    return $result && mysqli_num_rows($result) > 0;
}

function qna_fetch_posts(mysqli $mysqli, string $keyword = '', int $page = 1, int $perPage = 10): array
{
    if (!qna_table_exists($mysqli)) {
        return [
            'notices' => [],
            'items' => [],
            'totalItems' => 0,
            'totalPages' => 1,
            'currentPage' => 1,
        ];
    }

    $keyword = trim($keyword);
    $currentPage = max(1, $page);
    $offset = ($currentPage - 1) * $perPage;
    $params = [];
    $types = '';
    $where = 'WHERE is_notice = 0';

    if ($keyword !== '') {
        $where .= ' AND title LIKE ?';
        $params[] = '%' . $keyword . '%';
        $types .= 's';
    }

    $noticeResult = mysqli_query(
        $mysqli,
        'SELECT * FROM fragfarm_qna_posts WHERE is_notice = 1 ORDER BY created_at DESC, id DESC LIMIT 6'
    );
    $notices = $noticeResult ? mysqli_fetch_all($noticeResult, MYSQLI_ASSOC) : [];

    $countSql = "SELECT COUNT(*) AS total FROM fragfarm_qna_posts {$where}";
    $countStmt = mysqli_prepare($mysqli, $countSql);

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

    $listSql = "SELECT * FROM fragfarm_qna_posts {$where} ORDER BY created_at DESC, id DESC LIMIT ? OFFSET ?";
    $listStmt = mysqli_prepare($mysqli, $listSql);
    $listParams = [...$params, $perPage, $offset];
    $listTypes = $types . 'ii';

    mysqli_stmt_bind_param($listStmt, $listTypes, ...$listParams);
    mysqli_stmt_execute($listStmt);
    $listResult = mysqli_stmt_get_result($listStmt);
    $items = $listResult ? mysqli_fetch_all($listResult, MYSQLI_ASSOC) : [];
    mysqli_stmt_close($listStmt);

    return [
        'notices' => $notices,
        'items' => $items,
        'totalItems' => $totalItems,
        'totalPages' => $totalPages,
        'currentPage' => $currentPage,
    ];
}

function qna_fetch_post(mysqli $mysqli, int $id): ?array
{
    if (!qna_table_exists($mysqli)) {
        return null;
    }

    $stmt = mysqli_prepare($mysqli, 'SELECT * FROM fragfarm_qna_posts WHERE id = ? LIMIT 1');
    mysqli_stmt_bind_param($stmt, 'i', $id);
    mysqli_stmt_execute($stmt);
    $result = mysqli_stmt_get_result($stmt);
    $post = mysqli_fetch_assoc($result);
    mysqli_stmt_close($stmt);

    return $post ?: null;
}

function qna_build_url(array $params = []): string
{
    $query = array_filter($params, static fn($value) => $value !== '' && $value !== null);

    return empty($query) ? 'qna.php' : 'qna.php?' . http_build_query($query);
}

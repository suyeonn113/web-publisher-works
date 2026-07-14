<?php

function feedback_table_exists(mysqli $mysqli, string $table): bool
{
    $allowed = ['fragfarm_product_reviews', 'fragfarm_review_comments', 'fragfarm_product_qna'];
    if (!in_array($table, $allowed, true)) return false;
    $result = mysqli_query($mysqli, "SHOW TABLES LIKE '{$table}'");
    return $result && mysqli_num_rows($result) > 0;
}

function feedback_column_exists(mysqli $mysqli, string $table, string $column): bool
{
    $allowed = [
        'fragfarm_product_qna' => ['answer_content', 'answered_at'],
    ];
    if (!isset($allowed[$table]) || !in_array($column, $allowed[$table], true)) return false;
    $result = mysqli_query($mysqli, "SHOW COLUMNS FROM {$table} LIKE '{$column}'");
    return $result && mysqli_num_rows($result) > 0;
}

function feedback_qna_answer_select(mysqli $mysqli, string $alias = 'q'): string
{
    $hasAnswer = feedback_column_exists($mysqli, 'fragfarm_product_qna', 'answer_content');
    $hasAnsweredAt = feedback_column_exists($mysqli, 'fragfarm_product_qna', 'answered_at');
    return ($hasAnswer ? "{$alias}.answer_content" : 'NULL AS answer_content')
        . ', '
        . ($hasAnsweredAt ? "{$alias}.answered_at" : 'NULL AS answered_at');
}

function feedback_mask_name(string $name): string
{
    $first = mb_substr($name, 0, 1, 'UTF-8');
    return $first === '' ? '회**' : $first . '**';
}

function feedback_fetch_reviews(mysqli $mysqli, string $productId, int $memberId = 0): array
{
    if (!feedback_table_exists($mysqli, 'fragfarm_product_reviews')) return [];
    $sql = 'SELECT r.id, r.member_id, r.rating, r.content, r.created_at, m.user_name FROM fragfarm_product_reviews r INNER JOIN fragfarm_members m ON m.id = r.member_id WHERE r.product_id = ? ORDER BY r.created_at DESC, r.id DESC';
    $stmt = mysqli_prepare($mysqli, $sql);
    mysqli_stmt_bind_param($stmt, 's', $productId);
    mysqli_stmt_execute($stmt);
    $result = mysqli_stmt_get_result($stmt);
    $items = [];
    while ($row = mysqli_fetch_assoc($result)) {
        $row['own'] = $memberId > 0 && (int) $row['member_id'] === $memberId;
        $row['display_name'] = feedback_mask_name($row['user_name']);
        $items[] = $row;
    }
    mysqli_stmt_close($stmt);
    return $items;
}

function feedback_fetch_review_comments(mysqli $mysqli, string $productId, int $memberId = 0): array
{
    if (!feedback_table_exists($mysqli, 'fragfarm_review_comments')) return [];
    $sql = 'SELECT c.id, c.review_key, c.member_id, c.content, c.created_at, m.user_name FROM fragfarm_review_comments c INNER JOIN fragfarm_members m ON m.id = c.member_id WHERE c.product_id = ? ORDER BY c.created_at ASC, c.id ASC';
    $stmt = mysqli_prepare($mysqli, $sql);
    mysqli_stmt_bind_param($stmt, 's', $productId);
    mysqli_stmt_execute($stmt);
    $result = mysqli_stmt_get_result($stmt);
    $groups = [];
    while ($row = mysqli_fetch_assoc($result)) {
        $key = (string) $row['review_key'];
        $groups[$key][] = [
            'id' => (int) $row['id'],
            'author' => feedback_mask_name($row['user_name']),
            'body' => $row['content'],
            'own' => $memberId > 0 && (int) $row['member_id'] === $memberId,
        ];
    }
    mysqli_stmt_close($stmt);
    return $groups;
}

function feedback_fetch_qna(mysqli $mysqli, string $productId, int $memberId = 0): array
{
    if (!feedback_table_exists($mysqli, 'fragfarm_product_qna')) return [];
    $answerSelect = feedback_qna_answer_select($mysqli);
    $sql = "SELECT q.id, q.member_id, q.content, q.is_secret, q.created_at, {$answerSelect}, m.user_name FROM fragfarm_product_qna q INNER JOIN fragfarm_members m ON m.id = q.member_id WHERE q.product_id = ? ORDER BY q.created_at DESC, q.id DESC";
    $stmt = mysqli_prepare($mysqli, $sql);
    mysqli_stmt_bind_param($stmt, 's', $productId);
    mysqli_stmt_execute($stmt);
    $result = mysqli_stmt_get_result($stmt);
    $items = [];
    while ($row = mysqli_fetch_assoc($result)) {
        $row['own'] = $memberId > 0 && (int) $row['member_id'] === $memberId;
        $row['display_name'] = feedback_mask_name($row['user_name']);
        $items[] = $row;
    }
    mysqli_stmt_close($stmt);
    return $items;
}

function feedback_fetch_member_reviews(mysqli $mysqli, int $memberId): array
{
    if ($memberId < 1 || !feedback_table_exists($mysqli, 'fragfarm_product_reviews')) return [];
    $sql = 'SELECT id, product_id, rating, content, created_at, updated_at FROM fragfarm_product_reviews WHERE member_id = ? ORDER BY created_at DESC, id DESC';
    $stmt = mysqli_prepare($mysqli, $sql);
    mysqli_stmt_bind_param($stmt, 'i', $memberId);
    mysqli_stmt_execute($stmt);
    $result = mysqli_stmt_get_result($stmt);
    $items = [];
    while ($row = mysqli_fetch_assoc($result)) $items[] = $row;
    mysqli_stmt_close($stmt);
    return $items;
}

function feedback_fetch_member_review_comments(mysqli $mysqli, int $memberId): array
{
    if ($memberId < 1 || !feedback_table_exists($mysqli, 'fragfarm_review_comments')) return [];
    $sql = 'SELECT id, product_id, review_key, content, created_at, updated_at FROM fragfarm_review_comments WHERE member_id = ? ORDER BY created_at DESC, id DESC';
    $stmt = mysqli_prepare($mysqli, $sql);
    mysqli_stmt_bind_param($stmt, 'i', $memberId);
    mysqli_stmt_execute($stmt);
    $result = mysqli_stmt_get_result($stmt);
    $items = [];
    while ($row = mysqli_fetch_assoc($result)) $items[] = $row;
    mysqli_stmt_close($stmt);
    return $items;
}

function feedback_fetch_member_qna(mysqli $mysqli, int $memberId): array
{
    if ($memberId < 1 || !feedback_table_exists($mysqli, 'fragfarm_product_qna')) return [];
    $answerSelect = feedback_qna_answer_select($mysqli, 'q');
    $sql = "SELECT q.id, q.product_id, q.content, q.is_secret, q.created_at, q.updated_at, {$answerSelect} FROM fragfarm_product_qna q WHERE q.member_id = ? ORDER BY q.created_at DESC, q.id DESC";
    $stmt = mysqli_prepare($mysqli, $sql);
    mysqli_stmt_bind_param($stmt, 'i', $memberId);
    mysqli_stmt_execute($stmt);
    $result = mysqli_stmt_get_result($stmt);
    $items = [];
    while ($row = mysqli_fetch_assoc($result)) $items[] = $row;
    mysqli_stmt_close($stmt);
    return $items;
}

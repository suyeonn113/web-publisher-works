<?php

require_once __DIR__ . '/product-feedback.php';

function build_product_detail_feedback(
    array $product,
    array $sampleReviews,
    int $catalogReviewCount,
    float $catalogRating,
    ?mysqli $mysqli = null,
    int $memberId = 0
): array {
    $reviewItems = $sampleReviews;
    $productQnaItems = [];

    if ($mysqli) {
        $databaseReviews = feedback_fetch_reviews($mysqli, (string) ($product['id'] ?? ''), $memberId);
        foreach (array_reverse($databaseReviews) as $databaseReview) {
            array_unshift($reviewItems, [
                'db_id' => (int) $databaseReview['id'],
                'review_key' => 'db-' . (int) $databaseReview['id'],
                'own' => (bool) $databaseReview['own'],
                'name' => $databaseReview['display_name'],
                'date' => date('Y.m.d H:i', strtotime($databaseReview['created_at'])),
                'score' => (int) $databaseReview['rating'],
                'summary' => mb_strimwidth($databaseReview['content'], 0, 60, '…', 'UTF-8'),
                'content' => $databaseReview['content'],
                'images' => [],
                'comments' => [],
            ]);
        }

        $reviewCommentGroups = feedback_fetch_review_comments($mysqli, (string) ($product['id'] ?? ''), $memberId);
        foreach ($reviewItems as &$reviewItem) {
            $reviewKey = (string) ($reviewItem['review_key'] ?? '');
            if (isset($reviewCommentGroups[$reviewKey])) {
                $reviewItem['comments'] = array_merge($reviewItem['comments'], $reviewCommentGroups[$reviewKey]);
            }
        }
        unset($reviewItem);

        $productQnaItems = feedback_fetch_qna($mysqli, (string) ($product['id'] ?? ''), $memberId);
    } else {
        $reviewItems = build_demo_product_reviews($reviewItems, $catalogReviewCount, $catalogRating);
    }

    $reviewCount = count($reviewItems);
    $reviewScoreSum = array_sum(array_column($reviewItems, 'score'));

    return [
        'reviews' => $reviewItems,
        'qna' => $productQnaItems,
        'count' => $reviewCount,
        'score_sum' => $reviewScoreSum,
        'average' => $reviewCount > 0 ? $reviewScoreSum / $reviewCount : 0,
    ];
}

function build_demo_product_reviews(array $reviewItems, int $catalogReviewCount, float $catalogRating): array
{
    $reviewItems = array_slice($reviewItems, 0, $catalogReviewCount);
    $templateAuthors = ['김**', '이**', '박**', '최**', '정**', '한**'];
    $templateContents = [
        '소재가 편안하고 실루엣이 자연스러워서 자주 입고 있어요.',
        '사진으로 본 느낌과 실제 색감이 비슷하고 코디하기도 좋았습니다.',
        '디테일이 과하지 않으면서 포인트가 되어 만족스러워요.',
        '사이즈가 편하게 잘 맞고 오래 입어도 부담이 없어요.',
        '배송도 깔끔했고 제품 상태도 좋아서 만족합니다.',
        '단독으로 입어도 예쁘고 다른 아이템과 함께 매치하기도 좋아요.',
    ];
    $reviewTemplate = [
        'review_key' => '',
        'name' => '',
        'date' => '',
        'score' => 5,
        'summary' => '',
        'content' => '',
        'images' => [],
        'comments' => [],
    ];
    $missingReviewCount = $catalogReviewCount - count($reviewItems);
    $targetScoreSum = (int) round($catalogRating * $catalogReviewCount);
    $remainingScoreSum = $targetScoreSum - array_sum(array_column($reviewItems, 'score'));
    $remainingScoreSum = max($missingReviewCount, min($missingReviewCount * 5, $remainingScoreSum));

    for ($index = 0; $index < $missingReviewCount; $index++) {
        $remainingSlots = $missingReviewCount - $index;
        $score = max(1, min(5, (int) round($remainingScoreSum / $remainingSlots)));
        $remainingScoreSum -= $score;
        $templateIndex = count($reviewItems);
        $content = $templateContents[$templateIndex % count($templateContents)];
        $reviewItems[] = array_merge($reviewTemplate, [
            'review_key' => 'demo-template-' . ($templateIndex + 1),
            'name' => $templateAuthors[$templateIndex % count($templateAuthors)],
            'date' => date('Y.m.d H:i', strtotime('2025-06-01 12:00') - ($templateIndex * 86400)),
            'score' => $score,
            'summary' => $content,
            'content' => $content,
        ]);
    }

    return $reviewItems;
}

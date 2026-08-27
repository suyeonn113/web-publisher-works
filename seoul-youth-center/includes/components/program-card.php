<?php
/**
 * 프로그램 카드 컴포넌트
 *
 * 사용 위치:
 * - 홈 프로그램 섹션: $cardVariant = 'home-program'
 * - 홈 추천 섹션: $cardVariant = 'home-recommend'
 * - 프로그램 페이지 목록: $cardVariant = 'program-list'
 *
 * 제어 방식:
 * - PHP 조건으로 출력 분기 (CSS 숨김 X)
 */

if (!isset($program, $programMeta)) return;

$cardVariant = $cardVariant ?? 'home-program'; // 기본값: 홈 프로그램 섹션용

$image = $program['image'] ?? [];
$imageSrc = $image['src'] ?? '';
$imageAlt = $image['alt'] ?? ($program['title'] ?? '');

$url = $program['url'] ?? '#';
$programId = (int) ($program['id'] ?? 0);
$isEducationProgram = ($program['type'] ?? '') === 'education';

if ($url === '#' && $programId > 0) {
    $url = $isEducationProgram
        ? '/lifelong-education-apply.php'
        : '/program-detail.php?id=' . $programId;
}
$title = $program['title'] ?? '';
$summary = $program['summary'] ?? '';

$hashtags = $program['hashtags'] ?? [];

$statusLabel = $programMeta['status_label'] ?? '';
$recruitmentPeriod = $programMeta['recruitment_period'] ?? '';

$activityPeriod = $programMeta['activity_period'] ?? '';
$activityDays = $programMeta['activity_days'] ?? 0;

$priceLabel = $programMeta['price_label'] ?? '';
$durationLabel = $programMeta['duration_label'] ?? '';

$dataAttributes = $programMeta['data_attributes'] ?? [];

/**
 * variant flags
 */
$isHomeProgram = $cardVariant === 'home-program';
$isHomeRecommend = in_array($cardVariant, ['home-recommend', 'home-explorer'], true);
$isProgramList = $cardVariant === 'program-list';
$showStatusBadge = $cardVariant !== 'home-explorer';

/**
 * 카드 클래스
 * - program-card--home-program
 * - program-card--home-recommend
 * - program-card--program-list
 */
$cardClasses = ['program-card', 'program-card--' . $cardVariant];

$cardAttributes = '';
foreach ($dataAttributes as $name => $value) {
    if ($value === '' || $value === null) continue;

    $cardAttributes .= ' ' . htmlspecialchars($name, ENT_QUOTES, 'UTF-8')
        . '="' . htmlspecialchars($value, ENT_QUOTES, 'UTF-8') . '"';
}
?>

<article class="<?= implode(' ', $cardClasses) ?>"<?= $cardAttributes ?>>
    <a class="program-card__link"
       href="<?= htmlspecialchars(BASE_URL . $url, ENT_QUOTES, 'UTF-8') ?>"
       aria-labelledby="program-card-title-<?= (int) ($program['id'] ?? 0) ?>">

        <!-- 이미지 영역 (공통) -->
        <div class="program-card__image">
            <?php if ($imageSrc !== ''): ?>
                <img
                    src="<?= htmlspecialchars(BASE_URL . $imageSrc, ENT_QUOTES, 'UTF-8') ?>"
                    alt="<?= htmlspecialchars($imageAlt, ENT_QUOTES, 'UTF-8') ?>"
                    loading="lazy"
                    decoding="async"
                >
            <?php else: ?>
                <span class="program-card__image-placeholder" aria-hidden="true">
                    <img class="program-card__placeholder-icon icon-image" src="<?= BASE_URL ?>/assets/icons/education-program.svg" alt="">
                    <strong>평생교육</strong>
                </span>
            <?php endif; ?>

            <!-- 모집 상태 배지: 이미지 카드 -->
            <?php if ($showStatusBadge && $statusLabel): ?>
                <span class="program-card__badge type-caption">
                    <span class="visually-hidden">모집 상태:</span>
                    <?= htmlspecialchars($statusLabel, ENT_QUOTES, 'UTF-8') ?>
                </span>
            <?php endif; ?>

        </div>

        <div class="program-card__body">

            <!-- 제목 (공통) -->
            <h3 class="program-card__title type-card-title">
                <?= htmlspecialchars($title, ENT_QUOTES, 'UTF-8') ?>
            </h3>

            <!-- 모집기간 (공통) -->
            <p class="program-card__date type-caption">
                <?= $recruitmentPeriod !== ''
                    ? htmlspecialchars($recruitmentPeriod, ENT_QUOTES, 'UTF-8')
                    : '&nbsp;' ?>
            </p>

            <!-- 프로그램 페이지 목록 전용 -->
            <?php if ($isProgramList): ?>

                <!-- 설명 -->
                <?php if ($summary): ?>
                    <p class="program-card__summary type-body">
                        <?= htmlspecialchars($summary, ENT_QUOTES, 'UTF-8') ?>
                    </p>
                <?php endif; ?>

                <!-- 메타 정보 -->
                <?php if ($priceLabel || $durationLabel): ?>
                    <div class="program-card__meta type-caption">
                        <?php if ($priceLabel): ?>
                            <span class="program-card__meta-item">
                                <?= htmlspecialchars($priceLabel, ENT_QUOTES, 'UTF-8') ?>
                            </span>
                        <?php endif; ?>

                        <?php if ($durationLabel): ?>
                            <span class="program-card__meta-item">
                                <?= htmlspecialchars($durationLabel, ENT_QUOTES, 'UTF-8') ?>
                            </span>
                        <?php endif; ?>
                    </div>
                <?php endif; ?>

                <!-- 활동기간 -->
                <?php if ($activityPeriod): ?>
                    <p class="program-card__activity type-caption">
                        활동기간: <?= htmlspecialchars($activityPeriod, ENT_QUOTES, 'UTF-8') ?>
                        <?php if ($activityDays): ?>
                            (<?= (int) $activityDays ?>일)
                        <?php endif; ?>
                    </p>
                <?php endif; ?>

            <?php endif; ?>

            <!-- 태그: 홈 추천 섹션에서는 숨김 -->
            <?php if (!$isHomeRecommend && !empty($hashtags)): ?>
                <ul class="program-card__tags type-caption">
                    <?php foreach ($hashtags as $tag): ?>
                        <li class="program-card__tag">
                            <?= htmlspecialchars($tag, ENT_QUOTES, 'UTF-8') ?>
                        </li>
                    <?php endforeach; ?>
                </ul>
            <?php endif; ?>

        </div>
    </a>
</article>

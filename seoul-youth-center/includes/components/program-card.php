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

if ($url === '#' && $programId > 0) {
    $url = '/programs.php#program-' . $programId;
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
$isHomeRecommend = $cardVariant === 'home-recommend';
$isProgramList = $cardVariant === 'program-list';

/**
 * 카드 클래스
 * - card--home-program
 * - card--home-recommend
 * - card--program-list
 */
$cardClasses = ['card', 'card--' . $cardVariant];

$cardAttributes = '';
foreach ($dataAttributes as $name => $value) {
    if ($value === '' || $value === null) continue;

    $cardAttributes .= ' ' . htmlspecialchars($name, ENT_QUOTES, 'UTF-8')
        . '="' . htmlspecialchars($value, ENT_QUOTES, 'UTF-8') . '"';
}
?>

<article class="<?= implode(' ', $cardClasses) ?>"<?= $cardAttributes ?>>
    <a class="card__link" 
       href="<?= BASE_URL ?>/program-detail.php?id=<?= (int) ($program['id'] ?? 0) ?>"
       aria-labelledby="program-card-title-<?= (int) ($program['id'] ?? 0) ?>">

        <!-- 이미지 영역 (공통) -->
        <div class="card__image">
            <img
                src="<?= htmlspecialchars(BASE_URL . $imageSrc, ENT_QUOTES, 'UTF-8') ?>"
                alt="<?= htmlspecialchars($imageAlt, ENT_QUOTES, 'UTF-8') ?>"
            >

            <!-- 모집 상태 배지 (공통) -->
            <?php if ($statusLabel): ?>
                <span class="card__badge">
                    <span class="visually-hidden">모집 상태:</span>
                    <?= htmlspecialchars($statusLabel, ENT_QUOTES, 'UTF-8') ?>
                </span>
            <?php endif; ?>
        </div>

        <div class="card__body">

            <!-- 제목 (공통) -->
            <h4 class="card__title">
                <?= htmlspecialchars($title, ENT_QUOTES, 'UTF-8') ?>
            </h4>

            <!-- 모집기간 (공통) -->
            <p class="card__date">
                <?= $recruitmentPeriod !== ''
                    ? htmlspecialchars($recruitmentPeriod, ENT_QUOTES, 'UTF-8')
                    : '&nbsp;' ?>
            </p>

            <!-- 프로그램 페이지 목록 전용 -->
            <?php if ($isProgramList): ?>

                <!-- 설명 -->
                <?php if ($summary): ?>
                    <p class="card__summary">
                        <?= htmlspecialchars($summary, ENT_QUOTES, 'UTF-8') ?>
                    </p>
                <?php endif; ?>

                <!-- 메타 정보 -->
                <?php if ($priceLabel || $durationLabel): ?>
                    <div class="card__meta">
                        <?php if ($priceLabel): ?>
                            <span class="card__meta-item">
                                <?= htmlspecialchars($priceLabel, ENT_QUOTES, 'UTF-8') ?>
                            </span>
                        <?php endif; ?>

                        <?php if ($durationLabel): ?>
                            <span class="card__meta-item">
                                <?= htmlspecialchars($durationLabel, ENT_QUOTES, 'UTF-8') ?>
                            </span>
                        <?php endif; ?>
                    </div>
                <?php endif; ?>

                <!-- 활동기간 -->
                <?php if ($activityPeriod): ?>
                    <p class="card__activity">
                        활동기간: <?= htmlspecialchars($activityPeriod, ENT_QUOTES, 'UTF-8') ?>
                        <?php if ($activityDays): ?>
                            (<?= (int) $activityDays ?>일)
                        <?php endif; ?>
                    </p>
                <?php endif; ?>

            <?php endif; ?>

            <!-- 태그: 홈 추천 섹션에서는 숨김 -->
            <?php if (!$isHomeRecommend && !empty($hashtags)): ?>
                <ul class="card__tags">
                    <?php foreach ($hashtags as $tag): ?>
                        <li class="card__tag">
                            <?= htmlspecialchars($tag, ENT_QUOTES, 'UTF-8') ?>
                        </li>
                    <?php endforeach; ?>
                </ul>
            <?php endif; ?>

        </div>
    </a>
</article>

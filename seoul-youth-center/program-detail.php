<?php
include __DIR__ . '/includes/config.php';
include __DIR__ . '/includes/data/youth-programs.php';
include __DIR__ . '/includes/functions/program.service.php';

$programId = isset($_GET['id']) ? (int) $_GET['id'] : 0;
$program = findProgramById(getOpenProgramsForDisplay($youthPrograms), $programId);

if (!$program) {
    http_response_code(404);
    $pageTitle = '프로그램을 찾을 수 없습니다';
} else {
    $pageTitle = ($program['title'] ?? '청소년 활동 신청') . ' | 청소년 활동 신청';
}

$pageCss = ['program-detail.css', 'program-confirm-modal.css'];
$programMeta = $program ? getProgramCardMeta($program) : [];
$programDetail = $program ? getProgramDetailContent($program) : [];
$status = $programMeta['status'] ?? ProgramStatus::CLOSED;
$isClosed = $status === ProgramStatus::CLOSED;
$image = $program['image'] ?? [];
$imageSrc = BASE_URL . ($image['src'] ?? '');
$imageAlt = $image['alt'] ?? ($program['title'] ?? '');
$title = $program['title'] ?? '';
$ageLabel = $program ? getProgramAgeLabel($program) : '';
$fieldLabel = $program ? getProgramFieldLabel($program) : '';
$recruitmentPeriod = ($programMeta['recruitment_period'] ?? '') !== '' ? $programMeta['recruitment_period'] : '상시 모집';
$activityPeriod = ($programMeta['activity_period'] ?? '') !== '' ? $programMeta['activity_period'] : '상시 운영';
$capacity = (int) ($programDetail['capacity'] ?? 0);
$appliedCount = (int) ($programDetail['applied_count'] ?? 0);
$remainingCapacity = max(0, $capacity - $appliedCount);
$recruitmentStatus = $isClosed
    ? '신청 마감'
    : ($remainingCapacity > 0 ? '신청 가능' : '모집 완료');
?>

<!DOCTYPE html>
<html lang="ko">

<?php include __DIR__ . '/includes/head.php'; ?>

<body>
<?php include __DIR__ . '/includes/global-nav.php'; ?>

<main id="main" class="program-detail-page">
    <?php if (!$program): ?>
        <section class="program-detail-empty inner">
            <h1 class="type-page-title">프로그램을 찾을 수 없습니다.</h1>
            <a href="<?= BASE_URL ?>/programs.php">목록으로 돌아가기</a>
        </section>
    <?php else: ?>
        <section class="program-detail-hero inner" aria-labelledby="program-detail-title">
            <p class="type-label"><?= htmlspecialchars($fieldLabel, ENT_QUOTES, 'UTF-8') ?></p>
            <h1 class="type-page-title" id="program-detail-title"><?= htmlspecialchars($title, ENT_QUOTES, 'UTF-8') ?></h1>
            <ul class="type-label">
                <li><?= htmlspecialchars($programMeta['status_label'] ?? '', ENT_QUOTES, 'UTF-8') ?></li>
                <li><?= htmlspecialchars($ageLabel, ENT_QUOTES, 'UTF-8') ?></li>
                <li><?= htmlspecialchars($programMeta['price_label'] ?? '', ENT_QUOTES, 'UTF-8') ?></li>
            </ul>
        </section>

        <section class="program-detail-layout inner">
            <aside class="program-detail-summary" aria-label="프로그램 신청 요약">
                <dl class="type-body">
                    <div>
                        <dt>신청기간</dt>
                        <dd><?= htmlspecialchars($recruitmentPeriod, ENT_QUOTES, 'UTF-8') ?></dd>
                    </div>
                    <div>
                        <dt>활동기간</dt>
                        <dd><?= htmlspecialchars($activityPeriod, ENT_QUOTES, 'UTF-8') ?></dd>
                    </div>
                    <div>
                        <dt>신청대상</dt>
                        <dd><?= htmlspecialchars($ageLabel, ENT_QUOTES, 'UTF-8') ?></dd>
                    </div>
                    <div>
                        <dt>활동장소</dt>
                        <dd><?= htmlspecialchars($programDetail['location'], ENT_QUOTES, 'UTF-8') ?></dd>
                    </div>
                    <div>
                        <dt>참가비</dt>
                        <dd><?= (int) ($program['price'] ?? 0) > 0 ? number_format((int) $program['price']) . '원' : '무료' ?></dd>
                    </div>
                    <div>
                        <dt>모집 현황</dt>
                        <dd><?= htmlspecialchars($recruitmentStatus, ENT_QUOTES, 'UTF-8') ?></dd>
                    </div>
                </dl>
                <div class="program-detail-summary__actions">
                    <?php if ($isClosed): ?>
                        <button class="program-detail-button is-disabled control" type="button" disabled>마감</button>
                    <?php else: ?>
                        <a class="program-detail-button is-apply control control--primary" href="<?= BASE_URL ?>/program-apply.php?id=<?= (int) $programId ?>">신청하기</a>
                    <?php endif; ?>
                    <button
                        class="program-detail-button is-confirm control control--muted"
                        type="button"
                        data-program-confirm-open
                        data-program-id="<?= (int) $programId ?>"
                        data-program-title="<?= htmlspecialchars($title, ENT_QUOTES, 'UTF-8') ?>"
                    >
                        신청확인
                    </button>
                </div>
            </aside>

            <article class="program-detail-content">
                <div class="program-detail-attachment type-label">
                    <span>첨부파일</span>
                    <strong><?= htmlspecialchars($programDetail['attachment'], ENT_QUOTES, 'UTF-8') ?></strong>
                </div>

                <img src="<?= htmlspecialchars($imageSrc, ENT_QUOTES, 'UTF-8') ?>" alt="<?= htmlspecialchars($imageAlt, ENT_QUOTES, 'UTF-8') ?>">

                <section>
                    <h2 class="type-subtitle">프로그램 안내</h2>
                    <p class="type-body"><?= htmlspecialchars($programDetail['description'], ENT_QUOTES, 'UTF-8') ?></p>
                </section>

                <section>
                    <h2 class="type-subtitle">활동 일정</h2>
                    <ul class="program-detail-list type-body">
                        <?php foreach ($programDetail['schedule'] as $item): ?>
                            <li><?= htmlspecialchars($item, ENT_QUOTES, 'UTF-8') ?></li>
                        <?php endforeach; ?>
                    </ul>
                </section>

                <section>
                    <h2 class="type-subtitle">참여 혜택</h2>
                    <ul class="program-detail-list type-body">
                        <?php foreach ($programDetail['benefits'] as $item): ?>
                            <li><?= htmlspecialchars($item, ENT_QUOTES, 'UTF-8') ?></li>
                        <?php endforeach; ?>
                    </ul>
                </section>

                <section class="program-detail-notice">
                    <h2 class="type-subtitle">유의사항</h2>
                    <ul class="program-detail-list type-body">
                        <?php foreach ($programDetail['notes'] as $item): ?>
                            <li><?= htmlspecialchars($item, ENT_QUOTES, 'UTF-8') ?></li>
                        <?php endforeach; ?>
                    </ul>
                    <p class="program-detail-contact type-label">문의: <?= htmlspecialchars($programDetail['contact'], ENT_QUOTES, 'UTF-8') ?></p>
                </section>
            </article>
        </section>

        <nav class="program-detail-bottom inner" aria-label="프로그램 이동">
            <a href="<?= BASE_URL ?>/programs.php">목록</a>
        </nav>

        <?php include __DIR__ . '/includes/components/program-confirm-modal.php'; ?>
    <?php endif; ?>
</main>

<?php include __DIR__ . '/includes/footer.php'; ?>

<script src="<?= BASE_URL ?>/js/global-nav.js"></script>
<script src="<?= BASE_URL ?>/js/header-search.js"></script>
<script src="<?= BASE_URL ?>/js/program-confirm-modal.js"></script>
</body>
</html>

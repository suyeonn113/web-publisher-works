<?php
include __DIR__ . '/../includes/config.php';
require_once __DIR__ . '/../includes/services/notice-service.php';
require_once __DIR__ . '/../includes/view-helpers.php';

$pageTitle = 'Notice | Fragfarm';
$pageCss = 'notice.css';
$keyword = trim((string) ($_GET['q'] ?? ''));
$currentPage = max(1, (int) ($_GET['page'] ?? 1));

if (notice_database_is_configured()) {
    require_once __DIR__ . '/../includes/dbconn.php';
    $state = notice_fetch_posts($mysqli, $keyword, $currentPage);
    mysqli_close($mysqli);
} else {
    require __DIR__ . '/../includes/data/notices.php';
    $state = notice_fetch_demo_posts($noticePosts, $keyword, $currentPage);
}

?>

<!DOCTYPE html>
<html lang="ko">
<?php include __DIR__ . '/../includes/head.php'; ?>
<body>
<div class="mobile-shell">
    <?php include __DIR__ . '/../includes/header.php'; ?>

    <main id="main" class="board-page">
        <div class="page-heading page-heading--plain page-heading--contained">
            <h2 class="page-heading__title">NOTICE</h2>
        </div>

        <section class="notice-board" aria-label="공지사항 목록">
            <ul class="notice-list">
                <?php foreach ($state['items'] as $post): ?>
                    <li>
                        <a href="<?= BASE_URL ?>/pages/notice-detail.php?id=<?= (int) $post['id'] ?>">
                            <span><?= e($post['title']) ?></span>
                            <time datetime="<?= e(date('Y-m-d', strtotime($post['created_at']))) ?>"><?= e(date('Y.m.d', strtotime($post['created_at']))) ?></time>
                        </a>
                    </li>
                <?php endforeach; ?>
            </ul>

            <?php if (empty($state['items'])): ?>
                <p class="empty-message"><?= $keyword !== '' ? '검색 결과가 없습니다.' : '등록된 공지사항이 없습니다.' ?></p>
            <?php endif; ?>

            <form class="board-search" method="get" action="<?= BASE_URL ?>/pages/notice.php">
                <label class="visually-hidden" for="notice-search">공지사항 검색</label>
                <input id="notice-search" type="search" name="q" value="<?= e($keyword) ?>" placeholder="What are you looking for?">
                <button type="submit" aria-label="검색">
                    <img src="<?= BASE_URL ?>/assets/icons/search.svg" alt="">
                </button>
            </form>

            <?php if ($state['totalPages'] > 1): ?>
                <nav class="pagination" aria-label="공지사항 페이지 이동">
                    <?php if ($state['currentPage'] > 1): ?>
                        <a class="pagination__btn" href="<?= BASE_URL ?>/pages/<?= e(notice_build_url(['q' => $keyword, 'page' => 1])) ?>">
                            <img src="<?= BASE_URL ?>/assets/icons/double-arrow-left.svg" alt="">
                            <span class="visually-hidden">첫 페이지로 이동</span>
                        </a>
                    <?php else: ?>
                        <span class="pagination__disabled" aria-disabled="true">
                            <img src="<?= BASE_URL ?>/assets/icons/double-arrow-left.svg" alt="">
                            <span class="visually-hidden">현재 첫 페이지</span>
                        </span>
                    <?php endif; ?>
                    <?php for ($page = 1; $page <= $state['totalPages']; $page++): ?>
                        <a href="<?= BASE_URL ?>/pages/<?= e(notice_build_url(['q' => $keyword, 'page' => $page])) ?>" <?= $page === $state['currentPage'] ? 'aria-current="page"' : '' ?>><?= $page ?></a>
                    <?php endfor; ?>
                    <?php if ($state['currentPage'] < $state['totalPages']): ?>
                        <a class="pagination__btn" href="<?= BASE_URL ?>/pages/<?= e(notice_build_url(['q' => $keyword, 'page' => $state['totalPages']])) ?>">
                            <img class="icon-rotate-180" src="<?= BASE_URL ?>/assets/icons/double-arrow-left.svg" alt="">
                            <span class="visually-hidden">마지막 페이지로 이동</span>
                        </a>
                    <?php else: ?>
                        <span class="pagination__disabled" aria-disabled="true">
                            <img class="icon-rotate-180" src="<?= BASE_URL ?>/assets/icons/double-arrow-left.svg" alt="">
                            <span class="visually-hidden">현재 마지막 페이지</span>
                        </span>
                    <?php endif; ?>
                </nav>
            <?php endif; ?>
        </section>
    </main>

    <?php include __DIR__ . '/../includes/footer.php'; ?>
    <?php include __DIR__ . '/../includes/chat-launcher.php'; ?>
</div>
<script src="<?= BASE_URL ?>/js/header.js"></script>
</body>
</html>

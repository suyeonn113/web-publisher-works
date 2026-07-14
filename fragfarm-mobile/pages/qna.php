<?php
include __DIR__ . '/../includes/config.php';
require_once __DIR__ . '/../includes/dbconn.php';
require_once __DIR__ . '/../includes/services/qna-service.php';

$pageTitle = 'QnA | Fragfarm';
$pageCss = 'shop-pages.css';
$keyword = trim((string) ($_GET['q'] ?? ''));
$currentPage = max(1, (int) ($_GET['page'] ?? 1));
$state = qna_fetch_posts($mysqli, $keyword, $currentPage);

mysqli_close($mysqli);

function e($value)
{
    return htmlspecialchars((string) $value, ENT_QUOTES, 'UTF-8');
}
?>

<!DOCTYPE html>
<html lang="ko">
<?php include __DIR__ . '/../includes/head.php'; ?>
<body>
<div class="mobile-shell">
    <?php include __DIR__ . '/../includes/header.php'; ?>

    <main id="main" class="board-page">
        <h2 class="page-title board-title">QnA</h2>

        <section class="qna-board" aria-label="QnA 게시글 목록">
            <?php if (!empty($state['notices'])): ?>
                <ul class="qna-list qna-list--notice">
                    <?php foreach ($state['notices'] as $notice): ?>
                        <li>
                            <a href="<?= BASE_URL ?>/pages/qna-detail.php?id=<?= (int) $notice['id'] ?>">
                                <?= e($notice['title']) ?>
                            </a>
                        </li>
                    <?php endforeach; ?>
                </ul>
            <?php endif; ?>

            <ul class="qna-list">
                <?php foreach ($state['items'] as $post): ?>
                    <li>
                        <a href="<?= BASE_URL ?>/pages/qna-detail.php?id=<?= (int) $post['id'] ?>">
                            <span><?= e($post['title']) ?></span>
                            <?php if ((int) $post['is_secret'] === 1): ?>
                                <span class="qna-list__lock" aria-label="비밀글">▧</span>
                            <?php endif; ?>
                            <span>[<?= (int) $post['comment_count'] ?>]</span>
                        </a>
                    </li>
                <?php endforeach; ?>
            </ul>

            <?php if (empty($state['notices']) && empty($state['items'])): ?>
                <p class="empty-message">등록된 게시글이 없습니다.</p>
            <?php endif; ?>

            <form class="board-search" method="get" action="<?= BASE_URL ?>/pages/qna.php">
                <label class="visually-hidden" for="qna-search">게시글 검색</label>
                <input id="qna-search" type="search" name="q" value="<?= e($keyword) ?>" placeholder="What are you looking for?">
                <button type="submit" aria-label="검색">
                    <img src="<?= BASE_URL ?>/assets/icons/search.svg" alt="">
                </button>
            </form>

            <nav class="pagination" aria-label="QnA 페이지 이동">
                <a class="pagination__btn" href="<?= BASE_URL ?>/pages/<?= e(qna_build_url(['q' => $keyword, 'page' => max(1, $state['currentPage'] - 1)])) ?>">&laquo;</a>
                <?php for ($page = 1; $page <= max(5, $state['totalPages']); $page++): ?>
                    <a href="<?= BASE_URL ?>/pages/<?= e(qna_build_url(['q' => $keyword, 'page' => $page])) ?>" <?= $page === $state['currentPage'] ? 'aria-current="page"' : '' ?>>
                        <?= $page ?>
                    </a>
                <?php endfor; ?>
                <a class="pagination__btn" href="<?= BASE_URL ?>/pages/<?= e(qna_build_url(['q' => $keyword, 'page' => min($state['totalPages'], $state['currentPage'] + 1)])) ?>">&raquo;</a>
            </nav>
        </section>
    </main>

    <?php include __DIR__ . '/../includes/footer.php'; ?>
    <?php include __DIR__ . '/../includes/chat-launcher.php'; ?>
</div>
<script src="<?= BASE_URL ?>/js/header.js"></script>
</body>
</html>

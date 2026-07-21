<?php
$programContextPage = $programContextPage ?? '';
?>

<div class="program-context-nav-wrap">
    <nav class="program-context-nav inner" aria-label="청소년 프로그램 관련 페이지">
        <a href="<?= BASE_URL ?>/youth-program-introduction.php"<?= $programContextPage === 'introduction' ? ' aria-current="page"' : '' ?>>프로그램 소개</a>
        <a href="<?= BASE_URL ?>/programs.php"<?= $programContextPage === 'programs' ? ' aria-current="page"' : '' ?>>활동신청</a>
        <a href="<?= BASE_URL ?>/applications.php"<?= $programContextPage === 'applications' ? ' aria-current="page"' : '' ?>>신청내역 조회</a>
    </nav>
</div>

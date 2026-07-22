<?php
$programContextPage = $programContextPage ?? '';
?>

<div class="program-context-nav-wrap">
    <nav class="program-context-nav inner" aria-label="프로그램 신청 관련 페이지">
        <a href="<?= BASE_URL ?>/programs.php"<?= $programContextPage === 'youth' ? ' aria-current="page"' : '' ?>>청소년 프로그램 신청</a>
        <a href="<?= BASE_URL ?>/lifelong-education-apply.php"<?= $programContextPage === 'lifelong' ? ' aria-current="page"' : '' ?>>평생교육 프로그램 신청</a>
        <a href="<?= BASE_URL ?>/applications.php"<?= $programContextPage === 'applications' ? ' aria-current="page"' : '' ?>>신청내역 확인</a>
    </nav>
</div>

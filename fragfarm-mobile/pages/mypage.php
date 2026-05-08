<?php
include __DIR__ . '/../includes/config.php';
require_once __DIR__ . '/../includes/dbconn.php';

if (empty($_SESSION['member_id'])) {
    echo '<!DOCTYPE html><html lang="ko"><head><meta charset="UTF-8"><title>Fragfarm</title></head><body>';
    echo '<script>';
    echo 'alert("로그인 해주세요.");';
    echo 'location.href="' . BASE_URL . '/pages/login.php";';
    echo '</script>';
    echo '</body></html>';
    exit;
}

mysqli_set_charset($mysqli, 'utf8mb4');

$memberId = (int) $_SESSION['member_id'];
$member = null;

$sql = '
    SELECT
        id,
        user_id,
        user_name,
        email,
        phone,
        postcode,
        address_line1,
        address_line2
    FROM fragfarm_members
    WHERE id = ?
    LIMIT 1
';

$stmt = mysqli_prepare($mysqli, $sql);

if ($stmt) {
    mysqli_stmt_bind_param($stmt, 'i', $memberId);
    mysqli_stmt_execute($stmt);
    $result = mysqli_stmt_get_result($stmt);
    $member = mysqli_fetch_assoc($result);
    mysqli_stmt_close($stmt);
}

mysqli_close($mysqli);

if (!$member) {
    session_unset();
    session_destroy();
    header('Location: ' . BASE_URL . '/pages/login.php');
    exit;
}

function mypage_icon($name)
{
    $path = __DIR__ . '/../assets/icons/' . $name . '.svg';

    if (!is_file($path)) {
        return '';
    }

    $svg = file_get_contents($path);
    $svg = preg_replace('/\sstroke="[^"]*"/', ' stroke="currentColor"', $svg);

    return preg_replace('/<svg\b/', '<svg aria-hidden="true" focusable="false"', $svg, 1);
}

$pageTitle = 'My Page | Fragfarm';
$pageCss = 'mypage.css';
?>

<!DOCTYPE html>
<html lang="ko">

<!------------ Head ------------>
<?php include __DIR__ . '/../includes/head.php'; ?>

<body>
<div class="mobile-shell">
    <!-- Header -->
    <?php include __DIR__ . '/../includes/header.php'; ?>

    <main id="main" class="mypage">
        <section class="mypage__inner" aria-labelledby="mypage-title">
            <h2 id="mypage-title" class="mypage__title">MY PAGE</h2>

            <section class="order-status" aria-labelledby="order-status-title">
                <h3 id="order-status-title" class="order-status__title">주문처리 현황 <span>(최근 3개월 기준)</span></h3>
                <dl class="order-status__list">
                    <div class="order-status__item">
                        <dt>입금전</dt>
                        <dd>0</dd>
                    </div>
                    <div class="order-status__item">
                        <dt>배송준비중</dt>
                        <dd>0</dd>
                    </div>
                    <div class="order-status__item">
                        <dt>배송중</dt>
                        <dd>0</dd>
                    </div>
                    <div class="order-status__item">
                        <dt>배송완료</dt>
                        <dd>0</dd>
                    </div>
                    <div class="order-status__item">
                        <dt>취소</dt>
                        <dd>0</dd>
                    </div>
                    <div class="order-status__item">
                        <dt>교환</dt>
                        <dd>0</dd>
                    </div>
                    <div class="order-status__item">
                        <dt>반품</dt>
                        <dd>0</dd>
                    </div>
                </dl>
            </section>

            <nav class="mypage-menu" aria-label="마이페이지 메뉴">
                <a class="mypage-menu__link" href="#">
                    <?= mypage_icon('order') ?>
                    <span>주문 조회</span>
                </a>
                <a class="mypage-menu__link" href="#">
                    <?= mypage_icon('post') ?>
                    <span>내가 쓴 게시글</span>
                </a>
                <a class="mypage-menu__link" href="#">
                    <?= mypage_icon('coupon') ?>
                    <span>쿠폰</span>
                </a>
                <a class="mypage-menu__link" href="#">
                    <?= mypage_icon('point') ?>
                    <span>적립금</span>
                </a>
                <a class="mypage-menu__link" href="#">
                    <?= mypage_icon('address') ?>
                    <span>배송 주소록</span>
                </a>
                <a class="mypage-menu__link" href="<?= BASE_URL ?>/pages/member_edit.php">
                    <?= mypage_icon('account') ?>
                    <span>회원정보</span>
                </a>
            </nav>

            <a class="mypage__logout" href="<?= BASE_URL ?>/actions/logout.php">LOGOUT</a>
        </section>
    </main>

    <!-- Footer -->
    <?php include __DIR__ . '/../includes/footer.php'; ?>
</div>

<!-- JS -->
<script src="<?= BASE_URL ?>/js/header.js"></script>
</body>
</html>

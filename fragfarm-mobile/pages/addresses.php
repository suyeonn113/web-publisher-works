<?php
include __DIR__ . '/../includes/config.php';
require_once __DIR__ . '/../includes/view-helpers.php';

if (!FRAGFARM_DEMO_MODE && empty($_SESSION['member_id'])) {
    $_SESSION['after_login_redirect'] = BASE_URL . '/pages/addresses.php';
    header('Location: ' . BASE_URL . '/pages/login.php');
    exit;
}

$member = [
    'user_name' => '프래그팜 마스터',
    'phone' => '01012345678',
    'postcode' => '04782',
    'address_line1' => '서울특별시 성동구 연무장길 00',
    'address_line2' => '프래그팜 101호',
];

if (!FRAGFARM_DEMO_MODE) {
    require_once __DIR__ . '/../includes/dbconn.php';
    $memberId = (int) $_SESSION['member_id'];
    $stmt = mysqli_prepare($mysqli, 'SELECT user_name, phone, postcode, address_line1, address_line2 FROM fragfarm_members WHERE id = ? LIMIT 1');
    mysqli_stmt_bind_param($stmt, 'i', $memberId);
    mysqli_stmt_execute($stmt);
    $member = mysqli_fetch_assoc(mysqli_stmt_get_result($stmt));
    mysqli_stmt_close($stmt);
    mysqli_close($mysqli);

    if (!$member) {
        header('Location: ' . BASE_URL . '/pages/login.php');
        exit;
    }
}

$pageTitle = 'Addresses | Fragfarm';
$pageCss = 'mypage-detail.css';
?>
<!DOCTYPE html>
<html lang="ko">
<?php include __DIR__ . '/../includes/head.php'; ?>
<body>
<div class="mobile-shell">
    <?php include __DIR__ . '/../includes/header.php'; ?>
    <main id="main" class="mypage-detail" data-address-page data-address-owner="<?= FRAGFARM_DEMO_MODE ? 'demo' : 'member-' . (int) $memberId ?>">
        <div class="page-heading page-heading--back page-heading--contained">
            <a class="page-heading__back" href="<?= BASE_URL ?>/pages/mypage.php" aria-label="마이페이지로 돌아가기"><img src="<?= BASE_URL ?>/assets/icons/arrow-left.svg" alt=""></a>
            <h2 class="page-heading__title">ADDRESSES</h2>
        </div>

        <section aria-labelledby="address-list-title">
            <h3 id="address-list-title" class="mypage-detail__section-title">배송지 목록</h3>
            <article class="address-card">
                <div class="address-card__head"><h3 data-address-name><?= e($member['user_name']) ?></h3><span class="status-badge status-badge--inverse address-card__badge">기본 배송지</span></div>
                <p data-address-phone><?= e($member['phone']) ?></p>
                <address><span data-address-postcode>[<?= e($member['postcode']) ?>]</span> <span data-address-line1><?= e($member['address_line1']) ?></span> <span data-address-line2><?= e($member['address_line2']) ?></span></address>
                <a class="address-card__edit" href="<?= BASE_URL ?>/pages/member_edit.php">회원정보에서 수정</a>
            </article>

            <div class="address-list" data-additional-address-list></div>

            <button class="address-add-toggle" type="button" data-address-add-toggle aria-expanded="false" aria-controls="address-add-form">배송지 추가</button>
            <p class="address-storage-note">추가 배송지는 현재 브라우저에 저장됩니다.</p>

            <form class="address-add-form" id="address-add-form" data-address-add-form hidden>
                <label>배송지명<input name="label" type="text" maxlength="20" placeholder="예: 집, 회사" required></label>
                <label>받는 분<input name="recipient_name" type="text" maxlength="40" autocomplete="name" required></label>
                <label>연락처<input name="phone" type="tel" maxlength="20" inputmode="tel" autocomplete="tel" required></label>
                <label>우편번호
                    <span class="address-add-form__postcode">
                        <input name="postcode" type="text" maxlength="10" autocomplete="postal-code" readonly required>
                        <button type="button" data-address-search>주소 검색</button>
                    </span>
                </label>
                <label>주소<input name="address_line1" type="text" maxlength="160" autocomplete="address-line1" readonly required></label>
                <label>상세 주소<input name="address_line2" type="text" maxlength="160" autocomplete="address-line2" required></label>
                <div class="address-add-form__actions">
                    <button type="button" data-address-add-cancel>취소</button>
                    <button type="submit">저장</button>
                </div>
            </form>
        </section>
    </main>
    <?php include __DIR__ . '/../includes/footer.php'; ?>
</div>
<script src="https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"></script>
<script src="<?= BASE_URL ?>/js/header.js"></script>
<script src="<?= BASE_URL ?>/js/mypage-detail.js"></script>
</body>
</html>

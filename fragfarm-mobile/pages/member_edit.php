<?php
include __DIR__ . '/../includes/config.php';
require_once __DIR__ . '/../includes/dbconn.php';

if (empty($_SESSION['member_id'])) {
    header('Location: ' . BASE_URL . '/pages/login.php');
    exit;
}

mysqli_set_charset($mysqli, 'utf8mb4');

$memberId = (int) $_SESSION['member_id'];
$member = null;

$sql = '
    SELECT
        user_id,
        user_name,
        email,
        phone,
        postcode,
        address_line1,
        address_line2,
        agree_marketing
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

$pageTitle = 'Member Info | Fragfarm';
$pageCss = 'member-edit.css';
?>

<!DOCTYPE html>
<html lang="ko">

<!------------ Head ------------>
<?php include __DIR__ . '/../includes/head.php'; ?>

<body>
<div class="mobile-shell">
    <!-- Header -->
    <?php include __DIR__ . '/../includes/header.php'; ?>

    <main id="main" class="member-edit">
        <section class="member-edit__inner" aria-labelledby="member-edit-title">
            <h2 id="member-edit-title" class="member-edit__title">MEMBER INFO</h2>

            <form class="member-form" action="<?= BASE_URL ?>/actions/member_update.php" method="post">
                <div class="member-form__group">
                    <div class="member-form__label-row">
                        <label class="member-form__label" for="user-id">ID</label>
                        <span class="member-form__help">수정할 수 없습니다.</span>
                    </div>
                    <input
                        id="user-id"
                        class="member-form__input"
                        type="text"
                        value="<?= htmlspecialchars($member['user_id'], ENT_QUOTES, 'UTF-8') ?>"
                        readonly>
                </div>

                <div class="member-form__group">
                    <label class="member-form__label is-required" for="user-name">NAME</label>
                    <input
                        id="user-name"
                        class="member-form__input"
                        name="user_name"
                        type="text"
                        autocomplete="name"
                        value="<?= htmlspecialchars($member['user_name'], ENT_QUOTES, 'UTF-8') ?>"
                        required>
                </div>

                <div class="member-form__group">
                    <label class="member-form__label is-required" for="email">EMAIL</label>
                    <input
                        id="email"
                        class="member-form__input"
                        name="email"
                        type="email"
                        autocomplete="email"
                        value="<?= htmlspecialchars($member['email'], ENT_QUOTES, 'UTF-8') ?>"
                        required>
                </div>

                <div class="member-form__group">
                    <label class="member-form__label is-required" for="phone">PHONE</label>
                    <input
                        id="phone"
                        class="member-form__input"
                        name="phone"
                        type="tel"
                        inputmode="numeric"
                        autocomplete="tel"
                        placeholder="'-' 없이 입력"
                        value="<?= htmlspecialchars($member['phone'], ENT_QUOTES, 'UTF-8') ?>"
                        required>
                </div>

                <fieldset class="member-form__address">
                    <legend class="member-form__legend is-required">ADDRESS</legend>

                    <div class="member-form__address-row">
                        <label class="visually-hidden" for="postcode">우편번호</label>
                        <input
                            id="postcode"
                            class="member-form__input"
                            name="postcode"
                            type="text"
                            autocomplete="postal-code"
                            placeholder="우편번호"
                            value="<?= htmlspecialchars($member['postcode'], ENT_QUOTES, 'UTF-8') ?>"
                            readonly
                            required>
                        <button class="member-form__address-btn" type="button">주소 검색</button>
                    </div>

                    <div class="member-form__group">
                        <label class="visually-hidden" for="address-line1">기본 주소</label>
                        <input
                            id="address-line1"
                            class="member-form__input"
                            name="address_line1"
                            type="text"
                            autocomplete="address-line1"
                            placeholder="기본 주소"
                            value="<?= htmlspecialchars($member['address_line1'], ENT_QUOTES, 'UTF-8') ?>"
                            readonly
                            required>
                    </div>

                    <div class="member-form__group">
                        <label class="visually-hidden" for="address-line2">상세 주소</label>
                        <input
                            id="address-line2"
                            class="member-form__input"
                            name="address_line2"
                            type="text"
                            autocomplete="address-line2"
                            placeholder="상세 주소 (없으면 '없음' 입력)"
                            value="<?= htmlspecialchars($member['address_line2'], ENT_QUOTES, 'UTF-8') ?>"
                            required>
                    </div>
                </fieldset>

                <div class="member-form__check-row">
                    <label class="member-form__check">
                        <input
                            id="agree-marketing"
                            type="checkbox"
                            name="agree_marketing"
                            value="1"
                            <?= (int) $member['agree_marketing'] === 1 ? 'checked' : '' ?>>
                        <span data-marketing-text>
                            <?= (int) $member['agree_marketing'] === 1 ? '이메일 및 SMS 마케팅 정보 수신에 동의합니다.' : '이메일 및 SMS 마케팅 정보 수신에 동의하지 않습니다.' ?>
                        </span>
                    </label>
                    <button
                        class="member-form__check-toggle"
                        type="button"
                        data-marketing-toggle="#agree-marketing">
                        <?= (int) $member['agree_marketing'] === 1 ? '수신거부' : '수신동의' ?>
                    </button>
                </div>

                <button class="member-form__button member-form__button--primary" type="submit">SAVE</button>
            </form>

            <section class="password-panel" aria-labelledby="password-title">
                <h3 id="password-title" class="password-panel__title">PASSWORD</h3>

                <form class="member-form" action="<?= BASE_URL ?>/actions/password_update.php" method="post">
                    <div class="member-form__group">
                        <label class="member-form__label" for="current-password">CURRENT PASSWORD</label>
                        <input
                            id="current-password"
                            class="member-form__input"
                            name="current_password"
                            type="password"
                            autocomplete="current-password"
                            placeholder="현재 비밀번호 입력"
                            required>
                    </div>

                    <div class="member-form__group">
                        <label class="member-form__label" for="new-password">NEW PASSWORD</label>
                        <input
                            id="new-password"
                            class="member-form__input"
                            name="new_password"
                            type="password"
                            autocomplete="new-password"
                            placeholder="영문, 숫자, 특수문자 포함 10자 이상 입력"
                            required>
                    </div>

                    <div class="member-form__group">
                        <label class="member-form__label" for="confirm-password">CONFIRM PASSWORD</label>
                        <input
                            id="confirm-password"
                            class="member-form__input"
                            name="confirm_password"
                            type="password"
                            autocomplete="new-password"
                            placeholder="영문, 숫자, 특수문자 포함 10자 이상 입력"
                            required>
                    </div>

                    <button class="member-form__button" type="submit">CHANGE PASSWORD</button>
                </form>
            </section>
        </section>
    </main>

    <!-- Footer -->
    <?php include __DIR__ . '/../includes/footer.php'; ?>
</div>

<!-- JS -->
<script src="https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"></script>
<script src="<?= BASE_URL ?>/js/header.js"></script>
<script>
const postcodeInput = document.querySelector('#postcode');
const address1Input = document.querySelector('#address-line1');
const address2Input = document.querySelector('#address-line2');
const addressButton = document.querySelector('.member-form__address-btn');

addressButton?.addEventListener('click', () => {
    new daum.Postcode({
        oncomplete(data) {
            postcodeInput.value = data.zonecode;
            address1Input.value = data.roadAddress || data.jibunAddress;
            address2Input.focus();
        }
    }).open();
});

document.querySelectorAll('[data-marketing-toggle]').forEach((button) => {
    button.addEventListener('click', () => {
        const checkbox = document.querySelector(button.dataset.marketingToggle);
        const text = document.querySelector('[data-marketing-text]');

        if (!checkbox || !text) return;

        if (checkbox.checked) {
            const ok = confirm('수신에 동의하지 않겠습니까?');

            if (!ok) return;

            checkbox.checked = false;
            text.textContent = '이메일 및 SMS 마케팅 정보 수신에 동의하지 않습니다.';
            button.textContent = '수신동의';
            return;
        }

        checkbox.checked = true;
        text.textContent = '이메일 및 SMS 마케팅 정보 수신에 동의합니다.';
        button.textContent = '수신거부';
    });
});
</script>
</body>
</html>

<?php
include __DIR__ . '/../includes/config.php';

$pageTitle = 'Fragfarm';
$pageCss = 'join.css';
?>

<!DOCTYPE html>
<html lang="ko">

<!------------ Head ------------>
<?php include __DIR__ . '/../includes/head.php'; ?>

<body>
<div class="mobile-shell">
    <!-- Header -->
    <?php include __DIR__ . '/../includes/header.php'; ?>

    <main id="main">
        <section>
            <p class="join__intro">프래그팜에 오신 걸 환영합니다.</p>
            <h2 class="page-title">SIGN UP</h2>
            <p class="join__note text-accent">* 필수 입력 항목입니다.</p>
            <form action="<?= BASE_URL ?>/actions/join_process.php" method="post" id="join-form" novalidate>
                <!-- Account -->
                <fieldset class="account">
                    <legend class="visually-hidden">계정 정보</legend>
                    <div class="form-group">
                        <label class="form-label is-required" for="user-id">ID</label>
                        <input 
                            id="user-id" 
                            name="user_id"
                            type="text" 
                            minlength="4" 
                            maxlength="16" 
                            autocomplete="username"
                            placeholder="영문 소문자, 숫자 포함 4~16자 입력"
                            required
                            pattern="[a-z0-9]{4,16}">
                    </div>

                    <div class="form-group">
                        <label class="form-label is-required" for="password">PASSWORD</label>
                        <input 
                            id="password"
                            name="password"
                            type="password"
                            minlength="10"
                            autocomplete="new-password"
                            placeholder="영문, 숫자, 특수문자 포함 10자 이상 입력"
                            required
                            pattern="(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^*+=-]).{10,}">
                    </div>

                    <div class="form-group">
                        <label class="form-label is-required" for="confirm-password">CONFIRM PASSWORD</label>
                        <input 
                            id="confirm-password"
                            name="confirm_password"
                            type="password"
                            minlength="10"
                            autocomplete="new-password"
                            placeholder="영문, 숫자, 특수문자 포함 10자 이상 입력"
                            required>
                    </div>
                </fieldset>
                <!-- Name -->
                <div class="form-group name">
                    <label class="form-label is-required" for="user-name">NAME</label>
                    <input 
                        id="user-name"
                        name="user_name"
                        type="text" 
                        autocomplete="name"
                        placeholder="실명 입력"
                        required>
                </div>
                <!-- Adress -->
                <fieldset class="address">
                    <legend class="visually-hidden">주소 정보</legend>

                    <p class="field-title is-required">ADDRESS</p>  
                    <div class="address-group">
                    <div class="address-post">
                        <label class="visually-hidden" for="postcode"></label>
                        <input 
                            id="postcode"
                            name="postcode"
                            type="text"
                            autocomplete="postal-code"
                            placeholder="우편번호"
                            required
                            readonly>
                        <button class="btn-address" type="button">주소 검색</button>
                    </div>
                    <div class="address-line1">
                        <label class="visually-hidden" for="address-line1">기본 주소</label>
                        <input 
                            id="address-line1"
                            name="address_line1"
                            type="text"
                            autocomplete="address-line1"
                            placeholder="기본 주소"
                            required
                            readonly>
                    </div>
                    <div class="address-line2">
                        <label class="visually-hidden" for="address-line2">상세 주소</label>
                        <input
                            id="address-line2"
                            name="address_line2"
                            type="text"
                            autocomplete="address-line2"
                            placeholder="상세 주소 (없으면 '없음' 입력)"
                            required>
                    </div>
                    </div>
                </fieldset>
                <!-- Phone -->
                <div class="form-group phone">
                    <label class="form-label is-required" for="phone">PHONE NUMBER</label>
                    <input
                        id="phone"
                        name="phone"
                        type="tel"
                        pattern="[0-9]{10,11}"
                        inputmode="numeric"
                        autocomplete="tel"
                        placeholder="'-' 없이 입력"
                        required
                        >
                </div>
                <!-- Email -->
                <div class="form-group email">
                    <label class="form-label is-required" for="email">EMAIL ADDRESS</label>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        autocomplete="email"
                        placeholder="farfram@fragfram.com"
                        required
                        >
                </div>
                <!-- Birth -->
                <fieldset class="birth">
                    <legend class="visually-hidden">생년월일</legend>
                    <p class="field-title birth">BIRTH DATE</p>
                    <div class="form-group birth-group">
                    <div class="birth-selects">
                        <select id="birth-year" name="birth_year">
                            <option value="">2008</option>
                        </select>
                        <label class="form-label" for="birth-year">년</label>
                        <select id="birth-month" name="birth_month">
                            <option value="">2</option>
                        </select>
                        <label class="form-label" for="birth-month">월</label>
                        <select id="birth-day" name="birth_day">
                            <option value="">25</option>
                        </select>
                        <label class="form-label" for="birth-day">일</label>
                    </div>
                    <div class="calendar-type">
                        <label class="radio check-box">
                            <input 
                                class="radio__input check-box__input"
                                type="radio" 
                                name="calendar_type" 
                                value="solar" 
                                checked>
                                양력
                        </label>
                        <label class="radio check-box">
                            <input 
                                class="radio__input check-box__input"
                                type="radio" 
                                name="calendar_type" 
                                value="lunar">
                                음력
                        </label>
                    </div>
                    </div>
                </fieldset>

                <!-- Agreement -->
                <fieldset class="agreement">
                    <legend class="visually-hidden">약관 동의</legend>
                    <div class="agreement__item">
                        <label class="agreement__label check-box all"> 
                            <input 
                                class="check-box__input"
                                type="checkbox" 
                                name="agree_all"
                                data-agreement="all">
                            <strong>모두</strong>&nbsp;동의합니다.
                        </label>
                    </div> 
                    <div class="agreement__item">
                        <label class="agreement__label check-box is-required">
                            <input 
                                class="check-box__input"
                                name="agree_terms" 
                                type="checkbox" 
                                required
                                data-agreement="required">
                            <span class="text-accent">(필수)</span> &nbsp; <strong>이용약관</strong>에 동의합니다.
                        </label>
                        <div class="agreement__content" aria-label="이용약관 내용">
                            <div class="agreement__scroll" id="terms-area">
                                <!-- js로 해당 페이지 내용 들어갈 예정 -->
                                <h3>이용약관</h3>
                                <h4>제1조(목적)</h4>
                                <p>이 약관은 김동규(전자상거래 사업자)가 운영하는 fragfarm(이하 “몰”이라 한다)에서 제공하는 인터넷 관련 서비스(이하 “서비스”라 한다)를 이용함에 있어 사이버 몰과 이용자의 권리․의무 및 책임사항을 규정함을 목적으로 합니다.</p>
                                <p>※「PC통신, 무선 등을 이용하는 전자상거래에 대해서도 그 성질에 반하지 않는 한 이 약관을 준용합니다.</p>
                                <p>...</p>
                            </div>
                        </div>
                    </div>
                    <div class="agreement__item">
                        <label class="agreement__label check-box is-required">
                            <input 
                                class="check-box__input"
                                name="agree_privacy" 
                                type="checkbox" 
                                required
                                data-agreement="required">
                            <span class="text-accent">(필수)</span> &nbsp; <strong>개인정보 수집 및 이용 동의</strong>에 동의합니다.
                        </label>
                        <div class="agreement__content" aria-label="개인정보 수집 및 이용 동의 내용">
                            <div class="agreement__scroll" id="privacy-area">
                                <!-- js로 해당 페이지 내용 들어갈 예정 -->
                                <h3>개인정보처리방침</h3>
                                <p><strong>fragfarm</strong>은 (이하 '회사'는) 고객님의 개인정보를 중요시하며, "정보통신망 이용촉진 및 정보보호"에 관한 법률을 준수하고 있습니다.</p>
                                <p>회사는 개인정보처리방침을 통하여 고객님께서 제공하시는 개인정보가 어떠한 용도와 방식으로 이용되고 있으며, 개인정보보호를 위해 어떠한 조치가 취해지고 있는지 알려드립니다.</p>
                                <p>회사는 개인정보처리방침을 개정하는 경우 웹사이트 공지사항(또는 개별공지)을 통하여 공지할 것입니다.</p>
                                <p>...</p>
                            </div>
                        </div>
                    </div>
                    <div class="agreement__item">
                        <label class="agreement__label check-box is-required">
                            <input 
                                class="check-box__input"
                                id="agree-age" 
                                name="agree_age" 
                                type="checkbox" 
                                required
                                data-agreement="required">
                            <span class="text-accent">(필수)</span> &nbsp; <strong>만 14세 이상</strong>입니다.
                        </label>
                        <div class="agreement__content" aria-label="만 19세 미만 시 주의사항">
                            <div class="agreement__scroll">
                                <p>만 19세 미만의 미성년자가 결제 시 법정대리인이 거래를 취소할 수 있습니다.</p>
                            </div>
                        </div>
                    </div>
                    <div class="agreement__item">
                        <label class="agreement__label check-box">
                            <input 
                                class="check-box__input" 
                                name="agree_marketing"
                                type="checkbox"
                                data-agreement="optional">
                            <strong>(선택)</strong> &nbsp;이메일 및 SMS 마케팅 정보 수신에 동의합니다.
                        </label>
                        <div class="agreement__content" aria-label="이메일 및 SMS 마케팅 정보 수신 동의 내용">
                            <div class="agreement__scroll">
                                <p>할인 쿠폰 및 혜택, 이벤트, 신상품 소식 등 프래그팜에서 제공하는 쇼핑 정보를 문자 또는 이메일로 먼저 받아보실 수 있습니다.</p>
                                <p>주문/거래 정보 및 주요 정책과 관련된 내용은 수신 동의 여부와 관계없이 발송됩니다.</p>
                                <p>선택 약관에 동의하지 않아도 회원 가입은 가능합니다.</p>
                                <p>회원 가입 후 마이 페이지에서 언제든지 수신 여부를 변경할 수 있습니다. </p>
                            </div>
                        </div>
                    </div>
                </fieldset>
                <!-- Submit Button -->
                <div>
                    <button class="btn btn-signup" type="submit">
                        SIGN UP
                    </button>
                    <button class="btn-reset" type="reset">
                        RESET
                    </button>
                </div>
            </form>
        </section>
    </main>

    <!-- Footer -->
    <?php include __DIR__ . '/../includes/footer.php'; ?>
</div>

<!-- JS -->
<script src="https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"></script>
<script src="<?= BASE_URL ?>/js/header.js"></script>
<script src="<?= BASE_URL ?>/js/join.js"></script>

</body>
</html>

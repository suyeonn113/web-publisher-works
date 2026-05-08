/* ========== DOM ========== */

const form = document.querySelector('#join-form');

const idInput = form.querySelector('#user-id');
const REG_ID = /^(?=.*[a-z])(?=.*[0-9])[a-z0-9]{4,16}$/;

const passInput = form.querySelector('#password');
const passconfirmInput = form.querySelector('#confirm-password');
const REG_PASSWORD = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^*+=-]).{10,}$/;

const nameInput = form.querySelector('#user-name');

const postcodeInput = document.querySelector('#postcode');
const address1Input = document.querySelector('#address-line1');
const address2Input = document.querySelector('#address-line2');
const addressButton = document.querySelector('.btn-address');

const phoneInput = form.querySelector('#phone');
const REG_PHONE = /^01[0-9]{8,9}$/;

const emailInput = form.querySelector('#email');
const REG_EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const yearSelect = form.querySelector('#birth-year');
const monthSelect = form.querySelector('#birth-month');
const daySelect = form.querySelector('#birth-day');

const now = new Date();
const currentYear = now.getFullYear();
const currentMonth = now.getMonth() + 1;
const currentDay = now.getDate();

const agreeAllCheckbox = form.querySelector('input[data-agreement="all"]');
const requiredCheckboxes = form.querySelectorAll('input[data-agreement="required"]');
const optionalCheckbox = form.querySelectorAll('input[data-agreement="optional"]');
const agreementCheckboxes = form.querySelectorAll(
    'input[data-agreement="required"], input[data-agreement="optional"]'
);

const resetBtn = form.querySelector('.btn-reset');

// 빈 값 검사
const checkEmpty = (input, message) => {
    if (!input.value.trim()) {
        alert(message);
        input.focus();
        return false;
    }
    return true;
};

// Birth
// Year
for (let y = currentYear; y>=1920; y--) {
    yearSelect.insertAdjacentHTML('beforeend', `<option value="${y}">${y}</option>`);
}

// Month
for (let m = 1; m <= 12; m++) {
    monthSelect.insertAdjacentHTML('beforeend', `<option value="${m}">${m}</option>`);
}

// Today
yearSelect.value = currentYear;
monthSelect.value = currentMonth;

// Day
function updateDays() {
    const year = yearSelect.value;
    const month = monthSelect.value;

    if (!year || !month) return;

    const days = new Date(year, month, 0).getDate();

    daySelect.innerHTML = '';

    for (let d = 1; d <= days; d++) {
        daySelect.insertAdjacentHTML('beforeend', `<option value="${d}">${d}</option>`);
    }

    daySelect.value = Math.min(currentDay, days);
}

updateDays();

yearSelect.addEventListener('change', updateDays);
monthSelect.addEventListener('change', updateDays);

// Address

function openAddressSearch() {
    new daum.Postcode({
        oncomplete: function(data) {

            // 도로명 주소 우선
            const address = data.roadAddress || data.jibunAddress;

            // 값 넣기
            postcodeInput.value = data.zonecode;
            address1Input.value = address;

            // 상세주소로 포커스 이동
            address2Input.focus();
        }
    }).open();
}

addressButton.addEventListener('click', openAddressSearch);

// Agree All
function handleAgreeAllChange() {
    const isChecked = agreeAllCheckbox.checked;

    requiredCheckboxes.forEach((checkbox) => {
        checkbox.checked = isChecked;
    });
    optionalCheckbox.forEach((checkbox) => {
        checkbox.checked = isChecked;
    });
}

agreeAllCheckbox.addEventListener('change', handleAgreeAllChange);

agreementCheckboxes.forEach((checkbox) => {
    checkbox.addEventListener('change', () => {
        let allChecked = true;

        agreementCheckboxes.forEach((item) => {
            if (!item.checked) {
                allChecked = false;
            }
        });

        agreeAllCheckbox.checked = allChecked;
    });
});    

/* ========== Test ========== */

form.addEventListener('submit', (e) => {
    // ID
    if (!checkEmpty(idInput, '아이디를 입력하세요.')) {
        e.preventDefault();
        return;
    }
    if (!REG_ID.test(idInput.value)) {
        alert('아이디 형식이 올바르지 않습니다.\n영문 소문자, 숫자 포함 4~16자 입력');
        idInput.focus();
        e.preventDefault();
        return;
    }

    // Password
    if (!checkEmpty(passInput, '비밀번호를 입력하세요.')) {
        e.preventDefault();
        return;
    }
    if (!REG_PASSWORD.test(passInput.value)) {
        alert('비밀번호 형식이 올바르지 않습니다.\n영문, 숫자, 특수문자 포함 10자 이상 입력');
        passInput.focus();
        e.preventDefault();
        return;
    }
    // Password Confirm
    if (!checkEmpty(passconfirmInput, '비밀번호 확인을 입력하세요.')) {
        e.preventDefault();
        return;
    }
    if (passInput.value !== passconfirmInput.value) {
        alert('비밀번호가 일치하지 않습니다.');
        passconfirmInput.focus();
        e.preventDefault();
        return;
    }

    // Name
    if (!checkEmpty(nameInput, '이름을 입력하세요.')) {
        e.preventDefault();
        return;
    }
    
    // Address
    if (!checkEmpty(postcodeInput, '주소를 입력하세요.')) {
        e.preventDefault();
        return;
    }
    if (!checkEmpty(address1Input, '기본 주소를 입력하세요.')) {
        e.preventDefault();
        return;
    }
    if (!checkEmpty(address2Input, "상세주소를 입력하세요.\n없으면 '없음' 입력하세요.")) {
        e.preventDefault();
        return;
    }
    
    // Phone
    if (!checkEmpty(phoneInput, '전화번호를 입력하세요.')) {
        e.preventDefault();
        return;
    }
    if (!REG_PHONE.test(phoneInput.value)) {
        alert('전화번호 형식이 올바르지 않습니다.\n- 없이 숫자만 입력하세요.');
        phoneInput.focus();
        e.preventDefault();
        return;
    }

    // Email
    if (!checkEmpty(emailInput, '이메일을 입력하세요.')) {
        e.preventDefault();
        return;
    }
    if (!REG_EMAIL.test(emailInput.value)) {
        alert('이메일 형식이 올바르지 않습니다.');
        emailInput.focus();
        e.preventDefault();
        return;
    }

    // Agreement
    for (const checkbox of requiredCheckboxes) {
        if (!checkbox.checked) {
            alert('필수 약관에 동의해주세요.');
            checkbox.focus();
            e.preventDefault();
            return;
        }
    }

});

// Reset
resetBtn.addEventListener('click', (e) => {
   const ok = confirm('초기화하시겠습니까?');

   if (!ok) {
    e.preventDefault();
   }
});

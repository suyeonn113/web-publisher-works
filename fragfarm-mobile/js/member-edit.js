(function () {
    const isDemoMode = window.FRAGFARM_DEMO_MODE === true;
    const demoSessionKey = 'fragfarm_demo_session';
    const postcodeInput = document.querySelector('#postcode');
    const address1Input = document.querySelector('#address-line1');
    const address2Input = document.querySelector('#address-line2');
    const addressButton = document.querySelector('.member-form__address-btn');

    addressButton?.addEventListener('click', () => {
        if (!window.daum?.Postcode) {
            window.showGlobalToast?.('주소 검색 서비스를 불러오지 못했습니다.');
            return;
        }

        new window.daum.Postcode({
            oncomplete(data) {
                postcodeInput.value = data.zonecode;
                address1Input.value = data.roadAddress || data.jibunAddress;
                address2Input.focus();
            },
        }).open();
    });

    if (isDemoMode) {
        let demoSession = window.FragfarmUtils.readStorage(demoSessionKey, null);

        if (!demoSession) {
            window.location.href = `${window.FRAGFARM_BASE_URL}/pages/login.php`;
        } else {
            const fieldMap = {
                'user-id': 'user_id',
                'user-name': 'user_name',
                email: 'email',
                phone: 'phone',
                postcode: 'postcode',
                'address-line1': 'address_line1',
                'address-line2': 'address_line2',
            };

            Object.entries(fieldMap).forEach(([id, key]) => {
                const input = document.getElementById(id);
                if (input && demoSession[key]) input.value = demoSession[key];
            });

            document.querySelector('[data-member-form]')?.addEventListener('submit', (event) => {
                event.preventDefault();
                const data = new FormData(event.currentTarget);
                const nextSession = {
                    ...demoSession,
                    user_name: data.get('user_name'),
                    email: data.get('email'),
                    phone: data.get('phone'),
                    postcode: data.get('postcode'),
                    address_line1: data.get('address_line1'),
                    address_line2: data.get('address_line2'),
                    agree_marketing: data.get('agree_marketing') === '1',
                };
                window.FragfarmUtils.writeStorage(demoSessionKey, nextSession);
                demoSession = nextSession;
                window.showGlobalToast?.('회원정보를 저장했습니다.');
            });

            document.querySelector('[data-password-form]')?.addEventListener('submit', (event) => {
                event.preventDefault();
                event.currentTarget.reset();
                window.showGlobalToast?.('데모 비밀번호를 변경했습니다.');
            });
        }
    }

    document.querySelectorAll('[data-marketing-toggle]').forEach((button) => {
        button.addEventListener('click', () => {
            const checkbox = document.querySelector(button.dataset.marketingToggle);
            const text = document.querySelector('[data-marketing-text]');

            if (!checkbox || !text) return;

            if (checkbox.checked) {
                const confirmed = window.confirm('수신에 동의하지 않겠습니까?');
                if (!confirmed) return;

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
}());

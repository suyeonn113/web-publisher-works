(function () {
    const sessionKey = 'fragfarm_demo_session';
    const isDemoMode = window.FRAGFARM_DEMO_MODE === true;
    let session;

    if (isDemoMode) {
        try {
            session = JSON.parse(window.localStorage.getItem(sessionKey) || 'null');
        } catch (error) {
            session = null;
        }
    }

    if (isDemoMode && !session) {
        window.location.href = `${window.FRAGFARM_BASE_URL || ''}/pages/login.php`;
        return;
    }

    const addressPage = document.querySelector('[data-address-page]');

    if (!addressPage) {
        return;
    }

    const setText = (selector, value) => {
        const element = addressPage.querySelector(selector);

        if (element && value) {
            element.textContent = value;
        }
    };

    if (isDemoMode) {
        setText('[data-address-name]', session.user_name);
        setText('[data-address-phone]', session.phone);
        setText('[data-address-postcode]', session.postcode ? `[${session.postcode}]` : '');
        setText('[data-address-line1]', session.address_line1);
        setText('[data-address-line2]', session.address_line2);
    }

    const form = addressPage.querySelector('[data-address-add-form]');
    const toggleButton = addressPage.querySelector('[data-address-add-toggle]');
    const cancelButton = addressPage.querySelector('[data-address-add-cancel]');
    const searchButton = addressPage.querySelector('[data-address-search]');
    const list = addressPage.querySelector('[data-additional-address-list]');
    const owner = isDemoMode
        ? `${addressPage.dataset.addressOwner}-${session.user_id || 'member'}`
        : addressPage.dataset.addressOwner;
    const storageKey = `fragfarm_address_book_${owner}`;

    const readAddresses = () => {
        try {
            const items = JSON.parse(window.localStorage.getItem(storageKey) || '[]');

            return Array.isArray(items) ? items : [];
        } catch (error) {
            return [];
        }
    };

    const writeAddresses = (items) => {
        window.localStorage.setItem(storageKey, JSON.stringify(items));
    };

    const escapeHtml = (value) => String(value ?? '').replace(/[&<>"']/g, (character) => ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    }[character]));

    const renderAddresses = () => {
        if (!list) return;

        list.innerHTML = readAddresses().map((address) => `
            <article class="address-card">
                <div class="address-card__head">
                    <h3>${escapeHtml(address.label)}</h3>
                    <button class="address-card__remove" type="button" data-address-remove="${escapeHtml(address.id)}">삭제</button>
                </div>
                <p>${escapeHtml(address.recipient_name)} · ${escapeHtml(address.phone)}</p>
                <address>[${escapeHtml(address.postcode)}] ${escapeHtml(address.address_line1)} ${escapeHtml(address.address_line2)}</address>
            </article>
        `).join('');

        list.querySelectorAll('[data-address-remove]').forEach((button) => {
            button.addEventListener('click', () => {
                writeAddresses(readAddresses().filter((address) => String(address.id) !== button.dataset.addressRemove));
                renderAddresses();
                window.showGlobalToast?.('배송지를 삭제했습니다.');
            });
        });
    };

    const setFormOpen = (isOpen) => {
        if (!form || !toggleButton) return;

        form.hidden = !isOpen;
        toggleButton.setAttribute('aria-expanded', String(isOpen));
        toggleButton.textContent = isOpen ? '배송지 추가 닫기' : '배송지 추가';

        if (isOpen) {
            form.elements.namedItem('label')?.focus();
        }
    };

    toggleButton?.addEventListener('click', () => {
        setFormOpen(form?.hidden ?? true);
    });

    cancelButton?.addEventListener('click', () => {
        form?.reset();
        setFormOpen(false);
    });

    searchButton?.addEventListener('click', () => {
        if (!window.daum?.Postcode || !form) {
            window.showGlobalToast?.('주소 검색 서비스를 불러오지 못했습니다.');
            return;
        }

        new window.daum.Postcode({
            oncomplete(data) {
                const postcode = form.elements.namedItem('postcode');
                const addressLine1 = form.elements.namedItem('address_line1');
                const addressLine2 = form.elements.namedItem('address_line2');

                postcode.value = data.zonecode;
                addressLine1.value = data.roadAddress || data.jibunAddress;
                addressLine2.focus();
            }
        }).open();
    });

    form?.addEventListener('submit', (event) => {
        event.preventDefault();
        const data = new FormData(form);
        const address = {
            id: String(Date.now()),
            label: String(data.get('label') || '').trim(),
            recipient_name: String(data.get('recipient_name') || '').trim(),
            phone: String(data.get('phone') || '').trim(),
            postcode: String(data.get('postcode') || '').trim(),
            address_line1: String(data.get('address_line1') || '').trim(),
            address_line2: String(data.get('address_line2') || '').trim()
        };

        writeAddresses([...readAddresses(), address]);
        form.reset();
        setFormOpen(false);
        renderAddresses();
        window.showGlobalToast?.('배송지를 추가했습니다.');
    });

    renderAddresses();
}());

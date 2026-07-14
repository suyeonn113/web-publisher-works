const popup = document.querySelector('.popup');
const dim = document.querySelector('.popup__dim');
const dismiss = document.querySelector('.popup__dismiss');
const menuBtn = document.querySelector('#header-menu');
const popupDialog = popup?.querySelector('[role="dialog"]');
let popupLastFocused = null;

console.log('js 연결됨');

// 오늘 다시 보지 않기
function setCookie(name, value, days) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));

    document.cookie =
        name + "=" + value +
        "; expires=" + date.toUTCString() +
        "; path=/";
}

function getCookie(name) {
    const cookies = document.cookie.split(';');

    for (let c of cookies) {
        c = c.trim();
        if (c.startsWith(name + '=')) {
            return c.substring(name.length + 1);
        }
    }
    return null;
}

// Popup Open
function openPopup() {
    popupLastFocused = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    popup.hidden = false;
    document.body.classList.add('no-scroll');
    menuBtn?.setAttribute('disabled', '');
    window.requestAnimationFrame(() => dismiss?.focus());
}

// Popup Closed
function closePopup() {
    popup.hidden = true;
    document.body.classList.remove('no-scroll');
    menuBtn?.removeAttribute('disabled');
    popupLastFocused?.focus();
}

if (!getCookie('popupClosed')) {
    openPopup();
}

// dim Click
dim?.addEventListener('click', closePopup);

// dismiss Click
dismiss?.addEventListener('click', () => {
    setCookie('popupClosed', 'true', 1); // 1일
    closePopup();
});

// ESC Click
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !popup.hidden) {
        closePopup();
        return;
    }

    if (!popup.hidden) window.FragfarmA11y?.trapFocus(popupDialog, e);
});

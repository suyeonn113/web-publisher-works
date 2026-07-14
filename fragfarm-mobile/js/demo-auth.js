(function () {
    if (!window.FRAGFARM_DEMO_MODE) return;

    const SESSION_KEY = 'fragfarm_demo_session';
    const PROFILE_KEY = 'fragfarm_demo_profile';
    const MASTER_ID = 'fragfarm';
    const MASTER_PASSWORD = 'fragfarm123!';
    const baseUrl = window.FRAGFARM_BASE_URL || '';

    const readJson = (key, fallback = null) => {
        try {
            return JSON.parse(window.localStorage.getItem(key)) || fallback;
        } catch (error) {
            return fallback;
        }
    };

    const updateHeader = () => {
        const link = document.querySelector('[data-demo-login-link]');
        if (!link) return;
        const loggedIn = Boolean(readJson(SESSION_KEY));
        link.dataset.state = loggedIn ? 'logged-in' : 'logged-out';
        link.href = loggedIn ? `${baseUrl}/pages/mypage.php` : `${baseUrl}/pages/login.php`;
        link.setAttribute('aria-label', loggedIn ? '마이페이지' : '로그인');
    };

    document.addEventListener('DOMContentLoaded', () => {
        updateHeader();

        const loginForm = document.querySelector('[data-demo-login]');
        loginForm?.addEventListener('submit', (event) => {
            event.preventDefault();
            const data = new FormData(loginForm);
            if (data.get('user_id') !== MASTER_ID || data.get('password') !== MASTER_PASSWORD) {
                window.alert('로컬 마스터 아이디 또는 비밀번호가 올바르지 않습니다.');
                return;
            }
            window.localStorage.setItem(SESSION_KEY, JSON.stringify({ user_id: MASTER_ID, user_name: 'Fragfarm Master' }));
            window.location.href = window.localStorage.getItem('fragfarm_demo_after_login') || `${baseUrl}/index.php`;
            window.localStorage.removeItem('fragfarm_demo_after_login');
        });

        const joinForm = document.querySelector('[data-demo-join]');
        joinForm?.addEventListener('submit', (event) => {
            if (event.defaultPrevented) return;
            event.preventDefault();
            const data = new FormData(joinForm);
            const profile = {
                user_name: data.get('user_name') || 'Fragfarm Master',
                phone: data.get('phone') || '',
                postcode: data.get('postcode') || '',
                address_line1: data.get('address_line1') || '',
                address_line2: data.get('address_line2') || '',
                email: data.get('email') || '',
            };
            window.localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
            window.alert('로컬 데모 프로필이 저장되었습니다. 마스터 계정으로 로그인해주세요.');
            window.location.href = `${baseUrl}/pages/login.php`;
        });
    });
}());

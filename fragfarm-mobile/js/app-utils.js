(function () {
    const parseJson = (value, fallback = null) => {
        try {
            const parsed = JSON.parse(value);
            return parsed ?? fallback;
        } catch (error) {
            return fallback;
        }
    };

    const escapeHtml = (value) => String(value ?? '').replace(
        /[&<>"']/g,
        (character) => ({
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#039;',
        }[character])
    );

    const formatPrice = (value) => `${Number(value || 0).toLocaleString('ko-KR')}원`;

    const readStorage = (key, fallback = null) => parseJson(window.localStorage.getItem(key), fallback);
    const writeStorage = (key, value) => window.localStorage.setItem(key, JSON.stringify(value));
    const readStorageArray = (key) => {
        const value = readStorage(key, []);
        return Array.isArray(value) ? value : [];
    };

    window.FragfarmUtils = {
        escapeHtml,
        formatPrice,
        parseJson,
        readStorage,
        readStorageArray,
        writeStorage,
    };
}());

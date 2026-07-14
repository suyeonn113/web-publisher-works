(function () {
    const modal = document.querySelector('[data-review-modal]');

    if (!modal) {
        return;
    }

    const modalImage = modal.querySelector('[data-review-modal-image]');
    const dialog = modal.querySelector('[role="dialog"]');
    const closeButtons = modal.querySelectorAll('[data-review-modal-close]');
    const imageButtons = document.querySelectorAll('[data-review-image]');
    let lastFocused = null;

    const closeModal = () => {
        modal.hidden = true;
        modalImage.removeAttribute('src');
        document.body.classList.remove('is-review-modal-open');

        if (lastFocused) {
            lastFocused.focus();
        }
    };

    const openModal = (button) => {
        const src = button.dataset.reviewImage;

        if (!src) {
            return;
        }

        lastFocused = button;
        modalImage.src = src;
        modal.hidden = false;
        document.body.classList.add('is-review-modal-open');

        const closeButton = modal.querySelector('.review-image-modal__close');
        closeButton.focus();
    };

    imageButtons.forEach((button) => {
        button.addEventListener('click', () => openModal(button));
    });

    closeButtons.forEach((button) => {
        button.addEventListener('click', closeModal);
    });

    document.addEventListener('keydown', (event) => {
        if (modal.hidden) return;

        if (event.key === 'Escape') {
            closeModal();
            return;
        }

        window.FragfarmA11y?.trapFocus(dialog, event);
    });

    if (!window.FRAGFARM_DEMO_MODE) return;

    const COMMENT_KEY = 'fragfarm_demo_review_comments';
    const SESSION_KEY = 'fragfarm_demo_session';
    const section = document.querySelector('[data-review-detail-comments]');
    const form = document.querySelector('[data-demo-review-detail-comment]');
    if (!section || !form) return;

    const reviewKey = section.dataset.reviewDetailComments;
    const productId = String(form.elements.namedItem('product_id')?.value || '');
    const textarea = form.elements.namedItem('comment');
    const read = (key) => {
        try {
            return JSON.parse(window.localStorage.getItem(key) || '[]');
        } catch (error) {
            return [];
        }
    };
    const write = (key, items) => window.localStorage.setItem(key, JSON.stringify(items));
    const escapeHtml = (value) => String(value ?? '').replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' }[char]));
    const session = (() => {
        try {
            return JSON.parse(window.localStorage.getItem(SESSION_KEY) || 'null');
        } catch (error) {
            return null;
        }
    })();
    const isMasterLoggedIn = session?.user_id === 'fragfarm';

    if (textarea) {
        textarea.readOnly = !isMasterLoggedIn;
        textarea.placeholder = isMasterLoggedIn ? '후기에 관한 의견을 남겨주세요.' : '로그인 후 이용해주세요.';
    }

    const renderComments = () => {
        const list = section.querySelector('[data-review-detail-comment-list]');
        const count = section.querySelector('[data-review-detail-comment-count]');
        if (!list || !count) return;
        list.querySelectorAll('[data-demo-review-detail-comment-item]').forEach((item) => item.remove());
        const comments = read(COMMENT_KEY).filter((item) => item.product_id === productId && item.review_key === reviewKey);
        comments.forEach((comment) => {
            list.insertAdjacentHTML('beforeend', `<article class="review-comment" data-demo-review-detail-comment-item="${escapeHtml(comment.id)}"><h3 class="review-comment__author">마**</h3>${isMasterLoggedIn ? `<button class="review-comment__delete-button" type="button" data-demo-review-detail-comment-delete="${escapeHtml(comment.id)}" aria-label="내 댓글 삭제"><img src="${window.FRAGFARM_BASE_URL || ''}/assets/icons/close.svg" alt=""></button>` : ''}<p>${escapeHtml(comment.content)}</p></article>`);
        });
        count.textContent = `COMMENTS (${Number(count.dataset.baseCount || 0) + comments.length})`;
        list.querySelectorAll('[data-demo-review-detail-comment-delete]').forEach((button) => {
            button.addEventListener('click', () => {
                write(COMMENT_KEY, read(COMMENT_KEY).filter((item) => item.id !== button.dataset.demoReviewDetailCommentDelete));
                renderComments();
            });
        });
    };

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        if (!isMasterLoggedIn) {
            window.localStorage.setItem('fragfarm_demo_after_login', window.location.href);
            window.location.href = `${window.FRAGFARM_BASE_URL || ''}/pages/login.php`;
            return;
        }
        const content = String(textarea?.value || '').trim();
        if (!content || content.length > 500) return;
        const comments = read(COMMENT_KEY);
        comments.push({ id: String(Date.now()), product_id: productId, review_key: reviewKey, content, created_at: new Date().toISOString() });
        write(COMMENT_KEY, comments);
        form.reset();
        renderComments();
    });

    renderComments();
}());

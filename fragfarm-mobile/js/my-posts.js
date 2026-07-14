(function () {
    const root = document.querySelector('.my-posts');
    if (!root) return;

    const baseUrl = window.FRAGFARM_BASE_URL || '';
    const isDemo = Boolean(window.FRAGFARM_DEMO_MODE);
    const reviewKey = 'fragfarm_demo_reviews';
    const commentKey = 'fragfarm_demo_review_comments';
    const qnaKey = 'fragfarm_demo_product_qna';
    const escapeHtml = (value) => String(value ?? '').replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' }[char]));
    const read = (key) => {
        try {
            return JSON.parse(window.localStorage.getItem(key) || '[]');
        } catch (error) {
            return [];
        }
    };
    const write = (key, items) => window.localStorage.setItem(key, JSON.stringify(items));
    const formatDate = (value) => {
        const date = new Date(value);
        if (Number.isNaN(date.getTime())) return '';
        return new Intl.DateTimeFormat('ko-KR', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' }).format(date);
    };
    const safeDomId = (value) => String(value ?? '').replace(/[^a-zA-Z0-9_-]/g, '');
    const productNames = (() => {
        try {
            return JSON.parse(document.querySelector('#my-posts-product-names')?.textContent || '{}');
        } catch (error) {
            return {};
        }
    })();

    const bindEditToggles = () => {
        root.querySelectorAll('[data-post-edit-toggle]').forEach((button) => {
            button.addEventListener('click', () => {
                const form = button.closest('.my-post')?.querySelector('[data-post-edit-form]');
                if (!form) return;
                const shouldOpen = form.hidden;
                form.hidden = !shouldOpen;
                button.textContent = shouldOpen ? '수정 닫기' : '수정';
            });
        });
    };

    if (!isDemo) {
        bindEditToggles();
        return;
    }

    let session = null;
    try {
        session = JSON.parse(window.localStorage.getItem('fragfarm_demo_session') || 'null');
    } catch (error) {
        session = null;
    }
    if (session?.user_id !== 'fragfarm') {
        window.localStorage.setItem('fragfarm_demo_after_login', window.location.href);
        window.location.href = `${baseUrl}/pages/login.php`;
        return;
    }

    const productLink = (productId, fragment) => `${baseUrl}/pages/product-detail.php?id=${encodeURIComponent(productId)}#${fragment}`;
    const reviewFragment = (key) => {
        const value = String(key || '');
        const databaseReview = value.match(/^db-(\d+)$/);
        return databaseReview ? `review-${databaseReview[1]}` : `review-${safeDomId(value)}`;
    };
    const reviewTargetLink = (productId, key) => /^moment-\d{3}$/.test(String(key || ''))
        ? `${baseUrl}/pages/review-detail.php?id=${encodeURIComponent(key)}#comments-title`
        : productLink(productId, reviewFragment(key));

    const renderReviews = () => {
        const list = root.querySelector('[data-my-review-list]');
        const empty = root.querySelector('[data-my-review-empty]');
        const count = root.querySelector('[data-my-review-count]');
        if (!list) return;
        const reviews = read(reviewKey).slice().reverse();
        list.innerHTML = reviews.map((review) => {
            const id = safeDomId(review.id);
            const fragment = `review-demo-${id}`;
            const productId = String(review.product_id || '');
            const name = productNames[productId] || productId || '상품';
            const rating = Math.min(5, Math.max(1, Number(review.rating || 1)));
            const options = [5, 4, 3, 2, 1].map((score) => `<option value="${score}" ${score === rating ? 'selected' : ''}>${score}점</option>`).join('');
            return `<article class="my-post" id="my-review-${id}"><div class="my-post__head"><a href="${productLink(productId, fragment)}">${escapeHtml(name)}</a><time>${escapeHtml(formatDate(review.updated_at || review.created_at))}</time></div><p class="my-post__rating" aria-label="평점 ${rating}점">★ ${rating} / 5</p><p class="my-post__content">${escapeHtml(review.content)}</p><div class="my-post__actions"><a href="${productLink(productId, fragment)}">상품에서 보기</a><button type="button" data-post-edit-toggle>수정</button></div><form class="my-post__edit" data-post-edit-form data-demo-review-edit="${escapeHtml(review.id)}" hidden><label>별점<select name="rating">${options}</select></label><label>후기 내용<textarea name="review" rows="5" maxlength="2000" required>${escapeHtml(review.content)}</textarea></label><button type="submit">수정 저장</button></form></article>`;
        }).join('');
        if (empty) empty.hidden = reviews.length > 0;
        if (count) count.textContent = String(reviews.length);
    };

    const renderQna = () => {
        const list = root.querySelector('[data-my-qna-list]');
        const empty = root.querySelector('[data-my-qna-empty]');
        const count = root.querySelector('[data-my-qna-count]');
        if (!list) return;
        const items = read(qnaKey).slice().reverse();
        list.innerHTML = items.map((qna) => {
            const id = safeDomId(qna.id);
            const fragment = `qna-demo-${id}`;
            const productId = String(qna.product_id || '');
            const name = productNames[productId] || productId || '상품';
            const hasAnswer = String(qna.answer_content || '').trim() !== '';
            const answer = hasAnswer ? `<p>${escapeHtml(qna.answer_content)}</p>${qna.answered_at ? `<time>${escapeHtml(formatDate(qna.answered_at))}</time>` : ''}` : '';
            return `<article class="my-post" id="my-qna-${id}"><div class="my-post__head"><a href="${productLink(productId, fragment)}">${escapeHtml(name)}</a><time>${escapeHtml(formatDate(qna.updated_at || qna.created_at))}</time></div><p class="my-post__content">${escapeHtml(qna.content)}</p><p class="my-post__secret">${qna.is_secret ? '비밀글' : '공개글'}</p><div class="my-post__answer ${hasAnswer ? 'is-complete' : ''}"><strong>${hasAnswer ? '답변 완료' : '답변 대기'}</strong>${answer}</div><div class="my-post__actions"><a href="${productLink(productId, fragment)}">상품에서 보기</a><button type="button" data-post-edit-toggle>수정</button></div><form class="my-post__edit" data-post-edit-form data-demo-qna-edit="${escapeHtml(qna.id)}" hidden><label>문의 내용<textarea name="qna" rows="5" maxlength="2000" required>${escapeHtml(qna.content)}</textarea></label><label class="my-post__secret-check"><input type="checkbox" name="is_secret" value="1" ${qna.is_secret ? 'checked' : ''}> 비밀글</label><button type="submit">수정 저장</button></form></article>`;
        }).join('');
        if (empty) empty.hidden = items.length > 0;
        if (count) count.textContent = String(items.length);
    };

    const renderComments = () => {
        const list = root.querySelector('[data-my-comment-list]');
        const empty = root.querySelector('[data-my-comment-empty]');
        const count = root.querySelector('[data-my-comment-count]');
        if (!list) return;
        const comments = read(commentKey).slice().reverse();
        list.innerHTML = comments.map((comment) => {
            const id = safeDomId(comment.id);
            const productId = String(comment.product_id || '');
            const name = productNames[productId] || productId || '상품';
            const link = reviewTargetLink(productId, comment.review_key);
            return `<article class="my-post" id="my-comment-${id}"><div class="my-post__head"><a href="${link}">${escapeHtml(name)}</a><time>${escapeHtml(formatDate(comment.updated_at || comment.created_at))}</time></div><p class="my-post__content">${escapeHtml(comment.content)}</p><div class="my-post__actions"><a href="${link}">댓글 위치 보기</a><button type="button" data-post-edit-toggle>수정</button></div><form class="my-post__edit" data-post-edit-form data-demo-comment-edit="${escapeHtml(comment.id)}" hidden><label>댓글 내용<textarea name="comment" rows="4" maxlength="500" required>${escapeHtml(comment.content)}</textarea></label><button type="submit">수정 저장</button></form></article>`;
        }).join('');
        if (empty) empty.hidden = comments.length > 0;
        if (count) count.textContent = String(comments.length);
    };

    const bindDemoForms = () => {
        root.querySelectorAll('[data-demo-review-edit]').forEach((form) => {
            form.addEventListener('submit', (event) => {
                event.preventDefault();
                const data = new FormData(form);
                const content = String(data.get('review') || '').trim();
                if (!content) return;
                const id = form.dataset.demoReviewEdit;
                const items = read(reviewKey).map((item) => String(item.id) === id ? { ...item, content, rating: Number(data.get('rating') || item.rating), updated_at: new Date().toISOString() } : item);
                write(reviewKey, items);
                renderAll();
            });
        });
        root.querySelectorAll('[data-demo-qna-edit]').forEach((form) => {
            form.addEventListener('submit', (event) => {
                event.preventDefault();
                const data = new FormData(form);
                const content = String(data.get('qna') || '').trim();
                if (!content) return;
                const id = form.dataset.demoQnaEdit;
                const items = read(qnaKey).map((item) => String(item.id) === id ? { ...item, content, is_secret: data.get('is_secret') === '1', updated_at: new Date().toISOString() } : item);
                write(qnaKey, items);
                renderAll();
            });
        });
        root.querySelectorAll('[data-demo-comment-edit]').forEach((form) => {
            form.addEventListener('submit', (event) => {
                event.preventDefault();
                const data = new FormData(form);
                const content = String(data.get('comment') || '').trim();
                if (!content || content.length > 500) return;
                const id = form.dataset.demoCommentEdit;
                const items = read(commentKey).map((item) => String(item.id) === id ? { ...item, content, updated_at: new Date().toISOString() } : item);
                write(commentKey, items);
                renderAll();
            });
        });
    };

    function renderAll() {
        renderReviews();
        renderComments();
        renderQna();
        bindEditToggles();
        bindDemoForms();
    }

    renderAll();
}());

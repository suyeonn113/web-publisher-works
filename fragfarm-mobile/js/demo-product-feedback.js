(function () {
    const REVIEW_KEY = 'fragfarm_demo_reviews';
    const COMMENT_KEY = 'fragfarm_demo_review_comments';
    const QNA_KEY = 'fragfarm_demo_product_qna';
    const SESSION_KEY = 'fragfarm_demo_session';
    const MASTER_ID = 'fragfarm';
    const { escapeHtml, readStorage, readStorageArray: read, writeStorage: write } = window.FragfarmUtils;
    const readSession = () => readStorage(SESSION_KEY, null);
    const session = readSession();
    const isMasterLoggedIn = session?.user_id === MASTER_ID;
    const reviewForm = document.querySelector('[data-demo-product-feedback]');
    const qnaForm = document.querySelector('[data-demo-product-qna]');
    const productId = reviewForm?.elements.namedItem('product_id')?.value || qnaForm?.elements.namedItem('product_id')?.value;
    if (!productId) return;

    const requireLogin = () => {
        if (readSession()?.user_id === MASTER_ID) return true;
        window.localStorage.setItem('fragfarm_demo_after_login', window.location.href);
        window.location.href = `${window.FRAGFARM_BASE_URL || ''}/pages/login.php`;
        return false;
    };

    const syncAuthoringState = () => {
        const reviewTextarea = reviewForm?.querySelector('textarea[name="review"]');
        const reviewRatings = reviewForm?.querySelectorAll('input[name="rating"]') || [];
        const reviewToggle = reviewForm?.querySelector('.review-write__submit');
        const qnaTextarea = qnaForm?.querySelector('textarea[name="qna"]');
        const qnaSubmit = qnaForm?.querySelector('button[type="submit"]');
        const commentForms = document.querySelectorAll('[data-demo-review-comment]');

        if (reviewTextarea) {
            reviewTextarea.readOnly = !isMasterLoggedIn;
            reviewTextarea.toggleAttribute('data-login-required', !isMasterLoggedIn);
            reviewTextarea.placeholder = isMasterLoggedIn ? '후기를 남겨주세요.' : '로그인 후 이용해주세요.';
        }

        reviewRatings.forEach((input) => {
            input.disabled = !isMasterLoggedIn;
        });

        if (reviewToggle) {
            reviewToggle.toggleAttribute('data-review-write-toggle', isMasterLoggedIn);
            reviewToggle.toggleAttribute('data-login-required', !isMasterLoggedIn);
        }

        if (qnaTextarea) {
            qnaTextarea.readOnly = !isMasterLoggedIn;
            qnaTextarea.toggleAttribute('data-login-required', !isMasterLoggedIn);
            qnaTextarea.placeholder = isMasterLoggedIn ? '상품 문의를 남겨주세요.' : '로그인 후 이용해주세요.';
        }

        qnaSubmit?.toggleAttribute('data-login-required', !isMasterLoggedIn);

        commentForms.forEach((form) => {
            const textarea = form.querySelector('textarea[name="comment"]');
            const submit = form.querySelector('button[type="submit"]');
            if (textarea) {
                textarea.readOnly = !isMasterLoggedIn;
                textarea.toggleAttribute('data-login-required', !isMasterLoggedIn);
                textarea.placeholder = isMasterLoggedIn ? '댓글을 남겨주세요.' : '로그인 후 이용해주세요.';
            }
            submit?.toggleAttribute('data-login-required', !isMasterLoggedIn);
        });
    };

    syncAuthoringState();

    const renderReviews = () => {
        const list = document.querySelector('.review-list');
        if (!list) return;
        list.querySelectorAll('[data-demo-review]').forEach((item) => item.remove());
        const reviews = read(REVIEW_KEY).filter((item) => item.product_id === productId);
        [...reviews].reverse().forEach((review) => {
            const item = document.createElement('details');
            const reviewKey = `demo-${String(review.id).replace(/[^a-zA-Z0-9_-]/g, '')}`;
            item.className = 'review-item';
            item.dataset.demoReview = review.id;
            item.id = `review-demo-${String(review.id).replace(/[^a-zA-Z0-9_-]/g, '')}`;
            item.innerHTML = `<summary class="review-item__summary"><span class="review-stars" aria-label="${review.rating}점">${Array.from({ length: 5 }, (_, index) => `<span class="${index < review.rating ? 'is-filled' : ''}" aria-hidden="true"></span>`).join('')}</span><span class="review-item__meta"><b>마**</b><time>${new Date(review.created_at).toLocaleString('ko-KR')}</time></span><span class="review-item__text review-item__text--preview">${escapeHtml(review.content)}</span><span class="review-item__text review-item__text--full">${escapeHtml(review.content)}</span></summary><div class="review-item__body">${isMasterLoggedIn ? `<button type="button" class="feedback-demo-delete" data-demo-review-delete="${review.id}">내 리뷰 삭제</button>` : ''}<div class="review-comments" aria-label="리뷰 댓글" data-review-comments="${reviewKey}"><h3 data-review-comment-count data-base-count="0">COMMENTS (0)</h3><div data-review-comment-list></div><form class="review-comment-form" action="#" method="post" data-demo-review-comment><input type="hidden" name="product_id" value="${escapeHtml(productId)}"><input type="hidden" name="review_key" value="${reviewKey}"><textarea name="comment" rows="2" maxlength="500" placeholder="댓글을 남겨주세요."></textarea><button type="submit">등록</button></form></div></div>`;
            list.prepend(item);
        });
        const score = document.querySelector('[data-review-score]');
        if (score) {
            const baseCount = Number(score.dataset.baseCount || 0);
            const baseSum = Number(score.dataset.baseSum || 0);
            const totalCount = baseCount + reviews.length;
            const totalSum = baseSum + reviews.reduce((sum, review) => sum + Number(review.rating || 0), 0);
            const average = totalCount ? (totalSum / totalCount).toFixed(1) : '0.0';
            score.querySelector('strong').textContent = `${average} / 5`;
            score.querySelector('span').textContent = `(${totalCount}개의 후기)`;

            const summary = document.querySelector('[data-product-review-summary]');
            if (summary) {
                summary.querySelector('[data-product-review-average]').textContent = average;
                summary.querySelector('[data-product-review-count]').textContent = `(${totalCount}개의 후기)`;
                summary.setAttribute('aria-label', `평점 ${average}점, 후기 ${totalCount}개`);
            }
        }
        list.querySelectorAll('[data-demo-review-delete]').forEach((button) => button.addEventListener('click', () => {
            write(REVIEW_KEY, read(REVIEW_KEY).filter((item) => item.id !== button.dataset.demoReviewDelete));
            write(COMMENT_KEY, read(COMMENT_KEY).filter((item) => item.review_key !== `demo-${button.dataset.demoReviewDelete}`));
            renderReviews();
        }));
        syncAuthoringState();
        renderComments();
        document.dispatchEvent(new CustomEvent('product-reviews:updated'));
    };

    const renderComments = () => {
        const comments = read(COMMENT_KEY).filter((item) => item.product_id === productId);
        document.querySelectorAll('[data-review-comments]').forEach((section) => {
            const reviewKey = section.dataset.reviewComments;
            const list = section.querySelector('[data-review-comment-list]');
            const count = section.querySelector('[data-review-comment-count]');
            if (!list || !count) return;

            list.querySelectorAll('[data-demo-comment]').forEach((item) => item.remove());
            const reviewComments = comments.filter((item) => item.review_key === reviewKey);
            reviewComments.forEach((comment) => {
                list.insertAdjacentHTML('beforeend', `<div class="review-comment" data-demo-comment="${escapeHtml(comment.id)}"><strong>마**</strong>${isMasterLoggedIn ? `<button type="button" data-demo-comment-delete="${escapeHtml(comment.id)}" aria-label="내 댓글 삭제"><img src="${window.FRAGFARM_BASE_URL || ''}/assets/icons/close.svg" alt=""></button>` : ''}<p>${escapeHtml(comment.content)}</p></div>`);
            });
            const baseCount = Number(count.dataset.baseCount || 0);
            count.textContent = `COMMENTS (${baseCount + reviewComments.length})`;
        });

        document.querySelectorAll('[data-demo-comment-delete]').forEach((button) => button.addEventListener('click', () => {
            write(COMMENT_KEY, read(COMMENT_KEY).filter((item) => item.id !== button.dataset.demoCommentDelete));
            renderComments();
        }));
    };

    const renderQna = () => {
        const list = document.querySelector('[data-product-qna-list]');
        if (!list) return;
        list.querySelectorAll('[data-demo-qna]').forEach((item) => item.remove());
        read(QNA_KEY).filter((item) => item.product_id === productId).reverse().forEach((qna) => {
            const article = document.createElement('article');
            article.className = 'product-qna-item';
            article.dataset.demoQna = qna.id;
            article.id = `qna-demo-${String(qna.id).replace(/[^a-zA-Z0-9_-]/g, '')}`;
            article.innerHTML = `<div><strong>마**</strong><time>${new Date(qna.created_at).toLocaleDateString('ko-KR')}</time></div><p>${escapeHtml(qna.content)}</p>${qna.answer_content ? `<div class="product-qna-answer"><strong>답변</strong><p>${escapeHtml(qna.answer_content)}</p>${qna.answered_at ? `<time>${new Date(qna.answered_at).toLocaleDateString('ko-KR')}</time>` : ''}</div>` : ''}${isMasterLoggedIn ? `<button type="button" class="feedback-demo-delete" data-demo-qna-delete="${qna.id}">내 문의 삭제</button>` : ''}`;
            list.prepend(article);
        });
        list.querySelectorAll('[data-demo-qna-delete]').forEach((button) => button.addEventListener('click', () => {
            write(QNA_KEY, read(QNA_KEY).filter((item) => item.id !== button.dataset.demoQnaDelete));
            renderQna();
        }));
    };

    reviewForm?.addEventListener('submit', (event) => {
        event.preventDefault();
        if (!requireLogin()) return;
        const data = new FormData(reviewForm);
        const content = String(data.get('review') || '').trim();
        const rating = Number(data.get('rating') || 0);
        if (!content || rating < 1 || rating > 5) { window.alert('후기 내용과 별점을 입력해주세요.'); return; }
        const reviews = read(REVIEW_KEY);
        reviews.push({ id: String(Date.now()), product_id: productId, content, rating, created_at: new Date().toISOString() });
        write(REVIEW_KEY, reviews);
        reviewForm.reset();
        renderReviews();
    });

    qnaForm?.addEventListener('submit', (event) => {
        event.preventDefault();
        if (!requireLogin()) return;
        const data = new FormData(qnaForm);
        const content = String(data.get('qna') || '').trim();
        if (!content) { window.alert('문의 내용을 입력해주세요.'); return; }
        const items = read(QNA_KEY);
        items.push({ id: String(Date.now()), product_id: productId, content, is_secret: data.get('is_secret') === '1', created_at: new Date().toISOString() });
        write(QNA_KEY, items);
        qnaForm.reset();
        renderQna();
    });

    document.addEventListener('submit', (event) => {
        const form = event.target.closest('[data-demo-review-comment]');
        if (!form) return;
        event.preventDefault();
        if (!requireLogin()) return;

        const data = new FormData(form);
        const content = String(data.get('comment') || '').trim();
        const reviewKey = String(data.get('review_key') || '');
        if (!content || content.length > 500) {
            window.alert('댓글 내용을 입력해주세요.');
            return;
        }

        const comments = read(COMMENT_KEY);
        comments.push({
            id: String(Date.now()),
            product_id: productId,
            review_key: reviewKey,
            content,
            created_at: new Date().toISOString(),
        });
        write(COMMENT_KEY, comments);
        form.reset();
        renderComments();
    });

    renderReviews();
    renderQna();
}());

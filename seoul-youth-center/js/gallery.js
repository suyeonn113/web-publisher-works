/**
 * =========================================
 * Gallery Section
 * - 활동사진 데이터 렌더링
 * - < 480 : 2x2 grid / 버튼 숨김 / 스와이프 제거
 * - >= 480 : 가로 슬라이더 / 버튼 1칸 이동 / 스와이프 가능
 * - 나중에 DB/API 응답으로 그대로 치환 가능
 * =========================================
 */

document.addEventListener('DOMContentLoaded', () => {
    const gallerySection = document.querySelector('.gallery');
    if (!gallerySection) return;

    const gallerySlider = gallerySection.querySelector('.gallery__slider');
    const galleryTrack = gallerySection.querySelector('.gallery__track');
    const prevButton = gallerySection.querySelector('.gallery__prev');
    const nextButton = gallerySection.querySelector('.gallery__next');

    if (!gallerySlider || !galleryTrack || !prevButton || !nextButton) return;

    const BREAKPOINT_MOBILE = 480;
    const BREAKPOINT_TABLET = 768;
    const DRAG_THRESHOLD = 50;
    const AUTO_PLAY_DELAY = 4500;

    let resizeTimer = null;
    let autoPlayTimer = null;
    let currentIndex = 0;
    let positions = [];
    let maxTranslate = 0;

    let startX = 0;
    let isDragging = false;
    let renderedItemsPerPanel = null;

    /**
     * -----------------------------------------
     * 1) 임시 데이터
     * - 나중에 DB/API 붙일 때 이 배열만 교체
     * -----------------------------------------
     */

    const activityPhotos = [
        ['participation', 5, '참여활동', '동아리 활동', 'http://www.youthc.or.kr/upload/company/comp2026020311422.jpg'],
        ['participation', 65, '참여활동', '자치단, 동아리 연합활동', 'http://www.youthc.or.kr/upload/company/comp20250416145854.jpg'],
        ['participation', 32, '참여활동', '청소년운영위원회 청춘', 'http://www.youthc.or.kr/upload/company/comp20250418145337.jpg'],
        ['participation', 104, '참여활동', '청소년지도사 실습', 'http://www.youthc.or.kr/upload/company/comp2025041815150.jpg'],
        ['participation', 130, '참여활동', '서울 유스 캠퍼스', 'http://www.youthc.or.kr/upload/company/comp20260203152651.jpg'],
        ['participation', 9, '참여활동', '캠프기획단 온기', 'http://www.youthc.or.kr/upload/company/comp20250418143725.jpg'],
        ['participation', 111, '참여활동', '청소년특봉대', 'http://www.youthc.or.kr/upload/company/comp20260203142841.jpg'],
        ['participation', 23, '참여활동', '도레미에코프로젝트', 'http://www.youthc.or.kr/upload/company/comp20260203141122.jpg'],
        ['participation', 53, '참여활동', '보이는 상담소', 'http://www.youthc.or.kr/upload/company/comp20260203141352.jpg'],
        ['training', 129, '수련활동', '서울청소년동행캠프', 'http://www.youthc.or.kr/upload/company/comp20260203105744.jpg'],
        ['training', 71, '수련활동', '서울-지방 청소년 역사문화교류사업', 'http://www.youthc.or.kr/upload/company/comp20250418151240.jpg'],
        ['training', 116, '수련활동', '온(ON)밤', 'http://www.youthc.or.kr/upload/company/comp20250418151341.jpg'],
        ['training', 67, '수련활동', '꿀밤(Honey Bomb)', 'http://www.youthc.or.kr/upload/company/comp20250418151135.jpg'],
        ['training', 70, '수련활동', '스쿨 오브 캠핑', 'http://www.youthc.or.kr/upload/company/comp20260203112645.jpg'],
        ['training', 54, '수련활동', '여름방학 공정무역학교', 'http://www.youthc.or.kr/upload/company/comp20260203112234.jpg'],
        ['community', 90, '지역연계활동', '청소년코디네이터 연계사업', 'http://www.youthc.or.kr/upload/company/comp20260203144853.jpg']
    ].map(([category, id, label, title, imageSrc]) => ({
        id: `${category}-${id}`,
        title,
        label,
        imageSrc,
        imageAlt: `${title} 프로그램 활동 사진`,
    }));

    /**
     * -----------------------------------------
     * 2) 유틸
     * -----------------------------------------
     */

    function buildAssetUrl(path) {
        if (/^https?:\/\//i.test(path)) return path;

        const baseUrl = window.APP_BASE_URL || '';
        const normalizedBase = baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl;
        const normalizedPath = path.startsWith('/') ? path.slice(1) : path;

        return `${normalizedBase}/${normalizedPath}`;
    }
    
    function isMobileGridMode() {
        return window.innerWidth < BREAKPOINT_MOBILE;
    }

    function getItemsPerPanel() {
        return window.innerWidth >= BREAKPOINT_MOBILE
            && window.innerWidth < BREAKPOINT_TABLET
            ? 3
            : 4;
    }

    function clamp(value, min, max) {
        return Math.min(Math.max(value, min), max);
    }

    function getGalleryItems() {
        return Array.from(galleryTrack.querySelectorAll('.gallery__panel')).filter((item) => !item.hidden);
    }

    function setButtonState(button, isAvailable) {
        if (!button) return;

        button.dataset.available = String(isAvailable);
        button.disabled = !isAvailable;
    }

    function resetButtons() {
        setButtonState(prevButton, false);
        setButtonState(nextButton, false);
    }

    function applyTranslate(value) {
        galleryTrack.style.transform = `translate3d(${-value}px, 0, 0)`;
    }

    function getLastIndex() {
        return Math.max(positions.length - 1, 0);
    }

    /**
     * -----------------------------------------
     * 3) 카드 마크업 생성
     * -----------------------------------------
     */
    function createGalleryItem(photo) {
        const item = document.createElement('li');
        item.className = 'gallery__item';

        item.innerHTML = `
            <div class="gallery__link">
                <div class="gallery__image">
                    <img src="${buildAssetUrl(photo.imageSrc)}" alt="${photo.imageAlt}" referrerpolicy="no-referrer">
                </div>
                <div class="gallery__content">
                    <p class="gallery__title">${photo.title}
                        <span class="gallery__label">${photo.label}</span>
                    </p>
                </div>
            </div>
        `;

        return item;
    }

    /**
     * -----------------------------------------
     * 4) 리스트 렌더링
     * -----------------------------------------
     */
    function renderGallery(items) {
        galleryTrack.innerHTML = '';

        if (!items.length) {
            galleryTrack.innerHTML = '<li class="gallery__empty">등록된 활동사진이 없습니다.</li>';
            return;
        }

        const fragment = document.createDocumentFragment();
        const itemsPerPanel = getItemsPerPanel();

        renderedItemsPerPanel = itemsPerPanel;

        for (let index = 0; index < items.length; index += itemsPerPanel) {
            const panel = document.createElement('li');
            const collage = document.createElement('ul');

            panel.className = 'gallery__panel';
            collage.className = 'gallery__collage';

            items.slice(index, index + itemsPerPanel).forEach((photo) => {
                collage.appendChild(createGalleryItem(photo));
            });

            panel.appendChild(collage);
            fragment.appendChild(panel);
        }

        galleryTrack.appendChild(fragment);
    }

    /**
     * -----------------------------------------
     * 5) 슬라이더 위치값 생성
     * - 프로그램 슬라이더와 같은 기준
     * -----------------------------------------
     */
    function buildPositions() {
        const items = getGalleryItems();

        maxTranslate = Math.max(0, galleryTrack.scrollWidth - gallerySlider.clientWidth);

        if (items.length === 0 || maxTranslate <= 1) {
            positions = [0];
            return;
        }

        const result = [];

        items.forEach((item) => {
            const clamped = clamp(item.offsetLeft, 0, maxTranslate);

            if (!result.some((savedPos) => Math.abs(savedPos - clamped) < 1)) {
                result.push(clamped);
            }
        });

        if (result.length === 0) {
            result.push(0);
        }

        if (Math.abs(result[result.length - 1] - maxTranslate) > 1) {
            result.push(maxTranslate);
        }

        positions = result;
    }

    function updateButtons() {
        if (isMobileGridMode()) {
            prevButton.hidden = true;
            nextButton.hidden = true;
            resetButtons();
            return;
        }

        prevButton.hidden = false;
        nextButton.hidden = false;

        const hasMultiplePanels = positions.length > 1;

        setButtonState(prevButton, hasMultiplePanels);
        setButtonState(nextButton, hasMultiplePanels);
    }

    function goTo(index) {
        currentIndex = clamp(index, 0, getLastIndex());
        applyTranslate(positions[currentIndex] ?? 0);
        updateButtons();
    }

    function goNext() {
        if (isMobileGridMode()) return;
        if (positions.length <= 1) return;
        goTo(currentIndex >= getLastIndex() ? 0 : currentIndex + 1);
    }

    function goPrev() {
        if (isMobileGridMode()) return;
        if (positions.length <= 1) return;
        goTo(currentIndex <= 0 ? getLastIndex() : currentIndex - 1);
    }

    function stopAutoPlay() {
        window.clearInterval(autoPlayTimer);
        autoPlayTimer = null;
    }

    function startAutoPlay() {
        stopAutoPlay();

        if (
            isMobileGridMode() ||
            positions.length <= 1 ||
            window.matchMedia('(prefers-reduced-motion: reduce)').matches
        ) {
            return;
        }

        autoPlayTimer = window.setInterval(goNext, AUTO_PLAY_DELAY);
    }

    /**
     * -----------------------------------------
     * 6) 드래그
     * - 모바일 grid 모드에서는 비활성
     * -----------------------------------------
     */
    function handlePointerDown(event) {
        if (isMobileGridMode()) return;
        if (event.pointerType === 'mouse' && event.button !== 0) return;

        stopAutoPlay();
        startX = event.clientX;
        isDragging = true;
        galleryTrack.dataset.dragging = 'true';
    }

    function handlePointerUp(event) {
        if (!isDragging) return;

        isDragging = false;
        delete galleryTrack.dataset.dragging;

        const delta = event.clientX - startX;

        if (delta <= -DRAG_THRESHOLD) {
            goNext();
            startAutoPlay();
            return;
        }

        if (delta >= DRAG_THRESHOLD) {
            goPrev();
        }

        startAutoPlay();
    }

    function handlePointerCancel() {
        isDragging = false;
        delete galleryTrack.dataset.dragging;
        startAutoPlay();
    }

    /**
     * -----------------------------------------
     * 7) 모드 전환 / 리사이즈
     * -----------------------------------------
     */
    function syncGalleryState() {
        if (renderedItemsPerPanel !== getItemsPerPanel()) {
            renderGallery(activityPhotos);
            currentIndex = 0;
        }

        if (isMobileGridMode()) {
            currentIndex = 0;
            applyTranslate(0);
            updateButtons();
            return;
        }

        buildPositions();
        goTo(Math.min(currentIndex, getLastIndex()));
    }

    function handleResize() {
        window.clearTimeout(resizeTimer);

        resizeTimer = window.setTimeout(() => {
            syncGalleryState();
            startAutoPlay();
        }, 120);
    }

    /**
     * -----------------------------------------
     * 8) 초기 실행
     * -----------------------------------------
     */
    renderGallery(activityPhotos);
    syncGalleryState();
    startAutoPlay();

    /**
     * -----------------------------------------
     * 9) 이벤트 바인딩
     * -----------------------------------------
     */
    prevButton.addEventListener('click', () => {
        goPrev();
        startAutoPlay();
    });
    nextButton.addEventListener('click', () => {
        goNext();
        startAutoPlay();
    });

    gallerySlider.addEventListener('pointerdown', handlePointerDown);
    gallerySlider.addEventListener('pointerup', handlePointerUp);
    gallerySlider.addEventListener('pointercancel', handlePointerCancel);
    gallerySlider.addEventListener('pointerleave', handlePointerCancel);
    gallerySection.addEventListener('mouseenter', stopAutoPlay);
    gallerySection.addEventListener('mouseleave', startAutoPlay);
    gallerySection.addEventListener('focusin', stopAutoPlay);
    gallerySection.addEventListener('focusout', (event) => {
        if (!gallerySection.contains(event.relatedTarget)) {
            startAutoPlay();
        }
    });

    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            stopAutoPlay();
            return;
        }

        startAutoPlay();
    });

    window.addEventListener('resize', handleResize);
});

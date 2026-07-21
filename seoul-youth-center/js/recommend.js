document.addEventListener('DOMContentLoaded', () => {
    const explorer = document.querySelector('.program-explorer');
    if (!explorer) return;

    const form = explorer.querySelector('.recommend-filter');
    const tabs = [...explorer.querySelectorAll('[data-program-type]')];
    const grid = explorer.querySelector('.program-explorer__grid');
    const count = explorer.querySelector('.program-explorer__count');
    const status = explorer.querySelector('.program-explorer__status');
    const actions = explorer.querySelector('.program-explorer__actions');
    const loadMore = explorer.querySelector('.program-explorer__load-more');
    const allLink = explorer.querySelector('.program-explorer__all');
    const reset = explorer.querySelector('.program-explorer__reset');
    const description = explorer.querySelector('.program-explorer__description');
    const mobileSelects = [...(form?.querySelectorAll('.recommend-filter__mobile select') ?? [])];

    if (!form || !grid || !count || !status || !actions || !loadMore || !allLink || !reset) return;

    function getPageSize(type = 'youth') {
        if (type === 'education') {
            return window.matchMedia('(min-width: 768px)').matches ? 4 : 3;
        }

        if (window.matchMedia('(min-width: 1024px)').matches) return 4;
        if (window.matchMedia('(min-width: 768px)').matches) return 6;
        return 4;
    }

    let currentPageSize = getPageSize();

    const state = {
        type: 'youth',
        age: null,
        field: null,
        visible: currentPageSize,
        payload: null,
    };

    let requestController = null;

    const typeInfo = {
        youth: {
            label: '청소년 프로그램',
            htmlKey: 'youthHtml',
            countKey: 'youthCount',
            url: `${window.APP_BASE_URL || ''}/programs.php`,
            description: '연령과 관심 분야를 선택하면 모집 중인 프로그램만 바로 보여드려요.',
        },
        education: {
            label: '평생교육 프로그램',
            htmlKey: 'educationHtml',
            countKey: 'educationCount',
            url: `${window.APP_BASE_URL || ''}/lifelong-education-classes.php#class-guide-title`,
            description: '현재 모집 중인 평생교육 강좌와 주요 정보를 한눈에 확인해보세요.',
        },
    };

    function hasFilters() {
        return Boolean(state.age || state.field);
    }

    function readUrlState() {
        const params = new URLSearchParams(window.location.search);
        const requestedType = params.get('programType');

        state.type = typeInfo[requestedType] ? requestedType : 'youth';
        state.age = params.get('age') || null;
        state.field = params.get('field') || null;
    }

    function writeUrlState() {
        const params = new URLSearchParams(window.location.search);

        state.age ? params.set('age', state.age) : params.delete('age');
        state.field ? params.set('field', state.field) : params.delete('field');
        state.type === 'education' ? params.set('programType', state.type) : params.delete('programType');

        const query = params.toString();
        window.history.replaceState({}, '', `${window.location.pathname}${query ? `?${query}` : ''}`);
    }

    function applyControlState() {
        form.dataset.hasSelection = hasFilters() ? 'true' : 'false';
        explorer.dataset.programType = state.type;
        form.hidden = state.type === 'education';
        reset.hidden = state.type === 'education' || !hasFilters();
        if (description) description.textContent = typeInfo[state.type].description;

        form.querySelectorAll('.button--filter').forEach((button) => {
            const selected = state[button.name] === button.value;
            button.setAttribute('aria-pressed', selected ? 'true' : 'false');
        });

        mobileSelects.forEach((select) => {
            select.value = state[select.name] || '';
        });

        tabs.forEach((tab) => {
            tab.setAttribute('aria-selected', tab.dataset.programType === state.type ? 'true' : 'false');
        });
    }

    function render() {
        if (!state.payload) return;

        const info = typeInfo[state.type];
        const total = Number(state.payload[info.countKey]) || 0;
        const html = typeof state.payload[info.htmlKey] === 'string' ? state.payload[info.htmlKey] : '';

        grid.innerHTML = html;
        const cards = [...grid.querySelectorAll('.card')];
        const isEducation = state.type === 'education';
        cards.forEach((card, index) => {
            card.hidden = !isEducation && index >= state.visible;
        });

        const visibleCount = isEducation ? total : Math.min(state.visible, total);
        const filterCopy = state.type === 'youth' && hasFilters() ? '선택한 조건에 맞는 ' : '현재 모집 중인 ';
        count.textContent = `${filterCopy}${info.label} ${total}개`;
        status.hidden = total > 0;
        status.textContent = total > 0 ? '' : '선택한 조건에 맞는 모집 중 프로그램이 없습니다.';

        actions.hidden = total === 0 || isEducation;
        if (isEducation) {
            loadMore.hidden = true;
            allLink.hidden = true;
        } else {
            const pageLimit = currentPageSize * 2;
            loadMore.hidden = total <= visibleCount || state.visible >= pageLimit;
            loadMore.textContent = '펼쳐서 더보기';
            allLink.hidden = state.visible < Math.min(total, pageLimit);
            allLink.href = info.url;
            allLink.textContent = `${info.label} 전체 보기`;
        }

        explorer.querySelector('.program-explorer__result').setAttribute('aria-busy', 'false');
    }

    async function fetchPrograms() {
        requestController?.abort();
        requestController = new AbortController();

        const params = new URLSearchParams();
        if (state.age) params.set('age', state.age);
        if (state.field) params.set('field', state.field);

        const base = window.APP_BASE_URL || '';
        const url = `${base}/api/recommend-programs.php${params.toString() ? `?${params}` : ''}`;

        explorer.querySelector('.program-explorer__result').setAttribute('aria-busy', 'true');
        status.hidden = false;
        status.textContent = '프로그램을 불러오는 중입니다.';
        actions.hidden = true;

        try {
            const response = await fetch(url, {
                headers: { Accept: 'application/json', 'X-Requested-With': 'XMLHttpRequest' },
                signal: requestController.signal,
            });
            if (!response.ok) throw new Error(`HTTP ${response.status}`);

            state.payload = await response.json();
            render();
        } catch (error) {
            if (error.name === 'AbortError') return;
            console.error('프로그램을 불러오지 못했습니다.', error);
            count.textContent = '프로그램을 불러오지 못했습니다.';
            status.hidden = false;
            status.textContent = '잠시 후 다시 시도해주세요.';
            grid.innerHTML = '';
        } finally {
            explorer.querySelector('.program-explorer__result').setAttribute('aria-busy', 'false');
        }
    }

    form.addEventListener('submit', (event) => event.preventDefault());
    form.addEventListener('click', (event) => {
        const button = event.target.closest('.button--filter');
        if (!button || !form.contains(button)) return;

        state[button.name] = state[button.name] === button.value ? null : button.value;
        state.visible = currentPageSize;
        applyControlState();
        writeUrlState();
        fetchPrograms();
    });

    form.addEventListener('change', (event) => {
        const select = event.target.closest('.recommend-filter__mobile select');
        if (!select || !form.contains(select)) return;

        state[select.name] = select.value || null;
        state.visible = currentPageSize;
        applyControlState();
        writeUrlState();
        fetchPrograms();
    });

    tabs.forEach((tab) => {
        tab.addEventListener('click', () => {
            state.type = tab.dataset.programType;
            currentPageSize = getPageSize(state.type);
            state.visible = currentPageSize;
            applyControlState();
            writeUrlState();
            render();
        });
    });

    loadMore.addEventListener('click', () => {
        state.visible = Math.min(currentPageSize * 2, state.visible + currentPageSize);
        render();
    });

    reset.addEventListener('click', () => {
        state.age = null;
        state.field = null;
        state.visible = currentPageSize;
        applyControlState();
        writeUrlState();
        fetchPrograms();
    });

    window.addEventListener('resize', () => {
        const nextPageSize = getPageSize(state.type);
        if (nextPageSize === currentPageSize) return;

        currentPageSize = nextPageSize;
        state.visible = currentPageSize;
        render();
    });

    readUrlState();
    currentPageSize = getPageSize(state.type);
    state.visible = currentPageSize;
    applyControlState();
    fetchPrograms();
});

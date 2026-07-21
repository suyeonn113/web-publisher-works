const classFilter = document.querySelector('[data-class-filter]');
const classCards = Array.from(document.querySelectorAll('[data-class-card]'));
const classEmpty = document.querySelector('[data-class-empty]');

if (classFilter && classCards.length) {
    const state = { day: 'all', category: 'all' };
    const result = document.querySelector('.class-filter__result');

    const updateClasses = () => {
        let visibleCount = 0;

        classCards.forEach((card) => {
            const days = card.dataset.days.split(',');
            const matchesDay = state.day === 'all' || days.includes(state.day);
            const matchesCategory = state.category === 'all' || card.dataset.category === state.category;
            const isVisible = matchesDay && matchesCategory;

            card.hidden = !isVisible;
            if (isVisible) visibleCount += 1;
        });

        if (result) result.innerHTML = `검색 결과 <strong>${visibleCount}</strong>개 강좌`;
        classEmpty.hidden = visibleCount !== 0;
    };

    classFilter.addEventListener('click', (event) => {
        const button = event.target.closest('button[data-filter-type]');
        if (!button) return;

        const type = button.dataset.filterType;
        state[type] = button.dataset.filterValue;

        classFilter.querySelectorAll(`button[data-filter-type="${type}"]`).forEach((filterButton) => {
            filterButton.setAttribute('aria-pressed', String(filterButton === button));
        });

        updateClasses();
    });
}

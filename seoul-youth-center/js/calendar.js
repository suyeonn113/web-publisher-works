/* ========================================
 * Calendar Demo
 * - 기본 HTML table 구조
 * - 일정이 있는 날짜만 button으로 제공
 * - 선택 날짜 일정 목록 렌더
 * ======================================== */

document.addEventListener('DOMContentLoaded', () => {
    const calendarRoot = document.querySelector('.schedule-calendar');
    const calendarBody = document.querySelector('#schedule-calendar-body');
    const monthText = document.querySelector('#calendar-month');
    const yearText = document.querySelector('#calendar-year');
    const prevButton = document.querySelector('.schedule-calendar__nav--prev');
    const nextButton = document.querySelector('.schedule-calendar__nav--next');
    const headingButton = document.querySelector('.schedule-calendar__heading');
    const todayList = document.querySelector('#schedule-list-today');
    const todayGroup = document.querySelector('.schedule-agenda__group.today');

    if (
        !calendarRoot ||
        !calendarBody ||
        !monthText ||
        !yearText ||
        !prevButton ||
        !nextButton ||
        !headingButton ||
        !todayList ||
        !todayGroup
    ) {
        return;
    }

    const DEMO_TODAY = '2026-03-23';
    const baseUrl = window.APP_BASE_URL || '';
    const mockEvents = [
        { id: 1, type: 'program', title: '미래직업 오픈랩', date: '2026-03-22', href: '/program-detail.php?id=8' },
        { id: 2, type: 'center-event', title: '센터 운영 회의', date: '2026-03-22' },
        { id: 3, type: 'program', title: '드로잉 앤 메이킹 클래스', date: '2026-03-23', href: '/program-detail.php?id=6' },
        { id: 4, type: 'center-event', title: '상반기 정직원 채용 면접', date: '2026-03-23', href: '/notices.php?notice=14' },
        { id: 5, type: 'closed-day', title: '정기 휴관일 안내', date: '2026-03-23', href: '/notices.php?notice=13' },
        { id: 6, type: 'center-event', title: '센터 일정 점검', date: '2026-03-24' },
        { id: 7, type: 'program', title: '로컬체인지 메이커', date: '2026-03-24', href: '/program-detail.php?id=1' },
        { id: 8, type: 'program', title: '마음 잇기 프로젝트', date: '2026-03-10', href: '/program-detail.php?id=7' },
        { id: 9, type: 'center-event', title: '우수 기관 시상식', date: '2026-03-14' },
        { id: 10, type: 'closed-day', title: '시설 점검 휴관', date: '2026-03-28', href: '/notices.php' },
        { id: 11, type: 'program', title: '아트 인사이트 투어', date: '2026-04-02', href: '/program-detail.php?id=9' },
        { id: 12, type: 'program', title: '미래탐색 커리어 브릿지', date: '2026-04-07', href: '/program-detail.php?id=14' }
    ];

    const demoTodayDate = parseLocalDate(DEMO_TODAY);
    let currentViewDate = new Date(
        demoTodayDate.getFullYear(),
        demoTodayDate.getMonth(),
        1
    );
    let selectedDateStr = DEMO_TODAY;

    function parseLocalDate(dateString) {
        const [year, month, day] = dateString.split('-').map(Number);
        return new Date(year, month - 1, day);
    }

    function formatDate(date) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    function getEventsByDate(dateString) {
        return mockEvents.filter((event) => event.date === dateString);
    }

    function getTypeLabel(type) {
        if (type === 'program') return '프로그램';
        if (type === 'center-event') return '센터 일정';
        if (type === 'closed-day') return '휴관일';
        return '일정';
    }

    function getDateLabel(date, eventCount = 0) {
        const dateLabel = `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`;
        return eventCount > 0 ? `${dateLabel}, 일정 ${eventCount}개` : dateLabel;
    }

    function focusDateButton(dateString) {
        const targetButton = calendarBody.querySelector(
            `.schedule-calendar__date[data-date="${dateString}"]`
        );
        targetButton?.focus();
    }

    function renderAgendaList(listElement, events, showDetailLinks = false) {
        listElement.innerHTML = '';
        listElement.scrollTop = 0;

        if (!events.length) {
            listElement.innerHTML = `
                <li class="schedule-agenda__item schedule-agenda__item--empty">
                    일정이 없습니다.
                </li>
            `;
            return;
        }

        listElement.innerHTML = events.map((event) => {
            const detailLink = showDetailLinks && event.href
                ? `
                    <a class="schedule-agenda__link" href="${baseUrl}${event.href}"
                       aria-label="${event.title} 상세 페이지 바로가기">
                        바로가기
                    </a>
                `
                : '';

            return `
                <li class="schedule-agenda__item">
                    <span class="schedule-calendar__dot schedule-calendar__dot--${event.type}" aria-hidden="true"></span>
                    <span class="visually-hidden">${getTypeLabel(event.type)}</span>
                    <p class="schedule-agenda__text">${event.title}</p>
                    ${detailLink}
                </li>
            `;
        }).join('');
    }

    function renderAgenda() {
        const selectedEvents = getEventsByDate(selectedDateStr);
        renderAgendaList(todayList, selectedEvents, true);
        todayGroup.dataset.date = selectedDateStr;
        todayGroup.dataset.eventCount = String(selectedEvents.length);
        todayGroup.classList.toggle('is-scrollable', selectedEvents.length > 3);
    }

    function selectDate(dateString, { shouldFocus = true } = {}) {
        const selectedDate = parseLocalDate(dateString);
        selectedDateStr = dateString;
        currentViewDate = new Date(
            selectedDate.getFullYear(),
            selectedDate.getMonth(),
            1
        );
        renderCalendar();
        renderAgenda();
        if (shouldFocus) focusDateButton(dateString);
    }

    function createDateCell(cellDate, { isOutsideMonth = false } = {}) {
        const cellDateStr = formatDate(cellDate);
        const events = getEventsByDate(cellDateStr);
        const isSelected = cellDateStr === selectedDateStr;
        const isToday = cellDateStr === DEMO_TODAY;
        const cell = document.createElement('td');
        cell.className = 'schedule-calendar__cell';

        if (isOutsideMonth) cell.classList.add('is-outside-month');
        if (isToday) cell.classList.add('is-today');
        if (isSelected) cell.classList.add('is-selected');
        if (events.length > 0) cell.classList.add('has-event');

        const dateElement = document.createElement(events.length > 0 ? 'button' : 'span');
        dateElement.className = 'schedule-calendar__date';
        if (events.length > 0) {
            dateElement.type = 'button';
            dateElement.classList.add('is-interactive');
            dateElement.dataset.date = cellDateStr;
            dateElement.setAttribute('aria-label', getDateLabel(cellDate, events.length));
            dateElement.setAttribute('aria-pressed', isSelected ? 'true' : 'false');
            dateElement.addEventListener('click', () => selectDate(cellDateStr));
            dateElement.addEventListener('keydown', (event) => {
                if (event.key !== 'Enter' && event.key !== ' ' && event.key !== 'Spacebar') return;
                event.preventDefault();
                selectDate(cellDateStr);
            });
        }

        if (isOutsideMonth) dateElement.classList.add('is-outside-month');
        if (isToday) dateElement.classList.add('is-today');
        if (isSelected) dateElement.classList.add('is-selected');
        if (events.length > 0) dateElement.classList.add('has-event');

        const dotsMarkup = events.slice(0, 3).map((event) => (
            `<span class="schedule-calendar__dot schedule-calendar__dot--${event.type}"></span>`
        )).join('');

        dateElement.innerHTML = `
            <span class="schedule-calendar__date-number">${cellDate.getDate()}</span>
            <span class="schedule-calendar__dots" aria-hidden="true">${dotsMarkup}</span>
        `;
        cell.appendChild(dateElement);
        return cell;
    }

    function renderCalendar() {
        const year = currentViewDate.getFullYear();
        const month = currentViewDate.getMonth();
        monthText.textContent = `${month + 1}월`;
        yearText.textContent = `${year}`;
        headingButton.setAttribute(
            'aria-label',
            `${month + 1}월 ${year}, 데모 기준 오늘이 있는 달로 이동`
        );
        calendarBody.innerHTML = '';

        const firstDay = new Date(year, month, 1);
        const startDay = firstDay.getDay();
        const daysInCurrentMonth = new Date(year, month + 1, 0).getDate();
        const daysInPrevMonth = new Date(year, month, 0).getDate();

        for (let rowIndex = 0; rowIndex < 6; rowIndex += 1) {
            const row = document.createElement('tr');
            for (let columnIndex = 0; columnIndex < 7; columnIndex += 1) {
                const index = (rowIndex * 7) + columnIndex;
                let cellDate;
                let isOutsideMonth = false;

                if (index < startDay) {
                    const day = daysInPrevMonth - startDay + index + 1;
                    cellDate = new Date(year, month - 1, day);
                    isOutsideMonth = true;
                } else if (index >= startDay + daysInCurrentMonth) {
                    const day = index - (startDay + daysInCurrentMonth) + 1;
                    cellDate = new Date(year, month + 1, day);
                    isOutsideMonth = true;
                } else {
                    cellDate = new Date(year, month, index - startDay + 1);
                }

                row.appendChild(createDateCell(cellDate, { isOutsideMonth }));
            }
            calendarBody.appendChild(row);
        }
    }

    prevButton.addEventListener('click', () => {
        currentViewDate = new Date(
            currentViewDate.getFullYear(),
            currentViewDate.getMonth() - 1,
            1
        );
        renderCalendar();
    });

    nextButton.addEventListener('click', () => {
        currentViewDate = new Date(
            currentViewDate.getFullYear(),
            currentViewDate.getMonth() + 1,
            1
        );
        renderCalendar();
    });

    headingButton.addEventListener('click', () => {
        selectDate(DEMO_TODAY);
    });

    renderCalendar();
    renderAgenda();
});

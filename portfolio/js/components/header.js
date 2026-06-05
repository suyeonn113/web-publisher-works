import gsap from "https://cdn.jsdelivr.net/npm/gsap@3.12.5/+esm";
import ScrollTrigger from "https://cdn.jsdelivr.net/npm/gsap@3.12.5/ScrollTrigger/+esm";

gsap.registerPlugin(ScrollTrigger);

/* ========================================
   Header Component
======================================== */

function getPageType() {
  return document.body.dataset.page || "";
}

function createHeaderIcons() {
  if (!window.lucide) return;
  window.lucide.createIcons();
}

/* 헤더 DOM 주입 */
export function renderHeader() {
  const headerHTML = `
    <header class="site-header site-header--rail" aria-label="Primary navigation">
      <a class="site-header__brand" href="index.html" aria-label="Go to work index">
        <span class="site-header__brand-roof" aria-hidden="true"></span>
        <span class="site-header__brand-line site-header__brand-line--top" aria-hidden="true">
          <span class="site-header__brand-char">S</span>
          <span class="site-header__brand-char">U</span>
          <span class="site-header__brand-char">Y</span>
          <span class="site-header__brand-char">E</span>
          <span class="site-header__brand-key" aria-hidden="true"></span>
          <span class="site-header__brand-char">N</span>
          <span class="site-header__brand-char">'</span>
          <span class="site-header__brand-char">S</span>
        </span>
        <span class="site-header__brand-line site-header__brand-line--bottom" aria-hidden="true">
          <span class="site-header__brand-char">W</span>
          <span class="site-header__brand-char">O</span>
          <span class="site-header__brand-char">R</span>
          <span class="site-header__brand-char">K</span>
          <span class="site-header__brand-char">R</span>
          <span class="site-header__brand-char">O</span>
          <span class="site-header__brand-char">O</span>
          <span class="site-header__brand-char">M</span>
        </span>
      </a>
      <nav class="site-header__nav">
        <ul class="site-header__menu">
          <li>
            <button type="button"
                    class="site-header__theme-toggle"
                    aria-label="다크모드 전환"
                    aria-pressed="false">
              <svg class="site-header__theme-icon icon--light" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 510.67 516.92" fill="currentColor">
                <path d="m317.51,463.31c-111.58,0-202.01-90.56-201.8-202.19S207.82,59.58,317.74,59.71c90.56.1,167.15,59.86,192.58,142.09.07.22.39.13.34-.09C484.82,86.36,381.87.14,258.76,0,116.25-.16,0,115.95,0,258.46s115.72,258.46,258.46,258.46c113.97,0,210.71-73.78,245.07-176.18.07-.22-.24-.34-.33-.13-30.77,72.13-102.32,122.7-185.7,122.7Z"/>
              </svg>
              <svg class="site-header__theme-icon icon--dark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 510.07 491.05" fill="currentColor">
                <path d="m254.95,491.05c-13.69-39.5-8.52-85.39-12.13-127.25-4.51-19.85,4.93-20.33,22.14-18.97,6.16,39.33,3.6,106.9-10.01,146.21Z"/>
                <path d="m336.07,248.35c2.34,101.88-159.91,102.17-159.27,1.83-6.87-105.14,165.31-100.06,159.27-1.83Z"/>
                <path d="m26.06,158.72c43.67,12.43,108.87,21.1,138.6,49.09-6,5.74-3.14,27.43-14.43,21.74-17.61-7.53-35.26-14.98-52.73-22.82-10.79-8.16-103.31-37.63-71.43-48.01Z"/>
                <path d="m101.43,238.95c24.44,3.78,60.67-14.65,54.33,22.69-39.67,13.49-106.1-2.3-153.21-6.89-20.05-19.58,84.57-13.51,98.88-15.8Z"/>
                <path d="m486.17,158.31c23.13,17.27-104.24,56.97-121.92,69.19-10.93,5.36-8.89,4.49-12.08-5.73-25.45-34.34,108.52-51.8,134.01-63.46Z"/>
                <path d="m71.15,78.42c39.26,7.71,79.42,63.15,115.68,89.83-5.59,64.41-103.06-66.61-115.68-89.83Z"/>
                <path d="m437.19,76.32c-5.81,40.66-62.81,80.61-93.44,112.85-5.53,5.72-24.42-13.13-19.75-17.76,36.3-32.9,71.72-69.61,113.19-95.09Z"/>
                <path d="m241.9,136.79c6.45-42.64-3.21-99.06,16.34-136.79,14.56,20.83,6.07,56.05,10.91,81.68-2.15,20.5,8.88,53.18-1.4,67.98-11.53-2.92-30,6.32-25.85-12.87Z"/>
                <path  d="m385.9,238.67c15.04,3.13,147.95-4.04,120.43,15.69-47.17,3.94-108.87,18.16-150.41,8.25-2.5-28.06,6.97-23.69,29.98-23.94Z"/>
                <path d="m355.92,40.32c-7.75,26.21-35.17,161.12-68.77,113.27,11.79-18.58,49.62-138.73,68.77-113.27Z"/>
                <path d="m23.22,346.88c-17.07-15.72,110.76-57.14,130.12-69.79,57.81,31.12-105.28,60.88-130.12,69.79Z"/>
                <path d="m485.56,345.86c-46.33-10.43-91.69-27.71-136.52-43.55-10.42.69,2.91-29.96,8.75-25.78,19.27,12.89,145.76,53.29,127.76,69.33Z"/>
                <path d="m432.27,423.54c-38.82-3.79-78.38-66.39-112.02-94.45-3.3-4.66,14.55-21.84,19.08-16.27,31.9,35.54,68.59,69.86,92.94,110.72Z"/>
                <path d="m78.83,418.51c21.1-38.15,57.23-67.69,86.36-100.15,9.33-14.78,19.57.8,25.58,9.18-29.43,25.02-78.99,89.85-111.94,90.98Z"/>
                <path d="m157.04,34.56c16.38-21.61,54.58,94,65.86,111.38,7.65,12.03-8.19,10.31-14.85,15.33-27.08-25.03-38.74-87.14-51.01-126.7Z"/>
                <path d="m345.88,462.26c-12.59,23.17-49.94-96.27-59.67-111.47-7.76-12.69,10.15-9.78,17.2-14.62,24.82,27,30.43,87.15,42.47,126.09Z"/>
                <path d="m165.92,463.47c8.04-42.62,23.42-83.76,36.61-125.01.17-6.6,27.75,2.42,22.61,7.9-10.95,18.2-43.81,131.66-59.22,117.1Z"/>
              </svg>
              <span class="visually-hidden">다크모드 전환</span>
            </button>
          </li>
        </ul>
      </nav>
    </header>
  `;

  document.body.insertAdjacentHTML("afterbegin", headerHTML);
  createHeaderIcons();
}

/* 고정 상태 */
export function initHeaderFixed() {
  const header = document.querySelector(".site-header");
  if (!header) return;

  gsap.set(header, {
    yPercent: 0,
    autoAlpha: 1
  });
}

/* 초기 숨김 상태 */
export function initHeaderState() {
  const header = document.querySelector(".site-header");
  if (!header) return;

  gsap.set(header, {
    yPercent: -100,
    autoAlpha: 0
  });
}

/* 첫 진입 */
export function initHeaderEntrance() {
  const header = document.querySelector(".site-header");
  if (!header) return;

  return gsap.to(header, {
    yPercent: 0,
    autoAlpha: 1,
    duration: 0.6,
    ease: "power2.out"
  });
}

/* 스크롤 방향 반응 */
export function initHeaderScroll() {
  const header = document.querySelector(".site-header");
  if (!header) return;

  return;

  const pageType = getPageType();

  if (pageType === "home") return;
  // 페이지 추가

  let lastY = window.scrollY;
  let isHidden = false;

  ScrollTrigger.create({
    start: 0,
    end: "max",
    onUpdate: () => {
      const currentY = window.scrollY;
      const isScrollingDown = currentY > lastY;
      const hasMovedEnough = Math.abs(currentY - lastY) > 6;

      if (!hasMovedEnough) {
        return;
      }

      if (isScrollingDown && !isHidden) {
        isHidden = true;
        gsap.to(header, {
          yPercent: -100,
          duration: 0.3,
          ease: "power2.out",
          overwrite: "auto"
        });
      } else if (!isScrollingDown && isHidden) {
        isHidden = false;
        gsap.to(header, {
          yPercent: 0,
          duration: 0.3,
          ease: "power2.out",
          overwrite: "auto"
        });
      }

      lastY = currentY;
    }
  });
}

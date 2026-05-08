/* ========================================
   Main Controller
======================================== */

// Library
import gsap from "https://cdn.jsdelivr.net/npm/gsap@3.12.5/+esm";
import ScrollTrigger from "https://cdn.jsdelivr.net/npm/gsap@3.12.5/ScrollTrigger/+esm";

// Global
import { initLenis, initHomeScrollAssist, initScrollStability } from './global/scroll.js';
import { initCursor, destroyCursor } from './global/keyCursor.js';
import { initInteractiveTone } from './global/hoverTone.js';
import { initTheme } from "./global/theme.js";
import { initDoorTransition } from './global/doorTransition.js';

// Components
import {
  renderHeader,
  initHeaderFixed,
  initHeaderState,
  initHeaderEntrance,
  initHeaderScroll
} from "./components/header.js";
import { renderFooter } from "./components/footer.js";
import { loadWorkCardList } from './components/WorkCardList.js';
import { initWorkSlider } from './components/workSlider.js';
import { loadProjectDetail } from './components/ProjectDetail.js';

// Animations
import { initHeroText } from './animations/heroText.js';
import { initWorkEntrance } from "./animations/workEntrance.js";

gsap.registerPlugin(ScrollTrigger);

async function initPage() {
  const page = document.querySelector('#main')?.dataset.page || document.body?.dataset.page || '';
  document.body.dataset.page = page;

  renderFooter();

  if (window.lucide) {
    window.lucide.createIcons();
  }

  initTheme();

  if (page === 'home') {
    initHeaderState();
  } else {
    initHeaderFixed();
    initHeaderScroll();
  }

  if (page === 'home') {
    initCursor();
  } else {
    destroyCursor();
  }

  initInteractiveTone();

  if (page === 'home') {
    initHeroText(() => {
      initHeaderEntrance();
      initHeaderScroll();
    });

    initWorkSlider();
    initWorkEntrance();
    initHomeScrollAssist(window.lenis);
    ScrollTrigger.refresh();
  }

  if (page === 'work') {
    const isWorkListLoaded = await loadWorkCardList();

    if (isWorkListLoaded) {
      ScrollTrigger.refresh();
    }
  }

  if (page === 'project-detail') {
    const isProjectDetailLoaded = await loadProjectDetail();

    if (isProjectDetailLoaded) {
      ScrollTrigger.refresh();
    }
  }

}

document.addEventListener('DOMContentLoaded', async () => {
  const page = document.body?.dataset.page || '';

  const lenis = initLenis(page);
  window.lenis = lenis;

  initScrollStability(lenis);

  renderHeader();

  await initPage();

  initDoorTransition(initPage);
});

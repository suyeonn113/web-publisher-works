/* ========================================
   Main Controller
======================================== */

// Library
import gsap from "https://cdn.jsdelivr.net/npm/gsap@3.12.5/+esm";
import ScrollTrigger from "https://cdn.jsdelivr.net/npm/gsap@3.12.5/ScrollTrigger/+esm";

// Global
import { initLenis, initScrollStability } from './global/scroll.js';
import { initInteractiveTone } from './global/hoverTone.js';
import { initTheme } from "./global/theme.js";

// Components
import {
  renderHeader,
  initHeaderFixed,
  initHeaderScroll
} from "./components/header.js";
import { renderFooter } from "./components/footer.js";
import { loadWorkCardList } from './components/WorkCardList.js';
import { loadProjectDetail } from './components/ProjectDetail.js';

gsap.registerPlugin(ScrollTrigger);

async function initPage() {
  const page = document.querySelector('#main')?.dataset.page || document.body?.dataset.page || '';
  document.body.dataset.page = page;

  renderFooter();

  if (window.lucide) {
    window.lucide.createIcons();
  }

  initTheme();

  initHeaderFixed();
  initHeaderScroll();

  initInteractiveTone();

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
});

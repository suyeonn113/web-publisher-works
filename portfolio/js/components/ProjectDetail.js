/* ========================================
   Project Detail Component
======================================== */

import gsap from "https://cdn.jsdelivr.net/npm/gsap@3.12.5/+esm";
import ScrollTrigger from "https://cdn.jsdelivr.net/npm/gsap@3.12.5/ScrollTrigger/+esm";
import { initProjectSectionNavigator } from "./ProjectSectionNavigator.js";

gsap.registerPlugin(ScrollTrigger);

const SQUARE_RATIO_MIN = 0.85;
const SQUARE_RATIO_MAX = 1.15;
const GALLERY_SWIPE_MIN_DISTANCE = 48;
const GALLERY_SWIPE_MAX_VERTICAL_DRIFT = 64;

/* ========================================
   Device Frame Assets
======================================== */

const DEVICE_FRAMES = {
  mobile: {
    frame: "assets/images/devices/iPhone17_White.png"
  },

  tablet: {
    frame: "assets/images/devices/iPadPro11_Silver.png"
  },

  pc: {
    frame: "assets/images/devices/iMac.png"
    // frame: "assets/images/devices/MacbookPro15_Silver.png"
  }
};

const HERO_FRAME_ORDER = {
  mobile: ['mobile'],
  responsive: ['pc', 'tablet', 'mobile'],
  pc: ['pc']
};

const TOOL_ICON_BASE = '/portfolio/assets/icons/tech';

const TOOL_ICON_MAP = {
  css: { icon: 'css', color: 'var(--color-css)' },
  figma: { icon: 'figma', color: 'var(--color-figma)' },
  git: { icon: 'git', color: 'var(--color-git)' },
  github: { icon: 'github', color: 'var(--color-github)' },
  gsap: { icon: 'gsap', color: 'var(--color-gsap)' },
  html: { icon: 'html', color: 'var(--color-html)' },
  java: { icon: 'java', color: 'var(--color-java)' },
  javascript: { icon: 'javascript', color: 'var(--color-js)' },
  js: { icon: 'javascript', color: 'var(--color-js)' },
  jquery: { icon: 'jquery', color: 'var(--color-jquery)' },
  lenis: { icon: 'lenis', color: 'var(--color-lenis)' },
  mysql: { icon: 'mysql', color: 'var(--color-mysql)' },
  php: { icon: 'php', color: 'var(--color-php)' },
  react: { icon: 'react', color: 'var(--color-react)' },
  scss: { icon: 'scss', color: 'var(--color-scss)' },
  vscode: { icon: 'vscode', color: 'var(--color-vscode)' },
  'vs code': { icon: 'vscode', color: 'var(--color-vscode)' },
  'visual studio code': { icon: 'vscode', color: 'var(--color-vscode)' },
  filezilla: { icon: 'filezilla', preserveColor: true }
};

function getProjectSlug() {
  const params = new URLSearchParams(window.location.search);
  return params.get('slug') || 'fragfarm-mobile';
}

async function fetchProjectData() {
  const slug = getProjectSlug();
  const response = await fetch(`./data/projects/${slug}.json`);

  if (!response.ok) {
    throw new Error(`Failed to load project data: ${slug}`);
  }

  return response.json();
}

function formatDateRange(start, end) {
  if (!start && !end) return '';
  if (!start) return end;
  if (!end) return start;
  return `${start} - ${end}`;
}

function formatRole(role) {
  if (!Array.isArray(role)) return role || '';
  return role.join(', ');
}

function loadImageSource(src) {
  return new Promise((resolve) => {
    if (!src) {
      resolve(false);
      return;
    }

    const image = new Image();
    const finalize = () => resolve(true);

    image.addEventListener('load', finalize, { once: true });
    image.addEventListener('error', () => resolve(false), { once: true });
    image.src = src;

    if (image.complete) {
      resolve(true);
    }
  });
}

function classifyImageRatio(width, height) {
  if (!width || !height) return 'landscape';

  const ratio = width / height;
  if (ratio >= SQUARE_RATIO_MIN && ratio <= SQUARE_RATIO_MAX) return 'square';
  return ratio > 1 ? 'landscape' : 'portrait';
}

function loadImageMeta(src) {
  return new Promise((resolve) => {
    if (!src) {
      resolve({
        width: 0,
        height: 0,
        ratioType: 'landscape'
      });
      return;
    }

    const image = new Image();

    image.addEventListener('load', () => {
      resolve({
        width: image.naturalWidth || 0,
        height: image.naturalHeight || 0,
        ratioType: classifyImageRatio(image.naturalWidth || 0, image.naturalHeight || 0)
      });
    }, { once: true });

    image.addEventListener('error', () => {
      resolve({
        width: 0,
        height: 0,
        ratioType: 'landscape'
      });
    }, { once: true });

    image.src = src;
  });
}

function getFlowGalleryLayout(steps) {
  const safeSteps = Array.isArray(steps) ? steps : [];
  const count = safeSteps.length;
  const ratioTypes = new Set(safeSteps.map((step) => step.ratioType));
  const allPortraitLike = count > 0 && safeSteps.every((step) => step.ratioType !== 'landscape');
  const isMixedRatio = ratioTypes.size > 1;
  const hasOddCount = count % 2 === 1;
  const featuredIndex = Math.max(safeSteps.findIndex((step) => step.ratioType === 'landscape'), 0);

  if (count <= 1) {
    return {
      type: safeSteps[0]?.ratioType === 'portrait' ? 'single-portrait' : 'single',
      featuredIndex
    };
  }

  if (isMixedRatio || hasOddCount || count >= 5) {
    return {
      type: 'feature-stack',
      featuredIndex
    };
  }

  if (allPortraitLike) {
    return {
      type: 'portrait-grid',
      featuredIndex: 0
    };
  }

  return {
    type: 'landscape-grid',
    featuredIndex: 0
  };
}

async function decorateFlowSteps(steps = []) {
  const resolvedSteps = await Promise.all(
    steps.map(async (step, index) => {
      const meta = await loadImageMeta(step.image);
      return {
        ...step,
        ...meta,
        originalIndex: index
      };
    })
  );

  const layout = getFlowGalleryLayout(resolvedSteps);
  const orderedSteps = [...resolvedSteps];

  if (layout.type === 'feature-stack') {
    const [featuredStep] = orderedSteps.splice(layout.featuredIndex, 1);
    if (featuredStep) {
      orderedSteps.unshift(featuredStep);
    }
  }

  return {
    items: orderedSteps.map((step, index) => ({
      ...step,
      isFeatured: index === 0 && layout.type === 'feature-stack'
    })),
    totalCount: resolvedSteps.length,
    layout
  };
}

async function normalizeProject(project) {
  const rawFlows = Array.isArray(project.keyFlows) ? project.keyFlows : [];

  const flows = await Promise.all(
    rawFlows.map(async (item, index) => {
      const gallery = await decorateFlowSteps(item.steps || []);

      return {
        ...item,
        order: index + 1,
        gallery
      };
    })
  );

  return {
    ...project,
    flows,
    meta: {
      ...project.meta,
      dateRange: formatDateRange(project.meta?.dateStart, project.meta?.dateEnd),
      roleText: formatRole(project.meta?.role)
    }
  };
}

function setText(selector, value, scope = document) {
  const element = scope.querySelector(selector);
  if (!element) return;
  element.textContent = value || '';
}

function setLink(selector, href, scope = document) {
  const element = scope.querySelector(selector);
  if (!element) return;

  if (!href) {
    element.hidden = true;
    return;
  }

  element.href = href;
  element.hidden = false;
}

function renderHeroDescription(project, root) {
  const container = root.querySelector('[data-field="hero.description"]');
  const template = root.querySelector('#tpl-hero-desc');

  if (!container || !template) return;

  container.innerHTML = '';

  project.hero?.description?.forEach((line) => {
    const node = template.content.cloneNode(true);
    const text = node.querySelector('.project-hero__desc-line');
    if (text) text.textContent = line;
    container.appendChild(node);
  });
}

function renderHeroTags(project, root) {
  const container = root.querySelector('[data-field="hero.tags"]');
  const template = root.querySelector('#tpl-hero-tag');

  if (!container || !template) return;

  container.innerHTML = '';

  project.hero?.tags?.forEach((tag) => {
    const node = template.content.cloneNode(true);
    const item = node.querySelector('.project-hero__tag');
    if (item) item.textContent = `# ${tag}`;
    container.appendChild(node);
  });
}

function getHeroFrames(project) {
  const mode = project.meta?.projectMode;
  const visuals = project.hero?.visuals || {};
  const frames = HERO_FRAME_ORDER[mode] || Object.keys(visuals);

  return frames.filter((frame) => visuals[frame]);
}

function renderHeroVisuals(project, root) {
  const container = root.querySelector('[data-field="hero.visuals"]');
  const template = root.querySelector('#tpl-hero-visual');

  if (!container || !template) return;

  container.innerHTML = '';

  const frames = getHeroFrames(project);
  const visuals = project.hero?.visuals || {};
  const mode = project.meta?.projectMode || 'default';

  container.dataset.projectMode = mode;
  container.classList.toggle('project-hero__visual-grid--responsive', mode === 'responsive');

  frames.forEach((frame) => {
    const visual = visuals[frame];
    const device = DEVICE_FRAMES[frame];

    if (!visual || !device) return;

    const node = template.content.cloneNode(true);
    const figure = node.querySelector('figure');

    if (!figure) return;

    figure.classList.add('project-hero__device', `project-hero__device--${frame}`);
    figure.innerHTML = `
      <div class="project-hero__screen">
        <img
          class="project-hero__capture"
          src="${visual.screen || ''}"
          alt="${visual.alt || ''}"
        >
      </div>

      <img
        class="project-hero__frame"
        src="${device.frame}"
        alt=""
        aria-hidden="true"
      >
    `;

    container.appendChild(node);
  });
}

function renderSummary(project, root) {
  setText('[data-field="summary.overview"]', project.summary?.overview, root);
  setText('[data-field="summary.role"]', project.summary?.role, root);
  setText('[data-field="summary.tech"]', project.summary?.tech, root);
}

function splitTextToLines(element) {
  // 현재 텍스트를 단어 단위로 쪼갠 뒤
  // 렌더링 기준으로 같은 Y좌표인 단어들을 한 라인으로 묶음
  const text = element.textContent.trim();
  const words = text.split(/\s+/);

  // 단어를 span으로 감싸서 DOM에 삽입
  element.innerHTML = words
    .map((w) => `<span class="split-word" style="display:inline-block;white-space:pre">${w} </span>`)
    .join('');

  const wordEls = Array.from(element.querySelectorAll('.split-word'));
  const lines = [];
  let currentLine = [];
  let currentY = null;

  wordEls.forEach((wordEl) => {
    const y = Math.round(wordEl.getBoundingClientRect().top);

    if (currentY === null) {
      currentY = y;
    }

    if (y !== currentY) {
      lines.push(currentLine);
      currentLine = [];
      currentY = y;
    }

    currentLine.push(wordEl);
  });

  if (currentLine.length) lines.push(currentLine);

  // 라인별로 래퍼 div로 묶기 (마스크 역할)
  element.innerHTML = '';
  lines.forEach((lineWords) => {
    const mask = document.createElement('div');
    mask.className = 'split-line-mask';
    mask.style.cssText = 'overflow:hidden; display:block;';

    const inner = document.createElement('div');
    inner.className = 'split-line';
    inner.style.cssText = 'display:block;';

    lineWords.forEach((w) => inner.appendChild(w));
    mask.appendChild(inner);
    element.appendChild(mask);
  });

  return element.querySelectorAll('.split-line');
}

function resetSplitLineMarkup(element) {
  if (!element) return;

  const originalText = element.dataset.originalText || element.textContent || '';
  element.textContent = originalText;
}

function splitTextToLinesWithReset(element) {
  if (!element) return [];

  const originalText = (element.dataset.originalText || element.textContent || '').trim();
  element.dataset.originalText = originalText;

  if (!originalText) {
    element.textContent = '';
    return [];
  }

  const words = originalText.split(/\s+/);

  element.innerHTML = words
    .map((word) => `<span class="split-word" style="display:inline-block;white-space:pre">${word} </span>`)
    .join('');

  const wordElements = Array.from(element.querySelectorAll('.split-word'));
  const lines = [];
  let currentLine = [];
  let currentY = null;

  wordElements.forEach((wordElement) => {
    const nextY = Math.round(wordElement.getBoundingClientRect().top);

    if (currentY === null) {
      currentY = nextY;
    }

    if (nextY !== currentY) {
      lines.push(currentLine);
      currentLine = [];
      currentY = nextY;
    }

    currentLine.push(wordElement);
  });

  if (currentLine.length) {
    lines.push(currentLine);
  }

  element.innerHTML = '';

  lines.forEach((lineWords) => {
    const mask = document.createElement('div');
    mask.className = 'split-line-mask';

    const inner = document.createElement('div');
    inner.className = 'split-line';

    lineWords.forEach((wordElement) => inner.appendChild(wordElement));
    mask.appendChild(inner);
    element.appendChild(mask);
  });

  return Array.from(element.querySelectorAll('.split-line'));
}

function initSummaryScrollAnimation(root) {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) return;

  const section = root.querySelector('.project-summary');
  const blocks = gsap.utils.toArray('.project-summary__block', root);

  if (!section || !blocks.length) return;

  const blockLineMap = blocks.map((block) => {
    const label = block.querySelector('.project-summary__label');
    const text = block.querySelector('.project-summary__text');

    const labelLines = label ? Array.from(splitTextToLines(label)) : [];
    const textLines = text ? Array.from(splitTextToLines(text)) : [];

    return {
      block,
      labelLines,
      textLines,
      allLines: [...labelLines, ...textLines]
    };
  });

  gsap.set(blocks, { autoAlpha: 0 });
  gsap.set(blockLineMap.flatMap((item) => item.allLines), { yPercent: 110 });

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: section,
      start: 'top top',
      end: () => `+=${blocks.length * window.innerHeight}`,
      pin: true,
      scrub: 0.8,
      anticipatePin: 1,
      invalidateOnRefresh: true
    }
  });

  blockLineMap.forEach(({ block, labelLines, textLines, allLines }, index) => {
    const start = index;

    tl.set(block, { autoAlpha: 1 }, start);

    tl.to(labelLines, {
      yPercent: 0,
      duration: 0.32,
      ease: 'power3.out'
    }, start);

    tl.to(textLines, {
      yPercent: 0,
      duration: 0.52,
      ease: 'power3.out',
      stagger: 0.055
    }, start + 0.18);

    if (index < blockLineMap.length - 1) {
      tl.to(textLines, {
        yPercent: -110,
        duration: 0.34,
        ease: 'power2.in',
        stagger: {
          each: 0.035,
          from: 'end'
        }
      }, start + 0.72);

      tl.to(labelLines, {
        yPercent: -110,
        duration: 0.26,
        ease: 'power2.in'
      }, start + 0.82);

      tl.set(block, { autoAlpha: 0 }, start + 1);
    }
  });
}

function initHighlightInteractiveAnimation(project, root) {
  const items = Array.isArray(project.highlights) ? project.highlights : [];
  const buttons = Array.from(root.querySelectorAll('.highlight-chip'));
  const title = root.querySelector('[data-highlight-title]');
  const description = root.querySelector('[data-highlight-description]');

  if (!buttons.length || !title || !description || !items.length) return null;

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let activeIndex = 0;
  let animation = null;

  const setActiveButton = (nextIndex) => {
    buttons.forEach((button, index) => {
      const isActive = index === nextIndex;
      button.classList.toggle('is-active', isActive);
      button.setAttribute('aria-pressed', String(isActive));
    });
  };

  const animateCurrentText = () => {
    const titleLines = splitTextToLinesWithReset(title);
    const textLines = splitTextToLinesWithReset(description);
    const allLines = [...titleLines, ...textLines];

    gsap.set(allLines, { yPercent: 112 });

    animation = gsap.timeline();
    animation.to(titleLines, {
      yPercent: 0,
      duration: 0.36,
      ease: 'power3.out'
    });
    animation.to(textLines, {
      yPercent: 0,
      duration: 0.54,
      ease: 'power3.out',
      stagger: 0.05
    }, 0.08);
  };

  const renderActiveItem = (nextIndex, options = {}) => {
    const { immediate = false } = options;
    const item = items[nextIndex];
    if (!item) return;

    activeIndex = nextIndex;
    setActiveButton(nextIndex);

    if (animation) {
      animation.kill();
      animation = null;
    }

    resetSplitLineMarkup(title);
    resetSplitLineMarkup(description);

    const itemDescription = item.description || item.summary || '';

    title.dataset.originalText = item.title || '';
    description.dataset.originalText = itemDescription;

    title.textContent = item.title || '';
    description.textContent = itemDescription;

    if (immediate || prefersReducedMotion) return;

    animateCurrentText();
  };

  buttons.forEach((button) => {
    button.addEventListener('click', () => {
      const nextIndex = Number(button.dataset.highlightIndex || 0);
      if (nextIndex === activeIndex) return;
      renderActiveItem(nextIndex);
    });
  });

  renderActiveItem(0, { immediate: prefersReducedMotion });
  document.fonts?.ready?.then(() => {
    if (prefersReducedMotion) return;
    renderActiveItem(activeIndex);
  });

  return () => {
    if (animation) animation.kill();
    resetSplitLineMarkup(title);
    resetSplitLineMarkup(description);
  };
}

function renderFlowSteps(flowItem, container, root) {
  const template = root.querySelector('#tpl-flow-step');

  if (!container || !template) return;

  container.innerHTML = '';

  const gallery = flowItem?.gallery || {
    items: [],
    totalCount: 0,
    layout: { type: 'single', featuredIndex: 0 }
  };
  const safeSteps = gallery.items;

  container.dataset.stepCount = String(Math.min(Math.max(gallery.totalCount || safeSteps.length, 1), 6));
  container.dataset.galleryLayout = gallery.layout?.type || 'single';
  container.dataset.hasFeatured = String(safeSteps.some((step) => step.isFeatured));

  safeSteps.forEach((step, visualIndex) => {
    const node = template.content.cloneNode(true);
    const listItem = node.querySelector('.flow-step');
    const button = node.querySelector('.flow-step__button');
    const figure = node.querySelector('.flow-step__figure');
    const visual = node.querySelector('.flow-step__visual');
    const image = node.querySelector('img');
    const caption = node.querySelector('figcaption');

    if (listItem) {
      listItem.dataset.ratio = step.ratioType || 'landscape';
      listItem.classList.toggle('is-featured', Boolean(step.isFeatured));
    }

    if (button) {
      button.dataset.flowId = flowItem.id || '';
      button.dataset.galleryIndex = String(visualIndex);
      button.dataset.originalIndex = String(step.originalIndex ?? visualIndex);
      button.dataset.caption = step.label || '';
      button.setAttribute('aria-label', `${step.label || '이미지'} 크게 보기`);
    }

    if (figure) {
      figure.dataset.ratio = step.ratioType || 'landscape';
    }

    if (visual) {
      visual.dataset.ratio = step.ratioType || 'landscape';
    }

    if (image) {
      image.src = step.image || '';
      image.alt = step.alt || step.label || '';
    }

    if (caption) {
      caption.textContent = step.label || '';
    }

    container.appendChild(node);
  });
}

function renderFlowImplementation(items, container) {
  if (!container) return;

  container.innerHTML = '';

  (items || []).forEach((text) => {
    const item = document.createElement('li');
    item.className = 'flow-panel__implementation-item';
    item.textContent = text;
    container.appendChild(item);
  });
}

function renderFlowListItems(project, container, template, selectedId, options = {}) {
  const { isIsland = false } = options;

  if (!container || !template) return;

  container.innerHTML = '';

  project.flows.forEach((item) => {
    const node = template.content.cloneNode(true);
    const button = node.querySelector('.flow-item');
    const title = node.querySelector('.flow-item__title');

    if (button) {
      const panelId = `flow-panel-${item.id}`;
      const isActive = item.id === selectedId;

      button.dataset.flowId = item.id;
      button.setAttribute('aria-pressed', String(isActive));
      button.setAttribute('aria-controls', panelId);
      button.classList.toggle('is-active', isActive);

      if (isIsland) {
        button.classList.add('flow-item--island', 'btn--compact');
      }
    }

    if (title) {
      title.textContent = item.title || '';
    }

    container.appendChild(node);
  });
}

function renderFlowList(project, root, selectedId) {
  const container = root.querySelector('[data-field="flowList"]');
  const template = root.querySelector('#tpl-flow-item');

  renderFlowListItems(project, container, template, selectedId);
}

function renderFlowIslandList(project, root, selectedId) {
  const container = root.querySelector('[data-field="flowListMobile"]');
  const template = root.querySelector('#tpl-flow-item');

  renderFlowListItems(project, container, template, selectedId, { isIsland: true });
}

function renderFlowPanels(project, root) {
  const container = root.querySelector('[data-field="flowPanels"]');
  const template = root.querySelector('#tpl-flow-panel');

  if (!container || !template) return;

  container.innerHTML = '';

  project.flows.forEach((item) => {
    const node = template.content.cloneNode(true);
    const panel = node.querySelector('.flow-panel');
    const index = node.querySelector('.flow-panel__index');
    const title = node.querySelector('.flow-panel__title');
    const problem = node.querySelector('.flow-panel__problem');
    const solution = node.querySelector('.flow-panel__solution');
    const keyPoint = node.querySelector('.flow-panel__key-point');
    const implementation = node.querySelector('.flow-panel__implementation');
    const steps = node.querySelector('.flow-steps');

    if (panel) {
      panel.id = `flow-panel-${item.id}`;
      panel.dataset.flowId = item.id;
    }

    if (index) {
      index.textContent = String(item.order).padStart(2, '0');
    }

    if (title) title.textContent = item.title || '';
    if (problem) problem.textContent = item.problem || '';
    if (solution) solution.textContent = item.solution || '';
    if (keyPoint) keyPoint.textContent = item.keyPoint || '';

    renderFlowImplementation(item.implementation, implementation);
    renderFlowSteps(item, steps, root);

    container.appendChild(node);
  });
}

function createGalleryModal(root, state) {
  const template = root.querySelector('#tpl-flow-gallery-modal');
  if (!template) return null;

  const fragment = template.content.cloneNode(true);
  const modal = fragment.querySelector('.flow-gallery-modal');

  if (!modal) return null;

  root.appendChild(fragment);
  state.galleryModal = {
    root: root.querySelector('.flow-gallery-modal'),
    media: root.querySelector('[data-gallery-media]'),
    image: root.querySelector('[data-gallery-image]'),
    caption: root.querySelector('[data-gallery-caption]'),
    dialog: root.querySelector('.flow-gallery-modal__dialog')
  };

  return state.galleryModal;
}

function getGalleryButtons(root, flowId) {
  return Array.from(root.querySelectorAll(`.flow-panel[data-flow-id="${flowId}"] .flow-step__button`));
}

function getGalleryButtonMeta(button) {
  if (!button) return null;

  const image = button.querySelector('img');
  return {
    src: image?.currentSrc || image?.src || '',
    alt: image?.alt || '',
    caption: button.dataset.caption || ''
  };
}

function syncModalImage(button, state) {
  const modalState = state.galleryModal;
  const meta = getGalleryButtonMeta(button);
  if (!modalState?.image || !meta) return;

  modalState.image.src = meta.src;
  modalState.image.alt = meta.alt;

  if (modalState.caption) {
    modalState.caption.textContent = meta.caption;
  }
}

async function prepareModalImage(button, state) {
  const meta = getGalleryButtonMeta(button);
  const modalState = state.galleryModal;
  if (!modalState?.image || !meta) return null;

  await loadImageSource(meta.src);

  modalState.image.src = meta.src;
  modalState.image.alt = meta.alt;

  if (modalState.caption) {
    modalState.caption.textContent = meta.caption;
  }

  return meta;
}

async function animateModalImageChange(button, state) {
  const modalState = state.galleryModal;
  const nextMeta = getGalleryButtonMeta(button);
  if (!modalState?.image || !nextMeta) return;

  await loadImageSource(nextMeta.src);

  gsap.to(modalState.image, {
    autoAlpha: 0,
    scale: 0.985,
    duration: 0.16,
    ease: 'power2.out',
    onComplete: () => {
      modalState.image.src = nextMeta.src;
      modalState.image.alt = nextMeta.alt;

      if (modalState.caption) {
        modalState.caption.textContent = nextMeta.caption;
      }

      gsap.fromTo(modalState.image, {
        autoAlpha: 0,
        scale: 1.015
      }, {
        autoAlpha: 1,
        scale: 1,
        duration: 0.24,
        ease: 'power2.out'
      });
    }
  });
}

function animateModalOpen(button, state) {
  const modalState = state.galleryModal;
  const targetImage = modalState?.image;
  if (!button || !targetImage) return;

  gsap.killTweensOf(targetImage);
  gsap.set(targetImage, {
    autoAlpha: 0,
    scale: 0.985
  });

  gsap.to(targetImage, {
    autoAlpha: 1,
    scale: 1,
    duration: 0.24,
    ease: 'power2.out'
  });
}

function animateModalClose(state) {
  const modalState = state.galleryModal;
  const modalImage = modalState?.image;
  const modalRoot = modalState?.root;

  if (!modalRoot || modalRoot.hidden) return;

  gsap.killTweensOf([modalRoot, modalImage]);

  if (!modalImage) {
    closeGalleryModal(state, { skipMotion: true });
    return;
  }

  gsap.to(modalImage, {
    autoAlpha: 0,
    scale: 0.985,
    duration: 0.16,
    ease: 'power2.in'
  });

  gsap.to(modalRoot, {
    autoAlpha: 0,
    duration: 0.18,
    ease: 'power2.out',
    onComplete: () => {
      closeGalleryModal(state, { skipMotion: true });
      gsap.set(modalRoot, { clearProps: 'opacity,visibility' });
    }
  });
}

function updateGalleryModal(button, state) {
  const modalState = state.galleryModal;
  if (!button || !modalState) return;

  const flowId = button.dataset.flowId || '';
  const galleryButtons = getGalleryButtons(document, flowId);
  const currentIndex = galleryButtons.findIndex((item) => item === button);

  state.activeGalleryButton = button;
  state.activeGalleryFlowId = flowId;
  state.activeGalleryIndex = currentIndex >= 0 ? currentIndex : 0;
}

async function openGalleryModal(button, state) {
  const modalState = state.galleryModal;
  if (!button || !modalState?.root) return;

  updateGalleryModal(button, state);
  await prepareModalImage(button, state);

  modalState.root.hidden = false;
  document.body.classList.add('is-flow-gallery-open');
  modalState.root.classList.add('is-open');
  gsap.set(modalState.root, { autoAlpha: 1 });
  animateModalOpen(button, state);
  modalState.dialog?.focus();
}

function closeGalleryModal(state, options = {}) {
  const { skipMotion = false, deferHide = false } = options;
  const modalState = state.galleryModal;
  if (!modalState?.root || modalState.root.hidden) return;

  modalState.root.classList.remove('is-open');
  document.body.classList.remove('is-flow-gallery-open');

  if (deferHide) return;

  window.setTimeout(() => {
    if (!skipMotion && modalState.root.classList.contains('is-open')) return;
    modalState.root.hidden = true;
    if (modalState.image) {
      gsap.set(modalState.image, { clearProps: 'all' });
    }
    state.activeGalleryButton?.focus();
  }, 220);
}

function stepGallery(state, direction) {
  const flowId = state.activeGalleryFlowId;
  if (!flowId) return;

  const buttons = getGalleryButtons(document, flowId);
  if (!buttons.length) return;

  const nextIndex = (state.activeGalleryIndex + direction + buttons.length) % buttons.length;
  const nextButton = buttons[nextIndex];
  if (!nextButton) return;

  updateGalleryModal(nextButton, state);
  animateModalImageChange(nextButton, state);
}

function bindGallerySwipe(root, state) {
  const modalState = state.galleryModal;
  const swipeTarget = modalState?.media || modalState?.dialog || modalState?.root;
  if (!swipeTarget) return;

  let touchStartX = 0;
  let touchStartY = 0;

  swipeTarget.addEventListener('touchstart', (event) => {
    if (modalState.root?.hidden || event.touches.length !== 1) return;

    const touch = event.touches[0];
    touchStartX = touch.clientX;
    touchStartY = touch.clientY;
  }, { passive: true });

  swipeTarget.addEventListener('touchend', (event) => {
    if (modalState.root?.hidden || !event.changedTouches.length) return;

    const touch = event.changedTouches[0];
    const deltaX = touch.clientX - touchStartX;
    const deltaY = touch.clientY - touchStartY;

    if (
      Math.abs(deltaX) < GALLERY_SWIPE_MIN_DISTANCE ||
      Math.abs(deltaY) > GALLERY_SWIPE_MAX_VERTICAL_DRIFT ||
      Math.abs(deltaX) <= Math.abs(deltaY)
    ) {
      return;
    }

    stepGallery(state, deltaX < 0 ? 1 : -1);
  }, { passive: true });
}

function renderHighlights(project, root) {
  const container = root.querySelector('[data-field="highlights"]');
  const template = root.querySelector('#tpl-highlight');
  const items = Array.isArray(project.highlights) ? project.highlights : [];

  if (!container || !template) return;

  container.innerHTML = '';

  items.forEach((item, index) => {
    const node = template.content.cloneNode(true);
    const card = node.querySelector('.highlight-card');
    const cardIndex = node.querySelector('.highlight-card__index');
    const title = node.querySelector('.highlight-card__title');
    const text = node.querySelector('.highlight-card__text');

    if (card) {
      card.style.setProperty('--highlight-order', String(index));
    }

    if (cardIndex) {
      cardIndex.textContent = String(index + 1).padStart(2, '0');
    }

    if (title) {
      title.textContent = item.title || '';
    }

    if (text) {
      text.textContent = item.description || item.summary || '';
    }

    container.appendChild(node);
  });
}

function normalizeToolName(tool = '') {
  return String(tool).trim().toLowerCase();
}

function getToolItems(value = '') {
  if (Array.isArray(value)) return value.filter(Boolean);

  return String(value)
    .split(',')
    .map((tool) => tool.trim())
    .filter(Boolean);
}

function renderEtcTools(project, root) {
  const container = root.querySelector('[data-field="etc.tools"]');
  if (!container) return;

  const tools = getToolItems(project.etc?.tools);
  container.textContent = '';

  if (!tools.length) return;

  const list = document.createElement('span');
  list.className = 'project-tools';
  list.setAttribute('role', 'list');

  tools.forEach((tool) => {
    const key = normalizeToolName(tool);
    const meta = TOOL_ICON_MAP[key];
    const item = document.createElement('span');
    item.className = 'project-tools__item';
    item.setAttribute('role', 'listitem');

    if (meta?.icon) {
      item.setAttribute('aria-label', tool);
      item.title = tool;

      if (meta.preserveColor) {
        const icon = document.createElement('img');
        icon.className = 'project-tools__image';
        icon.src = `${TOOL_ICON_BASE}/${meta.icon}.svg`;
        icon.alt = '';
        icon.setAttribute('aria-hidden', 'true');
        item.appendChild(icon);
      } else {
        const icon = document.createElement('span');
        icon.className = 'project-tools__icon';
        icon.style.setProperty('--tool-icon', `url("${TOOL_ICON_BASE}/${meta.icon}.svg")`);
        icon.style.setProperty('--tool-color', meta.color);
        icon.setAttribute('aria-hidden', 'true');
        item.appendChild(icon);
      }
    } else {
      item.classList.add('project-tools__item--text');
      item.textContent = tool;
    }

    list.appendChild(item);
  });

  container.appendChild(list);
}

function renderEtc(project, root) {
  setText('[data-field="etc.deployment"]', project.etc?.deployment, root);
  renderEtcTools(project, root);
  setText('[data-field="etc.contribution"]', project.etc?.contribution, root);
}

function renderMeta(project, root) {
  setText('[data-field="meta.label"]', project.meta?.label, root);
  setText('[data-field="meta.title"]', project.meta?.title, root);
  setText('[data-field="meta.dateRange"]', project.meta?.dateRange, root);
  setText('[data-field="meta.role"]', project.meta?.roleText, root);
  setText('[data-field="meta.projectType"]', project.meta?.projectType, root);
  setText('[data-field="meta.projectScale"]', project.meta?.projectScale, root);

  setLink('[data-link-type="live"]', project.meta?.liveLink, root);
}

function setActiveFlow(root, flowId, state) {
  if (!flowId) return;

  state.selectedFlowId = flowId;

  root.querySelectorAll('.flow-item').forEach((button) => {
    const isActive = button.dataset.flowId === flowId;
    button.classList.toggle('is-active', isActive);
    button.setAttribute('aria-pressed', String(isActive));
  });

  root.querySelectorAll('.flow-panel').forEach((panel) => {
    panel.classList.toggle('is-active', panel.dataset.flowId === flowId);
  });

  syncIslandFocus(root, flowId);
}

function getFlowScrollOffset() {
  if (window.innerWidth >= 1440) return 120;
  if (window.innerWidth >= 768) return 104;
  return 88;
}

function scrollToFlow(flowId) {
  const panel = document.getElementById(`flow-panel-${flowId}`);
  if (!panel) return;

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const absoluteTop = panel.getBoundingClientRect().top + window.pageYOffset;
  const top = Math.max(absoluteTop - getFlowScrollOffset(), 0);

  window.scrollTo({
    top,
    behavior: prefersReducedMotion ? 'auto' : 'smooth'
  });
}

function bindFlowEvents(root, state) {
  root.addEventListener('click', (event) => {
    const button = event.target.closest('.flow-item');
    if (button && root.contains(button)) {
      const flowId = button.dataset.flowId;
      if (!flowId) return;

      setActiveFlow(root, flowId, state);
      scrollToFlow(flowId);
      return;
    }

    const galleryButton = event.target.closest('.flow-step__button');
    if (galleryButton && root.contains(galleryButton)) {
      openGalleryModal(galleryButton, state);
      return;
    }

    if (event.target.closest('[data-gallery-close]')) {
      animateModalClose(state);
    }
  });

  root.addEventListener('keydown', (event) => {
    if (state.galleryModal?.root?.hidden) return;

    if (event.key === 'Escape') {
      event.preventDefault();
      animateModalClose(state);
    }

    if (event.key === 'ArrowRight') {
      event.preventDefault();
      stepGallery(state, 1);
    }

    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      stepGallery(state, -1);
    }
  });

  root.querySelector('[data-gallery-prev]')?.addEventListener('click', () => {
    stepGallery(state, -1);
  });

  root.querySelector('[data-gallery-next]')?.addEventListener('click', () => {
    stepGallery(state, 1);
  });

  bindGallerySwipe(root, state);
}

function initFlowScrollSync(root, state) {
  const section = root.querySelector('.project-key-flows');
  const layout = root.querySelector('.project-key-flows__layout');
  const nav = root.querySelector('.project-key-flows__nav-inner');
  const island = root.querySelector('[data-flow-island]');
  const panels = gsap.utils.toArray('.flow-panel', root);

  if (!section || !layout || !nav || !panels.length) return;

  const media = gsap.matchMedia();
  state.flowMatchMedia = media;

  media.add('(min-width: 768px)', () => {
    const pinTrigger = ScrollTrigger.create({
      trigger: layout,
      start: () => `top top+=${getFlowScrollOffset()}`,
      endTrigger: section,
      end: () => `bottom bottom-=${32}`,
      pin: nav,
      pinSpacing: false,
      anticipatePin: 1,
      invalidateOnRefresh: true
    });

    return () => {
      pinTrigger.kill();
    };
  });

  media.add('(max-width: 767px)', () => {
    if (!island) return undefined;

    const islandTrigger = ScrollTrigger.create({
      trigger: section,
      start: () => `top bottom-=${96}`,
      end: 'bottom bottom',
      onEnter: () => toggleFlowIsland(island, true),
      onEnterBack: () => toggleFlowIsland(island, true),
      onLeave: () => toggleFlowIsland(island, false),
      onLeaveBack: () => toggleFlowIsland(island, false)
    });

    return () => {
      toggleFlowIsland(island, false);
      islandTrigger.kill();
    };
  });

  panels.forEach((panel) => {
    const flowId = panel.dataset.flowId;
    if (!flowId) return;

    const trigger = ScrollTrigger.create({
      trigger: panel,
      start: 'top center',
      end: 'bottom center',
      onEnter: () => setActiveFlow(root, flowId, state),
      onEnterBack: () => setActiveFlow(root, flowId, state)
    });

    state.flowTriggers.push(trigger);
  });

  const firstFlowId = panels[0]?.dataset.flowId;
  if (firstFlowId) {
    setActiveFlow(root, firstFlowId, state);
  }
}

function renderProjectDetail(project, root, state) {
  renderMeta(project, root);
  renderHeroDescription(project, root);
  renderHeroTags(project, root);
  renderHeroVisuals(project, root);
  renderSummary(project, root);
  renderFlowList(project, root, state.selectedFlowId);
  renderFlowIslandList(project, root, state.selectedFlowId);
  renderFlowPanels(project, root);
  renderHighlights(project, root);
  renderEtc(project, root);
  createGalleryModal(root, state);
}

function syncIslandFocus(root, flowId) {
  const track = root.querySelector('[data-field="flowListMobile"]');
  const islandButton = root.querySelector(`[data-field="flowListMobile"] .flow-item[data-flow-id="${flowId}"]`);
  if (!track || !islandButton) return;

  const maxScrollLeft = Math.max(track.scrollWidth - track.clientWidth, 0);
  if (maxScrollLeft <= 0) return;

  const anchorRatio = 0.34;
  const targetCenter = islandButton.offsetLeft + (islandButton.offsetWidth / 2);
  const anchorPosition = track.clientWidth * anchorRatio;
  const nextScrollLeft = Math.min(
    Math.max(targetCenter - anchorPosition, 0),
    maxScrollLeft
  );

  track.scrollTo({
    left: nextScrollLeft,
    behavior: 'auto'
  });
}

function toggleFlowIsland(island, isVisible) {
  island.classList.toggle('is-visible', isVisible);
  island.setAttribute('aria-hidden', String(!isVisible));
}

export async function loadProjectDetail() {
  const root = document.querySelector('[data-page-root]');
  if (!root) return false;

  try {
    const rawProject = await fetchProjectData();
    const project = await normalizeProject(rawProject);

    const state = {
      selectedFlowId: project.flows?.[0]?.id || '',
      flowTriggers: [],
      flowMatchMedia: null
    };

    renderProjectDetail(project, root, state);
    bindFlowEvents(root, state);
    initHighlightInteractiveAnimation(project, root);
    initFlowScrollSync(root, state);
    initProjectSectionNavigator(root);

    return true;
  } catch (error) {
    console.error(error);
    root.innerHTML = '<p class="project-detail__error">Failed to load project data.</p>';
    return false;
  }
}

/* ========================================
   Work Grid
======================================== */

import gsap from "https://cdn.jsdelivr.net/npm/gsap@3.12.5/+esm";
import { initInteractiveTone } from '../global/hoverTone.js';

const SELECTOR = {
  list: '#work-list',
  count: '.work-page__count',
  empty: '.work-page__empty'
};

const getYear = (date = '') => (date.match(/\d{4}/)?.[0] || '');

const getMeta = (project) => {
  return [project.device, project.projectType, ...(project.keywords || [])].filter(Boolean);
};

function updateCount(count) {
  const countEl = document.querySelector(SELECTOR.count);
  if (countEl) {
    countEl.textContent = count;
  }
}

function toggleEmptyState(isEmpty) {
  const emptyEl = document.querySelector(SELECTOR.empty);
  if (!emptyEl) return;

  emptyEl.hidden = !isEmpty;
}

function cardMarkup(project, index = 0) {
  const title = project.title;
  const year = getYear(project.date);
  const thumb = project.thumbnail;
  const detailHref = `./project-detail.html?slug=${project.slug || project.id}`;
  const previewAlt = `${title} preview`;
  const meta = getMeta(project);
  const summary = project.summary || `${project.device} ${project.projectType} project`;

  return `
    <li class="work-page__item" data-project-id="${project.id}">
      <article class="work-card">
        <a href="${detailHref}" class="work-card__link">
          <span class="work-card__index">${String(index + 1).padStart(2, '0')}</span>
          <div class="work-card__body">
            <p class="work-card__year">${year}</p>
            <h3 class="work-card__title">${title}</h3>
            <p class="work-card__summary">${summary}</p>
            <ul class="work-card__meta">
              ${meta.map((item) => `<li>${item}</li>`).join('')}
            </ul>
          </div>
          <span class="work-card__visual" aria-hidden="true">
            <img class="work-card__image" src="${thumb}" alt="${previewAlt}" decoding="async">
          </span>
          <span class="work-card__cta">View Case</span>
        </a>
      </article>
    </li>
  `;
}

function render(projects = []) {
  const listEl = document.querySelector(SELECTOR.list);
  if (!listEl) return;

  const cardsMarkup = projects.map((project, index) => cardMarkup(project, index)).join('');
  listEl.innerHTML = `${cardsMarkup}<li class="work-page__empty" hidden>No projects</li>`;

  updateCount(projects.length);
  toggleEmptyState(!projects.length);
  bindCardOpenMotion(listEl);
  initInteractiveTone();
}

function bindCardOpenMotion(listEl) {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  listEl.querySelectorAll('.work-card__link').forEach((link) => {
    link.addEventListener('click', (event) => {
      if (
        prefersReducedMotion ||
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      ) {
        return;
      }

      const href = link.href;
      const card = link.closest('.work-card');
      if (!href || !card) return;

      event.preventDefault();
      animateCardOpen(card, href);
    });
  });
}

function animateCardOpen(card, href) {
  const rect = card.getBoundingClientRect();
  const clone = card.cloneNode(true);

  clone.classList.add('work-card--opening');
  clone.setAttribute('aria-hidden', 'true');

  Object.assign(clone.style, {
    position: 'fixed',
    left: `${rect.left}px`,
    top: `${rect.top}px`,
    width: `${rect.width}px`,
    height: `${rect.height}px`,
    margin: 0,
    zIndex: 1200,
    pointerEvents: 'none'
  });

  document.body.appendChild(clone);
  document.body.classList.add('is-work-card-opening');

  gsap.set(card, { autoAlpha: 0 });

  gsap.to(clone, {
    left: 0,
    top: 0,
    width: window.innerWidth,
    height: window.innerHeight,
    duration: 0.56,
    ease: 'power3.inOut',
    onComplete: () => {
      window.location.href = href;
    }
  });
}

export async function loadWorkCardList() {
  const response = await fetch('./data/projects-index.json');
  const data = await response.json();
  const projects = Array.isArray(data) ? data : data?.projects;

  if (!Array.isArray(projects)) {
    throw new TypeError('projects-index.json must contain a projects array.');
  }

  render(projects);

  return true;
}

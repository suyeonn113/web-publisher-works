export function initInteractiveTone() {
  const canHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  if (!canHover) return;

  const selectors = [
    '.site-header__brand',
    '.site-header__theme-toggle',
    '.site-footer a',
    '.btn',
    '.btn-more',
    '.fixed-menu__btn'
  ];

  document.querySelectorAll(selectors.join(', ')).forEach((element) => {
    element.setAttribute('data-hover-tone', 'accent');
  });
}

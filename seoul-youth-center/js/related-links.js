document.addEventListener('DOMContentLoaded', () => {
  const btn = document.getElementById('related-links__toggle');
  const panel = document.getElementById('related-links__list');

  if (!btn || !panel) return;

  function closePanel({ restoreFocus = false } = {}) {
    btn.setAttribute('aria-expanded', 'false');
    panel.hidden = true;
    if (restoreFocus) btn.focus();
  }

  btn.addEventListener('click', () => {
    const isOpen = btn.getAttribute('aria-expanded') === 'true';

    if (isOpen) {
      closePanel();
      return;
    }

    btn.setAttribute('aria-expanded', 'true');
    panel.hidden = false;
  });

  panel.addEventListener('keydown', (event) => {
    if (event.key !== 'Escape') return;
    event.preventDefault();
    closePanel({ restoreFocus: true });
  });
});

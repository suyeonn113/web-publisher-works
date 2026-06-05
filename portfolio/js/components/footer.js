/* ========================================
   Footer Component
======================================== */

export function renderFooter() {
  const main = document.querySelector('#main');
  if (!main) return;

  document.querySelector('.site-footer')?.remove();

  const footerHTML = `
    <footer class="site-footer l-fullspan">
      <div class="site-footer__inner">
        <nav class="site-footer__contact" aria-label="Contact">
          <a href="mailto:suyeonn113@naver.com" class="site-footer__link">email</a>
          <a href="https://github.com/suyeonn113" target="_blank" rel="noopener" class="site-footer__link">github</a>
        </nav>
        <p class="site-footer__copy"><small>c ${new Date().getFullYear()} suyeon</small></p>
      </div>
    </footer>
  `;

  main.insertAdjacentHTML('afterend', footerHTML);
}

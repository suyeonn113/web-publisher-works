/* ========================================
   Footer Component
======================================== */

export function renderFooter() {
  const page = document.body?.dataset.page || '';
  const main = document.querySelector("#main");
  if (!main) return;

  document.querySelector('.site-footer')?.remove();

  if (page === 'contact') {
    const contactFooterHTML = `
      <footer class="site-footer site-footer--contact l-fullspan">
        <div class="site-footer__inner">
          <p class="site-footer__copy"><small>© 2024 SUYEON. ALL RIGHTS RESERVED.</small></p>
          <p class="site-footer__location">BASED IN KOREA</p>
        </div>
      </footer>
    `;

    main.insertAdjacentHTML("afterend", contactFooterHTML);
    return;
  }

  const footerHTML = `
    <footer class="site-footer l-fullspan">
      <div class="site-footer__inner">
        <nav class="site-footer__contact" aria-label="연락처">
          <a href="mailto:suyeonn113@naver.com" class="site-footer__link">email</a>
          <a href="https://github.com/suyeonn113" target="_blank" class="site-footer__link">github</a>
        </nav>
        <p class="site-footer__copy"><small>© ${new Date().getFullYear()} suyeon</small></p>
      </div>
    </footer>
  `;

  main.insertAdjacentHTML("afterend", footerHTML);
}

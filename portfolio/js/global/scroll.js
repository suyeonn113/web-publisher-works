import ScrollTrigger from "https://cdn.jsdelivr.net/npm/gsap@3.12.5/ScrollTrigger/+esm";

export function initLenis(page = '') {
  return null;
}

export function initScrollStability(lenis) {
  let refreshRaf = 0;

  const runRefresh = () => {
    refreshRaf = 0;

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        lenis?.resize?.();
        ScrollTrigger.refresh();
      });
    });
  };

  const queueRefresh = () => {
    if (refreshRaf) return;
    refreshRaf = requestAnimationFrame(runRefresh);
  };

  const pendingImages = Array.from(document.images).filter((img) => !img.complete);

  if (pendingImages.length) {
    pendingImages.forEach((img) => {
      img.addEventListener('load', queueRefresh, { once: true });
      img.addEventListener('error', queueRefresh, { once: true });
    });
  }

  if (document.fonts?.ready) {
    document.fonts.ready.then(queueRefresh).catch(() => {});
  }

  window.addEventListener('load', queueRefresh, { once: true });
  queueRefresh();
}


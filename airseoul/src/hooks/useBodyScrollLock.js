import { useEffect } from 'react';

function useBodyScrollLock(isLocked, mediaQueryText = '(max-width: 768px)') {
  useEffect(() => {
    if (!isLocked) return undefined;

    const mediaQuery = window.matchMedia(mediaQueryText);
    const originalBodyOverflow = document.body.style.overflow;
    const originalBodyOverscrollBehavior = document.body.style.overscrollBehavior;
    const originalRootOverscrollBehavior = document.documentElement.style.overscrollBehavior;
    let isApplied = false;

    const applyLock = () => {
      if (!mediaQuery.matches || isApplied) return;

      document.body.style.overflow = 'hidden';
      document.body.style.overscrollBehavior = 'contain';
      document.documentElement.style.overscrollBehavior = 'contain';
      isApplied = true;
    };

    const releaseLock = () => {
      if (!isApplied) return;

      document.body.style.overflow = originalBodyOverflow;
      document.body.style.overscrollBehavior = originalBodyOverscrollBehavior;
      document.documentElement.style.overscrollBehavior = originalRootOverscrollBehavior;
      isApplied = false;
    };

    const handleChange = () => {
      if (mediaQuery.matches) {
        applyLock();
      } else {
        releaseLock();
      }
    };

    handleChange();
    mediaQuery.addEventListener('change', handleChange);

    return () => {
      mediaQuery.removeEventListener('change', handleChange);
      releaseLock();
    };
  }, [isLocked, mediaQueryText]);
}

export default useBodyScrollLock;

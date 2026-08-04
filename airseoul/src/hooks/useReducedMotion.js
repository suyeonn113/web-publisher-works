import { useEffect, useState } from 'react';

const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)';

function useReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(() => {
    return window.matchMedia(REDUCED_MOTION_QUERY).matches;
  });

  useEffect(() => {
    const mediaQuery = window.matchMedia(REDUCED_MOTION_QUERY);
    const handleChange = (event) => setPrefersReducedMotion(event.matches);

    mediaQuery.addEventListener('change', handleChange);

    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return prefersReducedMotion;
}

export default useReducedMotion;

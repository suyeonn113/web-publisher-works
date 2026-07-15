import { useEffect, useState } from 'react';

export function usePanelTransition(isOpen) {
  const [shouldRender, setShouldRender] = useState(isOpen);
  const [transitionState, setTransitionState] = useState(
    isOpen ? 'open' : 'closed',
  );

  useEffect(() => {
    if (isOpen) {
      const frameId = requestAnimationFrame(() => {
        setShouldRender(true);
        setTransitionState('open');
      });

      return () => {
        cancelAnimationFrame(frameId);
      };
    }

    if (!shouldRender) {
      return undefined;
    }

    const frameId = requestAnimationFrame(() => {
      setShouldRender(false);
      setTransitionState('closed');
    });

    return () => {
      cancelAnimationFrame(frameId);
    };
  }, [isOpen, shouldRender]);

  return { shouldRender, transitionState };
}

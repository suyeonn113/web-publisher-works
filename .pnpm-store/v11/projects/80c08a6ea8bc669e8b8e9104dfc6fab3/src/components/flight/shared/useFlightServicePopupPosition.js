import { useRef, useState } from 'react';

function useFlightServicePopupPosition(widths) {
  const containerRef = useRef(null);
  const triggerRef = useRef(null);
  const [popupPosition, setPopupPosition] = useState({ left: 0, top: 0 });

  const updatePopupPosition = (popupType, event) => {
    triggerRef.current = event.currentTarget;

    const triggerRect = event.currentTarget.getBoundingClientRect();
    const containerRect = containerRef.current?.getBoundingClientRect();

    if (!containerRect) {
      setPopupPosition({ left: 0, top: 0 });
      return;
    }

    const popupWidth = Math.min(widths[popupType] ?? widths.DEFAULT, containerRect.width);
    const preferredLeft = triggerRect.left - containerRect.left;
    const maxLeft = Math.max(containerRect.width - popupWidth, 0);

    setPopupPosition({
      left: Math.min(Math.max(preferredLeft, 0), maxLeft),
      top: triggerRect.bottom - containerRect.top,
    });
  };

  return {
    containerRef,
    popupPosition,
    triggerRef,
    updatePopupPosition,
  };
}

export default useFlightServicePopupPosition;

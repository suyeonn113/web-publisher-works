import { cloneElement } from 'react';
import { createPortal } from 'react-dom';

function FlightServicePopupPortal({ children, isFullScreen }) {
  if (!isFullScreen || typeof document === 'undefined') {
    return children;
  }

  const fullScreenPopup = cloneElement(children, {
    className: [children.props.className, 'flight-service-popup--fullscreen']
      .filter(Boolean)
      .join(' '),
  });

  return createPortal(fullScreenPopup, document.body);
}

export default FlightServicePopupPortal;

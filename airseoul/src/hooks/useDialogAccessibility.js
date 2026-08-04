import { useEffect } from 'react';

const FOCUSABLE_SELECTOR = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(',');

function useDialogAccessibility({ dialogRef, isModal, isOpen, onClose, triggerRef }) {
  useEffect(() => {
    if (!isOpen) return undefined;

    const dialog = dialogRef.current;
    const trigger = triggerRef.current;
    const frameId = window.requestAnimationFrame(() => dialog?.focus());

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        onClose();
        return;
      }

      if (!isModal || event.key !== 'Tab' || !dialog) return;

      const focusableElements = Array.from(dialog.querySelectorAll(FOCUSABLE_SELECTOR)).filter(
        (element) => !element.hidden && element.getAttribute('aria-hidden') !== 'true',
      );

      if (focusableElements.length === 0) {
        event.preventDefault();
        dialog.focus();
        return;
      }

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (document.activeElement === dialog || !dialog.contains(document.activeElement)) {
        event.preventDefault();
        (event.shiftKey ? lastElement : firstElement).focus();
      } else if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      window.cancelAnimationFrame(frameId);
      document.removeEventListener('keydown', handleKeyDown);
      window.requestAnimationFrame(() => trigger?.focus());
    };
  }, [dialogRef, isModal, isOpen, onClose, triggerRef]);
}

export default useDialogAccessibility;

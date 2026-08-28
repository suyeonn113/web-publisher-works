import { useEffect, useRef } from 'react';

const FOCUSABLE_SELECTOR = [
  'a[href]',
  'button',
  'input',
  'select',
  'textarea',
  '[tabindex]',
  '[contenteditable="true"]',
].join(',');

const isVisibleAndEnabled = (element) => {
  if (
    element.disabled ||
    element.hidden ||
    element.closest('[hidden], [aria-hidden="true"], [inert]')
  ) {
    return false;
  }

  const styles = window.getComputedStyle(element);

  return (
    styles.display !== 'none' &&
    styles.visibility !== 'hidden' &&
    element.getClientRects().length > 0
  );
};

const isActuallyFocusable = (element) =>
  element.tabIndex >= 0 && isVisibleAndEnabled(element);

function useDialogAccessibility({
  dialogRef,
  initialFocusRef,
  isModal,
  isOpen,
  onClose,
  triggerRef,
}) {
  const onCloseRef = useRef(onClose);

  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  useEffect(() => {
    if (!isOpen) return undefined;

    const dialog = dialogRef.current;
    const trigger = triggerRef.current;
    const getFocusableElements = () => {
      if (!dialog) return [];

      return Array.from(dialog.querySelectorAll(FOCUSABLE_SELECTOR)).filter(
        isActuallyFocusable,
      );
    };
    const frameId = window.requestAnimationFrame(() => {
      const initialFocus = initialFocusRef?.current;

      if (initialFocus && isVisibleAndEnabled(initialFocus)) {
        initialFocus.focus();
        return;
      }

      const firstFocusableElement = getFocusableElements()[0];

      if (firstFocusableElement) {
        firstFocusableElement.focus();
      } else {
        dialog?.focus();
      }
    });
    const inertedElements = [];

    if (isModal && dialog) {
      let currentElement = dialog;

      while (currentElement.parentElement && currentElement !== document.body) {
        const parent = currentElement.parentElement;

        Array.from(parent.children).forEach((sibling) => {
          if (sibling === currentElement || sibling.inert) return;

          sibling.inert = true;
          inertedElements.push(sibling);
        });

        currentElement = parent;
      }
    }

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        onCloseRef.current();
        return;
      }

      if (!isModal || event.key !== 'Tab' || !dialog) return;

      const focusableElements = getFocusableElements();

      if (focusableElements.length === 0) {
        event.preventDefault();
        dialog.focus();
        return;
      }

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (
        document.activeElement === dialog ||
        !dialog.contains(document.activeElement) ||
        !focusableElements.includes(document.activeElement)
      ) {
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
      inertedElements.forEach((element) => {
        element.inert = false;
      });
      window.requestAnimationFrame(() => trigger?.focus());
    };
  }, [dialogRef, initialFocusRef, isModal, isOpen, triggerRef]);
}

export default useDialogAccessibility;

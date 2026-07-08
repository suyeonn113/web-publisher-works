export function getRovingTabNextIndex(event, currentIndex, itemCount) {
  const lastIndex = itemCount - 1;

  if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
    return currentIndex === lastIndex ? 0 : currentIndex + 1;
  }

  if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
    return currentIndex === 0 ? lastIndex : currentIndex - 1;
  }

  if (event.key === 'Home') return 0;
  if (event.key === 'End') return lastIndex;

  return null;
}

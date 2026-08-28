const dropdownLinkSelector = '.site-header__dropdown-link';
const nextKeys = ['ArrowDown'];
const previousKeys = ['ArrowUp'];

export function moveDropdownFocus(event) {
  if (!event.target.matches(dropdownLinkSelector)) return false;
  if (![...nextKeys, ...previousKeys].includes(event.key)) return false;

  const links = Array.from(
    event.currentTarget.querySelectorAll(dropdownLinkSelector),
  );
  const currentIndex = links.indexOf(event.target);

  if (currentIndex === -1) return false;

  const direction = nextKeys.includes(event.key) ? 1 : -1;
  const nextIndex = (currentIndex + direction + links.length) % links.length;

  event.preventDefault();
  links[nextIndex]?.focus();

  return true;
}

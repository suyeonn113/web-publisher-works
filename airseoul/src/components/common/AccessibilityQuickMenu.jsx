const quickLinks = [
  { href: '#main-content', label: '본문 바로가기' },
  { href: '#primary-navigation', label: '주요 메뉴 바로가기' },
  { href: '#site-footer', label: '푸터 바로가기' },
];

export default function AccessibilityQuickMenu() {
  return (
    <nav className="accessibility-quick-menu" aria-label="접근성 빠른 메뉴">
      {quickLinks.map((link) => (
        <a href={link.href} key={link.href}>
          {link.label}
        </a>
      ))}
    </nav>
  );
}

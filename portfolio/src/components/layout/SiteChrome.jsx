import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

import "./SiteChrome.scss";

const SiteChrome = ({ children }) => {
  const lastScrollYRef = useRef(0);
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const isScrollingUp =
        currentScrollY < lastScrollYRef.current || currentScrollY < 8;

      setIsHeaderVisible(isScrollingUp);
      lastScrollYRef.current = currentScrollY;
    };

    lastScrollYRef.current = window.scrollY;
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <header
        className={[
          "site-header",
          isHeaderVisible ? "is-visible" : "is-hidden",
        ]
          .filter(Boolean)
          .join(" ")}
      >
        <Link className="site-header__logo" to="/">
          수연
        </Link>
      </header>

      {children}

      <footer className="site-footer">
        <p>© 2026 Suyeon. All rights reserved.</p>
        <nav aria-label="푸터 링크">
          <a href="#">GitHub</a>
          <a href="mailto:hello@example.com">hello@example.com</a>
        </nav>
      </footer>
    </>
  );
};

export default SiteChrome;

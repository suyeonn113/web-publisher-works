import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import ArrowIcon from "../icons/ArrowIcon";
import HomeIcon from "../icons/HomeIcon";
import "./SiteChrome.scss";

const SiteChrome = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const lastScrollYRef = useRef(0);
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const isHomePage = location.pathname === "/";
  const isPreviewPage = /^\/projects\/[^/]+\/preview\/?$/.test(
    location.pathname,
  );

  const handleBackClick = () => {
    if (window.history.state?.idx > 0) {
      navigate(-1);
      return;
    }

    navigate("/");
  };

  useEffect(() => {
    if (isPreviewPage) {
      setIsHeaderVisible(true);
      return undefined;
    }

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
  }, [isPreviewPage]);

  return (
    <>
      <header
        className={[
          "site-header",
          isPreviewPage ? "is-static" : "",
          isHeaderVisible ? "is-visible" : "is-hidden",
        ]
          .filter(Boolean)
          .join(" ")}
      >
        <div className="site-header__brand">
          {!isHomePage && (
            <button
              className="site-header__back"
              type="button"
              aria-label="이전 페이지로 이동"
              onClick={handleBackClick}
            >
              <ArrowIcon direction="left" />
            </button>
          )}
          <Link
            className={[
              "site-header__logo",
              !isHomePage ? "is-icon-only" : "",
            ]
              .filter(Boolean)
              .join(" ")}
            to="/"
            aria-label={!isHomePage ? "메인으로 이동" : undefined}
          >
            {isHomePage ? (
              "수연의 Web Publisher Portfolio"
            ) : (
              <HomeIcon />
            )}
          </Link>
        </div>
      </header>

      {children}

      <footer className="site-footer">
        <p>© 2026 Suyeon. All rights reserved.</p>
        <nav aria-label="푸터 링크">
          <a href="https://github.com/suyeonn113" target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
          <a href="mailto:suyeonn113@naver.com" target="_blank" rel="noopener noreferrer">
            Email
          </a>
        </nav>
      </footer>
    </>
  );
};

export default SiteChrome;

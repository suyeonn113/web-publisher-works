import { gsap } from 'gsap';
import { CustomEase } from 'gsap/CustomEase';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger, CustomEase);

const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)';

const getCssTime = (propertyName, fallback) => {
  const value = window
    .getComputedStyle(document.documentElement)
    .getPropertyValue(propertyName)
    .trim();
  const numericValue = Number.parseFloat(value);

  if (!Number.isFinite(numericValue)) return fallback;
  return value.endsWith('ms') ? numericValue / 1000 : numericValue;
};

const getCssEase = (propertyName, name, fallback) => {
  const value = window
    .getComputedStyle(document.documentElement)
    .getPropertyValue(propertyName)
    .trim();
  const controlPoints = value.match(/-?\d*\.?\d+/g);

  return CustomEase.create(name, controlPoints?.length === 4 ? controlPoints.join(',') : fallback);
};

export function createServiceShortcutRevealAnimation(section) {
  if (!section || window.matchMedia(REDUCED_MOTION_QUERY).matches) return () => {};

  const media = gsap.matchMedia();

  media.add(
    {
      desktop: '(min-width: 1281px)',
      laptop: '(min-width: 769px) and (max-width: 1280px)',
      tablet: '(min-width: 461px) and (max-width: 768px)',
      mobile: '(max-width: 460px)',
    },
    ({ conditions }) => gsap.context(() => {
      const content = section.querySelector('.service-shortcut__content');
      const items = gsap.utils.toArray(section.querySelectorAll('.service-shortcut__item'));
      if (!content || items.length === 0) return;

      const duration = getCssTime('--home-fade-up-duration', 0.8);
      const ease = getCssEase(
        '--home-fade-up-ease',
        'service-shortcut-reveal-ease',
        '0.16,1,0.3,1',
      );
      const columnCount = conditions.desktop
        ? items.length
        : conditions.laptop
          ? 3
          : conditions.tablet
            ? 2
            : 1;
      const rows = Array.from(
        { length: Math.ceil(items.length / columnCount) },
        (_, rowIndex) => items.slice(rowIndex * columnCount, (rowIndex + 1) * columnCount),
      );

      gsap.fromTo(
        section,
        { backgroundPositionY: 'calc(50% + 48px)' },
        {
          backgroundPositionY: '50%',
          duration,
          ease,
          scrollTrigger: {
            trigger: section,
            start: 'top 84%',
            once: true,
            invalidateOnRefresh: true,
          },
        },
      );

      gsap.fromTo(
        content,
        { autoAlpha: 0, y: 32 },
        {
          autoAlpha: 1,
          y: 0,
          duration,
          ease,
          scrollTrigger: {
            trigger: content,
            start: 'top 88%',
            once: true,
            invalidateOnRefresh: true,
          },
        },
      );

      rows.forEach((row) => {
        gsap.fromTo(
          row,
          { autoAlpha: 0, y: 40 },
          {
            autoAlpha: 1,
            y: 0,
            duration,
            ease,
            scrollTrigger: {
              trigger: row[0],
              start: 'top 88%',
              once: true,
              invalidateOnRefresh: true,
            },
          },
        );
      });
    }, section),
  );

  return () => media.revert();
}

export function createHomeSectionFadeUpAnimation(section) {
  if (!section || window.matchMedia(REDUCED_MOTION_QUERY).matches) return () => {};

  const context = gsap.context(() => {
    const duration = getCssTime('--home-fade-up-duration', 0.8);
    const ease = getCssEase('--home-fade-up-ease', 'home-section-fade-up-ease', '0.16,1,0.3,1');

    gsap.fromTo(
      section,
      { autoAlpha: 0, y: 24 },
      {
        autoAlpha: 1,
        y: 0,
        duration,
        ease,
        scrollTrigger: {
          trigger: section,
          start: 'top 86%',
          once: true,
          invalidateOnRefresh: true,
        },
      },
    );
  }, section);

  return () => context.revert();
}

export function createHomeInfoRevealAnimation(section) {
  if (!section || window.matchMedia(REDUCED_MOTION_QUERY).matches) return () => {};

  const context = gsap.context(() => {
    const visual = section.querySelector('.home-info-about__visual-shell');
    const content = section.querySelector('.home-info-about__content');
    if (!visual || !content) return;

    const duration = getCssTime('--home-fade-up-duration', 0.8);
    const ease = getCssEase('--home-fade-up-ease', 'home-info-reveal-ease', '0.16,1,0.3,1');
    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top 88%',
        once: true,
      },
    });

    timeline
      .fromTo(
        visual,
        {
          autoAlpha: 0,
          y: 64,
          scale: 0.98,
          transformOrigin: '50% 50%',
        },
        {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          duration,
          ease,
          clearProps: 'opacity,transform,transformOrigin,visibility',
        },
      )
      .fromTo(
        content,
        {
          autoAlpha: 0,
          y: 32,
        },
        {
          autoAlpha: 1,
          y: 0,
          duration,
          ease,
          clearProps: 'opacity,transform,visibility',
        },
        getCssTime('--home-motion-fast', 0.2) / 2,
      );
  }, section);

  return () => context.revert();
}

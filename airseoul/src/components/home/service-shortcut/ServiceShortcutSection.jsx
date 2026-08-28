import { useLayoutEffect, useRef } from 'react';
import { createServiceShortcutRevealAnimation } from '../../../animations/home/homeSectionRevealAnimations';
import { serviceShortcuts } from '../../../data/serviceShortcuts';
import ServiceShortcutItem from './ServiceShortcutItem';

function ServiceShortcutSection() {
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    return createServiceShortcutRevealAnimation(sectionRef.current);
  }, []);

  return (
    <section
      className="service-shortcut"
      ref={sectionRef}
      aria-labelledby="service-shortcut-title"
    >
      <div className="service-shortcut__inner">
        <div className="service-shortcut__content">
          <span className="service-shortcut__eyebrow">ADDITIONAL SERVICE</span>

          <h2 className="service-shortcut__title" id="service-shortcut-title">
            여행을 더 가볍게
          </h2>

          <p className="service-shortcut__text">
            에어서울만의 합리적이고 편리한 부가 서비스를 미리 만나보세요.
          </p>
        </div>

        <ul className="service-shortcut__list">
          {serviceShortcuts.map((item) => (
            <ServiceShortcutItem item={item} key={item.id} />
          ))}
        </ul>
      </div>
    </section>
  );
}

export default ServiceShortcutSection;

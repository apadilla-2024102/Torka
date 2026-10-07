'use client';

import { useEffect, useRef, useMemo } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ScrollReveal = ({
  children,
  scrollContainerRef,
  enableBlur = true,
  baseOpacity = 0.1,
  baseRotation = 3,
  blurStrength = 4,
  containerClassName = '',
  textClassName = '',
  as: Etiqueta = 'h2'
}) => {
  const containerRef = useRef(null);

  const splitText = useMemo(() => {
    const text = typeof children === 'string' ? children : '';
    return text.split(/(\s+)/).map((word, index) => {
      if (word.match(/^\s+$/)) return word;
      return (
        <span className="inline-block word" key={index}>
          {word}
        </span>
      );
    });
  }, [children]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    // [TORKA] Con "reducir movimiento" el texto queda encendido completo.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const scroller = scrollContainerRef && scrollContainerRef.current ? scrollContainerRef.current : window;

    // [TORKA] gsap.context limita la limpieza a los disparadores de este
    // componente; el original borraba TODOS los ScrollTrigger de la página.
    // [TORKA] Una sola vez al entrar en pantalla, con tiempo propio, en vez
    // de amarrado a la rueda (scrub). Con scrub el texto quedaba a medio
    // encender si el usuario dejaba de bajar, y en pantallas anchas parecía
    // trabado. Así siempre termina, a la velocidad que se lee.
    const ctx = gsap.context(() => {
      const wordElements = el.querySelectorAll('.word');
      const desde = { opacity: baseOpacity };
      const hasta = { opacity: 1 };
      if (enableBlur) {
        desde.filter = `blur(${blurStrength}px)`;
        hasta.filter = 'blur(0px)';
      }

      const linea = gsap.timeline({
        paused: true,
        defaults: { ease: 'power2.out' },
        // Al terminar se quitan los filtros: palabras nítidas sin costo de GPU.
        onComplete: () => gsap.set(wordElements, { clearProps: 'filter,willChange' })
      });
      linea.fromTo(el, { transformOrigin: '0% 50%', rotate: baseRotation }, { rotate: 0, duration: 1.2 }, 0);
      linea.fromTo(wordElements, desde, { ...hasta, duration: 0.6, stagger: 0.045 }, 0);

      ScrollTrigger.create({
        trigger: el,
        scroller,
        start: 'top 85%',
        once: true,
        onEnter: () => linea.play()
      });
    }, el);

    return () => ctx.revert();
  }, [scrollContainerRef, enableBlur, baseRotation, baseOpacity, blurStrength]);

  return (
    // [TORKA] El original anidaba <p> dentro de <h2> (HTML inválido).
    <Etiqueta ref={containerRef} className={`my-5 ${containerClassName}`}>
      <span className={`block text-[clamp(1.6rem,4vw,3rem)] leading-[1.5] font-semibold ${textClassName}`}>{splitText}</span>
    </Etiqueta>
  );
};

export default ScrollReveal;

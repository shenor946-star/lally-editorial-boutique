import { useEffect, useRef } from "react";

/**
 * Moves the target element vertically as the page scrolls.
 * The wrapper (ref) is measured; the first child is transformed, so the
 * measurement never feeds back into itself. Phones get a lighter effect,
 * and reduced-motion users get none.
 */
export function useParallax<T extends HTMLElement>(speed = 0.15) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const wrap = ref.current;
    const target = wrap?.firstElementChild as HTMLElement | null;
    if (!wrap || !target) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const factor = window.matchMedia("(max-width: 767px)").matches ? speed * 0.4 : speed;

    let raf = 0;
    const update = () => {
      raf = 0;
      const rect = wrap.getBoundingClientRect();
      if (rect.bottom < -200 || rect.top > window.innerHeight + 200) return;
      const offset = rect.top + rect.height / 2 - window.innerHeight / 2;
      target.style.transform = `translate3d(0, ${(-offset * factor).toFixed(1)}px, 0)`;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    target.style.willChange = "transform";
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [speed]);

  return ref;
}

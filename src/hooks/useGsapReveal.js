import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "../lib/gsap";

export function useGsapReveal(options = {}) {
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current) return undefined;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ref.current,
        {
          opacity: 0,
          y: options.y ?? 36,
        },
        {
          opacity: 1,
          y: 0,
          duration: options.duration ?? 1,
          ease: "power3.out",
          stagger: options.stagger ?? 0,
          scrollTrigger: {
            trigger: ref.current,
            start: options.start ?? "top 85%",
            once: true,
          },
        },
      );
    }, ref);

    return () => {
      ctx.revert();
      ScrollTrigger.refresh();
    };
  }, [options.duration, options.stagger, options.start, options.y]);

  return ref;
}

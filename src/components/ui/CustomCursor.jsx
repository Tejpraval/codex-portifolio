import { useEffect, useMemo, useRef, useState } from "react";
import { gsap } from "../../lib/gsap";
import { useGlobalMouse } from "../../hooks/useGlobalMouse";
import { useReducedMotion } from "../../hooks/useReducedMotion";

export function CustomCursor() {
  const { mouse, isPointerActive, isTouchDevice } = useGlobalMouse();
  const reducedMotion = useReducedMotion();
  const cursorRef = useRef(null);
  const glowRef = useRef(null);
  const trailRefs = useRef([]);
  const [hoveringInteractive, setHoveringInteractive] = useState(false);

  const trail = useMemo(() => new Array(6).fill(null), []);

  useEffect(() => {
    if (isTouchDevice || reducedMotion) return undefined;

    const handleOver = (event) => {
      const target = event.target.closest("a, button, [data-interactive='true']");
      setHoveringInteractive(Boolean(target));
    };

    document.body.classList.add("has-custom-cursor");
    window.addEventListener("pointerover", handleOver);

    return () => {
      document.body.classList.remove("has-custom-cursor");
      window.removeEventListener("pointerover", handleOver);
    };
  }, [isTouchDevice, reducedMotion]);

  useEffect(() => {
    if (isTouchDevice || reducedMotion || !cursorRef.current) return undefined;

    let frame = 0;
    const tick = () => {
      const { x, y, velocity } = mouse.current;

      gsap.to(cursorRef.current, {
        x,
        y,
        scale: hoveringInteractive ? 1.35 : 1,
        opacity: isPointerActive ? 1 : 0,
        duration: 0.3,
        ease: "power3.out",
      });

      gsap.to(glowRef.current, {
        x,
        y,
        scale: hoveringInteractive ? 1.18 : 1,
        opacity: isPointerActive ? 0.72 : 0,
        duration: 0.42,
        ease: "power3.out",
      });

      trailRefs.current.forEach((node, index) => {
        if (!node) return;
        gsap.to(node, {
          x,
          y,
          scale: 1 - index * 0.06 + velocity * 0.04,
          opacity: Math.max(0.06, 0.28 - index * 0.04),
          duration: 0.34 + index * 0.06,
          ease: "power3.out",
        });
      });

      frame = window.requestAnimationFrame(tick);
    };

    frame = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(frame);
  }, [hoveringInteractive, isPointerActive, isTouchDevice, mouse, reducedMotion]);

  if (isTouchDevice || reducedMotion) return null;

  return (
    <>
      <div ref={glowRef} className="custom-cursor-glow" />
      {trail.map((_, index) => (
        <div
          key={index}
          ref={(node) => {
            trailRefs.current[index] = node;
          }}
          className="custom-cursor-trail"
        />
      ))}
      <div ref={cursorRef} className="custom-cursor-core" />
    </>
  );
}

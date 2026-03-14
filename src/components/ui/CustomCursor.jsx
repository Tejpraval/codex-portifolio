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

    const glowXTo = gsap.quickTo(glowRef.current, "x", {
      duration: 0.14,
      ease: "power2.out",
    });
    const glowYTo = gsap.quickTo(glowRef.current, "y", {
      duration: 0.14,
      ease: "power2.out",
    });
    const trailSetters = trailRefs.current.map((node, index) =>
      node
        ? {
            xTo: gsap.quickTo(node, "x", {
              duration: 0.12 + index * 0.025,
              ease: "power2.out",
            }),
            yTo: gsap.quickTo(node, "y", {
              duration: 0.12 + index * 0.025,
              ease: "power2.out",
            }),
          }
        : null,
    );

    let frame = 0;
    const tick = () => {
      const { x, y, velocity } = mouse.current;

      gsap.set(cursorRef.current, { x, y });
      glowXTo(x);
      glowYTo(y);

      gsap.set(cursorRef.current, {
        scale: hoveringInteractive ? 1.35 : 1,
        opacity: isPointerActive ? 1 : 0,
      });

      gsap.set(glowRef.current, {
        scale: hoveringInteractive ? 1.18 : 1,
        opacity: isPointerActive ? 0.72 : 0,
      });

      trailRefs.current.forEach((node, index) => {
        if (!node || !trailSetters[index]) return;
        trailSetters[index].xTo(x);
        trailSetters[index].yTo(y);
        gsap.set(node, {
          scale: 1 - index * 0.06 + velocity * 0.04,
          opacity: isPointerActive ? Math.max(0.06, 0.28 - index * 0.04) : 0,
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

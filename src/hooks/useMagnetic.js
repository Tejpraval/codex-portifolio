import { useEffect, useRef } from "react";
import { gsap } from "../lib/gsap";
import { useGlobalMouse } from "./useGlobalMouse";

export function useMagnetic({ strength = 0.3, textStrength = 0.45 } = {}) {
  const ref = useRef(null);
  const innerRef = useRef(null);
  const { isTouchDevice } = useGlobalMouse();

  useEffect(() => {
    const node = ref.current;
    if (!node || isTouchDevice) return undefined;

    const handleMove = (event) => {
      const bounds = node.getBoundingClientRect();
      const x = event.clientX - bounds.left - bounds.width / 2;
      const y = event.clientY - bounds.top - bounds.height / 2;

      gsap.to(node, {
        x: x * strength,
        y: y * strength,
        duration: 0.4,
        ease: "power3.out",
      });

      if (innerRef.current) {
        gsap.to(innerRef.current, {
          x: x * textStrength,
          y: y * textStrength,
          duration: 0.45,
          ease: "power3.out",
        });
      }
    };

    const reset = () => {
      gsap.to(node, { x: 0, y: 0, duration: 0.5, ease: "elastic.out(1, 0.45)" });
      if (innerRef.current) {
        gsap.to(innerRef.current, { x: 0, y: 0, duration: 0.5, ease: "elastic.out(1, 0.45)" });
      }
    };

    node.addEventListener("pointermove", handleMove);
    node.addEventListener("pointerleave", reset);

    return () => {
      node.removeEventListener("pointermove", handleMove);
      node.removeEventListener("pointerleave", reset);
    };
  }, [isTouchDevice, strength, textStrength]);

  return { ref, innerRef };
}

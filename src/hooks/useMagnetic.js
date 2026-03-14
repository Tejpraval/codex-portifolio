import { useEffect, useRef } from "react";
import { gsap } from "../lib/gsap";
import { useGlobalMouse } from "./useGlobalMouse";

export function useMagnetic({ strength = 0.16, textStrength = 0.22 } = {}) {
  const ref = useRef(null);
  const innerRef = useRef(null);
  const { isTouchDevice } = useGlobalMouse();

  useEffect(() => {
    const node = ref.current;
    if (!node || isTouchDevice) return undefined;

    const reset = () => {
      gsap.killTweensOf(node);
      gsap.to(node, { x: 0, y: 0, duration: 0.28, ease: "power3.out" });

      if (innerRef.current) {
        gsap.killTweensOf(innerRef.current);
        gsap.to(innerRef.current, { x: 0, y: 0, duration: 0.28, ease: "power3.out" });
      }
    };

    const handleMove = (event) => {
      const bounds = node.getBoundingClientRect();
      const x = event.clientX - bounds.left - bounds.width / 2;
      const y = event.clientY - bounds.top - bounds.height / 2;

      gsap.to(node, {
        x: x * strength,
        y: y * strength,
        duration: 0.52,
        ease: "power3.out",
      });

      if (innerRef.current) {
        gsap.to(innerRef.current, {
          x: x * textStrength,
          y: y * textStrength,
          duration: 0.58,
          ease: "power3.out",
        });
      }
    };

    node.addEventListener("pointermove", handleMove);
    node.addEventListener("pointerleave", reset);
    node.addEventListener("pointerup", reset);
    node.addEventListener("pointercancel", reset);
    node.addEventListener("blur", reset);

    return () => {
      node.removeEventListener("pointermove", handleMove);
      node.removeEventListener("pointerleave", reset);
      node.removeEventListener("pointerup", reset);
      node.removeEventListener("pointercancel", reset);
      node.removeEventListener("blur", reset);
    };
  }, [isTouchDevice, strength, textStrength]);

  return { ref, innerRef };
}

import { useEffect, useRef } from "react";
import { gsap } from "../lib/gsap";
import { useGlobalMouse } from "./useGlobalMouse";

export function useTiltCard({ maxRotate = 8, depth = 14 } = {}) {
  const ref = useRef(null);
  const glareRef = useRef(null);
  const { isTouchDevice } = useGlobalMouse();

  useEffect(() => {
    const node = ref.current;
    if (!node || isTouchDevice) return undefined;

    gsap.set(node, {
      transformPerspective: 1200,
      transformOrigin: "center",
      willChange: "transform",
    });

    const rotateToX = gsap.quickTo(node, "rotationX", {
      duration: 0.22,
      ease: "power2.out",
    });
    const rotateToY = gsap.quickTo(node, "rotationY", {
      duration: 0.22,
      ease: "power2.out",
    });
    const depthTo = gsap.quickTo(node, "z", {
      duration: 0.28,
      ease: "power2.out",
    });
    const opacityTo = glareRef.current
      ? gsap.quickTo(glareRef.current, "opacity", {
          duration: 0.2,
          ease: "power2.out",
        })
      : null;

    const handleMove = (event) => {
      const tiltScale = 0.72;
      const bounds = node.getBoundingClientRect();
      const px = (event.clientX - bounds.left) / bounds.width;
      const py = (event.clientY - bounds.top) / bounds.height;
      const rotateY = (px - 0.5) * maxRotate * 2 * tiltScale;
      const rotateX = (0.5 - py) * maxRotate * 2 * tiltScale;

      rotateToX(rotateX);
      rotateToY(rotateY);
      depthTo(depth * 0.7);

      if (glareRef.current) {
        glareRef.current.style.background = `radial-gradient(circle at ${px * 100}% ${py * 100}%, rgba(255,122,24,0.28), transparent 42%)`;
        opacityTo?.(1);
      }
    };

    const reset = () => {
      rotateToX(0);
      rotateToY(0);
      depthTo(0);
      if (glareRef.current) {
        opacityTo?.(0.3);
      }
    };

    node.addEventListener("pointermove", handleMove);
    node.addEventListener("pointerleave", reset);

    return () => {
      node.removeEventListener("pointermove", handleMove);
      node.removeEventListener("pointerleave", reset);
      gsap.set(node, { clearProps: "willChange" });
    };
  }, [depth, isTouchDevice, maxRotate]);

  return { ref, glareRef };
}

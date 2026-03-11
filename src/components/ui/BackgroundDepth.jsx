import { useEffect, useRef } from "react";
import { useGlobalMouse } from "../../hooks/useGlobalMouse";
import { useReducedMotion } from "../../hooks/useReducedMotion";

export function BackgroundDepth() {
  const { mouse } = useGlobalMouse();
  const reducedMotion = useReducedMotion();
  const layerARef = useRef(null);
  const layerBRef = useRef(null);
  const layerCRef = useRef(null);

  useEffect(() => {
    if (reducedMotion) return undefined;

    let frame = 0;

    const update = () => {
      const { normalizedX, normalizedY, velocity } = mouse.current;
      if (layerARef.current) {
        layerARef.current.style.transform = `translate3d(${normalizedX * 18}px, ${normalizedY * 18}px, 0)`;
      }
      if (layerBRef.current) {
        layerBRef.current.style.transform = `translate3d(${normalizedX * -28}px, ${normalizedY * -28}px, 0)`;
      }
      if (layerCRef.current) {
        layerCRef.current.style.transform = `translate3d(${normalizedX * 42}px, ${normalizedY * 26}px, 0) scale(${1 + velocity * 0.02})`;
      }
      frame = window.requestAnimationFrame(update);
    };

    frame = window.requestAnimationFrame(update);
    return () => window.cancelAnimationFrame(frame);
  }, [mouse, reducedMotion]);

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <div ref={layerARef} className="depth-layer depth-layer-a" />
      <div ref={layerBRef} className="depth-layer depth-layer-b" />
      <div ref={layerCRef} className="depth-layer depth-layer-c" />
    </div>
  );
}

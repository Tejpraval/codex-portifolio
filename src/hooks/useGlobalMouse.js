import { createContext, createElement, useContext, useEffect, useMemo, useRef, useState } from "react";

const MouseContext = createContext(null);

export function MouseProvider({ children }) {
  const frame = useRef(0);
  const target = useRef({ x: 0, y: 0, normalizedX: 0, normalizedY: 0, velocity: 0 });
  const current = useRef({ x: 0, y: 0, normalizedX: 0, normalizedY: 0, velocity: 0 });
  const [state, setState] = useState({
    isPointerActive: false,
    isTouchDevice: false,
  });

  useEffect(() => {
    const isTouchDevice =
      window.matchMedia("(pointer: coarse)").matches || navigator.maxTouchPoints > 0;

    const update = () => {
      const smoothing = 0.12;

      current.current.x += (target.current.x - current.current.x) * smoothing;
      current.current.y += (target.current.y - current.current.y) * smoothing;
      current.current.normalizedX +=
        (target.current.normalizedX - current.current.normalizedX) * smoothing;
      current.current.normalizedY +=
        (target.current.normalizedY - current.current.normalizedY) * smoothing;
      current.current.velocity += (target.current.velocity - current.current.velocity) * 0.16;
      document.documentElement.style.setProperty("--mx", `${current.current.normalizedX}`);
      document.documentElement.style.setProperty("--my", `${current.current.normalizedY}`);
      document.documentElement.style.setProperty("--mv", `${current.current.velocity}`);

      frame.current = window.requestAnimationFrame(update);
    };

    const handleMove = (event) => {
      const normalizedX = event.clientX / window.innerWidth - 0.5;
      const normalizedY = event.clientY / window.innerHeight - 0.5;
      const velocity = Math.hypot(event.movementX ?? 0, event.movementY ?? 0);

      target.current = {
        x: event.clientX,
        y: event.clientY,
        normalizedX,
        normalizedY,
        velocity: Math.min(velocity / 60, 1.4),
      };

      setState((prev) =>
        prev.isPointerActive && prev.isTouchDevice === isTouchDevice
          ? prev
          : { ...prev, isPointerActive: true, isTouchDevice },
      );
    };

    const handleLeave = () =>
      setState((prev) => (prev.isPointerActive ? { ...prev, isPointerActive: false } : prev));
    const handleVisibility = () => {
      if (document.hidden) {
        cancelAnimationFrame(frame.current);
      } else {
        frame.current = window.requestAnimationFrame(update);
      }
    };

    frame.current = window.requestAnimationFrame(update);
    window.addEventListener("pointermove", handleMove, { passive: true });
    window.addEventListener("pointerleave", handleLeave);
    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      cancelAnimationFrame(frame.current);
      window.removeEventListener("pointermove", handleMove);
      window.removeEventListener("pointerleave", handleLeave);
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, []);

  const value = useMemo(
    () => ({
      mouse: current,
      ...state,
    }),
    [state],
  );
  return createElement(MouseContext.Provider, { value }, children);
}

export function useGlobalMouse() {
  const context = useContext(MouseContext);
  if (!context) {
    throw new Error("useGlobalMouse must be used within MouseProvider");
  }
  return context;
}

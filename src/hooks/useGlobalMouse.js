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
    const POSITION_SMOOTHING = 0.055;
    const VELOCITY_SMOOTHING = 0.075;
    const MOTION_SCALE = 0.48;
    const MAX_VELOCITY = 0.55;

    const isTouchDevice =
      window.matchMedia("(pointer: coarse)").matches || navigator.maxTouchPoints > 0;

    const update = () => {
      current.current.x += (target.current.x - current.current.x) * POSITION_SMOOTHING;
      current.current.y += (target.current.y - current.current.y) * POSITION_SMOOTHING;
      current.current.normalizedX +=
        (target.current.normalizedX - current.current.normalizedX) * POSITION_SMOOTHING;
      current.current.normalizedY +=
        (target.current.normalizedY - current.current.normalizedY) * POSITION_SMOOTHING;
      current.current.velocity +=
        (target.current.velocity - current.current.velocity) * VELOCITY_SMOOTHING;
      document.documentElement.style.setProperty("--mx", `${current.current.normalizedX}`);
      document.documentElement.style.setProperty("--my", `${current.current.normalizedY}`);
      document.documentElement.style.setProperty("--mv", `${current.current.velocity}`);

      frame.current = window.requestAnimationFrame(update);
    };

    const handleMove = (event) => {
      const normalizedX = (event.clientX / window.innerWidth - 0.5) * MOTION_SCALE;
      const normalizedY = (event.clientY / window.innerHeight - 0.5) * MOTION_SCALE;
      const velocity = Math.hypot(event.movementX ?? 0, event.movementY ?? 0);

      target.current = {
        x: event.clientX,
        y: event.clientY,
        normalizedX,
        normalizedY,
        velocity: Math.min(velocity / 140, MAX_VELOCITY),
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

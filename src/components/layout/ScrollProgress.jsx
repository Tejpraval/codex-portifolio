import { useEffect, useState } from "react";

export function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      const ratio = scrollable > 0 ? window.scrollY / scrollable : 0;
      setProgress(ratio * 100);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="fixed left-0 top-0 z-[60] h-1 w-full bg-transparent">
      <div
        className="h-full bg-gradient-to-r from-brandSoft via-brand to-[#ffd2af] shadow-[0_0_24px_rgba(255,122,24,0.55)] transition-[width] duration-150"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}

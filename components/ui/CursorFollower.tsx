"use client";
import { useEffect, useRef } from "react";

export default function CursorFollower() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;
    let mx = 0,
      my = 0,
      rx = 0,
      ry = 0,
      id = 0;
    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      dot.style.left = mx + "px";
      dot.style.top = my + "px";
    };
    const animate = () => {
      rx += (mx - rx) * 0.1;
      ry += (my - ry) * 0.1;
      ring.style.left = rx + "px";
      ring.style.top = ry + "px";
      id = requestAnimationFrame(animate);
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    id = requestAnimationFrame(animate);
    const onOver = (e: MouseEvent) => {
      if ((e.target as HTMLElement).closest("a,button")) {
        ring.style.width = "48px";
        ring.style.height = "48px";
        ring.style.opacity = ".45";
      }
    };
    const onOut = (e: MouseEvent) => {
      if ((e.target as HTMLElement).closest("a,button")) {
        ring.style.width = "30px";
        ring.style.height = "30px";
        ring.style.opacity = "1";
      }
    };
    document.addEventListener("mouseover", onOver);
    document.addEventListener("mouseout", onOut);
    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
      cancelAnimationFrame(id);
    };
  }, []);
  return (
    <>
      <div ref={dotRef} className="cursor-dot hidden md:block" />
      <div ref={ringRef} className="cursor-ring hidden md:block" />
    </>
  );
}

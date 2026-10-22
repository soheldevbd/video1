"use client";
import { useEffect, useRef } from "react";
import { drawGs } from "../lib/gs";

// Lazy thumbnail: screen-e ashle ekbar ekta frame ankey
export default function Thumb({ style, pal, energy, seed }: { style: string; pal: number; energy: number; seed: number }) {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const c = ref.current!; let done = false;
    const go = () => { if (done) return; done = true; drawGs(c.getContext("2d"), c.width, c.height, 0.33, seed, { style, pal, energy }); };
    const io = new IntersectionObserver((es) => { if (es.some((e) => e.isIntersecting)) { go(); io.disconnect(); } }, { rootMargin: "200px" });
    io.observe(c);
    return () => io.disconnect();
  }, [style, pal, energy, seed]);
  return <canvas ref={ref} width={256} height={144} style={{ width: "100%", display: "block", borderRadius: 8, background: "#00ff00" }} />;
}

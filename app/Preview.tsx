"use client";
import { useEffect, useRef } from "react";
import { drawGs, NICHES } from "../lib/gs";

export default function Preview({ offset = 0 }: { offset?: number }) {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const ctx = ref.current!.getContext("2d");
    let raf = 0; const t0 = performance.now();
    const tick = (t: number) => {
      const el = (t - t0) / 1000 / 5, cyc = Math.floor(el), n = NICHES[(cyc * 37 + offset * 53) % NICHES.length]; // 5 sec e notun niche
      drawGs(ctx, 640, 360, (((t - t0) / 1000) / 10) % 1, 900 + cyc, { style: n.style, pal: n.pal, energy: n.energy });
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [offset]);
  return <canvas ref={ref} width={640} height={360} style={{ width: "100%", borderRadius: 10, display: "block" }} />;
}

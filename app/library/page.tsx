"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import Thumb from "../Thumb";
import { drawGs, NICHES, CATS, PAL, STYLES } from "../../lib/gs";
import { makeMeta } from "../../lib/meta";
import { card, sel, label, tab, btn, wrap, fileSlug } from "../../lib/ui";

const SIZES = [
  { label: "16:9 · 4K", sub: "3840×2160", w: 3840, h: 2160 },
  { label: "9:16 · Vertical 4K", sub: "2160×3840", w: 2160, h: 3840 },
  { label: "1:1 · Square", sub: "2160×2160", w: 2160, h: 2160 },
  { label: "16:9 · 1080p", sub: "1920×1080", w: 1920, h: 1080 },
];
const DURS = [10, 20, 30];
const ENERGY = ["Calm", "Normal", "Fast"];
const PAGE = 60;
const rnd = () => Math.floor(Math.random() * 1e9);

export default function Library() {
  const ref = useRef<HTMLCanvasElement>(null);
  const top = useRef<HTMLDivElement>(null);
  const [sel0, setSel] = useState(0);            // NICHES index
  const [seed, setSeed] = useState(() => 4242);
  const [energy, setEnergy] = useState(NICHES[0].energy);
  const [size, setSize] = useState(0);
  const [dur, setDur] = useState(10);
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("All");
  const [shown, setShown] = useState(PAGE);
  const [busy, setBusy] = useState(false);
  const [pct, setPct] = useState(0);
  const [title, setTitle] = useState("");
  const [kw, setKw] = useState("");
  const [copied, setCopied] = useState("");
  const n = NICHES[sel0];
  const { w, h } = SIZES[size];
  const k = 1280 / Math.max(w, h);
  const pw = Math.round(w * k), ph = Math.round(h * k);

  const choose = (i: number, scroll = true) => { setSel(i); setEnergy(NICHES[i].energy); setSeed(rnd()); if (scroll) top.current?.scrollIntoView({ behavior: "smooth", block: "start" }); };
  useEffect(() => {
    const sp = new URLSearchParams(window.location.search), c = sp.get("cat"), id = sp.get("niche");
    if (c && CATS.includes(c)) setCat(c);
    if (id != null && NICHES[Number(id)]) choose(Number(id), false);
  }, []);
  useEffect(() => { setShown(PAGE); }, [q, cat]);

  const list = useMemo(() => {
    const s = q.trim().toLowerCase();
    return NICHES.map((x, i) => ({ x, i })).filter(({ x }) => (cat === "All" || x.cat === cat) && (!s || x.name.toLowerCase().includes(s)));
  }, [q, cat]);

  const meta = useMemo(() => makeMeta(n.name, n.style, n.cat, SIZES[size].sub), [sel0, size]);
  useEffect(() => { setTitle(meta.title); setKw(meta.keywords.join(", ")); }, [meta]);

  useEffect(() => {
    const ctx = ref.current!.getContext("2d");
    let raf = 0; const t0 = performance.now();
    const tick = (t: number) => { drawGs(ctx, pw, ph, (((t - t0) / 1000) / 10) % 1, seed, { style: n.style, pal: n.pal, energy }); raf = requestAnimationFrame(tick); };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [sel0, seed, energy, pw, ph]);

  async function download() {
    setBusy(true); setPct(0);
    try {
      const body = { seed, w, h, dur, style: n.style, pal: n.pal, energy, title, keywords: kw };
      const { id, error } = await (await fetch("/api/render", { method: "POST", body: JSON.stringify(body) })).json();
      if (error) throw new Error(error);
      for (;;) {
        await new Promise((r) => setTimeout(r, 1500));
        const j = await (await fetch(`/api/render?id=${id}`)).json();
        if (j.error) throw new Error(j.error);
        setPct(Math.round((j.frame / j.total) * 100));
        if (j.status === "done") { window.location.href = `/api/render?id=${id}&download=1`; break; }
      }
    } catch (e: any) { alert("Error: " + e.message); }
    setBusy(false);
  }
  const copy = async (what: string, text: string) => { await navigator.clipboard.writeText(text); setCopied(what); setTimeout(() => setCopied(""), 1500); };
  const kwCount = kw.split(",").map((s) => s.trim()).filter(Boolean).length;
  const ta = { ...card, width: "100%", boxSizing: "border-box", color: "#e8eef4", padding: 10, fontSize: 14, fontFamily: "inherit" } as const;

  return (
    <main style={{ ...wrap, padding: "32px 20px" }}>
      <div ref={top} style={{ scrollMarginTop: 80 }} />
      <h1 style={{ marginTop: 0 }}>{n.name} <span style={{ fontSize: 15, color: "#7e8b99", fontWeight: 400 }}>· #{sel0 + 1} of {NICHES.length} · {n.cat}</span></h1>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(340px,1fr))", gap: 20 }}>
        <div style={{ ...card, padding: 12, textAlign: "center" }}>
          <canvas ref={ref} width={pw} height={ph} style={{ maxWidth: "100%", maxHeight: "60vh", borderRadius: 8 }} />
        </div>
        <div>
          <label style={label}>Energy</label>
          <div style={{ display: "flex", gap: 8, marginBottom: 14 }}>{ENERGY.map((x, i) => <button key={x} onClick={() => setEnergy(i + 1)} disabled={busy} style={tab(energy === i + 1)}>{x}</button>)}</div>
          <label style={label}>Video size</label>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 14 }}>{SIZES.map((s, i) => <button key={i} onClick={() => setSize(i)} disabled={busy} style={tab(i === size)}>{s.label}</button>)}</div>
          <label style={label}>Duration (seamless loop)</label>
          <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>{DURS.map((d) => <button key={d} onClick={() => setDur(d)} disabled={busy} style={tab(d === dur)}>{d} second</button>)}</div>
          <button onClick={() => setSeed(rnd())} disabled={busy} style={{ ...btn("#1d2630"), marginRight: 10 }}>🎲 Notun variation</button>
          <button onClick={download} disabled={busy} style={btn("#00c853")}>{busy ? `Render hocche... ${pct}%` : `⬇ Download ${SIZES[size].sub} .MOV`}</button>
          <p style={{ color: "#7e8b99", fontSize: 13 }}>File name: <code>{fileSlug(title)}-xxxx.mov</code></p>
        </div>
      </div>

      <div style={{ ...card, padding: 20, marginTop: 20 }}>
        <h3 style={{ marginTop: 0 }}>Stock title & keywords</h3>
        <label style={label}>Title ({title.length}/200)</label>
        <textarea style={ta} rows={2} value={title} maxLength={200} onChange={(e) => setTitle(e.target.value)} />
        <button style={{ ...btn("#1d2630"), marginTop: 6 }} onClick={() => copy("t", title)}>{copied === "t" ? "Copied ✓" : "Copy title"}</button>
        <label style={{ ...label, marginTop: 14 }}>Keywords ({kwCount}/49)</label>
        <textarea style={ta} rows={3} value={kw} onChange={(e) => setKw(e.target.value)} />
        <button style={{ ...btn("#1d2630"), marginTop: 6 }} onClick={() => copy("k", kw)}>{copied === "k" ? "Copied ✓" : "Copy keywords"}</button>
      </div>

      <h2 style={{ marginTop: 36 }}>Library <span style={{ fontSize: 15, color: "#7e8b99", fontWeight: 400 }}>· {list.length} niches</span></h2>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 10, alignItems: "center", marginBottom: 14 }}>
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search... (jemon gold, rain, frame)" style={{ ...sel, minWidth: 260 }} />
        <select style={sel} value={cat} onChange={(e) => setCat(e.target.value)}>
          <option value="All">All categories</option>{CATS.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>
        <span style={{ color: "#7e8b99", fontSize: 13 }}>{STYLES.length} styles × {PAL.length} colors</span>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(190px,1fr))", gap: 12 }}>
        {list.slice(0, shown).map(({ x, i }) => (
          <button key={x.id} onClick={() => choose(i)} style={{ ...card, padding: 8, cursor: "pointer", textAlign: "left", color: "#e8eef4", borderColor: i === sel0 ? "#00c853" : "#1d2630" }}>
            <Thumb style={x.style} pal={x.pal} energy={x.energy} seed={1000 + i} />
            <div style={{ fontSize: 13, fontWeight: 600, marginTop: 8 }}>{x.name}</div>
            <div style={{ fontSize: 12, color: "#7e8b99" }}>#{i + 1} · {x.cat}</div>
          </button>
        ))}
      </div>
      {shown < list.length && <p style={{ textAlign: "center", marginTop: 20 }}><button style={btn("#1d2630")} onClick={() => setShown(shown + PAGE)}>Load more ({list.length - shown} baki)</button></p>}
      {list.length === 0 && <p style={{ color: "#7e8b99" }}>Kono niche pawa jay nai.</p>}
    </main>
  );
}

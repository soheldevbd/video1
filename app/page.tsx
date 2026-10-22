import Link from "next/link";
import Preview from "./Preview";
import { NICHES, STYLES, CATS, PAL } from "../lib/gs";
import { card, wrap, btn } from "../lib/ui";

const FEATURES = [
  ["🟩", "Pure #008000  background", "Prottek frame-e background hubohu chroma green. Element-e kono green hue nei, tai keying-e kete jay na."],
  ["🔁", "Seamless loops", "10, 20 ba 30 second er loop. Shuru ar sesh frame hubohu mile jay."],
  ["🏷️", "SEO title & keywords", "Title ar 49 ta keyword auto toiri, .mov metadata-te likha, file name-o SEO-friendly."],
  ["📐", "4K, 1080p, 9:16, 1:1", "CBR high bitrate .MOV. Boro file size, Adobe Stock-er quality shorto mete."],
  ["🔎", "Search ar filter", "500 niche-er moddhe naam diye search, category diye filter, thumbnail dekhe bachho."],
  ["🎲", "Notun variation", "Ekoi niche-er onek variation: seed bodle position ar timing alada."],
];

export default function Home() {
  const cats = CATS.map((c) => ({ c, n: NICHES.filter((x) => x.cat === c).length }));
  return (
    <main>
      <section style={{ ...wrap, textAlign: "center", padding: "68px 20px 28px" }}>
        <p style={{ color: "#7e8b99", margin: 0 }}>{NICHES.length} niches · {STYLES.length} animation styles · {PAL.length} colors · 4K</p>
        <h1 style={{ fontSize: "clamp(32px,5vw,54px)", margin: "12px 0", lineHeight: 1.1 }}>500 green screen motion video,<br />ek click-e download</h1>
        <p style={{ color: "#b6c2cf", maxWidth: 640, margin: "0 auto 26px", lineHeight: 1.6 }}>AI chara, code diye toiri chroma key element: stars, icons, frames, charts, VFX, celebration, doodle. Title ar keyword shoho Adobe Stock-er jonno ready.</p>
        <Link href="/library" style={{ ...btn("#00c853"), marginRight: 12 }}>Browse 500 niches</Link>
        <Link href="/guide" style={btn("#1d2630")}>Read the guide</Link>
      </section>

      <section style={{ ...wrap, display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: 16, padding: "16px 20px" }}>
        <div style={{ ...card, padding: 10 }}><Preview offset={0} /><p style={{ margin: "8px 4px 0", color: "#7e8b99", fontSize: 13 }}>Live preview</p></div>
        <div style={{ ...card, padding: 10 }}><Preview offset={3} /><p style={{ margin: "8px 4px 0", color: "#7e8b99", fontSize: 13 }}>Live preview</p></div>
      </section>

      <section style={{ ...wrap, padding: "40px 20px 0" }}>
        <h2>8 category</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))", gap: 14 }}>
          {cats.map(({ c, n }) => (
            <Link key={c} href={`/library?cat=${encodeURIComponent(c)}`} style={{ ...card, padding: 18, color: "#e8eef4", textDecoration: "none" }}>
              <div style={{ fontWeight: 700 }}>{c}</div><div style={{ color: "#7e8b99", fontSize: 14, marginTop: 4 }}>{n} niches</div>
            </Link>
          ))}
        </div>
      </section>

      <section style={{ ...wrap, padding: "40px 20px 0" }}>
        <h2>Everything you need</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: 16 }}>
          {FEATURES.map(([i, t, d]) => (<div key={t} style={{ ...card, padding: 20 }}><div style={{ fontSize: 28 }}>{i}</div><h3 style={{ margin: "8px 0" }}>{t}</h3><p style={{ margin: 0, color: "#b6c2cf", lineHeight: 1.6 }}>{d}</p></div>))}
        </div>
      </section>
    </main>
  );
}

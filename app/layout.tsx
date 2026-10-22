import Link from "next/link";
import { wrap } from "../lib/ui";
export const metadata = { title: "ChromaVault – 500 Green Screen Motion Videos", description: "Generate 4K green screen (chroma key) motion elements: 500 niches, SEO title and keywords, ready for stock." };
const link = { color: "#b6c2cf", textDecoration: "none", marginLeft: 24, fontSize: 15 } as const;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="bn">
      <body style={{ margin: 0, fontFamily: "system-ui, sans-serif", background: "#0a0f14", color: "#e8eef4", minHeight: "100vh", display: "flex", flexDirection: "column" }}>
        <header style={{ position: "sticky", top: 0, zIndex: 10, background: "rgba(10,15,20,.9)", backdropFilter: "blur(8px)", borderBottom: "1px solid #1d2630" }}>
          <nav style={{ ...wrap, height: 62, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <Link href="/" style={{ textDecoration: "none", fontWeight: 800, fontSize: 19, letterSpacing: -0.3 }}>
              <span style={{ background: "linear-gradient(135deg,#00e676,#00b0ff)", WebkitBackgroundClip: "text", color: "transparent" }}>▣ ChromaVault</span>
            </Link>
            <div style={{ display: "flex", alignItems: "center" }}>
              <Link href="/" style={link}>Home</Link>
              <Link href="/library" style={link}>Library</Link>
              <Link href="/guide" style={link}>Guide</Link>
              <Link href="/library" style={{ ...link, background: "#00c853", color: "#04140a", fontWeight: 700, padding: "8px 16px", borderRadius: 10 }}>Browse 500</Link>
            </div>
          </nav>
        </header>
        <div style={{ flex: 1 }}>{children}</div>
        <footer style={{ borderTop: "1px solid #1d2630", marginTop: 56, padding: "28px 0", color: "#7e8b99", fontSize: 14 }}>
          <div style={{ ...wrap, display: "flex", flexWrap: "wrap", gap: 12, justifyContent: "space-between" }}>
            <span>© 2026 ChromaVault. Code-generated green screen elements, no AI. Rendered on your own server.</span>
            <span><Link href="/library" style={{ ...link, marginLeft: 0, marginRight: 20, fontSize: 14 }}>Library</Link><Link href="/guide" style={{ ...link, marginLeft: 0, fontSize: 14 }}>Guide</Link></span>
          </div>
        </footer>
      </body>
    </html>
  );
}

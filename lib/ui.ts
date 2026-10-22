export const card = { background: "#10161c", border: "1px solid #1d2630", borderRadius: 14 } as const;
export const sel = { ...card, color: "#e8eef4", padding: "10px 12px", minWidth: 170, fontSize: 15 } as const;
export const label = { display: "block", fontSize: 13, color: "#7e8b99", marginBottom: 6 } as const;
export const wrap = { maxWidth: 1180, margin: "0 auto", padding: "0 20px" } as const;
export const tab = (on: boolean) => ({ ...card, padding: "9px 16px", cursor: "pointer", color: "#fff", fontSize: 14, borderColor: on ? "#00c853" : "#1d2630", background: on ? "#0c2a1a" : "#10161c" } as const);
export const btn = (bg: string) => ({ padding: "11px 22px", borderRadius: 10, border: 0, background: bg, color: bg === "#00c853" ? "#04140a" : "#fff", cursor: "pointer", fontSize: 15, fontWeight: 600, textDecoration: "none", display: "inline-block" } as const);
// SEO file name: title -> lowercase-hyphen-slug (ASCII, max 90 char)
export const fileSlug = (t: string) =>
  (t || "green-screen-video").toLowerCase().normalize("NFKD").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 90).replace(/-+$/, "") || "green-screen-video";

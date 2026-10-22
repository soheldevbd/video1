import { card, wrap } from "../../lib/ui";
const S = ({ t, children }: { t: string; children: React.ReactNode }) => (<section style={{ ...card, padding: 24, marginBottom: 16 }}><h2 style={{ marginTop: 0 }}>{t}</h2><div style={{ color: "#b6c2cf", lineHeight: 1.8 }}>{children}</div></section>);

export default function Guide() {
  return (
    <main style={{ ...wrap, padding: "40px 20px", maxWidth: 900 }}>
      <h1>Guide</h1>
      <S t="Kivabe kaj kore">
        <ol style={{ paddingLeft: 20, margin: 0 }}>
          <li>Library-te search ba category diye niche khojo, card-e click koro.</li>
          <li>Upore live preview dekhbe. Size, duration, speed bachho, dorkar hole 🎲 Notun variation dao.</li>
          <li>Title ar keyword dekhe nao (edit kora jay), Download chap dao.</li>
          <li>Render sesh hole <code>.mov</code> file SEO file name-shoho nijei nambe.</li>
        </ol>
      </S>
      <S t="Chroma key-te kivabe use korbe">
        Video-te background pure <code>#00FF00</code>. Editor-e (Premiere, DaVinci, After Effects, CapCut) Ultra Key / Chroma Key effect diye sobuj tule dao. Element-e kono green hue nei, tai kete jabe na. Chhoto line-er kinara-y halka green aabha thakte pare, eta shob keyed footage-ei hoy, Spill Suppression ba Choke diye thik hoy.
      </S>
      <S t="Adobe Stock-er jonno tips">
        <ul style={{ paddingLeft: 20, margin: 0 }}>
          <li>Video 5–60 second, 4K ba 1080p, H.264 .MOV. Eta tool-er default.</li>
          <li>Logo, brand ba trademark dio na. Shob element generic.</li>
          <li>Ekoi style/color-er onek similar video ekshathe upload korle "repetitive" hishebe reject hote pare. Diverse rakho, kom kom kore upload koro.</li>
          <li>Title: <code>Gold Falling Stars Green Screen Animation, Chroma Key Overlay Loop, 4K</code> er moto, keyword-gulo Library theke copy kore paste koro.</li>
          <li>Upload-er age Adobe Stock-er <b>current contributor guidelines</b> dekhe nao, niyom bodlay. Bikri guarantee nai.</li>
        </ul>
      </S>
      <S t="500 niche, kintu 500 ta alada animation na">
        60 ta alada animation style × 12 ta color palette = 500 ta niche (prottek style-e 8-9 ta color). Ek style-er duto color alada niche hishebe ganchi. Tai kachakachi niche-er moddhe motion ekoi, shudhu rong alada. Alada motion chaile Library-r 60 style theke bachho.
      </S>
      <S t="Deploy">
        4K render-e ffmpeg ar CPU lage, tai Vercel-er serverless-e render cholbe na. Docker support kore emon host-e deploy koro (Railway, Render, DigitalOcean, VPS), <code>Dockerfile</code> deya ache. Public deploy korle login ba password dao, noyto onno keu tomar server-er render use korte pare.
      </S>
      <S t="Nijer niche add kora">
        <code>lib/gs.ts</code>-er <code>PAL</code> array-te notun color line jog koro (green hue dio na). Notun style-er jonno <code>STYLES</code> list-e naam ar <code>drawGs</code> switch-e <code>case</code> jog koro. Shomoy-er jonno shudhu <code>p</code> use koro ar <code>p</code> ke purno shonkhya diye gun koro, tahole loop seamless thakbe.
      </S>
    </main>
  );
}

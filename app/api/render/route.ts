import { createCanvas } from "@napi-rs/canvas";
import { spawn } from "node:child_process";
import { existsSync } from "node:fs";
import { readFile, mkdtemp } from "node:fs/promises";
import { tmpdir } from "node:os";
import { randomUUID } from "node:crypto";
import path from "node:path";
import ffmpegPath from "ffmpeg-static";
import { drawGs, STYLE_IDS, PAL } from "../../../lib/gs";
import { fileSlug } from "../../../lib/ui";

export const runtime = "nodejs";
const FPS = 30, LOOP = 10; // 1 loop = 10 second
const SIZES = [[3840, 2160], [2160, 3840], [2160, 2160], [1920, 1080]];
const DURS = [10, 20, 30]; // loop-er purno gun, tai seamless thake

type Job = { status: "rendering" | "done" | "error"; frame: number; total: number; file?: string; name?: string; error?: string };
const jobs: Map<string, Job> = ((globalThis as any).__cvjobs ??= new Map());

function findFfmpeg(): string {
  const exe = process.platform === "win32" ? "ffmpeg.exe" : "ffmpeg";
  const c = [process.env.FFMPEG_PATH || null, ffmpegPath as string | null, path.join(process.cwd(), "node_modules", "ffmpeg-static", exe)];
  return c.find((p) => p && existsSync(p)) || "ffmpeg"; // shesh option: system ffmpeg
}

async function run(id: string, W: number, H: number, seed: number, o: any, meta: { title: string; kw: string }) {
  const job = jobs.get(id)!;
  job.name = `${fileSlug(meta.title)}-${id.slice(0, 4)}`; // SEO file name
  const fail = (m: string) => { job.status = "error"; job.error = m; };
  const MBPS = W * H > 4e6 ? 80 : 45; // CBR: file size ~= MBPS x seconds / 8
  try {
    const dir = await mkdtemp(path.join(tmpdir(), "cv-"));
    const out = path.join(dir, "out.mov");
    const ff = spawn(findFfmpeg(), [
      "-y", "-f", "rawvideo", "-pix_fmt", "rgba", "-s", `${W}x${H}`, "-r", String(FPS), "-i", "-",
      "-c:v", "libx264", "-preset", "veryfast", "-profile:v", "high", "-b:v", `${MBPS}M`, "-minrate", `${MBPS}M`, "-maxrate", `${MBPS}M`, "-bufsize", `${MBPS * 2}M`, "-x264-params", "nal-hrd=cbr:force-cfr=1", "-pix_fmt", "yuv420p",
      ...(meta.title ? ["-metadata", `title=${meta.title}`, "-metadata", `comment=${meta.kw}`, "-metadata", `keywords=${meta.kw}`] : []),
      "-movflags", "+faststart", out,
    ], { stdio: ["pipe", "ignore", "pipe"] });
    let log = "";
    ff.stderr.on("data", (d) => (log = (log + d).slice(-500)));
    ff.on("error", (e) => fail("ffmpeg chalano jacche na: " + e.message));
    ff.stdin.on("error", () => {});
    const closed = new Promise<number>((res) => ff.on("close", (c) => res(c ?? 1)));
    const canvas = createCanvas(W, H), ctx = canvas.getContext("2d");
    for (let f = 0; f < job.total && job.status === "rendering"; f++) {
      drawGs(ctx, W, H, ((f / FPS) / LOOP) % 1, seed, o);
      if (!ff.stdin.write(canvas.data())) await new Promise((r) => ff.stdin.once("drain", r));
      job.frame = f + 1;
    }
    ff.stdin.end();
    const code = await closed;
    if (job.status === "error") return;
    if (code !== 0) return fail("ffmpeg error: " + log);
    job.file = out; job.status = "done";
  } catch (e: any) { fail(e.message); }
}

export async function POST(req: Request) {
  const b = await req.json();
  const seed = Number(b.seed);
  if (!Number.isFinite(seed) || !STYLE_IDS.includes(b.style)) return Response.json({ error: "style ba seed thik na" }, { status: 400 });
  const [W, H] = SIZES.find(([w, h]) => w === b.w && h === b.h) || SIZES[0];
  const dur = DURS.includes(b.dur) ? b.dur : 10;
  const o = { style: b.style, pal: Number.isInteger(b.pal) && b.pal >= 0 && b.pal < PAL.length ? b.pal : 0, energy: [1, 2, 3].includes(b.energy) ? b.energy : 1 };
  const meta = { title: typeof b.title === "string" ? b.title.slice(0, 200) : "", kw: typeof b.keywords === "string" ? b.keywords.slice(0, 1500) : "" };
  const id = randomUUID();
  jobs.set(id, { status: "rendering", frame: 0, total: dur * FPS });
  run(id, W, H, seed, o, meta); // background e chole
  return Response.json({ id });
}

export async function GET(req: Request) {
  const u = new URL(req.url);
  const job = jobs.get(u.searchParams.get("id") || "");
  if (!job) return Response.json({ error: "job pawa jay nai (server restart hoyeche?)" }, { status: 404 });
  if (u.searchParams.get("download") && job.file) {
    return new Response(await readFile(job.file), { headers: { "Content-Type": "video/quicktime", "Content-Disposition": `attachment; filename="${job.name || "green-screen-video"}.mov"` } });
  }
  return Response.json(job);
}

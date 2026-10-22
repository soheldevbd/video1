// Adobe Stock title + keywords (AI chara, dictionary theke)
const KW: Record<string, string[]> = {
  stars: ["stars", "falling stars", "twinkle", "celebration"], petals: ["petals", "flower petals", "falling petals", "spring", "romantic"], feathers: ["feathers", "floating feather", "light", "soft"],
  planes: ["paper planes", "airplane", "flying", "travel", "origami"], lanterns: ["lanterns", "sky lanterns", "festival", "rising lanterns"], notes: ["music notes", "musical notes", "music", "melody", "song"],
  embers: ["sparks", "embers", "fire sparks", "particles"], clouds: ["clouds", "sky", "weather", "drifting clouds", "cartoon clouds"], birds: ["birds", "flock of birds", "flying birds", "nature"],
  butterflies: ["butterflies", "butterfly", "fluttering", "nature", "spring"], pin: ["location pin", "map pin", "gps", "navigation", "map marker"], wifi: ["wifi", "wireless", "signal", "internet", "connection"],
  battery: ["battery", "charging", "energy", "power", "battery level"], tick: ["checkmark", "success", "tick", "approved", "done", "complete"], cross: ["cross", "error", "wrong", "rejected", "failed"],
  rating: ["star rating", "review", "five stars", "rating", "feedback"], typing: ["typing indicator", "chat", "message", "speech bubble", "messaging"], mail: ["email", "envelope", "mail", "inbox", "newsletter"],
  lock: ["padlock", "unlock", "security", "lock", "privacy"], search: ["magnifying glass", "search", "find", "magnifier", "zoom"], play: ["play button", "video", "media player", "play", "pulse"],
  pie: ["pie chart", "chart", "statistics", "infographic", "data"], trend: ["line graph", "growth", "trend", "chart", "increase", "business"], stairs: ["growth", "steps", "stairs", "success", "progress", "bar chart"],
  streamers: ["streamers", "party", "celebration", "ribbons", "festive"], popper: ["party popper", "confetti", "celebration", "birthday", "party"], trophy: ["trophy", "winner", "award", "champion", "success"],
  crown: ["crown", "king", "queen", "royal", "winner"], gem: ["diamond", "gem", "jewel", "luxury", "sparkle"], bats: ["bats", "halloween", "flying bats", "spooky", "night"],
  ghosts: ["ghosts", "halloween", "spooky", "cute ghost", "floating"], xmaslights: ["christmas lights", "string lights", "holiday lights", "festive", "xmas"], sun: ["sun", "sunshine", "sunny", "summer", "weather"],
  moon: ["moon", "crescent moon", "night", "stars", "ramadan"], bolt: ["lightning", "lightning bolt", "thunder", "electric", "storm"], flames: ["fire", "flames", "burning", "hot", "fire effect"],
  smoke: ["smoke", "smoke puffs", "steam", "cloud", "vfx"], drops: ["water drops", "raindrops", "splash", "water", "liquid"], splash: ["ink splash", "paint splash", "liquid splash", "blob", "colorful"],
  boom: ["comic explosion", "boom", "pop art", "burst", "cartoon explosion"], speedlines: ["speed lines", "anime", "action lines", "manga", "radial lines"], wind: ["wind", "air flow", "breeze", "swirl", "weather"],
  cursor: ["mouse cursor", "click", "pointer", "arrow cursor", "computer"], popshapes: ["shapes", "geometric", "pop", "colorful shapes", "abstract"], scribble: ["scribble", "hand drawn circle", "highlight", "doodle", "circle highlight"],
  underline: ["underline", "squiggle", "hand drawn", "doodle", "text highlight"], doodlearrow: ["arrow", "hand drawn arrow", "doodle arrow", "pointer", "direction"], circleframe: ["circle frame", "round frame", "border", "frame", "ornament"],
  squareframe: ["square frame", "border", "frame", "photo frame", "outline"], starframe: ["star frame", "star border", "frame", "star shape", "outline"], banner: ["ribbon banner", "banner", "label", "title banner", "ribbon"],
  ring: ["progress ring", "loading", "percentage", "circular progress", "loader"], clock: ["clock", "analog clock", "time", "timer", "wall clock"], equalizer: ["equalizer", "audio bars", "sound", "music", "spectrum"],
  dots: ["loading dots", "loading", "bouncing dots", "preloader", "wait"], atom: ["atom", "science", "electrons", "physics", "orbit"], planets: ["planet", "saturn", "space", "orbit", "astronomy"],
  rocket: ["rocket", "launch", "startup", "space", "spaceship"], compass: ["compass", "navigation", "direction", "north", "travel"], hourglass: ["hourglass", "time", "sand timer", "waiting", "deadline"],
};
const GREENKW = ["green screen", "greenscreen", "chroma key", "transparent background", "alpha overlay", "overlay", "effect", "vfx", "isolated", "compositing", "animation", "motion graphics", "video", "footage"];

export function makeMeta(name: string, style: string, cat: string, size: string) {
  const res = size.includes("3840") || size.includes("2160") ? "4K" : "HD";
  const title = `${name} Green Screen Animation, Chroma Key Overlay Loop, ${res}`;
  const words = `${name}`.toLowerCase().replace(/[^a-z0-9 ]/g, " ").split(/\s+/).filter((w) => w.length > 2 && !["and", "the", "for"].includes(w));
  const keywords = Array.from(new Set([name.toLowerCase(), ...words, ...(KW[style] || [style]), cat.toLowerCase().split(" & ")[0], ...GREENKW, "loop", res.toLowerCase()])).slice(0, 49);
  return { title, keywords };
}

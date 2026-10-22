
const nextConfig = {
  serverExternalPackages: ["@napi-rs/canvas", "ffmpeg-static"],

  outputFileTracingIncludes: {
    "/api/render": [
      "./node_modules/ffmpeg-static/**/*",
    ],
  },
};

export default nextConfig;

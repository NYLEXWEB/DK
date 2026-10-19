import type { NextConfig } from "next";
import path from "path";
import fs from "fs";

// Ensure hero background image is copied from uploaded folder to public/images
try {
  const srcFile =
    "C:\\Users\\hnith\\.gemini\\antigravity-ide\\brain\\f6bb96f3-168c-4b61-a6fc-86c9a6f21823\\.user_uploaded\\media_1792439943269.png";
  const destDir = path.join(__dirname, "public", "images");
  const destFile = path.join(destDir, "hero-bg.png");

  if (fs.existsSync(srcFile) && !fs.existsSync(destFile)) {
    if (!fs.existsSync(destDir)) {
      fs.mkdirSync(destDir, { recursive: true });
    }
    fs.copyFileSync(srcFile, destFile);
  }
} catch {
  // Silent fallback
}

const nextConfig: NextConfig = {
  reactStrictMode: true,
  outputFileTracingRoot: path.join(__dirname),
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "utfs.io",
      },
      {
        protocol: "https",
        hostname: "**.ufs.sh",
      },
      {
        protocol: "https",
        hostname: "ufs.sh",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;

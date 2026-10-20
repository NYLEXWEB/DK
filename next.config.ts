import type { NextConfig } from "next";
import path from "path";
import fs from "fs";

// Ensure hero background and generated images are synced to public/images
try {
  const baseBrainDir = "C:\\Users\\hnith\\.gemini\\antigravity-ide\\brain\\b3f5d9e1-c138-4489-951a-9fef11d8b315";
  const imageCopies = [
    { src: "C:\\Users\\hnith\\.gemini\\antigravity-ide\\brain\\f6bb96f3-168c-4b61-a6fc-86c9a6f21823\\.user_uploaded\\media_1792439943269.png", dest: "public/images/hero-bg.png" },
    { src: path.join(baseBrainDir, "bollywood_minimal_1792477540667.jpg"), dest: "public/images/styles/bollywood.jpg" },
    { src: path.join(baseBrainDir, "hiphop_minimal_1792477941428.jpg"), dest: "public/images/styles/hip-hop.jpg" },
    { src: path.join(baseBrainDir, "contemp_minimal_1792477970113.jpg"), dest: "public/images/styles/contemporary.jpg" },
    { src: path.join(baseBrainDir, "lyrical_minimal_1792478036893.jpg"), dest: "public/images/styles/lyrical.jpg" },
    { src: path.join(baseBrainDir, "western_minimal_1792478068803.jpg"), dest: "public/images/styles/western.jpg" },
    { src: path.join(baseBrainDir, "freestyle_min_1792478106389.jpg"), dest: "public/images/styles/freestyle.jpg" },
    { src: path.join(baseBrainDir, "branch_kundu_1792478149898.jpg"), dest: "public/images/branches/kunduparamba.jpg" },
    { src: path.join(baseBrainDir, "branch_westhill_1792478207857.jpg"), dest: "public/images/branches/westhill.jpg" },
    { src: path.join(baseBrainDir, "branch_balus_1792478271333.jpg"), dest: "public/images/branches/balussery.jpg" },
    { src: path.join(baseBrainDir, "branch_kott_1792478320459.jpg"), dest: "public/images/branches/kottooli.jpg" },
    { src: path.join(baseBrainDir, "branch_param_1792478402391.jpg"), dest: "public/images/branches/parambilbazar.jpg" },
    { src: path.join(baseBrainDir, "branch_bourn_1792478474366.jpg"), dest: "public/images/branches/bournemouth.jpg" },
  ];

  for (const item of imageCopies) {
    if (fs.existsSync(item.src)) {
      const fullDest = path.join(__dirname, item.dest);
      const destDir = path.dirname(fullDest);
      if (!fs.existsSync(destDir)) {
        fs.mkdirSync(destDir, { recursive: true });
      }
      fs.copyFileSync(item.src, fullDest);
    }
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

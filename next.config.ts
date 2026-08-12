import type { NextConfig } from "next";

const repositoryName = process.env.GITHUB_REPOSITORY?.split("/")[1] ?? "";
const isProjectPage =
  process.env.GITHUB_ACTIONS === "true" &&
  repositoryName.length > 0 &&
  !repositoryName.endsWith(".github.io");
const assetPrefix = isProjectPage ? `/${repositoryName}` : undefined;

const nextConfig: NextConfig = {
  output: "export",
  assetPrefix,
  env: {
    NEXT_PUBLIC_ASSET_PREFIX: assetPrefix ?? "",
  },
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;

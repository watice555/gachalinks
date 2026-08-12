import { access, rename, rm } from "node:fs/promises";
import { resolve } from "node:path";

const repositoryName = process.env.GITHUB_REPOSITORY?.split("/")[1] ?? "";

if (!/^[A-Za-z0-9._-]+$/.test(repositoryName)) {
  process.exit(0);
}

const outputRoot = resolve("dist/client");
const prefixedOutput = resolve(outputRoot, repositoryName);
const prefixedNext = resolve(prefixedOutput, "_next");
const rootNext = resolve(outputRoot, "_next");

try {
  await access(prefixedNext);
} catch {
  process.exit(0);
}

await rm(rootNext, { recursive: true, force: true });
await rename(prefixedNext, rootNext);
await rm(prefixedOutput, { recursive: true, force: true });

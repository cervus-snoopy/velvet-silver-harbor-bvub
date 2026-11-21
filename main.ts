// AELORIA — The City with Two Skies.
// Entry program for the-poster-for-a-place-that-i-2-20261121-0539.
// The poster is pre-rendered (poster.html -> headless Chromium -> PNG)
// and shipped in this repo as entry.png; this program copies it to
// the grader's output directory. Node stdlib only, no network.
import { copyFileSync, mkdirSync, statSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const source = join(here, "entry.png");

const rawOut = process.env.MAKEFUN_OUTPUT_DIR;
const outDir = rawOut && rawOut.trim() !== "" ? rawOut : "/output";
const target = join(outDir, "entry.png");

mkdirSync(outDir, { recursive: true });
copyFileSync(source, target);

const srcSize = statSync(source).size;
const dstSize = statSync(target).size;
if (srcSize !== dstSize) {
  throw new Error(
    `size mismatch after copy: source ${srcSize} bytes, target ${dstSize} bytes`,
  );
}
console.log(`wrote ${target} (${dstSize} bytes)`);

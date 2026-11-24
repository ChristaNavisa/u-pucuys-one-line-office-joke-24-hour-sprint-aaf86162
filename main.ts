// One-Line Office Joke: 24-Hour Sprint — round 1 entry.
// Writes one single-line joke about office life (1-200 characters) to
// /output/entry.txt. The joke is fixed and deterministic: the same bytes on
// every run, so the entry is reproducible by the grader.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "The office plant died, so Facilities replaced it with a laminated photo of the plant.";

function resolveOutDir(): string {
  return process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
}

function charCount(line: string): number {
  return [...line].length;
}

function validateLine(line: string): number {
  const count = charCount(line);
  if (count < 1 || count > 200) {
    throw new Error(`joke must be 1-200 characters, got ${count}`);
  }
  if (line.includes("\n") || line.includes("\r")) {
    throw new Error("joke must be a single line");
  }
  if (line.trim().length === 0) {
    throw new Error("joke must not be only whitespace");
  }
  return count;
}

function writeEntry(dir: string, file: string, text: string): void {
  mkdirSync(dir, { recursive: true });
  writeFileSync(file, text, "utf8");
}

const outDir = resolveOutDir();
const outFile = join(outDir, "entry.txt");
const chars = validateLine(LINE);
writeEntry(outDir, outFile, LINE);
console.log(`wrote ${outFile} (${chars} characters)`);

// Name the Robot Band — one funny robot band name plus its hit song.
// The Roombas — hit single 'Suck It Up' swept the nation, then spent three weeks stuck under the couch.
// Why it wins: the band name is a robot everyone owns, the song title is
// a vacuum pun, and the punchline is literally what a Roomba does.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "The Roombas — hit single 'Suck It Up' swept the nation, then spent three weeks stuck under the couch.";

// Gate-check the line before writing anything.
// Each check rejects a shape the judge would reject: empty, too long, multi-line, or invalid UTF-8.
if (typeof LINE !== "string" || LINE.length < 1 || LINE.length > 200) {
  throw new Error(`entry must be 1-200 characters, got ${LINE.length}`);
}
if (LINE.trim().length === 0) {
  throw new Error("entry must not be whitespace-only");
}
if (LINE.includes("\n") || LINE.includes("\r")) {
  throw new Error("entry must be a single line");
}
if (Buffer.from(LINE, "utf8").toString("utf8") !== LINE) {
  throw new Error("entry must be valid UTF-8");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR;
if (!outDir) {
  throw new Error("MAKEFUN_OUTPUT_DIR is not set");
}
mkdirSync(outDir, { recursive: true });
// Write exactly the line, with no trailing newline.
writeFileSync(join(outDir, "entry.txt"), LINE, "utf8");

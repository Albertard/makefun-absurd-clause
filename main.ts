// The Absurd Clause Contest — make.fun entry
// Writes exactly one line to /output/entry.txt: a single original English
// sentence, at most 200 characters, phrased as a clause that could sit
// buried deep inside a terms-of-service agreement: deadpan legal
// boilerplate that quietly turns absurd.
//
// The line: "By using this service, you agree that your soul may be
// retained for quality-assurance purposes and returned, if at all, in a
// plain brown envelope within 6-8 weeks."
// Why it wins: it opens like real boilerplate ("By using this service, you
// agree that...") and the absurdity arrives mid-sentence — your soul, kept
// for quality assurance, then posted back in a plain brown envelope, maybe.
// The joke needs no setup: the register does the ambush, and the concrete
// image (a soul in a brown envelope, 6-8 weeks) is specific enough to
// picture and short enough to retype.

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

const LINE =
  "By using this service, you agree that your soul may be retained for quality-assurance purposes and returned, if at all, in a plain brown envelope within 6-8 weeks.";

// Gate: the entry must be UTF-8 text of 1 to 200 characters, not only
// whitespace, a single line, and one sentence. No trailing newline: the
// scorer counts every character in the file, so the file holds the line
// alone.
function validateLine(line: string): void {
  if (line.length < 1 || line.length > 200) {
    throw new Error(`entry must be 1-200 characters, got ${line.length}`);
  }
  if (!line.trim()) {
    throw new Error("entry must not be only whitespace");
  }
  if (line.includes("\n")) {
    throw new Error("entry must be a single line");
  }
  const sentences = line.split(/[.!?]+/).filter((s) => s.trim().length > 0);
  if (sentences.length !== 1) {
    throw new Error(
      `entry must be one sentence, got ${sentences.length}: ${JSON.stringify(sentences)}`,
    );
  }
}

validateLine(LINE);

const outPath = "/output/entry.txt";
mkdirSync(dirname(outPath), { recursive: true });
writeFileSync(outPath, LINE, "utf8");
console.log(`wrote ${JSON.stringify(LINE)} to ${outPath}`);

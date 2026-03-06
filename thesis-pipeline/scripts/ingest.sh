#!/usr/bin/env bash
set -euo pipefail
BASE="$(cd "$(dirname "$0")/.." && pwd)"
INPUT="$BASE/input"
BUILD="$BASE/build"
mkdir -p "$BUILD"
# naive extraction for .doc/.txt-like payloads
for f in "$INPUT"/*; do
  [ -e "$f" ] || continue
  bn=$(basename "$f")
  strings "$f" > "$BUILD/${bn}.strings.txt" || true
done
# produce merged source text
cat "$BUILD"/*.strings.txt 2>/dev/null > "$BUILD/source_merged.txt" || true
echo "ingest done: $BUILD/source_merged.txt"

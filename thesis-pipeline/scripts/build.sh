#!/usr/bin/env bash
set -euo pipefail
BASE="$(cd "$(dirname "$0")/.." && pwd)"
cd "$BASE/latex"
if command -v xelatex >/dev/null 2>&1; then
  xelatex -interaction=nonstopmode main.tex >/tmp/thesis-build.log 2>&1 || true
  xelatex -interaction=nonstopmode main.tex >>/tmp/thesis-build.log 2>&1 || true
  cp -f main.pdf "$BASE/output/" 2>/dev/null || true
  echo "build attempted with xelatex"
else
  echo "xelatex not installed; skipped compile"
fi

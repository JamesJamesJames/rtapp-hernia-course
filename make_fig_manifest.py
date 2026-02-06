#!/usr/bin/env python3
"""
make_fig_manifest.py
Scan /public/assets/papers/<slug>/figures and generate fig_manifest.json files.

Usage:
  python scripts/make_fig_manifest.py public/assets/papers

This is optional. If your app reads from module.json, you may not need manifests.
"""
import os, json, sys
from pathlib import Path

root = Path(sys.argv[1]) if len(sys.argv) > 1 else Path("public/assets/papers")
for slug_dir in root.iterdir():
    fig_dir = slug_dir / "figures"
    if not fig_dir.exists():
        continue
    figs = sorted([p.name for p in fig_dir.iterdir() if p.suffix.lower() in [".jpg",".jpeg",".png",".webp"]])
    out = {
        "slug": slug_dir.name,
        "figures": [{"filename": fn} for fn in figs]
    }
    out_path = slug_dir / "fig_manifest.json"
    out_path.write_text(json.dumps(out, indent=2), encoding="utf-8")
    print(f"Wrote {out_path} ({len(figs)} figures)")

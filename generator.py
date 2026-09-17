#!/usr/bin/env python3
"""
generator.py
Lee resources.yaml y genera data.js, el archivo de datos que consume
el sitio (index.html -> data.js -> app.js).

Uso:
    python generator.py

Cada vez que agregues un recurso en resources.yaml y corras este script
(o lo suba el workflow de GitHub Actions), data.js se regenera solo.
"""

import json
import sys
from pathlib import Path

try:
    import yaml
except ImportError:
    sys.exit("Falta pyyaml. Instala con: pip install pyyaml")

ROOT = Path(__file__).parent
SOURCE = ROOT / "resources.yaml"
OUTPUT = ROOT / "data.js"

VALID_CATEGORIES = {"shaders", "skins", "texturepacks", "mods"}
DEFAULT_HUE = "220,10%,40%"


def load_resources() -> list[dict]:
    if not SOURCE.exists():
        sys.exit(f"No encontré {SOURCE}")

    with open(SOURCE, "r", encoding="utf-8") as f:
        raw = yaml.safe_load(f) or {}

    items = raw.get("resources", [])
    if not items:
        print("Aviso: resources.yaml no tiene recursos todavía.")

    cleaned = []
    for i, item in enumerate(items, start=1):
        name = item.get("name")
        category = item.get("category")

        if not name:
            sys.exit(f"Recurso #{i} no tiene 'name'.")
        if category not in VALID_CATEGORIES:
            sys.exit(
                f"Recurso '{name}' tiene category inválida: {category!r}. "
                f"Debe ser una de: {sorted(VALID_CATEGORIES)}"
            )

        cleaned.append({
            "id": i,
            "name": name,
            "category": category,
            "version": str(item.get("version", "")),
            "downloads": str(item.get("downloads", "0")),
            "rating": float(item.get("rating", 0)),
            "hue": item.get("hue", DEFAULT_HUE),
        })

    return cleaned


def write_data_js(resources: list[dict]) -> None:
    js_array = json.dumps(resources, ensure_ascii=False, indent=2)
    content = (
        "// Archivo generado automáticamente por generator.py\n"
        "// No editar a mano: edita resources.yaml y vuelve a correr el generador.\n"
        f"const RESOURCES = {js_array};\n"
    )
    OUTPUT.write_text(content, encoding="utf-8")
    print(f"data.js generado con {len(resources)} recursos.")


if __name__ == "__main__":
    resources = load_resources()
    write_data_js(resources)

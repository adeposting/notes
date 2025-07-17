---
title: 'RFC Repository Tools'
date: 2025-06-07
categories:
  - /development
  - /project-management
  - /software
tags:
  - boilerplate
  - development
  - project-management
  - rfc
  - software
  - software-development
  - software-engineering
  - specification
  - standard
  - template
  - tools
---

This article defines the automation and tooling architecture for managing a software RFC repository. These tools support generation, validation, and enforcement of structure across the repository, and are invoked via a consistent interface exposed through a `Makefile`. All automation is located under the `scripts/` directory and is used by both developers and continuous integration workflows.

> This article is a follow-up to [RFC Repository Specification](/rfc-repository-specification), which *"is a specification for a software RFC repository... an RFC repository contains the RFCs (Requests for Comments) for a project, including supporting documentation regarding their lifecycle and asscociated processes."*. This article assumes you have adoted the standard given in the [RFC Repository Specification](/rfc-repository-specification) article.

---

## 📁 Directory Additions

The following additional files and directories support automated tooling:

```
rfcs/
├── Makefile                # Top-level interface for running all tooling
├── scripts/                # Automation scripts
│   ├── build-html.sh             # Converts all .md files to .html with structure preserved
│   ├── generate-index.sh         # Builds INDEX.md with links to all RFCs
│   ├── verify.sh                 # Composite validator for RFC structure
│   ├── validate-filenames.sh     # Enforces naming convention for RFC/IMPL files
│   ├── validate-frontmatter.py   # Checks RFCs for required front matter fields
│   ├── validate-structure.sh     # Enforces correct RFC folder placement
│   └── requirements.txt          # Python dependencies for validation scripts
├── INDEX.md                # Auto-generated index of all RFCs
├── dist/                   # Auto-generated HTML output (mirrors Markdown structure)
```

---

## 🛠️ Makefile

The top-level `Makefile` exposes the following targets. These are the only entry points used by GitHub Actions.

```makefile
SHELL := /usr/bin/env bash

.PHONY: all html index validate clean

all: html index validate

html:
	./scripts/build-html.sh

index:
	./scripts/generate-index.sh > INDEX.md
	cp INDEX.md dist/index.html
	sed -i '' 's/\.md/.html/g' dist/index.html 2>/dev/null || sed -i 's/\.md/.html/g' dist/index.html

validate:
	./scripts/verify.sh

clean:
	rm -rf dist INDEX.md
```

---

## 🔧 Scripts

### `scripts/build-html.sh`

Generates `.html` files for every `.md` file (excluding `dist/`), preserving folder structure.

```bash
#!/usr/bin/env bash
set -euo pipefail

DIST="dist"
mkdir -p "$DIST"

find . -name '*.md' ! -path './dist/*' | while read -r src; do
  out_dir="$DIST/$(dirname "$src")"
  mkdir -p "$out_dir"
  out_file="$out_dir/$(basename "$src" .md).html"
  echo "Generating $out_file from $src"
  pandoc --standalone "$src" -o "$out_file"
done
```

---

### `scripts/generate-index.sh`

Creates a Markdown index of all RFCs grouped by status directory. This is saved as `INDEX.md` and also used to create the HTML index (with extensions later rewritten to `.html`).

```bash
#!/usr/bin/env bash
set -euo pipefail

echo "# RFC Index"

for dir in accepted drafts review final implemented rejected withdrawn wip; do
  if [[ -d "$dir" ]]; then
    echo -e "\n## ${dir^}"
    find "$dir" -name 'RFC-*.md' | sort | while read -r file; do
      title=$(grep -m1 '^# RFC' "$file" | sed 's/^# RFC: //')
      echo "- [$title]($file)"
    done
  fi
done
```

---

### `scripts/verify.sh`

Runs all validation steps in a single command.

```bash
#!/usr/bin/env bash
set -euo pipefail

./scripts/validate-filenames.sh
./scripts/validate-structure.sh
./scripts/validate-frontmatter.py
```

---

### `scripts/validate-filenames.sh`

Checks that RFC and IMPL filenames follow `RFC-YYYYMMDD-NNNN-title.md` and `IMPL-YYYYMMDD-NNNN-title.md`.

```bash
#!/usr/bin/env bash
set -euo pipefail

regex='^(RFC|IMPL)-[0-9]{8}-[0-9]{4}-[a-z0-9\-]+\.md$'
find . -type f -name '*.md' ! -path './dist/*' | while read -r f; do
  name="$(basename "$f")"
  [[ "$name" =~ $regex ]] || { echo "Invalid filename: $name"; exit 1; }
done
```

---

### `scripts/validate-structure.sh`

Ensures that all RFCs are in one of the allowed folders.

```bash
#!/usr/bin/env bash
set -euo pipefail

find . -name 'RFC-*.md' | while read -r file; do
  case "$file" in
    ./drafts/*|./review/*|./accepted/*|./final/*|./implemented/*|./rejected/*|./withdrawn/*|./wip/*) ;;
    *) echo "Invalid location: $file"; exit 1 ;;
  esac
done
```

---

### `scripts/validate-frontmatter.py`

Checks that every RFC contains required front matter fields.

```python
#!/usr/bin/env python3
import sys
import re
import glob

REQUIRED_FIELDS = [
    "**RFC ID**",
    "**Title**",
    "**Author**",
    "**Created**",
    "**Status**"
]

def check_file(path):
    with open(path) as f:
        content = f.read()
    missing = [field for field in REQUIRED_FIELDS if field not in content]
    if missing:
        print(f"{path}: Missing fields: {', '.join(missing)}")
        return False
    return True

failed = False
for path in glob.glob("**/*.md", recursive=True):
    if "dist/" in path:
        continue
    if not check_file(path):
        failed = True

if failed:
    sys.exit(1)
```

---

### `scripts/requirements.txt`

Python dependencies for validation tools.

```
# None required yet; placeholder for future use (e.g. PyYAML)
```

---

## GitHub Actions Integration

All CI workflows call `make` targets only:

```yaml
name: Validate RFCs

on:
  pull_request:
    paths:
      - '**/*.md'
      - 'scripts/**'
      - 'Makefile'

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: sudo apt-get update && sudo apt-get install pandoc -y
      - run: pip install -r scripts/requirements.txt
      - run: make all
```

---

## Summary

* Tooling is centralized under `scripts/`.
* `make all` builds HTML, generates the index, and validates structure.
* `INDEX.md` is the canonical RFC list and doubles as the HTML index.
* GitHub Actions **never call scripts directly** — only `make`.

## See Also

* [RFC Repository Specification](/rfc-repository-specification) - *"This article is a specification for a software RFC repository. An RFC repository contains the RFCs (Requests for Comments) for a project, including supporting documentation regarding their lifecycle and asscociated processes."*

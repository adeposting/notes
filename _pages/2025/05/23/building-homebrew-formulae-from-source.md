---
title: Building Homebrew Formulae from Source 
date: 2025-05-23
categories:
    - /development
    - /macos
    - /reference
tags:
    - software-development
    - software-engineering
    - code
    - computer-programming
    - programming
    - homebrew
    - package-managers
    - build-systems
    - local-development
---

Homebrew formulae are written in Ruby and typically download a versioned source archive (`.tar.gz`, `.zip`, etc.) from a URL. When developing your own formula or working on local changes, you might want to install a formula **from source**, possibly from a **local directory**. This guide explains how to do that **correctly**, and why certain shortcuts don't work.

---

## `brew install --build-from-source`

Use this to force Homebrew to:

1. Download the archive from the formula's `url`
    
2. Verify its `sha256` checksum
    
3. Build and install the software from source (rather than using a prebuilt bottle)
    

```bash
brew install --build-from-source ./Formula/mytool.rb
```

> **You must still provide a valid `url` and `sha256`, even when building from source.**

---

## Why a `url` and `sha256` Are Required

Homebrew always:

- Fetches source via `url`
    
- Verifies it using `sha256`
    
- Unpacks it into an isolated temporary directory
    
- Builds from source in a controlled environment
    

This ensures:

- **Security** (protection against tampered files)
    
- **Reproducibility** (consistent builds across systems)
    
- **Isolation** (clean state, no pollution from local dev environments)
    

---

## Can I point `url` at a local directory?

**No.** Homebrew does not allow pointing the `url` at a plain directory.

```ruby
# This is invalid and will error
url "/Users/lynn/dev/mytool"
```

Instead, **you must package your directory into a tarball**.

---

## Using a Local Tarball via `file://`

1. Create a `.tar.gz` from your local source directory:
    

```bash
tar -czf /tmp/mytool.tar.gz -C /Users/lynn/dev mytool
```

2. Compute the SHA-256 hash:
    

```bash
shasum -a 256 /tmp/mytool.tar.gz
```

3. Update your formula:
    

```ruby
url "file:///tmp/mytool.tar.gz"
sha256 "<paste the hash here>"
```

4. Install it:
    

```bash
brew install --build-from-source ./Formula/mytool.rb
```

---

## Testing a Formula Without Publishing

You can work with a formula locally using:

```bash
brew install ./Formula/mytool.rb
```

Add `--build-from-source` to skip the bottle and build from your tarball.

If Homebrew can't fetch the file or the SHA is wrong, it will fail with:

```bash
Error: SHA256 mismatch
```

---

## Manual Development Tricks

### Using `brew irb` (Advanced Testing)

If you want to manually test the `install` block:

```bash
brew irb --formula ./Formula/mytool.rb
```

```ruby
f = Formula["mytool"]
Dir.chdir("/absolute/path/to/local/source") { f.install }
```

> This bypasses sandboxing, SHA verification, and fetch logic. Use only for debugging.

---

## You Cannot Skip SHA Verification

Unlike Casks (which allow `sha256 :no_check`), Formulae **must have** a valid SHA. There is no way to skip or disable this check.

---

## Automating It with a Script

```bash
#!/bin/bash
set -euo pipefail

SRC_DIR="/Users/lynn/dev/mytool"
TARBALL="/tmp/mytool.tar.gz"
FORMULA="./Formula/mytool.rb"

tar -czf "$TARBALL" -C "$(dirname "$SRC_DIR")" "$(basename "$SRC_DIR")"
SHA=$(shasum -a 256 "$TARBALL" | cut -d ' ' -f1)

sed -i '' -E "s|^  url .*|  url \"file://$TARBALL\"|" "$FORMULA"
sed -i '' -E "s|^  sha256 .*|  sha256 \"$SHA\"|" "$FORMULA"

brew install --build-from-source "$FORMULA"
```

---

## Summary

|Scenario|Supported?|Notes|
|---|---|---|
|`url` pointing to directory|No|Not supported in Homebrew|
|`url` pointing to tarball|Yes|Local or remote, must match `sha256`|
|`sha256 :no_check`|No|Only valid for **Casks**, not Formulae|
|`brew install --build-from-source`|Yes|Builds from source but still checks SHA|
|Manual source install via `irb`|Yes (with Caveats)|Possible, but not recommended for CI|

---

## See Also

- [Formula Cookbook](https://docs.brew.sh/Formula-Cookbook)
    
- [Homebrew Developer Docs](https://docs.brew.sh/)
    
- [Creating your own Tap](https://docs.brew.sh/Taps)
    
- [Homebrew formula API reference](https://rubydoc.brew.sh/Formula)

- [Category: /development](/notes-by-category#category-/development)

- [Category: /macos](/notes-by-category#category-/macos)


---
title: MacOS Filesystem Hierarchy (and Homebrew)
date: 2025-05-26
categories:
    - /development
    - /macos
    - /reference
tags:
    - unix
    - linux
    - macos
    - software-development
    - software-engineering
    - sysadmin
    - system-administration
    - code
    - computer-programming
    - programming
    - posix
    - operating-systems
    - os
    - xdg
    - freedesktop-org
    - specification
    - homebrew
---


macOS uses a **Unix-based filesystem hierarchy** with some Apple-specific twists. It preserves the traditional `/usr`, `/bin`, and `/etc` directories while adding layers like `/System`, `/Library`, and a GUI-oriented user model. Tools like **Homebrew** bring a Linux-like developer environment on top.

---

## macOS Core Directory Layout

|Path|Description|
|---|---|
|`/System`|Immutable system files maintained by Apple (read-only at runtime).|
|`/System/Library`|Core macOS frameworks, daemons, launch agents.|
|`/Library`|System-wide resources and preferences (but modifiable).|
|`/usr`|Traditional Unix programs and libraries. Mostly managed by macOS.|
|`/bin`, `/sbin`|Essential Unix binaries (symlinked from `/usr/bin`, etc.).|
|`/etc`|System-wide configuration (often symlinked to `/private/etc`).|
|`/var`, `/tmp`|Logs, caches, temp files (under `/private`).|
|`/Applications`|GUI apps for all users.|
|`~/Applications`|GUI apps installed for the current user only.|
|`/Users/<name>`|Home directories for users (e.g., `/Users/lynn`).|

Note: `/` is **read-only** on modern macOS (10.15+), enforced by System Integrity Protection (SIP). You can't modify it directly.

---

## Homebrew Directory Layout (default)

Homebrew installs everything under **`/opt/homebrew`** on Apple Silicon (ARM) Macs, or **`/usr/local`** on Intel Macs.

|Type|Apple Silicon (M1/M2+)|Intel Macs|
|---|---|---|
|Homebrew prefix|`/opt/homebrew`|`/usr/local`|
|Binaries|`/opt/homebrew/bin`|`/usr/local/bin`|
|Libraries|`/opt/homebrew/lib`|`/usr/local/lib`|
|Packages (Cellar)|`/opt/homebrew/Cellar`|`/usr/local/Cellar`|
|Formulae metadata|`/opt/homebrew/share`|`/usr/local/share`|
|Config/Logs|`~/.config`, `~/Library/Logs`|`~/.config`, `~/Library/Logs`|

Add Homebrew to your shell profile:

```bash
# Apple Silicon (Zsh)
echo 'eval "$(/opt/homebrew/bin/brew shellenv)"' >> ~/.zprofile
```

---

## Where Homebrew Installs Stuff

|Type|Location|
|---|---|
|CLI tools|`/opt/homebrew/bin/<tool>`|
|Libraries|`/opt/homebrew/lib` and linked into `lib/`|
|Man pages|`/opt/homebrew/share/man`|
|GUI apps|`/Applications` (via `brew install --cask`)|
|Config files|Sometimes in `/opt/homebrew/etc/`, but often relies on defaults or user config dirs|

---

## User-Specific Directories on macOS

|Directory|Purpose|Notes|
|---|---|---|
|`~/Library`|macOS-style user data and caches|Used by native apps (like Mail, Safari)|
|`~/.config`|XDG-compliant config (Linux-style)|Used by CLI tools and Homebrew packages|
|`~/.local/share`|XDG-compliant user data|Not standard on macOS, but often respected|
|`~/Applications`|GUI apps for just this user|Preferred for user-only `.app` bundles|
|`~/.cache`|App caches (XDG tools)|Used by e.g. `pip`, `cargo`, `nix`, etc.|

Even on macOS, many open-source tools follow **XDG** layout:

- `~/.config/gh/`
    
- `~/.cache/pip/`
    
- `~/.local/share/nvim/`
    

---

## Summary

macOS blends Unix and Apple conventions:

- Traditional `/usr`, `/etc`, and `/var` still exist (but partially read-only).
    
- Apple splits system vs. user configuration (`/System` vs. `/Library` vs. `~/Library`).
    
- Homebrew mimics Linux-style layout inside `/opt/homebrew` or `/usr/local`.
    

|Purpose|System Dir|Homebrew / User Dir|
|---|---|---|
|System binaries|`/usr/bin`, `/bin`|`/opt/homebrew/bin`|
|System libs|`/usr/lib`|`/opt/homebrew/lib`|
|Config files|`/etc`|`~/.config`, `/opt/homebrew/etc`|
|Apps|`/Applications`|`~/Applications` (casks)|
|User binaries|N/A|`~/.local/bin`, `/opt/homebrew/bin`|
|User libraries|N/A|`~/.local/lib` (unofficial)|
|User data|`~/Library`|`~/.local/share`, `~/.cache`|

---

## Recommendations

- Use `~/.config/yourapp/` for CLI tool configuration.
    
- Put personal scripts in `~/.local/bin` and add it to `$PATH`.
    
- If you use Homebrew, prefer installing CLI tools via `brew install <tool>` and GUI apps via `brew install --cask <app>`.

---

## See Also

- [Category: /development](/notes-by-category#category-/development)

- [Category: /macos](/notes-by-category#category-/macos)


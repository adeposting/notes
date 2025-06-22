---
title: XDG Base Directory Specification
date: 2025-05-22
categories:
    - /development
    - /linux
    - /reference
    - /unix
tags:
    - unix
    - linux
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
---

The **XDG Base Directory Specification** (by freedesktop.org) defines standard locations for storing **user-specific files** related to configuration, data, cache, and state. It helps avoid cluttering `$HOME` with dozens of hidden `.` folders and promotes consistency across applications.

---

## Purpose

Before XDG, Unix applications often dumped everything in `~/`:

- Configs in `~/.appname/`
    
- Data in `~/.appname/data/`
    
- Logs and junk in `~/.appname/cache/`
    

XDG fixes that by separating concerns:

- **Config goes in one place**
    
- **Cache goes in another**
    
- **Data goes in a third**
    

---

## Standard XDG Directories

|Variable|Default Location|Description|
|---|---|---|
|`$XDG_CONFIG_HOME`|`~/.config`|User configuration files|
|`$XDG_DATA_HOME`|`~/.local/share`|Non-configuration data (e.g. plugins, session history)|
|`$XDG_CACHE_HOME`|`~/.cache`|Non-essential data (e.g. thumbnails, pip wheels, temp files)|
|`$XDG_STATE_HOME`|`~/.local/state`|Persistent state (e.g. logs, databases, undo history)|
|`$XDG_RUNTIME_DIR`|(varies, often `/run/user/UID`)|Volatile, per-login runtime files (e.g. sockets)|

---

## Application Examples

|Tool/App|What|Where (XDG)|
|---|---|---|
|`neovim`|Config|`~/.config/nvim/init.vim`|
|`flatpak`|App data|`~/.local/share/flatpak/`|
|`pip` (cache)|Build cache|`~/.cache/pip`|
|`ssh` (override)|Config|`~/.config/ssh/config`|
|Your app|Logs|`~/.local/state/yourapp/log.txt`|

---

## Comparison Table

|Purpose|Traditional Unix Dir|XDG Replacement|Notes|
|---|---|---|---|
|User config|`~/.appname/`|`~/.config/appname/`|Clearly separates config|
|User data|`~/.appname/data/`|`~/.local/share/app/`|Data not meant to be edited|
|User cache|`/tmp`, `~/.cache`|`~/.cache/appname/`|Automatically purgeable|
|Logs / state|`/var/log`, none|`~/.local/state/app/`|New in XDG spec, used for logs|
|Executables|`~/bin`|`~/.local/bin`|Not officially part of XDG|

---

## Best Practices for Developers

- Use `os.environ.get('XDG_CONFIG_HOME', os.path.expanduser('~/.config'))` in Python.
    
- Don't assume defaults — **check if the env var is set**, and fall back if not.
    
- Separate **config**, **data**, and **cache** even if your app is small.
    

---

## Tips

Add this to your shell config to make `~/.local/bin` work like `/usr/local/bin`:

```bash
export PATH="$HOME/.local/bin:$PATH"
```

---

## Summary

The XDG specification brings order to user-level files:

- Avoids dotfile clutter in `~/`
    
- Encourages portable, consistent behavior
    
- Used by modern apps across Linux and BSD systems

---

## See Also

- [Category: /development](/notes-by-category#category-/development)

- [Category: /linux](/notes-by-category#category-/linux)

- [Category: /unix](/notes-by-category#category-/unix)

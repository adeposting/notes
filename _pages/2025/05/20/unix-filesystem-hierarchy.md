---
title: Unix Filesystem Hierarchy
date: 2025-05-20
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
    - specification
---


The Unix filesystem is structured as a **single tree** starting at the root (`/`). This tree organizes system files, user data, configuration, binaries, libraries, and temporary data in well-defined directories.

---

## Root Directory `/`

All files and directories stem from `/`, the root of the filesystem. There are no drive letters like on Windows — all volumes and devices are mounted somewhere within this tree.

---

## Core Directories

|Directory|Description|
|---|---|
|`/bin`|Essential system binaries (e.g., `ls`, `cp`, `sh`) needed for basic boot and repair.|
|`/sbin`|System binaries used for administration (e.g., `fsck`, `reboot`). Typically root-only.|
|`/lib`|Essential shared libraries required by binaries in `/bin` and `/sbin`.|
|`/lib64`|64-bit libraries on 64-bit systems.|
|`/etc`|System-wide configuration files (e.g., `/etc/passwd`, `/etc/ssh/sshd_config`).|
|`/var`|Variable data like logs, mail, cache files (e.g., `/var/log`, `/var/spool`).|
|`/tmp`|Temporary files; cleared on reboot.|
|`/home`|Home directories for users (e.g., `/home/lynn`).|
|`/root`|Home directory for the `root` user.|
|`/dev`|Device files representing hardware (e.g., `/dev/sda`, `/dev/null`).|
|`/proc`|Virtual filesystem exposing kernel and process info.|
|`/sys`|Interface to kernel and hardware data structures.|
|`/mnt`|Temporary mount point for manually mounted filesystems.|
|`/media`|Mount point for removable media (USB drives, CDs, etc.).|
|`/opt`|Optional third-party software and packages.|
|`/usr`|"User system resources" — contains most userland programs and data.|
|`/usr/bin`|Most non-essential user binaries (e.g., `python`, `vim`).|
|`/usr/sbin`|Non-essential system binaries (e.g., `apachectl`).|
|`/usr/lib`|Libraries for binaries in `/usr/bin` and `/usr/sbin`.|
|`/usr/local`|Locally compiled software (not managed by package manager).|

---

## Conceptual Layers

- **Boot-critical layer**: `/bin`, `/sbin`, `/lib`, `/etc`
    
- **User-space layer**: `/usr/bin`, `/usr/lib`, `/usr/share`
    
- **Local override layer**: `/usr/local/*` (for sysadmins/devs)
    
- **User-specific layer**: `/home/username` (config, data, personal files)
    

---

## User-Level Directory Conventions (XDG)

While not part of the classic Unix hierarchy, modern systems often include:

|Directory|Purpose|Default Path|
|---|---|---|
|`$XDG_CONFIG_HOME`|User config files|`~/.config`|
|`$XDG_DATA_HOME`|User data files|`~/.local/share`|
|`$XDG_CACHE_HOME`|Non-essential cache data|`~/.cache`|
|`$XDG_STATE_HOME`|Persistent user state (logs, etc.)|`~/.local/state`|
|`~/.local/bin`|User-installed executables|Not standard, but common|

---

## Finding Executables and Libraries

- Executables are searched via the `$PATH` variable.
    
- Shared libraries are located using `ld.so`, `LD_LIBRARY_PATH`, and `/etc/ld.so.conf`.
    

---

## Summary

The Unix directory hierarchy is designed for separation of concerns:

- **System binaries/config**: `/bin`, `/etc`
    
- **Userland apps**: `/usr/bin`, `/usr/lib`
    
- **User files**: `/home`
    
- **Ephemeral data**: `/tmp`, `/var`
    
- **Custom/optional**: `/opt`, `/usr/local`
    
- **User-controlled**: `~/.config`, `~/.local`
    
## See Also

- [Category: /development](/notes-by-category#category-/development)

- [Category: /linux](/notes-by-category#category-/linux)

- [Category: /unix](/notes-by-category#category-/unix)

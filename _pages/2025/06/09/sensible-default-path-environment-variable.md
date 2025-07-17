---
title: Sensible Default Path Environment Variable
date: 2025-06-09
categories:
tags:
---

This article provides a sensible default [`$PATH` environment variable](https://en.wikipedia.org/wiki/PATH_(variable)).

1. Save the script to `<whatever>/<path>/<you>/<want>`.
2. Add the following to your  `~/.bashrc`, `~/.profile`, `~/.bash_profile`, `~/.zshrc`, `s/.zprofile`, etc:

```sh
source <whatever>/<path>/<you>/<want>
```

3. Restart your shell.

## Script

```bash
#!/bin/sh

# -------------------- # Reset $PATH # ----------------------- #

PATH=""

# -------------------- # Linux System # -------------------- #

# Core System Paths
PATH="/usr/bin:$PATH" # Standard user commands
PATH="/bin:$PATH" # Essential system binaries
PATH="/usr/sbin:$PATH" # System admin tools
PATH="/sbin:$PATH" # Essential system admin tools

# Internal Tooling
PATH="/usr/libexec:$PATH" # Internal helper binaries
PATH="/usr/local/libexec:$PATH" # Locally installed helpers

# Local System Paths
PATH="/usr/local/bin:$PATH" # Locally installed user commands
PATH="/usr/local/sbin:$PATH" # Locally installed admin tools

# -------------------- # macOS System # -------------------- #

# Apple CLI Tools
PATH="/Library/Apple/usr/bin:$PATH" # Apple-supplied utilities not in `/usr/bin`

# Homebrew
PATH="/opt/homebrew/bin:$PATH" # Homebrew installed binaries
PATH="/opt/homebrew/sbin:$PATH" # Homebrew installed services/daemons

# TeX / LaTeX
PATH="/Library/TeX/texbin:$PATH" # MacTeX binaries

# Cryptex System Paths
PATH="/System/Cryptexes/App/usr/bin:$PATH" # Cryptex app environment binaries
PATH="/var/run/com.apple.security.cryptexd/codex.system/bootstrap/usr/bin:$PATH" # Bootstrap bin
PATH="/var/run/com.apple.security.cryptexd/codex.system/bootstrap/usr/local/bin:$PATH" # Local bootstrap bin
PATH="/var/run/com.apple.security.cryptexd/codex.system/bootstrap/usr/appleinternal/bin:$PATH" # Apple internal tools

# -------------------- # Custom Scripts # -------------------- #

# Generic User Scripts Locations
PATH=".:$PATH" # Current directory (least secure; only used in limited contexts)
PATH="./bin:$PATH" # Project-specific binaries
PATH="./.bin:$PATH" # Hidden bin directory, often used for dev tools
PATH="$HOME/bin:$PATH" # User-defined global scripts
PATH="$HOME/.bin:$PATH" # Alternate personal script directory
PATH="$HOME/.local/bin:$PATH" # Standard user-local executables (per XDG)

# User Dotfiles
PATH="$HOME/.dotfiles/bin:$PATH" # Executables maintained in personal dotfiles

# User Toolbox
PATH="$HOME/.toolbox/bin:$PATH" # Scripts/tools inside a dev toolbox environment

# -------------------- # Programming Languages # -------------------- #

# Python
PATH="$HOME/.local/bin:$PATH" # Default install location for user-level Python packages
PATH="$HOME/.pyenv/bin:$PATH" # Pyenv version manager
PATH="$HOME/.pyenv/shims:$PATH" # Shims that point to selected Python versions
PATH="$(python3 -m site --user-base)/bin:$PATH" # Dynamic path to user Python binaries
PATH="$HOME/.poetry/bin:$PATH" # Poetry package manager executables

# Ruby
PATH="$HOME/.rbenv/bin:$PATH" # rbenv version manager
PATH="$HOME/.rbenv/shims:$PATH" # Ruby version shims
PATH="$HOME/.rvm/bin:$PATH" # Ruby Version Manager (RVM) binaries

# JavaScript / Node.js # NPM
PATH="$HOME/.npm/bin:$PATH" # User npm binaries
PATH="$HOME/.npm-global/bin:$PATH" # Custom global npm install path
PATH="$HOME/.node_modules/bin:$PATH" # Fallback for manual module installs

# PNPM
PATH="$HOME/.pnpm:$PATH" # PNPM store and data directory
PATH="$HOME/.pnpm-global/bin:$PATH" # Global PNPM binaries

# Yarn
PATH="$HOME/.yarn/bin:$PATH" # Global Yarn binaries
PATH="$HOME/.config/yarn/global/node_modules/.bin:$PATH" # Alternate global Yarn binary path

# Volta
PATH="$HOME/.volta/bin:$PATH" # Volta-managed Node.js tools and shims

# Project-local
PATH="./node_modules/.bin:$PATH" # Project-scoped binaries from npm/yarn

# Rust
PATH="$HOME/.cargo/bin:$PATH" # Cargo-installed tools and crates

# Go
PATH="$HOME/go/bin:$PATH" # Go user workspace binaries
PATH="/usr/local/go/bin:$PATH" # System-wide Go binaries

# Java / Kotlin / JVM # Generic Java
PATH="$JAVA_HOME/bin:$PATH" # Current active Java version

# SDKMAN
PATH="$HOME/.sdkman/candidates/java/current/bin:$PATH" # SDKMAN-managed Java
PATH="$HOME/.sdkman/candidates/kotlin/current/bin:$PATH" # SDKMAN-managed Kotlin

# jEnv
PATH="$HOME/.jenv/shims:$PATH" # jEnv Java version shims

# .NET
PATH="$HOME/.dotnet/tools:$PATH" # User-level .NET Core tools

# Haskell
PATH="$HOME/.cabal/bin:$PATH" # Cabal package binaries
PATH="$HOME/.stack/bin:$PATH" # Stack build tool binaries
PATH="$HOME/.ghcup/bin:$PATH" # GHCup Haskell toolchain manager

# Elixir / Erlang
PATH="$HOME/.mix/escripts:$PATH" # Elixir mix scripts
PATH="$HOME/.asdf/shims:$PATH" # asdf-managed version shims

# Lua
PATH="$HOME/.luarocks/bin:$PATH" # LuaRocks-installed packages

# Nim
PATH="$HOME/.nimble/bin:$PATH" # Nimble package binaries

# Bun.js
PATH="$HOME/.bun/bin:$PATH" # Bun runtime and package manager

# Deno
PATH="$HOME/.deno/bin:$PATH" # Deno runtime tools

# WebAssembly
PATH="$HOME/.wasmer/bin:$PATH" # Wasmer CLI for running WebAssembly

# Dart / Flutter / Android
PATH="$HOME/.pub-cache/bin:$PATH" # Dart package binaries
PATH="$HOME/Library/Android/sdk/platform-tools:$PATH" # macOS Android SDK tools
PATH="$HOME/Android/Sdk/platform-tools:$PATH" # Linux/Windows Android SDK tools

# PHP Composer
PATH="$HOME/.composer/vendor/bin:$PATH" # Composer package executables

# -------------------- # DevOps / Infrastructure # -------------------- #

# Terraform
PATH="$HOME/.terraform.d/plugins:$PATH" # Custom Terraform plugins

# Kubernetes
PATH="$HOME/.krew/bin:$PATH" # Krew plugin manager for `kubectl`
PATH="$HOME/bin/kubebuilder/bin:$PATH" # KubeBuilder CLI tool

# Docker
PATH="$HOME/.docker/cli-plugins:$PATH" # Docker CLI extensions

# Minikube
PATH="$HOME/.minikube/bin:$PATH" # Minikube Kubernetes binaries

# -------------------- # Build Tools # -------------------- #

# Neovim (Bob)
PATH="$HOME/.local/share/bob/nvim-bin:$PATH" # Bob-managed Neovim builds

# -------------------- # AI / LLMs # -------------------- #

# LM Studio
PATH="$PATH:$HOME/.lmstudio/bin" # LM Studio CLI binaries

# GPT4All
PATH="$PATH:$HOME/.gpt4all" # GPT4All binaries (if using CLI tools)

# TabbyML
PATH="$PATH:$HOME/.tabby/bin" # TabbyML binaries (depending on install)

# -------------------- # System Package Managers # -------------------- #

# Flatpak
PATH="$HOME/.local/share/flatpak/exports/bin:$PATH" # User Flatpak app exports
PATH="/var/lib/flatpak/exports/bin:$PATH" # System Flatpak app exports

# Snap
PATH="/snap/bin:$PATH" # Snap package runtime binaries

# Nix
PATH="$HOME/.nix-profile/bin:$PATH" # User-installed Nix packages
PATH="/run/current-system/sw/bin:$PATH" # System profile for NixOS

# -------------------- # Linux Games # -------------------- #

# Games
PATH="/usr/games:$PATH" # Standard games
PATH="/usr/local/games:$PATH" # Locally installed games

export PATH
```
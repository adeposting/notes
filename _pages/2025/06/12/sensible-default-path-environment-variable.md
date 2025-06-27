
This article describes various locations that provide sensible defaults to set your `$PATH` environment variable.

If you just want a script that you can source in your `~/.bashrc`/`~/.zshrc`/etc. then see [the `pathenvrc.sh` script](https://github.com/adeposting/scripts/blob/main/src/bin/pathrc.sh) in my [`adeposting/scripts` repository on GitHub](https://github.com/adeposting/scripts).

There is also a code snippet you can copy-paste for use in your own scripts at the end of this article in the [appendix](#appendix).

## `$PATH` Locations by Language & Ecosystem

### Custom Scripts

#### User Scripts (User)

* `./bin` → Project-specific binaries
* `./.bin` → Hidden bin directory, often used for dev tools
* `$HOME/bin` → User-defined global scripts
* `$HOME/.bin` → Alternate personal script directory
* `$HOME/.local/bin` → Standard user-local executables (per XDG)
* `$HOME/.local/.bin` → Hidden user-local bin, occasionally used for overrides
* `$HOME/.local/share/*/bin` → App-specific local binaries
* `$HOME/.local/share/*/.bin` → Hidden app-specific binaries

#### User Dotfiles

* `$HOME/.dotfiles/bin` → Executables maintained in personal dotfiles

#### User Toolbox

* `$HOME/.toolbox/bin` → Scripts/tools inside a dev toolbox environment

### Programming Languages

#### Python

* `$HOME/.local/bin` → Default install location for user-level Python packages
* `$HOME/.pyenv/bin` → Pyenv version manager
* `$HOME/.pyenv/shims` → Shims that point to selected Python versions
* `/usr/local/lib/python*/site-packages` → Global site packages (legacy path)
* `$(python -m site --user-base)/bin` → Dynamic path to user Python binaries
* `$HOME/.poetry/bin` → Poetry package manager executables

#### Ruby

* `$HOME/.rbenv/bin` → rbenv version manager
* `$HOME/.rbenv/shims` → Ruby version shims
* `$HOME/.gem/ruby/*/bin` → RubyGems binary install location
* `$HOME/.rvm/bin` → Ruby Version Manager (RVM) binaries

#### JavaScript / Node.js

##### NPM

* `$(npm bin -g)` → Global npm binaries (dynamic)
* `$HOME/.npm/bin` → User npm binaries
* `$HOME/.npm-global/bin` → Custom global npm install path
* `$HOME/.node_modules/bin` → Fallback for manual module installs

##### PNPM

* `$HOME/.pnpm` → PNPM store and data directory
* `$HOME/.pnpm-global/bin` → Global PNPM binaries

##### Yarn

* `$HOME/.yarn/bin` → Global Yarn binaries
* `$HOME/.config/yarn/global/node_modules/.bin` → Alternate global Yarn binary path

##### Volta

* `$HOME/.volta/bin` → Volta-managed Node.js tools and shims

##### Project-local

* `./node_modules/.bin` → Project-scoped binaries from npm/yarn

#### Rust

* `$HOME/.cargo/bin` → Cargo-installed tools and crates
* `$HOME/.rustup/toolchains/*/bin` → Rust toolchains installed via rustup

#### Go

* `$HOME/go/bin` → Go user workspace binaries
* `/usr/local/go/bin` → System-wide Go binaries

#### Java / Kotlin / JVM

##### Generic Java

* `$JAVA_HOME/bin` → Current active Java version

##### SDKMAN

* `$HOME/.sdkman/candidates/java/current/bin` → SDKMAN-managed Java
* `$HOME/.sdkman/candidates/kotlin/current/bin` → SDKMAN-managed Kotlin

##### jEnv

* `$HOME/.jenv/shims` → jEnv Java version shims

#### .NET

* `$HOME/.dotnet/tools` → User-level .NET Core tools

#### Haskell

* `$HOME/.cabal/bin` → Cabal package binaries
* `$HOME/.stack/bin` → Stack build tool binaries
* `$HOME/.ghcup/bin` → GHCup Haskell toolchain manager

#### Elixir / Erlang

* `$HOME/.mix/escripts` → Elixir mix scripts
* `$HOME/.asdf/shims` → asdf-managed version shims

#### Lua

* `$HOME/.luarocks/bin` → LuaRocks-installed packages

#### Nim

* `$HOME/.nimble/bin` → Nimble package binaries

#### D (Dlang)

* `$HOME/dlang/*/bin` → D toolchain binaries

#### Zig

* `$HOME/.zig/*/bin` → Zig compiler toolchain

#### Bun.js

* `$HOME/.bun/bin` → Bun runtime and package manager

#### Deno

* `$HOME/.deno/bin` → Deno runtime tools

#### WebAssembly

* `$HOME/.wasmer/bin` → Wasmer CLI for running WebAssembly

#### Dart / Flutter / Android

* `$HOME/.pub-cache/bin` → Dart package binaries
* `$HOME/Library/Android/sdk/platform-tools` → macOS Android SDK tools
* `$HOME/Android/Sdk/platform-tools` → Linux/Windows Android SDK tools

#### PHP

##### Composer

* `$HOME/.composer/vendor/bin` → Composer package executables

### DevOps / Infrastructure

#### Terraform

* `$HOME/.terraform.d/plugins` → Custom Terraform plugins

#### Kubernetes

* `$HOME/.krew/bin` → Krew plugin manager for `kubectl`
* `$HOME/bin/kubebuilder/bin` → KubeBuilder CLI tool

#### Docker

* `$HOME/.docker/cli-plugins` → Docker CLI extensions

#### Minikube

* `$HOME/.minikube/bin` → Minikube Kubernetes binaries

### Build Tools

#### Neovim (Bob)

* `$HOME/.local/share/bob/nvim-bin` → Bob-managed Neovim builds

### System Package Managers

#### Flatpak

* `$HOME/.local/share/flatpak/exports/bin` → User Flatpak app exports
* `/var/lib/flatpak/exports/bin` → System Flatpak app exports

#### Snap

* `/snap/bin` → Snap package runtime binaries

#### Nix

* `$HOME/.nix-profile/bin` → User-installed Nix packages
* `/run/current-system/sw/bin` → System profile for NixOS

### AI / LLMs

#### LM Studio

* `$HOME/.lmstudio/bin` → LM Studio CLI binaries

#### GPT4All

* `$HOME/.gpt4all` → GPT4All binaries (if using CLI tools)

#### TabbyML

* `$HOME/.tabby/bin` → TabbyML binaries (depending on install)

### macOS System

#### Apple CLI Tools

* `/Library/Apple/usr/bin` → Apple-supplied utilities not in `/usr/bin`

#### Homebrew

* `/opt/homebrew/bin` → Homebrew installed binaries
* `/opt/homebrew/sbin` → Homebrew installed services/daemons

#### TeX / LaTeX

* `/Library/TeX/texbin` → MacTeX binaries

#### Cryptex System Paths

* `/System/Cryptexes/App/usr/bin` → Cryptex app environment binaries
* `/var/run/com.apple.security.cryptexd/codex.system/bootstrap/usr/bin` → Bootstrap bin
* `/var/run/com.apple.security.cryptexd/codex.system/bootstrap/usr/local/bin` → Local bootstrap bin
* `/var/run/com.apple.security.cryptexd/codex.system/bootstrap/usr/appleinternal/bin` → Apple internal tools

### Linux System

#### Core System Paths

* `/usr/bin` → Standard user commands
* `/bin` → Essential system binaries
* `/usr/sbin` → System admin tools
* `/sbin` → Essential system admin tools

#### Internal Tooling

* `/usr/libexec` → Internal helper binaries
* `/usr/local/libexec` → Locally installed helpers

#### Local System Paths

* `/usr/local/bin` → Locally installed user commands
* `/usr/local/sbin` → Locally installed admin tools

#### Games

* `/usr/games` → Standard games
* `/usr/local/games` → Locally installed games

### Appendix

```bash

# -------------------- # Custom Scripts # -------------------- #

# Generic User Scripts Locations
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
PATH="$(npm bin -g):$PATH" # Global npm binaries (dynamic)
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

# Games
PATH="/usr/games:$PATH" # Standard games
PATH="/usr/local/games:$PATH" # Locally installed games``

```
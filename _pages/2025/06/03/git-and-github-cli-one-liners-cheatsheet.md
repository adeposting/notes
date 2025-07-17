---
title: "Git and GitHub CLI One-Liners Cheatsheet"
date: 2025-06-03
tags:
    - cli
    - development
    - engineering
    - gh
    - git
    - github
    - one-liners
    - software
    - software-development
    - software-engineering
categories:
    - /development
    - /cli/cheatsheets
description: "Useful `git` and `gh` (GitHub CLI) commands."
---

This is a cheatsheet of useful `git` and `gh` (GitHub CLI) commands.

Most are "one-liners", but a few more complex examples are included too.

For other one-liner cheatsheets, see my [CLI One-Liners Cheatsheets](https://adeposting.com/cli-one-liners-cheatsheets) page.

## Dependencies

* `awk`
* `basename`
* `curl`
* `dirname`
* `gh` *(Github CLI)*
* `git`
* `jq`
* `sed`
* `xargs`

---

## Basic Repository Info

### Check if path is inside a Git repo

```bash
git -C "$REPO_DIR" rev-parse --is-inside-work-tree
```

### Get root path of repository

```bash
git -C "$REPO_DIR" rev-parse --show-toplevel
```

### Get configured git user name

```bash
git -C "$REPO_DIR" config user.name
```

---

## Branches

### Get current branch

```bash
git -C "$REPO_DIR" rev-parse --abbrev-ref HEAD
```

### Get symbolic-ref short name (alternative for current branch)

```bash
git symbolic-ref --short HEAD
```

### Get default branch of origin remote (local repo)

```bash
git -C "$REPO_DIR" symbolic-ref refs/remotes/origin/HEAD | sed 's@refs/remotes/origin/@@'
```

### Get default branch from a remote URL

```bash
git ls-remote --symref "$REMOTE_URL" HEAD | awk '/ref: refs\/heads\// { gsub("refs/heads/", "", $2); print $2 }'
```

### Create a new local branch

```bash
git checkout -b "$NEW_BRANCH"
```

---

## Commits

### Get latest commit hash on local branch

```bash
git -C "$REPO_DIR" rev-parse "$BRANCH"
```

### Get latest commit hash on remote branch

```bash
git ls-remote "$REMOTE_URL" "refs/heads/$BRANCH" | awk '{print $1}'
```

### Check if commit is ancestor of branch

```bash
git -C "$REPO_DIR" merge-base --is-ancestor "$COMMIT" "$BRANCH"
```

### Check if commit A is ancestor of commit B

```bash
git -C "$REPO_DIR" merge-base --is-ancestor "$COMMIT" "$ANCESTOR_COMMIT"
```

---

## Tags

### Get commit hash of local tag

```bash
git -C "$REPO_DIR" rev-list -n 1 "$TAG"
```

### Get commit hash of remote tag

```bash
git ls-remote "$REMOTE_URL" "refs/tags/$TAG^{}" | awk '{print $1}'
```

### Get latest tag at a given commit (local repo)

```bash
git -C "$REPO_DIR" describe --tags --abbrev=0 "$COMMIT"
```

> **Note:** Getting the latest tag on a remote commit purely remotely (no clone) is generally not possible as a one-liner.

---

## Cloning

### Clone local repo if missing

```bash
if [ ! -d "$TARGET_DIR/.git" ]; then
  mkdir -p "$TARGET_DIR"
  git clone "$LOCAL_PATH" "$TARGET_DIR"
fi
```

### Clone remote repo if missing

```bash
if [ ! -d "$TARGET_DIR/.git" ]; then
  mkdir -p "$TARGET_DIR"
  git clone "$REMOTE_URL" "$TARGET_DIR"
fi
```

---

## Remotes

### List remotes

```bash
git -C "$REPO_DIR" remote
```

### Get remote origin URL

```bash
git -C "$REPO_DIR" config --get remote.origin.url
```

### Check if repo has a remote

```bash
git -C "$REPO_DIR" remote | grep . >/dev/null
```

### Check if remote origin is a URL vs. path

```bash
REMOTE_URL=$(git -C "$REPO_DIR" config --get remote.origin.url)
if [[ $REMOTE_URL =~ ^(git@|https?://) ]]; then
  echo "remote is a URL"
else
  echo "remote is a path"
fi
```

---

## Cleaning & Sync

### Clean working directory forcefully

```bash
git -C "$REPO_DIR" clean -xdf
```

### Fetch all remotes

```bash
git -C "$REPO_DIR" fetch --all
```

### Pull latest changes

```bash
git -C "$REPO_DIR" pull
```

### Pull with rebase

```bash
git -C "$REPO_DIR" pull --rebase
```

### Push and set upstream

```bash
git -C "$REPO_DIR" push --set-upstream origin "$BRANCH"
```

### Checkout branch

```bash
git -C "$REPO_DIR" checkout "$BRANCH"
```

### Checkout commit

```bash
git -C "$REPO_DIR" checkout "$COMMIT"
```

### Add all and commit

```bash
git -C "$REPO_DIR" add --all
git -C "$REPO_DIR" commit -m "$MESSAGE"
```

### Check for unstaged changes

```bash
git diff --quiet
```

### Check for staged but uncommitted changes

```bash
git diff --cached --quiet
```

---

## Submodules

### Remove section from .gitmodules

```bash
git config -f .gitmodules --remove-section "submodule.$SUBMODULE"
```

### Remove section from .git/config

```bash
git config --remove-section "submodule.$SUBMODULE"
```

### Check for staged submodule entry

```bash
git ls-files --stage "$SUBMODULE"
```

### Remove submodule from index

```bash
git rm -f "$SUBMODULE"
```

---

## File Operations

### Check if file exists at a commit

```bash
git -C "$REPO_DIR" cat-file -e "$COMMIT:$FILE_PATH"
```

### Show file content at a commit

```bash
git -C "$REPO_DIR" show "$COMMIT:$FILE_PATH"
```

### Find first matching license file

```bash
for f in LICENSE LICENSE.txt LICENSE.md COPYING; do
  git -C "$REPO_DIR" cat-file -e "$COMMIT:$f" && echo "$f" && break
done
```

### Find first matching README file

```bash
for f in README.md README.txt README.rst README.org README.adoc README.asciidoc; do
  git -C "$REPO_DIR" cat-file -e "$COMMIT:$f" && echo "$f" && break
done
```

### Get first sentence from README content

```bash
git -C "$REPO_DIR" show "$COMMIT:$README_FILE" | grep -o -m1 -E '.*?\.( |$)'
```

### Detect license type from license file

```bash
git -C "$REPO_DIR" show "$COMMIT:$LICENSE_FILE" | grep -i 'MIT License'
```

### Extract authors from license file

```bash
git -C "$REPO_DIR" show "$COMMIT:$LICENSE_FILE" | grep -i copyright | sed -E 's/.*copyright[^0-9]*//I'
```

---

## Repo Metadata

### Get repo owner from URL

#### SSH:

```bash
echo "$SSH_URL" | cut -d: -f2 | awk -F/ '{print $(NF-1)}'
```

#### HTTPS:

```bash
basename "$(dirname "$(basename "$(dirname "$REMOTE_URL")")")"
```

### Get repo name from URL

#### SSH:

```bash
basename "$(echo "$SSH_URL" | cut -d: -f2 .git)"
```

#### HTTPS:

```bash
basename "${REMOTE_URL%.git}"
```

### Get dirname of a repo path

```bash
basename "$REPO_DIR"
```

---

## GitHub CLI Commands

All `gh` CLI commands used in your scripts:

### View user login

```bash
gh api user --jq .login
```

### Check if a repo exists

```bash
gh repo view "$OWNER/$REPO"
```

### Create a repo

```bash
gh repo create "$OWNER/$REPO" --private --license MIT --add-readme
```

### Patch repo settings

```bash
gh api -X PATCH "repos/$OWNER/$REPO" \
  -f has_projects=false \
  -f allow_merge_commit=false \
  -f allow_squash_merge=true \
  -f allow_rebase_merge=true
```

### Get repo default branch

```bash
gh api "repos/$OWNER/$REPO" --jq .default_branch
```

### Get commit SHA of a branch ref

```bash
gh api "repos/$OWNER/$REPO/git/refs/heads/$BRANCH" --jq .object.sha
```

### Create a new branch ref

```bash
gh api "repos/$OWNER/$REPO/git/refs" \
  -f ref="refs/heads/$NEW_BRANCH" \
  -f sha="$COMMIT_SHA"
```

### Delete a repo

```bash
gh api -X DELETE "repos/$OWNER/$REPO"
```

---

## Recursive Operations (Not One-Liners)

### Recursively Discover Parent Repos via Remotes

**Walk up a chain of nested local repositories to discover the ultimate remote URL:**

```bash
find_remote() {
    local path="$1"
    local remote

    while true; do
        if git -C "$path" remote | grep -q origin; then
            remote=$(git -C "$path" config --get remote.origin.url)
            if [[ "$remote" =~ ^(git@|https?://) ]]; then
                echo "$remote"
                return
            else
                # It's a path; keep recursing upward
                path="$remote"
            fi
        else
            echo "$path"  # No remote found; probably a standalone repo
            return
        fi
    done
}

find_remote "$REPO_DIR"
```

### Recursively Fetch All Nested Submodules

**Fetch every submodule at every level:**

```bash
git submodule foreach --recursive 'git fetch --all'
```

### Thorough Submodule Removal Across Entire Repo Tree

**Recursively remove git submodules**

```bash
remove_submodule_recursive() {
    local repo="$1"
    local submodule="$2"

    cd "$repo" || return

    # Remove from .gitmodules
    git config -f .gitmodules --remove-section "submodule.$submodule" || true

    # Remove from .git/config
    git config --remove-section "submodule.$submodule" || true

    # Remove staged entry
    git rm -f "$submodule" || true

    # Delete physical folder
    rm -rf "$submodule"

    # Delete submodule metadata
    rm -rf ".git/modules/$submodule"

    # Check for nested submodules
    if [[ -d "$submodule/.gitmodules" ]]; then
        while IFS= read -r line; do
            path=$(echo "$line" | awk '{print $2}')
            remove_submodule_recursive "$submodule" "$path"
        done < <(git config -f "$submodule/.gitmodules" --get-regexp path)
    fi
}

# Example usage:
remove_submodule_recursive "$REPO_DIR" "$SUBMODULE_PATH"
```

### Bulk Creation or Deletion of Many Repos with Logic

E.g. using the GitHub CLI:

**Bulk create:**

```bash
for repo in repo1 repo2 repo3; do
    gh repo create "myuser/$repo" --private --add-readme
done
```

**Bulk delete (with confirmation):**

```bash
for repo in repo1 repo2 repo3; do
    echo "Deleting myuser/$repo"
    gh api -X DELETE "repos/myuser/$repo"
done
```

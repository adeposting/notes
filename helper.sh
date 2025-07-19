#!/bin/bash
  
set -euo pipefail

_helper() {

  # 1. Verify on branch main
  current_branch=$(git rev-parse --abbrev-ref HEAD)
  if [[ "$current_branch" != "main" ]]; then
    echo "Error: Must be on branch 'main' (currently on '$current_branch')" >&2
    return 1
  fi

  # 2. Verify no untracked or unstaged changes
  if [[ -n "$(git status --porcelain)" ]]; then
    echo "Error: Working directory is not clean (untracked or unstaged files present)" >&2
    return 1
  fi

  # 3. Determine the branch name (same as current git user)
  user_branch="$(git config user.name 2>/dev/null || true)"
  if [[ -z "$user_branch" ]]; then
    echo "Error: No git user.name configured" >&2
    return 1
  fi

  # 4. Get list of changed files between main and user branch
  changed_files=$(git diff --name-only main "$user_branch" -- '*.md' | sort)
  if [[ -z "$changed_files" ]]; then
    echo "No markdown files changed between 'main' and '$user_branch'."
    return 0
  fi

  # 5. Loop over each changed file
  for file in $changed_files; do
    # Skip if the file does not exist on the branch (shouldn't happen normally)
    if ! git ls-tree -r --name-only "$user_branch" | grep -q "^$file\$"; then
      echo "Skipping $file (not present in $user_branch)"
      continue
    fi

    # Check if file is new (does not exist in main)
    if ! git ls-tree -r --name-only main | grep -q "^$file\$"; then
      status="created"
    else
      status="modified"
    fi

    # Checkout file from user branch and stage it
    git checkout "$user_branch" -- "$file"
    git add "$file"

    # Extract the title from YAML metadata
    title=$(grep -E '^title:' "$file" | head -n1 | sed -E 's/^title:[[:space:]]*"?([^"]*)"?/\1/')

    # Commit with the appropriate message
    if [[ "$status" == "created" ]]; then
      git commit -m "Add '$title'"
    else
      git commit -m "Update '$title'"
    fi
  done
}

_helper
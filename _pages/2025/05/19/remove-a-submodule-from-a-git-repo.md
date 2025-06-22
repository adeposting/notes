---
title: 'Remove a Submodule from a Git Repo'
date: 2025-05-19
categories:
    - /development
    - /git
    - /tutorials
tags:
    - code
    - git
    - git-submodule
    - programming
    - software
    - software-development
    - software-engineering
---

Doing a simple `git rm <path-to-submodule>` doesn't actually fully remove a submodule; it leaves a submodule directory at `.git/modules/<path-to-submodule>`, and a section in the `.gitmodules` file.

So here's a script to *completely* remove a submodule from a git repo. Note that it assumes that the submodule is at `./<path-to-submodule>` relative to the root of the git repository. You will have to adjust this if it is at a different path.

```bash
git rm <path-to-submodule> || echo
rm -rf .git/modules/<path-to-submodule>
git config --remove-section submodule.<path-to-submodule>
```

This script is adapted from a [How do I remove a submodule?](https://stackoverflow.com/questions/1260748/how-do-i-remove-a-submodule) question on Stack Overflow.

## See Also

- [Category: /development](/notes-by-category#category-/development)

- [Category: /git](/notes-by-category#category-/git)

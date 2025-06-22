---
title: GitPython Examples
date: 2025-05-08
categories:
    - /development
    - /programming
    - /tools
    - /git
    - /github
tags:
    - automation
    - code
    - code-snippets
    - development
    - git
    - github
    - programming
    - python
    - python-libraries
    - snippets
    - software-development
    - software-engineering
    - tools
    - version-control
---

This is a list of example code snippets for using git in Python via the GitPython package.

Use GitPython for local git operations. See [PyGitHub Examples](/pygithub-examples) for working with GitHub's API in Python.

---

## Clone + Configure Repo

**Input:** GitHub repo URL  
**Output:** Clones the repository to `/tmp/repo`

```python
>>> repo = Repo.clone_from("https://github.com/org/repo.git", "/tmp/repo")
```

---

## Pull + Push

**Input:** Local changes or remote updates  
**Output:** Pulls with rebase; pushes to remote

```python
>>> repo.remotes.origin.pull(rebase=True)
>>> repo.remotes.origin.push()
```

---

## Force Push + Reset

**Input:** Local repo with unsynced state  
**Output:** Forces remote to match local; resets local repo to HEAD

```python
>>> repo.remotes.origin.push(force=True)
>>> repo.git.reset("--hard")
```

---

## Add All Files

**Input:** All modified or new files  
**Output:** Stages all file changes

```python
>>> repo.git.add(A=True)
```

---

## Add Specific File

**Input:** A single file  
**Output:** Stages `file.txt` only

```python
>>> repo.git.add("file.txt")
```

---

## Commit

**Input:** Staged files  
**Output:** Creates a new commit with message

```python
>>> repo.index.commit("A new commit")
```

---

## Amend Commit (with message)

**Input:** Amends last commit  
**Output:** Replaces commit message and content

```python
>>> repo.git.commit("--amend", "-m", "Updated message")
```

---

## Amend Commit (no edit)

**Input:** Amends content, keeps previous message  
**Output:** Commit updated silently

```python
>>> repo.git.commit("--amend", "--no-edit")
```

---

## Create and Switch to Branch

**Input:** New branch name  
**Output:** Creates and checks out `feature-x`

```python
>>> branch = repo.create_head("feature-x")
>>> branch.checkout()
```

---

## List Local Branches

**Input:** None  
**Output:** stdoutavailable local branches

```python
>>> print(repo.branches)
```

**stdout**

```sh
[<git.Head "refs/heads/main">, <git.Head "refs/heads/feature-x">]
```

---

## List Remote Branches

**Input:** None  
**Output:** stdoutnames of remote branches

```python
>>> print([r.name for r in repo.remotes.origin.refs])
```

**stdout**

```sh
['origin/HEAD', 'origin/main']
```

---

## Create Tag

**Input:** Tag name and message  
**Output:** Creates annotated tag `v1.0.0`

```python
>>> repo.create_tag("v1.0.0", message="Release!")
```

---

## List Tags

**Input:** None  
**Output:** Lists all tags in the repo

```python
>>> print([t.name for t in repo.tags])
```

**stdout**

```sh
['v1.0.0']
```

---

## Diff Between Branches

**Input:** Branch names  
**Output:** Lists changed files between branches

```python
>>> diff = repo.git.diff("main..feature-x", name_only=True)
>>> print("Changed files:", diff.splitlines())
```

**stdout**

```sh
Changed files: ['README.md', 'src/utils.py']
```

---

## Squash Merge

**Input:** Source and target branches  
**Output:** Squashes all changes into one commit on `main`

```python
>>> repo.git.checkout("main")
>>> repo.git.merge("feature-x", "--squash")
>>> repo.git.commit("-m", "Squash merged feature-x")
```

---

## Sync All Org Repos (PyGitHub + GitPython)

**Input:** GitHub token and org name  
**Output:** Clones or pulls all repos into `/repos/org-name`

```python
>>> from github import Github
>>> from git import Repo
>>> import os
>>> 
>>> g = Github("your_token")
>>> org = g.get_organization("org-name")
>>> base_path = "/repos/org-name"
>>> 
>>> for r in org.get_repos():
...     path = os.path.join(base_path, r.name)
...     if os.path.exists(path):
...         Repo(path).remotes.origin.pull(rebase=True)
...     else:
...         Repo.clone_from(r.clone_url, path)
...
```

---

## Iterate Over Submodules

**Input:** Repository with submodules  
**Output:** Lists submodules and their latest commit

```python
>>> for sub in repo.submodules:
...     print(f"{sub.name} -> {sub.url}")
...     sub_repo = sub.module()
...     print("Latest:", sub_repo.head.commit.hexsha)
... 
```

**stdout**

```sh
libs/utils -> https://github.com/org/utils.git  
Latest: a12bc3456def7890abcdef1234567890abcdef12
```

---

## Update Submodules

**Input:** None  
**Output:** Initializes, updates, and pulls all submodules

```python
>>> repo.git.submodule("update", "--init", "--recursive")
>>> repo.git.submodule("foreach", "git pull origin main")
```

---

## List All Tracked Files

**Input:** None  
**Output:** Lists all Git-tracked files in the latest commit

```python
>>> for obj in repo.tree().traverse():
...     print(obj.path)
```

**stdout**

```sh
README.md  
pyproject.toml  
src/main.py  
src/utils.py  
tests/test_main.py
```

---

## See Also

- [Category: /development](/notes-by-category#category-/development)

- [Category: /git](/notes-by-category#category-/git)

- [Category: /github](/notes-by-category#category-/github)
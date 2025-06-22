---
title: PyGitHub Examples
date: 2025-05-21
categories:
    - /development
    - /git
    - /github
    - /programming
    - /tools
tags:
    - api
    - automation
    - code
    - code-snippets
    - development
    - git
    - github
    - github-api
    - programming
    - python
    - python-libraries
    - software-development
    - software-engineering
    - tools
    - version-control
---

This is a list of example code snippets for interacting with the Github API in Python via the PyGitHub package.

Use PyGitHub for interacting with GitHub repositories, pull requests, branches, and metadata through the GitHub API. See [GitPython Examples](/gitpython-examples) for local Git operations.

---

## Authenticate and Get Repository

**Input:** GitHub token and repository name  
**Output:** Authenticates and loads the repo object

```python
from github import Github
g = Github("your_github_token")
repo = g.get_repo("octocat/Hello-World")
```

---

## Get Repository Description and License

**Input:** None  
**Output:** Displays repo description and license name

```python
print("Description:", repo.description)
print("License:", repo.get_license().license.name)
```

**stdout**

```sh
Description: My first repo on GitHub!
License: MIT License
```

---

## List Files in Root Directory

**Input:** None  
**Output:** Lists paths of files in the root of the repository

```python
contents = repo.get_contents("")
for content in contents:
    print(content.path)
```

**stdout**

```sh
README.md
LICENSE
main.py
```

---

## Get Tags

**Input:** None  
**Output:** Lists Git tags in the repository

```python
tags = repo.get_tags()
print([tag.name for tag in tags])
```

**stdout**

```sh
['v1.0.0', 'v1.1.0', 'v2.0.0']
```

---

## Get Releases

**Input:** None  
**Output:** Lists titles of published GitHub releases

```python
releases = repo.get_releases()
print([release.title for release in releases])
```

**stdout**

```sh
['Initial Release', 'Bugfix Release', 'Major Update']
```

---

## Create a Tag and Release

**Input:** Tag name, message, and commit SHA  
**Output:** Creates both a Git tag and a GitHub release

```python
repo.create_git_tag_and_release(
    tag="v1.2.0",
    tag_message="Release version 1.2.0",
    release_name="v1.2.0",
    release_message="Changelog:\n- New features\n- Fixes",
    object=repo.get_commits()[0].sha,
    type="commit"
)
```

---

## List Branches

**Input:** None  
**Output:** Lists all branches in the repository

```python
branches = repo.get_branches()
for branch in branches:
    print(branch.name)
```

**stdout**

```sh
main
dev
feature/login
```

---

## Get Latest Commit Message for a Branch

**Input:** Branch name  
**Output:** Latest commit message on that branch

```python
branch = repo.get_branch("main")
commit = repo.get_commit(branch.commit.sha)
print(commit.commit.message)
```

**stdout**

```sh
Refactor authentication middleware
```

---

## Compare Two Branches

**Input:** Base and head branch names  
**Output:** Shows commit distance between branches

```python
comparison = repo.compare("main", "feature/login")
print("Ahead by:", comparison.ahead_by)
print("Behind by:", comparison.behind_by)
```

**stdout**

```sh
Ahead by: 3
Behind by: 1
```

---

## Create a Pull Request

**Input:** PR title, description, head branch, base branch  
**Output:** Creates a pull request on GitHub

```python
repo.create_pull(
    title="Add login feature",
    body="Implements login using JWT",
    head="feature/login",
    base="main"
)
```

---

## Merge a Pull Request (Squash)

**Input:** Pull request number  
**Output:** Merges the PR using squash strategy

```python
pr = repo.get_pull(42)
pr.merge(merge_method="squash")
```

---

## List All Repos for a User

**Input:** GitHub username  
**Output:** Lists all public repos owned by the user

```python
user = g.get_user("octocat")
repos = user.get_repos()
for r in repos:
    print(r.full_name)
```

**stdout**

```bash
octocat/Hello-World
octocat/Spoon-Knife
octocat/octo-app
```

---

## View `.gitmodules` File (if present)

**Input:** None  
**Output:** Shows raw content of `.gitmodules` file

```python
gitmodules = repo.get_contents(".gitmodules")
print(gitmodules.decoded_content.decode())
```

**stdout**

```python
[submodule "libs/foo"]
    path = libs/foo
    url = https://github.com/example/foo.git
```

---

## See Also

- [Category: /development](/notes-by-category#category-/development)

- [Category: /git](/notes-by-category#category-/git)

- [Category: /github](/notes-by-category#category-/github)
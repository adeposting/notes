---
title: 'RFC Repository Specification'
date: 2025-06-06
categories:
  - /development
  - /project-management
  - /software
tags:
  - boilerplate
  - development
  - project-management
  - rfc
  - software
  - software-development
  - software-engineering
  - specification
  - standard
  - template
---

This article is a specification for a software RFC repository. An RFC repository contains the RFCs (Requests for Comments) for a project, including supporting documentation regarding their lifecycle and asscociated processes. RFCs are structured documents proposing standards, changes, processes, or enhancements to the system. An RFC repository also tracks implementation status, automated validation, and final reference documentation. This specification provides structure and templates for a software project called "Hello World".

> The follow-up article [RFC Repository Tools](/rfc-repository-tools), which *"defines the automation and tooling architecture for managing a software RFC repository"*. The follow-up [RFC Repository Tools](/rfc-repository-tools) article is recommended as a next step after you have adoted the standard given in this article.

---

## Directory Structure

An RFC repository shall have the following directory structure:

```
rfcs/
├── .github/                # GitHub automation: lint, validate, format
│   ├── actions/            # Custom or reused composite actions
│   └── workflows/          # GitHub Actions YAML files
├── .gitignore              # Ignores build artifacts
├── CONTRIBUTING.md         # Rules for RFC authors and reviewers
├── LICENSE                 # License for the RFC repository
├── README.md               # High-level index and overview
├── TEMPLATE.md             # Canonical RFC template
├── accepted/               # RFCs that have been accepted in principle
│   ├── RFC-19951204-0003-jit-everything.md
│   └── ...
├── drafts/                 # Proposed RFCs. Must be complete and use `TEMPLATE.md`
│   ├── RFC-19700101-0001-hello-world.md
│   └── ...
├── final/                  # RFCs locked and finalized (spec-complete)
│   ├── RFC-20140903-0006-containerize-all-the-things.md
│   └── ...
├── implemented/            # Reference documents with commit mapping
│   ├── RFC-19951204-0003-jit-everything.md
│   └── TEMPLATE.md         # Template for implementation summaries
├── rejected/               # RFCs that were reviewed and declined
│   ├── RFC-20000101-0004-tab-delimited-json.md
│   └── ...
├── review/                 # RFCs currently under active community review
│   ├── RFC-19830315-0002-dns-naming-conventions.md
│   └── ...
├── withdrawn/              # RFCs withdrawn by the original author
│   ├── RFC-20131212-0005-bitcoin-smart-contracts.md
│   └── ...
└── wip/                    # Incomplete RFCs (e.g. notes, TODOs, informal drafts)
    ├── RFC-19911120-0000-linux-package-ecosystems.md
    └── ...
```

The top-level `rfcs` directory may be a subdirectory of the repository root or may be the repository root itself.

---

## README.md

The `README.md` file of an RFC repository is as follows. To use this `README.md` file, replace all occurrences of "Hello World" with the name of your software project. All other parts may remain unchanged.

```markdown
# RFCs: Hello World

This repository defines and evolves Hello World through RFCs (Requests for Comments).

## Lifecycle

RFCs move through a structured lifecycle:

- `wip/`: Incomplete RFCs with TODOs.
- `drafts/`: Proposed via PR, complete and properly formatted.
- `review/`: Under active review and discussion.
- `accepted/`: Approved but not necessarily implemented.
- `final/`: Fully accepted and considered stable.
- `implemented/`: Fully implemented; maps commits to spec behavior.
- `rejected/`: Formally declined.
- `withdrawn/`: Author-closed or abandoned.

## Process

1. Copy `TEMPLATE.md` into `wip/` or directly to `drafts/`.
2. Submit a PR for review.
3. Reviewers move it to `review/`.
4. Once accepted, it is moved to `accepted/`.
5. Once finalized or fully implemented, move to `final/` or `implemented/`.

## Build

Run `make` to convert Markdown files into HTML in `dist/`.

## License

All RFCs are licensed under the terms specified in `LICENSE`.
```

## CONTRIBUTING.md

The `CONTRIBUTING.md` file of an RFC repository is as follows. No changes to the following are required to adopting this example for your project.

```markdown
# CONTRIBUTING

## Summary

We use RFCs to manage all major changes to the project, including technical standards, workflows, tooling, or meta-processes.

## Directories

- `wip/`: Optional. Incomplete RFCs with TODOs. No review.
- `drafts/`: Proposed RFCs. Must be complete and use `TEMPLATE.md`.
- `review/`: In formal review process.
- `accepted/`: Approved by reviewers. Considered part of roadmap.
- `final/`: Specified and stable. Locked.
- `implemented/`: Mapped to commit history.
- `rejected/`: Rejected during review.
- `withdrawn/`: Voluntarily closed by authors.

## Filename Format

All RFC files **must be named** in the following format:

`RFC-YYYYMMDD-NNNN-<title>.md`

- `YYYYMMDD`: Date of submission
- `NNNN`: Zero-padded sequence number
- `<title>`: Short, descriptive, kebab-case title (e.g. `RFC-19700101-0001-hello-world.md`)

## Requirements

- RFCs **must** follow the structure in `TEMPLATE.md`.
- RFCs must include a front matter block with:
  - `RFC ID`: Format `YYYYMMDD-NNNN`
  - `Status`: One of [Accepted, Draft, Final, Implemented, Rejected, Review, WIP, Withdrawn]
  - `Author`, `Created`, `Updated`, etc.

## Implementation Tracking

If accepted and implemented:

- Authors **must create** an IMPL file under `implemented/` in the following format:

`IMPL-YYYYMMDD-NNNN-<title>`

- The filename must be the same as the accepted RFC, but with `RFC` replaced with `IMPL`.
- IMPLs **must** follow the structure in `implemented/TEMPLATE.md`.

## Review Process

1. Submit a PR with your RFC under `drafts/` using the correct filename and template.
2. The core team will review and request edits as needed.
3. Once approved, the RFC will be moved to `review/` or directly to `accepted/`.
4. Upon implementation, the corresponding IMPL file in `implemented/` must be created.

## License

All contributions are made under the license in `LICENSE`.
```

## TEMPLATE.md

The top-level `TEMPLATE.md` file of an RFC repository is as follows. No changes to the following are required to adopting this example for your project.

```markdown
# RFC: <Title> <RFC-ID>

- **RFC ID**: YYYYMMDD-NNNN
- **Title**: <Title>
- **Author**: <Authors>
- **Created**: YYYY-MM-DD
- **Updated**: YYYY-MM-DD
- **Status**: Accepted | Draft | Final | Implemented | Rejected | Review | WIP | Withdrawn
- **Supersedes**: <Optional>
- **Related**: <Optional>

---

## 1. Summary

Brief description of the proposal.

## 2. Motivation

Why this RFC is needed. What problem it solves.

## 3. Proposal

The core of the proposal — syntax, semantics, changes, etc.

## 4. Rationale

Why this approach. Alternatives considered.

## 5. Compatibility

How it affects existing features. Any breaking changes.

## 6. Implementation

(Optional) Notes on implementation or current progress.

## 7. Security

Any risks or mitigation.

## 8. Unresolved Questions

List open questions or edge cases.

## 9. Future Directions

Optional section on extensions, roadmap ideas.
````

---

## implemented/TEMPLATE.md

The `implemented/TEMPLATE.md` file of an RFC repository is as follows. No changes to the following are required to adopting this example for your project.

```markdown
# IMPL: <Title> <RFC-ID>

- **RFC ID**: YYYYMMDD-NNNN
- **Title**: <Title>
- **Author**: <Authors>
- **Completed**: YYYY-MM-DD
- **Status**: Implemented
- **Linked RFC**: [accepted/YYYYMMDD-NNNN-title.md](../accepted/YYYYMMDD-NNNN-<title>.md)
- **Related IMPLs**: <Optional>

## Release

- [v1.2.3](https://github.com/example/helloworld/tag/v1.2.3)

## Pull Requests

- [Solve the Halting Problem #456](https://github.com/example/helloworld/pull/456)
- [Prove That P Equals NP #789](https://github.com/example/helloworld/pull/789)

## Commits

- [`abc123`](https://github.com/example/helloworld/commit/abc123): Core logic
- [`def456`](https://github.com/example/helloworld/commit/def456): CLI interface

## Notes

- This can include brief additional information on the implementation.
- If more detail is required this should link to external documentation.
```

---

## .gitignore

A basic `.gitignore` file for an RFC repository is as follows. If your RFC repository includes the generation of other files or directories during build, include them here.

```gitignore
# Build artifacts
dist/
*.html

# OS + editor cruft
.DS_Store
*.swp
*.bak
*~
```

---

## Summary

* Use **folders for each RFC status** to clearly separate lifecycle states.
* `README.md` documents structure and lifecycle.
* `CONTRIBUTING.md` enforces format, PR policy, and implementation tracking.
* RFCs must follow `TEMPLATE.md`.
* Implemented RFCs get a mirrored entry under `implemented/` with links to commits.

---

## Optional Enhancements

* **CI** to validate front matter or enforce naming
* **Index page** with a table of all RFCs and links
* **Tagging system** (by component, domain, version target)

---

## See Also

* [RFC Repository Tools](/rfc-repository-tools) - *"This article defines the automation and tooling architecture for managing a software RFC repository"*
* [Semantic Versioning Specification](https://semver.org/) — for managing RFC version identifiers and changes over time.
* [Rust RFCs](https://github.com/rust-lang/rfcs) — widely regarded open RFC process with accepted best practices.
* [React RFCs](https://github.com/reactjs/rfcs) — example of a pragmatic, informal RFC structure used in production tooling.
* [Swift Evolution](https://github.com/apple/swift-evolution) — a tightly managed language evolution process with tracked implementation status.
* [IETF RFC Index](https://www.rfc-editor.org/rfc-index.html) — formal internet RFCs used for protocol standards, offering historical precedent and structure.
* [Keep a Changelog](https://keepachangelog.com/en/1.0.0/) — useful for tracking implementation phases and changelogs once RFCs are finalized.
* [Conventional Commits](https://www.conventionalcommits.org/) — a commit message convention that can complement implementation tracking in RFCs.
* [ADR (Architecture Decision Records)](https://adr.github.io/) — lightweight alternative to RFCs for recording technical decisions at smaller scope.

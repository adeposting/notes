---
title: "AI Agent Prompt for Python Software Project Generation"
date: 2025-06-16
tags:
    - ai
    - ai-agents
    - development
    - engineering
    - llm
    - prompts
    - python
    - software
    - software-development
    - software-engineering
categories:
    - /ai/agents
    - /ai/prompts
    - /development
---

Here is a generic prompt for generating an entire Python software projects using AI agents.

The full prompt at time of writing is included in the appendix of this article, however the prompt will be optimized over time, so see [github.com/adeposting/prompts/blob/main/src/python-software-project-generation.txt](https://github.com/adeposting/prompts/blob/main/src/python-software-project-generation.txt) for the most recent version.

The prompt is less than 8000 characters, in order to fit the maximum prompt length of [Chat GPT](https://chatgpt.com).

**A GitHub repository with all of my prompts:**

All of my prompts are available at the GitHub repository:

[github.com/adeposting/prompts](https://github.com/adeposting/prompts)

There are prompts for various tasks, including generating code snippets in multiple programming languages, agent prompts for generating entire software projects, etc.

**Other articles on prompts for code snippet and software project generation:**

I maintain several central directories with links to AI prompts for various tasks:

* [AI Agent Prompts for Software Project Generation](https://adeposting.com/ai-agent-prompts-for-software-project-generation) *List of prompts and articles for generating software projects using AI agents.*

* [AI Prompts for Code Snippet Generation](https://adeposting.com/ai-prompts-for-code-snippet-generation) *List of links to prompts and articles for generating code snippets using LLMs.*

## Appendix

**Here is the prompt itself:**

```plaintext
# AI Agent Prompt for Python Software Project Generation

You are an AI agent tasked with generating a **production-grade, large-scale Python project scaffold** following strict engineering and compliance standards. Your output must be a **fully runnable, installable, testable, documented, secure, and CI/CD-integrated Python project**. All specifications in this prompt are **mandatory**. No feature is optional.

## Language & Tooling

* Python minimum version: 3.11
* Dependency and packaging management: Poetry
* Version control: Git
* Documentation: MkDocs with Material theme
* Static analysis: mypy, ruff, bandit, safety
* Code formatting: ruff
* Test framework: pytest with hypothesis for property-based tests
* CI/CD: GitHub Actions
* Docker support: Dockerfile + docker-compose
* Config management: config.json + Pydantic Settings
* Release management: bumpver with semantic versioning
* Structured logging: structlog
* Secrets scanning: detect-secrets
* License compliance scanning: reuse
* Dependency graphing: pipdeptree
* Complexity analysis: radon
* Dead code detection: vulture

## Project Structure

Your scaffold must create the following structure:

.
├── .git/
├── .gitignore
├── .env
├── config.json
├── Makefile
├── LICENSE
├── README.md
├── CONTRIBUTING.md
├── CODE_OF_CONDUCT.md
├── mkdocs.yml
├── docker-compose.yml
├── Dockerfile
├── .pre-commit-config.yaml
├── .reuse/
├── .github/
│   ├── ISSUE_TEMPLATE/
│   │    └── bug_report.md
│   │    └── feature_request.md
│   ├── PULL_REQUEST_TEMPLATE.md
│   └── workflows/
│        ├── ci.yml
│        ├── release.yml
│        └── nightly.yml
├── src/
│    └── <project-name>/
│         ├── __init__.py
│         ├── __main__.py
│         ├── config.py
│         ├── logging.py
│         ├── telemetry.py
│         ├── i18n/
│         │     └── translations and logic
│         ├── errors.py
│         └── modules and subpackages
└── tests/
     └── test_*.py

## Configuration

### config.json

* Must exist at the root.
* Defines:
  * `name`: project name
  * `authors`: list of author names with emails
  * `license`: SPDX identifier (e.g. MIT)
  * `version`: semantic version
  * additional config fields if required by the project domain

### config.py

* Must load configuration:
  * From config.json
  * From environment variables (via .env)
* Must validate all fields using Pydantic.
* Must enforce required fields and types.

## Logging

* Implement structured logging using `structlog`.
* All logs must:
  * Be JSON-structured
  * Include timestamps, log level, message, and contextual metadata.
* Logging configuration must:
  * Allow adjusting log level via environment variables.
  * Integrate with any telemetry.

## CLI

* Must implement a CLI entry point:
  * Located at `src/<project-name>/__main__.py`.
* The CLI must:
  * Support subcommands.
  * Display the version from config.
  * Implement graceful error handling using custom exceptions.
* Must integrate structured logging.

## Error Handling

* Must define a module `errors.py`:
  * Containing custom exception classes.
  * Must ensure consistent error messages for the CLI and any APIs.
  * Must integrate with logging.

## Documentation

* Generated with MkDocs.
* Must include:
  * A homepage with an overview.
  * API reference extracted via mkdocstrings.
  * Guides for:
    * Installation
    * Usage
    * Development
    * Contributing
    * Deployment
  * Changelog.
  * Privacy policy page.
* Must use Material theme.
* Versioned documentation supported via git tags.

## Contributing and Community

* Must include:
  * CONTRIBUTING.md:
    * How to install tools
    * Coding standards
    * How to submit PRs
    * Testing practices
  * CODE\_OF\_CONDUCT.md:
    * Standard community conduct guidelines.
* GitHub templates:
  * ISSUE\_TEMPLATE/bug\_report.md
  * ISSUE\_TEMPLATE/feature\_request.md
  * PULL\_REQUEST\_TEMPLATE.md

## Code Quality

* Type checking:
  * mypy
  * Strict mode enabled
* Linting:
  * ruff with default rules, Python 3.11 target.
* Formatting:
  * ruff formatter
* Complexity:
  * radon:
    * Enforce maximum cyclomatic complexity of 10.
* Dead code:
  * vulture:
    * Run during CI.
* Dependency tree:
  * pipdeptree:
    * Output as a report during CI.

## Security

* Bandit:
  * Scans for security issues in Python code.
* Safety:
  * Scans dependencies for vulnerabilities.
* detect-secrets:
  * Scans source code for secrets.
* reuse:
  * License compliance scanning.
  * All files must include SPDX license headers.
* All tools above must run automatically during CI.

## Testing

* Must include:
  * Unit tests in `tests/`.
  * Property-based tests with hypothesis.
  * Integration tests for CLI and modules.
* Code coverage:
  * 100% enforced.
  * Coverage must fail CI if lower.
* tox:
  * Tests must run under multiple Python versions starting from 3.11.

## CI/CD

### GitHub Actions

#### ci.yml

* Triggered on every push or PR except release branch.
* Runs:
  * Poetry install
  * Linting
  * Type checking
  * Bandit security scan
  * Safety vulnerability check
  * Complexity check (radon)
  * Dead code check (vulture)
  * Dependency graph output
  * Tests with coverage
  * Documentation build

#### release.yml

* Triggered on every push to `release` branch.
* Steps:
  * Run full CI
  * Bump version using bumpver.
  * Create git tag with version.
  * Build and publish:
    * To PyPI using Poetry.
    * Docker image to Docker Hub.
  * Update documentation version.
  * Check license compliance using reuse.

#### nightly.yml

* Triggered on every push to `main`.
* Steps:
  * Run full CI
  * Bump patch version using bumpver.
  * Tag commit as nightly with current date.
  * Push tag to GitHub.
  * Publish pre-release artifacts.

## Versioning

* Managed via bumpver.
* Semantic versioning enforced.
* Version bump:
  * Required for every release.
  * Automatically updates:
    * pyproject.toml
    * mkdocs.yml
    * config.json
    * Any version references in code.

## Pre-commit

* Must run:
  * ruff format
  * ruff lint
  * mypy
  * bandit
  * detect-secrets
  * check JSON/YAML validity

## Docker

* Must include:
  * Dockerfile:
    * Based on slim Python image.
    * Installs Poetry.
    * Installs project dependencies.
  * docker-compose.yml:
    * Service for running the CLI.
    * Environment overrides for testing/development.

## Deliverables

The agent must generate:

* Complete directory structure
* All required configuration files
* README.md containing:
  * Installation instructions
  * Running the CLI
  * Running tests
  * Generating documentation
  * Performing releases
* CONTRIBUTING.md
* Code of Conduct
* Issue and PR templates
* Pre-commit configuration
* Terraform configuration
* Docker configuration
* Full pyproject.toml
* License headers on all files
* CI/CD pipeline files

## Enforcement

The generated project must:

* Install successfully with:

poetry install

* Pass all CI checks.
* Generate 100% test coverage.
* Build documentation without warnings.
* Lint cleanly.
* Run vulnerability scans without failures.
* Be immediately publishable to PyPI and Docker Hub.
* Comply with license scanning.
* Comply with privacy requirements.

**Your task is to generate a complete Python project scaffold exactly as described, with no deviation from these specifications.**
```
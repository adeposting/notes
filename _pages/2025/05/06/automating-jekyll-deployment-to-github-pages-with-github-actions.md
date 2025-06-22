---
title: Automating Jekyll Deployment to GitHub Pages with GitHub Actions 
date: 2025-05-06
categories:
  - /web-development
  - /devops
  - /github
  - /github-pages
  - /jekyll
tags:
  - git
  - github
  - github-actions
  - github-io
  - github-pages
  - github-workflows
  - jekyll
  - web-dev
  - web-development
---

This guide shows how to build and deploy a Jekyll site to GitHub Pages using GitHub Actions. GitHub Pages will serve your site directly from the artifact built in the workflow.

---

## Table of Contents

1. [Overview](#1-overview)
    
2. [Requirements](#2-requirements)
    
3. [Repository Setup](#3-repository-setup)
    
4. [Jekyll Site Structure](#4-jekyll-site-structure)
    
5. [Creating the Deployment Workflow](#5-creating-the-deployment-workflow)
    
6. [Configuring GitHub Pages](#6-configuring-github-pages)
    
7. [Deploying the Site](#7-deploying-the-site)
    
8. [Troubleshooting](#8-troubleshooting)
    
---

## 1. Overview

We'll use a GitHub Actions workflow to:

- Build your Jekyll site from source
    
- Package the static output from `_site/` into a Pages artifact
    
- Deploy to GitHub Pages using that artifact
    

---

## 2. Requirements

You need:

- A GitHub repository (public or private)
    
- A valid Jekyll site with:
    
    - `_config.yml`
        
    - `Gemfile`
        
- A default branch named `main`
    
- GitHub Pages source set to **GitHub Actions**
    

---

## 3. Repository Setup

Your project should include the following files:

```
.
├── _config.yml
├── index.md
├── _posts/
├── _layouts/
├── Gemfile
├── Gemfile.lock
└── .github/
    └── workflows/
        └── gh-pages.yml
```

Ensure `Gemfile` includes at minimum:

```ruby
source "https://rubygems.org"
gem "jekyll"
```

Run locally:

```bash
bundle install
```

Commit both `Gemfile` and `Gemfile.lock`.

---

## 4. Jekyll Site Structure

Make sure your Jekyll site has a valid `_config.yml`. Example:

```yaml
title: My Site
baseurl: "" # Leave empty for apex or user site
url: "https://username.github.io" # or your custom domain
```

You can test locally with:

```bash
bundle exec jekyll serve
```

---

## 5. Creating the Deployment Workflow

Create the file `.github/workflows/gh-pages.yml` with the following contents:

```yaml
name: GitHub Pages

on:
  push:
    branches:
      - main
  pull_request:
    branches:
      - main
  workflow_dispatch:

permissions:
  contents: write
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  deploy:
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}

    steps:
    - name: Checkout code
      uses: actions/checkout@v4

    - name: Set up Ruby
      uses: ruby/setup-ruby@v1
      with:
        ruby-version: '3.1.6'
        bundler-cache: true

    - name: Install dependencies
      run: |
        gem install bundler
        bundle install --without debug

    - name: Build Jekyll site
      run: |
        bundle exec jekyll build

    - name: Setup GitHub Pages
      uses: actions/configure-pages@v4

    - name: Upload artifact for GitHub Pages
      uses: actions/upload-pages-artifact@v3
      with:
        path: ./_site

    - name: Deploy to GitHub Pages
      id: deployment
      uses: actions/deploy-pages@v4
```

---

## 6. Configuring GitHub Pages

To enable deployment from GitHub Actions:

1. Go to your repository → **Settings**
    
2. Click **Pages** in the sidebar
    
3. Under **Build and deployment**, set:
    
    - **Source**: GitHub Actions
        

You do **not** need to choose a branch or folder. The workflow handles it.

---

## 7. Deploying the Site

Once the `gh-pages.yml` workflow is committed and pushed:

```bash
git add .
git commit -m "Set up automated Jekyll deployment"
git push origin main
```

Go to the **Actions** tab and watch the `GitHub Pages` workflow run. Once it finishes, your site will be live at:

- **User site**: `https://username.github.io`
    
- **Project site**: `https://username.github.io/repo-name`
    
- **Custom domain**: `https://yourdomain.com` (if configured)
    

---

## 8. Troubleshooting

### My site doesn't deploy

- Ensure `bundle exec jekyll build` succeeds locally
    
- Confirm `Gemfile` includes `jekyll`
    
- Make sure the Pages source is set to GitHub Actions
    

### No HTTPS?

- Make sure your domain is verified and configured correctly
    
- Check **Settings → Pages** and ensure **Enforce HTTPS** is enabled
    

### Caching or dependency issues?

Delete your `vendor/` folder and try:

```bash
bundle update
```

---

## See Also

- [Jekyll Docs](https://jekyllrb.com/docs/)
    
- [GitHub Actions for Pages](https://github.com/actions/deploy-pages)
    
- [Managing a custom domain for your GitHub Pages site](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site)
    
- [DNS Checker](https://dnschecker.org)

- [Category: /github-pages](/notes-by-category#category-/github-pages)

- [Category: /jekyll](/notes-by-category#category-/jekyll)
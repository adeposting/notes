---
title: Setting Up GitHub Pages with a Custom Domain via Namecheap
date: 2025-05-05
categories:
  - /web-development
  - /devops
  - /github
  - /github-pages
tags:
  - cname
  - devops
  - dns
  - domain
  - git
  - github
  - github-io
  - github-pages
  - web-dev
  - web-development
---

This guide walks you through setting up GitHub Pages with a custom secure domain (apex + subdomain) registered via Namecheap. It includes repository setup, DNS configuration, domain verification, and HTTPS.

---

## Table of Contents

1. [Overview](#1-overview)
    
2. [Buy a Domain on Namecheap](#2-buy-a-domain-on-namecheap)
    
3. [Create GitHub Repositories](#3-create-github-repositories)
    
4. [Configure Apex Domain Repository](#4-configure-apex-domain-repository)
    
5. [Configure Subdomain Repository](#5-configure-subdomain-repository)
    
6. [Set DNS Records in Namecheap](#6-set-dns-records-in-namecheap)
    
7. [Verify Domain Ownership](#7-verify-domain-ownership)
    
8. [Enable HTTPS](#8-enable-https)
    
9. [Troubleshooting](#9-troubleshooting)
    
---

## 1. Overview

This setup includes:

- One repo for the **apex domain** (`example.com`)
    
- One repo for a **subdomain** (`blog.example.com`)
    
- Full A/AAAA/CNAME DNS records
    
- GitHub Pages domain verification and HTTPS
    

---

## 2. Buy a Domain on Namecheap

1. Go to [https://namecheap.com](https://namecheap.com)
    
2. Register a domain (e.g., `example.com`)
    
3. From the dashboard, go to **Domain List** → **Manage**
    
4. Set **Nameservers** to `Namecheap BasicDNS`
    

---

## 3. Create GitHub Repositories

Create two repositories on GitHub:

### A. For the Apex Domain

- Name: `username.github.io`
    
- Purpose: Serves `https://example.com`
    

### B. For the Subdomain

- Name: `blog`
    
- Purpose: Serves `https://blog.example.com`
    

---

## 4. Configure Apex Domain Repository

1. Open `username.github.io`
    
2. Go to **Settings** → **Pages**
    
3. Set **Custom domain** to the apex domain, e.g. `example.com`.
    
4. Under **Source**, select **Github Actions**.
    
5. Add a file named `CNAME` at the root with the following content:
    
    ```
    example.com
    ```

6. Create a GitHub Actions workflow file at `.github/workflows/pages.yml`:
    
    ```yaml
    name: Deploy to GitHub Pages

    on:
      push:
        branches: [ main ]
      workflow_dispatch:

    permissions:
      contents: read
      pages: write
      id-token: write

    concurrency:
      group: "pages"
      cancel-in-progress: false

    jobs:
      build:
        runs-on: ubuntu-latest
        steps:
          - name: Checkout
            uses: actions/checkout@v4
          - name: Setup Pages
            uses: actions/configure-pages@v4
          - name: Build with Jekyll
            uses: actions/jekyll-build-pages@v1
            with:
              source: ./
              destination: ./_site
          - name: Upload artifact
            uses: actions/upload-pages-artifact@v3

      deploy:
        environment:
          name: github-pages
          url: ${{ steps.deployment.outputs.page_url }}
        runs-on: ubuntu-latest
        needs: build
        steps:
          - name: Deploy to GitHub Pages
            id: deployment
            uses: actions/deploy-pages@v4
    ```

---

## 5. Configure Subdomain Repository

1. Open the `blog` repo
    
2. Go to **Settings** → **Pages**
    
3. Set **Custom domain** to the subdomain, e.g. `blog.example.com`.
    
4. Under **Source**, select **Github Actions**.
    
5. Add a `CNAME` file with:
    
```
blog.example.com
```

6. Create the same GitHub Actions workflow file as in step 4.6 above.

---

## 6. Set DNS Records in Namecheap

Go to **Domain List** → **Manage** → **Advanced DNS** and add:

### A. Apex Domain (`example.com`)

#### IPv4 (A Records)

|Type|Host|Value|
|---|---|---|
|A|@|185.199.108.153|
|A|@|185.199.109.153|
|A|@|185.199.110.153|
|A|@|185.199.111.153|

#### IPv6 (AAAA Records)

|Type|Host|Value|
|---|---|---|
|AAAA|@|2606:50c0:8000::153|
|AAAA|@|2606:50c0:8001::153|
|AAAA|@|2606:50c0:8002::153|
|AAAA|@|2606:50c0:8003::153|

#### CNAME

|Type|Host|Value|
|---|---|---|
|CNAME|www|`username.github.io`|

> Setting up a `www` subdomain alongside an apex domain is recommended for HTTPS secured websites.

#### Optional: ALIAS/ANAME

|Type|Host|Value|
|---|---|---|
|ALIAS|@|`username.github.io`|

> Only use ALIAS/ANAME if your DNS provider supports it. Namecheap does **not** support ALIAS natively.

### B. Subdomain (`blog.example.com`)

|Type|Host|Value|
|---|---|---|
|CNAME|blog|`username.github.io`|

---

## 7. Verify Domain Ownership

To enable HTTPS and prevent domain hijacking, GitHub requires you to verify ownership.

### A. Go to Profile Settings

1. In the upper-right corner of GitHub, click your **profile photo** → **Settings**
    
2. In the sidebar, under **Code, planning, and automation**, click **Pages**
    

> Note: You must do this from your **profile settings**, not your repo settings.

### B. Add Your Domain

1. Click **Add a domain**
    
2. Under "What domain would you like to add?", enter:
    
    ```
    example.com
    ```
    
3. Click **Add domain**
    

GitHub will display a DNS **TXT** record for verification.

### C. Add the TXT Record in Namecheap

1. Go back to **Namecheap** → **Advanced DNS**
    
2. Add a **TXT record**:
    

|Type|Host|Value|
|---|---|---|
|TXT|`_github-pages-challenge-username`|`your-verification-code`|

Replace `username` and the TXT value with the values GitHub gave you.

### D. Wait for DNS Propagation

- Use [https://dnschecker.org](https://dnschecker.org) to monitor TXT record propagation.
    
- You can also check via terminal:
    
    ```bash
    dig _github-pages-challenge-USERNAME.example.com +nostats +nocomments +nocmd TXT
    ```
    

Wait until the TXT record appears.

### E. Complete Verification

1. Go back to **Profile Settings** → **Pages**
    
2. On the right side of the domain row, click the **⋯** (three dots) menu
    
3. Click **Continue verifying**
    
4. Once GitHub detects the record, click **Verify**
    

> Leave the TXT record in place to keep the domain verified over time.

---

## 8. Enable HTTPS

Once verified:

1. Go to the **repository** settings → **Pages**
    
2. Check **Enforce HTTPS**
    

> GitHub will issue a TLS certificate using Let's Encrypt. This may take several minutes to appear.

---

## 9. Troubleshooting

### 404 or Wrong Site?

- Make sure the `CNAME` file matches your custom domain.
    
- Double-check DNS record spelling.
    

### HTTPS Not Available?

- Ensure the domain is verified.
    
- Wait for DNS propagation.
    
- Make sure no conflicting A/AAAA and CNAME records exist.
    

### Tools

- [https://dnschecker.org](https://dnschecker.org) to confirm DNS
    
- `dig` or `nslookup` for command-line checks
    

---

## See Also

- GitHub Docs: [Verifying your custom domain](https://docs.github.com/en/enterprise-cloud@latest/pages/configuring-a-custom-domain-for-your-github-pages-site/verifying-your-custom-domain-for-github-pages)
    
- GitHub Docs: [About custom domains and GitHub Pages](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/about-custom-domains-and-github-pages)
    
- DNS Checker Tool: [https://dnschecker.org](https://dnschecker.org)
    
- [Category: /github-pages](/notes-by-category#category-/github-pages)
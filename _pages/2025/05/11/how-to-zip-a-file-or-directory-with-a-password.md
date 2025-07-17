---
title: How to Zip a File or Directory with a Password
date: 2025-05-11
categories:
    - /development
    - /opsec
tags:
    - bash-script
    - code
    - information-security
    - infosec
    - opsec
    - privacy
    - programming
    - scripts
    - security
    - shell-script
    - software
    - software-development
    - software-engineering
    - terminal
    - terminal-one-liners
---

Here is how encrypt/decrypt files and directories with a password using zip/unzip. 

Note that using GPG and `.tar.gz` archives may offer a better alternative.

**Zip and encrypt one or more files**

```sh
zip --encrypt <output-file>.zip <input-file-1> <input-file-2> ...
```

**Zip and encrypt a directory (recursive)**

```sh
zip -r --encrypt <output-file>.zip <input-directory>
```

**Decrypt a zip file**

```sh
unzip <input-file>.zip
```

---

## See Also

- [Category: /development](/notes-by-category#category-/development)

- [Category: /opsec](/notes-by-category#category-/opsec)


---
title: Sign In to Multiple Discord Accounts at the Same Time 
date: 2025-05-12
categories:
    - /applications
    - /tutorials
tags:
    - applications
    - bash-one-liners
    - discord
---

It is possible to run multiple instances of the native Discord application at the same time, allowing you to sign in to multiple accounts for different users at once.

**On Mac & Linux**

Open a Terminal and run:

```sh
/Applications/Discord.app/Contents/MacOS/Discord --multi-instance
```

**On Windows**

1. Quit Discord.
2. Open Explorer to `(Drive letter, Ergo C):\Users(Username)\AppData\Local\Discord`
3. Go to the latest version, at the time of writing it's `0.0.309`.
4. Create a shortcut to `discord.exe`.
5. Edit the shortcut properties.
6. Put `--multi-instance` in the box that says `Target:`, behind `C:\Users(Username)\AppData\Local\Discord\app-0.0.309\Discord.exe`.
7. Open Discord twice through the shortcut.

**Acknowledgements**

These instructions were adapted from the [How to ACTUALLY, EASILY multiclient](https://www.reddit.com/r/discordapp/comments/kk6rp7/how_to_actually_easily_multiclient/) thread on [r/discordapp](https://www.reddit.com/r/discordapp/).

---

## See Also

- [Category: /applications](/notes-by-category#category-/applications)

- [Category: /discord](/notes-by-category#category-/discord)

